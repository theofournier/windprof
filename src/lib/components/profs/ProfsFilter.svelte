<script lang="ts">
	import { PRICE_RANGE_MIN, PRICE_RANGE_MAX } from '$lib/constants';

	let {
		sort = $bindable('stars'),
		sports = $bindable([]),
		levels = $bindable([]),
		priceMin = $bindable(PRICE_RANGE_MIN),
		priceMax = $bindable(PRICE_RANGE_MAX),
		equipmentProvided = $bindable(false),
		isVerified = $bindable(false),
		languages = $bindable([]),
		sportCounts,
		resultCount
	}: {
		sort?: string;
		sports?: string[];
		levels?: string[];
		priceMin?: number;
		priceMax?: number;
		equipmentProvided?: boolean;
		isVerified?: boolean;
		languages?: string[];
		sportCounts: { kitesurf: number; wingfoil: number; windsurf: number };
		resultCount: number;
	} = $props();

	const LANG_CODES = ['FR', 'EN', 'ES', 'IT', 'DE', 'NL'];

	const SORT_OPTIONS = [
		{ value: 'relevance', label: 'Pertinence' },
		{ value: 'stars', label: 'Note' },
		{ value: 'price', label: 'Tarif' }
	];

	const LEVELS = [
		{ value: 'beginner', label: 'Débutant' },
		{ value: 'intermediate', label: 'Intermédiaire' },
		{ value: 'advanced', label: 'Avancé' }
	];

	const SPORTS = $derived([
		{ value: 'kitesurf', label: 'Kitesurf', count: sportCounts.kitesurf },
		{ value: 'wingfoil', label: 'Wingfoil', count: sportCounts.wingfoil },
		{ value: 'windsurf', label: 'Windsurf', count: sportCounts.windsurf }
	]);

	function toggleLanguage(code: string) {
		languages = languages.includes(code)
			? languages.filter((l) => l !== code)
			: [...languages, code];
	}

	function resetSort() {
		sort = 'stars';
	}

	function resetFilters() {
		sports = [];
		levels = [];
		priceMin = PRICE_RANGE_MIN;
		priceMax = PRICE_RANGE_MAX;
		equipmentProvided = false;
		isVerified = false;
		languages = [];
	}
</script>

