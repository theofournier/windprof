<section class="final-cta-section py-16 sm:py-20 lg:py-24">
	<div class="mx-auto max-w-360 px-5 sm:px-10 lg:px-14">
		<div class="final-cta-card relative overflow-hidden rounded-2xl p-10 sm:p-14 lg:p-16">
			<div class="cta-pattern pointer-events-none absolute inset-0"></div>

			<div
				class="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start lg:gap-16"
			>
				<!-- Left -->
				<div>
					<div
						class="mb-6 font-mono text-label font-semibold tracking-wider text-white/60 uppercase"
					>
						↳ DERNIER APPEL
					</div>

					<h2 class="mb-6 font-display leading-[0.88] tracking-tight uppercase">
						<span class="block text-[56px] text-white sm:text-[80px] lg:text-[96px]"
							>Le vent rentre.</span
						>
						<span
							class="mt-2 block font-serif text-[36px] leading-tight font-normal tracking-normal text-white/80 normal-case italic sm:text-[48px] lg:text-[56px]"
							>prends ta place.</span
						>
					</h2>

					<p class="mb-8 max-w-110 text-[17px] leading-relaxed text-white/70">
						Pas de carte bancaire, pas de conditions — juste ta fiche en ligne en 8 minutes.
					</p>

					<div class="flex flex-col gap-3 sm:flex-row">
						<a
							href="/signup?role=prof"
							class="inline-flex items-center justify-center rounded-md bg-ink px-7 py-4 font-display text-sm font-black tracking-tight text-white uppercase transition-opacity hover:opacity-90"
						>
							Créer mon profil moniteur →
						</a>
						<a
							href="mailto:contact@windprof.fr"
							class="inline-flex items-center justify-center rounded-md border border-white/30 px-7 py-4 font-display text-sm font-black tracking-tight text-white uppercase transition-colors hover:border-white/60"
						>
							Parler à l'équipe
						</a>
					</div>
				</div>

				<!-- Right: mini card -->
				<div class="rounded-xl border border-white/10 bg-black/25 p-7">
					<div
						class="mb-4 font-mono text-label font-semibold tracking-wider text-white/50 uppercase"
					>
						INSCRIPTION
					</div>

					<div
						class="mb-5 font-display text-[72px] leading-none font-black tracking-tight text-white"
					>
						~8 MIN
					</div>

					<div class="flex flex-col gap-3 border-t border-white/10 pt-5">
						{#each [{ label: 'Création compte', time: '30s' }, { label: 'Onboarding 7 étapes', time: '~7 min' }, { label: 'Validation diplômes', time: '48h' }] as row}
							<div class="flex items-center justify-between">
								<span class="text-[14px] text-white/60">{row.label}</span>
								<span
									class="font-mono text-caption font-semibold tracking-wider text-white/80 uppercase"
									>{row.time}</span
								>
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
