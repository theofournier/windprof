<script lang="ts">
	import type { PageProps } from './$types';
	import ProfBreadcrumb from '$lib/components/prof/ProfBreadcrumb.svelte';
	import ProfGallery from '$lib/components/prof/ProfGallery.svelte';
	import ProfHero from '$lib/components/prof/ProfHero.svelte';
	import ProfPricing from '$lib/components/prof/ProfPricing.svelte';
	import ProfCertifications from '$lib/components/prof/ProfCertifications.svelte';
	import ProfSpots from '$lib/components/prof/ProfSpots.svelte';
	import ProfReviews from '$lib/components/prof/ProfReviews.svelte';
	import ProfAtAGlance from '$lib/components/prof/ProfAtAGlance.svelte';

	let { data }: PageProps = $props();
	let prof = $derived(data.prof);
	const location = prof.region ? `${prof.city} — ${prof.region}` : prof.city;
</script>

<svelte:head>
	<title>{prof.name} — Windprof</title>
</svelte:head>

<ProfBreadcrumb
	segments={[
		{ label: 'MONITEURS', href: '/profs' },
		...(prof.region ? [{ label: prof.region.toUpperCase() }] : []),
		{ label: prof.city.toUpperCase() },
		{ label: prof.name.toUpperCase() }
	]}
/>

<section
	class="mx-auto grid max-w-360 grid-cols-1 gap-8 px-4 pt-7 pb-12 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10 lg:px-14"
>
	<ProfGallery name={prof.name} windDirection="—" windRange="—" />
	<ProfHero
		name={prof.name}
		{location}
		stars={prof.avgRating}
		reviewCount={prof.reviewCount}
		isVerified={prof.isVerified}
		isPremium={false}
		bio={prof.bio}
		sports={prof.sports}
		levels={prof.levels}
		phone={prof.phone}
		email={prof.email}
	/>
</section>

<section
	class="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-4 pt-4 pb-16 sm:px-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10 lg:px-14"
>
	<div>
		<ProfPricing items={prof.prices} />
		<ProfCertifications certifications={prof.certifications} />
		<ProfSpots profName={prof.firstName} spots={prof.spots} />
		<ProfReviews
			averageRating={prof.avgRating}
			totalReviews={prof.reviewCount}
			distribution={prof.distribution}
			reviews={prof.reviews}
		/>
	</div>

	<aside class="order-first flex flex-col gap-4.5 lg:sticky lg:top-5 lg:order-0 lg:self-start">
		<ProfAtAGlance details={prof.glanceDetails} />
	</aside>
</section>
