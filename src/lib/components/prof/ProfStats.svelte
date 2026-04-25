<script lang="ts">
	let {
		stats
	}: {
		stats: { value: string; label: string }[];
	} = $props();
</script>

<section class="mx-auto max-w-360 px-14 pb-8">
	<div class="grid grid-cols-4 gap-3.5">
		{#each stats as stat (stat.label)}
			<div class="rounded-2 border border-ink/14 bg-white px-5.5 py-5">
				<div class="font-display text-[34px] leading-none text-accent">{stat.value}</div>
				<div class="mt-2 font-mono text-caption tracking-wide text-muted uppercase">{stat.label}</div>
			</div>
		{/each}
	</div>
</section>
