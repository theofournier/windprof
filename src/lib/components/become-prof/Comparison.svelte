<script lang="ts">
	const rows = [
		{
			criterion: 'Commission sur les cours',
			classic: '15 à 25 %',
			windprof: '0 %'
		},
		{
			criterion: 'Contact direct rider ↔ moniteur',
			classic: "Bloqué jusqu'au paiement",
			windprof: 'Affiché publiquement'
		},
		{
			criterion: 'Diplômes affichés & vérifiés',
			classic: 'Variable / opaque',
			windprof: 'BPJEPS · DE · IKO · VDWS'
		},
		{
			criterion: 'Tu fixes ton planning',
			classic: 'Calendrier imposé',
			windprof: 'Tu réponds quand tu veux'
		},
		{
			criterion: 'Avis & relances email',
			classic: 'Automatiques, agressifs',
			windprof: 'Optionnels, jamais forcés'
		},
		{
			criterion: 'Coût pour toi',
			classic: 'Variable + abonnement',
			windprof: 'Gratuit'
		}
	];
</script>

<section>
	<!-- Section header -->
	<div class="mb-10">
		<div class="mb-3 font-mono text-label font-semibold tracking-wider text-accent uppercase">
			↳ 02 · COMPARAISON
		</div>
		<h2 class="text-[40px] leading-[0.95] tracking-tight sm:text-[54px] lg:text-[68px]">
			Plateformes classiques
			<span class="font-serif font-normal tracking-normal normal-case italic">vs.</span>
			Windprof.
		</h2>
	</div>

	<!-- Table -->
	<div class="overflow-hidden rounded-xl border border-line">
		<!-- Header -->
		<div class="grid grid-cols-[1fr_1fr_1fr] border-b border-line bg-bg-dark">
			<div class="px-6 py-4 font-mono text-label font-semibold tracking-wider text-muted uppercase">
				CRITÈRE
			</div>
			<div
				class="border-l border-line px-6 py-4 font-mono text-label font-semibold tracking-wider text-muted uppercase"
			>
				PLATEFORME CLASSIQUE
			</div>
			<div
				class="border-l border-line px-6 py-4 font-mono text-label font-semibold tracking-wider text-accent uppercase"
			>
				WINDPROF
			</div>
		</div>

		<!-- Rows -->
		{#each rows as row, i (row.criterion)}
			<div
				class="grid grid-cols-[1fr_1fr_1fr] border-b border-line last:border-b-0 {i % 2 === 1
					? 'bg-bg/60'
					: 'bg-white'}"
			>
				<div class="px-6 py-4 text-[14.5px] font-medium text-ink">
					{row.criterion}
				</div>
				<div class="flex items-center gap-2 border-l border-line px-6 py-4 text-[14px] text-muted">
					<span
						class="flex h-5 w-5 shrink-0 items-center justify-center rounded font-mono text-micro font-bold text-muted/60"
						>×</span
					>
					{row.classic}
				</div>
				<div
					class="flex items-center gap-2 border-l border-line px-6 py-4 text-[14px] font-medium text-ink"
				>
					{row.windprof}
					<span
						class="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-accent font-mono text-micro font-bold text-white"
						>✓</span
					>
				</div>
			</div>
		{/each}
	</div>
</section>
