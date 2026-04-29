<script lang="ts">
	let {
		sort = $bindable('stars'),
		sports = $bindable([]),
		level = $bindable(''),
		priceMin = $bindable(0),
		priceMax = $bindable(500),
		equipmentProvided = $bindable(false),
		isVerified = $bindable(false),
		languages = $bindable([]),
		sportCounts,
		resultCount
	}: {
		sort?: string;
		sports?: string[];
		level?: string;
		priceMin?: number;
		priceMax?: number;
		equipmentProvided?: boolean;
		isVerified?: boolean;
		languages?: string[];
		sportCounts: { kitesurf: number; wingfoil: number; windsurf: number };
		resultCount: number;
	} = $props();

	const LANG_CODES = ['FR', 'EN', 'ES', 'IT', 'DE', 'NL'];

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
		level = '';
		priceMin = 0;
		priceMax = 500;
		equipmentProvided = false;
		isVerified = false;
		languages = [];
	}
</script>

<aside class="rounded-[10px] border border-ink/14 bg-white px-6 py-5.5 lg:sticky lg:top-5 lg:self-start">
	<div class="mb-1 flex items-center justify-between">
		<h3 class="m-0 text-lg">Trier</h3>
		<button
			onclick={resetSort}
			class="cursor-pointer font-mono text-label font-bold tracking-wide text-accent uppercase"
			>Reset</button
		>
	</div>

	<div class="border-t border-ink/14 py-4.5">
		<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
			<input type="radio" name="sort_filter" value="relevance" bind:group={sort} class="sr-only" />
			<span
				class="size-4 rounded-full border-[1.5px]"
				class:border-accent={sort === 'relevance'}
				class:bg-accent={sort === 'relevance'}
				class:border-muted={sort !== 'relevance'}
			></span>
			Pertinence
		</label>
		<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
			<input type="radio" name="sort_filter" value="stars" bind:group={sort} class="sr-only" />
			<span
				class="size-4 rounded-full border-[1.5px]"
				class:border-accent={sort === 'stars'}
				class:bg-accent={sort === 'stars'}
				class:border-muted={sort !== 'stars'}
			></span>
			Note
		</label>
		<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
			<input type="radio" name="sort_filter" value="price" bind:group={sort} class="sr-only" />
			<span
				class="size-4 rounded-full border-[1.5px]"
				class:border-accent={sort === 'price'}
				class:bg-accent={sort === 'price'}
				class:border-muted={sort !== 'price'}
			></span>
			Tarif
		</label>
		<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
			<input type="radio" name="sort_filter" value="wind" bind:group={sort} class="sr-only" />
			<span
				class="size-4 rounded-full border-[1.5px]"
				class:border-accent={sort === 'wind'}
				class:bg-accent={sort === 'wind'}
				class:border-muted={sort !== 'wind'}
			></span>
			Vent
		</label>
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
		<label class="flex cursor-pointer items-center justify-between py-1.5">
			<input type="checkbox" value="kitesurf" bind:group={sports} class="sr-only" />
			<span class="flex items-center gap-2.5 text-sm">
				<span
					class="relative size-4 rounded-sm border-[1.5px]"
					class:border-accent={sports.includes('kitesurf')}
					class:bg-accent={sports.includes('kitesurf')}
					class:border-muted={!sports.includes('kitesurf')}
				>
					{#if sports.includes('kitesurf')}
						<span class="absolute -top-0.5 left-0.5 text-caption font-bold text-white">✓</span>
					{/if}
				</span>
				Kitesurf
			</span>
			<span class="font-mono text-label text-muted">{sportCounts.kitesurf}</span>
		</label>
		<label class="flex cursor-pointer items-center justify-between py-1.5">
			<input type="checkbox" value="wingfoil" bind:group={sports} class="sr-only" />
			<span class="flex items-center gap-2.5 text-sm">
				<span
					class="relative size-4 rounded-sm border-[1.5px]"
					class:border-accent={sports.includes('wingfoil')}
					class:bg-accent={sports.includes('wingfoil')}
					class:border-muted={!sports.includes('wingfoil')}
				>
					{#if sports.includes('wingfoil')}
						<span class="absolute -top-0.5 left-0.5 text-caption font-bold text-white">✓</span>
					{/if}
				</span>
				Wingfoil
			</span>
			<span class="font-mono text-label text-muted">{sportCounts.wingfoil}</span>
		</label>
		<label class="flex cursor-pointer items-center justify-between py-1.5">
			<input type="checkbox" value="windsurf" bind:group={sports} class="sr-only" />
			<span class="flex items-center gap-2.5 text-sm">
				<span
					class="relative size-4 rounded-sm border-[1.5px]"
					class:border-accent={sports.includes('windsurf')}
					class:bg-accent={sports.includes('windsurf')}
					class:border-muted={!sports.includes('windsurf')}
				>
					{#if sports.includes('windsurf')}
						<span class="absolute -top-0.5 left-0.5 text-caption font-bold text-white">✓</span>
					{/if}
				</span>
				Windsurf
			</span>
			<span class="font-mono text-label text-muted">{sportCounts.windsurf}</span>
		</label>
	</div>

	<div class="border-t border-ink/14 py-4.5">
		<div class="mb-3 font-mono text-micro font-semibold tracking-label text-muted uppercase">
			NIVEAU
		</div>
		<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
			<input type="radio" name="level_filter" value="beginner" bind:group={level} class="sr-only" />
			<span
				class="size-4 rounded-full border-[1.5px]"
				class:border-accent={level === 'beginner'}
				class:bg-accent={level === 'beginner'}
				class:border-muted={level !== 'beginner'}
			></span>
			Débutant
		</label>
		<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
			<input
				type="radio"
				name="level_filter"
				value="intermediate"
				bind:group={level}
				class="sr-only"
			/>
			<span
				class="size-4 rounded-full border-[1.5px]"
				class:border-accent={level === 'intermediate'}
				class:bg-accent={level === 'intermediate'}
				class:border-muted={level !== 'intermediate'}
			></span>
			Intermédiaire
		</label>
		<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
			<input type="radio" name="level_filter" value="advanced" bind:group={level} class="sr-only" />
			<span
				class="size-4 rounded-full border-[1.5px]"
				class:border-accent={level === 'advanced'}
				class:bg-accent={level === 'advanced'}
				class:border-muted={level !== 'advanced'}
			></span>
			Avancé
		</label>
		<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
			<input type="radio" name="level_filter" value="" bind:group={level} class="sr-only" />
			<span
				class="size-4 rounded-full border-[1.5px]"
				class:border-accent={level === ''}
				class:bg-accent={level === ''}
				class:border-muted={level !== ''}
			></span>
			Tous niveaux
		</label>
	</div>

	<div class="border-t border-ink/14 py-4.5">
		<div class="mb-3 font-mono text-micro font-semibold tracking-label text-muted uppercase">
			TARIF / HEURE
		</div>
		<div class="mb-2 flex justify-between font-mono text-caption text-muted">
			<span>{priceMin}€</span><span>{priceMax === 500 ? '500€+' : priceMax + '€'}</span>
		</div>
		<div class="price-range relative mb-2.5">
			<div
				class="pointer-events-none absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 rounded-full bg-ink/14"
			>
				<div
					class="absolute inset-y-0 rounded-full bg-accent"
					style="left:{(priceMin / 500) * 100}%;right:{100 - (priceMax / 500) * 100}%"
				></div>
			</div>
			<input
				type="range"
				min="0"
				max="500"
				step="5"
				bind:value={priceMin}
				oninput={() => {
					if (priceMin > priceMax - 10) priceMin = priceMax - 10;
				}}
			/>
			<input
				type="range"
				min="0"
				max="500"
				step="5"
				bind:value={priceMax}
				oninput={() => {
					if (priceMax < priceMin + 10) priceMax = priceMin + 10;
				}}
			/>
		</div>
		<div class="font-mono text-label tracking-loose text-muted uppercase">
			SÉLECTION : {priceMin}€ – {priceMax === 500 ? '500€+' : priceMax + '€'}
		</div>
	</div>

	<div class="border-t border-ink/14 py-4.5">
		<div class="mb-3 font-mono text-micro font-semibold tracking-label text-muted uppercase">
			OPTIONS
		</div>
		<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
			<input type="checkbox" bind:checked={equipmentProvided} class="sr-only" />
			<span
				class="relative h-4.5 w-7.5 rounded-full transition-colors {equipmentProvided
					? 'bg-accent'
					: 'bg-ink/14'}"
			>
				<span
					class="absolute top-0.5 size-3.5 rounded-full bg-white shadow-sm transition-all"
					style:left={equipmentProvided ? '14px' : '2px'}
				></span>
			</span>
			Matériel fourni
		</label>
		<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
			<input type="checkbox" bind:checked={isVerified} class="sr-only" />
			<span
				class="relative h-4.5 w-7.5 rounded-full transition-colors {isVerified
					? 'bg-accent'
					: 'bg-ink/14'}"
			>
				<span
					class="absolute top-0.5 size-3.5 rounded-full bg-white shadow-sm transition-all"
					style:left={isVerified ? '14px' : '2px'}
				></span>
			</span>
			Diplôme vérifié
		</label>
	</div>

	<div class="border-t border-ink/14 py-4.5">
		<div class="mb-3 font-mono text-micro font-semibold tracking-label text-muted uppercase">
			LANGUES
		</div>
		<div class="flex flex-wrap gap-1.5">
			{#each LANG_CODES as code}
				<button
					onclick={() => toggleLanguage(code)}
					class={languages.includes(code)
						? 'cursor-pointer rounded-sm border border-ink bg-ink px-2.75 py-1.25 font-mono text-label font-bold tracking-loose text-white'
						: 'cursor-pointer rounded-sm border border-ink/14 px-2.75 py-1.25 font-mono text-label font-bold tracking-loose text-ink'}
				>{code}</button>
			{/each}
		</div>
	</div>

	<div class="mt-4.5">
		<button
			class="inline-flex w-full cursor-pointer items-center justify-center rounded-sm bg-accent px-6 py-3.5 font-display text-body-sm font-bold tracking-[0.04em] text-white uppercase"
		>
			Appliquer · {resultCount} résultat{resultCount > 1 ? 's' : ''}
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
