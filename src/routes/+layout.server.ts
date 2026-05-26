import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { getProfs } from '$lib/server/db/mockData';
import { riderProfiles, profProfiles } from '$lib/server/db/schema';
import type { LayoutServerLoad } from './$types';

const SKIP_PROFILE_CHECK = [
    '/prof-register',
    '/rider-register',
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
];

export const load: LayoutServerLoad = async (event) => {
    const profs = await getProfs();
    const user = event.locals.user ?? null;

    if (user) {
        const skip = SKIP_PROFILE_CHECK.some((p) => event.url.pathname.startsWith(p));

        if (!skip) {
            if (user.type === 'rider') {
                const profile = await event.locals.db
                    .select()
                    .from(riderProfiles)
                    .where(eq(riderProfiles.userId, user.id))
                    .get();

                if (!profile) {
                    redirect(303, '/rider-register?missing=true');
                }
            } else if (user.type === 'prof') {
                const profile = await event.locals.db
                    .select()
                    .from(profProfiles)
                    .where(eq(profProfiles.userId, user.id))
                    .get();

                if (!profile) {
                    redirect(303, '/prof-register?missing=true');
                }
            }
        }
    }

    return {
        profs,
        user,
    };
};
