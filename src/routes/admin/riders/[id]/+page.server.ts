import { error, fail, redirect } from '@sveltejs/kit';
import { desc, eq } from 'drizzle-orm';
import { riderProfiles, reports, reviews } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const rider = await locals.db.query.riderProfiles.findFirst({
		where: eq(riderProfiles.id, params.id),
		with: {
			user: true,
			sports: true,
			spots: { orderBy: (s, { asc }) => [asc(s.displayOrder)] },
			reviews: {
				with: { profProfile: true },
				orderBy: (r, { desc }) => [desc(r.createdAt)]
			}
		}
	});

	if (!rider) error(404, 'Rider introuvable');

	const submittedReports = await locals.db.query.reports.findMany({
		where: eq(reports.userId, rider.userId),
		with: { profProfile: true },
		orderBy: [desc(reports.createdAt)]
	});

	return { rider, submittedReports };
};

export const actions: Actions = {
	suspend: async ({ request, locals }) => {
		const data = await request.formData();
		const userId = data.get('userId') as string;
		const reason = data.get('reason') as string;
		const durationDays = parseInt((data.get('durationDays') as string) ?? '0', 10);
		if (!userId) return fail(400, { error: 'userId manquant' });

		await locals.auth.api.banUser({
			body: {
				userId,
				banReason: reason || undefined,
				banExpiresIn: durationDays > 0 ? durationDays * 86400 : undefined
			},
			headers: request.headers
		});

		return { success: true };
	},

	unsuspend: async ({ request, locals }) => {
		const data = await request.formData();
		const userId = data.get('userId') as string;
		if (!userId) return fail(400, { error: 'userId manquant' });

		await locals.auth.api.unbanUser({
			body: { userId },
			headers: request.headers
		});

		return { success: true };
	},

	deleteAccount: async ({ request, locals }) => {
		const data = await request.formData();
		const userId = data.get('userId') as string;
		if (!userId) return fail(400, { error: 'userId manquant' });

		await locals.auth.api.removeUser({
			body: { userId },
			headers: request.headers
		});

		redirect(303, '/admin/riders');
	},

	deleteReview: async ({ request, locals }) => {
		const data = await request.formData();
		const reviewId = data.get('reviewId') as string;
		if (!reviewId) return fail(400, { error: 'reviewId manquant' });

		await locals.db.delete(reviews).where(eq(reviews.id, reviewId));

		return { success: true };
	}
};
