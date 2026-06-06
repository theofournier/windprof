<script lang="ts">
	import type { UserFilter, UserTypeFilter, StatusCounts } from './types';

	let {
		statusFilter = $bindable(),
		typeFilter = $bindable(),
		searchQuery = $bindable(),
		statusCounts
	}: {
		statusFilter: UserFilter;
		typeFilter: UserTypeFilter;
		searchQuery: string;
		statusCounts: StatusCounts;
	} = $props();

	const statusFilters: { k: UserFilter; l: string }[] = [
		{ k: 'all', l: 'Tous' },
		{ k: 'verified', l: 'Email vérifié' },
		{ k: 'unverified', l: 'Non vérifié' }
	];

	const typeFilters: { k: UserTypeFilter; l: string }[] = [
		{ k: 'all', l: 'Tous types' },
		{ k: 'rider', l: 'Rider' },
		{ k: 'prof', l: 'Moniteur' }
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
			placeholder="Rechercher nom, email…"
			bind:value={searchQuery}
		/>
	</div>

	<div class="h-6 w-px bg-ink/10"></div>

	<span class="font-mono text-micro tracking-label text-muted uppercase">Statut email</span>

	{#each statusFilters as f}
		<button
			class="inline-flex cursor-pointer items-center gap-1.5 rounded border px-2.75 py-1.75 font-mono text-caption font-semibold tracking-[0.04em] uppercase transition-colors
				{statusFilter === f.k
				? 'border-ink bg-ink text-white'
				: 'border-line bg-white text-[#4A5260] hover:bg-bg'}"
			onclick={() => (statusFilter = f.k)}
		>
			{#if f.k === 'unverified'}
				<span class="h-1.25 w-1.25 rounded-full bg-accent"></span>
			{/if}
			{f.l}
			<span class="ml-0.5 border-l border-current pl-1.5 text-[10.5px] opacity-60">
				{statusCounts[f.k]}
			</span>
		</button>
	{/each}

	<div class="h-6 w-px bg-ink/10"></div>

	<span class="font-mono text-micro tracking-label text-muted uppercase">Type</span>

	{#each typeFilters as f}
		<button
			class="inline-flex cursor-pointer items-center gap-1.5 rounded border px-2.75 py-1.75 font-mono text-caption font-semibold tracking-[0.04em] uppercase transition-colors
				{typeFilter === f.k
				? 'border-ink bg-ink text-white'
				: 'border-line bg-white text-[#4A5260] hover:bg-bg'}"
			onclick={() => (typeFilter = f.k)}
		>
			{f.l}
		</button>
	{/each}
</div>
