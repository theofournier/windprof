import type { User } from '$lib/server/db/auth.schema';

export type AdminUser = User;

export type UserFilter = 'all' | 'verified' | 'unverified';
export type UserTypeFilter = 'all' | 'rider' | 'prof';

export type StatusCounts = Record<UserFilter, number>;

export type Kpi = {
	lbl: string;
	val: string;
	delta: string;
	dir: 'flat' | 'up' | 'flag';
	accent?: boolean;
};
