<script lang="ts">
	import { PRICE_RANGE_MAX, PRICE_RANGE_MIN } from '$lib/constants';

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
		levels = [],
		location = '',
		equipmentProvided = false,
		isVerified = false,
		priceMin = PRICE_RANGE_MIN,
		priceMax = PRICE_RANGE_MAX,
		languages = [],
		onremove
	}: {
		sports?: string[];
		levels?: string[];
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
			levels.length > 0 ||
			!!location ||
			equipmentProvided ||
			isVerified ||
			priceMin > PRICE_RANGE_MIN ||
			priceMax < PRICE_RANGE_MAX ||
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

		{#each levels as lv (lv)}
			<span
				class="inline-flex items-center gap-2 rounded-sm border border-ink/14 bg-white px-3 py-1 text-sm"
			>
				{LEVEL_LABELS[lv] ?? lv}
				<button onclick={() => onremove('level', lv)} class="cursor-pointer text-muted">✕</button>
			</span>
		{/each}

		{#if priceMin > PRICE_RANGE_MIN || priceMax < PRICE_RANGE_MAX}
			<span
				class="inline-flex items-center gap-2 rounded-sm border border-ink/14 bg-white px-3 py-1 text-sm"
			>
				{priceMin}–{priceMax === PRICE_RANGE_MAX ? `${PRICE_RANGE_MAX}+` : priceMax} €/h
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
