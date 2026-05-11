<script lang="ts">
	let { withGrid = true } = $props();
</script>

<div class="absolute inset-0">
	{#if withGrid}
		<div class="grid-overlay absolute inset-0"></div>
	{/if}
	<div class="wind-lines absolute inset-0"></div>
</div>
