<section>
	<div
		class="relative grid grid-cols-[1.1fr_1fr] items-center gap-16 rounded-[14px] border border-line bg-bg-dark px-9 py-12"
	>
		<div class="section-bg absolute inset-0"></div>
		<div class="relative">
			<div class="mb-4.5 font-mono text-label tracking-widest text-accent uppercase">
				↳ VOUS ÊTES MONITEUR
			</div>
			<h2 class="mb-5.5 text-[76px] leading-[0.92] tracking-tight">
				Votre expertise,<br />visible par tous.
			</h2>
			<p class="mb-8 max-w-120 text-[17px] leading-body text-muted">
				Indépendant BPJEPS, DE, IKO ou VDWS ? Créez votre fiche en 10 minutes. Listing gratuit à
				vie. Vos coordonnées, visibles. <b class="text-ink">Aucune commission</b>, jamais.
			</p>
			<div class="flex">
				<a
					href="/prof-register"
					class="flex items-center rounded-md bg-accent px-6 py-4 font-display text-sm font-bold text-white uppercase"
					>Créer ma fiche →</a
				>
			</div>
		</div>
		<div class="relative grid grid-cols-2 gap-3">
			{#each [{ value: '0%', label: 'de commission sur vos cours' }, { value: '10 min', label: 'pour créer votre fiche' }, { value: '6 mois', label: 'Premium offerts aux 20 premiers' }, { value: '∞', label: 'avis et contacts reçus' }] as stat (stat.value)}
				<div class="rounded-[8px] border border-line bg-white px-5.5 py-6.5">
					<div class="mb-1.5 font-display text-[52px] leading-none text-accent">
						{stat.value}
					</div>
					<div class="text-body-sm leading-[1.45] text-muted">
						{stat.label}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.section-bg {
		background: repeating-linear-gradient(
			108deg,
			transparent 0px,
			transparent 60px,
			rgba(14, 26, 43, 0.04) 60px,
			rgba(14, 26, 43, 0.04) 61px
		);
	}
</style>
