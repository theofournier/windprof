<script lang="ts">
	import logo from '$lib/assets/logo.svg';

	let { loggedIn = false, isProf = false } = $props();

	let menuOpen = $state(false);
</script>

<nav class="relative z-20 bg-ink">
	<div class="flex items-center justify-between px-5 py-5 sm:px-14 sm:py-6">
		<a href="/" onclick={() => (menuOpen = false)}>
			<div class="flex items-center gap-2">
				<img src={logo} alt="Logo de Windprof" class="h-8 w-8" />
				<span class="font-display text-2xl font-black tracking-tight text-white uppercase"
					>Windprof</span
				>
			</div>
		</a>

		<div class="hidden items-center gap-9 font-display text-sm font-semibold text-white/85 uppercase sm:flex">
			<a href="/profs">Moniteurs</a>
			<a href="/sports">Disciplines</a>
			<a href="/spots">Spots</a>
			<a href="/prof-register">Devenir moniteur</a>
		</div>

		<div class="hidden sm:flex">
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
		</div>

		<button
			class="flex h-10 w-10 cursor-pointer items-center justify-center text-xl text-white sm:hidden"
			onclick={() => (menuOpen = !menuOpen)}
			aria-label="Menu"
		>
			{#if menuOpen}✕{:else}☰{/if}
		</button>
	</div>

	{#if menuOpen}
		<div class="flex flex-col border-t border-white/10 px-5 pb-6 sm:hidden">
			<a
				href="/profs"
				onclick={() => (menuOpen = false)}
				class="border-b border-white/10 py-3.5 font-display text-sm font-semibold text-white/85 uppercase"
				>Moniteurs</a
			>
			<a
				href="/sports"
				onclick={() => (menuOpen = false)}
				class="border-b border-white/10 py-3.5 font-display text-sm font-semibold text-white/85 uppercase"
				>Disciplines</a
			>
			<a
				href="/spots"
				onclick={() => (menuOpen = false)}
				class="border-b border-white/10 py-3.5 font-display text-sm font-semibold text-white/85 uppercase"
				>Spots</a
			>
			<a
				href="/prof-register"
				onclick={() => (menuOpen = false)}
				class="border-b border-white/10 py-3.5 font-display text-sm font-semibold text-white/85 uppercase"
				>Devenir moniteur</a
			>
			<div class="mt-5">
				{#if loggedIn}
					{#if isProf}
						<a
							href="/prof-account"
							onclick={() => (menuOpen = false)}
							class="block rounded-md bg-white px-4 py-3 text-center font-display text-sm font-bold text-ink uppercase"
							>Mon compte moniteur</a
						>
					{:else}
						<a
							href="/account"
							onclick={() => (menuOpen = false)}
							class="block rounded-md bg-white px-4 py-3 text-center font-display text-sm font-bold text-ink uppercase"
							>Mon compte</a
						>
					{/if}
				{:else}
					<div class="flex flex-col gap-3">
						<a
							href="/login"
							onclick={() => (menuOpen = false)}
							class="py-2 text-center font-display text-sm font-semibold text-white/85 uppercase"
							>Connexion</a
						>
						<a
							href="/signup"
							onclick={() => (menuOpen = false)}
							class="block rounded-md bg-white px-4 py-3 text-center font-display text-sm font-bold text-ink uppercase"
							>S'inscrire</a
						>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</nav>
