import type { RiderProfile } from '$lib/server/db/rider/riderProfiles.schema';
import type { RiderSport } from '$lib/server/db/rider/riderSports.schema';
import type { RiderSpot } from '$lib/server/db/rider/riderSpots.schema';
import type { Review } from '$lib/server/db/review/reviews.schema';
import type { User } from '$lib/server/db/auth.schema';

export type AdminRider = RiderProfile & {
	user: User;
	sports: RiderSport[];
	spots: RiderSpot[];
	reviews: Review[];
};

export type RiderFilter = 'all' | 'active' | 'suspended';
export type SportFilter = 'all' | 'kitesurf' | 'wingfoil' | 'windsurf';

export type StatusCounts = Record<RiderFilter, number>;

export type Kpi = {
	lbl: string;
	val: string;
	delta: string;
	dir: 'flat' | 'up' | 'flag';
	accent?: boolean;
};
