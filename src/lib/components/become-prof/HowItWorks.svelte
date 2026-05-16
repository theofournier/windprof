<script lang="ts">
	const steps = [
		{
			k: '01',
			t: 'Crée ton profil en 8 minutes.',
			d: "Photo, bio, disciplines pratiquées et niveau d'enseignement. Un formulaire guidé en 7 étapes claires.",
			cta: '~8 min · 7 étapes'
		},
		{
			k: '02',
			t: 'Upload tes diplômes.',
			d: 'Scan ou photo de tes BPJEPS, DE Voile, IKO, VDWS. Notre équipe vérifie sous 48h ouvrées et active le badge Vérifié.',
			cta: '48h ouvrées'
		},
		{
			k: '03',
			t: 'Renseigne tarifs et contact.',
			d: 'Grille indicative par cours, téléphone, email — tout optionnel sauf un moyen de contact. Tu peux tout modifier à tout moment.',
			cta: 'Indicatif · négociable'
		},
		{
			k: '04',
			t: 'Reçois tes premiers riders.',
			d: "Ta fiche apparaît dans l'annuaire et dans les résultats filtrés par vent et localisation. Les riders te contactent directement.",
			cta: 'Téléphone · email · WhatsApp'
		}
	];
</script>

<section>
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
		<!-- Left sticky column -->
		<div class="lg:sticky lg:top-24 lg:self-start">
			<div class="mb-3 font-mono text-label font-semibold tracking-wider text-accent uppercase">
				↳ 03 · MISE EN ROUTE
			</div>
			<h2 class="mb-4 text-[40px] leading-[0.95] tracking-tight sm:text-[54px] lg:text-[60px]">
				Quatre étapes.
				<span
					class="mt-1 block font-serif text-[28px] font-normal tracking-normal normal-case italic sm:text-[34px] lg:text-[38px]"
					>une après-midi.</span
				>
			</h2>
			<p class="mb-8 text-[15px] leading-relaxed text-muted">
				Un processus simple pensé pour des moniteurs déjà occupés. Pas de jargon, pas de pièges —
				juste ta fiche en ligne.
			</p>
			<a
				href="/signup?role=prof"
				class="inline-flex items-center rounded-md bg-accent px-6 py-4 font-display text-sm font-black tracking-tight text-white uppercase transition-opacity hover:opacity-90"
			>
				Commencer →
			</a>
		</div>

		<!-- Right: steps list -->
		<div class="flex flex-col">
			{#each steps as step, i (step.k)}
				<div
					class="flex flex-col gap-4 border-t border-line py-7 sm:flex-row sm:items-start sm:gap-6 {i ===
					0
						? 'border-t-0 pt-0'
						: ''}"
				>
					<!-- Step number -->
					<div class="w-14 shrink-0">
						<span
							class="font-display text-[40px] leading-none font-black tracking-tight text-accent"
							>{step.k}</span
						>
					</div>

					<!-- Title + description -->
					<div class="flex-1">
						<h3 class="mb-2 text-[20px] leading-tight font-black tracking-tight uppercase">
							{step.t}
						</h3>
						<p class="text-[14.5px] leading-relaxed text-muted">
							{step.d}
						</p>
					</div>

					<!-- Chip -->
					<div class="shrink-0">
						<span
							class="inline-block rounded-sm bg-bg-dark px-2.5 py-1 font-mono text-label font-semibold tracking-wider text-muted uppercase"
						>
							{step.cta}
						</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
