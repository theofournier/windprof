import { desc } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { users } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const allUsers = await locals.db.query.users.findMany({
		with: {
			profProfile: true,
			riderProfile: true
		},
		orderBy: [desc(users.createdAt)]
	});

	const withoutProfile = allUsers
		.filter((u) => u.profProfile === null && u.riderProfile === null)
		.map(({ profProfile: _p, riderProfile: _r, ...u }) => u);

	return { users: withoutProfile };
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

		redirect(303, '/admin/users');
	}
};
