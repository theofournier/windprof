import type { Report } from '$lib/server/db/report/reports.schema';
import type { ProfProfile } from '$lib/server/db/prof/profProfiles.schema';
import type { RiderProfile } from '$lib/server/db/rider/riderProfiles.schema';
import type { User } from '$lib/server/db/auth.schema';

export type ReporterUser = User & {
	profProfile: ProfProfile | null;
	riderProfile: RiderProfile | null;
};

export type AdminReport = Report & {
	profProfile: ProfProfile;
	user: ReporterUser | null;
};

export type SubmittedReport = Report & {
	profProfile: ProfProfile;
};

export type StatusFilter = 'all' | 'pending' | 'reviewed' | 'dismissed';

export type Kpi = {
	lbl: string;
	val: string;
	delta: string;
	dir: 'flat' | 'up' | 'flag';
	accent?: boolean;
};
