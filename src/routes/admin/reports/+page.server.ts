import { desc, eq } from 'drizzle-orm';
import { reports } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const allReports = await locals.db.query.reports.findMany({
		with: {
			profProfile: true,
			user: {
				with: {
					profProfile: true,
					riderProfile: true
				}
			}
		},
		orderBy: [desc(reports.createdAt)]
	});

	return { reports: allReports };
};

export const actions: Actions = {
	markReviewed: async ({ request, locals }) => {
		const data = await request.formData();
		const reportId = data.get('reportId') as string;
		if (!reportId) return fail(400, { error: 'reportId manquant' });

		await locals.db
			.update(reports)
			.set({ status: 'reviewed' })
			.where(eq(reports.id, reportId));

		return { success: true };
	},

	dismissReport: async ({ request, locals }) => {
		const data = await request.formData();
		const reportId = data.get('reportId') as string;
		if (!reportId) return fail(400, { error: 'reportId manquant' });

		await locals.db
			.update(reports)
			.set({ status: 'dismissed' })
			.where(eq(reports.id, reportId));

		return { success: true };
	},

	deleteReport: async ({ request, locals }) => {
		const data = await request.formData();
		const reportId = data.get('reportId') as string;
		if (!reportId) return fail(400, { error: 'reportId manquant' });

		await locals.db.delete(reports).where(eq(reports.id, reportId));

		return { success: true };
	}
};
