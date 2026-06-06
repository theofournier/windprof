import type { RiderProfile } from '$lib/server/db/rider/riderProfiles.schema';
import type { RiderSport } from '$lib/server/db/rider/riderSports.schema';
import type { RiderSpot } from '$lib/server/db/rider/riderSpots.schema';
import type { Review } from '$lib/server/db/review/reviews.schema';
import type { ProfProfile } from '$lib/server/db/prof/profProfiles.schema';
import type { User } from '$lib/server/db/auth.schema';

export type RiderReview = Review & { profProfile: ProfProfile };

export type AdminRiderDetail = RiderProfile & {
	user: User;
	sports: RiderSport[];
	spots: RiderSpot[];
	reviews: RiderReview[];
};

export const SPORT_LABELS: Record<string, string> = {
	kitesurf: 'Kitesurf',
	wingfoil: 'Wingfoil',
	windsurf: 'Windsurf'
};

export const LEVEL_LABELS: Record<string, string> = {
	discovery: 'Découverte',
	beginner: 'Débutant',
	intermediate: 'Intermédiaire',
	advanced: 'Avancé'
};

export const EQUIPMENT_LABELS: Record<string, string> = {
	own: 'Matériel personnel',
	provided: 'Matériel fourni par le prof',
	any: 'Indifférent'
};

export const FORMAT_LABELS: Record<string, string> = {
	individual: 'Cours individuel',
	duo: 'Cours duo',
	small_group: 'Petit groupe',
	stage: 'Stage'
};

export const DAY_LABELS: Record<number, string> = {
	0: 'Lun',
	1: 'Mar',
	2: 'Mer',
	3: 'Jeu',
	4: 'Ven',
	5: 'Sam',
	6: 'Dim'
};

export const SLOT_LABELS: Record<string, string> = {
	morning: 'Matin',
	midday: 'Midi',
	afternoon: 'Après-midi',
	end_of_day: 'Fin de journée',
	weekends_only: 'Week-ends uniquement',
	school_holidays: 'Vacances scolaires'
};

export const tag =
	'inline-block rounded-sm border border-ink/[0.16] bg-bg px-[7px] py-[2px] font-mono text-[10.5px] font-semibold tracking-[0.04em] text-ink';

export const sectionHeader =
	'flex items-center justify-between border-b border-ink/10 bg-[#FBF8F1] px-5 py-3.5';

export function registeredAgo(createdAt: Date | number): string {
	const months = Math.floor(
		(Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30)
	);
	return `${months} mois`;
}

export function parseJson<T>(value: string | null, fallback: T): T {
	try {
		return JSON.parse(value ?? 'null') ?? fallback;
	} catch {
		return fallback;
	}
}
