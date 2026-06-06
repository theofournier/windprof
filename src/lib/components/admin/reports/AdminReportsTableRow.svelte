<script lang="ts">
	import type { AdminReport } from './types';
	import { enhance } from '$app/forms';

	let { report }: { report: AdminReport } = $props();

	let expanded = $state(false);
	let confirmDelete = $state(false);

	const formattedDate = $derived(
		new Date(report.createdAt).toLocaleDateString('fr-FR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		})
	);

	const profInitials = $derived(
		`${report.profProfile.firstName[0] ?? ''}${report.profProfile.lastName[0] ?? ''}`.toUpperCase()
	);

	const STATUS_STYLES: Record<string, string> = {
		pending:
			'inline-flex items-center gap-1 rounded-sm bg-[rgba(242,181,68,0.16)] px-2 py-0.5 font-mono text-micro font-bold tracking-[0.08em] uppercase text-[#8a6300]',
		reviewed:
			'inline-flex items-center gap-1 rounded-sm bg-[rgba(111,210,154,0.18)] px-2 py-0.5 font-mono text-micro font-bold tracking-[0.08em] uppercase text-[#1f6f47]',
		dismissed:
			'inline-flex items-center gap-1 rounded-sm bg-[rgba(179,78,62,0.14)] px-2 py-0.5 font-mono text-micro font-bold tracking-[0.08em] uppercase text-[#9a3a2c]'
	};

	const STATUS_LABELS: Record<string, string> = {
		pending: '⏳ En attente',
		reviewed: '✓ Traité',
		dismissed: '✕ Rejeté'
	};

	const tdBase =
		'border-b border-ink/[0.07] px-[14px] py-[11px] align-middle group-hover:bg-[#fbf8f1]';
</script>

<tr class="group">
	<!-- Date -->
	<td class="{tdBase} font-mono text-[10.5px] whitespace-nowrap text-[#4A5260]">
		{formattedDate}
	</td>

	<!-- Moniteur -->
	<td class="{tdBase} text-ink">
		<a
			href="/admin/profs/{report.profId}"
			class="group/prof flex items-center gap-2 no-underline"
		>
			<div
				class="flex h-[28px] w-[28px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-dark font-display text-micro font-bold text-[#4A5260]"
			>
				{#if report.profProfile.photoUrl}
					<img src={report.profProfile.photoUrl} alt="" class="h-full w-full object-cover" />
				{:else}
					{profInitials}
				{/if}
			</div>
			<span class="text-[12.5px] font-semibold text-ink group-hover/prof:underline">
				{report.profProfile.firstName}
				{report.profProfile.lastName}
			</span>
		</a>
	</td>

	<!-- Raison -->
	<td class="{tdBase} text-[12px] text-ink">
		<span
			class="inline-block rounded-sm border border-ink/[0.16] bg-bg px-[7px] py-[2px] font-mono text-[10.5px] font-semibold tracking-[0.04em] text-ink"
		>
			{report.reason}
		</span>
	</td>

	<!-- Description -->
	<td class="{tdBase} max-w-[260px] text-[12px] leading-[1.45] text-[#4A5260]">
		{#if report.description}
			<span class={expanded ? '' : 'line-clamp-2'}>{report.description}</span>
			{#if report.description.length > 80}
				<button
					class="mt-1 block cursor-pointer font-mono text-[9.5px] tracking-[0.06em] text-accent uppercase underline-offset-2 hover:underline"
					onclick={() => (expanded = !expanded)}
				>
					{expanded ? 'Réduire' : 'Voir tout'}
				</button>
			{/if}
		{:else}
			<span class="font-mono text-[10.5px] text-[#9aa1ad]">—</span>
		{/if}
	</td>

	<!-- Signaleur -->
	<td class="{tdBase} text-caption">
		{#if report.user}
			{@const adminHref = report.user.profProfile
				? `/admin/profs/${report.user.profProfile.id}`
				: report.user.riderProfile
					? `/admin/riders/${report.user.riderProfile.id}`
					: null}
			<div class="flex flex-col gap-0.5">
				{#if adminHref}
					<a
						href={adminHref}
						class="font-semibold text-ink no-underline hover:underline"
					>
						{report.user.name}
					</a>
				{:else}
					<span class="font-semibold text-ink">{report.user.name}</span>
				{/if}
				<span class="font-mono text-[10.5px] text-muted">{report.reporterEmail}</span>
			</div>
		{:else}
			<span class="font-mono text-label text-[#4A5260]">{report.reporterEmail}</span>
		{/if}
	</td>

	<!-- Statut -->
	<td class={tdBase}>
		<span class={STATUS_STYLES[report.status]}>
			{STATUS_LABELS[report.status]}
		</span>
	</td>

	<!-- Actions -->
	<td class={tdBase}>
		<div class="flex justify-end gap-1">
			{#if confirmDelete}
				<form method="POST" action="?/deleteReport" use:enhance>
					<input type="hidden" name="reportId" value={report.id} />
					<button
						type="submit"
						class="inline-flex h-7 cursor-pointer items-center gap-1 rounded border border-[#b34e3e] bg-[rgba(179,78,62,0.08)] px-2 font-mono text-micro font-bold tracking-[0.06em] text-[#9a3a2c] uppercase hover:bg-[rgba(179,78,62,0.15)]"
					>
						Confirmer
					</button>
				</form>
				<button
					class="inline-flex h-7 cursor-pointer items-center rounded border border-line bg-white px-2 font-mono text-micro tracking-[0.06em] text-muted uppercase hover:bg-bg"
					onclick={() => (confirmDelete = false)}
				>
					Annuler
				</button>
			{:else}
				{#if report.status === 'pending'}
					<form method="POST" action="?/markReviewed" use:enhance>
						<input type="hidden" name="reportId" value={report.id} />
						<button
							type="submit"
							title="Marquer comme traité"
							class="inline-flex h-7 cursor-pointer items-center gap-1 rounded border border-line bg-white px-2 font-mono text-micro tracking-[0.06em] text-[#4A5260] uppercase hover:border-[#1f6f47] hover:bg-[rgba(111,210,154,0.08)] hover:text-[#1f6f47]"
						>
							Traité
						</button>
					</form>
					<form method="POST" action="?/dismissReport" use:enhance>
						<input type="hidden" name="reportId" value={report.id} />
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
