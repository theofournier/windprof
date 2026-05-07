<script lang="ts">
	import SportSilhouette from './SportSilhouette.svelte';
	import type { Discipline } from './types.js';

	let { discipline, index }: { discipline: Discipline; index: number } = $props();

	const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
</script>

<section
	id={discipline.id}
	class="border-t border-line py-20 {index % 2 === 1 ? 'bg-bg-dark' : 'bg-bg'}"
>
	<div class="mx-auto max-w-360 px-5 sm:px-10 lg:px-14">
		<!-- Header: big title + silhouette panel -->
		<div class="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
			<div>
				<p class="mb-4 font-mono text-label uppercase tracking-widest text-accent">
					↳ DISCIPLINE 0{index + 1} / 03
				</p>
				<h2
					class="m-0 mb-3 font-display leading-[0.9] tracking-tight uppercase text-[72px] sm:text-[96px] lg:text-[120px]"
				>
					{discipline.name}
				</h2>
				<p class="mb-6 font-serif text-2xl italic font-normal text-accent sm:text-[32px]">
					{discipline.tagline}
				</p>
				<p class="max-w-[520px] text-[17px] leading-relaxed text-ink/60">
					{discipline.blurb}
				</p>
			</div>

			<!-- Dark silhouette card -->
			<div class="relative min-h-[320px] overflow-hidden rounded-lg bg-ink p-8 lg:min-h-[380px]">
				<div class="wind-lines absolute inset-0"></div>
				<div class="relative flex h-full flex-col">
					<div class="mb-3 flex justify-between">
						<span class="font-mono text-micro tracking-label text-white/50 uppercase">
							SILHOUETTE · {discipline.name.toUpperCase()}
						</span>
						<span class="font-mono text-micro tracking-label text-accent-soft">
							{discipline.windMin}–{discipline.windMax} KT
						</span>
					</div>
					<div class="flex-1 px-10 py-3">
						<SportSilhouette kind={discipline.icon} />
					</div>
				</div>
			</div>
		</div>

		<!-- Stats strip -->
		<div class="mb-8 grid grid-cols-2 overflow-hidden rounded-lg bg-ink text-white sm:grid-cols-4">
			<div class="border-b border-white/8 p-6 sm:border-b-0 sm:border-r">
				<p class="mb-2 font-display text-[42px] leading-none text-accent-soft">
					{discipline.moniteurs}
				</p>
				<p class="font-mono text-micro uppercase tracking-label text-white/55">moniteurs</p>
			</div>
			<div class="border-b border-white/8 border-l p-6 sm:border-b-0 sm:border-r">
				<p class="mb-2 font-display text-[42px] leading-none text-accent-soft">
					{discipline.spots}
				</p>
				<p class="font-mono text-micro uppercase tracking-label text-white/55">spots</p>
			</div>
			<div class="border-r border-white/8 p-6 sm:border-r">
				<p class="mb-2 font-mono text-[22px] leading-none text-accent-soft">
					{discipline.windSweet}
				</p>
				<p class="font-mono text-micro uppercase tracking-label text-white/55">sweet spot</p>
			</div>
			<div class="p-6">
				<p class="mb-2 font-mono text-[22px] leading-none text-accent-soft">
					{discipline.learnTime}
				</p>
				<p class="font-mono text-micro uppercase tracking-label text-white/55">avant autonomie</p>
			</div>
		</div>

		<!-- Four detail columns -->
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<!-- Matériel -->
			<div class="rounded-lg border border-line bg-white p-6">
				<p class="mb-3.5 font-mono text-label uppercase tracking-widest text-accent font-semibold">
					↳ Matériel
				</p>
				{#each discipline.gear as item, i}
					<div
						class="flex justify-between py-2.5 text-sm {i > 0
							? 'border-t border-line/50'
							: ''}"
					>
						<span>{item}</span>
						<span class="font-mono text-micro text-muted">0{i + 1}</span>
					</div>
				{/each}
			</div>

			<!-- Diplômes -->
			<div class="rounded-lg border border-line bg-white p-6">
				<p class="mb-3.5 font-mono text-label uppercase tracking-widest text-accent font-semibold">
					↳ Diplômes acceptés
				</p>
				{#each discipline.certifs as certif, i}
					<div
						class="flex items-center gap-2.5 py-2.5 text-sm font-semibold {i > 0
							? 'border-t border-line/50'
							: ''}"
					>
						<span class="size-1.5 rounded-full bg-accent shrink-0"></span>
						{certif}
					</div>
				{/each}
				<div class="mt-3.5 border-t border-line/50 pt-3.5">
					<p class="mb-1.5 font-mono text-micro uppercase tracking-wider text-muted">Vérification</p>
					<p class="text-xs leading-relaxed text-ink/55">
						Diplômes contrôlés manuellement sous 48h. Badge ✓ Vérifié sur la fiche.
					</p>
				</div>
			</div>

			<!-- Spots phares -->
			<div class="rounded-lg border border-line bg-white p-6">
				<p class="mb-3.5 font-mono text-label uppercase tracking-widest text-accent font-semibold">
					↳ Spots phares
				</p>
				{#each discipline.bestSpots as spot, i}
					<div
						class="flex items-center justify-between py-2.5 text-sm {i > 0
							? 'border-t border-line/50'
							: ''}"
					>
						<span>{spot}</span>
						<span class="font-mono text-micro text-accent">→</span>
					</div>
				{/each}
			</div>

			<!-- Saison + prix -->
			<div class="rounded-lg border border-line bg-white p-6">
				<p class="mb-3.5 font-mono text-label uppercase tracking-widest text-accent font-semibold">
					↳ Saison
				</p>
				<div class="mb-3.5 grid grid-cols-6 gap-1">
					{#each months as month, i}
						<div
							class="rounded-sm py-2.5 text-center font-mono text-micro font-bold {discipline
								.season[i]
								? 'bg-accent text-white'
								: 'bg-bg-dark text-muted'}"
						>
							{month}
						</div>
					{/each}
				</div>
				<p class="mb-1.5 font-mono text-micro uppercase tracking-wider text-muted">Tarif moyen</p>
				<p class="font-display text-2xl tracking-tight">{discipline.priceRange}</p>
			</div>
		</div>

		<!-- CTAs -->
		<div class="mt-10 flex flex-wrap items-center gap-3.5">
			<a
				href="/profs"
				class="inline-flex items-center gap-2.5 rounded-md bg-accent px-5 py-3.5 font-display text-xs font-black uppercase tracking-wide text-white hover:bg-accent/85"
			>
				Voir les {discipline.moniteurs} moniteurs {discipline.name} →
			</a>
			<a
				href="/spots"
				class="inline-flex items-center gap-2.5 rounded-md border-2 border-ink bg-transparent px-5 py-3.5 font-display text-xs font-black uppercase tracking-wide text-ink hover:bg-ink/5"
			>
				Prévisions sur {discipline.spots} spots
			</a>
			<span class="ml-auto font-mono text-micro uppercase tracking-wider text-muted">
				↳ Contact direct · 0% commission
			</span>
		</div>
	</div>
</section>

<style>
	.wind-lines {
		opacity: 0.5;
		background-image:
			repeating-linear-gradient(
				108deg,
				transparent 0px,
				transparent 22px,
				rgba(255, 255, 255, 0.045) 22px,
				rgba(255, 255, 255, 0.045) 23px
			),
			repeating-linear-gradient(
				108deg,
				transparent 0px,
				transparent 90px,
				rgba(255, 255, 255, 0.08) 90px,
				rgba(255, 255, 255, 0.08) 91px
			);
		mask-image: linear-gradient(95deg, transparent 0%, black 20%, black 80%, transparent 100%);
		pointer-events: none;
	}
</style>
