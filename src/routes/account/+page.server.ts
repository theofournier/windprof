import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) redirect(303, '/login');
	if (event.locals.user.type === 'prof') redirect(303, '/prof-account');
	if (event.locals.user.type === 'rider') redirect(303, '/rider-account');
};
