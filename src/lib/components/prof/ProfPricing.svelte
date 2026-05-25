<script lang="ts">
	import ProfSectionTitle from './ProfSectionTitle.svelte';

	let {
		items
	}: {
		items: { label: string; duration: string; price: string }[];
	} = $props();
</script>

<div class="mb-11">
	<ProfSectionTitle title="TARIFS" />
	<h2 class="mt-2.5 mb-3 font-display text-[38px] font-black">Grille tarifaire</h2>

	<div class="overflow-hidden rounded-md border border-ink/14 bg-white">
		{#each items as item, i (i)}
			<div
				class="grid grid-cols-[2fr_1fr_auto] items-center px-6 py-4 {i < items.length - 1
					? 'border-b border-ink/14'
					: ''}"
			>
				<div class="font-sans text-[15px] font-semibold">{item.label}</div>
				<div class="font-mono text-caption tracking-wide text-muted">{item.duration}</div>
				<div class="font-display text-[30px] font-black tracking-snug">{item.price}</div>
			</div>
		{/each}
	</div>

	<div class="mt-2.5 font-mono text-label tracking-wide text-muted uppercase">
		Tarifs indicatifs — à confirmer en direct
	</div>
</div>
