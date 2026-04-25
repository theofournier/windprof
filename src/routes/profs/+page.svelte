<script lang="ts">
	import ProfsActiveFilter from '$lib/components/prof/ProfsActiveFilter.svelte';
	import ProfSearch from '$lib/components/prof/ProfSearch.svelte';
	import ProfsFilter from '$lib/components/prof/ProfsFilter.svelte';
	import ProfsHeader from '$lib/components/prof/ProfsHeader.svelte';
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
		</div>
	</div>
</div>
<h1>Profs</h1>
<ul>
	{#each data.profs as prof}
		<li>
			<h3>{prof.name}</h3>
			<a href={`/profs/${prof.id}`}>View Details</a>
		</li>
	{/each}
</ul>
