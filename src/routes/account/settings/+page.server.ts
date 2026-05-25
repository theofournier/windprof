import { redirect, fail } from '@sveltejs/kit';
import { APIError } from 'better-auth/api';
import { eq, and, ne } from 'drizzle-orm';
import { accounts, sessions } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(303, '/login');

	const [userAccounts, userSessions] = await Promise.all([
		event.locals.db
			.select()
			.from(accounts)
			.where(eq(accounts.userId, event.locals.user.id))
			.all(),
		event.locals.db
			.select()
			.from(sessions)
			.where(eq(sessions.userId, event.locals.user.id))
			.all()
	]);

	const hasPassword = userAccounts.some((a) => a.providerId === 'credential');
	const oauthProviders = userAccounts
		.filter((a) => a.providerId !== 'credential')
		.map((a) => a.providerId);

	return {
		user: event.locals.user,
		hasPassword,
		oauthProviders,
		sessions: userSessions,
		currentSessionToken: event.locals.session?.token ?? null
	};
};

export const actions: Actions = {
	changePassword: async (event) => {
		if (!event.locals.user) redirect(303, '/login');

		const form = await event.request.formData();
		const currentPassword = String(form.get('currentPassword') ?? '');
		const newPassword = String(form.get('newPassword') ?? '');
		const confirmPassword = String(form.get('confirmPassword') ?? '');

		if (!currentPassword || !newPassword || !confirmPassword) {
			return fail(400, { action: 'changePassword', error: 'Tous les champs sont requis.' });
		}
		if (newPassword.length < 8) {
			return fail(400, {
				action: 'changePassword',
				error: 'Le nouveau mot de passe doit faire au moins 8 caractères.'
			});
		}
		if (newPassword !== confirmPassword) {
			return fail(400, {
				action: 'changePassword',
				error: 'Les mots de passe ne correspondent pas.'
			});
		}

		try {
			await event.locals.auth.api.changePassword({
				body: { currentPassword, newPassword, revokeOtherSessions: false },
				headers: event.request.headers
			});
		} catch (err) {
			if (err instanceof APIError) {
				return fail(400, {
					action: 'changePassword',
					error: 'Mot de passe actuel incorrect.'
				});
			}
			throw err;
		}

		return { action: 'changePassword', success: true };
	},

	revokeSession: async (event) => {
		if (!event.locals.user) redirect(303, '/login');

		const form = await event.request.formData();
		const token = String(form.get('token') ?? '');

		if (!token) return fail(400, { action: 'revokeSession', error: 'Session invalide.' });

		await event.locals.db
			.delete(sessions)
			.where(
				and(eq(sessions.token, token), eq(sessions.userId, event.locals.user.id))
			);

		return { action: 'revokeSession', success: true };
	},

	revokeAllSessions: async (event) => {
		if (!event.locals.user) redirect(303, '/login');

		const currentToken = event.locals.session?.token;

		await event.locals.db
			.delete(sessions)
			.where(
				currentToken
					? and(eq(sessions.userId, event.locals.user.id), ne(sessions.token, currentToken))
					: eq(sessions.userId, event.locals.user.id)
			);

		return { action: 'revokeAllSessions', success: true };
	},

	deleteAccount: async (event) => {
		if (!event.locals.user) redirect(303, '/login');

		const form = await event.request.formData();
		const password = String(form.get('password') ?? '');
		const confirmText = String(form.get('confirmText') ?? '');

		if (confirmText !== 'SUPPRIMER') {
			return fail(400, {
				action: 'deleteAccount',
				error: 'Tapez exactement SUPPRIMER pour confirmer.'
			});
		}

		try {
			await event.locals.auth.api.deleteUser({
				body: { password, callbackURL: '/' },
				headers: event.request.headers
			});
		} catch (err) {
			if (err instanceof APIError) {
				return fail(400, {
					action: 'deleteAccount',
					error: 'Mot de passe incorrect ou suppression impossible.'
				});
			}
			throw err;
		}

		redirect(303, '/');
	}
};
