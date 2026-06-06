<script lang="ts">
	import SportsHero from '$lib/components/sports/SportsHero.svelte';
	import SportsCards from '$lib/components/sports/SportsCards.svelte';
	import SportsTable from '$lib/components/sports/SportsTable.svelte';
	import SportsFocus from '$lib/components/sports/SportsFocus.svelte';
	import SportsFaq from '$lib/components/sports/SportsFaq.svelte';
	import { sports } from '$lib/components/sports/sportsData';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const profCount = $derived(data.profs.length);
	const sportCounts = $derived(
		data.profs.reduce(
			(acc, prof) => {
				for (const s of prof.sports) {
					acc[s.sport] = (acc[s.sport] ?? 0) + 1;
				}
				return acc;
			},
			{} as Record<string, number>
		)
	);
	const sportsWithCounts = $derived(
		sports.map((sport) => ({ ...sport, moniteurs: sportCounts[sport.id] ?? 0 }))
	);
</script>

<svelte:head>
	<title>Disciplines — Windprof</title>
</svelte:head>

<div>
	<SportsHero {profCount} />

	<div class="mx-auto max-w-360 px-5 sm:px-10 lg:px-14">
		<SportsCards sports={sportsWithCounts} />
		<SportsTable sports={sportsWithCounts} />
	</div>

	{#each sportsWithCounts as sport, i}
		<SportsFocus {sport} index={i} />
	{/each}

	<div class="mx-auto max-w-360 px-5 sm:px-10 lg:px-14">
		<SportsFaq />
	</div>
</div>
