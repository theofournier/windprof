<script lang="ts">
	import { enhance } from '$app/forms';
	import { base } from '$app/paths';

	type FormResult = { error?: string; email?: string; success?: boolean } | null;
	let { form = null }: { form?: FormResult } = $props();

	let submitting = $state(false);
</script>

<div class="mx-auto w-full max-w-110 pt-10">
	<div class="mb-3 font-mono text-label font-semibold tracking-label text-accent uppercase">
		↳ MOT DE PASSE OUBLIÉ
	</div>
	<h2
		class="mb-3.5 font-display text-[clamp(36px,4vw,56px)] leading-[0.95] font-black tracking-tight text-ink uppercase"
	>
		Réinitialise<br />ton mot<br />de passe.
	</h2>
	<p class="mb-9 text-[14.5px] leading-body text-muted">
		Saisis ton adresse email et on t'envoie un lien pour créer un nouveau mot de passe.
	</p>

	{#if form?.success}
		<div
			class="rounded-md border border-green-200 bg-green-50 px-5 py-4 font-sans text-[14.5px] text-green-800"
			role="status"
		>
			<div class="mb-1 font-bold">Email envoyé !</div>
			<div class="text-green-700">
				Si un compte correspond à <strong>{form.email}</strong>, tu recevras un lien de
				réinitialisation dans les prochaines minutes. Pense à vérifier tes spams.
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
				{submitting ? 'Envoi…' : 'Envoyer le lien →'}
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
