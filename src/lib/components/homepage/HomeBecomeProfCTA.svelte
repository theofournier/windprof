<section class="cta-section relative overflow-hidden py-20">
	<div class="wind-lines absolute inset-0 pointer-events-none"></div>

	<div class="relative z-10 mx-auto max-w-360 px-5 sm:px-10 lg:px-14">
		<div class="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">

			<!-- Left: text + CTAs -->
			<div>
				<div class="mb-5 font-mono text-label font-semibold tracking-wider text-white/60 uppercase">↳ 07 · MONITEURS INDÉPENDANTS</div>
				<h2 class="mb-6 font-display font-black uppercase tracking-tight leading-[0.92]">
					<span class="block text-[56px] text-white sm:text-[72px] lg:text-[88px]">INSCRIVEZ-VOUS.</span>
					<span class="mt-2 block font-serif text-[36px] font-normal text-white/85 italic normal-case tracking-normal leading-tight sm:text-[48px] lg:text-[56px]">Gardez vos élèves.</span>
				</h2>
				<p class="mb-8 max-w-lg text-[16px] leading-relaxed text-white/70">
					Zéro commission. Contact direct. Vos diplômes vérifiés en 48h. Profil publié en moins de 10 minutes. Rejoignez les 137 early adopters — gratuit à vie pour les 200 premiers.
				</p>
				<div class="flex flex-col gap-3 sm:flex-row">
					<a
						href="/prof-register"
						class="inline-flex items-center justify-center rounded-md bg-ink px-7 py-4 font-display text-sm font-black text-white uppercase tracking-tight transition-opacity hover:opacity-80"
					>
						Créer mon profil →
					</a>
					<a
						href="/profs/julien-m"
						class="inline-flex items-center justify-center rounded-md border border-white/30 px-7 py-4 font-display text-sm font-black text-white uppercase tracking-tight transition-colors hover:border-white/60 hover:bg-white/5"
					>
						Voir un exemple
					</a>
				</div>
			</div>

			<!-- Right: early adopter counter card -->
			<div class="rounded-2xl border border-white/10 bg-ink/70 p-8 backdrop-blur-sm">
				<div class="mb-6 font-mono text-label font-semibold tracking-wider text-white/40 uppercase">EARLY ADOPTERS · COMPTEUR</div>

				<div class="mb-5 flex items-baseline gap-2">
					<span class="font-display text-[88px] font-black leading-none text-white">137</span>
					<span class="font-mono text-[28px] font-bold text-white/30">/ 200</span>
				</div>

				<!-- Progress bar -->
				<div class="mb-5 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
					<div class="h-full rounded-full bg-white/80" style="width: 68.5%"></div>
				</div>

				<div class="flex items-end justify-between">
					<div>
						<div class="font-mono text-label font-semibold tracking-wider text-white/40 uppercase">PLACES RESTANTES</div>
						<div class="font-display text-[42px] font-black leading-none text-white">63</div>
					</div>
					<div class="text-right">
						<div class="font-mono text-label font-semibold tracking-wider text-accent-soft uppercase">GRATUITES À VIE</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</section>

<style>
	.cta-section {
		background: linear-gradient(135deg, #e8724c 0%, #d4613c 50%, #c55530 100%);
	}

	.wind-lines {
		background-image:
			repeating-linear-gradient(108deg, transparent 0 22px, rgba(255, 255, 255, 0.045) 22px 23px),
			repeating-linear-gradient(108deg, transparent 0 90px, rgba(255, 255, 255, 0.08) 90px 91px);
		mask-image: linear-gradient(95deg, transparent 0%, black 20%, black 80%, transparent 100%);
	}
</style>
