import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { type DrizzleClient } from '$lib/server/db';
import { admin } from 'better-auth/plugins/admin';
import { Resend } from 'resend';
import { resetPasswordEmailTemplate } from '$lib/utils/resetPasswordEmailTemplate';

export function getAuth(db: DrizzleClient) {
  const resend = new Resend(env.RESEND_API_KEY);

  return betterAuth({
    baseURL: env.ORIGIN,
    secret: env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(db, {
      provider: "sqlite",
      usePlural: true,
    }),
    experimental: { joins: true },
    emailAndPassword: {
      enabled: true,
      async sendResetPassword({ user, url }) {
        await resend.emails.send({
          from: 'Windprof <' + env.RESEND_FROM_EMAIL + '>',
          to: user.email,
          subject: 'Réinitialise ton mot de passe — Windprof',
          html: resetPasswordEmailTemplate(user.name ?? user.email, url),
        });
      },
    },
    socialProviders: {
      google: {
        clientId: env.GOOGLE_CLIENT_ID as string,
        clientSecret: env.GOOGLE_CLIENT_SECRET as string,
      },
      facebook: {
        clientId: env.FACEBOOK_CLIENT_ID as string,
        clientSecret: env.FACEBOOK_CLIENT_SECRET as string,
      },
    },
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
export type Session = BetterAuth["$Infer"]["Session"]["session"];
export type User = BetterAuth["$Infer"]["Session"]["user"];
