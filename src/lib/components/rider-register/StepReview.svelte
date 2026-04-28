<script lang="ts">
	import { getRiderRegisterCtx } from './context';

	const ctx = getRiderRegisterCtx();

	const SPORT_LABELS: Record<string, string> = {
		kitesurf: 'Kitesurf',
		wingfoil: 'Wingfoil',
		windsurf: 'Windsurf'
	};
	const LEVEL_LABELS: Record<string, string> = {
		discovery: 'Découverte',
		beginner: 'Débutant',
		intermediate: 'Intermédiaire',
		advanced: 'Avancé'
	};
	const DAY_LABELS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
	const SLOT_LABELS: Record<string, string> = {
		morning: 'Matin',
		midday: 'Midi',
		afternoon: 'Après-midi',
		end_of_day: 'Fin de journée',
		weekends_only: 'Week-ends only',
		school_holidays: 'Vacances scolaires'
	};
</script>

<div class="grid gap-3.5">
	<!-- Profile header card -->
	<div
		class="grid items-center gap-4.5 rounded-[10px] border border-line bg-white px-5.5 py-4.5"
		style="grid-template-columns: auto 1fr"
	>
		<div
			class="h-20 w-20 rounded-full"
			style="background: repeating-linear-gradient(45deg, #E6DFD0 0px, #E6DFD0 4px, #D9D4CB 4px, #D9D4CB 8px)"
		></div>
		<div>
			<div class="font-display text-[30px] font-black leading-none tracking-tight uppercase">
				{ctx.data.firstName}{ctx.data.lastName ? ' ' + ctx.data.lastName : ''}
			</div>
			<div class="mt-1 text-[13.5px] text-muted">
				{ctx.data.city}{ctx.data.birthYear ? ' · né·e en ' + ctx.data.birthYear : ''}
			</div>
			<div class="mt-2.5 flex flex-wrap gap-1.5">
				{#each ctx.data.sports as s (s.sport)}
					<span
						class="inline-flex items-center rounded-[4px] bg-ink px-2.5 py-1 font-mono text-label font-semibold tracking-[0.04em] text-white uppercase"
					>
						{SPORT_LABELS[s.sport] ?? s.sport}
					</span>
					{#if s.level}
						<span
							class="inline-flex items-center rounded-[4px] bg-bg-dark px-2.5 py-1 font-mono text-label font-semibold tracking-[0.04em] uppercase"
						>
							{LEVEL_LABELS[s.level] ?? s.level}
						</span>
					{/if}
				{/each}
			</div>
		</div>
	</div>

	<!-- Recap grid -->
	<div class="grid grid-cols-2 gap-3.5">
		<div class="rounded-[10px] border border-line bg-white px-5.5 py-5">
			<div class="mb-3 flex items-center justify-between">
				<div class="font-mono text-label font-semibold tracking-widest text-accent uppercase">
					↳ OBJECTIFS
				</div>
				<button
					type="button"
					onclick={() => ctx.goTo(2)}
					class="cursor-pointer font-mono text-label tracking-loose text-muted underline uppercase"
					>Modifier</button
				>
			</div>
			<div class="text-[13.5px] leading-[1.7]">
				{#if ctx.data.goals.length}
					{#each ctx.data.goals as g (g)}▸ {g}<br />{/each}
				{:else}
					<span class="text-muted">Aucun objectif sélectionné</span>
				{/if}
				{#if ctx.data.formatPreferences.length}
					<span class="text-[12.5px] text-muted"
						>Format · {ctx.data.formatPreferences.join(', ')}</span
					>
				{/if}
			</div>
		</div>

		<div class="rounded-[10px] border border-line bg-white px-5.5 py-5">
			<div class="mb-3 flex items-center justify-between">
				<div class="font-mono text-label font-semibold tracking-widest text-accent uppercase">
					↳ SPOTS
				</div>
				<button
					type="button"
					onclick={() => ctx.goTo(3)}
					class="cursor-pointer font-mono text-label tracking-loose text-muted underline uppercase"
					>Modifier</button
				>
			</div>
			<div class="text-[13.5px] leading-relaxed">
				{#if ctx.data.spots.length}
					{#each ctx.data.spots as spot (spot.name)}
						{spot.name}{spot.isPreferred ? ' (préféré)' : ''}<br />
					{/each}
				{:else}
					<span class="text-muted">Aucun spot ajouté</span>
				{/if}
				<span class="font-mono text-label tracking-wide text-muted"
					>RAYON · {ctx.data.maxDistanceKm} KM</span
				>
			</div>
		</div>

		<div class="rounded-[10px] border border-line bg-white px-5.5 py-5">
			<div class="mb-3 flex items-center justify-between">
				<div class="font-mono text-label font-semibold tracking-widest text-accent uppercase">
					↳ DISPONIBILITÉS
				</div>
				<button
					type="button"
					onclick={() => ctx.goTo(3)}
					class="cursor-pointer font-mono text-label tracking-loose text-muted underline uppercase"
					>Modifier</button
				>
			</div>
			<div class="text-[13.5px] leading-relaxed">
				{#if ctx.data.availabilityDays.length}
					{ctx.data.availabilityDays
						.slice()
						.sort((a: number, b: number) => a - b)
						.map((d: number) => DAY_LABELS[d])
						.join(', ')}
				{:else}
					<span class="text-muted">Non renseigné</span>
				{/if}
				<br />
				{#if ctx.data.availabilitySlots.length}
					<span class="font-mono text-label tracking-wide text-muted">
						{ctx.data.availabilitySlots.map((s: string) => SLOT_LABELS[s] ?? s).join(' · ').toUpperCase()}
					</span>
				{/if}
			</div>
		</div>

		<div class="rounded-[10px] border border-line bg-white px-5.5 py-5">
			<div class="mb-3 flex items-center justify-between">
				<div class="font-mono text-label font-semibold tracking-widest text-accent uppercase">
					↳ BUDGET
				</div>
				<button
					type="button"
					onclick={() => ctx.goTo(3)}
					class="cursor-pointer font-mono text-label tracking-loose text-muted underline uppercase"
					>Modifier</button
				>
			</div>
			<div class="text-[13.5px] leading-relaxed">
				{#if ctx.data.budgetRanges.length}
					<b>{ctx.data.budgetRanges.join(' — ')}</b> / session
				{:else}
					<span class="text-muted">Non renseigné</span>
				{/if}
				<br />
				<span class="font-mono text-label tracking-wide text-muted"
					>SANS COMMISSION · CONTACT DIRECT</span
				>
			</div>
		</div>
	</div>

	<!-- Privacy notice -->
	<div class="rounded-lg bg-bg-dark px-4.5 py-3.5 text-[12.5px] leading-relaxed text-muted">
		⌥ Tes infos restent privées. Le moniteur ne voit ton nom et tes coordonnées que si <b>tu</b> le
		contactes — jamais l'inverse.
	</div>
</div>