{#snippet sortOption(value: string, label: string)}
	<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
		<input type="radio" name="sort_filter" {value} bind:group={sort} class="sr-only" />
		<span
			class="size-4 rounded-full border-[1.5px]"
			class:border-accent={sort === value}
			class:bg-accent={sort === value}
			class:border-muted={sort !== value}
		></span>
		{label}
	</label>
{/snippet}

{#snippet checkbox(checked: boolean, ontoggle: () => void, label: string, count?: number)}
	<label class="flex cursor-pointer items-center justify-between py-1.5">
		<input type="checkbox" {checked} onchange={ontoggle} class="sr-only" />
		<span class="flex items-center gap-2.5 text-sm">
			<span
				class="relative size-4 rounded-sm border-[1.5px]"
				class:border-accent={checked}
				class:bg-accent={checked}
				class:border-muted={!checked}
			>
			</span>
			{label}
		</span>
		{#if count !== undefined}
			<span class="font-mono text-label text-muted">{count}</span>
		{/if}
	</label>
{/snippet}

{#snippet toggle(checked: boolean, onchange: (v: boolean) => void, label: string)}
	<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
		<input
			type="checkbox"
			{checked}
			onchange={(e) => onchange(e.currentTarget.checked)}
			class="sr-only"
		/>
		<span
			class="relative h-4.5 w-7.5 rounded-full transition-colors {checked
				? 'bg-accent'
				: 'bg-ink/14'}"
		>
			<span
				class="absolute top-0.5 size-3.5 rounded-full bg-white shadow-sm transition-all"
				style:left={checked ? '14px' : '2px'}
			></span>
		</span>
		{label}
	</label>
{/snippet}

<aside
	class="rounded-[10px] border border-ink/14 bg-white px-6 py-5.5 lg:self-start"
>
	<div class="mb-1 flex items-center justify-between">
		<h3 class="m-0 text-lg">Trier</h3>
		<button
			onclick={resetSort}
			class="cursor-pointer font-mono text-label font-bold tracking-wide text-accent uppercase"
			>Reset</button
		>
	</div>

	<div class="border-t border-ink/14 py-4.5">
		{#each SORT_OPTIONS as opt (opt.value)}
			{@render sortOption(opt.value, opt.label)}
		{/each}
	</div>

	<div class="mb-1 flex items-center justify-between">
		<h3 class="m-0 text-lg">Filtres</h3>
		<button
			onclick={resetFilters}
			class="cursor-pointer font-mono text-label font-bold tracking-wide text-accent uppercase"
			>Reset</button
		>
	</div>

	<div class="border-t border-ink/14 py-4.5">
		<div class="mb-3 font-mono text-micro font-semibold tracking-label text-muted uppercase">
			DISCIPLINE
		</div>
		{#each SPORTS as opt (opt.value)}
			{@const checked = sports.includes(opt.value)}
			{@render checkbox(
				checked,
				() => {
					sports = checked ? sports.filter((s) => s !== opt.value) : [...sports, opt.value];
				},
				opt.label,
				opt.count
			)}
		{/each}
	</div>

	<div class="border-t border-ink/14 py-4.5">
		<div class="mb-3 font-mono text-micro font-semibold tracking-label text-muted uppercase">
			NIVEAU
		</div>
		{#each LEVELS as opt (opt.value)}
			{@const checked = levels.includes(opt.value)}
			{@render checkbox(
				checked,
				() => {
					levels = checked ? levels.filter((l) => l !== opt.value) : [...levels, opt.value];
				},
				opt.label
			)}
		{/each}
	</div>

	<div class="border-t border-ink/14 py-4.5">
		<div class="mb-3 font-mono text-micro font-semibold tracking-label text-muted uppercase">
			TARIF / HEURE
		</div>
		<div class="mb-2 flex justify-between font-mono text-caption text-muted">
			<span>{priceMin}€</span><span
				>{priceMax === PRICE_RANGE_MAX ? `${PRICE_RANGE_MAX}€+` : priceMax + '€'}</span
			>
		</div>
		<div class="price-range relative mb-2.5">
			<div
				class="pointer-events-none absolute top-1/2 right-0 left-0 h-1 -translate-y-1/2 rounded-full bg-ink/14"
			>
				<div
					class="absolute inset-y-0 rounded-full bg-accent"
					style="left:{(priceMin / PRICE_RANGE_MAX) * 100}%;right:{100 -
						(priceMax / PRICE_RANGE_MAX) * 100}%"
				></div>
			</div>
			<input
				type="range"
				min={PRICE_RANGE_MIN}
				max={PRICE_RANGE_MAX}
				step="5"
				bind:value={priceMin}
				oninput={() => {
					if (priceMin > priceMax - 10) priceMin = priceMax - 10;
				}}
			/>
			<input
				type="range"
				min={PRICE_RANGE_MIN}
				max={PRICE_RANGE_MAX}
				step="5"
				bind:value={priceMax}
				oninput={() => {
					if (priceMax < priceMin + 10) priceMax = priceMin + 10;
				}}
			/>
		</div>
	</div>

	<div class="border-t border-ink/14 py-4.5">
		<div class="mb-3 font-mono text-micro font-semibold tracking-label text-muted uppercase">
			OPTIONS
		</div>
		{@render toggle(equipmentProvided, (v) => (equipmentProvided = v), 'Matériel fourni')}
		{@render toggle(isVerified, (v) => (isVerified = v), 'Diplôme vérifié')}
	</div>

	<div class="border-t border-ink/14 py-4.5">
		<div class="mb-3 font-mono text-micro font-semibold tracking-label text-muted uppercase">
			LANGUES
		</div>
		<div class="flex flex-wrap gap-1.5">
			{#each LANG_CODES as code (code)}
				<button
					onclick={() => toggleLanguage(code)}
					class={languages.includes(code)
						? 'cursor-pointer rounded-sm border border-ink bg-ink px-2.75 py-1.25 font-mono text-label font-bold tracking-loose text-white'
						: 'cursor-pointer rounded-sm border border-ink/14 px-2.75 py-1.25 font-mono text-label font-bold tracking-loose text-ink'}
					>{code}</button
				>
			{/each}
		</div>
	</div>

	<div class="mt-4.5">
		<button
			class="inline-flex w-full cursor-pointer items-center justify-center rounded-sm bg-accent px-6 py-3.5 font-display text-body-sm font-bold tracking-[0.04em] text-white uppercase"
		>
			Appliquer
		</button>
	</div>
</aside>

<style>
	.price-range {
		height: 1.5rem;
		position: relative;
	}
	.price-range input[type='range'] {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		appearance: none;
		-webkit-appearance: none;
		pointer-events: none;
		background: transparent;
	}
	.price-range input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		pointer-events: all;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 2px solid #e8724c;
		background: white;
		cursor: pointer;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
	}
	.price-range input[type='range']::-moz-range-thumb {
		pointer-events: all;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		border: 2px solid #e8724c;
		background: white;
		cursor: pointer;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
	}
</style>
