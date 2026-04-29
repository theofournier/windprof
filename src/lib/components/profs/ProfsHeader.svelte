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
	<button
		class="inline-flex cursor-pointer flex-col items-center gap-2.5 rounded-md border-2 border-line bg-transparent px-4 py-2.5 font-display text-sm font-bold tracking-wide text-ink uppercase hover:bg-ink/5"
	>
		⊞ Carte
	</button>
</div>
