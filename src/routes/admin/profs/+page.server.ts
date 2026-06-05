import { desc } from 'drizzle-orm';
import { profProfiles } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const profs = await locals.db.query.profProfiles.findMany({
		with: {
			user: true,
			sports: true,
			spots: true,
			certifications: true,
			reviews: true,
		},
		orderBy: [desc(profProfiles.createdAt)],
	});

	return { profs };
};
