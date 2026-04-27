import { building } from '$app/environment';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import type { Handle } from '@sveltejs/kit';
import { getDb } from '$lib/server/db';
import { getAuth } from '$lib/server/auth';


export const handle: Handle = async ({ event, resolve }) => {
	event.locals.db = getDb(event.platform?.env?.windprof_db, process.env.DATABASE_URL);
	event.locals.auth = getAuth(event.locals.db)

	const session = await event.locals.auth.api.getSession({ headers: event.request.headers });

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	return svelteKitHandler({ event, resolve, auth: event.locals.auth, building });
};
