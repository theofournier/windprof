<div class="grid gap-8">
	<!-- Disciplines -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ DISCIPLINES ENSEIGNÉES *
			<span class="font-sans text-label font-normal tracking-normal text-muted normal-case">
				— sélection multiple
			</span>
		</div>
		<div class="grid grid-cols-3 gap-3">
			{#each [
				{ n: 'Kitesurf', d: "Aile de traction et planche, le grand classique du vent. Toutes glisses associées (twin-tip, foil, strapless).", on: true },
				{ n: 'Wingfoil', d: "Wing à la main et planche à foil. La discipline qui explose, accessible à partir de 12 kt.", on: true },
				{ n: 'Windsurf', d: "Voile + planche, école historique. Du slalom au freestyle en passant par la vague.", on: false }
			] as d}
				<div class="relative cursor-pointer rounded-[10px] border p-5 {d.on ? 'border-ink bg-white shadow-[inset_0_0_0_1px_var(--color-ink)]' : 'border-line bg-bg-card'}">
					{#if d.on}
						<span class="absolute top-3.5 right-3.5 flex h-5.5 w-5.5 items-center justify-center rounded-[4px] bg-accent text-body-sm font-bold text-white">✓</span>
					{/if}
					<div class="mb-2 font-display text-[22px] font-black tracking-snug uppercase">{d.n}</div>
					<p class="m-0 text-body-sm leading-relaxed text-muted">{d.d}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Levels -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ NIVEAUX ACCEPTÉS *
		</div>
		<div class="grid grid-cols-4 gap-2.5">
			{#each [
				{ n: 'Débutant', d: 'Première session ou base à consolider', on: true },
				{ n: 'Intermédiaire', d: 'Bords assurés, départ planning, premiers sauts', on: true },
				{ n: 'Avancé', d: 'Tricks, foil, vagues, perfectionnement spécifique', on: true },
				{ n: 'Tous niveaux', d: "Je m'adapte à toute la pyramide", on: false }
			] as n}
				<div class="cursor-pointer rounded-[10px] border p-4.5 {n.on ? 'border-ink bg-white' : 'border-line bg-bg-card'}">
					<div class="mb-1.5 flex items-center gap-2">
						<span class="flex h-4.5 w-4.5 items-center justify-center rounded-[4px] text-label font-bold text-white {n.on ? 'bg-accent' : 'border-[1.5px] border-line bg-transparent'}">
							{n.on ? '✓' : ''}
						</span>
						<span class="text-[14px] font-bold">{n.n}</span>
					</div>
					<div class="pl-6.5 text-caption leading-snug text-muted">{n.d}</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Wind minimum -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ VENT MINIMUM (KT)
		</div>
		<div class="mb-1.5 font-mono text-[10.5px] tracking-wide text-muted">
			Seuil en dessous duquel tu n'enseignes pas — utile pour le matching météo (MVP 2)
		</div>
		<div class="flex items-center gap-4.5 rounded-lg border border-line bg-white px-5.5 py-4.5">
			<div class="font-display text-[42px] font-black leading-none text-accent" style="min-width: 90px">
				12 kt
			</div>
			<input type="range" min="5" max="30" value="12" class="flex-1 accent-accent" />
			<div class="font-mono text-label tracking-loose text-muted">5 — 30 KT</div>
		</div>
	</div>
</div>
