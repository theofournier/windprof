<script lang="ts">
	const days = [
		{ label: 'LUN', kt: 14 },
		{ label: 'MAR', kt: 22 },
		{ label: 'MER', kt: 28 },
		{ label: 'JEU', kt: 24 },
		{ label: 'VEN', kt: 18 },
		{ label: 'SAM', kt: 12 },
		{ label: 'DIM', kt: 16 }
	];

	const maxKt = 32;

	function barColor(kt: number): string {
		if (kt >= 22) return 'bg-accent';
		if (kt >= 16) return 'bg-accent-soft';
		return 'bg-success';
	}

	// Beaufort scale bars: 13 steps
	const beaufortBars = Array.from({ length: 13 }, (_, i) => i);

	function beaufortColor(i: number): string {
		if (i >= 9) return 'bg-accent';
		if (i >= 6) return 'bg-accent-soft';
		if (i >= 3) return 'bg-success';
		return 'bg-white/20';
	}
</script>

<section class="py-16">
	<div class="mx-auto max-w-360 px-5 sm:px-10 lg:px-14">
		<div class="forecast-card relative overflow-hidden rounded-2xl p-8 sm:p-12">
			<div class="wind-lines absolute inset-0 pointer-events-none"></div>
			<div class="grid-overlay absolute inset-0 pointer-events-none"></div>

			<div class="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">

				<!-- Left: text -->
				<div>
					<div class="mb-4 font-mono text-label font-semibold tracking-wider text-accent-soft uppercase">↳ 05 · LA DONNÉE EN DIRECT</div>
					<h2 class="mb-6 text-[36px] leading-[1.05] tracking-tight text-white sm:text-[48px] lg:text-[56px]">
						Tu sais d'abord
						<span class="text-accent">si ça vaut</span>
						<span class="block font-serif font-normal italic normal-case tracking-normal text-white/80"> le déplacement.</span>
					</h2>
					<p class="mb-8 max-w-sm text-[15px] leading-relaxed text-white/60">
						Prévisions 7 jours glissants sur 84 spots français. Données Météo-Consult et Windy, actualisées toutes les 3h. Tu arrives quand ça souffle.
					</p>
					<div class="flex flex-col gap-3 sm:flex-row">
						<a
							href="/spots"
							class="inline-flex items-center justify-center rounded-md bg-accent px-7 py-4 font-display text-sm font-black text-white uppercase tracking-tight transition-opacity hover:opacity-90"
						>
							Voir les prévisions →
						</a>
						<button
							class="inline-flex items-center justify-center rounded-md border border-white/20 px-7 py-4 font-display text-sm font-black text-white uppercase tracking-tight transition-colors hover:border-white/50"
						>
							Comment on calcule ça
						</button>
					</div>
				</div>

				<!-- Right: data viz card -->
				<div class="rounded-xl border border-white/10 bg-white/6 p-6 backdrop-blur-sm">
					<!-- Header -->
					<div class="mb-6 flex items-start justify-between">
						<div>
							<div class="font-mono text-label font-semibold tracking-wider text-white/40 uppercase">LEUCATE · 7 JOURS</div>
							<div class="mt-1 font-display text-[22px] font-black leading-none text-white">VENT FORT × 4J</div>
						</div>
						<div class="rounded bg-accent/20 px-2.5 py-1 font-mono text-label font-semibold tracking-wider text-accent uppercase">LIVE</div>
					</div>

					<!-- Bar chart -->
					<div class="mb-4 flex items-end gap-2 h-28">
						{#each days as day (day.label)}
							<div class="flex flex-1 flex-col items-center gap-1">
								<span class="font-mono text-[10px] font-bold text-white/50">{day.kt}</span>
								<div class="w-full rounded-t {barColor(day.kt)}" style="height: {(day.kt / maxKt) * 100}%"></div>
							</div>
						{/each}
					</div>

					<!-- Day labels -->
					<div class="mb-6 flex gap-2">
						{#each days as day (day.label)}
							<div class="flex-1 text-center font-mono text-[10px] font-semibold tracking-wider text-white/40 uppercase">{day.label}</div>
						{/each}
					</div>

					<!-- Beaufort scale -->
					<div class="border-t border-white/10 pt-4">
						<div class="mb-2 font-mono text-label font-semibold tracking-wider text-white/30 uppercase">ÉCHELLE DE BEAUFORT</div>
						<div class="flex items-end gap-0.5 h-8">
							{#each beaufortBars as i (i)}
								<div
									class="flex-1 rounded-sm {beaufortColor(i)}"
									style="height: {((i + 1) / 13) * 100}%"
								></div>
							{/each}
						</div>
						<div class="mt-1 flex justify-between">
							<span class="font-mono text-[10px] text-white/30">0</span>
							<span class="font-mono text-[10px] text-white/30">12</span>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</section>

<style>
	.forecast-card {
		background: linear-gradient(135deg, #07101c 0%, #0e1a2b 60%, #14243b 100%);
	}

	.wind-lines {
		background-image:
			repeating-linear-gradient(108deg, transparent 0 22px, rgba(255, 255, 255, 0.045) 22px 23px),
			repeating-linear-gradient(108deg, transparent 0 90px, rgba(255, 255, 255, 0.08) 90px 91px);
		mask-image: linear-gradient(95deg, transparent 0%, black 20%, black 80%, transparent 100%);
	}

	.grid-overlay {
		background-image:
			linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
			linear-gradient(180deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
		background-size: 80px 80px;
		mask-image: radial-gradient(ellipse at 30% 40%, black, transparent 75%);
	}
</style>
