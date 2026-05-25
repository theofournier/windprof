<script lang="ts">
	import AuthVisualPanel from '$lib/components/auth/AuthVisualPanel.svelte';
	import AuthResetPasswordForm from '$lib/components/auth/AuthResetPasswordForm.svelte';
	import type { ActionData, PageData } from './$types';

	let { form, data }: { form: ActionData; data: PageData } = $props();
</script>

<svelte:head>
	<title>Nouveau mot de passe — Windprof</title>
</svelte:head>

<div class="grid md:grid-cols-[1fr_1.05fr]">
	<!-- Left: dark visual panel (hidden on mobile, shown on md+) -->
	<div class="hidden md:flex md:flex-col">
		<AuthVisualPanel />
	</div>

	<!-- Right: reset password form -->
	<main class="flex items-start justify-center bg-bg px-6 py-14 md:px-18">
		<AuthResetPasswordForm {form} token={data.token} />
	</main>
</div>
