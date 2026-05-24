<script lang="ts">
	import ProfItem from '$lib/components/profs/ProfsItem.svelte';
	import ProfsActiveFilter from '$lib/components/profs/ProfsActiveFilter.svelte';
	import ProfSearch from '$lib/components/profs/ProfsSearch.svelte';
	import ProfsFilter from '$lib/components/profs/ProfsFilter.svelte';
	import ProfsHeader from '$lib/components/profs/ProfsHeader.svelte';
	import ProfsPaginator from '$lib/components/profs/ProfsPaginator.svelte';
	import type { PageProps } from './$types';
	import { mapProfItem } from '$lib/utils/mapProfItem';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { untrack } from 'svelte';
	import { PRICE_RANGE_MAX, PRICE_RANGE_MIN } from '$lib/constants';

	let { data }: PageProps = $props();
	let profItems = $derived(data.profs.map(mapProfItem));
	let showFilter = $state(false);

	const PAGE_SIZE = 9;

	// Initialize state from URL params
	const p0 = page.url.searchParams;
	const singleSport = p0.get('sport');
	let location = $state(p0.get('location') ?? '');
	let sports = $state<string[]>(p0.getAll('sports').length > 0 ? p0.getAll('sports') : singleSport ? [singleSport] : []);
	let levels = $state<string[]>(p0.getAll('levels'));
	let sort = $state(p0.get('sort') ?? 'stars');
	let priceMin = $state(Number(p0.get('priceMin') ?? PRICE_RANGE_MIN));
	let priceMax = $state(Number(p0.get('priceMax') ?? PRICE_RANGE_MAX));
	let equipmentProvided = $state(p0.get('equipmentProvided') === 'true');
	let isVerified = $state(p0.get('isVerified') === 'true');
	let languages = $state<string[]>(p0.getAll('languages'));
	let currentPage = $state(Number(p0.get('page') ?? 1));

	let filteredProfs = $derived(
		profItems
			.filter((p) => {
				if (location && !p.location?.toLowerCase().includes(location.toLowerCase())) return false;
				if (sports.length && !p.sports.some((s) => sports.includes(s))) return false;
				if (
					levels.length &&
					p.acceptedLevels.length > 0 &&
					!levels.some((l) => p.acceptedLevels.includes(l)) &&
					!p.acceptedLevels.includes('all')
				)
					return false;
				if (isVerified && !p.isVerified) return false;
				if (equipmentProvided && !p.equipmentProvided) return false;
				if (p.price > PRICE_RANGE_MIN && p.price < priceMin) return false;
				if (priceMax < PRICE_RANGE_MAX && p.price > PRICE_RANGE_MIN && p.price > priceMax)
					return false;
				if (languages.length && !languages.some((l) => p.languages.includes(l))) return false;
				return true;
			})
			.sort((a, b) => {
				if (sort === 'stars') return b.stars - a.stars;
				if (sort === 'price') return a.price - b.price;
				return 0;
			})
	);

	let totalPages = $derived(Math.max(1, Math.ceil(filteredProfs.length / PAGE_SIZE)));
	let pagedProfs = $derived(
		filteredProfs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
	);

	$effect(() => {
		filteredProfs;
		currentPage = 1;
	});

	let sportCounts = $derived({
		kitesurf: profItems.filter((p) => p.sports.includes('kitesurf')).length,
		wingfoil: profItems.filter((p) => p.sports.includes('wingfoil')).length,
		windsurf: profItems.filter((p) => p.sports.includes('windsurf')).length
	});

	// Sync state → URL on every filter/page change
	$effect(() => {
		const params = new URLSearchParams();
		if (location) params.set('location', location);
		sports.forEach((s) => params.append('sports', s));
		levels.forEach((l) => params.append('levels', l));
		if (sort !== 'stars') params.set('sort', sort);
		if (priceMin !== PRICE_RANGE_MIN) params.set('priceMin', String(priceMin));
		if (priceMax !== PRICE_RANGE_MAX) params.set('priceMax', String(priceMax));
		if (equipmentProvided) params.set('equipmentProvided', 'true');
		if (isVerified) params.set('isVerified', 'true');
		languages.forEach((l) => params.append('languages', l));
		if (currentPage !== 1) params.set('page', String(currentPage));

		const newSearch = params.toString();
		untrack(() => {
			if (page.url.searchParams.toString() !== newSearch) {
				goto(`?${newSearch}`, { replaceState: true, noScroll: true, keepFocus: true });
			}
		});
	});

	function removeFilter(key: string, value?: string) {
		if (key === 'location') location = '';
		else if (key === 'sport' && value) sports = sports.filter((s) => s !== value);
		else if (key === 'level' && value) levels = levels.filter((l) => l !== value);
		else if (key === 'equipmentProvided') equipmentProvided = false;
		else if (key === 'isVerified') isVerified = false;
		else if (key === 'language' && value) languages = languages.filter((l) => l !== value);
		else if (key === 'price') {
			priceMin = PRICE_RANGE_MIN;
			priceMax = PRICE_RANGE_MAX;
		}
	}
</script>

<svelte:head>
	<title>Moniteurs — Windprof</title>
</svelte:head>

<div class="mx-auto flex max-w-360 flex-col gap-8 px-4 pt-5 pb-9 sm:px-8 lg:px-14">
	<ProfSearch bind:location bind:sports bind:levels />
	<ProfsHeader count={filteredProfs.length} {location} />
	<div>
		<button
			onclick={() => (showFilter = !showFilter)}
			class="mb-4 inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold shadow-sm transition-colors lg:hidden {showFilter
				? 'border-blue-200 bg-blue-50 text-blue-700'
				: 'border-ink/14 bg-white text-ink hover:bg-gray-50'}"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<line x1="4" y1="6" x2="20" y2="6" />
				<line x1="8" y1="12" x2="16" y2="12" />
				<line x1="11" y1="18" x2="13" y2="18" />
			</svg>
			Filtres
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="transition-transform {showFilter ? 'rotate-180' : ''}"
			>
				<polyline points="6 9 12 15 18 9" />
			</svg>
		</button>
		<div class="grid grid-cols-1 gap-9 lg:grid-cols-[280px_1fr]">
			<div class="lg:block" class:hidden={!showFilter}>
				<ProfsFilter
					bind:sort
					bind:sports
					bind:levels
					bind:priceMin
					bind:priceMax
					bind:equipmentProvided
					bind:isVerified
					bind:languages
					{sportCounts}
					resultCount={filteredProfs.length}
				/>
			</div>
			<div>
				<ProfsActiveFilter
					{sports}
					{levels}
					{location}
					{equipmentProvided}
					{isVerified}
					{priceMin}
					{priceMax}
					{languages}
					onremove={removeFilter}
				/>
				<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
					{#each pagedProfs as prof (prof.id)}
						<ProfItem
							id={prof.id}
							name={prof.name}
							isVerified={prof.isVerified}
							location={prof.location}
							stars={prof.stars}
							reviewCount={prof.reviewCount}
							sports={prof.sports}
							price={prof.price}
							certifications={prof.certifications}
						/>
					{/each}
				</div>
				<ProfsPaginator bind:currentPage {totalPages} />
			</div>
		</div>
	</div>
</div>
