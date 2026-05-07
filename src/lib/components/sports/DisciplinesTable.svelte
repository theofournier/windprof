<script lang="ts">
	import type { Discipline } from './types.js';

	let { disciplines }: { disciplines: Discipline[] } = $props();
</script>

<section class="pb-20 pt-10">
	<div class="mb-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
		<div>
			<p class="mb-3.5 font-mono text-label uppercase tracking-widest text-accent">
				↳ FICHE TECHNIQUE
			</p>
			<h2 class="m-0 text-[40px] sm:text-[56px]">Comparatif</h2>
		</div>
		<p class="font-mono text-micro uppercase tracking-wider text-muted">
			Données moyennes · côte FR · saison 2026
		</p>
	</div>

	<div class="overflow-x-auto rounded-lg border border-line">
		<table class="w-full border-collapse">
			<thead>
				<tr class="border-b border-line bg-bg-dark">
					<th
						class="w-48 p-4 text-left font-mono text-micro font-semibold uppercase tracking-label text-ink/55"
					>
						Critère
					</th>
					{#each disciplines as d}
						<th class="p-4 text-left">
							<span class="font-display text-2xl tracking-tight uppercase">{d.name}</span>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				<tr class="border-b border-line/50">
					<td class="bg-bg p-4 align-middle font-mono text-micro font-semibold uppercase tracking-loose text-ink/55">
						Vent minimum
					</td>
					{#each disciplines as d}
						<td class="bg-white p-4 align-middle">
							<span class="font-display text-xl">{d.windMin}</span>
							<span class="ml-1 text-xs text-muted">kt</span>
						</td>
					{/each}
				</tr>

				<tr class="border-b border-line/50">
					<td class="bg-bg p-4 align-middle font-mono text-micro font-semibold uppercase tracking-loose text-ink/55">
						Sweet spot
					</td>
					{#each disciplines as d}
						<td class="bg-white p-4 align-middle">
							<span class="font-mono text-body-sm font-semibold text-accent">{d.windSweet}</span>
						</td>
					{/each}
				</tr>

				<tr class="border-b border-line/50">
					<td class="bg-bg p-4 align-middle font-mono text-micro font-semibold uppercase tracking-loose text-ink/55">
						Niveau requis
					</td>
					{#each disciplines as d}
						<td class="bg-white p-4 align-middle text-sm">{d.level}</td>
					{/each}
				</tr>

				<tr class="border-b border-line/50">
					<td class="bg-bg p-4 align-middle font-mono text-micro font-semibold uppercase tracking-loose text-ink/55">
						Temps avant autonomie
					</td>
					{#each disciplines as d}
						<td class="bg-white p-4 align-middle">
							<span class="font-mono text-body-sm">{d.learnTime}</span>
						</td>
					{/each}
				</tr>

				<tr class="border-b border-line/50">
					<td class="bg-bg p-4 align-middle font-mono text-micro font-semibold uppercase tracking-loose text-ink/55">
						Tarif moyen cours
					</td>
					{#each disciplines as d}
						<td class="bg-white p-4 align-middle">
							<span class="font-display text-xl">{d.priceRange}</span>
						</td>
					{/each}
				</tr>

				<tr class="border-b border-line/50">
					<td class="bg-bg p-4 align-middle font-mono text-micro font-semibold uppercase tracking-loose text-ink/55">
						Diplômes moniteurs
					</td>
					{#each disciplines as d}
						<td class="bg-white p-4 align-middle">
							<div class="flex flex-wrap gap-1.5">
								{#each d.certifs as certif}
									<span
										class="inline-flex items-center rounded bg-bg-dark px-2.5 py-1 font-mono text-micro font-semibold uppercase tracking-wide"
									>
										{certif}
									</span>
								{/each}
							</div>
						</td>
					{/each}
				</tr>

				<tr class="border-b border-line/50">
					<td class="bg-bg p-4 align-middle font-mono text-micro font-semibold uppercase tracking-loose text-ink/55">
						Moniteurs FR
					</td>
					{#each disciplines as d}
						<td class="bg-white p-4 align-middle">
							<span class="font-display text-2xl text-accent">{d.moniteurs}</span>
						</td>
					{/each}
				</tr>

				<tr>
					<td class="bg-bg p-4 align-middle font-mono text-micro font-semibold uppercase tracking-loose text-ink/55">
						Spots référencés
					</td>
					{#each disciplines as d}
						<td class="bg-white p-4 align-middle">
							<span class="font-display text-2xl">{d.spots}</span>
						</td>
					{/each}
				</tr>
			</tbody>
		</table>
	</div>
</section>
