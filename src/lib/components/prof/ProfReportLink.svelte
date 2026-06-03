<script lang="ts">
	import { enhance } from '$app/forms';

	let {
		profId,
		profName,
		userEmail
	}: {
		profId: string;
		profName: string;
		userEmail: string | null;
	} = $props();

	const REASONS = [
		'Informations incorrectes',
		"Faux profil / usurpation d'identité",
		'Comportement inapproprié',
		'Arnaque ou fraude',
		'Profil en double',
		'Autre'
	];

	let open = $state(false);
	let reason = $state('');
	let description = $state('');
	let email = $derived(userEmail ?? '');
	let submitting = $state(false);
	let submitted = $state(false);
	let serverError = $state<string | null>(null);

	const MAX_CHARS = 500;

	function openModal() {
		reason = '';
		description = '';
		email = userEmail ?? '';
		submitting = false;
		submitted = false;
		serverError = null;
		open = true;
	}

	function close() {
		open = false;
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) close();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') close();
	}
</script>

<div
	class="mt-2.5 flex justify-between px-1 font-mono text-label tracking-loose text-muted uppercase"
>
	<button class="cursor-pointer uppercase underline" onclick={openModal}>Signaler</button>
</div>

{#if open}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4 backdrop-blur-sm"
		role="presentation"
		onclick={handleBackdropClick}
		onkeydown={handleKeydown}
	>
		<div
			class="max-h-[calc(100dvh-2rem)] w-full max-w-120 overflow-y-auto rounded-xl border border-line bg-white p-7 shadow-xl"
			role="dialog"
			aria-modal="true"
			aria-labelledby="report-dialog-title"
		>
			{#if submitted}
				<div class="mb-1 font-mono text-label font-semibold tracking-widest text-accent uppercase">
					↳ SIGNALEMENT ENVOYÉ
				</div>
				<h2
					class="mb-3 font-display text-[26px] leading-tight font-black tracking-tight text-ink uppercase"
				>
					Merci pour votre signalement.
				</h2>
				<p class="mb-7 text-[14px] leading-relaxed text-muted">
					Nous avons bien reçu votre signalement concernant {profName}. Notre équipe le traitera
					dans les plus brefs délais.
				</p>
				<button
					onclick={close}
					class="w-full rounded-lg bg-ink px-4 py-3 text-[14px] font-semibold text-white transition hover:bg-ink/85"
				>
					Fermer
				</button>
			{:else}
				<h2
					id="report-dialog-title"
					class="mb-5 font-display text-[26px] leading-tight font-black tracking-tight text-ink uppercase"
				>
					Signaler {profName}
				</h2>

				<form
					method="POST"
					action="?/submitReport"
					use:enhance={() => {
						submitting = true;
						serverError = null;
						return async ({ result, update }) => {
							submitting = false;
							if (result.type === 'failure') {
								serverError =
									(result.data as { error?: string })?.error ?? 'Une erreur est survenue.';
							} else if (result.type === 'success') {
								submitted = true;
								await update();
							}
						};
					}}
				>
					<input type="hidden" name="profId" value={profId} />

					<fieldset class="mb-5">
						<legend
							class="mb-2.5 block font-mono text-label font-semibold tracking-label text-accent uppercase"
						>
							↳ RAISON
						</legend>
						<div class="flex flex-col gap-2">
							{#each REASONS as r (r)}
								<label
									class="flex cursor-pointer items-center gap-3 rounded-md border px-3.5 py-2.5 text-[13.5px] transition-colors {reason ===
									r
										? 'border-ink bg-ink/5 font-semibold'
										: 'border-line hover:border-ink/30'}"
								>
									<input
										type="radio"
										name="reason"
										value={r}
										bind:group={reason}
										class="accent-accent"
									/>
									{r}
								</label>
							{/each}
						</div>
					</fieldset>

					<div class="mb-5">
						<label
							for="report-description"
							class="mb-2 block font-mono text-label font-semibold tracking-label text-accent uppercase"
						>
							↳ DESCRIPTION{reason !== 'Autre' ? ' (optionnel)' : ''}
						</label>
						<div class="relative">
							<textarea
								id="report-description"
								name="description"
								bind:value={description}
								maxlength={MAX_CHARS}
								rows={3}
								placeholder="Décrivez le problème…"
								class="w-full resize-none rounded-md border border-line bg-white px-3.5 py-3 pb-7 font-sans text-[14.5px] text-ink transition-all outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
							></textarea>
							<span
								class="absolute right-3 bottom-2.5 font-mono text-micro {description.length >=
								MAX_CHARS
									? 'text-red-400'
									: 'text-muted'}"
							>
								{description.length}/{MAX_CHARS}
							</span>
						</div>
					</div>

					<div class="mb-6">
						<label
							for="report-email"
							class="mb-2 block font-mono text-label font-semibold tracking-label text-accent uppercase"
						>
							↳ VOTRE EMAIL
						</label>
						<input
							id="report-email"
							type="email"
							name="email"
							bind:value={email}
							required
							placeholder="votre@email.com"
							class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink transition-all outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
						/>
					</div>

					{#if serverError}
						<div
							class="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 font-sans text-[13.5px] text-red-700"
							role="alert"
						>
							{serverError}
						</div>
					{/if}

					<div class="flex flex-col gap-2.5">
						<button
							type="submit"
							disabled={submitting ||
								!reason ||
								(reason === 'Autre' && !description.trim()) ||
								!email.trim()}
							class="w-full cursor-pointer rounded-lg bg-ink px-4 py-3 text-[14px] font-semibold text-white transition hover:bg-ink/85 disabled:cursor-not-allowed disabled:opacity-60"
						>
							{submitting ? 'Envoi…' : 'Envoyer le signalement →'}
						</button>
						<button
							type="button"
							onclick={close}
							class="w-full rounded-lg border border-line bg-white px-4 py-3 text-[14px] font-semibold text-ink transition hover:bg-bg"
						>
							Annuler
						</button>
					</div>
				</form>
			{/if}
		</div>
	</div>
{/if}
