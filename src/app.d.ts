import type { DrizzleClient } from '$lib/server/db';
import type { BetterAuth, User, Session } from "$lib/server/auth";

declare global {
	namespace App {
		interface Locals {
			db: DrizzleClient;
			auth: BetterAuth;
			user?: User;
			session?: Session;
		}
		interface Platform {
			env: {
				windprof_db: D1Database;
				windprof_bucket: R2Bucket;
			};
		}
	}
}

export { };
