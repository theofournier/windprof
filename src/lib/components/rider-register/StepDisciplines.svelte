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
			{#each [
				{ n: 'Kitesurf', d: 'Aile + planche, le grand classique', on: false },
				{ n: 'Wingfoil', d: 'Wing à la main + foil', on: true },
				{ n: 'Windsurf', d: 'Voile + planche, école historique', on: false }
			] as d (d.n)}
				<div
					class="relative cursor-pointer rounded-[10px] border p-5 {d.on
						? 'border-ink bg-white shadow-[inset_0_0_0_1px_var(--color-ink)]'
						: 'border-line bg-bg-card'}"
				>
					{#if d.on}
						<span
							class="absolute top-3.5 right-3.5 flex h-5.5 w-5.5 items-center justify-center rounded-[4px] bg-accent text-body-sm font-bold text-white"
							>✓</span
						>
					{/if}
					<div class="mb-2 font-display text-[22px] font-black tracking-snug uppercase">{d.n}</div>
					<p class="m-0 text-body-sm leading-relaxed text-muted">{d.d}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Level -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ TON NIVEAU · WINGFOIL
		</div>
		<div class="mb-3 font-mono text-[10.5px] tracking-wide text-muted uppercase">
			⌥ Si tu as plusieurs disciplines, on te demandera le niveau pour chacune
		</div>
		<div class="grid grid-cols-4 gap-2.5">
			{#each [
				{ n: 'Découverte', d: 'Jamais essayé ou première session', on: false },
				{ n: 'Débutant', d: 'Premiers bords, je consolide les bases', on: false },
				{ n: 'Intermédiaire', d: 'Bords assurés, départ planning', on: true },
				{ n: 'Avancé', d: 'Tricks, foil, vagues — je veux affiner', on: false }
			] as n (n.n)}
				<div
					class="cursor-pointer rounded-[10px] border p-4 {n.on
						? 'border-ink bg-white shadow-[inset_0_0_0_1px_var(--color-ink)]'
						: 'border-line bg-bg-card'}"
				>
					<div class="mb-1.5 flex items-center gap-2">
						<span
							class="flex h-4.5 w-4.5 items-center justify-center rounded-full text-[9px] font-bold text-white {n.on
								? 'bg-accent'
								: 'border-[1.5px] border-line bg-transparent'}"
						>
							{n.on ? '●' : ''}
						</span>
						<span class="text-[14px] font-bold">{n.n}</span>
					</div>
					<div class="pl-6.5 text-caption leading-snug text-muted">{n.d}</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Years of practice -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ ANNÉES DE PRATIQUE
			<span class="font-sans text-label font-normal tracking-normal text-muted normal-case">
				— indicatif, pour aider le moniteur à calibrer la session
			</span>
		</div>
		<div class="flex items-center gap-4.5 rounded-lg border border-line bg-white px-5.5 py-4.5">
			<div
				class="font-display text-[42px] font-black leading-none text-accent"
				style="min-width: 90px"
			>
				4 ans
			</div>
			<input type="range" min="0" max="20" value="4" class="flex-1 accent-accent" />
			<div class="font-mono text-label tracking-loose text-muted">0 — 20 ANS</div>
		</div>
	</div>
</div>
