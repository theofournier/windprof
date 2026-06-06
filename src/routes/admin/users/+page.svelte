<script lang="ts">
	import AdminProfsKpis from '$lib/components/admin/profs/AdminProfsKpis.svelte';
	import AdminUsersFilters from '$lib/components/admin/users/AdminUsersFilters.svelte';
	import AdminUsersTable from '$lib/components/admin/users/AdminUsersTable.svelte';
	import type {
		UserFilter,
		UserTypeFilter,
		StatusCounts,
		Kpi
	} from '$lib/components/admin/users/types';

	let { data } = $props();

	let statusFilter = $state<UserFilter>('all');
	let typeFilter = $state<UserTypeFilter>('all');
	let searchQuery = $state('');

	const statusCounts = $derived<StatusCounts>({
		all: data.users.length,
		verified: data.users.filter((u) => u.emailVerified).length,
		unverified: data.users.filter((u) => !u.emailVerified).length
	});

	const filtered = $derived(
		data.users.filter((user) => {
			if (statusFilter === 'verified' && !user.emailVerified) return false;
			if (statusFilter === 'unverified' && user.emailVerified) return false;

			if (typeFilter !== 'all' && user.type !== typeFilter) return false;

			if (searchQuery) {
				const q = searchQuery.toLowerCase();
				const name = (user.name ?? '').toLowerCase();
				const email = (user.email ?? '').toLowerCase();
				if (!name.includes(q) && !email.includes(q)) return false;
			}

			return true;
		})
	);

	const kpis = $derived<Kpi[]>([
		{
			lbl: 'SANS PROFIL',
			val: data.users.length.toString(),
			delta: 'comptes incomplets',
			dir: data.users.length > 0 ? 'flag' : 'flat',
			accent: data.users.length > 0
		},
		{
			lbl: 'EMAIL NON VÉRIFIÉ',
			val: statusCounts.unverified.toString(),
			delta: 'emails non confirmés',
			dir: statusCounts.unverified > 0 ? 'flag' : 'flat',
			accent: statusCounts.unverified > 0
		},
		{
			lbl: 'TYPE RIDER',
			val: data.users.filter((u) => u.type === 'rider').length.toString(),
			delta: 'comptes rider',
			dir: 'flat'
		},
		{
			lbl: 'TYPE MONITEUR',
			val: data.users.filter((u) => u.type === 'prof').length.toString(),
			delta: 'comptes moniteur',
			dir: 'flat'
		}
	]);
</script>

<svelte:head>
	<title>Utilisateurs sans profil - Admin - Windprof</title>
</svelte:head>

<div class="mb-5.5 flex items-end justify-between">
	<div>
		<div class="mb-2 font-mono text-label font-bold tracking-widest text-accent uppercase">
			↳ ADMIN · UTILISATEURS
		</div>
		<h1
			class="m-0 font-display text-[42px] leading-none font-black tracking-tight text-ink uppercase"
		>
			Sans profil.
		</h1>
		<p class="mt-2.5 text-body-sm text-[#4A5260]">
			Comptes créés sans profil rider ou moniteur complété.
		</p>
	</div>
</div>

<AdminProfsKpis {kpis} />

<AdminUsersFilters bind:statusFilter bind:typeFilter bind:searchQuery {statusCounts} />

<AdminUsersTable users={filtered} total={data.users.length} />

<div
	class="mt-4.5 flex items-center gap-3.5 font-mono text-[10.5px] tracking-loose text-muted uppercase"
>
	<span>↳ {data.users.length} utilisateurs sans profil au total</span>
	<span class="text-ink/20">·</span>
	<span>{statusCounts.verified} email vérifié</span>
	<span class="text-ink/20">·</span>
	<span>{statusCounts.unverified} non vérifié</span>
</div>
