<script lang="ts">
	import type { AdminProfDetail } from './types';
	import { sectionHeader } from './types';
	import { enhance } from '$app/forms';

	let { prof }: { prof: AdminProfDetail } = $props();

	let confirmDeleteId = $state<string | null>(null);

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

	const tdBase = 'border-b border-ink/7 px-3.5 py-2.5 align-top group-hover:bg-bg';
</script>

<section id="signalements" class="border border-ink/10 bg-white">
	<div class={sectionHeader}>
		<div class="flex items-baseline gap-2.5">
			<span class="font-display text-[18px] font-black tracking-[-0.02em] uppercase">
				Signalements reçus
			</span>
			<span class="text-[12px] text-muted">
				{prof.reports.length} signalement{prof.reports.length !== 1 ? 's' : ''}
				{#if prof.reports.filter((r) => r.status === 'pending').length > 0}
					<span class="ml-1 font-semibold text-[#8a6300]">
						· {prof.reports.filter((r) => r.status === 'pending').length} en attente
					</span>
				{/if}
			</span>
		</div>
		<a
			href="/admin/reports"
			class="font-mono text-[10.5px] tracking-[0.06em] text-accent no-underline underline-offset-2 uppercase hover:underline"
		>
			Voir tous →
		</a>
	</div>

	{#if prof.reports.length === 0}
		<p class="px-6 py-8 text-center font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
			Aucun signalement
		</p>
	{:else}
		<table class="w-full border-collapse text-[12.5px]">
			<thead>
				<tr>
					{#each ['Date', 'Raison', 'Description', 'Signaleur', 'Statut', ''] as col (col)}
						<th
							class="border-b border-ink/10 bg-bg px-3.5 py-2.5 text-left font-mono text-[10px] font-bold tracking-[0.1em] text-[#4A5260] uppercase"
						>
							{col}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each prof.reports as rp (rp.id)}
					<tr class="group">
						<td class="{tdBase} font-mono text-[10.5px] whitespace-nowrap text-muted">
							{new Date(rp.createdAt).toISOString().slice(0, 10)}
						</td>
						<td class={tdBase}>
							<span
								class="inline-block rounded-sm border border-ink/[0.16] bg-bg px-[7px] py-[2px] font-mono text-[10.5px] font-semibold tracking-[0.04em] text-ink"
							>
								{rp.reason}
							</span>
						</td>
						<td class="{tdBase} max-w-50 text-caption leading-[1.45] text-[#4A5260]">
							{#if rp.description}
								<span class="line-clamp-2">{rp.description}</span>
							{:else}
								<span class="text-muted">—</span>
							{/if}
						</td>
						<td class="{tdBase} text-caption">
							{#if rp.user}
								{@const adminHref = rp.user.profProfile
									? `/admin/profs/${rp.user.profProfile.id}`
									: rp.user.riderProfile
										? `/admin/riders/${rp.user.riderProfile.id}`
										: null}
								<div class="flex flex-col gap-0.5">
									{#if adminHref}
										<a href={adminHref} class="font-semibold text-ink no-underline hover:underline">
											{rp.user.name}
										</a>
									{:else}
										<span class="font-semibold text-ink">{rp.user.name}</span>
									{/if}
									<span class="font-mono text-[10.5px] text-muted">{rp.reporterEmail}</span>
								</div>
							{:else}
								<span class="font-mono text-label text-[#4A5260]">{rp.reporterEmail}</span>
							{/if}
						</td>
						<td class={tdBase}>
							<span class={STATUS_STYLES[rp.status]}>
								{STATUS_LABELS[rp.status]}
							</span>
						</td>
						<td class={tdBase}>
							<div class="flex justify-end gap-1">
								{#if confirmDeleteId === rp.id}
									<form method="POST" action="?/deleteReport" use:enhance>
										<input type="hidden" name="reportId" value={rp.id} />
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
									{#if rp.status === 'pending'}
										<form method="POST" action="?/markReviewed" use:enhance>
											<input type="hidden" name="reportId" value={rp.id} />
											<button
												type="submit"
												title="Marquer comme traité"
												class="inline-flex h-7 cursor-pointer items-center gap-1 rounded border border-line bg-white px-2 font-mono text-micro tracking-[0.06em] text-[#4A5260] uppercase hover:border-[#1f6f47] hover:bg-[rgba(111,210,154,0.08)] hover:text-[#1f6f47]"
											>
												Traité
											</button>
										</form>
										<form method="POST" action="?/dismissReport" use:enhance>
											<input type="hidden" name="reportId" value={rp.id} />
											<button
												type="submit"
												title="Rejeter le signalement"
												class="inline-flex h-7 cursor-pointer items-center gap-1 rounded border border-line bg-white px-2 font-mono text-micro tracking-[0.06em] text-[#4A5260] uppercase hover:border-[#b34e3e] hover:bg-[rgba(179,78,62,0.06)] hover:text-[#9a3a2c]"
											>
												Rejeter
											</button>
										</form>
									{/if}
									<button
										title="Supprimer le signalement"
										class="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-line bg-white text-[#4A5260] hover:border-[#b34e3e] hover:bg-[rgba(179,78,62,0.06)] hover:text-[#9a3a2c]"
										onclick={() => (confirmDeleteId = rp.id)}
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
