import { betterAuth } from 'better-auth/minimal';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { getDb } from './db';
import { admin } from 'better-auth/plugins/admin';

export default betterAuth({
    baseURL: env.ORIGIN,
    secret: env.BETTER_AUTH_SECRET,
    emailAndPassword: { enabled: true },
    plugins: [
        admin(),
        sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
    ],
    database: drizzleAdapter(getDb, {
        provider: "sqlite",
        usePlural: true,
    }),
    user: {
        additionalFields: {
            type: {
                type: ["user", "prof"],
                required: false,
                defaultValue: "user",
            }
        },
    },
});
