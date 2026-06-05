<script lang="ts">
	import type { AdminProf } from './types';

	const SPORT_LABELS: Record<string, string> = {
		kitesurf: 'KITE',
		wingfoil: 'WING',
		windsurf: 'WIND'
	};

	let { prof }: { prof: AdminProf } = $props();

	const certStatus = $derived.by(() => {
		const certs = prof.certifications ?? [];
		if (certs.length === 0) return 'pending';
		if (certs.some((c) => c.status === 'pending')) return 'pending';
		if (certs.every((c) => c.status === 'verified')) return 'verified';
		return 'not_verified';
	});

	const avgRating = $derived.by(() => {
		const reviews = prof.reviews ?? [];
		if (reviews.length === 0) return null;
		return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
	});

	const hasPending = $derived(certStatus === 'pending');

	const initials = $derived(`${prof.firstName[0] ?? ''}${prof.lastName[0] ?? ''}`.toUpperCase());

	const formattedDate = $derived(
		prof.createdAt
			? new Date(prof.createdAt).toLocaleDateString('fr-FR', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit'
				})
			: '—'
	);

	const tdBase =
		'border-b border-ink/[0.07] px-[14px] py-[11px] align-middle group-hover:bg-[#fbf8f1]';
</script>

<tr class="group">
	<!-- Name -->
	<td class="{tdBase} text-ink" class:shadow-[inset_3px_0_0_#E8724C]={hasPending}>
		<div class="flex items-center gap-2.5">
			<div
				class="flex h-[30px] w-[30px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-dark font-display text-[11px] font-bold text-[#4A5260]"
			>
				{#if prof.photoUrl}
					<img src={prof.photoUrl} alt="" class="h-full w-full object-cover" />
				{:else}
					{initials}
				{/if}
			</div>
			<div>
				<div class="flex items-center gap-1.5 text-[13px] font-semibold">
					{prof.firstName}
					{prof.lastName}
					{#if prof.isVerified}
						<svg width="11" height="11" viewBox="0 0 16 16" fill="none">
							<title>Vérifié</title>
							<circle cx="8" cy="8" r="7" fill="#6FD29A" />
							<path
								d="m5 8 2 2 4-4"
								stroke="#fff"
								stroke-width="1.6"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					{/if}
					{#if hasPending}
						<span
							title="Diplôme en attente de validation"
							class="inline-flex h-[14px] w-[14px] items-center justify-center rounded-sm bg-accent font-display text-[9px] font-black text-white"
							>!</span
						>
					{/if}
				</div>
				<div class="mt-px font-mono text-[10px] tracking-[0.06em] text-muted">{prof.city}</div>
			</div>
		</div>
	</td>

	<!-- Email -->
	<td class="{tdBase} font-mono text-[11px] tracking-[0.01em] text-[#4A5260]">
		{prof.contactEmail ?? prof.user?.email ?? '—'}
	</td>

	<!-- Sports -->
	<td class={tdBase}>
		{#each prof.sports as s}
			<span
				class="mr-0.5 inline-block rounded-sm border border-ink/[0.16] bg-bg px-[7px] py-[2px] font-mono text-[10.5px] font-semibold tracking-[0.04em] text-ink"
			>
				{SPORT_LABELS[s.sport] ?? s.sport}
			</span>
		{/each}
	</td>

	<!-- Spots -->
	<td class="{tdBase} text-caption text-[#4A5260]">
		{#if prof.spots.length > 0}
			{prof.spots
				.slice(0, 2)
				.map((s) => s.name)
				.join(' · ')}
			{#if prof.spots.length > 2}
				<span class="text-muted">+{prof.spots.length - 2}</span>
			{/if}
		{:else}
			<span class="font-mono text-[10.5px] text-[#9aa1ad]">—</span>
		{/if}
	</td>

	<!-- Cert status -->
	<td class={tdBase}>
		<span
			class="inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em] uppercase
				{certStatus === 'verified'
				? 'bg-[rgba(111,210,154,0.18)] text-[#1f6f47]'
				: certStatus === 'pending'
					? 'bg-[rgba(242,181,68,0.16)] text-[#8a6300]'
					: 'bg-[rgba(179,78,62,0.14)] text-[#9a3a2c]'}"
		>
			<span class="h-[5px] w-[5px] rounded-full bg-current"></span>
			{certStatus === 'verified' ? 'Vérifié' : certStatus === 'pending' ? 'En attente' : 'Rejeté'}
		</span>
	</td>

	<!-- Rating -->
	<td class={tdBase}>
		{#if avgRating !== null}
			<div class="flex items-baseline gap-1">
				<span class="text-[13px] font-bold">{avgRating.toFixed(1)}</span>
				<span class="text-[11px] text-accent">★</span>
				<span class="font-mono text-[10px] text-muted">({prof.reviews.length})</span>
			</div>
		{:else}
			<span class="font-mono text-[10.5px] text-[#9aa1ad]">—</span>
		{/if}
	</td>

	<!-- Published -->
	<td class={tdBase}>
		{#if prof.isPublished}
			<span
				class="rounded-sm bg-[rgba(111,210,154,0.18)] px-1.5 py-0.5 font-mono text-[10.5px] font-bold tracking-[0.06em] text-[#1f6f47]"
				>OUI</span
			>
		{:else}
			<span
				class="rounded-sm bg-ink/[0.08] px-1.5 py-0.5 font-mono text-[10.5px] font-bold tracking-[0.06em] text-[#4A5260]"
				>NON</span
			>
		{/if}
	</td>

	<!-- Date -->
	<td class="{tdBase} font-mono text-[10.5px] text-[#4A5260]">
		{formattedDate}
	</td>

	<!-- Actions -->
	<td class={tdBase}>
		<div class="flex justify-end gap-1">
			<a
				href="/profs/{prof.id}"
				title="Voir la fiche publique"
				class="inline-flex h-7 w-7 items-center justify-center rounded border border-line bg-white text-[#4A5260] no-underline hover:bg-bg hover:text-ink"
			>
				<svg width="12" height="12" viewBox="0 0 16 16" fill="none">
					<path d="m6 3 5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
				</svg>
			</a>
		</div>
	</td>
</tr>
