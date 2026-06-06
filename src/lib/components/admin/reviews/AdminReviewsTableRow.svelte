<script lang="ts">
	import type { AdminReview } from './types';
	import { enhance } from '$app/forms';

	let { review }: { review: AdminReview } = $props();

	let confirmDelete = $state(false);
	let expanded = $state(false);

	const formattedDate = $derived(
		new Date(review.createdAt).toLocaleDateString('fr-FR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		})
	);

	const profInitials = $derived(
		`${review.profProfile.firstName[0] ?? ''}${review.profProfile.lastName[0] ?? ''}`.toUpperCase()
	);

	const riderName = $derived(
		review.riderProfile
			? `${review.riderProfile.firstName} ${review.riderProfile.lastName ?? ''}`.trim()
			: (review.riderName ?? 'Anonyme')
	);

	const tdBase =
		'border-b border-ink/[0.07] px-[14px] py-[11px] align-middle group-hover:bg-[#fbf8f1]';

	const LEVEL_LABELS: Record<string, string> = {
		beginner: 'Débutant',
		intermediate: 'Intermédiaire',
		advanced: 'Avancé',
		all: 'Tous niveaux'
	};
</script>

<tr class="group">
	<!-- Date -->
	<td class="{tdBase} font-mono text-[10.5px] whitespace-nowrap text-[#4A5260]">
		{formattedDate}
	</td>

	<!-- Moniteur -->
	<td class="{tdBase} text-ink">
		<a
			href="/admin/profs/{review.profId}"
			class="group/prof flex items-center gap-2 no-underline hover:underline"
		>
			<div
				class="flex h-[28px] w-[28px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-dark font-display text-[10px] font-bold text-[#4A5260]"
			>
				{#if review.profProfile.photoUrl}
					<img src={review.profProfile.photoUrl} alt="" class="h-full w-full object-cover" />
				{:else}
					{profInitials}
				{/if}
			</div>
			<span class="text-[12.5px] font-semibold text-ink group-hover/prof:underline">
				{review.profProfile.firstName}
				{review.profProfile.lastName}
			</span>
		</a>
	</td>

	<!-- Rider -->
	<td class="{tdBase} text-[12px] text-[#4A5260]">
		{#if review.riderProfile}
			<a
				href="/admin/riders/{review.riderProfile.id}"
				class="font-semibold text-ink no-underline hover:underline"
			>
				{riderName}
			</a>
		{:else}
			<span class="text-muted italic">{riderName}</span>
		{/if}
	</td>

	<!-- Note -->
	<td class={tdBase}>
		<div class="flex items-center gap-0.5">
			{#each [1, 2, 3, 4, 5] as star}
				<span class="text-[13px] {star <= review.rating ? 'text-accent' : 'text-ink/15'}">★</span>
			{/each}
			<span class="ml-1 font-mono text-[10.5px] font-bold text-ink">{review.rating}/5</span>
		</div>
	</td>

	<!-- Niveau -->
	<td class={tdBase}>
		{#if review.riderLevel}
			<span
				class="inline-block rounded-sm border border-ink/[0.16] bg-bg px-[7px] py-[2px] font-mono text-[10.5px] font-semibold tracking-[0.04em] text-ink"
			>
				{LEVEL_LABELS[review.riderLevel] ?? review.riderLevel}
			</span>
		{:else}
			<span class="font-mono text-[10.5px] text-[#9aa1ad]">—</span>
		{/if}
	</td>

	<!-- Commentaire -->
	<td class="{tdBase} max-w-[320px] text-[12px] leading-[1.45] text-[#4A5260]">
		{#if review.body}
			<span class={expanded ? '' : 'line-clamp-2'}>"{review.body}"</span>
			<button
				class="mt-1 block cursor-pointer font-mono text-micro tracking-[0.06em] text-accent uppercase underline-offset-2 hover:underline"
				onclick={() => (expanded = !expanded)}
			>
				{expanded ? 'Réduire' : 'Voir tout'}
			</button>
		{:else}
			<span class="font-mono text-[10.5px] text-[#9aa1ad]">—</span>
		{/if}
	</td>

	<!-- Actions -->
	<td class={tdBase}>
		<div class="flex justify-end gap-1">
			{#if confirmDelete}
				<form method="POST" action="?/deleteReview" use:enhance>
					<input type="hidden" name="reviewId" value={review.id} />
					<button
						type="submit"
						class="inline-flex h-7 cursor-pointer items-center gap-1 rounded border border-[#b34e3e] bg-[rgba(179,78,62,0.08)] px-2 font-mono text-[10px] font-bold tracking-[0.06em] text-[#9a3a2c] uppercase hover:bg-[rgba(179,78,62,0.15)]"
					>
						Confirmer
					</button>
				</form>
				<button
					class="inline-flex h-7 cursor-pointer items-center rounded border border-line bg-white px-2 font-mono text-[10px] tracking-[0.06em] text-muted uppercase hover:bg-bg"
					onclick={() => (confirmDelete = false)}
				>
					Annuler
				</button>
			{:else}
				<button
					title="Supprimer l'avis"
					class="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-line bg-white text-[#4A5260] hover:border-[#b34e3e] hover:bg-[rgba(179,78,62,0.06)] hover:text-[#9a3a2c]"
					onclick={() => (confirmDelete = true)}
				>
					<svg width="12" height="12" viewBox="0 0 16 16" fill="none">
						<path
							d="M3 4h10M6 4V3h4v1M5 4v8a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V4"
							stroke="currentColor"
							stroke-width="1.4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			{/if}
		</div>
	</td>
</tr>
