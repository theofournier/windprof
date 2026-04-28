<script lang="ts">
	import { getRiderRegisterCtx, type RiderSport, type RiderLevel } from './context';

	const ctx = getRiderRegisterCtx();

	const DISCIPLINES: Array<{ sport: RiderSport; label: string; desc: string }> = [
		{ sport: 'kitesurf', label: 'Kitesurf', desc: 'Aile + planche, le grand classique' },
		{ sport: 'wingfoil', label: 'Wingfoil', desc: 'Wing à la main + foil' },
		{ sport: 'windsurf', label: 'Windsurf', desc: 'Voile + planche, école historique' }
	];

	const LEVELS: Array<{ value: RiderLevel; label: string; desc: string }> = [
		{ value: 'discovery', label: 'Découverte', desc: 'Jamais essayé ou première session' },
		{ value: 'beginner', label: 'Débutant', desc: 'Premiers bords, je consolide les bases' },
		{ value: 'intermediate', label: 'Intermédiaire', desc: 'Bords assurés, départ planning' },
		{ value: 'advanced', label: 'Avancé', desc: 'Tricks, foil, vagues — je veux affiner' }
	];

	function toggleSport(sport: RiderSport) {
		const idx = ctx.data.sports.findIndex((s) => s.sport === sport);
		if (idx >= 0) {
			ctx.data.sports.splice(idx, 1);
		} else {
			ctx.data.sports.push({ sport, level: '' });
		}
	}

	function isSelected(sport: RiderSport): boolean {
		return ctx.data.sports.some((s) => s.sport === sport);
	}

	function setLevel(sport: RiderSport, level: RiderLevel) {
		const entry = ctx.data.sports.find((s) => s.sport === sport);
		if (entry) entry.level = level;
	}
</script>

<div class="grid gap-8">
	<!-- Disciplines -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ TES DISCIPLINES *
			<span class="font-sans text-label font-normal tracking-normal text-muted normal-case">
				— sélection multiple
			</span>
		</div>
		<div class="grid grid-cols-3 gap-3">
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

	<!-- Level per selected sport -->
	{#each ctx.data.sports as entry (entry.sport)}
		<div>
			<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
				↳ TON NIVEAU · {entry.sport.toUpperCase()}
			</div>
			<div class="mb-3 font-mono text-[10.5px] tracking-wide text-muted uppercase">
				⌥ Si tu as plusieurs disciplines, on te demandera le niveau pour chacune
			</div>
			<div class="grid grid-cols-4 gap-2.5">
				{#each LEVELS as lvl (lvl.value)}
					{@const on = entry.level === lvl.value}
					<div
						role="radio"
						aria-checked={on}
						tabindex="0"
						onclick={() => setLevel(entry.sport, lvl.value)}
						onkeydown={(e) => e.key === 'Enter' && setLevel(entry.sport, lvl.value)}
						class="cursor-pointer rounded-[10px] border p-4 {on
							? 'border-ink bg-white shadow-[inset_0_0_0_1px_var(--color-ink)]'
							: 'border-line bg-bg-card'}"
					>
						<div class="mb-1.5 flex items-center gap-2">
							<span
								class="flex h-4.5 w-4.5 items-center justify-center rounded-full text-[9px] font-bold text-white {on
									? 'bg-accent'
									: 'border-[1.5px] border-line bg-transparent'}"
							>
								{on ? '●' : ''}
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
