<script lang="ts">
	const liveSpots = [
		{ spot: 'Leucate — La Franqui', dir: 'N', kt: 24, g: 32, hot: true },
		{ spot: 'La Palme', dir: 'NW', kt: 18, g: 25, hot: false },
		{ spot: 'Gruissan', dir: 'N', kt: 21, g: 28, hot: true }
	];
</script>

<aside class="relative flex flex-1 flex-col overflow-hidden bg-ink text-white">
	<!-- Grid overlay -->
	<div class="wm-grid pointer-events-none"></div>
	<!-- Wind lines overlay -->
	<div class="wm-wind-lines pointer-events-none"></div>

	<div class="relative z-10 flex flex-1 flex-col px-14 pt-12 pb-10">
		<!-- Main editorial block -->
		<div>
			<div
				class="mb-[18px] font-mono text-[11px] font-semibold tracking-label text-accent uppercase"
			>
				↳ BIENVENUE / RE-CONNEXION
			</div>
			<h1
				class="mb-7 font-serif text-[clamp(42px,5vw,68px)] leading-[0.98] text-white"
				style="font-weight: 500; letter-spacing: -0.025em; text-wrap: balance;"
			>
				Re-bonjour.<br />
				<em style="font-style: italic; font-weight: 400; color: #E8724C;">Le vent t'attend.</em>
			</h1>
			<p class="max-w-[460px] text-[16px] leading-relaxed text-white/80">
				Reprends là où tu en étais. Ton brouillon, tes prévisions sauvegardées, ton dashboard
				moniteur — tout est resté en place.
			</p>
		</div>

		<!-- Live wind spots -->
		<div class="mt-14">
			<div class="mb-3.5 font-mono text-[11px] font-semibold tracking-label text-accent uppercase">
				↳ EN CE MOMENT, SUR TES SPOTS
			</div>
			<div class="overflow-hidden rounded-lg border border-white/[0.12]">
				{#each liveSpots as s, i (s.spot)}
					<div
						class="grid items-center gap-4 px-[18px] py-[14px] {i < liveSpots.length - 1
							? 'border-b'
							: ''}"
						style="grid-template-columns: 1fr auto auto; border-color: rgba(255,255,255,0.08); background: {s.hot
							? 'rgba(232,114,76,.06)'
							: 'transparent'};"
					>
						<div>
							<div class="text-sm font-bold text-white">{s.spot}</div>
							<div class="mt-0.5 font-mono text-[10.5px] tracking-loose text-white/50 uppercase">
								{s.dir} · rafales {s.g} kt
							</div>
						</div>
						<div
							class="font-display text-[28px] leading-none {s.hot
								? 'text-accent-soft'
								: 'text-white'}"
						>
							{s.kt}<span class="text-xs font-normal text-white/50"> kt</span>
						</div>
						{#if s.hot}
							<span
								class="rounded-[4px] bg-accent px-2.5 py-1 font-mono text-[9.5px] font-semibold tracking-wide text-white uppercase"
							>
								★ HOT
							</span>
						{:else}
							<span class="w-[44px]"></span>
						{/if}
					</div>
				{/each}
			</div>
			<div class="mt-3.5 font-mono text-[10.5px] tracking-wider text-white/40 uppercase">
				⌥ MAJ · IL Y A 3 MIN · WINDY API
			</div>
		</div>
	</div>
</aside>

<style>
	.wm-grid {
		position: absolute;
		inset: 0;
		opacity: 0.18;
		background-image:
			linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
			linear-gradient(180deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
		background-size: 80px 80px;
		mask-image: radial-gradient(ellipse at 30% 40%, black, transparent 75%);
	}

	.wm-wind-lines {
		position: absolute;
		inset: 0;
		opacity: 0.5;
		background-image:
			repeating-linear-gradient(108deg, transparent 0 22px, rgba(255, 255, 255, 0.045) 22px 23px),
			repeating-linear-gradient(108deg, transparent 0 90px, rgba(255, 255, 255, 0.08) 90px 91px);
		mask-image: linear-gradient(95deg, transparent 0%, black 20%, black 80%, transparent 100%);
	}
</style>
