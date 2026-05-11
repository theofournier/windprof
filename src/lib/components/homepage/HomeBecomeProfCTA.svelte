<script>
	import WindLines from '../global/WindLines.svelte';
</script>

<section class="cta-section relative overflow-hidden py-20">
	<WindLines withGrid={false} />

	<div class="relative z-10 mx-auto max-w-360 px-5 sm:px-10 lg:px-14">
		<div class="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
			<!-- Left: text + CTAs -->
			<div>
				<div class="mb-5 font-mono text-label font-semibold tracking-wider text-white/60 uppercase">
					↳ MONITEURS INDÉPENDANTS
				</div>
				<h2 class="mb-6 font-display leading-[0.92] font-black tracking-tight uppercase">
					<span class="block text-[56px] text-white sm:text-[72px] lg:text-[88px]">MONITEURS</span>
					<span class="block text-[56px] text-white sm:text-[72px] lg:text-[88px]"
						>INSCRIVEZ-VOUS.</span
					>
					<span
						class="mt-2 block font-serif text-[36px] leading-tight font-normal tracking-normal text-white/85 normal-case italic sm:text-[48px] lg:text-[56px]"
						>Gardez vos élèves.</span
					>
				</h2>
				<p class="mb-8 max-w-lg text-[16px] leading-relaxed text-white/70">
					Zéro commission. Contact direct. Vos diplômes vérifiés en 48h. Profil publié en moins de
					10 minutes.
				</p>
				<div class="flex flex-col gap-3 sm:flex-row">
					<a
						href="/signup?role=prof"
						class="inline-flex items-center justify-center rounded-md bg-ink px-7 py-4 font-display text-sm font-black tracking-tight text-white uppercase transition-opacity hover:opacity-80"
					>
						Créer mon profil →
					</a>
					<a
						href="/become-prof"
						class="inline-flex items-center justify-center rounded-md border border-white/30 px-7 py-4 font-display text-sm font-black tracking-tight text-white uppercase transition-colors hover:border-white/60 hover:bg-white/5"
					>
						En savoir plus
					</a>
				</div>
			</div>

			<!-- Right: early adopter counter card
			<div class="rounded-2xl border border-white/10 bg-ink/70 p-8 backdrop-blur-sm">
				<div class="mb-6 font-mono text-label font-semibold tracking-wider text-white/40 uppercase">
					EARLY ADOPTERS · COMPTEUR
				</div>

				<div class="mb-5 flex items-baseline gap-2">
					<span class="font-display text-[88px] leading-none font-black text-white">137</span>
					<span class="font-mono text-[28px] font-bold text-white/30">/ 200</span>
				</div>

				Progress bar
				<div class="mb-5 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
					<div class="h-full rounded-full bg-white/80" style="width: 68.5%"></div>
				</div>

				<div class="flex items-end justify-between">
					<div>
						<div class="font-mono text-label font-semibold tracking-wider text-white/40 uppercase">
							PLACES RESTANTES
						</div>
						<div class="font-display text-[42px] leading-none font-black text-white">63</div>
					</div>
					<div class="text-right">
						<div
							class="font-mono text-label font-semibold tracking-wider text-accent-soft uppercase"
						>
							GRATUITES À VIE
						</div>
					</div>
				</div>
			</div> -->
		</div>
	</div>
</section>

<style>
	.cta-section {
		background: linear-gradient(135deg, #e8724c 0%, #d4613c 50%, #c55530 100%);
	}
</style>
