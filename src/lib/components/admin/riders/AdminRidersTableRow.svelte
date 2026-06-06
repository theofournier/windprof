<script lang="ts">
	import type { AdminRider } from './types';

	const SPORT_LABELS: Record<string, string> = {
		kitesurf: 'KITE',
		wingfoil: 'WING',
		windsurf: 'WIND'
	};

	let { rider }: { rider: AdminRider } = $props();

	const isSuspended = $derived(rider.user?.banned ?? false);

	const preferredSpot = $derived(rider.spots.find((s) => s.isPreferred) ?? rider.spots[0] ?? null);

	const initials = $derived(
		`${rider.firstName[0] ?? ''}${(rider.lastName ?? '')[0] ?? ''}`.toUpperCase()
	);

	const avgRating = $derived(
		rider.reviews.length > 0
			? (rider.reviews.reduce((sum, r) => sum + r.rating, 0) / rider.reviews.length).toFixed(1)
			: null
	);

	const formattedDate = $derived(
		rider.createdAt
			? new Date(rider.createdAt).toLocaleDateString('fr-FR', {
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
	<td class="{tdBase} text-ink" class:shadow-[inset_3px_0_0_#E8724C]={isSuspended}>
		<div class="flex items-center gap-2.5">
			<div
				class="flex h-[30px] w-[30px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-dark font-display text-[11px] font-bold text-[#4A5260]"
			>
				{#if rider.photoUrl}
					<img src={rider.photoUrl} alt="" class="h-full w-full object-cover" />
				{:else}
					{initials}
				{/if}
			</div>
			<div>
				<div class="flex items-center gap-1.5 text-[13px] font-semibold">
					{rider.firstName}
					{rider.lastName ?? ''}
					{#if isSuspended}
						<span
							title="Compte suspendu"
							class="inline-flex h-[14px] w-[14px] items-center justify-center rounded-sm bg-accent font-display text-[9px] font-black text-white"
							>!</span
						>
					{/if}
				</div>
				<div class="mt-px font-mono text-[10px] tracking-[0.06em] text-muted">{rider.city}</div>
			</div>
		</div>
	</td>

	<!-- Email -->
	<td class="{tdBase} font-mono text-[11px] tracking-[0.01em] text-[#4A5260]">
		{rider.user?.email ?? '—'}
	</td>

	<!-- Sports -->
	<td class={tdBase}>
		{#if rider.sports.length > 0}
			{#each rider.sports as s}
				<span
					class="mr-0.5 inline-block rounded-sm border border-ink/[0.16] bg-bg px-[7px] py-[2px] font-mono text-[10.5px] font-semibold tracking-[0.04em] text-ink"
				>
					{SPORT_LABELS[s.sport] ?? s.sport}
				</span>
			{/each}
		{:else}
			<span class="font-mono text-[10.5px] text-[#9aa1ad]">—</span>
		{/if}
	</td>

	<!-- Preferred spot -->
	<td class="{tdBase} text-caption text-[#4A5260]">
		{#if preferredSpot}
			<span class="font-semibold">{preferredSpot.name}</span>
			{#if rider.spots.length > 1}
				<span class="ml-1 text-muted">+{rider.spots.length - 1}</span>
			{/if}
		{:else}
			<span class="font-mono text-[10.5px] text-[#9aa1ad]">—</span>
		{/if}
	</td>

	<!-- Reviews left -->
	<td class={tdBase}>
		{#if rider.reviews.length > 0}
			<div class="flex items-baseline gap-1">
				<span class="text-[13px] font-bold">{rider.reviews.length}</span>
				<span class="font-mono text-[10px] text-muted">avis</span>
				<span class="ml-1 font-mono text-[10.5px] text-accent">★</span>
				<span class="font-mono text-[10.5px] font-semibold text-ink">{avgRating}</span>
			</div>
		{:else}
			<span class="font-mono text-[10.5px] text-[#9aa1ad]">—</span>
		{/if}
	</td>

	<!-- Date -->
	<td class="{tdBase} font-mono text-[10.5px] text-[#4A5260]">
		{formattedDate}
	</td>

	<!-- Status -->
	<td class={tdBase}>
		{#if isSuspended}
			<span
				class="inline-flex items-center gap-1.5 rounded-sm bg-[rgba(179,78,62,0.14)] px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em] text-[#9a3a2c] uppercase"
			>
				<span class="h-[5px] w-[5px] rounded-full bg-current"></span>Suspendu
			</span>
		{:else}
			<span
				class="inline-flex items-center gap-1.5 rounded-sm bg-[rgba(111,210,154,0.18)] px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em] text-[#1f6f47] uppercase"
			>
				<span class="h-[5px] w-[5px] rounded-full bg-current"></span>Actif
			</span>
		{/if}
	</td>

	<!-- Actions -->
	<td class={tdBase}>
		<div class="flex justify-end gap-1">
			<a
				href="/admin/riders/{rider.id}"
				title="Voir la fiche rider"
				class="inline-flex h-7 w-7 items-center justify-center rounded border border-line bg-white text-[#4A5260] no-underline hover:bg-bg hover:text-ink"
			>
				<svg width="12" height="12" viewBox="0 0 16 16" fill="none">
					<path d="m6 3 5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
				</svg>
			</a>
		</div>
	</td>
</tr>
