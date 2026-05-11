<script lang="ts">
	import AuthSignupVisualPanel from '$lib/components/auth/AuthSignupVisualPanel.svelte';
	import AuthSignupForm from '$lib/components/auth/AuthSignupForm.svelte';
	import type { PageProps } from './$types';
	import { page } from '$app/state';
	import type { Role } from '$lib/server/db/schema';

	let { form }: PageProps = $props();
	const roleParam = $derived((page.url.searchParams.get('role') as Role) ?? 'rider');
</script>

<svelte:head>
	<title>Inscription — Windprof</title>
</svelte:head>

<div class="grid md:grid-cols-[1fr_1.05fr]">
	<!-- Left: dark visual panel (hidden on mobile) -->
	<div class="hidden md:flex md:flex-col">
		<AuthSignupVisualPanel />
	</div>

	<!-- Right: signup form -->
	<main class="flex items-start justify-center bg-bg px-6 py-14 md:px-18">
		<AuthSignupForm {form} {roleParam} />
	</main>
</div>
