<script lang="ts">
	import ProfSearch from '$lib/components/prof/ProfSearch.svelte';
	import ProfsHeader from '$lib/components/prof/ProfsHeader.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<div class="mx-auto flex max-w-360 flex-col gap-8 px-14 pt-5 pb-9">
	<ProfSearch />
	<ProfsHeader />
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
