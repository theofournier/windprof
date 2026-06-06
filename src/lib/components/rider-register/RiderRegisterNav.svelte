<script lang="ts">
	import { getRiderRegisterCtx } from './context';

	const ctx = getRiderRegisterCtx();

	const totalSteps = 5;
</script>

<div class="mt-10 flex items-center justify-between border-t border-line pt-6">
	<button
		type="button"
		onclick={ctx.prev}
		disabled={ctx.step === 0}
		class="inline-flex cursor-pointer items-center gap-2.5 rounded-md border-[1.5px] border-ink bg-transparent px-3.5 py-2.5 sm:px-5.5 sm:py-3.5 font-display text-body-sm font-bold tracking-wide text-ink uppercase transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-35"
	>
		<span class="hidden sm:inline">← Précédent</span><span class="sm:hidden">←</span>
	</button>

	<div class="font-mono text-label tracking-loose text-muted uppercase">
		{ctx.step + 1} / {totalSteps}
	</div>

	{#if ctx.step < totalSteps - 1}
		<button
			type="button"
			onclick={ctx.next}
			class="inline-flex cursor-pointer items-center gap-2.5 rounded-md bg-accent px-3.5 py-2.5 sm:px-5.5 sm:py-3.5 font-display text-body-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-accent/90"
		>
			<span class="hidden sm:inline">Continuer →</span><span class="sm:hidden">→</span>
		</button>
	{:else}
		<button
			type="submit"
			disabled={ctx.submitting}
			class="inline-flex cursor-pointer items-center gap-2.5 rounded-md bg-ink px-3.5 py-2.5 sm:px-5.5 sm:py-3.5 font-display text-body-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-dark disabled:cursor-not-allowed disabled:opacity-60"
		>
			<span class="hidden sm:inline">{ctx.submitting ? 'Envoi en cours…' : 'Voir les moniteurs ✓'}</span><span class="sm:hidden">✓</span>
		</button>
	{/if}
</div>
