<script lang="ts">
	import ProfItem from '$lib/components/prof/ProfItem.svelte';
	import ProfsActiveFilter from '$lib/components/prof/ProfsActiveFilter.svelte';
	import ProfSearch from '$lib/components/prof/ProfSearch.svelte';
	import ProfsFilter from '$lib/components/prof/ProfsFilter.svelte';
	import ProfsHeader from '$lib/components/prof/ProfsHeader.svelte';
	import ProfsPaginator from '$lib/components/prof/ProfsPaginator.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<div class="mx-auto flex max-w-360 flex-col gap-8 px-14 pt-5 pb-9">
	<ProfSearch />
	<ProfsHeader />
	<div class="grid grid-cols-[280px_1fr] gap-9">
		<ProfsFilter />
		<div>
			<ProfsActiveFilter />
			<div class="grid grid-cols-3 gap-5">
				{#each data.profs as prof}
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
