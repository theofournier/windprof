<script lang="ts">
	import SportsHero from '$lib/components/sports/SportsHero.svelte';
	import SportsCards from '$lib/components/sports/SportsCards.svelte';
	import SportsTable from '$lib/components/sports/SportsTable.svelte';
	import SportsFocus from '$lib/components/sports/SportsFocus.svelte';
	import SportsFaq from '$lib/components/sports/SportsFaq.svelte';
	import { sports } from '$lib/components/sports/sportsData';
</script>

<svelte:head>
	<title>Disciplines — Windprof</title>
</svelte:head>

<div>
	<SportsHero />

	<div class="mx-auto max-w-360 px-5 sm:px-10 lg:px-14">
		<SportsCards {sports} />
		<SportsTable {sports} />
	</div>

	{#each sports as sport, i}
		<SportsFocus {sport} index={i} />
	{/each}

	<div class="mx-auto max-w-360 px-5 sm:px-10 lg:px-14">
		<SportsFaq />
	</div>
</div>
