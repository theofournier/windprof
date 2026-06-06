<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import { authClient } from '$lib/auth.client';
	import { page } from '$app/state';
	import type { User } from '$lib/server/auth';
	import WindLines from '../global/WindLines.svelte';

	function isActive(path: string) {
		return page.url.pathname === path || page.url.pathname.startsWith(path + '/');
	}

	let { user = null }: { user?: User | null } = $props();

	let menuOpen = $state(false);
	let dropdownOpen = $state(false);

	let loggedIn = $derived(user !== null);
	let isProf = $derived(user?.type === 'prof');
	let isAdmin = $derived(user?.role === 'admin');
	let initials = $derived(user?.name.trim().slice(0, 1).toUpperCase() ?? '?');

	async function signOut() {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					location.href = '/';
				}
			}
		});
	}

	function clickOutside() {
		return (node: HTMLElement) => {
			const handler = (e: MouseEvent) => {
				if (!node.contains(e.target as Node)) dropdownOpen = false;
			};
			document.addEventListener('click', handler, true);
			return () => {
				document.removeEventListener('click', handler, true);
			};
		};
	}
</script>

{#snippet links(href: string, label: string)}
	<a
		{href}
		class="transition-colors hover:text-white {isActive(href)
			? 'text-white underline decoration-accent underline-offset-4'
			: ''}">{label}</a
	>
{/snippet}
{#snippet mobileLinks(href: string, label: string)}
	<a
		{href}
		onclick={() => (menuOpen = false)}
		class="border-b border-white/10 py-3.5 font-display text-sm font-semibold uppercase transition-colors hover:text-white {isActive(
			href
		)
			? 'text-white underline decoration-accent underline-offset-4'
			: 'text-white/70'}">{label}</a
	>
{/snippet}

<nav class="navbar relative z-20">
	<WindLines />

	<div class="relative flex items-center justify-between px-5 py-5 sm:px-14 sm:py-6">
		<a href="/" onclick={() => (menuOpen = false)}>
			<div class="flex items-center gap-2">
				<img src={logo} alt="Logo de Windprof" class="h-8 w-8" />
				<span class="font-display text-2xl font-black tracking-tight text-white uppercase"
					>Windprof</span
				>
			</div>
		</a>

		<div
			class="hidden items-center gap-9 font-display text-sm font-semibold text-white/70 uppercase sm:flex"
		>
			{@render links('/profs', 'Moniteurs')}
			{@render links('/sports', 'Disciplines')}
			{@render links('/become-prof', 'Devenir moniteur')}
		</div>

		<div class="hidden sm:flex">
			{#if loggedIn}
				<!-- Avatar button + dropdown -->
				<div class="relative" {@attach clickOutside()}>
					<button
						class="flex h-9.5 w-9.5 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-accent font-bold text-white"
						onclick={() => (dropdownOpen = !dropdownOpen)}
						aria-label="Menu utilisateur"
						aria-expanded={dropdownOpen}
					>
						{#if user?.image}
							<img
								src={user.image}
								alt={user?.name ?? 'Avatar'}
								class="h-full w-full object-cover"
								referrerpolicy="no-referrer"
							/>
						{:else}
							<span class="text-sm">{initials}</span>
						{/if}
					</button>

					{#if dropdownOpen}
						<div
							class="absolute top-full right-0 z-50 mt-2 min-w-50 rounded-xl border border-line bg-white shadow-lg"
						>
							<!-- Header -->
							<div class="px-4 py-3">
								<p class="font-display text-sm font-semibold text-ink">{user?.name}</p>
								<p class="text-xs text-ink/50">{user?.email}</p>
							</div>

							<hr class="border-line" />

							<!-- Account link -->
							<a
								href={isProf ? '/prof-account' : '/rider-account'}
								onclick={() => (dropdownOpen = false)}
								class="block px-4 py-2.5 font-display text-sm font-semibold text-ink uppercase hover:bg-ink/5"
							>
								{isProf ? 'Mon compte moniteur' : 'Mon compte'}
							</a>

							<!-- Security link -->
							<a
								href="/account/settings"
								onclick={() => (dropdownOpen = false)}
								class="block px-4 py-2.5 font-display text-sm font-semibold text-ink uppercase hover:bg-ink/5"
							>
								Paramètres
							</a>

							{#if isAdmin}
								<hr class="border-line" />
								<a
									href="/admin"
									onclick={() => (dropdownOpen = false)}
									class="block px-4 py-2.5 font-display text-sm font-semibold text-accent uppercase hover:bg-ink/5"
								>
									Admin
								</a>
							{/if}

							<!-- Sign out -->
							<button
								onclick={signOut}
								class="w-full cursor-pointer px-4 py-2.5 text-left font-display text-sm font-semibold text-red-500 uppercase hover:bg-ink/5"
							>
								Se déconnecter
							</button>
						</div>
					{/if}
				</div>
			{:else}
				<div class="flex items-center gap-4">
					<a
						href="/login"
						class="font-display text-sm font-semibold text-white/70 uppercase transition-colors hover:text-white"
						>Connexion</a
					>
					<a
						href="/signup"
						class="rounded-md bg-accent px-4 py-2 font-display text-sm font-bold text-white uppercase transition-opacity hover:opacity-90"
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
		<div class="relative z-10 flex flex-col border-t border-white/10 px-5 pb-6 sm:hidden">
			{@render mobileLinks('/profs', 'Moniteurs')}
			{@render mobileLinks('/sports', 'Disciplines')}
			{@render mobileLinks('/become-prof', 'Devenir moniteur')}

			<!-- Mobile auth section -->
			<div class="mt-5">
				{#if loggedIn}
					<a
						href={isProf ? '/prof-account' : '/account'}
						onclick={() => (menuOpen = false)}
						class="block rounded-md border border-white/10 bg-white/10 px-4 py-3 text-center backdrop-blur-sm transition-colors hover:bg-white/15"
					>
						<p class="font-display text-sm font-semibold text-white">{user?.name}</p>
						<p class="text-xs text-white/50">{user?.email}</p>
					</a>
					<a
						href="/account/settings"
						onclick={() => (menuOpen = false)}
						class="mt-2 block rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-center font-display text-sm font-semibold text-white/60 uppercase transition-colors hover:bg-white/10 hover:text-white"
					>
						Paramètres
					</a>
					{#if isAdmin}
						<a
							href="/admin"
							onclick={() => (menuOpen = false)}
							class="mt-2 block rounded-md border border-accent/30 bg-accent/10 px-4 py-2.5 text-center font-display text-sm font-semibold text-accent uppercase transition-colors hover:bg-accent/20"
						>
							Admin
						</a>
					{/if}
					<button
						onclick={signOut}
						class="mt-3 w-full cursor-pointer rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-center font-display text-sm font-bold text-red-400 uppercase transition-colors hover:bg-red-500/20"
					>
						Se déconnecter
					</button>
				{:else}
					<div class="flex flex-col gap-3">
						<a
							href="/login"
							onclick={() => (menuOpen = false)}
							class="py-2 text-center font-display text-sm font-semibold text-white/70 uppercase transition-colors hover:text-white"
							>Connexion</a
						>
						<a
							href="/signup"
							onclick={() => (menuOpen = false)}
							class="block rounded-md bg-accent px-4 py-3 text-center font-display text-sm font-bold text-white uppercase transition-opacity hover:opacity-90"
							>S'inscrire</a
						>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</nav>

<style>
	.navbar {
		background: linear-gradient(180deg, #07101c 0%, #0e1a2b 100%);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}
</style>
