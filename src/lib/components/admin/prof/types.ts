import type { ProfProfile } from '$lib/server/db/prof/profProfiles.schema';
import type { ProfSport } from '$lib/server/db/prof/profSports.schema';
import type { ProfSpot } from '$lib/server/db/prof/profSpots.schema';
import type { ProfCertification } from '$lib/server/db/prof/profCertifications.schema';
import type { Review } from '$lib/server/db/review/reviews.schema';
import type { User } from '$lib/server/db/auth.schema';

export type AdminProfDetail = ProfProfile & {
	user: User;
	sports: ProfSport[];
	spots: ProfSpot[];
	certifications: ProfCertification[];
	reviews: Review[];
};

export const SPORT_LABELS: Record<string, string> = {
	kitesurf: 'Kitesurf',
	wingfoil: 'Wingfoil',
	windsurf: 'Windsurf'
};

export const LEVEL_LABELS: Record<string, string> = {
	beginner: 'Débutant',
	intermediate: 'Intermédiaire',
	advanced: 'Avancé',
	all: 'Tous niveaux'
};

export const tag =
	'inline-block rounded-sm border border-ink/[0.16] bg-bg px-[7px] py-[2px] font-mono text-[10.5px] font-semibold tracking-[0.04em] text-ink';

export const sectionHeader =
	'flex items-center justify-between border-b border-ink/10 bg-[#FBF8F1] px-5 py-3.5';

export function certBadge(status: string): string {
	if (status === 'verified')
		return 'inline-flex items-center gap-1.5 rounded-sm bg-[rgba(111,210,154,0.18)] px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em] uppercase text-[#1f6f47]';
	if (status === 'pending')
		return 'inline-flex items-center gap-1.5 rounded-sm bg-[rgba(242,181,68,0.16)] px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em] uppercase text-[#8a6300]';
	return 'inline-flex items-center gap-1.5 rounded-sm bg-[rgba(179,78,62,0.14)] px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em] uppercase text-[#9a3a2c]';
}

export function avgRating(reviews: Review[]): number | null {
	if (!reviews?.length) return null;
	return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
}

export function registeredAgo(createdAt: Date | number): string {
	const months = Math.floor(
		(Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30)
	);
	return `${months} mois`;
}

export function parseLangs(languages: string | null): string[] {
	try {
		return JSON.parse(languages ?? '[]');
	} catch {
		return [];
	}
}
