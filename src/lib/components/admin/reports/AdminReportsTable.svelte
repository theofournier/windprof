<script lang="ts">
	import type { AdminReport } from './types';
	import AdminReportsTableRow from './AdminReportsTableRow.svelte';

	let { reports, total }: { reports: AdminReport[]; total: number } = $props();

	const cols = ['Date', 'Moniteur', 'Raison', 'Description', 'Signaleur', 'Statut', ''];
</script>

<div class="border border-t-0 border-ink/10 bg-white">
	<table class="w-full border-collapse text-[12.5px]">
		<thead>
			<tr>
				{#each cols as col}
					<th
						class="border-b border-line bg-bg px-3.5 py-2.5 text-left font-mono text-micro font-bold tracking-label whitespace-nowrap text-[#4A5260] uppercase"
					>
						{col}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each reports as report (report.id)}
				<AdminReportsTableRow {report} />
			{:else}
				<tr>
					<td
						colspan="7"
						class="px-4 py-12 text-center font-mono text-caption tracking-loose uppercase text-muted"
					>
						Aucun signalement trouvé.
					</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<div class="flex items-center border-t border-ink/[0.07] bg-[#fbf8f1] px-4 py-3.5">
		<div class="font-mono text-label tracking-[0.06em] text-[#4A5260]">
			<b class="text-ink">{reports.length}</b> sur <b class="text-ink">{total}</b> signalements
		</div>
	</div>
</div>
