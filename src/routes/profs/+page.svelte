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
</script>

<div class="mx-auto flex max-w-360 flex-col gap-8 px-4 pt-5 pb-9 sm:px-8 lg:px-14">
	<ProfSearch />
	<ProfsHeader />
	<div>
		<button
			onclick={() => (showFilter = !showFilter)}
			class="mb-4 inline-flex cursor-pointer items-center gap-2 rounded-sm border border-ink/14 bg-white px-4 py-2 text-sm font-semibold lg:hidden"
		>
			⊞ Filtres {showFilter ? '↑' : '↓'}
		</button>
		<div class="grid grid-cols-1 gap-9 lg:grid-cols-[280px_1fr]">
			<div class="lg:block" class:hidden={!showFilter}>
				<ProfsFilter />
			</div>
			<div>
				<ProfsActiveFilter />
				<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
					{#each data.profs as prof (prof.id)}
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
				<ProfsPaginator />
			</div>
		</div>
	</div>
</div>
