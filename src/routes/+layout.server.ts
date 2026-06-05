import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
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
    const now = new Date();
    const allProfs = await event.locals.db.query.profProfiles.findMany({
        where: eq(profProfiles.isPublished, true),
        with: {
            user: { columns: { banned: true, banExpires: true } },
            sports: true,
            spots: true,
            prices: true,
            certifications: {
                where: (certs, { eq }) => eq(certs.status, 'verified')
            },
            photos: true,
            reviews: true,
        },
    });
    const profs = allProfs
        .filter(p => !p.user?.banned || (p.user.banExpires !== null && p.user.banExpires <= now))
        .map(({ user: _user, ...rest }) => rest);
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
