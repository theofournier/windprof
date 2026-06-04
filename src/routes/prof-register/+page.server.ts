import { redirect, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { profProfiles, profSports, profCertifications, profSpots, profPrices, profPhotos } from '$lib/server/db/schema';
import { galleryKey, galleryUrl, uploadPhoto, isAllowedImageType, isValidSize } from '$lib/server/r2';
import { env } from '$env/dynamic/private';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(303, '/login');
	}

	if (event.locals.user.type === 'rider') {
		redirect(303, '/rider-register');
	}

	const existing = await event.locals.db
		.select()
		.from(profProfiles)
		.where(eq(profProfiles.userId, event.locals.user.id))
		.get();

	if (existing) {
		redirect(303, '/prof-account');
	}

	return { missing: event.url.searchParams.get('missing') === 'true' };
};

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.user) redirect(303, '/login');

		const form = await event.request.formData();
		const raw = String(form.get('formData') ?? '{}');

		let data: any;
		try {
			data = JSON.parse(raw);
		} catch {
			return fail(400, { error: 'Données invalides.' });
		}

		if (!data.firstName?.trim() || !data.lastName?.trim() || !data.city?.trim()) {
			return fail(400, { error: 'Le prénom, le nom et la ville sont requis.' });
		}

		const profileId = crypto.randomUUID();
		const userId = event.locals.user.id;

		await event.locals.db.insert(profProfiles).values({
			id: profileId,
			userId,
			firstName: data.firstName.trim(),
			lastName: data.lastName.trim(),
			bio: data.bio?.trim() || null,
			city: data.city.trim(),
			region: data.region?.trim() || null,
			phone: data.phone?.trim() || null,
			contactEmail: data.contactEmail?.trim() || null,
			contactVisibility: data.contactVisibility || 'phone_email',
			responseTime: data.responseTime || null,
			equipmentProvided: data.equipmentProvided ?? false,
			equipmentNote: data.equipmentNote?.trim() || null,
			languages: data.languages?.length ? JSON.stringify(data.languages) : null,
			websites: data.websites?.filter(Boolean).length
				? JSON.stringify(data.websites.filter(Boolean))
				: null,
		});

		if (data.sports?.length) {
			await event.locals.db.insert(profSports).values(
				data.sports.map((s: any) => ({
					id: crypto.randomUUID(),
					profId: profileId,
					sport: s.sport,
					acceptedLevels: s.acceptedLevels?.length ? JSON.stringify(s.acceptedLevels) : null,
				}))
			);
		}

		if (data.certifications?.length) {
			await event.locals.db.insert(profCertifications).values(
				data.certifications.map((c: any) => ({
					id: crypto.randomUUID(),
					profId: profileId,
					type: c.type,
					year: c.year || null,
					status: 'pending' as const,
				}))
			);
		}

		if (data.spots?.length) {
			await event.locals.db.insert(profSpots).values(
				data.spots.map((s: any, i: number) => ({
					id: crypto.randomUUID(),
					profId: profileId,
					name: s.name,
					isPrimary: s.isPrimary ?? false,
					displayOrder: i,
				}))
			);
		}

		if (data.prices?.length) {
			await event.locals.db.insert(profPrices).values(
				data.prices.map((p: any, i: number) => ({
					id: crypto.randomUUID(),
					profId: profileId,
					description: p.description,
					duration: p.duration || null,
					priceEur: Number(p.priceEur) || 0,
					displayOrder: i,
				}))
			);
		}

		const bucket = event.platform?.env?.windprof_bucket;
		const publicUrl = env.BUCKET_PUBLIC_URL;
		if (bucket && publicUrl) {
			const files = form.getAll('gallery') as File[];
			const validFiles = files
				.filter((f) => f instanceof File && isAllowedImageType(f.type) && isValidSize(f.size))
				.slice(0, 10);

			if (validFiles.length > 0) {
				const photoRecords = await Promise.all(
					validFiles.map(async (file, i) => {
						const key = galleryKey(profileId, file.type);
						await uploadPhoto(bucket, key, file, file.type);
						return {
							id: crypto.randomUUID(),
							profId: profileId,
							key,
							url: galleryUrl(publicUrl, key),
							displayOrder: i,
						};
					})
				);
				await event.locals.db.insert(profPhotos).values(photoRecords);
			}
		}

		redirect(303, '/');
	}
};
