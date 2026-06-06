<script lang="ts">
	import type { AdminProfDetail } from './types';
	import { sectionHeader, tag, avgRating as computeAvgRating } from './types';
	import { enhance } from '$app/forms';

	let { prof }: { prof: AdminProfDetail } = $props();

	const rating = $derived(computeAvgRating(prof.reviews));

	let confirmDeleteId = $state<string | null>(null);
</script>

<section class="border border-ink/10 bg-white">
	<div class={sectionHeader}>
		<div class="flex items-baseline gap-2.5">
			<span class="font-display text-[18px] font-black tracking-[-0.02em] uppercase"
				>Avis reçus</span
			>
			<span class="text-[12px] text-muted">
				{prof.reviews.length} avis{#if rating !== null}
					· note moyenne {rating.toFixed(1)}/5{/if}
			</span>
		</div>
	</div>

	{#if prof.reviews.length === 0}
		<p class="px-6 py-8 text-center font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
			Aucun avis
		</p>
	{:else}
		<table class="w-full border-collapse text-[12.5px]">
			<thead>
				<tr>
					{#each ['Date', 'Auteur', 'Note', 'Niveau', 'Commentaire', ''] as col (col)}
						<th
							class="border-b border-ink/10 bg-bg px-3.5 py-2.5 text-left font-mono text-[10px] font-bold tracking-[0.1em] text-[#4A5260] uppercase"
							>{col}</th
						>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each prof.reviews as rv (rv.id)}
					<tr class="group">
						<td
							class="border-b border-ink/7 px-3.5 py-2.5 align-top font-mono text-[10.5px] text-muted group-hover:bg-bg"
						>
							{new Date(rv.createdAt).toISOString().slice(0, 10)}
						</td>
						<td
							class="border-b border-ink/7 px-3.5 py-2.5 align-top text-[12px] font-semibold text-ink group-hover:bg-bg"
						>
							{rv.riderName ?? 'Anonyme'}
						</td>
						<td class="border-b border-ink/7 px-3.5 py-2.5 align-top group-hover:bg-bg">
							<span class="text-[13px] font-bold">{rv.rating}</span>
							<span class="ml-0.5 text-[11px] text-accent">★</span>
						</td>
						<td class="border-b border-ink/7 px-3.5 py-2.5 align-top group-hover:bg-bg">
							{#if rv.riderLevel}
								<span class={tag}>{rv.riderLevel}</span>
							{:else}
								<span class="text-muted">—</span>
							{/if}
						</td>
						<td
							class="border-b border-ink/7 px-3.5 py-2.5 align-top text-[12px] leading-[1.45] text-[#4A5260] group-hover:bg-bg"
						>
							{#if rv.body}"{rv.body}"{:else}<span class="text-muted">—</span>{/if}
						</td>
						<td class="border-b border-ink/7 px-3.5 py-2.5 align-top group-hover:bg-bg">
							<div class="flex justify-end gap-1">
								{#if confirmDeleteId === rv.id}
									<form method="POST" action="?/deleteReview" use:enhance>
										<input type="hidden" name="reviewId" value={rv.id} />
										<button
											type="submit"
											class="inline-flex h-7 cursor-pointer items-center gap-1 rounded border border-[#b34e3e] bg-[rgba(179,78,62,0.08)] px-2 font-mono text-micro font-bold tracking-[0.06em] text-[#9a3a2c] uppercase hover:bg-[rgba(179,78,62,0.15)]"
										>
											Confirmer
										</button>
									</form>
									<button
										class="inline-flex h-7 cursor-pointer items-center rounded border border-line bg-white px-2 font-mono text-micro tracking-[0.06em] text-muted uppercase hover:bg-bg"
										onclick={() => (confirmDeleteId = null)}
									>
										Annuler
									</button>
								{:else}
									<button
										title="Supprimer l'avis"
										class="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-line bg-white text-[#4A5260] hover:border-[#b34e3e] hover:bg-[rgba(179,78,62,0.06)] hover:text-[#9a3a2c]"
										onclick={() => (confirmDeleteId = rv.id)}
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
				{/each}
			</tbody>
		</table>
	{/if}
</section>
