import type { LayoutServerLoad } from './$types';
import { profProfiles } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async (event) => {
    const profiles = await event.locals.db.query.profProfiles.findMany({
        where: eq(profProfiles.isPublished, true),
        with: {
            disciplines: true,
            certifications: true,
            priceItems: true,
            reviews: true
        }
    });

    const profs = profiles.map((p) => {
        const avgRating = p.reviews.length
            ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length
            : 0;
        const minPrice = p.priceItems.length
            ? Math.min(...p.priceItems.map((pr) => pr.priceEur))
            : 0;

        return {
            id: p.id,
            name: `${p.firstName} ${p.lastName}`,
            bio: p.bio ?? '',
            isVerified: p.isVerified,
            location: p.city,
            stars: avgRating,
            reviewCount: p.reviews.length,
            sports: p.disciplines.map((d) => d.sport),
            price: minPrice,
            certifications: p.certifications.map((c) => c.type)
        };
    });

    return { profs };
};
