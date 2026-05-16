<script lang="ts">
	const testimonials = [
		{
			n: 'Marco D.',
			r: 'Moniteur · Windsurf',
			l: 'Almanarre',
			since: 'Inscrit fév. 2026',
			q: "Avant Windprof je perdais des élèves dans les commissions. Maintenant ils me contactent directement, je fixe mes tarifs et j'empoche tout."
		},
		{
			n: 'Anaïs P.',
			r: 'Monitrice · Wingfoil',
			l: 'La Torche',
			since: 'Inscrite janv. 2026',
			q: 'Mes habitués sont revenus sans passer par la case algorithme. Le contact direct change vraiment la relation avec les riders.'
		},
		{
			n: 'Léa V.',
			r: 'Monitrice · Kitesurf',
			l: 'Quiberon',
			since: 'Inscrite mars 2026',
			q: 'Le badge Vérifié change tout pour les parents qui cherchent un moniteur pour leurs enfants. Ça rassure immédiatement.'
		}
	];
</script>

<section>
	<!-- Section header -->
	<div class="mb-10">
		<div class="mb-3 font-mono text-label font-semibold tracking-wider text-accent uppercase">
			↳ 04 · CE QU'ILS EN DISENT
		</div>
		<h2 class="text-[40px] leading-[0.95] tracking-tight sm:text-[54px] lg:text-[68px]">
			Trois moniteurs.
			<span class="font-serif font-normal tracking-normal normal-case italic"
				>Trois retours d'eau.</span
			>
		</h2>
	</div>

	<!-- 3-column grid -->
	<div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
		{#each testimonials as t, i}
			<div class="relative flex flex-col overflow-hidden rounded-xl border border-line bg-white">
				<div class="relative z-10 flex h-full flex-col p-7">
					<!-- Top row: avatar + stat -->
					<div class="mb-5 flex items-center justify-between">
						<!-- Avatar -->
						<div
							class="flex h-11 w-11 items-center justify-center rounded-full bg-bg-dark font-display text-base font-black text-muted uppercase"
						>
							{t.n.charAt(0)}
						</div>
					</div>

					<!-- Quote -->
					<blockquote
						class="mb-6 flex-1 font-serif text-[17px] leading-relaxed font-normal text-ink italic"
					>
						« {t.q} »
					</blockquote>

					<!-- Bottom: name/role + location/date -->
					<div class="flex items-end justify-between">
						<div>
							<div class="font-mono text-caption font-bold tracking-wider text-ink uppercase">
								{t.n}
							</div>
							<div class="font-mono text-label text-muted">
								{t.r}
							</div>
						</div>
						<div class="text-right">
							<div class="font-mono text-label text-muted">
								{t.l}
							</div>
							<div class="font-mono text-label text-muted/60">
								{t.since}
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
