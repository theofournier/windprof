<script lang="ts">
	import SpotsHero from '$lib/components/spots/SpotsHero.svelte';
	import SpotsSearch from '$lib/components/spots/SpotsSearch.svelte';
	import SpotsFeatured from '$lib/components/spots/SpotsFeatured.svelte';
	import SpotsMap from '$lib/components/spots/SpotsMap.svelte';
	import SpotsFilter from '$lib/components/spots/SpotsFilter.svelte';
	import SpotRow from '$lib/components/spots/SpotsRow.svelte';
	import SpotsCTA from '$lib/components/spots/SpotsCTA.svelte';
	import type { Spot } from '$lib/components/spots/types.js';

	const SPOTS: Spot[] = [
		{
			id: 'leucate',
			name: 'Leucate — La Franqui',
			region: 'Aude · Occitanie',
			coords: '42.91°N · 3.05°E',
			kt: 24,
			gust: 32,
			dir: 'N',
			cardinals: [1, 1, 0, 0, 0, 0, 0, 0],
			beaufort: 6,
			water: 'mer · plate à clapot',
			wind: 'tramontane',
			moniteurs: 18,
			disciplines: ['Kitesurf', 'Wingfoil'],
			level: 'Tous niveaux',
			tide: 'faible',
			tag: 'CONDITIONS HOT',
			tagHot: true
		},
		{
			id: 'la-torche',
			name: 'La Torche',
			region: 'Finistère · Bretagne',
			coords: '47.83°N · 4.36°W',
			kt: 18,
			gust: 26,
			dir: 'W',
			cardinals: [0, 0, 0, 1, 1, 0, 0, 0],
			beaufort: 5,
			water: 'océan · vagues',
			wind: 'thermique W',
			moniteurs: 14,
			disciplines: ['Wingfoil', 'Windsurf'],
			level: 'Intermédiaire',
			tide: 'forte',
			tag: 'FAVORABLE',
			tagHot: false
		},
		{
			id: 'almanarre',
			name: 'Almanarre — Hyères',
			region: 'Var · PACA',
			coords: '43.07°N · 6.13°E',
			kt: 15,
			gust: 22,
			dir: 'E',
			cardinals: [0, 0, 1, 0, 0, 1, 0, 0],
			beaufort: 4,
			water: 'mer · plate',
			wind: 'est / ouest',
			moniteurs: 22,
			disciplines: ['Windsurf', 'Wingfoil'],
			level: 'Tous niveaux',
			tide: 'nulle',
			tag: 'CALME',
			tagHot: false
		},
		{
			id: 'wissant',
			name: 'Wissant',
			region: 'Pas-de-Calais · Hauts-de-France',
			coords: '50.88°N · 1.66°E',
			kt: 22,
			gust: 30,
			dir: 'SW',
			cardinals: [0, 0, 0, 0, 0, 0, 1, 0],
			beaufort: 6,
			water: 'mer · vagues',
			wind: 'flux W/SW',
			moniteurs: 9,
			disciplines: ['Kitesurf', 'Windsurf'],
			level: 'Avancé',
			tide: 'forte',
			tag: 'FAVORABLE',
			tagHot: false
		},
		{
			id: 'beauduc',
			name: 'Beauduc',
			region: 'Camargue · PACA',
			coords: '43.37°N · 4.57°E',
			kt: 21,
			gust: 28,
			dir: 'N',
			cardinals: [1, 0, 0, 0, 0, 0, 0, 0],
			beaufort: 5,
			water: 'lagune + mer',
			wind: 'mistral',
			moniteurs: 11,
			disciplines: ['Kitesurf', 'Wingfoil'],
			level: 'Intermédiaire',
			tide: 'faible',
			tag: 'FAVORABLE',
			tagHot: false
		},
		{
			id: 'gruissan',
			name: 'Gruissan — Mateille',
			region: 'Aude · Occitanie',
			coords: '43.10°N · 3.10°E',
			kt: 21,
			gust: 28,
			dir: 'N',
			cardinals: [1, 1, 0, 0, 0, 0, 0, 0],
			beaufort: 5,
			water: 'mer · plate',
			wind: 'tramontane',
			moniteurs: 13,
			disciplines: ['Kitesurf', 'Windsurf'],
			level: 'Tous niveaux',
			tide: 'faible',
			tag: 'FAVORABLE',
			tagHot: false
		},
		{
			id: 'quiberon',
			name: 'Quiberon — Penthièvre',
			region: 'Morbihan · Bretagne',
			coords: '47.52°N · 3.10°W',
			kt: 16,
			gust: 22,
			dir: 'W',
			cardinals: [0, 0, 0, 1, 1, 0, 0, 0],
			beaufort: 4,
			water: 'océan · vagues',
			wind: 'ouest',
			moniteurs: 8,
			disciplines: ['Kitesurf', 'Wingfoil'],
			level: 'Intermédiaire',
			tide: 'forte',
			tag: 'CALME',
			tagHot: false
		},
		{
			id: 'hourtin',
			name: 'Hourtin — lac',
			region: 'Médoc · Aquitaine',
			coords: '45.18°N · 1.05°W',
			kt: 12,
			gust: 18,
			dir: 'NW',
			cardinals: [1, 0, 0, 0, 1, 0, 0, 0],
			beaufort: 3,
			water: 'lac · plat',
			wind: 'thermique',
			moniteurs: 6,
			disciplines: ['Windsurf', 'Wingfoil'],
			level: 'Débutant',
			tide: 'aucune',
			tag: 'CALME',
			tagHot: false
		},
		{
			id: 'tarifa',
			name: 'Tarifa',
			region: 'Andalousie · Étranger',
			coords: '36.01°N · 5.61°W',
			kt: 27,
			gust: 35,
			dir: 'W',
			cardinals: [0, 0, 0, 1, 1, 0, 0, 0],
			beaufort: 7,
			water: 'détroit',
			wind: 'levante / poniente',
			moniteurs: 24,
			disciplines: ['Kitesurf', 'Wingfoil'],
			level: 'Tous niveaux',
			tide: 'forte',
			tag: 'TEMPÊTE',
			tagHot: true
		},
		{
			id: 'hyeres',
			name: "Hyères — l'Almanarre",
			region: 'Var · PACA',
			coords: '43.07°N · 6.13°E',
			kt: 14,
			gust: 19,
			dir: 'E',
			cardinals: [0, 0, 1, 0, 0, 0, 0, 0],
			beaufort: 4,
			water: 'mer · plate',
			wind: 'est',
			moniteurs: 17,
			disciplines: ['Windsurf', 'Wingfoil'],
			level: 'Tous niveaux',
			tide: 'nulle',
			tag: 'CALME',
			tagHot: false
		},
		{
			id: 'palavas',
			name: 'Palavas-les-Flots',
			region: 'Hérault · Occitanie',
			coords: '43.52°N · 3.93°E',
			kt: 17,
			gust: 23,
			dir: 'NE',
			cardinals: [1, 1, 0, 0, 0, 0, 0, 0],
			beaufort: 5,
			water: 'mer · plate',
			wind: 'tramontane',
			moniteurs: 7,
			disciplines: ['Kitesurf', 'Wingfoil'],
			level: 'Débutant',
			tide: 'faible',
			tag: 'FAVORABLE',
			tagHot: false
		},
		{
			id: 'dakhla',
			name: 'Dakhla',
			region: 'Sahara occ. · Étranger',
			coords: '23.71°N · 15.94°W',
			kt: 20,
			gust: 26,
			dir: 'NE',
			cardinals: [1, 1, 0, 0, 0, 0, 0, 0],
			beaufort: 5,
			water: 'lagune flat',
			wind: 'alizé',
			moniteurs: 5,
			disciplines: ['Kitesurf', 'Wingfoil'],
			level: 'Intermédiaire',
			tide: 'faible',
			tag: 'FAVORABLE',
			tagHot: false
		}
	];

	// Filter state
	let regions = $state<string[]>([]);
	let waterTypes = $state<string[]>([]);
	let disciplines = $state<string[]>([]);
	let windDirs = $state<string[]>([]);
	let windMin = $state(0);
	let windMax = $state(40);
	let sort = $state('wind');

	const SORT_OPTIONS = [
		{ label: 'Vent live', key: 'wind' },
		{ label: 'Note', key: 'note' },
		{ label: 'Moniteurs', key: 'moniteurs' },
		{ label: 'Région', key: 'region' }
	];

	let filteredSpots = $derived(
		SPOTS.filter((s) => {
			if (regions.length && !regions.some((r) => s.region.includes(r))) return false;
			if (disciplines.length && !s.disciplines.some((d) => disciplines.includes(d))) return false;
			if (windDirs.length && !windDirs.some((d) => s.dir.startsWith(d) || s.dir === d))
				return false;
			if (s.kt < windMin || s.kt > windMax) return false;
			return true;
		}).sort((a, b) => {
			if (sort === 'wind') return b.kt - a.kt;
			if (sort === 'moniteurs') return b.moniteurs - a.moniteurs;
			if (sort === 'region') return a.region.localeCompare(b.region);
			return 0;
		})
	);

	let featured = $derived(SPOTS.filter((s) => s.tagHot || s.kt >= 21).slice(0, 3));

	function resetFilters() {
		regions = [];
		waterTypes = [];
		disciplines = [];
		windDirs = [];
		windMin = 0;
		windMax = 40;
	}

	$effect(() => {
		filteredSpots;
	});
