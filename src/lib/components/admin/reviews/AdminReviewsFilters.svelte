<script lang="ts">
	import type { RatingFilter } from './types';

	let {
		ratingFilter = $bindable(),
		searchQuery = $bindable(),
		ratingCounts
	}: {
		ratingFilter: RatingFilter;
		searchQuery: string;
		ratingCounts: Record<RatingFilter, number>;
	} = $props();

	const ratingFilters: { k: RatingFilter; l: string }[] = [
		{ k: 'all', l: 'Tous' },
		{ k: '5', l: '5 ★' },
		{ k: '4', l: '4 ★' },
		{ k: '3', l: '3 ★' },
		{ k: '2', l: '2 ★' },
		{ k: '1', l: '1 ★' }
	];
</script>

<div
	class="flex flex-wrap items-center gap-2.5 border border-b-0 border-ink/10 bg-white px-4 py-3.5"
>
	<div class="flex min-w-65 items-center gap-2 rounded border border-ink/10 bg-bg px-2.75 py-1.75">
		<svg width="13" height="13" viewBox="0 0 16 16" fill="none">
			<circle cx="7" cy="7" r="4.5" stroke="#4A5260" stroke-width="1.4" />
			<path d="m13 13-2.5-2.5" stroke="#4A5260" stroke-width="1.4" stroke-linecap="round" />
		</svg>
		<input
			class="flex-1 bg-transparent text-body-sm text-ink outline-none placeholder:text-muted"
			placeholder="Rechercher moniteur, rider, commentaire…"
			bind:value={searchQuery}
		/>
	</div>

	<div class="h-6 w-px bg-ink/10"></div>

	<span class="font-mono text-micro tracking-label text-muted uppercase">Note</span>

	{#each ratingFilters as f}
		<button
			class="inline-flex cursor-pointer items-center gap-1.5 rounded border px-2.75 py-1.75 font-mono text-caption font-semibold tracking-[0.04em] uppercase transition-colors
				{ratingFilter === f.k
				? 'border-ink bg-ink text-white'
				: 'border-line bg-white text-[#4A5260] hover:bg-bg'}"
			onclick={() => (ratingFilter = f.k)}
		>
			{#if f.k === '1' || f.k === '2'}
				<span class="h-1.25 w-1.25 rounded-full bg-accent"></span>
			{/if}
			{f.l}
			<span class="ml-0.5 border-l border-current pl-1.5 text-[10.5px] opacity-60">
				{ratingCounts[f.k]}
			</span>
		</button>
	{/each}
</div>
