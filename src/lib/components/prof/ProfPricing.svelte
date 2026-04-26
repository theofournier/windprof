<script lang="ts">
	let {
		items
	}: {
		items: { label: string; duration: string; price: string }[];
	} = $props();
</script>

<div class="mb-11">
	<div class="mb-2.5 font-mono text-label tracking-label text-accent uppercase">↳ TARIFS</div>
	<h2 class="mb-4.5 text-[38px]">Grille tarifaire</h2>

	<div class="overflow-hidden rounded-2.5 border border-ink/14 bg-white">
		{#each items as item, i (i)}
			<div
				class="grid grid-cols-[2fr_1fr_auto] items-center px-6 py-5 {i < items.length - 1
					? 'border-b border-ink/14'
					: ''}"
			>
				<div class="text-[15px] font-semibold">{item.label}</div>
				<div class="font-mono text-caption tracking-wide text-muted">{item.duration}</div>
				<div class="font-display text-[30px] tracking-snug">{item.price}</div>
			</div>
		{/each}
	</div>

	<div class="mt-2.5 font-mono text-label tracking-wide text-muted uppercase">
		Tarifs indicatifs — à confirmer en direct
	</div>
</div>
