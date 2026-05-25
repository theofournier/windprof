<script lang="ts">
	import { enhance } from '$app/forms';
	import { authClient } from '$lib/auth.client';
	import type { UserType } from '$lib/server/db/schema';
	import googleIcon from '$lib/assets/google.svg';
	import facebookIcon from '$lib/assets/facebook.svg';

	type FormResult = {
		error?: string;
		email?: string;
		firstName?: string;
		lastName?: string;
	} | null;

	const roles: { k: UserType; n: string; d: string; icon: string }[] = [
		{ k: 'prof', n: 'Moniteur', d: 'Je veux publier mon profil', icon: '⚐' },
		{ k: 'rider', n: 'Rider', d: 'Je cherche un coach', icon: '◇' }
	];

	let { form = null, roleParam = 'rider' }: { form?: FormResult; roleParam?: UserType } = $props();

	let role = $derived(roleParam);
	let showPassword = $state(false);
	let acceptCgu = $state(false);
	let newsletter = $state(false);
	let submitting = $state(false);
	let googleLoading = $state(false);
	let facebookLoading = $state(false);

	async function signInWithGoogle() {
		googleLoading = true;
		await authClient.signIn.social({ provider: 'google', callbackURL: '/' });
	}

	async function signInWithFacebook() {
		facebookLoading = true;
		await authClient.signIn.social({ provider: 'facebook', callbackURL: '/' });
	}
</script>

