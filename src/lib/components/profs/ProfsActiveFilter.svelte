<script lang="ts">
	const SPORT_LABELS: Record<string, string> = {
		kitesurf: 'Kitesurf',
		wingfoil: 'Wingfoil',
		windsurf: 'Windsurf'
	};

	const LEVEL_LABELS: Record<string, string> = {
		beginner: 'Débutant',
		intermediate: 'Intermédiaire',
		advanced: 'Avancé'
	};

	let {
		sports = [],
		level = '',
		location = '',
		equipmentProvided = false,
		isVerified = false,
		priceMin = 0,
		priceMax = 500,
		languages = [],
		onremove
	}: {
		sports?: string[];
		level?: string;
		location?: string;
		equipmentProvided?: boolean;
		isVerified?: boolean;
		priceMin?: number;
		priceMax?: number;
		languages?: string[];
		onremove: (key: string, value?: string) => void;
	} = $props();

	let hasActiveFilters = $derived(
		sports.length > 0 ||
			!!level ||
			!!location ||
			equipmentProvided ||
			isVerified ||
			priceMin > 0 ||
			priceMax < 500 ||
			languages.length > 0
	);
</script>

{#if hasActiveFilters}
	<div class="mb-4.5 flex flex-wrap items-center gap-2">
		<span class="mr-1 font-mono text-micro font-semibold tracking-label text-muted uppercase"
			>ACTIFS</span
		>

		{#if location}
			<span
				class="inline-flex items-center gap-2 rounded-sm border border-ink/14 bg-white px-3 py-1 text-sm"
			>
				{location}
				<button onclick={() => onremove('location')} class="cursor-pointer text-muted">✕</button>
			</span>
		{/if}

		{#each sports as sport}
			<span
				class="inline-flex items-center gap-2 rounded-sm border border-ink/14 bg-white px-3 py-1 text-sm"
			>
				{SPORT_LABELS[sport] ?? sport}
				<button onclick={() => onremove('sport', sport)} class="cursor-pointer text-muted">✕</button
				>
			</span>
		{/each}

		{#if level}
			<span
				class="inline-flex items-center gap-2 rounded-sm border border-ink/14 bg-white px-3 py-1 text-sm"
			>
				{LEVEL_LABELS[level] ?? level}
				<button onclick={() => onremove('level')} class="cursor-pointer text-muted">✕</button>
			</span>
		{/if}

		{#if priceMin > 0 || priceMax < 500}
			<span
				class="inline-flex items-center gap-2 rounded-sm border border-ink/14 bg-white px-3 py-1 text-sm"
			>
				{priceMin}–{priceMax === 500 ? '500+' : priceMax} €/h
				<button onclick={() => onremove('price')} class="cursor-pointer text-muted">✕</button>
			</span>
		{/if}

		{#if equipmentProvided}
			<span
				class="inline-flex items-center gap-2 rounded-sm border border-ink/14 bg-white px-3 py-1 text-sm"
			>
				Matériel fourni
				<button onclick={() => onremove('equipmentProvided')} class="cursor-pointer text-muted"
					>✕</button
				>
			</span>
		{/if}

		{#if isVerified}
			<span
				class="inline-flex items-center gap-2 rounded-sm border border-ink/14 bg-white px-3 py-1 text-sm"
			>
				Vérifié
				<button onclick={() => onremove('isVerified')} class="cursor-pointer text-muted">✕</button>
			</span>
		{/if}

		{#each languages as lang}
			<span
				class="inline-flex items-center gap-2 rounded-sm border border-ink/14 bg-white px-3 py-1 text-sm"
			>
				{lang}
				<button onclick={() => onremove('language', lang)} class="cursor-pointer text-muted"
					>✕</button
				>
			</span>
		{/each}
	</div>
{/if}
