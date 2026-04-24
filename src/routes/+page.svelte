<script lang="ts">
	import Hero from '$lib/components/homepage/Hero.svelte';
	import Profs from '$lib/components/homepage/Profs.svelte';
	import Sports from '$lib/components/homepage/Sports.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<div>
	<Hero />
	<div class="my-20 flex flex-col gap-12 px-14">
		<Sports />
		<Profs profs={data.profs} />
	</div>
</div>
