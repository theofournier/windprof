<script lang="ts">
	import type { SubmittedReport } from '$lib/components/admin/reports/types';
	import { sectionHeader } from './types';

	let { reports }: { reports: SubmittedReport[] } = $props();

	const STATUS_STYLES: Record<string, string> = {
		pending:
			'inline-flex items-center rounded-sm bg-[rgba(242,181,68,0.16)] px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em] uppercase text-[#8a6300]',
		reviewed:
			'inline-flex items-center rounded-sm bg-[rgba(111,210,154,0.18)] px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em] uppercase text-[#1f6f47]',
		dismissed:
			'inline-flex items-center rounded-sm bg-[rgba(179,78,62,0.14)] px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em] uppercase text-[#9a3a2c]'
	};

	const STATUS_LABELS: Record<string, string> = {
		pending: '⏳ En attente',
		reviewed: '✓ Traité',
		dismissed: '✕ Rejeté'
	};
</script>

<section class="border border-ink/10 bg-white">
	<div class={sectionHeader}>
		<div class="flex items-baseline gap-2.5">
			<span class="font-display text-[18px] font-black tracking-[-0.02em] uppercase">
				Signalements émis
			</span>
			<span class="text-[12px] text-muted">
				{reports.length} signalement{reports.length !== 1 ? 's' : ''} soumis par ce moniteur
			</span>
		</div>
	</div>

	{#if reports.length === 0}
		<p class="px-6 py-8 text-center font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
			Aucun signalement émis
		</p>
	{:else}
		<table class="w-full border-collapse text-[12.5px]">
			<thead>
				<tr>
					{#each ['Date', 'Moniteur signalé', 'Raison', 'Description', 'Statut'] as col (col)}
						<th
							class="border-b border-ink/10 bg-bg px-3.5 py-2.5 text-left font-mono text-[10px] font-bold tracking-[0.1em] text-[#4A5260] uppercase"
						>
							{col}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each reports as rp (rp.id)}
					<tr class="group">
						<td
							class="border-b border-ink/7 px-3.5 py-2.5 align-top font-mono text-[10.5px] whitespace-nowrap text-muted group-hover:bg-bg"
						>
							{new Date(rp.createdAt).toISOString().slice(0, 10)}
						</td>
						<td class="border-b border-ink/7 px-3.5 py-2.5 align-top group-hover:bg-bg">
							<a
								href="/admin/profs/{rp.profId}"
								class="text-[12.5px] font-semibold text-ink no-underline hover:underline"
							>
								{rp.profProfile.firstName}
								{rp.profProfile.lastName}
							</a>
						</td>
						<td class="border-b border-ink/7 px-3.5 py-2.5 align-top group-hover:bg-bg">
							<span
								class="inline-block rounded-sm border border-ink/[0.16] bg-bg px-[7px] py-[2px] font-mono text-[10.5px] font-semibold tracking-[0.04em] text-ink"
							>
								{rp.reason}
							</span>
						</td>
						<td
							class="max-w-[220px] border-b border-ink/7 px-3.5 py-2.5 align-top text-[12px] leading-[1.45] text-[#4A5260] group-hover:bg-bg"
						>
							{#if rp.description}
								<span class="line-clamp-2">{rp.description}</span>
							{:else}
								<span class="text-muted">—</span>
							{/if}
						</td>
						<td class="border-b border-ink/7 px-3.5 py-2.5 align-top group-hover:bg-bg">
							<span class={STATUS_STYLES[rp.status]}>
								{STATUS_LABELS[rp.status]}
							</span>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</section>
