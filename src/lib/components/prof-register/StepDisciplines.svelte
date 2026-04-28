<script lang="ts">
	import { getProfRegisterCtx, type ProfSport } from './context';

	const ctx = getProfRegisterCtx();

	const DISCIPLINES: Array<{ sport: ProfSport; label: string; desc: string }> = [
		{
			sport: 'kitesurf',
			label: 'Kitesurf',
			desc: 'Aile de traction et planche, le grand classique du vent. Toutes glisses associées (twin-tip, foil, strapless).'
		},
		{
			sport: 'wingfoil',
			label: 'Wingfoil',
			desc: "Wing à la main et planche à foil. La discipline qui explose, accessible à partir de 12 kt."
		},
		{
			sport: 'windsurf',
			label: 'Windsurf',
			desc: 'Voile + planche, école historique. Du slalom au freestyle en passant par la vague.'
		}
	];

	const LEVELS = [
		{ value: 'beginner', label: 'Débutant', desc: 'Première session ou base à consolider' },
		{ value: 'intermediate', label: 'Intermédiaire', desc: 'Bords assurés, départ planning, premiers sauts' },
		{ value: 'advanced', label: 'Avancé', desc: 'Tricks, foil, vagues, perfectionnement spécifique' },
		{ value: 'all', label: 'Tous niveaux', desc: "Je m'adapte à toute la pyramide" }
	];

	function toggleSport(sport: ProfSport) {
		const idx = ctx.data.sports.findIndex((s) => s.sport === sport);
		if (idx >= 0) {
			ctx.data.sports.splice(idx, 1);
		} else {
			ctx.data.sports.push({ sport, acceptedLevels: [] });
		}
	}

	function isSelected(sport: ProfSport): boolean {
		return ctx.data.sports.some((s) => s.sport === sport);
	}

	function toggleLevel(sport: ProfSport, level: string) {
		const entry = ctx.data.sports.find((s) => s.sport === sport);
		if (!entry) return;
		const idx = entry.acceptedLevels.indexOf(level);
		if (idx >= 0) entry.acceptedLevels.splice(idx, 1);
		else entry.acceptedLevels.push(level);
	}

	function hasLevel(sport: ProfSport, level: string): boolean {
		const entry = ctx.data.sports.find((s) => s.sport === sport);
		return entry?.acceptedLevels.includes(level) ?? false;
	}
</script>

<div class="grid gap-8">
	<!-- Disciplines -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ DISCIPLINES ENSEIGNÉES *
			<span class="font-sans text-label font-normal tracking-normal text-muted normal-case">
				— sélection multiple
			</span>
		</div>
		<div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
			{#each DISCIPLINES as d (d.sport)}
				{@const on = isSelected(d.sport)}
				<div
					role="checkbox"
					aria-checked={on}
					tabindex="0"
					onclick={() => toggleSport(d.sport)}
					onkeydown={(e) => e.key === 'Enter' && toggleSport(d.sport)}
					class="relative cursor-pointer rounded-[10px] border p-5 {on
						? 'border-ink bg-white shadow-[inset_0_0_0_1px_var(--color-ink)]'
						: 'border-line bg-bg-card'}"
				>
					{#if on}
						<span
							class="absolute top-3.5 right-3.5 flex h-5.5 w-5.5 items-center justify-center rounded-[4px] bg-accent text-body-sm font-bold text-white"
							>✓</span
						>
					{/if}
					<div class="mb-2 font-display text-[22px] font-black tracking-snug uppercase">{d.label}</div>
					<p class="m-0 text-body-sm leading-relaxed text-muted">{d.desc}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Levels per selected sport -->
	{#each ctx.data.sports as entry (entry.sport)}
		<div>
			<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
				↳ NIVEAUX ACCEPTÉS · {entry.sport.toUpperCase()} *
			</div>
			<div class="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
				{#each LEVELS as lvl (lvl.value)}
					{@const on = hasLevel(entry.sport, lvl.value)}
					<div
						role="checkbox"
						aria-checked={on}
						tabindex="0"
						onclick={() => toggleLevel(entry.sport, lvl.value)}
						onkeydown={(e) => e.key === 'Enter' && toggleLevel(entry.sport, lvl.value)}
						class="cursor-pointer rounded-[10px] border p-4.5 {on
							? 'border-ink bg-white'
							: 'border-line bg-bg-card'}"
					>
						<div class="mb-1.5 flex items-center gap-2">
							<span
								class="flex h-4.5 w-4.5 items-center justify-center rounded-[4px] text-label font-bold text-white {on
									? 'bg-accent'
									: 'border-[1.5px] border-line bg-transparent'}"
							>
								{on ? '✓' : ''}
							</span>
							<span class="text-[14px] font-bold">{lvl.label}</span>
						</div>
						<div class="pl-6.5 text-caption leading-snug text-muted">{lvl.desc}</div>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>
