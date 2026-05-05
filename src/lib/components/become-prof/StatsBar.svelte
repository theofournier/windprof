<script lang="ts">
	const stats = [
		{ value: '0 %', label: 'COMMISSION', sub: 'sur tes cours · jamais' },
		{ value: '48 h', label: 'VÉRIFICATION', sub: 'manuelle des diplômes' },
		{ value: '~8 min', label: 'INSCRIPTION', sub: 'profil complet & publié' },
		{ value: '12 k+', label: 'VISITES/MOIS', sub: 'sur l\'annuaire · est. avril' }
	];
</script>

<div class="rounded-xl border border-line bg-white shadow-md">
	<div class="grid grid-cols-2 divide-x divide-line lg:grid-cols-4">
		{#each stats as stat, i (stat.label)}
			<div class="flex flex-col items-start px-7 py-8 {i >= 2 ? 'border-t border-line lg:border-t-0' : ''}">
				<div class="mb-1 font-display text-[48px] font-black leading-none tracking-tight text-ink sm:text-[56px]">
					{stat.value}
				</div>
				<div class="mb-1 font-mono text-label font-semibold tracking-wider text-accent uppercase">
					{stat.label}
				</div>
				<div class="font-mono text-caption text-muted">
					{stat.sub}
				</div>
			</div>
		{/each}
	</div>
</div>
