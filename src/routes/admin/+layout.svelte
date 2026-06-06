<script lang="ts">
	import { page } from '$app/state';
	import logo from '$lib/assets/logo.svg';

	let { children, data } = $props();

	const navItems = [
		{ k: 'dash', n: 'Tableau de bord', path: '/admin', icon: '◉' },
		{ k: 'profs', n: 'Moniteurs', path: '/admin/profs', icon: '⚐' },
		{ k: 'riders', n: 'Riders', path: '/admin/riders', icon: '◈' },
		{ k: 'users', n: 'Sans profil', path: '/admin/users', icon: '○' },
		{ k: 'reviews', n: 'Avis', path: '/admin/reviews', icon: '★' }
	];

	const isActive = (path: string) => {
		if (path === '/admin') return page.url.pathname === '/admin';
		return page.url.pathname.startsWith(path);
	};

	const currentLabel = $derived(navItems.find((i) => isActive(i.path))?.n ?? 'Admin');

	const initials = $derived(
		(data.user?.name ?? 'Admin')
			.split(' ')
			.map((n: string) => n[0])
			.join('')
			.slice(0, 2)
			.toUpperCase()
	);
</script>

<div class="flex min-h-screen bg-bg">
	<!-- Sidebar -->
	<aside class="sticky top-0 flex h-screen w-58 shrink-0 flex-col bg-ink text-white">
		<!-- Logo -->
		<a
			href="/admin"
			class="mb-1.5 flex items-center gap-2.25 border-b border-white/6 px-5.5 pt-5 pb-4.5"
		>
			<img src={logo} alt="Windprof" width="22" height="22" />
			<span class="font-display text-[17px] font-black tracking-[-0.04em] text-white uppercase">
				Windprof
			</span>
			<span
				class="ml-auto rounded-sm bg-accent px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-label text-white"
			>
				ADM
			</span>
		</a>

		<!-- Nav -->
		<nav class="flex-1">
			<div
				class="px-5.5 pt-4.5 pb-2 font-mono text-micro tracking-[0.18em] text-white/30 uppercase"
			>
				↳ Navigation
			</div>
			{#each navItems as item}
				<a
					href={item.path}
					class="flex cursor-pointer items-center gap-2.75 border-l-2 px-5.5 py-2.25 text-body-sm font-medium no-underline transition-colors duration-100
						{isActive(item.path)
						? 'border-accent bg-[linear-gradient(90deg,rgba(232,114,76,0.12),transparent)] text-white'
						: 'border-transparent text-white/60 hover:bg-white/4 hover:text-white'}"
				>
					<span class="w-3.5 text-center text-body-sm opacity-70">{item.icon}</span>
					<span>{item.n}</span>
				</a>
			{/each}
		</nav>

		<!-- Version -->
		<div
			class="border-t border-white/6 px-5.5 py-3.5 font-mono text-micro tracking-loose text-white/30"
		>
			v 1.0 · console admin
		</div>
	</aside>

	<!-- Main -->
	<div class="flex min-w-0 flex-1 flex-col">
		<!-- Topbar -->
		<header
			class="sticky top-0 z-10 flex h-13.5 items-center gap-4.5 border-b border-ink/10 bg-white px-6"
		>
			<div
				class="flex items-center gap-2 font-mono text-[11.5px] tracking-loose text-muted uppercase"
			>
				<span>↳ Admin</span>
				<span class="text-ink/20">/</span>
				<span class="font-bold text-ink">{currentLabel}</span>
			</div>

			<div class="ml-auto flex items-center gap-3">
				<div class="flex items-center gap-2.5">
					<div class="text-right leading-[1.2]">
						<span class="block text-[12.5px] font-semibold text-ink">
							{data.user?.name ?? 'Admin'}
						</span>
						<span class="block font-mono text-micro tracking-loose text-muted uppercase">
							Admin
						</span>
					</div>
					<div
						class="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-ink font-display text-xs font-bold text-white"
					>
						{initials}
					</div>
				</div>
				<a
					href="/"
					title="To home"
					class="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-line bg-white text-[#4A5260] no-underline hover:bg-bg hover:text-ink"
				>
					<svg width="13" height="13" viewBox="0 0 16 16" fill="none">
						<path
							d="M6 2H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3M10 11l3-3-3-3M13 8H6"
							stroke="currentColor"
							stroke-width="1.4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</a>
			</div>
		</header>

		<!-- Page content -->
		<main class="flex-1 px-8 pt-6.5 pb-15">
			{@render children()}
		</main>
	</div>
</div>
