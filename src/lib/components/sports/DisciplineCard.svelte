<script lang="ts">
	import SportSilhouette from './SportSilhouette.svelte';
	import type { Discipline } from './types.js';

	let { discipline, index }: { discipline: Discipline; index: number } = $props();
</script>

<a href="#{discipline.id}" class="block">
	<article
		class="relative flex min-h-[420px] flex-col overflow-hidden rounded-lg bg-ink px-7 py-7 text-white"
	>
		<div class="wind-lines absolute inset-0"></div>

		<div class="relative flex items-start justify-between">
			<span class="font-mono text-micro tracking-label text-white/50">
				0{index + 1} / 03
			</span>
			<span class="font-mono text-micro tracking-label uppercase text-accent">
				↗ {discipline.windSweet}
			</span>
		</div>

		<div class="relative my-2 min-h-[180px] flex-1">
			<SportSilhouette kind={discipline.icon} />
		</div>

		<div class="relative">
			<h2 class="mb-1 font-display text-[48px] tracking-tight uppercase">{discipline.name}</h2>
			<p class="mb-4 font-serif text-lg italic font-normal text-accent">{discipline.tagline}</p>

			<p class="mb-2 font-mono text-micro uppercase tracking-label text-white/45">
				FENÊTRE UTILE · BEAUFORT
			</p>
			<div
				class="mb-4 grid items-end gap-0.5"
				style="grid-template-columns: repeat(13, 1fr); height: 24px;"
			>
				{#each discipline.beaufort as bar}
					<div
						class="rounded-t-[1px]"
						style="height: {bar ? '22px' : '5px'}; background: {bar
							? '#E8724C'
							: 'rgba(255,255,255,0.1)'}"
					></div>
				{/each}
			</div>

			<div class="flex items-end justify-between border-t border-white/10 pt-3.5">
				<div>
					<p class="font-mono text-micro tracking-wider text-white/50 uppercase">
						MONITEURS · SPOTS
					</p>
					<p class="mt-1 font-display text-[22px]">
						{discipline.moniteurs} · {discipline.spots}
					</p>
				</div>
				<span class="text-[24px] text-accent">→</span>
			</div>
		</div>
	</article>
</a>

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
