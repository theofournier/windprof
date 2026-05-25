<script lang="ts">
	let {
		title
	}: {
		title: string;
	} = $props();
</script>

<div class="font-mono text-label font-semibold tracking-label text-accent uppercase">
	↳ {title}
</div>
