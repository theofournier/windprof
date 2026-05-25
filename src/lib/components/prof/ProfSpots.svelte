<script lang="ts">
	import ProfSectionTitle from './ProfSectionTitle.svelte';

	let {
		profName,
		spots
	}: {
		profName: string;
		spots: { name: string; isPrimary?: boolean }[];
	} = $props();
</script>

<div class="mb-11">
	<ProfSectionTitle title="SPOTS HABITUELS" />
	<h2 class="mt-2.5 mb-4.5 text-[38px]">Là où {profName} enseigne</h2>

	<div class="overflow-hidden rounded-md border border-ink/14 bg-white">
		<div class="px-5.5 py-4.5">
			{#each spots as spot, i (i)}
				<div
					class="flex items-center justify-between py-2.5 {i < spots.length - 1
						? 'border-b border-ink/14'
						: ''}"
				>
					<div class="flex items-center gap-2.5">
						<span class="h-2.5 w-2.5 rounded-full {spot.isPrimary ? 'bg-accent' : 'bg-muted'}"
						></span>
						<span class="text-[15px] font-semibold">{spot.name}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
