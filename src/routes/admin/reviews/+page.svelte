<script lang="ts">
	import AdminProfsKpis from '$lib/components/admin/profs/AdminProfsKpis.svelte';
	import AdminReviewsFilters from '$lib/components/admin/reviews/AdminReviewsFilters.svelte';
	import AdminReviewsTable from '$lib/components/admin/reviews/AdminReviewsTable.svelte';
	import type { RatingFilter, Kpi } from '$lib/components/admin/reviews/types';

	let { data } = $props();

	let ratingFilter = $state<RatingFilter>('all');
	let searchQuery = $state('');

	const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

	const ratingCounts = $derived<Record<RatingFilter, number>>({
		all: data.reviews.length,
		'1': data.reviews.filter((r) => r.rating === 1).length,
		'2': data.reviews.filter((r) => r.rating === 2).length,
		'3': data.reviews.filter((r) => r.rating === 3).length,
		'4': data.reviews.filter((r) => r.rating === 4).length,
		'5': data.reviews.filter((r) => r.rating === 5).length
	});

	const avgRating = $derived(() => {
		if (data.reviews.length === 0) return null;
		return data.reviews.reduce((s, r) => s + r.rating, 0) / data.reviews.length;
	});

	const filtered = $derived(
		data.reviews.filter((review) => {
			if (ratingFilter !== 'all' && review.rating !== parseInt(ratingFilter)) return false;

			if (searchQuery) {
				const q = searchQuery.toLowerCase();
				const profName =
					`${review.profProfile.firstName} ${review.profProfile.lastName}`.toLowerCase();
				const riderName = (
					review.riderProfile
						? `${review.riderProfile.firstName} ${review.riderProfile.lastName ?? ''}`
						: (review.riderName ?? '')
				).toLowerCase();
				const body = (review.body ?? '').toLowerCase();
				if (!profName.includes(q) && !riderName.includes(q) && !body.includes(q)) return false;
			}

			return true;
		})
	);

	const kpis = $derived<Kpi[]>([
		{
			lbl: 'TOTAL AVIS',
			val: data.reviews.length.toString(),
			delta: 'déposés sur la plateforme',
			dir: 'flat'
		},
		{
			lbl: 'NOTE MOYENNE',
			val: avgRating() !== null ? avgRating()!.toFixed(1) : '—',
			delta: 'sur 5 étoiles',
			dir: 'flat'
		},
		{
			lbl: 'AVEC COMMENTAIRE',
			val: data.reviews.filter((r) => r.body && r.body.trim().length > 0).length.toString(),
			delta: `${data.reviews.length > 0 ? Math.round((data.reviews.filter((r) => r.body && r.body.trim().length > 0).length / data.reviews.length) * 100) : 0}% du total`,
			dir: 'flat'
		},
		{
			lbl: '30 DERNIERS JOURS',
			val: data.reviews.filter((r) => new Date(r.createdAt).getTime() > thirtyDaysAgo).length.toString(),
			delta: 'nouveaux avis récents',
			dir: 'up'
		}
	]);
</script>

<svelte:head>
	<title>Avis - Admin - Windprof</title>
</svelte:head>

<div class="mb-5.5 flex items-end justify-between">
	<div>
		<div class="mb-2 font-mono text-label font-bold tracking-widest text-accent uppercase">
			↳ ADMIN · AVIS
		</div>
		<h1
			class="m-0 font-display text-[42px] leading-none font-black tracking-tight text-ink uppercase"
		>
			Gestion des avis.
		</h1>
		<p class="mt-2.5 text-body-sm text-[#4A5260]">
			Modération des évaluations laissées par les riders sur les fiches moniteurs.
		</p>
	</div>
</div>

<AdminProfsKpis {kpis} />

<AdminReviewsFilters bind:ratingFilter bind:searchQuery {ratingCounts} />

<AdminReviewsTable reviews={filtered} total={data.reviews.length} />

<div
	class="mt-4.5 flex items-center gap-3.5 font-mono text-[10.5px] tracking-loose text-muted uppercase"
>
	<span>↳ {data.reviews.length} avis au total</span>
	<span class="text-ink/20">·</span>
	<span>{ratingCounts['5']} cinq étoiles</span>
	<span class="text-ink/20">·</span>
	<span>{data.reviews.filter((r) => r.body && r.body.trim().length > 0).length} avec commentaire</span>
</div>