<div class="mx-auto w-full max-w-120">
	<div class="mb-3 font-mono text-label font-semibold tracking-label text-accent uppercase">
		↳ INSCRIPTION
	</div>
	<h2
		class="mb-3.5 font-display text-[clamp(32px,3.5vw,48px)] leading-[0.95] font-black tracking-tight text-ink uppercase"
	>
		Créer mon compte.
	</h2>
	<p class="mb-9 text-[14.5px] leading-body text-muted">
		Rejoins la communauté. Création de compte gratuite.
	</p>

	<!-- Role selector -->
	<div class="mb-7">
		<div class="mb-2.5 font-mono text-label font-semibold tracking-label text-accent uppercase">
			↳ JE SUIS…
		</div>
		<div class="grid grid-cols-2 gap-2.5">
			{#each roles as r (r.k)}
				{@const on = role === r.k}
				<button
					type="button"
					onclick={() => (role = r.k)}
					class="relative cursor-pointer overflow-hidden rounded-[10px] border px-5 py-4.5 text-left transition-all {on
						? 'border-ink bg-white shadow-[inset_0_0_0_1px_var(--color-ink)]'
						: 'border-line bg-bg-card'}"
				>
					{#if on}
						<span
							class="absolute top-3.5 right-3.5 flex h-5 w-5 items-center justify-center rounded-[4px] bg-accent text-xs font-bold text-white"
						>
							✓
						</span>
					{/if}
					<div class="mb-1 flex items-center gap-2.5">
						<span class="font-display text-xl {on ? 'text-accent' : 'text-muted'}">{r.icon}</span>
						<span class="text-base font-bold text-ink">{r.n}</span>
					</div>
					<div class="pl-7.5 text-[12.5px] text-muted">{r.d}</div>
				</button>
			{/each}
		</div>
	</div>

	<!-- Divider -->
	<div class="mb-6 h-px bg-line"></div>

	<!-- SSO buttons -->

	<div class="mb-5.5 grid grid-cols-2 gap-2.5">
		<button
			type="button"
			onclick={signInWithGoogle}
			disabled={googleLoading}
			class="flex cursor-pointer items-center justify-center gap-2.5 rounded-md border border-line bg-white px-4 py-3 font-sans text-body-sm font-semibold text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-60"
		>
			<img src={googleIcon} alt="Google logo" class="h-4 w-4" />
			Google
		</button>
		<button
			type="button"
			onclick={signInWithFacebook}
			disabled={facebookLoading}
			class="flex cursor-pointer items-center justify-center gap-2.5 rounded-md border border-line bg-white px-4 py-3 font-sans text-body-sm font-semibold text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-60"
		>
			<img src={facebookIcon} alt="Facebook logo" class="h-4 w-4" />
			Facebook
		</button>
	</div>

	<!-- Divider -->
	<div class="mb-6 flex items-center gap-3.5">
		<div class="h-px flex-1 bg-line"></div>
		<span class="font-mono text-[10.5px] tracking-widest text-muted uppercase">OU PAR EMAIL</span>
		<div class="h-px flex-1 bg-line"></div>
	</div>

	<form
		method="POST"
		class="flex flex-col gap-3.5"
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				await update();
				submitting = false;
			};
		}}
	>
		<input type="hidden" name="role" value={role} />

		<!-- First name + Last name -->
		<div class="grid grid-cols-2 gap-3">
			<div>
				<label
					for="firstName"
					class="mb-2.5 block font-mono text-label font-semibold tracking-label text-accent uppercase"
				>
					↳ PRÉNOM *
				</label>
				<input
					id="firstName"
					type="text"
					name="firstName"
					value={form?.firstName ?? ''}
					placeholder="Julien"
					autocomplete="given-name"
					class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink transition-all outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
				/>
			</div>
			<div>
				<label
					for="lastName"
					class="mb-2.5 block font-mono text-label font-semibold tracking-label text-accent uppercase"
				>
					↳ NOM *
				</label>
				<input
					id="lastName"
					type="text"
					name="lastName"
					value={form?.lastName ?? ''}
					placeholder="Mercier"
					autocomplete="family-name"
					class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink transition-all outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
				/>
			</div>
		</div>

		<!-- Email -->
		<div>
			<label
				for="email"
				class="mb-2.5 block font-mono text-label font-semibold tracking-label text-accent uppercase"
			>
				↳ EMAIL *
			</label>
			<input
				id="email"
				type="email"
				name="email"
				value={form?.email ?? ''}
				placeholder="julien@exemple.fr"
				autocomplete="email"
				class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink transition-all outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
			/>
		</div>

		<!-- Password -->
		<div>
			<label
				for="password"
				class="text-labelfont-semibold mb-2.5 block font-mono tracking-label text-accent uppercase"
			>
				↳ MOT DE PASSE *
			</label>
			<div class="relative">
				<input
					id="password"
					type={showPassword ? 'text' : 'password'}
					name="password"
					placeholder="••••••••••"
					autocomplete="new-password"
					class="w-full rounded-md border border-line bg-white px-3.5 py-3 pr-16 font-sans text-[14.5px] text-ink transition-all outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
				/>
				<button
					type="button"
					onclick={() => (showPassword = !showPassword)}
					class="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer font-mono text-[10.5px] tracking-loose text-muted uppercase underline transition-colors hover:text-ink"
				>
					{showPassword ? 'Masquer' : 'Voir'}
				</button>
			</div>
		</div>

		<!-- CGU checkbox -->
		<label class="mt-2 flex cursor-pointer items-start gap-3">
			<button
				type="button"
				role="checkbox"
				aria-checked={acceptCgu}
				onclick={() => (acceptCgu = !acceptCgu)}
				class="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-[4px] border-[1.5px] text-label font-bold transition-colors {acceptCgu
					? 'border-accent bg-accent text-white'
					: 'border-line bg-white text-transparent'}"
			>
				✓
			</button>
			<span class="text-[12.5px] leading-body text-muted">
				J'accepte les <a href="/cgu" class="font-semibold text-ink underline">CGU</a>
				et la
				<a href="/confidentialite" class="font-semibold text-ink underline"
					>politique de confidentialité</a
				>. Mes données restent en France. ( Requis pour créer un compte )
			</span>
		</label>

		<!-- Error banner -->
		{#if form?.error}
			<div
				class="rounded-md border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-700"
			>
				{form.error}
			</div>
		{/if}

		<!-- Submit CTA -->
		<button
			type="submit"
			disabled={submitting || !acceptCgu}
			class="mt-4 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-md bg-accent px-5 py-4 font-display text-[13.5px] font-bold tracking-wide text-white uppercase transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
		>
			{#if submitting}
				Création...
			{:else}
				{role === 'prof' ? 'Créer mon compte → étape suivante' : 'Créer mon compte rider →'}
			{/if}
		</button>
	</form>

	<div
		class="mt-3.5 text-center font-mono text-[10.5px] leading-relaxed tracking-loose text-muted uppercase"
	>
		⌥ {role === 'prof'
			? '7 ÉTAPES POUR PUBLIER · BROUILLON AUTO-SAUVÉ'
			: "ACCÈS IMMÉDIAT À L'ANNUAIRE · 0% COMMISSION"}
	</div>

	<!-- Signin nudge -->
	<div
		class="mt-8 grid items-center gap-4 rounded-lg border border-line bg-white p-5"
		style="grid-template-columns: 1fr auto;"
	>
		<div>
			<div class="mb-0.5 text-[13.5px] font-bold text-ink">Déjà un compte ?</div>
			<div class="font-mono text-[10.5px] tracking-loose text-muted uppercase">RE-CONNEXION</div>
		</div>
		<a
			href="/login"
			class="font-mono text-[11.5px] font-bold tracking-loose text-ink uppercase transition-all after:ml-1.5 after:content-['→'] hover:after:ml-3"
		>
			Se connecter
		</a>
	</div>
</div>
