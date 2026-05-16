<script lang="ts">
	import SportsSilhouette from './SportsSilhouette.svelte';
	import type { Sport } from './types.js';

	let { sport, index }: { sport: Sport; index: number } = $props();
</script>

<a href="#{sport.id}" class="block">
	<article
		class="group relative flex min-h-105 flex-col overflow-hidden rounded-lg bg-white px-7 py-7"
	>
		<!-- dark overlay + windlines, fades in on hover -->
		<div
			class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		>
			<div class="absolute inset-0 bg-ink"></div>
			<div class="wind-lines absolute inset-0"></div>
		</div>

		<div class="relative z-10 flex h-full flex-col">
			<div class="flex items-start justify-between">
				<span
					class="font-mono text-micro tracking-label text-muted transition-colors duration-300 group-hover:text-white/50"
				>
					0{index + 1} / 03
				</span>
			</div>

			<div
				class="relative my-2 min-h-45 flex-1 invert transition-[filter] duration-300 group-hover:invert-0"
			>
				<SportsSilhouette kind={sport.icon} />
			</div>

			<div class="relative">
				<h2
					class="mb-1 font-display text-[48px] tracking-tight text-ink uppercase transition-colors duration-300 group-hover:text-white"
				>
					{sport.name}
				</h2>
				<p class="mb-4 font-serif text-lg font-normal text-accent italic">{sport.tagline}</p>

				<p
					class="mb-2 font-mono text-micro tracking-label text-muted uppercase transition-colors duration-300 group-hover:text-white/45"
				>
					FENÊTRE UTILE · BEAUFORT · <span class="text-sm text-accent">↗ {sport.windSweet}</span>
				</p>
				<div
					class="mb-4 grid items-end gap-0.5"
					style="grid-template-columns: repeat(13, 1fr); height: 24px;"
				>
					{#each sport.beaufort as bar, j (j)}
						<div
							class="rounded-t-[1px]"
							style="height: {bar ? '22px' : '5px'}; background: {bar
								? '#E8724C'
								: 'var(--bar-inactive)'}"
						></div>
					{/each}
				</div>

				<div
					class="flex items-end justify-between border-t border-line pt-3.5 transition-colors duration-300 group-hover:border-white/10"
				>
					<div>
						<p
							class="font-mono text-micro tracking-wider text-muted uppercase transition-colors duration-300 group-hover:text-white/50"
						>
							MONITEURS · SPOTS
						</p>
						<p
							class="mt-1 font-display text-[22px] text-ink transition-colors duration-300 group-hover:text-white"
						>
							{sport.moniteurs} · {sport.spots}
						</p>
					</div>
					<span class="text-[24px] text-accent">→</span>
				</div>
			</div>
		</div>
	</article>
</a>

<style>
	article {
		--bar-inactive: rgba(0, 0, 0, 0.12);
	}

	article:hover {
		--bar-inactive: rgba(255, 255, 255, 0.1);
	}

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
