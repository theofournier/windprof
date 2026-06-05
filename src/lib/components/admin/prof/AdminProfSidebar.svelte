<script lang="ts">
	import type { AdminProfDetail } from './types';
	import { sectionHeader, avgRating as computeAvgRating } from './types';

	let { prof }: { prof: AdminProfDetail } = $props();

	const rating = $derived(computeAvgRating(prof.reviews));
	const isBanned = $derived(prof.user?.banned ?? false);
	const verifiedCount = $derived(prof.certifications.filter((c) => c.status === 'verified').length);

	const kvDt = 'font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted';
</script>

<div class="flex flex-col gap-[18px]">
	<!-- Status card -->
	<div class="border border-ink/10 bg-white">
		<div class={sectionHeader}>
			<div class="flex items-baseline gap-2.5">
				<span class="font-mono text-[11px] font-black tracking-[0.16em] text-accent">⌗</span>
				<span class="font-display text-[14px] font-black tracking-[-0.02em] uppercase"
					>Statut du compte</span
				>
			</div>
		</div>
		<div class="px-5 py-4.5">
			<dl class="grid [grid-template-columns:100px_1fr] gap-x-3.5 gap-y-2.5">
				<dt class={kvDt}>Profil</dt>
				<dd class="text-[12.5px] text-ink">
					{#if prof.isVerified}
						<span
							class="inline-flex items-center gap-1.5 rounded-sm bg-[rgba(111,210,154,0.18)] px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em] text-[#1f6f47] uppercase"
						>
							<span class="h-[5px] w-[5px] rounded-full bg-current"></span>Vérifié
						</span>
					{:else}
						<span
							class="inline-flex items-center gap-1.5 rounded-sm bg-[rgba(242,181,68,0.16)] px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em] text-[#8a6300] uppercase"
						>
							<span class="h-[5px] w-[5px] rounded-full bg-current"></span>Non vérifié
						</span>
					{/if}
				</dd>

				<dt class={kvDt}>Publié</dt>
				<dd class="text-[12.5px] text-ink">
					{#if prof.isPublished}
						<span
							class="rounded-sm bg-[rgba(111,210,154,0.18)] px-1.5 py-0.5 font-mono text-[10.5px] font-bold text-[#1f6f47]"
							>OUI</span
						>
					{:else}
						<span
							class="rounded-sm bg-ink/8 px-1.5 py-0.5 font-mono text-[10.5px] font-bold text-[#4A5260]"
							>NON</span
						>
					{/if}
				</dd>

				<dt class={kvDt}>Compte</dt>
				<dd class="text-[12.5px] text-ink">
					{#if isBanned}
						<span
							class="inline-flex items-center gap-1.5 rounded-sm bg-[rgba(179,78,62,0.14)] px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em] text-[#9a3a2c] uppercase"
						>
							<span class="h-[5px] w-[5px] rounded-full bg-current"></span>Suspendu
						</span>
						{#if prof.user?.banReason}
							<p class="mt-1.5 text-[11px] text-muted">{prof.user.banReason}</p>
						{/if}
					{:else}
						<span
							class="inline-flex items-center gap-1.5 rounded-sm bg-[rgba(111,210,154,0.18)] px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em] text-[#1f6f47] uppercase"
						>
							<span class="h-[5px] w-[5px] rounded-full bg-current"></span>Actif
						</span>
					{/if}
				</dd>


			</dl>
		</div>
	</div>
</div>
