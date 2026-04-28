<script lang="ts">
	import { getRiderRegisterCtx } from './context';

	const ctx = getRiderRegisterCtx();

	const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
	const SLOTS = [
		{ value: 'morning', label: 'Matin' },
		{ value: 'midday', label: 'Midi' },
		{ value: 'afternoon', label: 'Après-midi' },
		{ value: 'end_of_day', label: 'Fin de journée' },
		{ value: 'weekends_only', label: 'Week-ends only' },
		{ value: 'school_holidays', label: 'Vacances scolaires' }
	];
	const BUDGETS = [
		{ value: '< 60 €', label: '< 60 €', desc: 'Groupe / découverte' },
		{ value: '60-90 €', label: '60–90 €', desc: 'Cours individuel court' },
		{ value: '90-130 €', label: '90–130 €', desc: 'Cours indiv. classique' },
		{ value: '> 130 €', label: '> 130 €', desc: 'Stage, perfectionnement' }
	];

	let newSpotName = $state('');

	function toggleDay(idx: number) {
		const pos = ctx.data.availabilityDays.indexOf(idx);
		if (pos >= 0) ctx.data.availabilityDays.splice(pos, 1);
		else ctx.data.availabilityDays.push(idx);
	}

	function toggleSlot(value: string) {
		const pos = ctx.data.availabilitySlots.indexOf(value);
		if (pos >= 0) ctx.data.availabilitySlots.splice(pos, 1);
		else ctx.data.availabilitySlots.push(value);
	}

	function toggleBudget(value: string) {
		const pos = ctx.data.budgetRanges.indexOf(value);
		if (pos >= 0) ctx.data.budgetRanges.splice(pos, 1);
		else ctx.data.budgetRanges.push(value);
	}

	function addSpot() {
		const name = newSpotName.trim();
		if (!name) return;
		const isFirst = ctx.data.spots.length === 0;
		ctx.data.spots.push({ name, isPreferred: isFirst });
		newSpotName = '';
	}

	function removeSpot(idx: number) {
		ctx.data.spots.splice(idx, 1);
		if (ctx.data.spots.length > 0 && !ctx.data.spots.some((s: any) => s.isPreferred)) {
			ctx.data.spots[0].isPreferred = true;
		}
	}

	function setPreferred(idx: number) {
		ctx.data.spots.forEach((s: any, i: number) => {
			s.isPreferred = i === idx;
		});
	}
</script>

