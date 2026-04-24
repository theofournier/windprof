<section>
	<div class="mb-8 flex items-end justify-between">
		<div>
			<div class="mb-4 font-mono text-label tracking-widest text-accent uppercase">↳ Ojectif</div>
			<h2 class="m-0 max-w-170 text-[72px] leading-[0.95]">
				Un annuaire,<br />pas une agence.
			</h2>
		</div>
		<p class="max-w-90 text-[15px] leading-body text-muted">
			Tu contactes le moniteur en direct. Il fixe ses tarifs, ses créneaux, ses règles. Nous, on
			vérifie les diplômes et on t'envoie le vent.
		</p>
	</div>
	<div class="grid grid-cols-3 gap-px overflow-hidden rounded-[10px] border border-line bg-line">
		{#each [{ num: '01', title: 'Check le vent', body: 'Prévisions 7j sur 58 spots FR. Filtre par discipline, niveau et seuil de vent minimum. Tu ne te déplaces plus pour rien.' }, { num: '02', title: 'Vérifie les diplômes', body: 'Badge Vérifié après contrôle manuel : BPJEPS, DE Voile, IKO, VDWS. Avis post-cours par des riders identifiés.' }, { num: '03', title: 'Contacte en direct', body: 'Téléphone, email ou Instagram sur la fiche. Aucune commission, aucun intermédiaire. Tu parles au moniteur, pas à une plateforme.' }] as step (step.num)}
			<div class="relative bg-bg px-9 pt-10 pb-8">
				<div class="absolute top-5 right-7 font-display text-[70px] leading-none text-bg-dark">
					{step.num}
				</div>
				<div class="mb-8 font-mono text-label tracking-label text-accent uppercase">
					STEP {step.num}
				</div>
				<h3 class="mb-3.5 text-[30px] tracking-snug">
					{step.title}
				</h3>
				<p class="text-[14.5px] leading-[1.6] text-muted">
					{step.body}
				</p>
			</div>
		{/each}
	</div>
</section>
