<script lang="ts">
	import AuthVisualPanel from '$lib/components/auth/AuthVisualPanel.svelte';
	import AuthSigninForm from '$lib/components/auth/AuthSigninForm.svelte';
</script>

<svelte:head>
	<title>Connexion — Windprof</title>
</svelte:head>

<div class="grid md:grid-cols-[1fr_1.05fr]">
	<!-- Left: dark visual panel (hidden on mobile, shown on md+) -->
	<div class="hidden md:flex md:flex-col">
		<AuthVisualPanel />
	</div>

	<!-- Right: signin form -->
	<main class="flex items-start justify-center bg-bg px-6 py-14 md:px-18">
		<AuthSigninForm />
	</main>
</div>
