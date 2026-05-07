<script lang="ts">
	const spots = [
		{ n: '01', name: 'Leucate', region: 'Aude · Occitanie', dir: 'N', kt: 18, moniteurs: 32, freq: 'fort' },
		{ n: '02', name: 'La Torche', region: 'Finistère · Bretagne', dir: 'W', kt: 14, moniteurs: 21, freq: 'moyen' },
		{ n: '03', name: 'Almanarre', region: 'Var · PACA', dir: 'E', kt: 12, moniteurs: 28, freq: 'moyen' },
		{ n: '04', name: 'Wissant', region: 'Pas-de-Calais', dir: 'SW', kt: 22, moniteurs: 14, freq: 'fort' },
		{ n: '05', name: 'Tarifa', region: 'Andalousie · ES', dir: 'W', kt: 27, moniteurs: 9, freq: 'extrême' },
		{ n: '06', name: 'Beauduc', region: 'Camargue', dir: 'N', kt: 19, moniteurs: 12, freq: 'fort' }
	];

	function freqColor(freq: string) {
		if (freq === 'extrême') return 'text-accent';
		if (freq === 'fort') return 'text-accent-soft';
		return 'text-success';
	}
</script>

<section class="mx-auto max-w-360 px-5 sm:px-10 lg:px-14 py-16">
	<!-- Section header -->
	<div class="mb-10 flex items-end justify-between">
		<div>
			<div class="mb-3 font-mono text-label font-semibold tracking-wider text-accent uppercase">↳ 04 · SPOTS</div>
			<h2 class="text-[40px] leading-[0.95] tracking-tight sm:text-[54px] lg:text-[68px]">
				Là où ça
				<span class="text-accent font-serif font-normal italic normal-case tracking-normal"> souffle.</span>
			</h2>
		</div>
		<a href="/spots" class="hidden font-mono text-label font-semibold tracking-wider text-muted uppercase hover:text-ink transition-colors sm:block">
			Tous les spots →
		</a>
	</div>

	<!-- Spot cards grid -->
	<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
		{#each spots as spot (spot.n)}
			<div class="overflow-hidden rounded-xl border border-line bg-white">
				<!-- Photo placeholder -->
				<div
					class="relative h-48"
					style="background-image: repeating-linear-gradient(135deg, rgba(0,0,0,.06) 0 1px, transparent 1px 10px); background-color: #d9d4cb;"
				>
					<!-- N° badge -->
					<div class="absolute top-3 left-3 rounded bg-ink/70 px-2.5 py-1 font-mono text-label font-semibold tracking-wider text-white uppercase">N°{spot.n}</div>
					<!-- Wind badge -->
					<div class="absolute top-3 right-3 rounded bg-accent px-2.5 py-1 font-mono text-label font-semibold tracking-wider text-white uppercase">{spot.dir} · {spot.kt} kt</div>
					<!-- Spot name overlay -->
					<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/60 to-transparent px-4 pb-3 pt-8">
						<span class="font-mono text-label font-semibold tracking-wider text-white/80 uppercase">{spot.name}</span>
					</div>
				</div>

				<!-- Card body -->
				<div class="p-5">
					<h3 class="font-display text-[22px] font-black tracking-tight leading-none text-ink">{spot.name}</h3>
					<p class="mt-1 font-mono text-caption font-semibold tracking-wider text-muted uppercase">{spot.region}</p>

					<div class="my-4 border-t border-line"></div>

					<div class="flex items-center justify-between">
						<div>
							<div class="font-mono text-label font-semibold tracking-wider text-muted uppercase">MONITEURS</div>
							<div class="font-display text-[28px] font-black leading-none text-ink">{spot.moniteurs}</div>
						</div>
						<div class="text-right">
							<div class="font-mono text-label font-semibold tracking-wider text-muted uppercase">FRÉQUENCE</div>
							<div class="font-mono text-[13px] font-bold tracking-wider uppercase {freqColor(spot.freq)}">{spot.freq}</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Mobile link -->
	<div class="mt-6 sm:hidden">
		<a href="/spots" class="font-mono text-label font-semibold tracking-wider text-muted uppercase hover:text-ink transition-colors">
			Tous les spots →
		</a>
	</div>
</section>
