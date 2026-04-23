<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<h1>Profs</h1>
<ul>
	{#each data.profs as prof}
		<li>
			<h3>{prof.name}</h3>
			<a href={`/profs/${prof.id}`}>View Details</a>
		</li>
	{/each}
</ul>
