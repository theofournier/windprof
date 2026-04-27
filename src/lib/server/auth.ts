import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { type DrizzleClient } from '$lib/server/db';
import { admin } from 'better-auth/plugins/admin';

export function getAuth(db: DrizzleClient) {
	return betterAuth({
		baseURL: env.ORIGIN,
		secret: env.BETTER_AUTH_SECRET,
		database: drizzleAdapter(db, {
			provider: "sqlite",
			usePlural: true,
		}),
		experimental: { joins: true },
		emailAndPassword: { enabled: true },
		plugins: [
			admin(),
			sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
		],
		user: {
			additionalFields: {
				type: {
					type: ["rider", "prof"],
					required: false,
					defaultValue: "rider",
				}
			},
		},
	});
}

export type BetterAuth = ReturnType<typeof getAuth>;