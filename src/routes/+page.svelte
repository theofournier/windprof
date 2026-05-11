<script lang="ts">
	import HomeHero from '$lib/components/homepage/HomeHero.svelte';
	import HomeSports from '$lib/components/homepage/HomeSports.svelte';
	import HomeHowItWorks from '$lib/components/homepage/HomeHowItWorks.svelte';
	import HomeFeaturedProfs from '$lib/components/homepage/HomeFeaturedProfs.svelte';
	import HomeTestimonials from '$lib/components/homepage/HomeTestimonials.svelte';
	import HomeBecomeProfCTA from '$lib/components/homepage/HomeBecomeProfCTA.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Windprof — Trouvez votre moniteur de vent</title>
</svelte:head>

<div>
	<HomeHero />
	<HomeSports />
	<HomeHowItWorks />
	<HomeFeaturedProfs profs={data.profs} />
	<HomeTestimonials />
	<HomeBecomeProfCTA />
</div>
