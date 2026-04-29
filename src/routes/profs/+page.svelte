<script lang="ts">
	import ProfItem from '$lib/components/profs/ProfItem.svelte';
	import ProfsActiveFilter from '$lib/components/profs/ProfsActiveFilter.svelte';
	import ProfSearch from '$lib/components/profs/ProfSearch.svelte';
	import ProfsFilter from '$lib/components/profs/ProfsFilter.svelte';
	import ProfsHeader from '$lib/components/profs/ProfsHeader.svelte';
	import ProfsPaginator from '$lib/components/profs/ProfsPaginator.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let showFilter = $state(false);

	const PAGE_SIZE = 9;
	let currentPage = $state(1);

	let location = $state('');
	let sports = $state<string[]>([]);
	let level = $state('');
	let sort = $state('stars');
	let priceMin = $state(0);
	let priceMax = $state(500);
	let equipmentProvided = $state(false);
	let isVerified = $state(false);
	let languages = $state<string[]>([]);

	let filteredProfs = $derived(
		data.profs
			.filter((p) => {
				if (location && !p.location?.toLowerCase().includes(location.toLowerCase())) return false;
				if (sports.length && !p.sports.some((s) => sports.includes(s))) return false;
				if (
					level &&
					p.acceptedLevels.length > 0 &&
					!p.acceptedLevels.includes(level) &&
					!p.acceptedLevels.includes('all')
				)
					return false;
				if (isVerified && !p.isVerified) return false;
				if (equipmentProvided && !p.equipmentProvided) return false;
				if (p.price > 0 && p.price < priceMin) return false;
				if (priceMax < 500 && p.price > 0 && p.price > priceMax) return false;
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
		kitesurf: data.profs.filter((p) => p.sports.includes('kitesurf')).length,
		wingfoil: data.profs.filter((p) => p.sports.includes('wingfoil')).length,
		windsurf: data.profs.filter((p) => p.sports.includes('windsurf')).length
	});

	function removeFilter(key: string, value?: string) {
		if (key === 'location') location = '';
		else if (key === 'sport' && value) sports = sports.filter((s) => s !== value);
		else if (key === 'level') level = '';
		else if (key === 'equipmentProvided') equipmentProvided = false;
		else if (key === 'isVerified') isVerified = false;
		else if (key === 'language' && value) languages = languages.filter((l) => l !== value);
		else if (key === 'price') {
			priceMin = 0;
			priceMax = 500;
		}
	}
</script>

<div class="mx-auto flex max-w-360 flex-col gap-8 px-4 pt-5 pb-9 sm:px-8 lg:px-14">
	<ProfSearch bind:location bind:sports bind:level />
	<ProfsHeader count={filteredProfs.length} {location} />
	<div>
		<button
			onclick={() => (showFilter = !showFilter)}
			class="mb-4 inline-flex cursor-pointer items-center gap-2 rounded-sm border border-ink/14 bg-white px-4 py-2 text-sm font-semibold lg:hidden"
		>
			⊞ Filtres {showFilter ? '↑' : '↓'}
		</button>
		<div class="grid grid-cols-1 gap-9 lg:grid-cols-[280px_1fr]">
			<div class="lg:block" class:hidden={!showFilter}>
				<ProfsFilter
					bind:sort
					bind:sports
					bind:level
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
					{level}
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
