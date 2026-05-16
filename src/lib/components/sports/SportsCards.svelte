<script lang="ts">
	import SportsCard from './SportsCard.svelte';
	import type { Sport } from './types.js';

	let { sports }: { sports: Sport[] } = $props();
</script>

<section class="pb-20">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
		{#each sports as sport, i}
			<SportsCard {sport} index={i} />
		{/each}
	</div>
</section>
