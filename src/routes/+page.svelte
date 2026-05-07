<script lang="ts">
	import HomeHero from '$lib/components/homepage/HomeHero.svelte';
	import HomeDisciplines from '$lib/components/homepage/HomeDisciplines.svelte';
	import HomeHowItWorks from '$lib/components/homepage/HomeHowItWorks.svelte';
	import HomeFeaturedProfs from '$lib/components/homepage/HomeFeaturedProfs.svelte';
	import HomeSpots from '$lib/components/homepage/HomeSpots.svelte';
	import HomeForecast from '$lib/components/homepage/HomeForecast.svelte';
	import HomeTestimonials from '$lib/components/homepage/HomeTestimonials.svelte';
	import HomeBecomeProfCTA from '$lib/components/homepage/HomeBecomeProfCTA.svelte';
</script>

<svelte:head>
	<title>Windmatch — Trouvez votre moniteur de sport de vent</title>
</svelte:head>

<div>
	<HomeHero />
	<HomeDisciplines />
	<HomeHowItWorks />
	<HomeFeaturedProfs />
	<HomeSpots />
	<HomeForecast />
	<HomeTestimonials />
	<HomeBecomeProfCTA />
</div>
