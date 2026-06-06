<script lang="ts">
	import AdminProfsKpis from '$lib/components/admin/profs/AdminProfsKpis.svelte';
	import AdminRidersFilters from '$lib/components/admin/riders/AdminRidersFilters.svelte';
	import AdminRidersTable from '$lib/components/admin/riders/AdminRidersTable.svelte';
	import type {
		RiderFilter,
		SportFilter,
		StatusCounts,
		Kpi
	} from '$lib/components/admin/riders/types';

	let { data } = $props();

	let statusFilter = $state<RiderFilter>('all');
	let sportFilter = $state<SportFilter>('all');
	let searchQuery = $state('');

	const statusCounts = $derived<StatusCounts>({
		all: data.riders.length,
		active: data.riders.filter((r) => !r.user?.banned).length,
		suspended: data.riders.filter((r) => r.user?.banned).length
	});

	const filtered = $derived(
		data.riders.filter((rider) => {
			if (statusFilter === 'active' && rider.user?.banned) return false;
			if (statusFilter === 'suspended' && !rider.user?.banned) return false;

			if (sportFilter !== 'all') {
				if (!rider.sports.some((s) => s.sport === sportFilter)) return false;
			}

			if (searchQuery) {
				const q = searchQuery.toLowerCase();
				const name = `${rider.firstName} ${rider.lastName ?? ''}`.toLowerCase();
				const email = (rider.user?.email ?? '').toLowerCase();
				const city = (rider.city ?? '').toLowerCase();
				if (!name.includes(q) && !email.includes(q) && !city.includes(q)) return false;
			}

			return true;
		})
	);

	const totalReviews = $derived(data.riders.reduce((sum, r) => sum + r.reviews.length, 0));

	const kpis = $derived<Kpi[]>([
		{ lbl: 'TOTAL RIDERS', val: data.riders.length.toString(), delta: 'inscrits', dir: 'flat' },
		{
			lbl: 'SUSPENDUS',
			val: statusCounts.suspended.toString(),
			delta: 'comptes bloqués',
			dir: statusCounts.suspended > 0 ? 'flag' : 'flat',
			accent: statusCounts.suspended > 0
		},
		{
			lbl: 'AVEC DISCIPLINES',
			val: data.riders.filter((r) => r.sports.length > 0).length.toString(),
			delta: 'profils complets',
			dir: 'flat'
		},
		{
			lbl: 'AVIS LAISSÉS',
			val: totalReviews.toString(),
			delta: 'évaluations de moniteurs',
			dir: 'flat'
		}
	]);
</script>

<svelte:head>
	<title>Riders - Admin - Windprof</title>
</svelte:head>

<div class="mb-5.5 flex items-end justify-between">
	<div>
		<h1
			class="m-0 font-display text-[42px] leading-none font-black tracking-tight text-ink uppercase"
		>
			Gestion des riders.
		</h1>
		<p class="mt-2.5 text-body-sm text-[#4A5260]">
			Suivi des profils riders, suspension et modération des comptes.
		</p>
	</div>
</div>

<AdminProfsKpis {kpis} />

<AdminRidersFilters bind:statusFilter bind:sportFilter bind:searchQuery {statusCounts} />

<AdminRidersTable riders={filtered} total={data.riders.length} />

<div
	class="mt-4.5 flex items-center gap-3.5 font-mono text-[10.5px] tracking-loose text-muted uppercase"
>
	<span>↳ {data.riders.length} riders au total</span>
	<span class="text-ink/20">·</span>
	<span>{statusCounts.active} actifs</span>
	<span class="text-ink/20">·</span>
	<span>{statusCounts.suspended} suspendus</span>
</div>
