<script lang="ts">
	import type { Prof } from '$lib/data/types';
	import ProfItem from '../profs/ProfItem.svelte';
	let { profs }: { profs: Prof[] } = $props();

	let displayedProfs = $derived(profs.slice(0, 3));
</script>

<section>
	<div class="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
		<div>
			<span class="mb-3.5 font-mono text-micro tracking-wider text-accent uppercase">
				↳ LINEUP
			</span>
			<h2 class="font-display text-4xl font-black tracking-tight uppercase sm:text-5xl lg:text-6xl">
				Cette semaine sur la côte
			</h2>
		</div>
		<a
			href="/profs"
			class="border-b-2 border-b-ink pb-1 font-mono text-sm font-bold tracking-wider text-ink"
			>Voir tous les moniteurs →</a
		>
	</div>
	<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each displayedProfs as prof}
			<ProfItem
				id={prof.id}
				name={prof.name}
				isVerified={prof.isVerified}
				location={prof.location}
				stars={prof.stars}
				reviewCount={prof.reviewCount}
				sports={prof.sports}
				price={prof.price}
				certifications={prof.certifications}
			/>
		{/each}
	</div>
</section>
