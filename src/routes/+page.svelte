<script lang="ts">
	import HomeHero from '$lib/components/homepage/HomeHero.svelte';
	import HomeSports from '$lib/components/homepage/HomeSports.svelte';
	import HomeHowItWorks from '$lib/components/homepage/HomeHowItWorks.svelte';
	import HomeFeaturedProfs from '$lib/components/homepage/HomeFeaturedProfs.svelte';
	import HomeTestimonials from '$lib/components/homepage/HomeTestimonials.svelte';
	import HomeBecomeProfCTA from '$lib/components/homepage/HomeBecomeProfCTA.svelte';
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
</script>

<svelte:head>
	<title>Windprof — Trouvez votre moniteur de vent</title>
</svelte:head>

<div>
	<HomeHero {profCount} />
	<HomeSports {sportCounts} />
	<HomeHowItWorks />
	<HomeFeaturedProfs profs={data.profs} {profCount} />
	<HomeTestimonials />
	<HomeBecomeProfCTA />
</div>
