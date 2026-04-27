import type { DrizzleClient } from "$lib/server/db";
declare global {
	namespace App {
		interface Locals {
			db: DrizzleClient
		}
		interface Platform {
			env: {
				DB: D1Database;
			};
		}
	}
}

export {};
