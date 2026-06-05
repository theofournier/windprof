<script lang="ts">
	import type { AdminProfDetail } from './types';
	import { sectionHeader, tag, avgRating as computeAvgRating } from './types';

	let { prof }: { prof: AdminProfDetail } = $props();

	const rating = $derived(computeAvgRating(prof.reviews));
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
					{#each ['Date', 'Auteur', 'Note', 'Niveau', 'Commentaire'] as col (col)}
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
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</section>
