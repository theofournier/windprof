<section class="final-cta-section py-16 sm:py-20 lg:py-24">
	<div class="mx-auto max-w-360 px-5 sm:px-10 lg:px-14">
		<div class="final-cta-card relative overflow-hidden rounded-2xl p-10 sm:p-14 lg:p-16">
			<div class="cta-pattern absolute inset-0 pointer-events-none"></div>

			<div class="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:items-start">

				<!-- Left -->
				<div>
					<div class="mb-6 font-mono text-label font-semibold tracking-wider text-white/60 uppercase">
						↳ DERNIER APPEL · 63 PLACES GRATUITES À VIE
					</div>

					<h2 class="mb-6 font-display uppercase tracking-tight leading-[0.88]">
						<span class="block text-[56px] text-white sm:text-[80px] lg:text-[96px]">Le vent rentre.</span>
						<span class="mt-2 block font-serif text-[36px] font-normal italic normal-case tracking-normal leading-tight text-white/80 sm:text-[48px] lg:text-[56px]">prends ta place.</span>
					</h2>

					<p class="mb-8 max-w-110 text-[17px] leading-relaxed text-white/70">
						63 places gratuites à vie restantes. Pas de carte bancaire, pas de conditions — juste ta fiche en ligne en 8 minutes.
					</p>

					<div class="flex flex-col gap-3 sm:flex-row">
						<a
							href="/prof-register"
							class="inline-flex items-center justify-center rounded-md bg-ink px-7 py-4 font-display text-sm font-black text-white uppercase tracking-tight transition-opacity hover:opacity-90"
						>
							Créer mon profil moniteur →
						</a>
						<a
							href="mailto:moniteurs@windmatch.fr"
							class="inline-flex items-center justify-center rounded-md border border-white/30 px-7 py-4 font-display text-sm font-black text-white uppercase tracking-tight transition-colors hover:border-white/60"
						>
							Parler à l'équipe
						</a>
					</div>
				</div>

				<!-- Right: mini card -->
				<div class="rounded-xl bg-black/25 p-7 border border-white/10">
					<div class="mb-4 font-mono text-label font-semibold tracking-wider text-white/50 uppercase">
						SIGNAL · INSCRIPTION
					</div>

					<div class="mb-5 font-display text-[72px] font-black leading-none tracking-tight text-white">
						~8 MIN
					</div>

					<div class="flex flex-col gap-3 border-t border-white/10 pt-5">
						{#each [{ label: 'Création compte', time: '30s' }, { label: 'Onboarding 7 étapes', time: '~7 min' }, { label: 'Validation diplômes', time: '48h' }] as row}
							<div class="flex items-center justify-between">
								<span class="text-[14px] text-white/60">{row.label}</span>
								<span class="font-mono text-caption font-semibold tracking-wider text-white/80 uppercase">{row.time}</span>
							</div>
						{/each}
					</div>
				</div>

			</div>
		</div>
	</div>
</section>

<style>
	.final-cta-section {
		background-color: var(--color-bg);
	}

	.final-cta-card {
		background-color: #e8724c;
	}

	.cta-pattern {
		background-image:
			repeating-linear-gradient(108deg, transparent 0 22px, rgba(255, 255, 255, 0.08) 22px 23px),
			repeating-linear-gradient(108deg, transparent 0 90px, rgba(255, 255, 255, 0.12) 90px 91px);
	}
</style>
