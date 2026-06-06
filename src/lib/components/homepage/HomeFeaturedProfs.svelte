<script lang="ts">
	import type { ProfWithRelations } from '$lib/server/db/schema';
	import { mapProfItem } from '$lib/utils/mapProfItem';
	import ProfsItem from '../profs/ProfsItem.svelte';

	let { profs, profCount }: { profs: ProfWithRelations[]; profCount: number } = $props();
	let profItems = $derived(profs.slice(0, 4).map(mapProfItem));
</script>

<section class="mx-auto max-w-360 px-5 py-10 sm:px-10 lg:px-14">
	<!-- Section header -->
	<div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
		<div>
			<div class="mb-3 font-mono text-label font-semibold tracking-wider text-accent uppercase">
				↳ LA SÉLECTION
			</div>
			<h2 class="text-[40px] leading-[0.95] tracking-tight sm:text-[54px] lg:text-[60px]">
				Quatre moniteurs
				<span class="font-serif font-normal tracking-normal normal-case italic">
					cette semaine.</span
				>
			</h2>
		</div>
	</div>

	<!-- 4 prof cards -->
	<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
		{#each profItems as prof (prof.id)}
			<ProfsItem
				id={prof.id}
				name={prof.name}
				isVerified={prof.isVerified}
				location={prof.location}
				stars={prof.stars}
				reviewCount={prof.reviewCount}
				sports={prof.sports}
				price={prof.price}
				certifications={prof.certifications}
				photoUrl={prof.photoUrl}
			/>
		{/each}
	</div>

	<!-- CTA -->
	<div class="mt-10 flex justify-center">
		<a
			href="/profs"
			class="inline-flex items-center justify-center rounded-md border bg-accent px-8 py-4 font-display text-sm font-black tracking-tight text-white uppercase transition-opacity hover:opacity-80"
		>
			Voir les {profCount} moniteurs →
		</a>
	</div>
</section>
