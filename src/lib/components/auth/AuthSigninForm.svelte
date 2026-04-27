<script lang="ts">
	import { enhance } from '$app/forms';

	type FormResult = { error?: string; email?: string } | null;
	let { form = null }: { form?: FormResult } = $props();

	let showPassword = $state(false);
	let rememberMe = $state(true);
	let submitting = $state(false);
</script>

<div class="mx-auto w-full max-w-[440px] pt-10">
	<div class="mb-3 font-mono text-[11px] font-semibold tracking-label text-accent uppercase">
		↳ CONNEXION
	</div>
	<h2
		class="mb-3.5 font-display text-[clamp(36px,4vw,56px)] leading-[0.95] font-black tracking-tight text-ink uppercase"
	>
		Bon retour.
	</h2>
	<p class="mb-9 text-[14.5px] leading-[1.55] text-muted">
		Connecte-toi à ton compte Windprof — moniteur ou rider, même porte d'entrée.
	</p>

	<!-- SSO buttons -->
	<div class="mb-5.5 grid grid-cols-2 gap-2.5">
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
				class="mb-2.5 block font-mono text-[11px] font-semibold tracking-label text-accent uppercase"
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
				class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
			/>
		</div>

		<!-- Password -->
		<div>
			<div class="mb-2.5 flex items-baseline justify-between">
				<label
					for="password"
					class="font-mono text-[11px] font-semibold tracking-label text-accent uppercase"
				>
					↳ MOT DE PASSE
				</label>
				<a
					href="/forgot-password"
					class="font-mono text-[10.5px] tracking-loose text-muted underline uppercase transition-colors hover:text-ink"
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
		</div>

		<!-- Remember me -->
		<label class="mt-1 flex cursor-pointer items-center gap-3">
			<button
				type="button"
				role="checkbox"
				aria-checked={rememberMe}
				onclick={() => (rememberMe = !rememberMe)}
				class="mt-0.5 flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[4px] border-[1.5px] text-[11px] font-bold transition-colors {rememberMe
					? 'border-accent bg-accent text-white'
					: 'border-line bg-white text-transparent'}"
			>
				✓
			</button>
			<span class="text-[13px] text-muted">Garder ma session active sur ce navigateur</span>
		</label>

		<!-- Error banner -->
		{#if form?.error}
			<div
				class="rounded-md border border-red-200 bg-red-50 px-4 py-3 font-sans text-[13px] text-red-700"
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
				INSCRIPTION GRATUITE · 30 SECONDES
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
