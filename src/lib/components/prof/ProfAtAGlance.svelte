<script lang="ts">
	let {
		details
	}: {
		details: { label: string; value: string }[];
	} = $props();
</script>

<div class="rounded-2.5 border border-ink/14 bg-white px-6 py-5.5">
	<div class="mb-3.5 font-mono text-label tracking-label text-accent uppercase">
		↳ EN UN COUP D'ŒIL
	</div>
	<div class="flex flex-col gap-3.5">
		{#each details as detail (detail.label)}
			<div class="flex justify-between gap-3.5 border-b border-ink/8 pb-2.5">
				<span class="font-mono text-label tracking-wide text-muted uppercase">{detail.label}</span>
				<span class="text-right text-body-sm font-semibold">{detail.value}</span>
			</div>
		{/each}
	</div>
</div>
