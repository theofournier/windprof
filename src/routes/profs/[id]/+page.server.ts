import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { profProfiles, riderProfiles, reviews } from '$lib/server/db/schema';
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
			sports: true,
			spots: true,
			prices: true,
			certifications: true,
			photos: true,
			reviews: true,
		},
	});

	if (!p || !p.isPublished) {
		error(404, 'Prof not found');
	}

	const avgRating = p.reviews.length
		? p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length
		: 0;

	const allLevels = p.sports.flatMap((d) =>
		d.acceptedLevels ? (JSON.parse(d.acceptedLevels) as string[]) : []
	);
	const levels = [...new Set(allLevels)];
	if (p.equipmentProvided) levels.push('Matériel fourni');

	const languages: string[] = p.languages ? JSON.parse(p.languages) : [];

	const glanceDetails: { label: string; value: string }[] = [
		{ label: 'sports', value: p.sports.map((d) => d.sport).join(' · ') || '—' },
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
		userType: event.locals.user?.type ?? null,
		userEmail: event.locals.user?.email ?? null,
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
			sports: p.sports.map((d) => d.sport),
			levels,
			certifications: p.certifications.map((c) => ({
				name: c.type,
				year: c.year?.toString() ?? ''
			})),
			prices: p.prices.map((pr) => ({
				label: pr.description,
				duration: pr.duration ?? '',
				price: `${pr.priceEur}€`
			})),
			photos: p.photos
				.sort((a, b) => a.displayOrder - b.displayOrder)
				.map((ph) => ({ url: ph.url })),
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

export const actions: Actions = {
	submitReview: async (event) => {
		if (!event.locals.user) {
			return fail(401, { error: 'Vous devez être connecté pour laisser un avis.' });
		}
		if (event.locals.user.type !== 'rider') {
			return fail(403, { error: 'Seuls les riders peuvent laisser des avis.' });
		}

		const form = await event.request.formData();
		const profId = String(form.get('profId') ?? '');
		const rating = Number(form.get('rating'));
		const body = String(form.get('body') ?? '').trim();

		if (!profId) return fail(400, { error: 'Prof introuvable.' });
		if (!rating || rating < 1 || rating > 5) return fail(400, { error: 'Note invalide.' });
		if (!body) return fail(400, { error: 'Votre avis ne peut pas être vide.' });
		if (body.length > 400) return fail(400, { error: 'Votre avis dépasse 400 caractères.' });

		const riderProfile = await event.locals.db
			.select()
			.from(riderProfiles)
			.where(eq(riderProfiles.userId, event.locals.user.id))
			.get();

		if (!riderProfile) return fail(400, { error: 'Profil rider introuvable.' });

		const riderName = riderProfile.lastName
			? `${riderProfile.firstName} ${riderProfile.lastName}`
			: riderProfile.firstName;

		try {
			await event.locals.db.insert(reviews).values({
				id: crypto.randomUUID(),
				profId,
				riderId: riderProfile.id,
				riderName,
				riderLevel: null,
				rating,
				body
			});
		} catch {
			return fail(500, { error: 'Impossible de publier votre avis. Veuillez réessayer.' });
		}

		return { success: true };
	},

	submitReport: async (event) => {
		const form = await event.request.formData();
		const profId = String(form.get('profId') ?? '').trim();
		const reason = String(form.get('reason') ?? '').trim();
		const description = String(form.get('description') ?? '').trim();
		const email = String(form.get('email') ?? '').trim();

		if (!profId) return fail(400, { error: 'Prof introuvable.' });
		if (!reason) return fail(400, { error: 'Veuillez sélectionner une raison.' });
		if (reason === 'Autre' && !description) {
			return fail(400, { error: 'Veuillez décrire le problème.' });
		}
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return fail(400, { error: 'Adresse email invalide.' });
		}

		// TODO: replace with Resend email to admin
		console.log('[REPORT]', { profId, reason, description, reporterEmail: email });

		return { success: true };
	}
};
