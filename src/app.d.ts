import type { DrizzleClient } from "$lib/server/db";
declare global {
	namespace App {
		interface Locals {
			db: DrizzleClient
		}
		interface Platform {
			env: {
				windprof_db: D1Database;
			};
		}
	}
}

export {};
