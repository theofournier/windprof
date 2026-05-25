import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		redirect(303, '/');
	}
};

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const email = String(data.get('email') ?? '').trim();

		if (!email) {
			return fail(400, { error: 'Adresse email requise.', email });
		}

		try {
			await event.locals.auth.api.requestPasswordReset({
				body: { email, redirectTo: '/reset-password' },
				headers: event.request.headers
			});
		} catch {
			// Always show success to avoid email enumeration
		}

		return { success: true, email };
	}
};
