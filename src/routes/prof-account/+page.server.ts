import { redirect, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import {
	profProfiles,
	profSports,
	profCertifications,
	profSpots,
	profPrices
} from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(303, '/login');
	if (event.locals.user.type !== 'prof') redirect(303, '/account');

	const profile = await event.locals.db
		.select()
		.from(profProfiles)
		.where(eq(profProfiles.userId, event.locals.user.id))
		.get();

	if (!profile) redirect(303, '/prof-register');

	const [sports, certifications, spots, prices] = await Promise.all([
		event.locals.db.select().from(profSports).where(eq(profSports.profId, profile.id)).all(),
		event.locals.db
			.select()
			.from(profCertifications)
			.where(eq(profCertifications.profId, profile.id))
			.all(),
		event.locals.db
			.select()
			.from(profSpots)
			.where(eq(profSpots.profId, profile.id))
			.orderBy(profSpots.displayOrder)
			.all(),
		event.locals.db
			.select()
			.from(profPrices)
			.where(eq(profPrices.profId, profile.id))
			.orderBy(profPrices.displayOrder)
			.all()
	]);

	return {
		profile: {
			...profile,
			languages: profile.languages ? (JSON.parse(profile.languages) as string[]) : [],
			websites: profile.websites ? (JSON.parse(profile.websites) as string[]) : []
		},
		sports: sports.map((s) => ({
			sport: s.sport,
			acceptedLevels: s.acceptedLevels ? (JSON.parse(s.acceptedLevels) as string[]) : []
		})),
		certifications: certifications.map((c) => ({
			type: c.type,
			year: c.year?.toString() ?? ''
		})),
		spots: spots.map((s) => ({
			name: s.name,
			isPrimary: s.isPrimary ?? false
		})),
		prices: prices.map((p) => ({
			description: p.description,
			duration: p.duration ?? '',
			priceEur: p.priceEur
		}))
	};
};

export const actions: Actions = {
	update: async (event) => {
		if (!event.locals.user) redirect(303, '/login');

		const profile = await event.locals.db
			.select()
			.from(profProfiles)
			.where(eq(profProfiles.userId, event.locals.user.id))
			.get();

		if (!profile) redirect(303, '/prof-register');

		const form = await event.request.formData();
		const section = String(form.get('section') ?? '');
		const raw = String(form.get('formData') ?? '{}');

		let data: any;
		try {
			data = JSON.parse(raw);
		} catch {
			return fail(400, { error: 'Données invalides.', section });
		}

		const profId = profile.id;

		if (section === 'identite') {
			if (!data.firstName?.trim() || !data.lastName?.trim()) {
				return fail(400, { error: 'Prénom et nom requis.', section });
			}
			await event.locals.db
				.update(profProfiles)
				.set({
					firstName: data.firstName.trim(),
					lastName: data.lastName.trim(),
					bio: data.bio?.trim() || null,
					languages: data.languages?.length ? JSON.stringify(data.languages) : null
				})
				.where(eq(profProfiles.id, profId));
		} else if (section === 'disciplines') {
			await event.locals.db.delete(profSports).where(eq(profSports.profId, profId));
			if (data.sports?.length) {
				await event.locals.db.insert(profSports).values(
					data.sports.map((s: any) => ({
						id: crypto.randomUUID(),
						profId,
						sport: s.sport,
						acceptedLevels: s.acceptedLevels?.length ? JSON.stringify(s.acceptedLevels) : null
					}))
				);
			}
		} else if (section === 'certifications') {
			await event.locals.db.delete(profCertifications).where(eq(profCertifications.profId, profId));
			if (data.certifications?.length) {
				await event.locals.db.insert(profCertifications).values(
					data.certifications.map((c: any) => ({
						id: crypto.randomUUID(),
						profId,
						type: c.type,
						year: c.year ? parseInt(c.year) : null,
						status: 'pending' as const
					}))
				);
			}
		} else if (section === 'spots') {
			if (!data.city?.trim()) {
				return fail(400, { error: 'La ville est requise.', section });
			}
			await event.locals.db.delete(profSpots).where(eq(profSpots.profId, profId));
			if (data.spots?.length) {
				await event.locals.db.insert(profSpots).values(
					data.spots.map((s: any, i: number) => ({
						id: crypto.randomUUID(),
						profId,
						name: s.name,
						isPrimary: s.isPrimary ?? false,
						displayOrder: i
					}))
				);
			}
			await event.locals.db
				.update(profProfiles)
				.set({
					city: data.city.trim(),
					region: data.region?.trim() || null,
					equipmentProvided: data.equipmentProvided ?? false,
					equipmentNote: data.equipmentNote?.trim() || null
				})
				.where(eq(profProfiles.id, profId));
		} else if (section === 'tarifs') {
			await event.locals.db.delete(profPrices).where(eq(profPrices.profId, profId));
			if (data.prices?.length) {
				await event.locals.db.insert(profPrices).values(
					data.prices.map((p: any, i: number) => ({
						id: crypto.randomUUID(),
						profId,
						description: p.description,
						duration: p.duration || null,
						priceEur: Number(p.priceEur) || 0,
						displayOrder: i
					}))
				);
			}
			await event.locals.db
				.update(profProfiles)
				.set({
					websites: data.websites?.filter(Boolean).length
						? JSON.stringify(data.websites.filter(Boolean))
						: null
				})
				.where(eq(profProfiles.id, profId));
		} else if (section === 'contact') {
			await event.locals.db
				.update(profProfiles)
				.set({
					phone: data.phone?.trim() || null,
					contactEmail: data.contactEmail?.trim() || null,
					contactVisibility: data.contactVisibility || 'phone_email',
					responseTime: data.responseTime || null
				})
				.where(eq(profProfiles.id, profId));
		} else {
			return fail(400, { error: 'Section inconnue.', section });
		}

		return { success: true, section };
	}
};
