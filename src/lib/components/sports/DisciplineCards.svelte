<script lang="ts">
	import DisciplineCard from './DisciplineCard.svelte';
	import type { Discipline } from './types.js';

	let { disciplines }: { disciplines: Discipline[] } = $props();
</script>

<section class="pb-20">
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
		{#each disciplines as discipline, i}
			<DisciplineCard {discipline} index={i} />
		{/each}
	</div>
</section>
