<script lang="ts">
	const profs = [
		{
			name: 'Julien M.',
			location: 'Leucate',
			disciplines: ['Kitesurf'],
			certs: ['BPJEPS', 'IKO L3'],
			price: 60,
			stars: 4.9,
			reviews: 42,
			dir: 'N/NE',
			ktMin: 12,
			ktMax: 28,
			badge: 'PREMIUM',
			n: '01'
		},
		{
			name: 'Anaïs P.',
			location: 'La Torche',
			disciplines: ['Wingfoil'],
			certs: ['DE', 'VDWS'],
			price: 75,
			stars: 4.8,
			reviews: 28,
			dir: 'W/SW',
			ktMin: 10,
			ktMax: 22,
			badge: 'VÉRIFIÉ',
			n: '02'
		},
		{
			name: 'Marco D.',
			location: 'Almanarre',
			disciplines: ['Windsurf', 'Wing'],
			certs: ['BPJEPS', 'VDWS'],
			price: 55,
			stars: 5.0,
			reviews: 17,
			dir: 'E/W',
			ktMin: 8,
			ktMax: 25,
			badge: 'NOUVEAU',
			n: '03'
		},
		{
			name: 'Léa V.',
			location: 'Quiberon',
			disciplines: ['Kitesurf'],
			certs: ['BPJEPS', 'IKO L2'],
			price: 65,
			stars: 4.7,
			reviews: 54,
			dir: 'W',
			ktMin: 14,
			ktMax: 24,
			badge: 'PREMIUM',
			n: '04'
		}
	];

	const filters = ['Tous', 'Kite', 'Wing', 'Wind'];
	let activeFilter = $state('Tous');

	function badgeColor(badge: string) {
		if (badge === 'PREMIUM') return 'bg-accent text-white';
		if (badge === 'NOUVEAU') return 'bg-success text-ink';
		return 'bg-white border border-line text-ink';
	}
</script>

<section class="mx-auto max-w-360 px-5 sm:px-10 lg:px-14 py-16">
	<!-- Section header -->
	<div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
		<div>
			<div class="mb-3 font-mono text-label font-semibold tracking-wider text-accent uppercase">↳ 03 · LA SÉLECTION</div>
			<h2 class="text-[40px] leading-[0.95] tracking-tight sm:text-[54px] lg:text-[60px]">
				Quatre moniteurs
				<span class="font-serif font-normal italic normal-case tracking-normal"> cette semaine.</span>
			</h2>
		</div>
		<!-- Filter tabs -->
		<div class="inline-flex gap-1 rounded-full bg-white border border-line p-1 shadow-sm self-start sm:self-auto">
			{#each filters as f (f)}
				<button
					onclick={() => activeFilter = f}
					class="rounded-full px-4 py-1.5 font-mono text-label font-semibold tracking-wider uppercase transition-colors {activeFilter === f ? 'bg-ink text-white' : 'text-muted hover:text-ink'}"
				>
					{f}
				</button>
			{/each}
		</div>
	</div>

	<!-- 4 prof cards -->
	<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
		{#each profs as prof (prof.n)}
			<div class="flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm">
				<!-- Photo placeholder -->
				<div
					class="relative h-60 flex-shrink-0"
					style="background-image: repeating-linear-gradient(135deg, rgba(0,0,0,.06) 0 1px, transparent 1px 10px); background-color: #d9d4cb;"
				>
					<!-- Badge: PREMIUM/VÉRIFIÉ/NOUVEAU -->
					<div class="absolute top-3 left-3">
						<span class="rounded px-2.5 py-1 font-mono text-label font-semibold tracking-wider uppercase {badgeColor(prof.badge)}">{prof.badge}</span>
					</div>
					<!-- Wind direction badge -->
					<div class="absolute top-3 right-3 flex flex-col items-end gap-1">
						<span class="rounded bg-ink/70 px-2 py-0.5 font-mono text-label font-semibold tracking-wider text-white/80 uppercase">↗ {prof.dir}</span>
						<span class="rounded bg-accent-soft/90 px-2 py-0.5 font-mono text-label font-semibold tracking-wider text-ink uppercase">{prof.ktMin}–{prof.ktMax} kt</span>
					</div>
					<!-- Number label -->
					<div class="absolute bottom-3 right-3 font-mono text-label font-semibold tracking-wider text-white/30 uppercase">N°{prof.n}</div>
				</div>

				<!-- Card body -->
				<div class="flex flex-1 flex-col p-5">
					<h3 class="font-display text-[20px] font-black tracking-tight leading-none text-ink">{prof.name}</h3>
					<div class="mt-1 flex items-center gap-2">
						<span class="text-accent text-sm">{'★'.repeat(Math.floor(prof.stars))}</span>
						<span class="font-mono text-caption text-muted">{prof.stars} ({prof.reviews})</span>
					</div>
					<div class="mt-1 font-mono text-caption font-semibold tracking-wider text-muted uppercase">{prof.location}</div>

					<!-- Discipline chips -->
					<div class="mt-3 flex flex-wrap gap-1.5">
						{#each prof.disciplines as d (d)}
							<span class="rounded px-2.5 py-1 font-mono text-label font-semibold tracking-wider uppercase bg-bg-card text-ink border border-line">{d}</span>
						{/each}
					</div>

					<div class="my-4 border-t border-line"></div>

					<div class="flex items-center justify-between">
						<div>
							<span class="font-display text-[18px] font-black text-ink">dès {prof.price}€/h</span>
						</div>
						<div class="flex flex-wrap gap-1 justify-end">
							{#each prof.certs as c (c)}
								<span class="rounded bg-bg px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-wider text-muted uppercase border border-line">{c}</span>
							{/each}
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- CTA -->
	<div class="mt-10 flex justify-center">
		<a
			href="/profs"
			class="inline-flex items-center justify-center rounded-md border border-line px-8 py-4 font-display text-sm font-black text-ink uppercase tracking-tight transition-colors hover:border-ink hover:bg-ink hover:text-white"
		>
			Voir les 592 moniteurs →
		</a>
	</div>
</section>
