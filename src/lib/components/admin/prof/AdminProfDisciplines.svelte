<script lang="ts">
	import type { AdminProfDetail } from './types';
	import { sectionHeader, tag, SPORT_LABELS, LEVEL_LABELS } from './types';

	let { prof }: { prof: AdminProfDetail } = $props();

	const sportsWithLevels = $derived(
		prof.sports.map((s) => {
			let levels: string[] = [];
			try {
				levels = JSON.parse(s.acceptedLevels ?? '[]');
			} catch {
				levels = [];
			}
			return { ...s, levels };
		})
	);

	const kvGrid = 'grid gap-x-5 gap-y-3.5 [grid-template-columns:140px_1fr]';
	const kvDt =
		'font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted pt-0.5';
</script>

<section class="border border-ink/10 bg-white">
	<div class={sectionHeader}>
		<div class="flex items-baseline gap-2.5">
			<span class="font-display text-[18px] font-black tracking-[-0.02em] uppercase"
				>Disciplines & Spots</span
			>
			<span class="text-[12px] text-muted">Déclarés par le moniteur</span>
		</div>
	</div>
	<div class="px-6 py-5">
		<dl class={kvGrid}>
			<dt class={kvDt}>Disciplines</dt>
			<dd class="text-[13.5px] text-ink">
				{#if sportsWithLevels.length === 0}
					<span class="text-muted">—</span>
				{:else}
					<div class="flex flex-col gap-2.5">
						{#each sportsWithLevels as s (s.id)}
							<div class="flex flex-wrap items-center gap-1.5">
								<span
									class="inline-flex items-center gap-1.5 rounded-sm bg-bg px-2.5 py-1.25 text-caption font-semibold text-ink"
								>
									<span class="h-1.25 w-1.25 rounded-full bg-accent"></span>
									{SPORT_LABELS[s.sport] ?? s.sport}
								</span>
								{#if s.levels.length > 0}
									<span class="text-ink/20">→</span>
									{#each s.levels as level (level)}
										<span class={tag}>{LEVEL_LABELS[level] ?? level}</span>
									{/each}
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</dd>

			{#if prof.spots.length > 0}
				<dt class={kvDt}>Spots déclarés</dt>
				<dd class="text-[13.5px] text-ink">
					<div class="flex flex-col gap-1.5">
						{#each prof.spots as spot, i (spot.id)}
							<div class="flex items-center gap-2.5 text-[12.5px]">
								<span class="w-6 font-mono text-[10px] text-muted"
									>{String(i + 1).padStart(2, '0')}</span
								>
								<span class="font-semibold">{spot.name}</span>
								{#if spot.isPrimary}
									<span
										class="rounded-sm border border-ink bg-ink px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-[0.08em] text-white uppercase"
										>PRINCIPAL</span
									>
								{/if}
							</div>
						{/each}
					</div>
				</dd>
			{/if}

			<dt class={kvDt}>Matériel fourni</dt>
			<dd class="text-[13.5px] text-ink">
				{#if prof.equipmentProvided}
					<span class="font-semibold">Oui</span>
					{#if prof.equipmentNote}
						<p class="mt-1 text-[12.5px] leading-normal text-[#4A5260]">{prof.equipmentNote}</p>
					{/if}
				{:else}
					Non
				{/if}
			</dd>
		</dl>
	</div>
</section>
