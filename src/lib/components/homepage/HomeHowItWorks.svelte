<script lang="ts">
	const steps = [
		{
			n: '01',
			title: 'Cherche par spot, discipline ou vent',
			desc: 'Filtre par localisation, par vent accepté, par discipline. Les prévisions sur 84 spots remontent les moniteurs actifs quand ça souffle vraiment.'
		},
		{
			n: '02',
			title: 'Lis les fiches, vérifie les diplômes',
			desc: 'Chaque moniteur affiche ses diplômes vérifiés par notre équipe sous 48h — BPJEPS, DE, IKO, VDWS. Tu sais à qui tu as affaire avant d\'appeler.'
		},
		{
			n: '03',
			title: 'Contacte le moniteur en direct',
			desc: 'Téléphone et email affichés publiquement. Pas de messagerie interne, pas de plateforme au milieu. Tu appelles, il répond.'
		},
		{
			n: '04',
			title: 'Tu fais ta session. C\'est tout.',
			desc: 'Pas de frais de réservation, pas de commission cachée. Tu t\'arranges directement avec ton moniteur. Simple et honnête.'
		}
	];
</script>

<section class="mx-auto max-w-360 px-5 sm:px-10 lg:px-14 py-10">
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

		<!-- Left: sticky header -->
		<div class="lg:sticky lg:top-20 lg:self-start">
			<div class="mb-3 font-mono text-label font-semibold tracking-wider text-accent uppercase">↳ MÉTHODE</div>
			<h2 class="mb-6 text-[40px] leading-[0.95] tracking-tight sm:text-[54px] lg:text-[64px]">
				Direct.
				<span class="block font-serif font-normal italic normal-case tracking-normal">sans intermédiaire.</span>
			</h2>
			<p class="text-[16px] leading-relaxed text-muted max-w-sm">
				Pas de réservation en ligne, pas de commission. Tu trouves, tu lis, tu appelles. Le moniteur te répond. C'est tout.
			</p>
		</div>

		<!-- Right: numbered steps -->
		<div class="flex flex-col">
			{#each steps as step, i (step.n)}
				<div class="flex gap-6 border-t border-line py-8 {i === steps.length - 1 ? 'border-b' : ''}">
					<div class="font-display text-[56px] font-black leading-none tracking-tight text-accent/30 sm:text-[72px]">{step.n}</div>
					<div class="flex-1 pt-2">
						<h3 class="mb-3 text-[20px] font-display font-black tracking-tight leading-tight text-ink sm:text-[24px]">{step.title}</h3>
						<p class="text-[14.5px] leading-relaxed text-muted">{step.desc}</p>
					</div>
				</div>
			{/each}
		</div>

	</div>
</section>
