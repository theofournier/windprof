<section class="hero-section relative">
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<div class="grid-overlay absolute inset-0"></div>
		<div class="wind-lines absolute inset-0"></div>
	</div>

	<div class="relative z-10 mx-auto max-w-360 px-5 py-14 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">

			<!-- Left column -->
			<div>
				<!-- Pill badges -->
				<div class="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
					<div class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2">
						<span class="relative flex h-2 w-2">
							<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
							<span class="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
						</span>
						<span class="font-mono text-label font-semibold tracking-wider text-white/80 uppercase">ÉDITION 2026 · MVP 1</span>
					</div>
					<span class="font-mono text-label font-semibold tracking-wider text-accent-soft uppercase">592 MONITEURS · 84 SPOTS · 0 INTERMÉDIAIRES</span>
				</div>

				<!-- H1 -->
				<h1 class="mb-8 font-display font-black uppercase tracking-tight leading-[0.92]">
					<span class="block text-[80px] text-white sm:text-[100px] lg:text-[128px]">TROUVE</span>
					<span class="block text-[80px] text-accent sm:text-[100px] lg:text-[128px]">TON VENT.</span>
					<span class="mt-3 block font-serif text-[44px] font-normal text-white/80 italic normal-case tracking-normal leading-tight sm:text-[56px] lg:text-[72px]">puis ton moniteur.</span>
				</h1>

				<!-- Paragraph -->
				<p class="mb-9 max-w-120 text-[17px] leading-relaxed text-white/70">
					L'annuaire des moniteurs indépendants de sports de vent en France.
					<strong class="text-white">Diplômes vérifiés, prévisions intégrées, contact direct</strong> — sans intermédiaire ni commission.
				</p>

				<!-- CTA Buttons -->
				<div class="flex flex-col gap-3 sm:flex-row">
					<a
						href="/profs"
						class="inline-flex items-center justify-center rounded-md bg-accent px-7 py-4 font-display text-sm font-black text-white uppercase tracking-tight transition-opacity hover:opacity-90"
					>
						Chercher un moniteur →
					</a>
					<a
						href="/become-prof"
						class="inline-flex items-center justify-center rounded-md border border-white/30 px-7 py-4 font-display text-sm font-black text-white uppercase tracking-tight transition-colors hover:border-white/60"
					>
						Devenir moniteur
					</a>
				</div>
			</div>

			<!-- Right column -->
			<div class="flex flex-col gap-4">
				<!-- Wind data mini-cards grid -->
				<div class="grid grid-cols-2 gap-3">
					{#each [
						{ spot: 'LEUCATE', kt: 24, dir: 'N/NE', status: 'IDÉAL' },
						{ spot: 'TARIFA', kt: 27, dir: 'W', status: 'IDÉAL' },
						{ spot: 'LA TORCHE', kt: 18, dir: 'W/SW', status: 'OK' },
						{ spot: 'WISSANT', kt: 22, dir: 'SW', status: 'IDÉAL' }
					] as card (card.spot)}
						<div class="rounded-lg p-4" style="background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1);">
							<div class="mb-1 font-mono text-label font-semibold tracking-wider text-white/40 uppercase">{card.spot}</div>
							<div class="font-display text-[48px] font-black leading-none text-white">{card.kt}</div>
							<div class="mt-1 font-mono text-label font-semibold tracking-wider text-white/50 uppercase">kt · {card.dir}</div>
							<div class="mt-2 font-mono text-label font-semibold tracking-wider uppercase {card.status === 'IDÉAL' ? 'text-accent' : 'text-accent-soft'}">{card.status}</div>
						</div>
					{/each}
				</div>

				<!-- Source + link -->
				<div class="flex items-center justify-between">
					<span class="font-mono text-label font-semibold tracking-wider text-white/30 uppercase">SOURCE · METEO-CONSULT · WINDY</span>
					<a href="/spots" class="font-mono text-label font-semibold tracking-wider text-accent-soft uppercase hover:text-accent transition-colors">VOIR LES 84 SPOTS →</a>
				</div>
			</div>

		</div>
	</div>

</section>

<!-- Floating search bar — pulled up into the hero with negative margin -->
<div class="relative z-20 -mt-10 mx-auto max-w-360 px-5 sm:px-10 lg:px-14">
	<div class="rounded-xl bg-white p-2 shadow-2xl flex flex-col gap-2 sm:flex-row sm:items-center" style="box-shadow: 0 30px 80px -20px rgba(0,0,0,.5);">
		{#each [
			{ label: 'OÙ', placeholder: 'Leucate' },
			{ label: 'DISCIPLINE', placeholder: 'Kitesurf' },
			{ label: 'NIVEAU', placeholder: 'Intermédiaire' },
			{ label: 'QUAND', placeholder: 'Ce week-end' }
		] as field (field.label)}
			<div class="flex flex-1 flex-col px-4 py-3 border-b border-line last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
				<span class="font-mono text-label font-semibold tracking-wider text-muted uppercase">{field.label}</span>
				<span class="font-sans text-[15px] font-medium text-ink">{field.placeholder}</span>
			</div>
		{/each}
		<div class="px-2 pb-2 sm:pb-0 sm:pr-2">
			<a
				href="/profs"
				class="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 font-display text-sm font-black text-white uppercase tracking-tight whitespace-nowrap transition-opacity hover:opacity-90"
			>
				Chercher →
			</a>
		</div>
	</div>
</div>

<style>
	.hero-section {
		background: linear-gradient(180deg, #07101c 0%, #0e1a2b 50%, #14243b 100%);
	}

	.wind-lines {
		background-image:
			repeating-linear-gradient(108deg, transparent 0 22px, rgba(255, 255, 255, 0.045) 22px 23px),
			repeating-linear-gradient(108deg, transparent 0 90px, rgba(255, 255, 255, 0.08) 90px 91px);
		mask-image: linear-gradient(95deg, transparent 0%, black 20%, black 80%, transparent 100%);
	}

	.grid-overlay {
		background-image:
			linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
			linear-gradient(180deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
		background-size: 80px 80px;
		mask-image: radial-gradient(ellipse at 30% 40%, black, transparent 75%);
	}
</style>
