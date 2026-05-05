<script lang="ts">
	const faqs = [
		{
			q: 'Combien ça coûte vraiment ?',
			a: 'Gratuit pour les 200 premiers moniteurs inscrits — à vie. Pas de période d\'essai, pas de carte bancaire, pas de conditions cachées. Après les 200 places, un plan Premium payant sera disponible à 12€/mois. Les early adopters ne seront jamais facturés.'
		},
		{
			q: 'Pourquoi vous demandez les diplômes ?',
			a: 'Parce que c\'est le minimum vital pour un sport à risque. Les riders qui utilisent Windmatch veulent la garantie que le moniteur est qualifié. On vérifie manuellement chaque diplôme sous 48h — BPJEPS, DE Voile, IKO, VDWS, FFVL.'
		},
		{
			q: 'Et si je n\'ai pas de site / Instagram ?',
			a: 'Aucun problème. Champs optionnels. Ta fiche Windmatch peut être ta vitrine principale. L\'essentiel c\'est un téléphone et/ou un email pour que les riders puissent te contacter directement.'
		},
		{
			q: 'Vous gérez les paiements ou les annulations ?',
			a: 'Non, jamais. Tu fais comme tu fais aujourd\'hui — virement, espèces, lydia, etc. Les conditions d\'annulation sont les tiennes. On est un annuaire, pas une plateforme de réservation.'
		},
		{
			q: 'Je peux quitter quand ?',
			a: 'À tout moment, en un clic depuis ton dashboard. Ta fiche est supprimée immédiatement et définitivement. Aucune rétention de données, aucune pénalité.'
		},
		{
			q: 'Vous êtes basés où ?',
			a: 'Montpellier. Équipe de 4 passionnés de glisse — deux kiteboarders et deux windfoilers. Si t\'as une question, tu nous écris à moniteurs@windmatch.fr et c\'est nous qui répondons.'
		}
	];

	let openIndex = $state(0);

	function toggle(i: number) {
		openIndex = openIndex === i ? -1 : i;
	}
</script>

<section>
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">

		<!-- Left sticky column -->
		<div class="lg:sticky lg:top-24 lg:self-start">
			<div class="mb-3 font-mono text-label font-semibold tracking-wider text-accent uppercase">
				↳ 07 · QUESTIONS FRÉQUENTES
			</div>
			<h2 class="mb-5 text-[40px] leading-[0.95] tracking-tight sm:text-[54px] lg:text-[56px]">
				Réponses
				<span class="font-serif font-normal italic normal-case tracking-normal">directes.</span>
			</h2>
			<p class="text-[15px] leading-relaxed text-muted">
				Une autre question ? Écris-nous à
				<a href="mailto:moniteurs@windmatch.fr" class="font-semibold text-ink underline underline-offset-2">
					moniteurs@windmatch.fr
				</a>
			</p>
		</div>

		<!-- Right: accordion -->
		<div class="rounded-xl border border-line bg-white divide-y divide-line overflow-hidden">
			{#each faqs as faq, i (faq.q)}
				<div>
					<button
						onclick={() => toggle(i)}
						class="flex w-full items-center justify-between gap-4 px-7 py-5 text-left transition-colors hover:bg-bg/50"
						aria-expanded={openIndex === i}
					>
						<span class="text-[16px] font-semibold text-ink">{faq.q}</span>
						<span class="shrink-0 font-mono text-xl font-light text-muted transition-transform {openIndex === i ? 'rotate-45' : ''}">
							+
						</span>
					</button>
					{#if openIndex === i}
						<div class="px-7 pb-6 text-[14.5px] leading-relaxed text-muted">
							{faq.a}
						</div>
					{/if}
				</div>
			{/each}
		</div>

	</div>
</section>
