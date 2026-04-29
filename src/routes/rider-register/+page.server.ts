import { redirect, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { riderProfiles, ridersports, riderSpots } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		redirect(303, '/login');
	}

	if (event.locals.user.type === 'prof') {
		redirect(303, '/prof-register');
	}

	const existing = await event.locals.db
		.select()
		.from(riderProfiles)
		.where(eq(riderProfiles.userId, event.locals.user.id))
		.get();

	if (existing) {
		redirect(303, '/rider-account');
	}
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

		if (!data.firstName?.trim() || !data.city?.trim()) {
			return fail(400, { error: 'Le prénom et la ville sont requis.' });
		}

		const profileId = crypto.randomUUID();
		const userId = event.locals.user.id;

		await event.locals.db.insert(riderProfiles).values({
			id: profileId,
			userId,
			firstName: data.firstName.trim(),
			lastName: data.lastName?.trim() || null,
			birthYear: data.birthYear || null,
			city: data.city.trim(),
			bio: data.bio?.trim() || null,
			maxDistanceKm: data.maxDistanceKm || null,
			equipmentPreference: data.equipmentPreference || null,
			goals: data.goals?.length ? JSON.stringify(data.goals) : null,
			formatPreferences: data.formatPreferences?.length ? JSON.stringify(data.formatPreferences) : null,
			availabilityDays: data.availabilityDays?.length ? JSON.stringify(data.availabilityDays) : null,
			availabilitySlots: data.availabilitySlots?.length ? JSON.stringify(data.availabilitySlots) : null,
			budgetRanges: data.budgetRanges?.length ? JSON.stringify(data.budgetRanges) : null,
		});

		if (data.sports?.length) {
			await event.locals.db.insert(ridersports).values(
				data.sports.map((s: any) => ({
					id: crypto.randomUUID(),
					riderId: profileId,
					sport: s.sport,
					level: s.level || null,
				}))
			);
		}

		if (data.spots?.length) {
			await event.locals.db.insert(riderSpots).values(
				data.spots.map((s: any, i: number) => ({
					id: crypto.randomUUID(),
					riderId: profileId,
					name: s.name,
					isPreferred: s.isPreferred ?? false,
					displayOrder: i,
				}))
			);
		}

		redirect(303, '/rider-account');
	}
};
