import { redirect, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { riderProfiles, ridersports, riderSpots, users } from '$lib/server/db/schema';
import { profilePhotoKey, bucketPublicUrl, uploadPhoto, deletePhoto, isAllowedImageType, isValidSize } from '$lib/server/r2';
import { env } from '$env/dynamic/private';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(303, '/login');
	if (event.locals.user.type !== 'rider') redirect(303, '/account');

	const profile = await event.locals.db
		.select()
		.from(riderProfiles)
		.where(eq(riderProfiles.userId, event.locals.user.id))
		.get();

	if (!profile) redirect(303, '/rider-register');

	const [sports, spots] = await Promise.all([
		event.locals.db.select().from(ridersports).where(eq(ridersports.riderId, profile.id)).all(),
		event.locals.db
			.select()
			.from(riderSpots)
			.where(eq(riderSpots.riderId, profile.id))
			.orderBy(riderSpots.displayOrder)
			.all()
	]);

	return {
		profile: {
			...profile,
			goals: profile.goals ? (JSON.parse(profile.goals) as string[]) : [],
			formatPreferences: profile.formatPreferences
				? (JSON.parse(profile.formatPreferences) as string[])
				: [],
			availabilityDays: profile.availabilityDays
				? (JSON.parse(profile.availabilityDays) as number[])
				: [],
			availabilitySlots: profile.availabilitySlots
				? (JSON.parse(profile.availabilitySlots) as string[])
				: [],
			budgetRanges: profile.budgetRanges ? (JSON.parse(profile.budgetRanges) as string[]) : []
		},
		sports: sports.map((s) => ({ sport: s.sport, level: s.level ?? '' })),
		spots: spots.map((s) => ({ name: s.name, isPreferred: s.isPreferred ?? false }))
	};
};

export const actions: Actions = {
	update: async (event) => {
		if (!event.locals.user) redirect(303, '/login');

		const profile = await event.locals.db
			.select()
			.from(riderProfiles)
			.where(eq(riderProfiles.userId, event.locals.user.id))
			.get();

		if (!profile) redirect(303, '/rider-register');

		const form = await event.request.formData();
		const section = String(form.get('section') ?? '');
		const raw = String(form.get('formData') ?? '{}');

		let data: any;
		try {
			data = JSON.parse(raw);
		} catch {
			return fail(400, { error: 'Données invalides.', section });
		}

		const riderId = profile.id;

		if (section === 'profil') {
			if (!data.firstName?.trim() || !data.city?.trim()) {
				return fail(400, { error: 'Prénom et ville requis.', section });
			}
			await event.locals.db
				.update(riderProfiles)
				.set({
					firstName: data.firstName.trim(),
					lastName: data.lastName?.trim() || null,
					birthYear: data.birthYear || null,
					city: data.city.trim(),
					bio: data.bio?.trim() || null
				})
				.where(eq(riderProfiles.id, riderId));

			const bucket = event.platform?.env?.windprof_bucket;
			const publicUrl = env.BUCKET_PUBLIC_URL;
			if (bucket && publicUrl) {
				const profilePhoto = form.get('profilePhoto') as File | null;
				if (profilePhoto && profilePhoto.size > 0 && isAllowedImageType(profilePhoto.type) && isValidSize(profilePhoto.size)) {
					if (profile.photoUrl) {
						const oldKey = profile.photoUrl.replace(publicUrl.replace(/\/$/, '') + '/', '');
						await deletePhoto(bucket, oldKey).catch(() => { });
					}
					const key = profilePhotoKey(event.locals.user.id, profilePhoto.type);
					await uploadPhoto(bucket, key, profilePhoto, profilePhoto.type);
					const photoUrl = bucketPublicUrl(publicUrl, key);
					await event.locals.db.update(riderProfiles).set({ photoUrl }).where(eq(riderProfiles.id, riderId));
					await event.locals.db.update(users).set({ image: photoUrl }).where(eq(users.id, event.locals.user.id));
				}
			}
		} else if (section === 'disciplines') {
			await event.locals.db.delete(ridersports).where(eq(ridersports.riderId, riderId));
			if (data.sports?.length) {
				await event.locals.db.insert(ridersports).values(
					data.sports.map((s: any) => ({
						id: crypto.randomUUID(),
						riderId,
						sport: s.sport,
						level: s.level || null
					}))
				);
			}
		} else if (section === 'objectifs') {
			await event.locals.db
				.update(riderProfiles)
				.set({
					goals: data.goals?.length ? JSON.stringify(data.goals) : null,
					formatPreferences: data.formatPreferences?.length
						? JSON.stringify(data.formatPreferences)
						: null,
					equipmentPreference: data.equipmentPreference || null
				})
				.where(eq(riderProfiles.id, riderId));
		} else if (section === 'preferences') {
			await event.locals.db.delete(riderSpots).where(eq(riderSpots.riderId, riderId));
			if (data.spots?.length) {
				await event.locals.db.insert(riderSpots).values(
					data.spots.map((s: any, i: number) => ({
						id: crypto.randomUUID(),
						riderId,
						name: s.name,
						isPreferred: s.isPreferred ?? false,
						displayOrder: i
					}))
				);
			}
			await event.locals.db
				.update(riderProfiles)
				.set({
					maxDistanceKm: data.maxDistanceKm || null,
					availabilityDays: data.availabilityDays?.length
						? JSON.stringify(data.availabilityDays)
						: null,
					availabilitySlots: data.availabilitySlots?.length
						? JSON.stringify(data.availabilitySlots)
						: null,
					budgetRanges: data.budgetRanges?.length ? JSON.stringify(data.budgetRanges) : null
				})
				.where(eq(riderProfiles.id, riderId));
		} else {
			return fail(400, { error: 'Section inconnue.', section });
		}

		return { success: true, section };
	}
};
