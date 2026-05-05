<script lang="ts">
	const testimonials = [
		{
			n: 'Marco D.',
			r: 'Moniteur · Windsurf',
			l: 'Almanarre',
			since: 'Inscrit fév. 2026',
			q: 'Avant Windmatch je perdais des élèves dans les commissions. Maintenant ils me contactent directement, je fixe mes tarifs et j\'empoche tout.',
			stat: '+ 32 %',
			statL: 'de marge nette'
		},
		{
			n: 'Anaïs P.',
			r: 'Monitrice · Wingfoil',
			l: 'La Torche',
			since: 'Inscrite janv. 2026',
			q: 'Mes habitués sont revenus sans passer par la case algorithme. Le contact direct change vraiment la relation avec les riders.',
			stat: '14',
			statL: 'nouveaux élèves / mois'
		},
		{
			n: 'Léa V.',
			r: 'Monitrice · Kitesurf',
			l: 'Quiberon',
			since: 'Inscrite mars 2026',
			q: 'Le badge Vérifié change tout pour les parents qui cherchent un moniteur pour leurs enfants. Ça rassure immédiatement.',
			stat: '4.7 ★',
			statL: '54 avis'
		}
	];
</script>

<section>
	<!-- Section header -->
	<div class="mb-10">
		<div class="mb-3 font-mono text-label font-semibold tracking-wider text-accent uppercase">
			↳ 05 · CE QU'ILS EN DISENT
		</div>
		<h2 class="text-[40px] leading-[0.95] tracking-tight sm:text-[54px] lg:text-[68px]">
			Trois moniteurs.
			<span class="font-serif font-normal italic normal-case tracking-normal">Trois retours d'eau.</span>
		</h2>
	</div>

	<!-- 3-column grid -->
	<div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
		{#each testimonials as t, i}
			<div class="relative flex flex-col overflow-hidden rounded-xl border {i === 1 ? 'testimonial-dark border-white/10' : 'border-line bg-white'}">
				{#if i === 1}
					<div class="wind-lines absolute inset-0 pointer-events-none"></div>
				{/if}

				<div class="relative z-10 flex h-full flex-col p-7">
					<!-- Top row: avatar + stat -->
					<div class="mb-5 flex items-center justify-between">
						<!-- Avatar -->
						<div class="h-11 w-11 rounded-full {i === 1 ? 'bg-white/15' : 'bg-bg-dark'} flex items-center justify-center font-display text-base font-black {i === 1 ? 'text-white' : 'text-muted'} uppercase">
							{t.n.charAt(0)}
						</div>
						<!-- Stat -->
						<div class="text-right">
							<div class="font-display text-[28px] font-black leading-none tracking-tight {i === 1 ? 'text-accent-soft' : 'text-accent'}">
								{t.stat}
							</div>
							<div class="mt-0.5 font-mono text-caption font-semibold tracking-wider {i === 1 ? 'text-white/50' : 'text-muted'} uppercase">
								{t.statL}
							</div>
						</div>
					</div>

					<!-- Quote -->
					<blockquote class="mb-6 flex-1 font-serif text-[17px] font-normal italic leading-relaxed {i === 1 ? 'text-white/85' : 'text-ink'}">
						« {t.q} »
					</blockquote>

					<!-- Bottom: name/role + location/date -->
					<div class="flex items-end justify-between">
						<div>
							<div class="font-mono text-caption font-bold tracking-wider {i === 1 ? 'text-white' : 'text-ink'} uppercase">
								{t.n}
							</div>
							<div class="font-mono text-label {i === 1 ? 'text-white/50' : 'text-muted'}">
								{t.r}
							</div>
						</div>
						<div class="text-right">
							<div class="font-mono text-label {i === 1 ? 'text-white/50' : 'text-muted'}">
								{t.l}
							</div>
							<div class="font-mono text-label {i === 1 ? 'text-white/40' : 'text-muted/60'}">
								{t.since}
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.testimonial-dark {
		background: linear-gradient(135deg, #0e1a2b 0%, #07101c 100%);
	}

	.wind-lines {
		background-image:
			repeating-linear-gradient(108deg, transparent 0 22px, rgba(255, 255, 255, 0.045) 22px 23px),
			repeating-linear-gradient(108deg, transparent 0 90px, rgba(255, 255, 255, 0.08) 90px 91px);
		mask-image: linear-gradient(95deg, transparent 0%, black 20%, black 80%, transparent 100%);
	}
</style>
