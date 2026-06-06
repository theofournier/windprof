<script lang="ts">
	import type { Sport } from './types.js';

	let { sports }: { sports: Sport[] } = $props();
</script>

<section class="pt-10 pb-20">
	<div class="mb-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
		<div>
			<p class="mb-3.5 font-mono text-label tracking-widest text-accent uppercase">
				↳ FICHE TECHNIQUE
			</p>
			<h2 class="m-0 text-[40px] sm:text-[56px]">Comparatif</h2>
		</div>
		<p class="font-mono text-micro tracking-wider text-muted uppercase">
			Données moyennes · côte FR · saison 2026
		</p>
	</div>

	<div class="overflow-x-auto rounded-lg border border-line">
		<table class="w-full border-collapse">
			<thead>
				<tr class="border-b border-line bg-bg-dark">
					<th
						class="w-48 p-4 text-left font-mono text-micro font-semibold tracking-label text-ink/55 uppercase"
					>
						Critère
					</th>
					{#each sports as d}
						<th class="p-4 text-left">
							<span class="font-display text-2xl tracking-tight uppercase">{d.name}</span>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				<tr class="border-b border-line/50">
					<td
						class="bg-bg p-4 align-middle font-mono text-micro font-semibold tracking-loose text-ink/55 uppercase"
					>
						Vent minimum
					</td>
					{#each sports as d}
						<td class="bg-white p-4 align-middle">
							<span class="font-display text-xl">{d.windMin}</span>
							<span class="ml-1 text-xs text-muted">kt</span>
						</td>
					{/each}
				</tr>

				<tr class="border-b border-line/50">
					<td
						class="bg-bg p-4 align-middle font-mono text-micro font-semibold tracking-loose text-ink/55 uppercase"
					>
						Sweet spot
					</td>
					{#each sports as d}
						<td class="bg-white p-4 align-middle">
							<span class="font-mono text-body-sm font-semibold text-accent">{d.windSweet}</span>
						</td>
					{/each}
				</tr>

				<tr class="border-b border-line/50">
					<td
						class="bg-bg p-4 align-middle font-mono text-micro font-semibold tracking-loose text-ink/55 uppercase"
					>
						Niveau requis
					</td>
					{#each sports as d}
						<td class="bg-white p-4 align-middle text-sm">{d.level}</td>
					{/each}
				</tr>

				<tr class="border-b border-line/50">
					<td
						class="bg-bg p-4 align-middle font-mono text-micro font-semibold tracking-loose text-ink/55 uppercase"
					>
						Temps avant autonomie
					</td>
					{#each sports as d}
						<td class="bg-white p-4 align-middle">
							<span class="font-mono text-body-sm">{d.learnTime}</span>
						</td>
					{/each}
				</tr>

				<tr class="border-b border-line/50">
					<td
						class="bg-bg p-4 align-middle font-mono text-micro font-semibold tracking-loose text-ink/55 uppercase"
					>
						Tarif moyen cours
					</td>
					{#each sports as d}
						<td class="bg-white p-4 align-middle">
							<span class="font-display text-xl">{d.priceRange}</span>
						</td>
					{/each}
				</tr>

				<tr class="border-b border-line/50">
					<td
						class="bg-bg p-4 align-middle font-mono text-micro font-semibold tracking-loose text-ink/55 uppercase"
					>
						Diplômes moniteurs
					</td>
					{#each sports as d}
						<td class="bg-white p-4 align-middle">
							<div class="flex flex-wrap gap-1.5">
								{#each d.certifs as certif}
									<span
										class="inline-flex items-center rounded bg-bg-dark px-2.5 py-1 font-mono text-micro font-semibold tracking-wide uppercase"
									>
										{certif}
									</span>
								{/each}
							</div>
						</td>
					{/each}
				</tr>

				<tr class="border-b border-line/50">
					<td
						class="bg-bg p-4 align-middle font-mono text-micro font-semibold tracking-loose text-ink/55 uppercase"
					>
						Moniteurs FR
					</td>
					{#each sports as d}
						<td class="bg-white p-4 align-middle">
							<span class="font-display text-2xl text-accent">{d.moniteurs}</span>
						</td>
					{/each}
				</tr>
			</tbody>
		</table>
	</div>
</section>
