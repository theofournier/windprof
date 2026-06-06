<script lang="ts">
	import type { AdminRiderDetail } from './types';
	import {
		sectionHeader,
		tag,
		SPORT_LABELS,
		LEVEL_LABELS,
		EQUIPMENT_LABELS,
		FORMAT_LABELS,
		DAY_LABELS,
		SLOT_LABELS,
		parseJson
	} from './types';

	let { rider }: { rider: AdminRiderDetail } = $props();

	const goals = $derived(parseJson<string[]>(rider.goals, []));
	const formatPreferences = $derived(parseJson<string[]>(rider.formatPreferences, []));
	const availabilityDays = $derived(parseJson<number[]>(rider.availabilityDays, []));
	const availabilitySlots = $derived(parseJson<string[]>(rider.availabilitySlots, []));
	const budgetRanges = $derived(parseJson<string[]>(rider.budgetRanges, []));

	const kvGrid = 'grid gap-x-5 gap-y-3.5 [grid-template-columns:140px_1fr]';
	const kvDt =
		'font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted pt-0.5';
</script>

<section class="border border-ink/10 bg-white">
	<div class={sectionHeader}>
		<div class="flex items-baseline gap-2.5">
			<span class="font-display text-[18px] font-black tracking-[-0.02em] uppercase"
				>Disciplines & Préférences</span
			>
			<span class="text-[12px] text-muted">Déclarés par le rider</span>
		</div>
	</div>
	<div class="px-6 py-5">
		<dl class={kvGrid}>
			<!-- Disciplines -->
			<dt class={kvDt}>Disciplines</dt>
			<dd class="text-[13.5px] text-ink">
				{#if rider.sports.length === 0}
					<span class="text-muted">—</span>
				{:else}
					<div class="flex flex-col gap-2.5">
						{#each rider.sports as s (s.id)}
							<div class="flex flex-wrap items-center gap-1.5">
								<span
									class="inline-flex items-center gap-1.5 rounded-sm bg-bg px-2.5 py-1.25 text-caption font-semibold text-ink"
								>
									<span class="h-1.25 w-1.25 rounded-full bg-accent"></span>
									{SPORT_LABELS[s.sport] ?? s.sport}
								</span>
								{#if s.level}
									<span class="text-ink/20">→</span>
									<span class={tag}>{LEVEL_LABELS[s.level] ?? s.level}</span>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
			</dd>

			<!-- Spots -->
			{#if rider.spots.length > 0}
				<dt class={kvDt}>Spots</dt>
				<dd class="text-[13.5px] text-ink">
					<div class="flex flex-col gap-1.5">
						{#each rider.spots as spot, i (spot.id)}
							<div class="flex items-center gap-2.5 text-[12.5px]">
								<span class="w-6 font-mono text-[10px] text-muted"
									>{String(i + 1).padStart(2, '0')}</span
								>
								<span class="font-semibold">{spot.name}</span>
								{#if spot.isPreferred}
									<span
										class="rounded-sm border border-ink bg-ink px-1.5 py-0.5 font-mono text-[9px] font-bold tracking-[0.08em] text-white uppercase"
										>PRÉFÉRÉ</span
									>
								{/if}
							</div>
						{/each}
					</div>
				</dd>
			{/if}

			<!-- Distance max -->
			{#if rider.maxDistanceKm}
				<dt class={kvDt}>Distance max</dt>
				<dd class="text-[13.5px] text-ink">{rider.maxDistanceKm} km</dd>
			{/if}

			<!-- Equipment -->
			{#if rider.equipmentPreference}
				<dt class={kvDt}>Matériel</dt>
				<dd class="text-[13.5px] text-ink">
					{EQUIPMENT_LABELS[rider.equipmentPreference] ?? rider.equipmentPreference}
				</dd>
			{/if}

			<!-- Goals -->
			{#if goals.length > 0}
				<dt class={kvDt}>Objectifs</dt>
				<dd class="text-[13.5px] text-ink">
					<div class="flex flex-wrap gap-1.5">
						{#each goals as goal (goal)}
							<span class={tag}>{goal}</span>
						{/each}
					</div>
				</dd>
			{/if}

			<!-- Format preferences -->
			{#if formatPreferences.length > 0}
				<dt class={kvDt}>Formats</dt>
				<dd class="text-[13.5px] text-ink">
					<div class="flex flex-wrap gap-1.5">
						{#each formatPreferences as fmt (fmt)}
							<span class={tag}>{FORMAT_LABELS[fmt] ?? fmt}</span>
						{/each}
					</div>
				</dd>
			{/if}

			<!-- Availability days -->
			{#if availabilityDays.length > 0}
				<dt class={kvDt}>Disponibilités</dt>
				<dd class="text-[13.5px] text-ink">
					<div class="flex flex-wrap gap-1">
						{#each availabilityDays as day (day)}
							<span class={tag}>{DAY_LABELS[day] ?? day}</span>
						{/each}
					</div>
				</dd>
			{/if}

			<!-- Availability slots -->
			{#if availabilitySlots.length > 0}
				<dt class={kvDt}>Créneaux</dt>
				<dd class="text-[13.5px] text-ink">
					<div class="flex flex-wrap gap-1.5">
						{#each availabilitySlots as slot (slot)}
							<span class={tag}>{SLOT_LABELS[slot] ?? slot}</span>
						{/each}
					</div>
				</dd>
			{/if}

			<!-- Budget -->
			{#if budgetRanges.length > 0}
				<dt class={kvDt}>Budget</dt>
				<dd class="text-[13.5px] text-ink">
					<div class="flex flex-wrap gap-1.5">
						{#each budgetRanges as range (range)}
							<span class={tag}>{range} €/h</span>
						{/each}
					</div>
				</dd>
			{/if}
		</dl>
	</div>
</section>
