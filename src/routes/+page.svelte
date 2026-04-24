<script lang="ts">
	import Description from '$lib/components/homepage/Description.svelte';
	import Hero from '$lib/components/homepage/Hero.svelte';
	import ProfDescription from '$lib/components/homepage/ProfDescription.svelte';
	import Profs from '$lib/components/homepage/Profs.svelte';
	import Sports from '$lib/components/homepage/Sports.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<div>
	<Hero />
	<div class="mx-auto my-10 flex max-w-360 flex-col gap-8 px-5 sm:my-16 sm:gap-10 sm:px-10 lg:my-20 lg:gap-12 lg:px-14">
		<Sports />
		<Profs profs={data.profs} />
		<Description />
		<ProfDescription />
	</div>
</div>
