<script lang="ts">
	import AdminProfsKpis from '$lib/components/admin/profs/AdminProfsKpis.svelte';
	import AdminReportsFilters from '$lib/components/admin/reports/AdminReportsFilters.svelte';
	import AdminReportsTable from '$lib/components/admin/reports/AdminReportsTable.svelte';
	import type { StatusFilter, Kpi } from '$lib/components/admin/reports/types';

	let { data } = $props();

	let statusFilter = $state<StatusFilter>('all');
	let searchQuery = $state('');

	const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

	const statusCounts = $derived<Record<StatusFilter, number>>({
		all: data.reports.length,
		pending: data.reports.filter((r) => r.status === 'pending').length,
		reviewed: data.reports.filter((r) => r.status === 'reviewed').length,
		dismissed: data.reports.filter((r) => r.status === 'dismissed').length
	});

	const filtered = $derived(
		data.reports.filter((report) => {
			if (statusFilter !== 'all' && report.status !== statusFilter) return false;

			if (searchQuery) {
				const q = searchQuery.toLowerCase();
				const profName =
					`${report.profProfile.firstName} ${report.profProfile.lastName}`.toLowerCase();
				const email = report.reporterEmail.toLowerCase();
				const reason = report.reason.toLowerCase();
				const description = (report.description ?? '').toLowerCase();
				if (
					!profName.includes(q) &&
					!email.includes(q) &&
					!reason.includes(q) &&
					!description.includes(q)
				)
					return false;
			}

			return true;
		})
	);

	const kpis = $derived<Kpi[]>([
		{
			lbl: 'TOTAL',
			val: data.reports.length.toString(),
			delta: 'signalements reçus',
			dir: 'flat'
		},
		{
			lbl: 'EN ATTENTE',
			val: statusCounts.pending.toString(),
			delta: 'à traiter',
			dir: statusCounts.pending > 0 ? 'flag' : 'flat',
			accent: statusCounts.pending > 0
		},
		{
			lbl: 'TRAITÉS',
			val: statusCounts.reviewed.toString(),
			delta: 'signalements résolus',
			dir: 'up'
		},
		{
			lbl: '30 DERNIERS JOURS',
			val: data.reports
				.filter((r) => new Date(r.createdAt).getTime() > thirtyDaysAgo)
				.length.toString(),
			delta: 'signalements récents',
			dir: 'flat'
		}
	]);
</script>

<svelte:head>
	<title>Signalements - Admin - Windprof</title>
</svelte:head>

<div class="mb-5.5 flex items-end justify-between">
	<div>
		<div class="mb-2 font-mono text-label font-bold tracking-widest text-accent uppercase">
			↳ ADMIN · SIGNALEMENTS
		</div>
		<h1
			class="m-0 font-display text-[42px] leading-none font-black tracking-tight text-ink uppercase"
		>
			Signalements.
		</h1>
		<p class="mt-2.5 text-body-sm text-[#4A5260]">
			Signalements soumis par les utilisateurs sur les fiches moniteurs.
		</p>
	</div>
</div>

<AdminProfsKpis {kpis} />

<AdminReportsFilters bind:statusFilter bind:searchQuery {statusCounts} />

<AdminReportsTable reports={filtered} total={data.reports.length} />

<div
	class="mt-4.5 flex items-center gap-3.5 font-mono text-[10.5px] tracking-loose text-muted uppercase"
>
	<span>↳ {data.reports.length} signalements au total</span>
	<span class="text-ink/20">·</span>
	<span>{statusCounts.pending} en attente</span>
	<span class="text-ink/20">·</span>
	<span>{statusCounts.reviewed} traités</span>
</div>
