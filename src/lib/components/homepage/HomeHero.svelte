<script>
	import WindLines from '../global/WindLines.svelte';
</script>

<section class="hero-section relative">
	<WindLines />

	<div class="relative z-10 mx-auto max-w-360 px-5 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-18">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
			<!-- Left column -->
			<div>
				<!-- Pill badges -->
				<div class="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
					<span class="font-mono text-label font-semibold tracking-wider text-accent-soft uppercase"
						>592 MONITEURS · 0 INTERMÉDIAIRES</span
					>
				</div>

				<!-- H1 -->
				<h1 class="mb-8 font-display leading-[0.92] font-black tracking-tight uppercase">
					<span class="block text-[80px] text-white sm:text-[100px] lg:text-[128px]">TROUVE</span>
					<span class="block text-[80px] text-accent sm:text-[100px] lg:text-[128px]"
						>TON VENT.</span
					>
					<span
						class="mt-3 block font-serif text-[44px] leading-tight font-normal tracking-normal text-white/80 normal-case italic sm:text-[56px] lg:text-[72px]"
						>puis ton moniteur.</span
					>
				</h1>

				<!-- Paragraph -->
				<p class="mb-9 max-w-120 text-[17px] leading-relaxed text-white/70">
					L'annuaire des moniteurs indépendants de sports de vent en France.
					<strong class="text-white">Diplômes vérifiés, prévisions intégrées, contact direct</strong
					> — sans intermédiaire ni commission.
				</p>

				<!-- CTA Buttons -->
				<div class="flex flex-col gap-3 sm:flex-row">
					<a
						href="/profs"
						class="inline-flex items-center justify-center rounded-md bg-accent px-7 py-4 font-display text-sm font-black tracking-tight text-white uppercase transition-opacity hover:opacity-90"
					>
						Chercher un moniteur →
					</a>
					<a
						href="/become-prof"
						class="inline-flex items-center justify-center rounded-md border border-white/30 px-7 py-4 font-display text-sm font-black tracking-tight text-white uppercase transition-colors hover:border-white/60"
					>
						Devenir moniteur
					</a>
				</div>
			</div>

			<!-- Right column -->
			<div class="flex flex-col gap-4">
				<!-- Wind data mini-cards grid
				<div class="grid grid-cols-2 gap-3">
					{#each [{ spot: 'LEUCATE', kt: 24, dir: 'N/NE', status: 'IDÉAL' }, { spot: 'TARIFA', kt: 27, dir: 'W', status: 'IDÉAL' }, { spot: 'LA TORCHE', kt: 18, dir: 'W/SW', status: 'OK' }, { spot: 'WISSANT', kt: 22, dir: 'SW', status: 'IDÉAL' }] as card (card.spot)}
						<a
							href="/spots/{card.spot}"
							class="rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/40"
						>
							<div
								class="mb-1 font-mono text-label font-semibold tracking-wider text-white/40 uppercase"
							>
								{card.spot}
							</div>
							<div class="font-display text-[48px] leading-none font-black text-white">
								{card.kt}
								<span
									class="font-mono text-label font-semibold tracking-wider text-white/50 uppercase"
								>
									kt ·
									<span class="font-mono text-xl font-semibold tracking-wider text-white uppercase"
										>{card.dir}
									</span>
								</span>
							</div>
							<div
								class="mt-2 font-mono text-label font-semibold tracking-wider uppercase {card.status ===
								'IDÉAL'
									? 'text-accent'
									: 'text-accent-soft'}"
							>
								{card.status}
							</div>
						</a>
					{/each}
				</div>

				Source + link
				<div class="flex items-center justify-between">
					<span class="font-mono text-label font-semibold tracking-wider text-white/30 uppercase"
						>SOURCE · METEO-CONSULT · WINDY</span
					>
					<a
						href="/spots"
						class="font-mono text-label font-semibold tracking-wider text-accent-soft uppercase transition-colors hover:text-accent"
						>VOIR LES 84 SPOTS →</a
					>
				</div> -->
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		background: linear-gradient(180deg, #07101c 0%, #0e1a2b 50%, #14243b 100%);
	}
</style>
