<script lang="ts">
	import AuthVisualPanel from '$lib/components/auth/AuthVisualPanel.svelte';
	import AuthForgotPasswordForm from '$lib/components/auth/AuthForgotPasswordForm.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Mot de passe oublié — Windprof</title>
</svelte:head>

<div class="grid md:grid-cols-[1fr_1.05fr]">
	<!-- Left: dark visual panel (hidden on mobile, shown on md+) -->
	<div class="hidden md:flex md:flex-col">
		<AuthVisualPanel />
	</div>

	<!-- Right: forgot password form -->
	<main class="flex items-start justify-center bg-bg px-6 py-14 md:px-18">
		<AuthForgotPasswordForm {form} />
	</main>
</div>
