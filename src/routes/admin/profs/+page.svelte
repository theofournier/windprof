<script lang="ts">
	import AdminProfsKpis from '$lib/components/admin/profs/AdminProfsKpis.svelte';
	import AdminProfsFilters from '$lib/components/admin/profs/AdminProfsFilters.svelte';
	import AdminProfsTable from '$lib/components/admin/profs/AdminProfsTable.svelte';
	import type { Filter, Kpi, StatusCounts } from '$lib/components/admin/profs/types';

	let { data } = $props();

	type Filter_ = Filter;

	const certStatus = (prof: (typeof data.profs)[0]) => {
		const certs = prof.certifications ?? [];
		if (certs.length === 0) return 'pending';
		if (certs.some((c) => c.status === 'pending')) return 'pending';
		if (certs.every((c) => c.status === 'verified')) return 'verified';
		return 'not_verified';
	};

	let statusFilter = $state<Filter_>('all');
	let searchQuery = $state('');

	const hasPendingReport = (prof: (typeof data.profs)[0]) =>
		prof.reports.some((r) => r.status === 'pending');
	const hasConfirmedReport = (prof: (typeof data.profs)[0]) =>
		!hasPendingReport(prof) && prof.reports.some((r) => r.status === 'reviewed');

	const statusCounts = $derived<StatusCounts>({
		all: data.profs.length,
		verified: data.profs.filter((p) => p.isVerified).length,
		pending: data.profs.filter((p) => certStatus(p) === 'pending').length,
		not_verified: data.profs.filter((p) => !p.isVerified).length,
		reported: data.profs.filter(hasPendingReport).length,
		confirmed: data.profs.filter(hasConfirmedReport).length
	});

	const filtered = $derived(
		data.profs.filter((prof) => {
			if (statusFilter !== 'all') {
				if (statusFilter === 'verified' && !prof.isVerified) return false;
				if (statusFilter === 'pending' && certStatus(prof) !== 'pending') return false;
				if (statusFilter === 'not_verified' && prof.isVerified) return false;
				if (statusFilter === 'reported' && !hasPendingReport(prof)) return false;
				if (statusFilter === 'confirmed' && !hasConfirmedReport(prof)) return false;
			}
			if (searchQuery) {
				const q = searchQuery.toLowerCase();
				const name = `${prof.firstName} ${prof.lastName}`.toLowerCase();
				const email = (prof.contactEmail ?? '').toLowerCase();
				const city = (prof.city ?? '').toLowerCase();
				if (!name.includes(q) && !email.includes(q) && !city.includes(q)) return false;
			}
			return true;
		})
	);

	const kpis = $derived<Kpi[]>([
		{ lbl: 'TOTAL MONITEURS', val: data.profs.length.toString(), delta: 'inscrits', dir: 'flat' },
		{
			lbl: 'EN ATTENTE',
			val: statusCounts.pending.toString(),
			delta: 'diplômes à traiter',
			dir: 'flag',
			accent: true
		},
		{
			lbl: 'VÉRIFIÉS',
			val: statusCounts.verified.toString(),
			delta:
				data.profs.length > 0
					? `${Math.round((statusCounts.verified / data.profs.length) * 100)}% du total`
					: '0%',
			dir: 'flat'
		},
		{
			lbl: 'PUBLIÉS',
			val: data.profs.filter((p) => p.isPublished).length.toString(),
			delta: 'visibles sur la plateforme',
			dir: 'flat'
		},
		{
			lbl: 'SIGNALEMENTS',
			val: statusCounts.reported.toString(),
			delta: 'signalements en attente',
			dir: statusCounts.reported > 0 ? 'flag' : 'flat',
			accent: statusCounts.reported > 0
		}
	]);
</script>

<svelte:head>
	<title>Profs - Admin - Windprof</title>
</svelte:head>

<div class="mb-5.5 flex items-end justify-between">
	<div>
		<h1
			class="m-0 font-display text-[42px] leading-none font-black tracking-tight text-ink uppercase"
		>
			Gestion des moniteurs.
		</h1>
		<p class="mt-2.5 text-body-sm text-[#4A5260]">
			Validation des diplômes, suivi des fiches et modération des comptes.
		</p>
	</div>
</div>

<AdminProfsKpis {kpis} />

<AdminProfsFilters bind:statusFilter bind:searchQuery {statusCounts} />

<AdminProfsTable profs={filtered} total={data.profs.length} />

<div
	class="mt-4.5 flex items-center gap-3.5 font-mono text-[10.5px] tracking-loose text-muted uppercase"
>
	<span>↳ {data.profs.length} moniteurs au total</span>
	<span class="text-ink/20">·</span>
	<span>{statusCounts.verified} vérifiés</span>
	<span class="text-ink/20">·</span>
	<span>{data.profs.filter((p) => p.isPublished).length} publiés</span>
</div>
