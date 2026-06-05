<script lang="ts">
	import { enhance } from '$app/forms';
	import type { AdminProfDetail } from './types';
	import { sectionHeader, certBadge } from './types';

	let {
		prof,
		onreject
	}: {
		prof: AdminProfDetail;
		onreject: (certId: string, certName: string) => void;
	} = $props();

	const pendingCerts = $derived(prof.certifications.filter((c) => c.status === 'pending'));
	const verifiedCount = $derived(prof.certifications.filter((c) => c.status === 'verified').length);
</script>

<section class="border border-ink/10 bg-white">
	<div class={sectionHeader}>
		<div class="flex items-baseline gap-2.5">
			<span class="font-display text-[18px] font-black tracking-[-0.02em] uppercase"
				>Diplômes & Certifications</span
			>
			<span class="text-[12px] text-muted">
				{verifiedCount} vérifiés{#if pendingCerts.length > 0}
					· {pendingCerts.length} en attente{/if}
			</span>
		</div>
		{#if pendingCerts.length > 0}
			<span
				class="inline-flex items-center gap-1.5 rounded-sm bg-[rgba(242,181,68,0.16)] px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em] text-[#8a6300] uppercase"
			>
				<span class="h-[5px] w-[5px] rounded-full bg-current"></span>
				{pendingCerts.length} à traiter
			</span>
		{/if}
	</div>

	{#if prof.certifications.length === 0}
		<p class="px-6 py-8 text-center font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
			Aucun diplôme uploadé
		</p>
	{:else}
		{#each prof.certifications as cert, i (cert.id)}
			<div
				class="grid [grid-template-columns:1fr_auto] items-center gap-4.5 px-6 py-4.5"
				style="border-bottom: {i < prof.certifications.length - 1
					? '1px solid rgba(14,26,43,.08)'
					: 'none'}; background: {cert.status === 'pending' ? 'rgba(242,181,68,0.04)' : ''}"
			>
				<!-- Info -->
				<div class="min-w-0">
					<div class="mb-1 flex items-center gap-2.5">
						<span class="text-[14px] font-bold text-ink">{cert.type}</span>
						<span class={certBadge(cert.status)}>
							<span class="h-[5px] w-[5px] rounded-full bg-current"></span>
							{cert.status === 'verified'
								? 'Vérifié'
								: cert.status === 'pending'
									? 'En attente'
									: 'Rejeté'}
						</span>
					</div>
					<div class="font-mono text-[10.5px] tracking-[0.06em] text-muted">
						{#if cert.year}{cert.year}{/if}
						{#if cert.fileName}
							<a
								href={cert.fileUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="mt-0.5 inline-block font-mono text-label tracking-wide text-accent underline"
							>
								📎 {cert.fileName}
							</a>{/if}
					</div>
				</div>

				<!-- Actions -->
				<div class="flex shrink-0 flex-col gap-1.5">
					{#if cert.status === 'pending'}
						<form method="POST" action="?/validateCert" use:enhance>
							<input type="hidden" name="certId" value={cert.id} />
							<button
								class="inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-sm border-0 bg-[#1f6f47] px-3 py-1.75 font-display text-[11px] font-bold tracking-[0.04em] text-white uppercase"
							>
								✓ Valider
							</button>
						</form>
						<button
							onclick={() => onreject(cert.id, cert.type)}
							class="inline-flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-sm border border-[#9a3a2c] bg-white px-3 py-1.75 font-display text-[11px] font-bold tracking-[0.04em] text-[#9a3a2c] uppercase"
						>
							✕ Rejeter
						</button>
					{/if}
				</div>
			</div>
		{/each}
	{/if}
</section>
