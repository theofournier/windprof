import { desc, eq } from 'drizzle-orm';
import { reviews } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const allReviews = await locals.db.query.reviews.findMany({
		with: {
			profProfile: true,
			riderProfile: true
		},
		orderBy: [desc(reviews.createdAt)]
	});

	return { reviews: allReviews };
};

export const actions: Actions = {
	deleteReview: async ({ request, locals }) => {
		const data = await request.formData();
		const reviewId = data.get('reviewId') as string;
		if (!reviewId) return fail(400, { error: 'reviewId manquant' });

		await locals.db.delete(reviews).where(eq(reviews.id, reviewId));

		return { success: true };
	}
};
