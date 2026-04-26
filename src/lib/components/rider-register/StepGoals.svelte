<div class="grid gap-6">
	<!-- Goals -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ TES OBJECTIFS *
			<span class="font-sans text-label font-normal tracking-normal text-muted normal-case">
				— sélection multiple
			</span>
		</div>
		<div class="grid grid-cols-2 gap-2.5">
			{#each [
				{ n: 'Découvrir le sport', d: 'Première session, prendre les bases', on: false },
				{ n: 'Solidifier les bases', d: 'Bords, virements, départ planning', on: false },
				{ n: 'Passer au foil', d: 'Premier vol, transitions au foil', on: true },
				{ n: 'Apprendre à sauter', d: 'Premier saut, hauteur, atterrissage', on: false },
				{ n: 'Faire de la vague', d: 'Lecture vague, virages engagés', on: false },
				{ n: 'Tricks / freestyle', d: 'Rotations, slides, figures', on: false },
				{ n: 'Reprendre en sécurité', d: 'Après une pause, redevenir confiant', on: true },
				{ n: 'Juste rider ensemble', d: 'Coach session sans objectif précis', on: false }
			] as g (g.n)}
				<div
					class="grid cursor-pointer items-start rounded-[10px] border p-4 {g.on
						? 'border-ink bg-white shadow-[inset_0_0_0_1px_var(--color-ink)]'
						: 'border-line bg-bg-card'}"
					style="grid-template-columns: auto 1fr; gap: 12px"
				>
					<span
						class="mt-0.5 flex h-5 w-5 items-center justify-center rounded-[4px] text-caption font-bold text-white {g.on
							? 'bg-accent'
							: 'border-[1.5px] border-line bg-transparent'}"
					>
						{g.on ? '✓' : ''}
					</span>
					<div>
						<div class="text-[14px] font-bold">{g.n}</div>
						<div class="mt-0.5 text-[12.5px] leading-snug text-muted">{g.d}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Format -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ FORMAT PRÉFÉRÉ
			<span class="font-sans text-label font-normal tracking-normal text-muted normal-case">
				— tu pourras toujours choisir autre chose au moment de réserver
			</span>
		</div>
		<div class="grid grid-cols-4 gap-2.5">
			{#each [
				{ n: 'Cours individuel', d: '1-1, max attention', on: true },
				{ n: 'Duo (2 riders)', d: 'Avec un·e proche', on: false },
				{ n: 'Petit groupe (3)', d: 'Plus économique', on: false },
				{ n: 'Stage / week-end', d: 'Progression intense', on: true }
			] as f (f.n)}
				<div
					class="cursor-pointer rounded-[10px] border p-3.5 {f.on
						? 'border-ink bg-white shadow-[inset_0_0_0_1px_var(--color-ink)]'
						: 'border-line bg-bg-card'}"
				>
					<div class="mb-1 flex items-center gap-2">
						<span
							class="flex h-4 w-4 items-center justify-center rounded-[4px] text-[10px] font-bold text-white {f.on
								? 'bg-accent'
								: 'border-[1.5px] border-line bg-transparent'}"
						>
							{f.on ? '✓' : ''}
						</span>
						<span class="text-body-sm font-bold">{f.n}</span>
					</div>
					<div class="pl-6 text-[11.5px] text-muted">{f.d}</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Equipment -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ MATÉRIEL
			<span class="font-sans text-label font-normal tracking-normal text-muted normal-case">
				— le moniteur saura quoi proposer
			</span>
		</div>
		<div class="grid grid-cols-3 gap-2.5">
			{#each [
				{ n: "J'ai mon matériel", d: 'Je viens avec', on: false },
				{ n: 'Matériel à fournir', d: 'Le moniteur prête', on: true },
				{ n: 'Peu importe', d: "Je m'adapte", on: false }
			] as m (m.n)}
				<div
					class="cursor-pointer rounded-[10px] border p-3.5 {m.on
						? 'border-ink bg-white shadow-[inset_0_0_0_1px_var(--color-ink)]'
						: 'border-line bg-bg-card'}"
				>
					<div class="mb-1 flex items-center gap-2">
						<span
							class="flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white {m.on
								? 'bg-accent'
								: 'border-[1.5px] border-line bg-transparent'}"
						>
							{m.on ? '●' : ''}
						</span>
						<span class="text-body-sm font-bold">{m.n}</span>
					</div>
					<div class="pl-6 text-[11.5px] text-muted">{m.d}</div>
				</div>
			{/each}
		</div>
	</div>
</div>
