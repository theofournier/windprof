<script lang="ts">
	const faqs = [
		{
			q: 'Quelle discipline pour débuter ?',
			a: 'Le windsurf reste le plus pédagogique : on sent immédiatement la voile, on lit le vent, on tombe sans risque. Le kitesurf est plus rapide à libérer mais demande un encadrement strict les 8 premières heures.'
		},
		{
			q: 'Faut-il savoir nager ?',
			a: 'Oui. Tous les moniteurs Windprof exigent une attestation de 25 m minimum. Le matériel flotte mais tu seras parfois loin du bord, fatigué, dans la houle.'
		},
		{
			q: "Combien d'heures de cours pour être autonome ?",
			a: "Compte 6 à 10 h en windsurf, 8 à 12 h en kitesurf, 15 à 25 h en wingfoil. Étalées sur 3 à 5 sessions, jamais en continu : la fatigue tue l'apprentissage."
		},
		{
			q: 'Quel budget matériel après les cours ?',
			a: 'Environ 1 200–1 800 € en occasion pour un set complet windsurf ou kitesurf, 2 500–4 000 € pour un wingfoil. Beaucoup de moniteurs prêtent ou louent du matos en occasion à leurs élèves.'
		}
	];
</script>

<section class="py-20">
	<div class="flex flex-col gap-16 lg:grid lg:grid-cols-[1fr_2fr] lg:gap-20">
		<div>
			<p class="mb-3.5 font-mono text-label tracking-widest text-accent uppercase">↳ FAQ</p>
			<h2 class="m-0 text-[40px] leading-[0.95] sm:text-[56px]">
				Choisir<br />sa première<br />discipline.
			</h2>
		</div>
		<div>
			{#each faqs as faq, i}
				<div class="border-t border-line py-6 {i === faqs.length - 1 ? 'border-b' : ''}">
					<div class="flex items-start justify-between gap-6">
						<h3 class="m-0 font-serif text-xl font-medium tracking-snug normal-case sm:text-[22px]">
							{faq.q}
						</h3>
						<span class="shrink-0 font-mono text-label text-muted">0{i + 1}</span>
					</div>
					<p class="mt-2.5 text-sm leading-relaxed text-ink/60 sm:text-[14.5px]">{faq.a}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
