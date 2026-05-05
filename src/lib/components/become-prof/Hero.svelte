<section class="hero-section relative overflow-hidden">
	<div class="grid-overlay absolute inset-0"></div>
	<div class="wind-lines absolute inset-0"></div>

	<div class="relative z-10 mx-auto max-w-360 px-5 py-14 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:items-start">

			<!-- Left column -->
			<div>
				<!-- Pill badge -->
				<div class="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
					<div class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2">
						<span class="relative flex h-2 w-2">
							<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
							<span class="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
						</span>
						<span class="font-mono text-label font-semibold tracking-wider text-white/80 uppercase">POUR LES MONITEURS · INDÉPENDANTS</span>
					</div>
					<span class="font-mono text-label font-semibold tracking-wider text-accent-soft uppercase">137 / 200 EARLY ADOPTERS · GRATUIT À VIE</span>
				</div>

				<!-- H1 -->
				<h1 class="mb-8 font-display font-black uppercase tracking-tight leading-[0.88]">
					<span class="block text-[72px] text-white sm:text-[100px] lg:text-[120px]">GARDE</span>
					<span class="block text-[72px] text-accent sm:text-[100px] lg:text-[120px]">TES ÉLÈVES.</span>
					<span class="mt-2 block font-serif text-[44px] font-normal text-white/80 italic normal-case tracking-normal leading-tight sm:text-[60px] lg:text-[72px]">garde ta marge.</span>
				</h1>

				<!-- Paragraph -->
				<p class="mb-9 max-w-120 text-[17px] leading-relaxed text-white/70">
					L'annuaire des moniteurs indépendants de sports de vent.
					<strong class="text-white">Aucune commission</strong> sur tes cours, contact direct affiché, diplômes vérifiés en 48h.
				</p>

				<!-- CTA Buttons -->
				<div class="mb-10 flex flex-col gap-3 sm:flex-row">
					<a
						href="/prof-register"
						class="inline-flex items-center justify-center rounded-md bg-accent px-7 py-4 font-display text-sm font-black text-white uppercase tracking-tight transition-opacity hover:opacity-90"
					>
						Créer mon profil — 8 min →
					</a>
					<a
						href="/profs/julien-m"
						class="inline-flex items-center justify-center rounded-md border border-white/30 px-7 py-4 font-display text-sm font-black text-white uppercase tracking-tight transition-colors hover:border-white/60"
					>
						Voir un exemple de fiche
					</a>
				</div>

				<!-- Trust badges -->
				<div class="flex flex-wrap gap-5">
					{#each ['SANS CARTE BANCAIRE', 'BROUILLON SAUVÉ', 'ANNULATION 1 CLIC'] as badge (badge)}
						<div class="flex items-center gap-2">
							<span class="h-2 w-2 rounded-full bg-success"></span>
							<span class="font-mono text-label font-semibold tracking-wider text-white/60 uppercase">{badge}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Right column -->
			<div class="flex flex-col gap-4">
				<div class="font-mono text-label font-semibold tracking-wider text-white/40 uppercase">↳ COMPTEUR · MAJ 11:42 CET</div>

				<!-- Early adopter counter card -->
				<div class="rounded-xl border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
					<div class="mb-4 font-mono text-label font-semibold tracking-wider text-accent-soft uppercase">★ EARLY ADOPTER · GRATUIT À VIE</div>

					<div class="mb-4 flex items-baseline gap-2">
						<span class="font-display text-[80px] font-black leading-none text-white">137</span>
						<span class="font-display text-[32px] font-black text-white/40">/ 200</span>
					</div>

					<!-- Progress bar -->
					<div class="mb-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
						<div class="h-full rounded-full bg-accent" style="width: 68.5%"></div>
					</div>

					<div class="flex items-center justify-between">
						<span class="font-mono text-label font-semibold tracking-wider text-white/50 uppercase">PLACES RESTANTES</span>
						<span class="font-display text-2xl font-black text-white">63</span>
					</div>
				</div>

				<!-- Discipline breakdown card -->
				<div class="rounded-xl border border-white/10 bg-white/4 p-5">
					<div class="mb-4 font-mono text-label font-semibold tracking-wider text-white/40 uppercase">RÉPARTITION · 137 INSCRITS</div>
					<div class="flex flex-col gap-3">
						{#each [{ label: 'KITESURF', count: 78, pct: 56.9 }, { label: 'WINGFOIL', count: 41, pct: 29.9 }, { label: 'WINDSURF', count: 18, pct: 13.1 }] as disc (disc.label)}
							<div>
								<div class="mb-1.5 flex items-center justify-between">
									<span class="font-mono text-label font-semibold tracking-wider text-white/60 uppercase">{disc.label}</span>
									<span class="font-mono text-label font-bold text-white/80">{disc.count}</span>
								</div>
								<div class="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
									<div class="h-full rounded-full bg-accent/60" style="width: {disc.pct}%"></div>
								</div>
							</div>
						{/each}
					</div>
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
