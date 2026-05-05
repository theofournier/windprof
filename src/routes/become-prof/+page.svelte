<script lang="ts">
	import Hero from '$lib/components/become-prof/Hero.svelte';
	import StatsBar from '$lib/components/become-prof/StatsBar.svelte';
	import Pillars from '$lib/components/become-prof/Pillars.svelte';
	import Comparison from '$lib/components/become-prof/Comparison.svelte';
	import HowItWorks from '$lib/components/become-prof/HowItWorks.svelte';
	import ProfilePreview from '$lib/components/become-prof/ProfilePreview.svelte';
	import Testimonials from '$lib/components/become-prof/Testimonials.svelte';
	import Pricing from '$lib/components/become-prof/Pricing.svelte';
	import FAQ from '$lib/components/become-prof/FAQ.svelte';
	import FinalCTA from '$lib/components/become-prof/FinalCTA.svelte';
</script>

<div>
	<Hero />
	<div class="mx-auto flex max-w-360 flex-col gap-16 px-5 py-16 sm:px-10 lg:px-14">
		<StatsBar />
		<Pillars />
		<Comparison />
		<HowItWorks />
		<ProfilePreview />
		<Testimonials />
		<Pricing />
		<FAQ />
	</div>
	<FinalCTA />
</div>
