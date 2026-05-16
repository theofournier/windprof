<script lang="ts">
	import SportsSilhouette from './SportsSilhouette.svelte';
	import type { Sport } from './types.js';

	let { sport, index }: { sport: Sport; index: number } = $props();

	const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
</script>

<section
	id={sport.id}
	class="border-t border-line py-20 {index % 2 === 1 ? 'bg-bg-dark' : 'bg-bg'}"
>
	<div class="mx-auto max-w-360 px-5 sm:px-10 lg:px-14">
		<!-- Header: big title + silhouette panel -->
		<div class="mb-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
			<div>
				<p class="mb-4 font-mono text-label tracking-widest text-accent uppercase">
					↳ DISCIPLINE 0{index + 1} / 03
				</p>
				<h2
					class="m-0 mb-3 font-display text-[72px] leading-[0.9] tracking-tight uppercase sm:text-[96px] lg:text-[120px]"
				>
					{sport.name}
				</h2>
				<p class="mb-6 font-serif text-2xl font-normal text-accent italic sm:text-[32px]">
					{sport.tagline}
				</p>
				<p class="max-w-130 text-[17px] leading-relaxed text-ink/60">
					{sport.blurb}
				</p>
			</div>

			<!-- Dark silhouette card -->
			<div class="relative min-h-80 overflow-hidden rounded-lg bg-ink p-8">
				<div class="wind-lines absolute inset-0"></div>
				<div class="relative flex h-full flex-col">
					<div class="mb-3 flex justify-between">
						<span class="font-mono text-micro tracking-label text-white/50 uppercase">
							SILHOUETTE · {sport.name.toUpperCase()}
						</span>
						<span class="font-mono text-micro tracking-label text-accent-soft">
							{sport.windMin}–{sport.windMax} KT
						</span>
					</div>
					<div class="h-20 flex-1 px-10 py-3">
						<SportsSilhouette kind={sport.icon} />
					</div>
				</div>
			</div>
		</div>

		<!-- Stats strip -->
		<div class="mb-8 grid grid-cols-2 overflow-hidden rounded-lg bg-ink text-white sm:grid-cols-4">
			<div class="border-b border-white/8 p-6 sm:border-r sm:border-b-0">
				<p class="mb-2 font-display text-[42px] leading-none text-accent-soft">
					{sport.moniteurs}
				</p>
				<p class="font-mono text-micro tracking-label text-white/55 uppercase">moniteurs</p>
			</div>
			<div class="border-b border-l border-white/8 p-6 sm:border-r sm:border-b-0">
				<p class="mb-2 font-display text-[42px] leading-none text-accent-soft">
					{sport.spots}
				</p>
				<p class="font-mono text-micro tracking-label text-white/55 uppercase">spots</p>
			</div>
			<div class="border-r border-white/8 p-6 sm:border-r">
				<p class="mb-2 font-display text-[42px] leading-none text-accent-soft">
					{sport.windSweet}
				</p>
				<p class="font-mono text-micro tracking-label text-white/55 uppercase">sweet spot</p>
			</div>
			<div class="p-6">
				<p class="mb-2 font-display text-[42px] leading-none text-accent-soft">
					{sport.learnTime}
				</p>
				<p class="font-mono text-micro tracking-label text-white/55 uppercase">avant autonomie</p>
			</div>
		</div>

		<!-- Four detail columns -->
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<!-- Matériel -->
			<div class="rounded-lg border border-line bg-white p-6">
				<p class="mb-3.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
					↳ Matériel
				</p>
				{#each sport.gear as item, i}
					<div class="flex justify-between py-2.5 text-sm {i > 0 ? 'border-t border-line/50' : ''}">
						<span>{item}</span>
						<span class="font-mono text-micro text-muted">0{i + 1}</span>
					</div>
				{/each}
			</div>

			<!-- Diplômes -->
			<div class="rounded-lg border border-line bg-white p-6">
				<p class="mb-3.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
					↳ Diplômes acceptés
				</p>
				{#each sport.certifs as certif, i}
					<div
						class="flex items-center gap-2.5 py-2.5 text-sm font-semibold {i > 0
							? 'border-t border-line/50'
							: ''}"
					>
						<span class="size-1.5 shrink-0 rounded-full bg-accent"></span>
						{certif}
					</div>
				{/each}
				<div class="mt-3.5 border-t border-line/50 pt-3.5">
					<p class="mb-1.5 font-mono text-micro tracking-wider text-muted uppercase">
						Vérification
					</p>
					<p class="text-xs leading-relaxed text-ink/55">
						Diplômes contrôlés manuellement sous 48h. Badge ✓ Vérifié sur la fiche.
					</p>
				</div>
			</div>

			<!-- Spots phares -->
			<div class="rounded-lg border border-line bg-white p-6">
				<p class="mb-3.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
					↳ Spots phares
				</p>
				{#each sport.bestSpots as spot, i}
					<div
						class="flex items-center justify-between py-2.5 text-sm {i > 0
							? 'border-t border-line/50'
							: ''}"
					>
						<span>{spot}</span>
					</div>
				{/each}
			</div>

			<!-- Saison + prix -->
			<div class="rounded-lg border border-line bg-white p-6">
				<p class="mb-3.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
					↳ Tarif moyen
				</p>
				<p class="font-display text-2xl tracking-tight">{sport.priceRange}</p>
			</div>
		</div>

		<!-- CTAs -->
		<div class="mt-10 flex flex-wrap items-center gap-3.5">
			<a
				href="/profs"
				class="inline-flex items-center gap-2.5 rounded-md bg-accent px-5 py-3.5 font-display text-xs font-black tracking-wide text-white uppercase hover:bg-accent/85"
			>
				Voir les {sport.moniteurs} moniteurs {sport.name} →
			</a>
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
