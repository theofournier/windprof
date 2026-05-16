<script lang="ts">
	const freeFeatures = [
		'Fiche publique illimitée',
		'Vérification diplômes 48h',
		'Contact direct (téléphone + email)',
		'3 disciplines + 5 spots',
		'Statistiques basiques'
	];

	const premiumFeatures = [
		'Tout le plan gratuit',
		'Badge ★ Premium en tête de liste',
		'Statistiques de fiche (vues, clics téléphone)',
		'Disciplines & spots illimités',
		'Export CSV de tes contacts riders',
		'Support prioritaire (~6h ouvrées)'
	];
</script>

<section>
	<!-- Section header -->
	<div class="mb-10">
		<div class="mb-3 font-mono text-label font-semibold tracking-wider text-accent uppercase">
			↳ 06 · TARIFS
		</div>
		<h2 class="text-[40px] leading-[0.95] tracking-tight sm:text-[54px] lg:text-[68px]">
			Deux formules.
			<span class="font-serif font-normal tracking-normal normal-case italic"
				>Aucune commission.</span
			>
		</h2>
	</div>

	<!-- 2-column layout -->
	<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
		<!-- Free card -->
		<div class="flex flex-col rounded-xl border border-line bg-white p-8">
			<div class="mb-6">
				<span
					class="inline-block rounded-sm bg-bg-dark px-2.5 py-1 font-mono text-label font-semibold tracking-wider text-muted uppercase"
				>
					GRATUIT · TOUJOURS
				</span>
			</div>

			<div class="mb-2 font-display text-[64px] leading-none font-black tracking-tight text-ink">
				0€<span class="text-[32px] text-muted">/mois</span>
			</div>

			<p class="mb-7 text-[15px] leading-relaxed text-muted">
				Toutes les fonctionnalités essentielles pour être visible et contacter des riders. Gratuit à
				vie, sans carte bancaire.
			</p>

			<!-- Feature list -->
			<ul class="mb-8 flex flex-col gap-3">
				{#each freeFeatures as feature}
					<li class="flex items-start gap-3">
						<span
							class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-micro font-bold text-white"
							>✓</span
						>
						<span class="text-[14.5px] text-ink">{feature}</span>
					</li>
				{/each}
			</ul>

			<div class="mt-auto">
				<a
					href="/signup?role=prof"
					class="flex items-center justify-center rounded-md border border-ink px-6 py-4 font-display text-sm font-black tracking-tight text-ink uppercase transition-colors hover:bg-ink hover:text-white"
				>
					Créer mon profil gratuit →
				</a>
			</div>
		</div>

		<!-- Premium card -->
		<div class="pricing-dark relative flex flex-col overflow-hidden rounded-xl p-8">
			<div class="wind-lines pointer-events-none absolute inset-0"></div>

			<div class="relative z-10 flex h-full flex-col">
				<div class="mb-6 flex flex-wrap gap-2">
					<span
						class="inline-block rounded-sm bg-accent px-2.5 py-1 font-mono text-label font-semibold tracking-wider text-white uppercase"
					>
						PREMIUM
					</span>
					<span
						class="inline-block rounded-sm bg-white/10 px-2.5 py-1 font-mono text-label font-semibold tracking-wider text-accent-soft uppercase"
					>
						★ GRATUIT À VIE · 200 PREMIERS
					</span>
				</div>

				<div
					class="mb-2 font-display text-[64px] leading-none font-black tracking-tight text-white"
				>
					<s class="font-display text-[40px] text-white/30 line-through">12€</s>
					0€<span class="text-[32px] text-white/50">/mois</span>
				</div>

				<p class="mb-7 text-[15px] leading-relaxed text-white/60">
					Pour les 200 premiers moniteurs inscrits. Premium à vie, sans jamais payer. Réserve ta
					place maintenant.
				</p>

				<!-- Feature list -->
				<ul class="mb-8 flex flex-col gap-3">
					{#each premiumFeatures as feature}
						<li class="flex items-start gap-3">
							<span
								class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-micro font-bold text-white"
								>✓</span
							>
							<span class="text-[14.5px] text-white/80">{feature}</span>
						</li>
					{/each}
				</ul>

				<div class="mt-auto flex flex-col gap-3">
					<a
						href="/signup?role=prof"
						class="flex items-center justify-center rounded-md bg-accent px-6 py-4 font-display text-sm font-black tracking-tight text-white uppercase transition-opacity hover:opacity-90"
					>
						Réserver une place — 63 restantes →
					</a>
					<p
						class="text-center font-mono text-label font-semibold tracking-wider text-white/40 uppercase"
					>
						SANS CARTE BANCAIRE · ANNULATION 1 CLIC
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.pricing-dark {
		background: linear-gradient(135deg, #0e1a2b 0%, #07101c 100%);
	}

	.wind-lines {
		background-image:
			repeating-linear-gradient(108deg, transparent 0 22px, rgba(255, 255, 255, 0.045) 22px 23px),
			repeating-linear-gradient(108deg, transparent 0 90px, rgba(255, 255, 255, 0.08) 90px 91px);
		mask-image: linear-gradient(95deg, transparent 0%, black 20%, black 80%, transparent 100%);
	}
</style>
