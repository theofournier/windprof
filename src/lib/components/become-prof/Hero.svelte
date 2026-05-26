<script>
	import WindLines from '../global/WindLines.svelte';
</script>

<section class="hero-section relative overflow-hidden">
	<WindLines />

	<div class="relative z-10 mx-auto max-w-360 px-5 py-14 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
			<!-- Left column -->
			<div>
				<!-- Pill badge -->
				<div class="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
					<div
						class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2"
					>
						<span class="relative flex h-2 w-2">
							<span
								class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"
							></span>
							<span class="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
						</span>
						<span class="font-mono text-label font-semibold tracking-wider text-white/80 uppercase"
							>POUR LES MONITEURS · INDÉPENDANTS</span
						>
					</div>
				</div>

				<!-- H1 -->
				<h1 class="mb-8 font-display leading-[0.88] font-black tracking-tight uppercase">
					<span class="block text-[72px] text-white sm:text-[100px] lg:text-[120px]">GARDE</span>
					<span class="block text-[72px] text-accent sm:text-[100px] lg:text-[120px]"
						>TES ÉLÈVES.</span
					>
				</h1>
			</div>

			<!-- Right column -->
			<div class="flex flex-col gap-4">
				<!-- Paragraph -->
				<p class="mb-9 max-w-120 text-[17px] leading-relaxed text-white/70">
					L'annuaire des moniteurs indépendants de sports de vent.
					<strong class="text-white">Aucune commission</strong> sur tes cours, contact direct affiché,
					diplômes vérifiés en 48h.
				</p>

				<!-- CTA Buttons -->
				<div class="mb-10 flex flex-col gap-3 sm:flex-row">
					<a
						href="/signup?role=prof"
						class="inline-flex items-center justify-center rounded-md bg-accent px-7 py-4 font-display text-sm font-black tracking-tight text-white uppercase transition-opacity hover:opacity-90"
					>
						Créer mon profil — 8 min →
					</a>
					<a
						href="/profs/julien-m"
						class="inline-flex items-center justify-center rounded-md border border-white/30 px-7 py-4 font-display text-sm font-black tracking-tight text-white uppercase transition-colors hover:border-white/60"
					>
						Voir les moniteurs →
					</a>
				</div>

				<!-- Trust badges -->
				<div class="flex flex-wrap gap-5">
					{#each ['ANNULATION 1 CLIC'] as badge (badge)}
						<div class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-success"></span>
							<span
								class="font-mono text-label font-semibold tracking-wider text-white/60 uppercase"
								>{badge}</span
							>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-section {
		background:
			radial-gradient(ellipse 60% 80% at 85% 100%, rgba(232, 114, 76, 0.18), transparent 60%),
			radial-gradient(ellipse 80% 60% at 10% 0%, rgba(23, 50, 79, 0.6), transparent 60%),
			linear-gradient(180deg, #07101c 0%, #0e1a2b 50%, #14243b 100%);
	}
</style>
