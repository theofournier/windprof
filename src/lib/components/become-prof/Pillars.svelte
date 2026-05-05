<script lang="ts">
	const pillars = [
		{
			k: '01',
			t: 'Zéro commission.',
			d: 'Aucun pourcentage, jamais. Tes élèves te paient en direct, sur le spot ou à l\'avance — comme tu veux. On ne touche pas un centime sur tes cours.',
			stat: '0 %',
			label: 'sur tes cours'
		},
		{
			k: '02',
			t: 'Contact direct.',
			d: 'Téléphone et email affichés publiquement sur ta fiche. Les riders t\'écrivent, tu réponds quand tu veux. Pas d\'intermédiaire, pas de messagerie interne.',
			stat: '∞',
			label: 'appels & emails'
		},
		{
			k: '03',
			t: 'Diplômes vérifiés.',
			d: 'Notre équipe contrôle tes BPJEPS, DE, IKO, VDWS sous 48h. Un badge Vérifié apparaît sur ta fiche — les parents et riders confirmés font la différence.',
			stat: '48 h',
			label: 'validation manuelle'
		},
		{
			k: '04',
			t: 'Visibilité météo.',
			d: 'Quand le vent rentre sur ton spot, tu remontes dans les recherches. Ta fiche est liée aux prévisions sur 84 spots français — 7 jours glissants.',
			stat: '7 j',
			label: 'prévisions intégrées'
		}
	];
</script>

<section>
	<!-- Section header -->
	<div class="mb-10">
		<div class="mb-3 font-mono text-label font-semibold tracking-wider text-accent uppercase">
			↳ 01 · POURQUOI WINDMATCH
		</div>
		<h2 class="text-[40px] leading-[0.95] tracking-tight sm:text-[54px] lg:text-[68px]">
			Quatre choses
			<span class="font-serif font-normal italic normal-case tracking-normal">qu'on fait différemment.</span>
		</h2>
	</div>

	<!-- 2x2 grid -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		{#each pillars as pillar, i (pillar.k)}
			<div
				class="group relative flex flex-col overflow-hidden rounded-xl border
				{i === 0 ? 'pillar-dark border-white/10' : 'border-line bg-white'}"
			>
				{#if i === 0}
					<div class="wind-lines absolute inset-0 pointer-events-none"></div>
				{/if}

				<div class="relative z-10 flex h-full flex-col">
					<!-- Top: number + content + stat, divided vertically on md+ -->
					<div class="flex h-full flex-col sm:flex-row">
						<!-- Left: number, title, description -->
						<div class="flex-1 p-7 sm:p-8">
							<div class="mb-4 font-mono text-label font-semibold tracking-wider {i === 0 ? 'text-white/40' : 'text-muted'} uppercase">
								{pillar.k}
							</div>
							<h3 class="mb-3 text-[26px] leading-tight tracking-tight {i === 0 ? 'text-white' : 'text-ink'} sm:text-[30px]">
								{pillar.t}
							</h3>
							<p class="text-[14.5px] leading-relaxed {i === 0 ? 'text-white/60' : 'text-muted'}">
								{pillar.d}
							</p>
						</div>

						<!-- Right: stat + label -->
						<div class="flex flex-col items-center justify-center border-t {i === 0 ? 'border-white/10' : 'border-line'} px-8 py-6 sm:w-36 sm:border-t-0 sm:border-l sm:py-8">
							<div class="font-display text-[40px] font-black leading-none tracking-tight {i === 0 ? 'text-accent' : 'text-accent'} sm:text-[48px]">
								{pillar.stat}
							</div>
							<div class="mt-1 text-center font-mono text-caption font-semibold tracking-wider {i === 0 ? 'text-white/50' : 'text-muted'} uppercase">
								{pillar.label}
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.pillar-dark {
		background: linear-gradient(135deg, #0e1a2b 0%, #07101c 100%);
	}

	.wind-lines {
		background-image:
			repeating-linear-gradient(108deg, transparent 0 22px, rgba(255, 255, 255, 0.045) 22px 23px),
			repeating-linear-gradient(108deg, transparent 0 90px, rgba(255, 255, 255, 0.08) 90px 91px);
		mask-image: linear-gradient(95deg, transparent 0%, black 20%, black 80%, transparent 100%);
	}
</style>
