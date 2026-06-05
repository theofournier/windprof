import type { LayoutServerLoad } from './$types';
import { profProfiles } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

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

    return { profs };
};
