import { desc } from 'drizzle-orm';
import { riderProfiles } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const riders = await locals.db.query.riderProfiles.findMany({
		with: {
			user: true,
			sports: true,
			spots: true,
			reviews: true
		},
		orderBy: [desc(riderProfiles.createdAt)]
	});

	return { riders };
};
