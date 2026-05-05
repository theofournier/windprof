<script lang="ts">
	const annotations = [
		{
			letter: 'A',
			text: 'Badge Premium remonte ta fiche dans les résultats filtrés par vent et localisation.'
		},
		{
			letter: 'B',
			text: 'Données météo en temps réel liées à ton spot principal — les riders voient si le vent souffle.'
		},
		{
			letter: 'C',
			text: 'Badge Vérifié affiché après contrôle manuel de tes diplômes sous 48h.'
		},
		{
			letter: 'D',
			text: 'Contact direct : téléphone et email cliquables, visibles sans inscription.'
		}
	];
</script>

<section>
	<!-- Section header -->
	<div class="mb-10">
		<div class="mb-3 font-mono text-label font-semibold tracking-wider text-accent uppercase">
			↳ 04 · APERÇU
		</div>
		<h2 class="text-[40px] leading-[0.95] tracking-tight sm:text-[54px] lg:text-[68px]">
			Voilà à quoi ressemble
			<span class="font-serif font-normal italic normal-case tracking-normal">ta fiche publique.</span>
		</h2>
	</div>

	<!-- 2-column layout -->
	<div class="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14">

		<!-- Left: mock profile card -->
		<div class="rounded-xl border border-line bg-bg shadow-md">
			<!-- Image area -->
			<div class="relative h-56 overflow-hidden rounded-t-xl bg-bg-dark">
				<!-- Placeholder pattern -->
				<div class="absolute inset-0 card-img-pattern"></div>
				<!-- PREMIUM badge -->
				<span class="absolute top-4 left-4 rounded-sm bg-ink px-2.5 py-1 font-mono text-label font-bold tracking-wider text-white uppercase">
					★ PREMIUM
				</span>
				<!-- Wind data badge -->
				<span class="absolute top-4 right-4 flex items-center gap-1.5 rounded-sm bg-white/90 px-2.5 py-1 font-mono text-label font-bold tracking-wider text-ink uppercase">
					<span class="h-1.5 w-1.5 rounded-full bg-success"></span>
					Vent · 18 kt
				</span>
			</div>

			<!-- Profile content -->
			<div class="p-6">
				<div class="mb-3 flex items-start justify-between">
					<div>
						<h3 class="text-[24px] font-black tracking-tight uppercase">Julien M.</h3>
						<div class="mt-1 flex items-center gap-2 text-sm text-muted">
							<span>★ 4.9</span>
							<span class="text-muted/50">(42)</span>
						</div>
					</div>
					<span class="rounded-sm bg-ink px-2 py-1 font-mono text-micro font-bold tracking-wider text-white uppercase">Vérifié</span>
				</div>

				<div class="mb-4 font-mono text-caption text-muted">
					📍 Leucate · Aude
				</div>

				<!-- Sport & cert chips -->
				<div class="mb-4 flex flex-wrap gap-1.5">
					{#each ['Kitesurf', '✓ BPJEPS', '✓ IKO L3'] as chip}
						<span class="rounded-sm bg-bg-dark px-2 py-1 font-mono text-label font-semibold tracking-wider text-ink uppercase">
							{chip}
						</span>
					{/each}
				</div>

				<div class="mb-5 border-t border-line"></div>

				<div class="flex items-center justify-between">
					<div>
						<div class="font-mono text-micro tracking-wider text-muted uppercase">À partir de</div>
						<div class="mt-0.5 font-display text-[28px] font-black leading-none tracking-tight">DÈS 60€/h</div>
					</div>
					<a
						href="/prof-register"
						class="rounded-md bg-accent px-5 py-3 font-display text-sm font-black text-white uppercase tracking-tight"
					>
						Appeler →
					</a>
				</div>
			</div>
		</div>

		<!-- Right: annotations -->
		<div>
			<div class="mb-6 font-mono text-label font-semibold tracking-wider text-accent uppercase">
				↳ CE QUE LES RIDERS VOIENT
			</div>

			<div class="flex flex-col gap-5">
				{#each annotations as ann}
					<div class="flex gap-4">
						<div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-label font-bold text-white">
							{ann.letter}
						</div>
						<p class="text-[15px] leading-relaxed text-muted pt-0.5">
							{ann.text}
						</p>
					</div>
				{/each}
			</div>

			<div class="mt-8">
				<a
					href="/profs/julien-m"
					class="font-mono text-sm font-bold text-ink underline underline-offset-4"
				>
					Voir une fiche complète →
				</a>
			</div>
		</div>

	</div>
</section>

<style>
	.card-img-pattern {
		background-image: repeating-linear-gradient(
			135deg,
			rgba(0, 0, 0, 0.06) 0 1px,
			transparent 1px 10px
		);
		background-color: var(--color-bg-card);
	}
</style>
