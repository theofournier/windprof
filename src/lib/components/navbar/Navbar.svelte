<script lang="ts">
	import logo from '$lib/assets/logo.svg';

	let { loggedIn = false, isProf = false } = $props();
</script>

<nav class="z-10 flex items-center justify-between bg-ink px-14 py-6">
	<a href="/">
		<div class="flex items-center gap-2">
			<img src={logo} alt="Logo de Windprof" class="h-8 w-8" />
			<span class="font-display text-2xl font-black tracking-tight text-white uppercase"
				>Windprof</span
			>
		</div></a
	>
	<div class="flex items-center gap-9 font-display text-sm font-semibold text-white/85 uppercase">
		<a href="/profs">Moniteurs</a>
		<a href="/sports">Disciplines</a>
		<a href="/spots">Spots</a>
		<a href="/prof-register">Devenir moniteur</a>
	</div>
	{#if loggedIn}
		{#if isProf}
			<a
				href="/prof-account"
				class="rounded-md border-2 bg-white px-4 py-2 font-display text-sm font-bold text-ink uppercase"
				>Mon compte moniteur</a
			>
		{:else}
			<a
				href="/account"
				class="rounded-md border-2 bg-white px-4 py-2 font-display text-sm font-bold text-ink uppercase"
				>Mon compte</a
			>
		{/if}
	{:else}
		<div class="flex items-center gap-4">
			<a href="/login" class="font-display text-sm font-semibold text-white/85 uppercase"
				>Connexion</a
			>
			<a
				href="/signup"
				class="rounded-md border-2 bg-white px-4 py-2 font-display text-sm font-bold text-ink uppercase"
				>S'inscrire</a
			>
		</div>
	{/if}
</nav>
