import { fail } from '@sveltejs/kit';
import { APIError } from 'better-auth/api';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	return { token: url.searchParams.get('token') };
};

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const newPassword = String(data.get('newPassword') ?? '');
		const confirmPassword = String(data.get('confirmPassword') ?? '');
		const token = String(data.get('token') ?? '');

		if (!newPassword || !confirmPassword) {
			return fail(400, { error: 'Tous les champs sont requis.' });
		}

		if (newPassword.length < 8) {
			return fail(400, { error: 'Le mot de passe doit faire au moins 8 caractères.' });
		}

		if (newPassword !== confirmPassword) {
			return fail(400, { error: 'Les mots de passe ne correspondent pas.' });
		}

		if (!token) {
			return fail(400, { error: 'Token manquant. Redemande un lien de réinitialisation.' });
		}

		try {
			await event.locals.auth.api.resetPassword({
				body: { newPassword, token },
				headers: event.request.headers
			});
		} catch (err) {
			if (err instanceof APIError) {
				return fail(400, { error: 'Lien invalide ou expiré. Redemande un lien de réinitialisation.' });
			}
			throw err;
		}

		return { success: true };
	}
};
