<script lang="ts">
	import { enhance } from '$app/forms';
	import { authClient } from '$lib/auth.client';
	import googleIcon from '$lib/assets/google.svg';
	import facebookIcon from '$lib/assets/facebook.svg';

	type FormResult = { error?: string; email?: string } | null;
	let { form = null }: { form?: FormResult } = $props();

	let showPassword = $state(false);
	let rememberMe = $state(true);
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

<div class="mx-auto w-full max-w-110 pt-10">
	<div class="mb-3 font-mono text-label font-semibold tracking-label text-accent uppercase">
		↳ CONNEXION
	</div>
	<h2
		class="mb-3.5 font-display text-[clamp(36px,4vw,56px)] leading-[0.95] font-black tracking-tight text-ink uppercase"
	>
		Bon retour.
	</h2>
	<p class="mb-9 text-[14.5px] leading-body text-muted">
		Connecte-toi à ton compte Windprof — moniteur ou rider, même porte d'entrée.
	</p>

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

	<!-- Email / password divider -->
	<div class="my-1.5 mb-6 flex items-center gap-3.5">
		<div class="h-px flex-1 bg-line"></div>
		<span class="font-mono text-[10.5px] tracking-widest text-muted uppercase">OU PAR EMAIL</span>
		<div class="h-px flex-1 bg-line"></div>
	</div>

	<form
		method="POST"
		class="flex flex-col gap-4"
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				await update();
				submitting = false;
			};
		}}
	>
		<!-- Email -->
		<div>
			<label
				for="email"
				class="mb-2.5 block font-mono text-label font-semibold tracking-label text-accent uppercase"
			>
				↳ EMAIL
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
			<div class="mb-2.5 flex items-baseline justify-between">
				<label
					for="password"
					class="font-mono text-label font-semibold tracking-label text-accent uppercase"
				>
					↳ MOT DE PASSE
				</label>
				<a
					href="/forgot-password"
					class="font-mono text-[10.5px] tracking-loose text-muted uppercase underline transition-colors hover:text-ink"
				>
					Mot de passe oublié ?
				</a>
			</div>
			<div class="relative">
				<input
					id="password"
					type={showPassword ? 'text' : 'password'}
					name="password"
					placeholder="••••••••••"
					autocomplete="current-password"
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

		<!-- Remember me -->
		<label class="mt-1 flex cursor-pointer items-center gap-3">
			<button
				type="button"
				role="checkbox"
				aria-checked={rememberMe}
				onclick={() => (rememberMe = !rememberMe)}
				class="mt-0.5 flex h-4.5 w-4.5 shrink-0 cursor-pointer items-center justify-center rounded-[4px] border-[1.5px] text-label font-bold transition-colors {rememberMe
					? 'border-accent bg-accent text-white'
					: 'border-line bg-white text-transparent'}"
			>
				✓
			</button>
			<span class="text-body-sm text-muted">Garder ma session active sur ce navigateur</span>
		</label>

		<!-- Error banner -->
		{#if form?.error}
			<div
				class="rounded-md border border-red-200 bg-red-50 px-4 py-3 font-sans text-body-sm text-red-700"
				role="alert"
			>
				{form.error}
			</div>
		{/if}

		<!-- Submit CTA -->
		<button
			type="submit"
			disabled={submitting}
			class="mt-7 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-md bg-accent px-5.5 py-4 font-display text-[13.5px] font-bold tracking-wide text-white uppercase transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
		>
			{submitting ? 'Connexion…' : 'Se connecter →'}
		</button>
	</form>

	<!-- Create account nudge -->
	<div
		class="mt-8 grid items-center gap-4 rounded-lg border border-line bg-white p-5"
		style="grid-template-columns: 1fr auto;"
	>
		<div>
			<div class="mb-0.5 text-[13.5px] font-bold text-ink">Pas encore de compte ?</div>
			<div class="font-mono text-[10.5px] tracking-loose text-muted uppercase">
				INSCRIPTION GRATUITE
			</div>
		</div>
		<a
			href="/signup"
			class="font-mono text-[11.5px] font-bold tracking-loose text-ink uppercase transition-all after:ml-1.5 after:content-['→'] hover:after:ml-3"
		>
			Créer un compte
		</a>
	</div>
</div>
