<script lang="ts">
	import { enhance } from '$app/forms';

	type FormResult = { error?: string; email?: string; firstName?: string; lastName?: string } | null;
	type Role = 'moniteur' | 'rider';

	const roles: { k: Role; n: string; d: string; icon: string }[] = [
		{ k: 'moniteur', n: 'Moniteur', d: 'Je veux publier mon profil', icon: '⚐' },
		{ k: 'rider', n: 'Rider', d: 'Je cherche un coach', icon: '◇' }
	];

	let { form = null }: { form?: FormResult } = $props();

	let role: Role = $state('moniteur');
	let showPassword = $state(false);
	let acceptCgu = $state(true);
	let newsletter = $state(false);
	let submitting = $state(false);
</script>

<div class="mx-auto w-full max-w-[480px]">
	<div class="mb-3 font-mono text-[11px] font-semibold tracking-label text-accent uppercase">
		↳ INSCRIPTION · 30 SECONDES
	</div>
	<h2
		class="mb-3.5 font-display text-[clamp(32px,3.5vw,48px)] leading-[0.95] font-black tracking-tight text-ink uppercase"
	>
		Créer mon compte.
	</h2>
	<p class="mb-9 text-[14.5px] leading-[1.55] text-muted">
		Rejoins la communauté. Création de compte gratuite — la création de profil moniteur démarre
		juste après.
	</p>

	<!-- Role selector -->
	<div class="mb-7">
		<div class="mb-2.5 font-mono text-[11px] font-semibold tracking-label text-accent uppercase">
			↳ JE SUIS…
		</div>
		<div class="grid grid-cols-2 gap-2.5">
			{#each roles as r (r.k)}
				{@const on = role === r.k}
				<button
					type="button"
					onclick={() => (role = r.k)}
					class="relative cursor-pointer overflow-hidden rounded-[10px] border px-5 py-[18px] text-left transition-all {on
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
					<div class="pl-[30px] text-[12.5px] text-muted">{r.d}</div>
				</button>
			{/each}
		</div>
	</div>

	<!-- SSO buttons -->
	<div class="mb-6 grid grid-cols-2 gap-2.5">
		<button
			type="button"
			class="flex cursor-pointer items-center justify-center gap-2.5 rounded-md border border-line bg-white px-4 py-3 font-sans text-[13px] font-semibold text-ink transition-colors hover:border-ink"
		>
			<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
				<path
					fill="#4285F4"
					d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
				/>
				<path
					fill="#34A853"
					d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
				/>
				<path
					fill="#FBBC05"
					d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
				/>
				<path
					fill="#EA4335"
					d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
				/>
			</svg>
			Google
		</button>
		<button
			type="button"
			class="flex cursor-pointer items-center justify-center gap-2.5 rounded-md border border-line bg-white px-4 py-3 font-sans text-[13px] font-semibold text-ink transition-colors hover:border-ink"
		>
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="currentColor"
				aria-hidden="true"
				focusable="false"
			>
				<path
					d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
				/>
			</svg>
			Apple
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
					class="mb-2.5 block font-mono text-[11px] font-semibold tracking-label text-accent uppercase"
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
					class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
				/>
			</div>
			<div>
				<label
					for="lastName"
					class="mb-2.5 block font-mono text-[11px] font-semibold tracking-label text-accent uppercase"
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
					class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
				/>
			</div>
		</div>

		<!-- Email -->
		<div>
			<label
				for="email"
				class="mb-2.5 block font-mono text-[11px] font-semibold tracking-label text-accent uppercase"
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
				class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
			/>
		</div>

		<!-- Password -->
		<div>
			<label
				for="password"
				class="mb-2.5 block font-mono text-[11px] font-semibold tracking-label text-accent uppercase"
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
					class="w-full rounded-md border border-line bg-white px-3.5 py-3 pr-16 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
				/>
				<button
					type="button"
					onclick={() => (showPassword = !showPassword)}
					class="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer font-mono text-[10.5px] tracking-loose text-muted underline uppercase transition-colors hover:text-ink"
				>
					{showPassword ? 'Masquer' : 'Voir'}
				</button>
			</div>
			<!-- Strength meter -->
			<div class="mt-2 flex gap-1">
				<div class="h-[3px] flex-1 rounded-[2px] bg-accent"></div>
				<div class="h-[3px] flex-1 rounded-[2px] bg-accent"></div>
				<div class="h-[3px] flex-1 rounded-[2px] bg-accent-soft"></div>
				<div class="h-[3px] flex-1 rounded-[2px] bg-line"></div>
			</div>
			<div class="mt-1.5 font-mono text-[10px] tracking-wide text-muted uppercase">
				FORCE · CORRECT — AJOUTE UN CARACTÈRE SPÉCIAL POUR PASSER FORT
			</div>
			<div class="mt-1.5 font-mono text-[10.5px] tracking-wide text-muted">
				8 caractères minimum, dont un chiffre
			</div>
		</div>

		<!-- CGU checkbox -->
		<label class="mt-2 flex cursor-pointer items-start gap-3">
			<button
				type="button"
				role="checkbox"
				aria-checked={acceptCgu}
				onclick={() => (acceptCgu = !acceptCgu)}
				class="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[4px] border-[1.5px] text-[11px] font-bold transition-colors {acceptCgu
					? 'border-accent bg-accent text-white'
					: 'border-line bg-white text-transparent'}"
			>
				✓
			</button>
			<span class="text-[12.5px] leading-[1.55] text-muted">
				J'accepte les <a
					href="/cgu"
					class="font-semibold text-ink underline">CGU</a
				>
				et la
				<a href="/confidentialite" class="font-semibold text-ink underline"
					>politique de confidentialité</a
				>. Mes données restent en France.
			</span>
		</label>

		<!-- Newsletter checkbox -->
		<label class="flex cursor-pointer items-start gap-3">
			<button
				type="button"
				role="checkbox"
				aria-checked={newsletter}
				onclick={() => (newsletter = !newsletter)}
				class="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[4px] border-[1.5px] text-[11px] font-bold transition-colors {newsletter
					? 'border-accent bg-accent text-white'
					: 'border-line bg-white text-transparent'}"
			>
				✓
			</button>
			<span class="text-[12.5px] leading-[1.55] text-muted">
				Je veux recevoir le brief vent du vendredi (1 mail/semaine, désinscription en un clic).
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
			disabled={submitting}
			class="mt-4 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-md bg-accent px-5 py-4 font-display text-[13.5px] font-bold tracking-wide text-white uppercase transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
		>
			{#if submitting}
				Création...
			{:else}
				{role === 'moniteur' ? 'Créer mon compte → étape suivante' : 'Créer mon compte rider →'}
			{/if}
		</button>
	</form>

	<div class="mt-3.5 text-center font-mono text-[10.5px] tracking-loose text-muted uppercase leading-relaxed">
		⌥ {role === 'moniteur'
			? '7 ÉTAPES POUR PUBLIER · BROUILLON AUTO-SAUVÉ'
			: "ACCÈS IMMÉDIAT À L'ANNUAIRE · 0% COMMISSION"}
	</div>
</div>
