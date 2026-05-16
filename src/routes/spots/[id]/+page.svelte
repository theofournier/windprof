<script lang="ts">
	import type { PageProps } from './$types';
	import ProfBreadcrumb from '$lib/components/prof/ProfBreadcrumb.svelte';
	import ProfAtAGlance from '$lib/components/prof/ProfAtAGlance.svelte';
	import ProfReviews from '$lib/components/prof/ProfReviews.svelte';
	import SpotGallery from '$lib/components/spot/SpotGallery.svelte';
	import SpotHero from '$lib/components/spot/SpotHero.svelte';
	import SpotForecast from '$lib/components/spot/SpotForecast.svelte';
	import SpotProfs from '$lib/components/spot/SpotProfs.svelte';

	let { data }: PageProps = $props();

	let spot = $derived(data.spot);
	let shortName = $derived(spot.name.split('—')[0].trim());
</script>

<svelte:head>
	<title>{spot.name} — Windprof</title>
</svelte:head>

<ProfBreadcrumb
	segments={[
		{ label: 'SPOTS', href: '/spots' },
		{ label: spot.region.split('·')[1]?.trim().toUpperCase() ?? spot.region.toUpperCase() },
		{ label: spot.name.toUpperCase() }
	]}
/>

<!-- Hero: gallery + info -->
<section
	class="mx-auto grid max-w-360 grid-cols-1 gap-8 px-4 pt-7 pb-12 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10 lg:px-14"
>
	<SpotGallery
		name={spot.name}
		kt={spot.kt}
		dir={spot.dir}
		gust={spot.gust}
		tag={spot.tag}
		tagHot={spot.tagHot}
		cardinals={spot.cardinals}
		beaufort={spot.beaufort}
	/>
	<SpotHero
		name={spot.name}
		region={spot.region}
		coords={spot.coords}
		avgRating={spot.avgRating}
		reviewCount={spot.reviewCount}
		disciplines={spot.disciplines}
		level={spot.level}
		description={spot.description}
		bestMonths={spot.bestMonths}
		facilities={spot.facilities}
	/>
</section>

<!-- Main content: forecast + profs + reviews / sidebar -->
<section
	class="mx-auto grid max-w-360 grid-cols-1 gap-8 px-4 pt-4 pb-20 sm:px-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10 lg:px-14"
>
	<div class="flex flex-col gap-8">
		<SpotForecast days={spot.forecast} spotName={shortName} threshold={15} />
		<SpotProfs profs={spot.profs} />
		<ProfReviews
			averageRating={spot.avgRating}
			totalReviews={spot.reviewCount}
			distribution={spot.distribution}
			reviews={spot.reviews}
		/>
	</div>

	<aside class="order-first flex flex-col gap-4.5 lg:sticky lg:top-5 lg:order-none lg:self-start">
		<ProfAtAGlance details={spot.glanceDetails} />

		<!-- Live conditions card -->
		<div class="rounded-2.5 border border-ink/14 bg-white px-6 py-5.5">
			<div class="mb-3.5 font-mono text-label tracking-label text-accent uppercase">
				↳ CONDITIONS ACTUELLES
			</div>
			<div class="flex items-end gap-3 border-b border-ink/8 pb-4">
				<div
					class="font-display text-[52px] leading-none font-black {spot.tagHot
						? 'text-accent'
						: 'text-ink'}"
				>
					{spot.kt}
				</div>
				<div class="mb-1.5">
					<div class="font-mono text-label tracking-wider text-muted uppercase">Nœuds</div>
					<div class="font-mono text-label tracking-wider text-muted uppercase">
						↗ {spot.dir} · Raf. {spot.gust}
					</div>
				</div>
			</div>
			<div class="mt-3.5 flex flex-col gap-2.5">
				<div class="flex justify-between">
					<span class="font-mono text-label tracking-wide text-muted uppercase">Beaufort</span>
					<span class="text-body-sm font-semibold">F{spot.beaufort}</span>
				</div>
				<div class="flex justify-between">
					<span class="font-mono text-label tracking-wide text-muted uppercase">Vent</span>
					<span class="text-body-sm font-semibold capitalize">{spot.wind}</span>
				</div>
				<div class="flex justify-between border-b border-ink/8 pb-2.5">
					<span class="font-mono text-label tracking-wide text-muted uppercase">Plan d'eau</span>
					<span class="text-right text-body-sm font-semibold">{spot.water}</span>
				</div>
			</div>
			<div class="mt-3.5">
				<span
					class="inline-flex items-center gap-2 rounded-full border border-ink/14 px-3 py-1.5 font-mono text-label tracking-wider {spot.tagHot
						? 'bg-accent text-white'
						: 'bg-bg-dark text-ink'}"
				>
					{#if spot.tagHot}
						<span class="h-1.5 w-1.5 rounded-full bg-white"></span>
					{/if}
					{spot.tag}
				</span>
			</div>
		</div>
	</aside>
</section>