</script>

<div class="flex flex-col">
	<SpotsHero />
	<SpotsSearch />
	<SpotsFeatured spots={featured} />
	<SpotsMap />

	<!-- List section -->
	<section class="mx-auto w-full max-w-360 px-4 pb-20 sm:px-8 lg:px-14">
		<!-- Section header -->
		<div class="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
			<div>
				<div
					class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase"
				>
					↳ ATLAS · LISTE COMPLÈTE
				</div>
				<h2 class="m-0 font-display text-[42px] font-black leading-none tracking-[-0.03em]">
					{filteredSpots.length} spots
					<span class="font-serif font-normal italic normal-case tracking-snug text-muted"
						>· côte FR + classiques</span
					>
				</h2>

			</div>
			<div class="flex items-center gap-4">
				<span class="font-mono text-[10.5px] font-semibold tracking-label text-muted uppercase"
					>Trier par</span
				>
				<div class="flex gap-1 rounded-md border border-line bg-white p-1">
					{#each SORT_OPTIONS as opt}
						<button
							onclick={() => (sort = opt.key)}
							class="cursor-pointer rounded-sm border-none px-3.5 py-1.75 font-display text-caption font-black uppercase tracking-wide transition-colors {sort ===
							opt.key
								? 'bg-ink text-white'
								: 'bg-transparent text-muted'}"
						>
							{opt.label}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
			<SpotsFilter
				bind:regions
				bind:waterTypes
				bind:disciplines
				bind:windDirs
				bind:windMin
				bind:windMax
				resultCount={filteredSpots.length}
				onreset={resetFilters}
			/>

			<!-- Spot list -->
			<div class="flex flex-col gap-3">
				<!-- Column headers (desktop only) -->
				<div
					class="hidden lg:grid"
					style="grid-template-columns: 200px 1.5fr 1fr 90px 100px 1fr 120px; padding: 0 22px;"
				>
					{#each ['', 'SPOT · COORDS', 'DISCIPLINES', 'ROSE', 'VENT LIVE', "BEAUFORT · PLAN D'EAU", 'MONITEURS'] as col}
						<div
							class="py-2 font-mono text-[9.5px] tracking-label text-muted uppercase"
						>
							{col}
						</div>
					{/each}
				</div>

				{#each filteredSpots as spot, i (spot.id)}
					<SpotRow {spot} index={i} />
				{/each}

				{#if filteredSpots.length === 0}
					<div
						class="py-16 text-center font-mono text-label tracking-wider text-muted uppercase"
					>
						Aucun spot ne correspond à vos critères
					</div>
				{/if}
			</div>
		</div>
	</section>

	<SpotsCTA />
</div>
