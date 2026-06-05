import type { ProfProfile } from '$lib/server/db/prof/profProfiles.schema';
import type { ProfSport } from '$lib/server/db/prof/profSports.schema';
import type { ProfSpot } from '$lib/server/db/prof/profSpots.schema';
import type { ProfCertification } from '$lib/server/db/prof/profCertifications.schema';
import type { Review } from '$lib/server/db/review/reviews.schema';
import type { User } from '$lib/server/db/auth.schema';

export type AdminProf = ProfProfile & {
	user: User;
	sports: ProfSport[];
	spots: ProfSpot[];
	certifications: ProfCertification[];
	reviews: Review[];
};

export type Filter = 'all' | 'verified' | 'pending' | 'not_verified';

export type StatusCounts = Record<Filter, number>;

export type Kpi = {
	lbl: string;
	val: string;
	delta: string;
	dir: 'flat' | 'up' | 'flag';
	accent?: boolean;
};
