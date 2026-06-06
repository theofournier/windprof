import type { Review } from '$lib/server/db/review/reviews.schema';
import type { ProfProfile } from '$lib/server/db/prof/profProfiles.schema';
import type { RiderProfile } from '$lib/server/db/rider/riderProfiles.schema';

export type AdminReview = Review & {
	profProfile: ProfProfile;
	riderProfile: RiderProfile | null;
};

export type RatingFilter = 'all' | '1' | '2' | '3' | '4' | '5';

export type Kpi = {
	lbl: string;
	val: string;
	delta: string;
	dir: 'flat' | 'up' | 'flag';
	accent?: boolean;
};
