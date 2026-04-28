import { fail, redirect } from '@sveltejs/kit';
import { APIError } from 'better-auth/api';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		redirect(303, '/');
	}
};

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const firstName = String(data.get('firstName') ?? '').trim();
		const lastName = String(data.get('lastName') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const password = String(data.get('password') ?? '');
		const role = String(data.get('role') ?? 'rider');

		if (!firstName || !lastName || !email || !password) {
			return fail(400, { error: 'Tous les champs sont requis.', email, firstName, lastName });
		}

		if (password.length < 8) {
			return fail(400, { error: 'Le mot de passe doit contenir au moins 8 caractères.', email, firstName, lastName });
		}

		const type = role === 'moniteur' ? 'prof' : 'rider';

		try {
			await event.locals.auth.api.signUpEmail({
				body: {
					name: `${firstName} ${lastName}`,
					email,
					password,
					type
				},
				headers: event.request.headers
			});
		} catch (err) {
			if (err instanceof APIError) {
				const message =
					err.status === 'UNPROCESSABLE_ENTITY'
						? 'Un compte existe déjà avec cet email.'
						: 'Erreur lors de la création du compte. Réessaie.';
				return fail(400, { error: message, email, firstName, lastName });
			}
			throw err;
		}

		redirect(303, type === 'prof' ? '/prof-register' : '/rider-register');
	}
};
