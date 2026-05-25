<script lang="ts">
	import { enhance } from '$app/forms';
	import { base } from '$app/paths';

	type FormResult = { error?: string; success?: boolean } | null;
	let { form = null, token }: { form?: FormResult; token: string | null } = $props();

	let showPassword = $state(false);
	let showConfirm = $state(false);
	let submitting = $state(false);
</script>

<div class="mx-auto w-full max-w-110 pt-10">
	<div class="mb-3 font-mono text-label font-semibold tracking-label text-accent uppercase">
		↳ NOUVEAU MOT DE PASSE
	</div>
	<h2
		class="mb-3.5 font-display text-[clamp(36px,4vw,56px)] leading-[0.95] font-black tracking-tight text-ink uppercase"
	>
		Choisis un<br />nouveau mot<br />de passe.
	</h2>
	<p class="mb-9 text-[14.5px] leading-body text-muted">
		Saisis ton nouveau mot de passe ci-dessous. Il doit faire au moins 8 caractères.
	</p>

	{#if !token}
		<div
			class="rounded-md border border-red-200 bg-red-50 px-5 py-4 font-sans text-[14.5px] text-red-800"
			role="alert"
		>
			<div class="mb-1 font-bold">Lien invalide ou expiré</div>
			<div class="text-red-700">
				Ce lien de réinitialisation n'est plus valide. <a
					href="{base}/forgot-password"
					class="underline hover:text-red-900">Demande un nouveau lien.</a
				>
			</div>
		</div>
	{:else if form?.success}
		<div
			class="rounded-md border border-green-200 bg-green-50 px-5 py-4 font-sans text-[14.5px] text-green-800"
			role="status"
		>
			<div class="mb-1 font-bold">Mot de passe mis à jour !</div>
			<div class="text-green-700">
				Tu peux maintenant <a href="/login" class="underline hover:text-green-900">te connecter</a> avec
				ton nouveau mot de passe.
			</div>
		</div>
	{:else}
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
			<input type="hidden" name="token" value={token} />

			<!-- New password -->
			<div>
				<div class="mb-2.5 flex items-baseline justify-between">
					<label
						for="newPassword"
						class="font-mono text-label font-semibold tracking-label text-accent uppercase"
					>
						↳ NOUVEAU MOT DE PASSE
					</label>
				</div>
				<div class="relative">
					<input
						id="newPassword"
						type={showPassword ? 'text' : 'password'}
						name="newPassword"
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

			<!-- Confirm password -->
			<div>
				<label
					for="confirmPassword"
					class="mb-2.5 block font-mono text-label font-semibold tracking-label text-accent uppercase"
				>
					↳ CONFIRMER LE MOT DE PASSE
				</label>
				<div class="relative">
					<input
						id="confirmPassword"
						type={showConfirm ? 'text' : 'password'}
						name="confirmPassword"
						placeholder="••••••••••"
						autocomplete="new-password"
						class="w-full rounded-md border border-line bg-white px-3.5 py-3 pr-16 font-sans text-[14.5px] text-ink transition-all outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
					/>
					<button
						type="button"
						onclick={() => (showConfirm = !showConfirm)}
						class="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer font-mono text-[10.5px] tracking-loose text-muted uppercase underline transition-colors hover:text-ink"
					>
						{showConfirm ? 'Masquer' : 'Voir'}
					</button>
				</div>
			</div>

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
				{submitting ? 'Mise à jour…' : 'Mettre à jour →'}
			</button>
		</form>
	{/if}

	<!-- Back to login -->
	<div class="mt-8 flex items-center justify-center">
		<a
			href="{base}/login"
			class="font-mono text-[10.5px] tracking-loose text-muted uppercase underline transition-colors hover:text-ink"
		>
			← Retour à la connexion
		</a>
	</div>
</div>
