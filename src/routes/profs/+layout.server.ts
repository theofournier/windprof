import type { LayoutServerLoad } from './$types';
import { profProfiles } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async (event) => {
    const profs = await event.locals.db.query.profProfiles.findMany({
        where: eq(profProfiles.isPublished, true),
        with: {
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

    return { profs };
};
