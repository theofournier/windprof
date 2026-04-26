<script lang="ts">
	import { getContext } from 'svelte';

	const ctx = getContext<{ step: number; next: () => void; prev: () => void }>('profRegister');

	const totalSteps = 7;
</script>

<div class="mt-10 flex items-center justify-between border-t border-line pt-6">
	<button
		onclick={ctx.prev}
		disabled={ctx.step === 0}
		class="inline-flex cursor-pointer items-center gap-2.5 rounded-md border-[1.5px] border-ink bg-transparent px-5.5 py-3.5 font-display text-body-sm font-bold tracking-wide text-ink uppercase transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-35"
	>
		← Précédent
	</button>

	<div class="font-mono text-label tracking-loose text-muted uppercase">
		{ctx.step + 1} / {totalSteps}
	</div>

	{#if ctx.step < totalSteps - 1}
		<button
			onclick={ctx.next}
			class="inline-flex cursor-pointer items-center gap-2.5 rounded-md bg-accent px-5.5 py-3.5 font-display text-body-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-accent/90"
		>
			Continuer →
		</button>
	{:else}
		<button
			class="inline-flex cursor-pointer items-center gap-2.5 rounded-md bg-ink px-5.5 py-3.5 font-display text-body-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-dark"
		>
			Publier mon profil ✓
		</button>
	{/if}
</div>
