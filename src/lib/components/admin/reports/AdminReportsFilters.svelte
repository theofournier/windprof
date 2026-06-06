<script lang="ts">
	import type { StatusFilter } from './types';

	let {
		statusFilter = $bindable(),
		searchQuery = $bindable(),
		statusCounts
	}: {
		statusFilter: StatusFilter;
		searchQuery: string;
		statusCounts: Record<StatusFilter, number>;
	} = $props();

	const STATUS_LABELS: Record<StatusFilter, string> = {
		all: 'Tous',
		pending: 'En attente',
		reviewed: 'Traités',
		dismissed: 'Rejetés'
	};

	const filters: StatusFilter[] = ['all', 'pending', 'reviewed', 'dismissed'];
</script>

<div class="mb-4 flex items-center gap-3">
	<div class="flex border border-ink/10 bg-white">
		{#each filters as f}
			<button
				onclick={() => (statusFilter = f)}
				class="flex cursor-pointer items-center gap-1.5 border-r border-ink/10 px-3.5 py-2 font-mono text-[10.5px] tracking-[0.06em] last:border-r-0 uppercase
					{statusFilter === f
					? 'bg-ink text-white'
					: 'bg-white text-[#4A5260] hover:bg-bg hover:text-ink'}"
			>
				{STATUS_LABELS[f]}
				<span
					class="rounded-sm px-1 py-px text-[9px] font-bold {statusFilter === f
						? 'bg-white/20 text-white'
						: 'bg-ink/8 text-ink'}"
				>
					{statusCounts[f]}
				</span>
			</button>
		{/each}
	</div>

	<input
		type="search"
		placeholder="Rechercher moniteur, email, raison…"
		bind:value={searchQuery}
		class="ml-auto w-72 rounded border border-line bg-white px-3 py-2 font-sans text-[13px] text-ink outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.07)]"
	/>
</div>
