<script lang="ts">
	import type { AdminRiderDetail } from './types';
	import { sectionHeader } from './types';

	let { rider }: { rider: AdminRiderDetail } = $props();

	const isBanned = $derived(rider.user?.banned ?? false);

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
				<dt class={kvDt}>Compte</dt>
				<dd class="text-[12.5px] text-ink">
					{#if isBanned}
						<span
							class="inline-flex items-center gap-1.5 rounded-sm bg-[rgba(179,78,62,0.14)] px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em] text-[#9a3a2c] uppercase"
						>
							<span class="h-[5px] w-[5px] rounded-full bg-current"></span>Suspendu
						</span>
						{#if rider.user?.banReason}
							<p class="mt-1.5 text-[11px] text-muted">{rider.user.banReason}</p>
						{/if}
						{#if rider.user?.banExpires}
							<p class="mt-1 font-mono text-[10.5px] text-muted">
								Jusqu'au {new Date(rider.user.banExpires).toLocaleDateString('fr-FR')}
							</p>
						{/if}
					{:else}
						<span
							class="inline-flex items-center gap-1.5 rounded-sm bg-[rgba(111,210,154,0.18)] px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.08em] text-[#1f6f47] uppercase"
						>
							<span class="h-[5px] w-[5px] rounded-full bg-current"></span>Actif
						</span>
					{/if}
				</dd>

				<dt class={kvDt}>Email</dt>
				<dd class="text-[12.5px] text-ink">
					{#if rider.user?.emailVerified}
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

				<dt class={kvDt}>User ID</dt>
				<dd class="font-mono text-[10px] break-all text-muted">{rider.user?.id ?? '—'}</dd>
			</dl>
		</div>
	</div>

	<!-- Stats card -->
	<div class="border border-ink/10 bg-white">
		<div class={sectionHeader}>
			<div class="flex items-baseline gap-2.5">
				<span class="font-mono text-[11px] font-black tracking-[0.16em] text-accent">⌗</span>
				<span class="font-display text-[14px] font-black tracking-[-0.02em] uppercase"
					>Activité</span
				>
			</div>
		</div>
		<div class="px-5 py-4.5">
			<dl class="grid [grid-template-columns:100px_1fr] gap-x-3.5 gap-y-2.5">
				<dt class={kvDt}>Disciplines</dt>
				<dd class="text-[12.5px] font-semibold text-ink">{rider.sports.length}</dd>

				<dt class={kvDt}>Spots</dt>
				<dd class="text-[12.5px] font-semibold text-ink">{rider.spots.length}</dd>

				<dt class={kvDt}>Avis laissés</dt>
				<dd class="text-[12.5px] font-semibold text-ink">{rider.reviews.length}</dd>
			</dl>
		</div>
	</div>
</div>
