import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { profProfiles } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

function relativeDate(date: Date): string {
	const diffMs = date.getTime() - Date.now();
	const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
	const rtf = new Intl.RelativeTimeFormat('fr', { numeric: 'auto' });
	if (Math.abs(diffDays) < 7) return rtf.format(diffDays, 'day');
	if (Math.abs(diffDays) < 30) return rtf.format(Math.round(diffDays / 7), 'week');
	if (Math.abs(diffDays) < 365) return rtf.format(Math.round(diffDays / 30), 'month');
	return rtf.format(Math.round(diffDays / 365), 'year');
}

export const load: PageServerLoad = async (event) => {
	const p = await event.locals.db.query.profProfiles.findFirst({
		where: eq(profProfiles.id, event.params.id),
		with: {
			disciplines: true,
			certifications: true,
			priceItems: { orderBy: (t, { asc }) => [asc(t.displayOrder)] },
			spots: { orderBy: (t, { asc }) => [asc(t.displayOrder)] },
			reviews: true
		}
	});

	if (!p || !p.isPublished) {
		error(404, 'Prof not found');
	}

	const avgRating = p.reviews.length
		? p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length
		: 0;

	const allLevels = p.disciplines.flatMap((d) =>
		d.acceptedLevels ? (JSON.parse(d.acceptedLevels) as string[]) : []
	);
	const levels = [...new Set(allLevels)];
	if (p.equipmentProvided) levels.push('Matériel fourni');

	const languages: string[] = p.languages ? JSON.parse(p.languages) : [];

	const glanceDetails: { label: string; value: string }[] = [
		{ label: 'Disciplines', value: p.disciplines.map((d) => d.sport).join(' · ') || '—' },
		{ label: 'Niveaux', value: [...new Set(allLevels)].join(' · ') || '—' }
	];
	if (languages.length) glanceDetails.push({ label: 'Langues', value: languages.join(' · ') });
	if (p.equipmentProvided) {
		glanceDetails.push({ label: 'Matériel', value: p.equipmentNote ?? 'Fourni' });
	}
	glanceDetails.push({
		label: 'Inscrit depuis',
		value: p.createdAt.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
	});

	return {
		prof: {
			id: p.id,
			name: `${p.firstName} ${p.lastName}`,
			firstName: p.firstName,
			bio: p.bio ?? '',
			isVerified: p.isVerified,
			city: p.city,
			region: p.region ?? null,
			phone: p.phone ?? '',
			email: p.contactEmail ?? '',
			disciplines: p.disciplines.map((d) => d.sport),
			levels,
			certifications: p.certifications.map((c) => ({
				name: c.type,
				year: c.year?.toString() ?? ''
			})),
			priceItems: p.priceItems.map((pr) => ({
				label: pr.description,
				duration: pr.duration ?? '',
				price: `${pr.priceEur}€`
			})),
			spots: p.spots.map((s) => ({ name: s.name, isPrimary: s.isPrimary })),
			reviews: p.reviews.map((r) => ({
				name: r.riderName ?? 'Anonyme',
				level: r.riderLevel ?? '',
				date: relativeDate(r.createdAt),
				rating: r.rating,
				text: r.body ?? ''
			})),
			avgRating,
			reviewCount: p.reviews.length,
			distribution: [5, 4, 3, 2, 1].map((stars) => ({
				stars,
				count: p.reviews.filter((r) => r.rating === stars).length
			})),
			glanceDetails
		}
	};
};
