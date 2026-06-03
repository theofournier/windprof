<script lang="ts">
	import { enhance } from '$app/forms';

	let {
		profId,
		profName,
		userType
	}: {
		profId: string;
		profName: string;
		userType: 'rider' | 'prof' | null;
	} = $props();

	let hovered = $state(0);
	let selected = $state(0);
	let body = $state('');
	let expanded = $state(false);
	let submitting = $state(false);
	let submitted = $state(false);
	let serverError = $state<string | null>(null);

	const MAX_CHARS = 400;

	function selectStar(n: number) {
		selected = n;
		expanded = true;
		serverError = null;
	}

	function cancel() {
		selected = 0;
		hovered = 0;
		body = '';
		expanded = false;
		serverError = null;
	}
</script>

{#if userType === null}
	<div
		class="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-md border border-ink/14 bg-white px-6 py-5.5"
	>
		<div>
			<div class="text-sm font-bold text-ink">Vous avez suivi un cours avec {profName} ?</div>
			<div class="mt-0.5 font-mono text-label tracking-wide text-muted uppercase">
				Connectez-vous pour laisser un avis
			</div>
		</div>
		<div class="flex shrink-0 gap-2">
			<a
				href="/login"
				class="rounded-md border border-line bg-white px-4 py-2.5 font-mono text-[10.5px] font-bold tracking-loose text-ink uppercase transition-colors hover:border-ink"
			>
				Se connecter
			</a>
			<a
				href="/signup"
				class="rounded-md bg-accent px-4 py-2.5 font-mono text-[10.5px] font-bold tracking-loose text-white uppercase transition-colors hover:bg-accent/90"
			>
				S'inscrire
			</a>
		</div>
	</div>
{:else if userType === 'rider'}
	{#if submitted}
		<div class="mt-6 rounded-md border border-ink/14 bg-white px-6 py-5.5">
			<div class="font-mono text-label font-semibold tracking-label text-accent uppercase">
				↳ AVIS PUBLIÉ
			</div>
			<p class="mt-1 text-[14px] text-muted">Merci pour votre avis sur {profName} !</p>
		</div>
	{:else}
		<div class="mt-6 rounded-md border border-ink/14 bg-white px-6 py-5.5">
			<div class="flex items-center gap-4">
				<span class="text-[14px] text-muted">Vous avez suivi un cours ?</span>
				<div class="flex gap-0.5" role="group" aria-label="Choisir une note">
					{#each { length: 5 } as _, i (i)}
						<button
							type="button"
							class="cursor-pointer text-xl leading-none transition-colors {(hovered || selected) >
							i
								? 'text-accent'
								: 'text-ink/20'}"
							onmouseenter={() => (hovered = i + 1)}
							onmouseleave={() => (hovered = 0)}
							onclick={() => selectStar(i + 1)}
							aria-label="{i + 1} étoile{i > 0 ? 's' : ''}">★</button
						>
					{/each}
				</div>
			</div>

			{#if expanded}
				<form
					method="POST"
					action="?/submitReview"
					class="mt-5"
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
					<input type="hidden" name="rating" value={selected} />

					<div class="mb-4">
						<label
							for="review-body"
							class="mb-2 block font-mono text-label font-semibold tracking-label text-accent uppercase"
						>
							↳ VOTRE AVIS
						</label>
						<div class="relative">
							<textarea
								id="review-body"
								name="body"
								bind:value={body}
								maxlength={MAX_CHARS}
								rows={4}
								placeholder="Décrivez votre expérience avec {profName}…"
								class="w-full resize-none rounded-md border border-line bg-white px-3.5 py-3 pb-7 font-sans text-[14.5px] text-ink transition-all outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
							></textarea>
							<span
								class="absolute right-3 bottom-2.5 font-mono text-[10px] {body.length >= MAX_CHARS
									? 'text-red-400'
									: 'text-muted'}"
							>
								{body.length}/{MAX_CHARS}
							</span>
						</div>
					</div>

					{#if serverError}
						<div
							class="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 font-sans text-[13.5px] text-red-700"
							role="alert"
						>
							{serverError}
						</div>
					{/if}

					<div class="flex items-center gap-4">
						<button
							type="submit"
							disabled={submitting || !body.trim()}
							class="cursor-pointer rounded-md bg-accent px-5.5 py-3 font-display text-[13.5px] font-bold tracking-wide text-white uppercase transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
						>
							{submitting ? 'Publication…' : "Publier l'avis →"}
						</button>
						<button
							type="button"
							onclick={cancel}
							class="cursor-pointer font-mono text-[10.5px] tracking-loose text-muted uppercase underline transition-colors hover:text-ink"
						>
							Annuler
						</button>
					</div>
				</form>
			{/if}
		</div>
	{/if}
{/if}
