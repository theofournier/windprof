<div class="grid gap-6">
	<!-- Spots -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ SPOTS OÙ TU RIDES *
		</div>
		<div class="mb-3 font-mono text-label tracking-wide text-muted uppercase">
			⌥ SAISIE LIBRE · MVP 2 : CARTE INTERACTIVE AVEC RAYON DE RECHERCHE
		</div>
		<div class="mb-3 flex flex-col gap-2">
			{#each [
				{ name: 'Leucate — La Franqui', preferred: true },
				{ name: 'La Palme', preferred: false },
				{ name: 'Gruissan', preferred: false }
			] as spot, i (spot.name)}
				<div
					class="grid items-center gap-3.5 rounded-lg border border-line bg-white px-4.5 py-3.5"
					style="grid-template-columns: auto 1fr {spot.preferred ? 'auto ' : ''}auto"
				>
					<span class="h-2.5 w-2.5 rounded-full {i === 0 ? 'bg-accent' : 'bg-muted'}"></span>
					<input
						type="text"
						value={spot.name}
						class="border-0 bg-transparent p-0 font-sans text-[15px] font-semibold text-ink outline-none"
					/>
					{#if spot.preferred}
						<span
							class="inline-flex items-center rounded-[4px] bg-bg-dark px-2.5 py-1 font-mono text-label font-semibold tracking-[0.04em] uppercase"
							>Préféré</span
						>
					{/if}
					<button
						class="cursor-pointer font-mono text-label tracking-loose text-muted underline uppercase"
					>
						Retirer
					</button>
				</div>
			{/each}
		</div>
		<button
			class="inline-flex cursor-pointer items-center gap-2.5 rounded-md border-[1.5px] border-ink bg-transparent px-4.5 py-3 font-display text-body-sm font-bold tracking-wide text-ink uppercase"
		>
			+ Ajouter un spot
		</button>
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
				60 km
			</div>
			<input type="range" min="10" max="300" value="60" class="flex-1 accent-accent" />
			<div class="font-mono text-label tracking-loose text-muted">10 — 300 KM</div>
		</div>
	</div>

	<!-- Availability -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ DISPONIBILITÉS HABITUELLES
		</div>
		<div class="mb-3 grid grid-cols-7 gap-1.5">
			{#each [
				{ d: 'Lun', on: false },
				{ d: 'Mar', on: false },
				{ d: 'Mer', on: true },
				{ d: 'Jeu', on: false },
				{ d: 'Ven', on: true },
				{ d: 'Sam', on: true },
				{ d: 'Dim', on: true }
			] as day (day.d)}
				<div
					class="cursor-pointer rounded-[10px] border py-3.5 text-center {day.on
						? 'border-ink bg-white shadow-[inset_0_0_0_1px_var(--color-ink)]'
						: 'border-line bg-bg-card'}"
				>
					<div class="font-mono text-[10.5px] tracking-loose text-muted uppercase">{day.d}</div>
					<div class="mt-1 text-[14px] font-bold {day.on ? 'text-ink' : 'text-muted'}">
						{day.on ? '✓' : '—'}
					</div>
				</div>
			{/each}
		</div>
		<div class="flex flex-wrap gap-1.5">
			{#each [
				{ n: 'Matin', on: false },
				{ n: 'Midi', on: true },
				{ n: 'Après-midi', on: true },
				{ n: 'Fin de journée', on: false },
				{ n: 'Week-ends only', on: true },
				{ n: 'Vacances scolaires', on: false }
			] as slot (slot.n)}
				<span
					class="inline-flex cursor-pointer items-center rounded-[4px] px-3.5 py-2 font-mono text-label font-semibold tracking-[0.04em] uppercase {slot.on
						? 'bg-ink text-white'
						: 'border border-line bg-transparent text-muted'}"
				>
					{slot.on ? '✓ ' : ''}{slot.n}
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
			{#each [
				{ r: '< 60 €', d: 'Groupe / découverte', on: false },
				{ r: '60–90 €', d: 'Cours individuel court', on: true },
				{ r: '90–130 €', d: 'Cours indiv. classique', on: true },
				{ r: '> 130 €', d: 'Stage, perfectionnement', on: false }
			] as b (b.r)}
				<div
					class="cursor-pointer rounded-[10px] border p-3.5 {b.on
						? 'border-ink bg-white shadow-[inset_0_0_0_1px_var(--color-ink)]'
						: 'border-line bg-bg-card'}"
				>
					<div
						class="mb-1 font-display text-[18px] font-black {b.on ? 'text-ink' : 'text-muted'}"
					>
						{b.r}
					</div>
					<div class="text-[11.5px] text-muted">{b.d}</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Notifications -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ NOTIFICATIONS MATCHING
		</div>
		<div class="flex flex-col gap-2.5">
			{#each [
				{
					n: "Alerte « bon vent prévu sur tes spots »",
					d: '1-2 mails / semaine selon météo',
					on: true
				},
				{
					n: 'Nouveaux moniteurs sur ta zone',
					d: "Quand un coach s'inscrit près de chez toi",
					on: true
				},
				{ n: 'Brief vent du vendredi', d: 'Récap hebdo prévisions week-end', on: false }
			] as opt (opt.n)}
				<div
					class="grid cursor-pointer items-center gap-3.5 rounded-md border border-line bg-white px-4 py-3"
					style="grid-template-columns: auto 1fr"
				>
					<span
						class="relative flex-shrink-0 rounded-full"
						style="width:38px; height:22px; background: {opt.on
							? 'var(--color-accent)'
							: 'var(--color-line)'}"
					>
						<span
							class="absolute top-0.5 h-[18px] w-[18px] rounded-full bg-white transition-all"
							style="left: {opt.on ? '18px' : '2px'}"
						></span>
					</span>
					<div>
						<div class="text-[13.5px] font-semibold">{opt.n}</div>
						<div class="mt-0.5 font-mono text-[10.5px] tracking-wide text-muted">{opt.d}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