<div class="grid gap-6">
	<!-- Spots -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ SPOTS OÙ TU RIDES *
		</div>
		<div class="mb-3 font-mono text-label tracking-wide text-muted uppercase">
			⌥ SAISIE LIBRE · MVP 2 : CARTE INTERACTIVE AVEC RAYON DE RECHERCHE
		</div>
		{#if ctx.data.spots.length > 0}
			<div class="mb-3 flex flex-col gap-2">
				{#each ctx.data.spots as spot, i (i)}
					<div
						class="grid items-center gap-3.5 rounded-lg border border-line bg-white px-4.5 py-3.5"
						style="grid-template-columns: auto 1fr auto auto"
					>
						<button
							type="button"
							onclick={() => setPreferred(i)}
							class="h-2.5 w-2.5 rounded-full {spot.isPreferred ? 'bg-accent' : 'bg-muted'}"
							title="Marquer comme préféré"
						></button>
						<span class="font-sans text-[15px] font-semibold text-ink">{spot.name}</span>
						{#if spot.isPreferred}
							<span
								class="inline-flex items-center rounded-[4px] bg-bg-dark px-2.5 py-1 font-mono text-label font-semibold tracking-[0.04em] uppercase"
								>Préféré</span
							>
						{:else}
							<span></span>
						{/if}
						<button
							type="button"
							onclick={() => removeSpot(i)}
							class="cursor-pointer font-mono text-label tracking-loose text-muted underline uppercase"
						>
							Retirer
						</button>
					</div>
				{/each}
			</div>
		{/if}
		<div class="flex gap-2">
			<input
				type="text"
				placeholder="Leucate — La Franqui"
				bind:value={newSpotName}
				onkeydown={(e) => e.key === 'Enter' && (e.preventDefault(), addSpot())}
				class="flex-1 rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
			/>
			<button
				type="button"
				onclick={addSpot}
				class="inline-flex cursor-pointer items-center gap-2.5 rounded-md border-[1.5px] border-ink bg-transparent px-4.5 py-3 font-display text-body-sm font-bold tracking-wide text-ink uppercase"
			>
				+ Ajouter
			</button>
		</div>
	</div>

	<!-- Distance -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ DISTANCE MAX DEPUIS CHEZ TOI
			<span class="font-sans text-label font-normal tracking-normal text-muted normal-case">
				— aide à filtrer les moniteurs proches
			</span>
		</div>
		<div class="flex items-center gap-4.5 rounded-lg border border-line bg-white px-5.5 py-4.5">
			<div
				class="font-display text-[42px] font-black leading-none text-accent"
				style="min-width: 130px"
			>
				{ctx.data.maxDistanceKm} km
			</div>
			<input
				type="range"
				min="10"
				max="300"
				bind:value={ctx.data.maxDistanceKm}
				class="flex-1 accent-accent"
			/>
			<div class="font-mono text-label tracking-loose text-muted">10 — 300 KM</div>
		</div>
	</div>

	<!-- Availability -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ DISPONIBILITÉS HABITUELLES
		</div>
		<div class="mb-3 grid grid-cols-7 gap-1.5">
			{#each DAYS as day, idx (day)}
				{@const on = ctx.data.availabilityDays.includes(idx)}
				<div
					role="checkbox"
					aria-checked={on}
					tabindex="0"
					onclick={() => toggleDay(idx)}
					onkeydown={(e) => e.key === 'Enter' && toggleDay(idx)}
					class="cursor-pointer rounded-[10px] border py-3.5 text-center {on
						? 'border-ink bg-white shadow-[inset_0_0_0_1px_var(--color-ink)]'
						: 'border-line bg-bg-card'}"
				>
					<div class="font-mono text-[10.5px] tracking-loose text-muted uppercase">{day}</div>
					<div class="mt-1 text-[14px] font-bold {on ? 'text-ink' : 'text-muted'}">
						{on ? '✓' : '—'}
					</div>
				</div>
			{/each}
		</div>
		<div class="flex flex-wrap gap-1.5">
			{#each SLOTS as slot (slot.value)}
				{@const on = ctx.data.availabilitySlots.includes(slot.value)}
				<span
					role="checkbox"
					aria-checked={on}
					tabindex="0"
					onclick={() => toggleSlot(slot.value)}
					onkeydown={(e) => e.key === 'Enter' && toggleSlot(slot.value)}
					class="inline-flex cursor-pointer items-center rounded-[4px] px-3.5 py-2 font-mono text-label font-semibold tracking-[0.04em] uppercase {on
						? 'bg-ink text-white'
						: 'border border-line bg-transparent text-muted'}"
				>
					{on ? '✓ ' : ''}{slot.label}
				</span>
			{/each}
		</div>
	</div>

	<!-- Budget -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ BUDGET PAR SESSION
			<span class="font-sans text-label font-normal tracking-normal text-muted normal-case">
				— indicatif · Windmatch ne prend aucune commission, tu négocies en direct
			</span>
		</div>
		<div class="grid grid-cols-4 gap-2.5">
			{#each BUDGETS as b (b.value)}
				{@const on = ctx.data.budgetRanges.includes(b.value)}
				<div
					role="checkbox"
					aria-checked={on}
					tabindex="0"
					onclick={() => toggleBudget(b.value)}
					onkeydown={(e) => e.key === 'Enter' && toggleBudget(b.value)}
					class="cursor-pointer rounded-[10px] border p-3.5 {on
						? 'border-ink bg-white shadow-[inset_0_0_0_1px_var(--color-ink)]'
						: 'border-line bg-bg-card'}"
				>
					<div class="mb-1 font-display text-[18px] font-black {on ? 'text-ink' : 'text-muted'}">
						{b.label}
					</div>
					<div class="text-[11.5px] text-muted">{b.desc}</div>
				</div>
			{/each}
		</div>
	</div>
</div>
