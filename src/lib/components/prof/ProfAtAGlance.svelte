<script lang="ts">
	import ProfSectionTitle from './ProfSectionTitle.svelte';

	let {
		details
	}: {
		details: { label: string; value: string }[];
	} = $props();
</script>

<div class="rounded-md border border-ink/14 bg-white px-6 py-4">
	<ProfSectionTitle title="EN UN COUP D'ŒIL" />
	<div class="mt-3.5 flex flex-col gap-3.5">
		{#each details as detail, i (detail.label)}
			<div
				class="flex justify-between gap-3.5 {i < details.length - 1
					? 'border-b border-ink/14'
					: ''} pb-2.5"
			>
				<span class="font-mono text-label tracking-wide text-muted uppercase">{detail.label}</span>
				<span class="text-right text-body-sm font-semibold">{detail.value}</span>
			</div>
		{/each}
	</div>
</div>
