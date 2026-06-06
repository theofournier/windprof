<script lang="ts">
	import type { Filter, StatusCounts } from './types';

	let {
		statusFilter = $bindable(),
		searchQuery = $bindable(),
		statusCounts
	}: {
		statusFilter: Filter;
		searchQuery: string;
		statusCounts: StatusCounts;
	} = $props();

	const statusFilters: { k: Filter; l: string }[] = [
		{ k: 'all', l: 'Tous' },
		{ k: 'pending', l: 'En attente' },
		{ k: 'verified', l: 'Vérifiés' },
		{ k: 'not_verified', l: 'Non vérifiés' },
		{ k: 'reported', l: 'Signalés' },
		{ k: 'confirmed', l: 'Confirmés' }
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
			placeholder="Rechercher nom, email, ville…"
			bind:value={searchQuery}
		/>
	</div>

	<div class="h-6 w-px bg-ink/10"></div>

	<span class="font-mono text-micro tracking-label text-muted uppercase">Statut</span>

	{#each statusFilters as f}
		<button
			class="inline-flex cursor-pointer items-center gap-1.5 rounded border px-2.75 py-1.75 font-mono text-caption font-semibold tracking-[0.04em] uppercase transition-colors
				{statusFilter === f.k
				? 'border-ink bg-ink text-white'
				: 'border-line bg-white text-[#4A5260] hover:bg-bg'}"
			onclick={() => (statusFilter = f.k)}
		>
			{#if f.k === 'pending' || f.k === 'reported'}
				<span class="h-1.25 w-1.25 rounded-full bg-accent"></span>
			{:else if f.k === 'confirmed'}
				<span class="h-1.25 w-1.25 rounded-full bg-[#8a6300]"></span>
			{/if}
			{f.l}
			<span class="ml-0.5 border-l border-current pl-1.5 text-[10.5px] opacity-60">
				{statusCounts[f.k]}
			</span>
		</button>
	{/each}
</div>
