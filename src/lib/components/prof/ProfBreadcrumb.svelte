<script lang="ts">
	let {
		segments
	}: {
		segments: { label: string; href?: string }[];
	} = $props();
</script>

<div class="mx-auto max-w-360 overflow-x-auto px-4 pt-4.5 sm:px-8 lg:px-14">
	<nav class="font-mono text-label tracking-loose text-muted">
		{#each segments as seg, i (i)}
			{#if i > 0}
				<span class="mx-2 text-ink/14">/</span>
			{/if}
			{#if i === segments.length - 1}
				<span class="text-ink">{seg.label}</span>
			{:else if seg.href}
				<a href={seg.href}>{seg.label}</a>
			{:else}
				<span>{seg.label}</span>
			{/if}
		{/each}
	</nav>
</div>
