<script lang="ts">
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<h1>{data.prof.name}</h1>
<h1>{data.prof.bio}</h1>
