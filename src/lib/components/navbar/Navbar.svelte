<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import { authClient } from '$lib/auth.client';

	type NavUser = {
		name: string;
		email: string;
		image?: string | null;
		type?: string | null;
	} | null;

	let { user = null }: { user?: NavUser } = $props();

	let menuOpen = $state(false);
	let dropdownOpen = $state(false);

	let loggedIn = $derived(user !== null);
	let isProf = $derived(user?.type === 'prof');
	let initials = $derived(
		user?.name
			? user.name
					.trim()
					.split(/\s+/)
					.slice(0, 2)
					.map((w) => w[0])
					.join('')
					.toUpperCase()
			: '?'
	);

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

		<div
			class="hidden items-center gap-9 font-display text-sm font-semibold text-white/85 uppercase sm:flex"
		>
			<a href="/profs">Moniteurs</a>
			<a href="/sports">Disciplines</a>
			<a href="/spots">Spots</a>
			<a href="/prof-register">Devenir moniteur</a>
		</div>

		<!-- Desktop auth section -->
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
								href={isProf ? '/prof-account' : '/account'}
								onclick={() => (dropdownOpen = false)}
								class="block px-4 py-2.5 font-display text-sm font-semibold text-ink uppercase hover:bg-ink/5"
							>
								{isProf ? 'Mon compte moniteur' : 'Mon compte'}
							</a>

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

			<!-- Mobile auth section -->
			<div class="mt-5">
				{#if loggedIn}
					<a
						href={isProf ? '/prof-account' : '/account'}
						onclick={() => (menuOpen = false)}
						class="block rounded-md bg-white px-4 py-3 text-center font-display text-sm font-bold text-ink uppercase"
					>
						{isProf ? 'Mon compte moniteur' : 'Mon compte'}
					</a>
					<button
						onclick={signOut}
						class="mt-3 w-full cursor-pointer rounded-md border-2 border-red-500 px-4 py-3 text-center font-display text-sm font-bold text-red-500 uppercase"
					>
						Se déconnecter
					</button>
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
