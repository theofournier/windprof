import type { ProfWithRelations } from "$lib/server/db/relations.schema";

const LANG_TO_CODE: Record<string, string> = {
    français: 'FR', french: 'FR',
    english: 'EN', anglais: 'EN',
    español: 'ES', espagnol: 'ES', spanish: 'ES',
    italiano: 'IT', italian: 'IT',
    deutsch: 'DE', german: 'DE', allemand: 'DE',
    nederlands: 'NL', dutch: 'NL', néerlandais: 'NL'
};

export const mapProfItem = (prof: ProfWithRelations) => {
    const avgRating = prof.reviews.length
        ? prof.reviews.reduce((sum, r) => sum + r.rating, 0) / prof.reviews.length
        : 0;
    const minPrice = prof.prices.length
        ? Math.min(...prof.prices.map((pr) => pr.priceEur))
        : 0;
    const acceptedLevels = [
        ...new Set(
            prof.sports.flatMap((s) =>
                s.acceptedLevels ? (JSON.parse(s.acceptedLevels) as string[]) : []
            )
        )
    ];
    const languages = prof.languages
        ? (JSON.parse(prof.languages) as string[]).map(
            (l) => LANG_TO_CODE[l.toLowerCase()] ?? l.slice(0, 2).toUpperCase()
        )
        : [];

    const firstGalleryPhoto = prof.photos.sort((a, b) => a.displayOrder - b.displayOrder)[0]?.url ?? null;
    const photoUrl = prof.photoUrl ?? firstGalleryPhoto;

    return {
        id: prof.id,
        name: `${prof.firstName} ${prof.lastName}`,
        bio: prof.bio ?? '',
        isVerified: prof.isVerified,
        location: prof.city,
        stars: avgRating,
        reviewCount: prof.reviews.length,
        sports: prof.sports.map((s) => s.sport),
        price: minPrice,
        certifications: prof.certifications.map((c) => c.type),
        acceptedLevels,
        equipmentProvided: prof.equipmentProvided,
        languages,
        photoUrl
    };
};