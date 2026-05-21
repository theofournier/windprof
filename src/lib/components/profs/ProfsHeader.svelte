<script lang="ts">
	let { count, location = '' }: { count: number; location?: string } = $props();
</script>

<div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ LINEUP · RÉSULTATS
		</div>
		<h1 class="font-display text-3xl font-black tracking-tight uppercase sm:text-5xl">
			{count} moniteur{count > 1 ? 's' : ''}
			{#if location}
				<span class="font-serif font-normal tracking-snug text-muted normal-case italic"
					>· {location}</span
				>
			{/if}
		</h1>
	</div>
</div>
