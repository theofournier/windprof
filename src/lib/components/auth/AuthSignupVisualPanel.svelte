<script lang="ts">
	import WindLines from '../global/WindLines.svelte';

	const stats = [
		{ n: '0%', t: 'commission' },
		{ n: '48h', t: 'vérif. diplômes' },
		{ n: '~10 min', t: 'pour publier' }
	];
</script>

<aside class="relative flex flex-1 flex-col overflow-hidden bg-ink text-white">
	<WindLines />

	<div class="relative z-10 flex flex-1 flex-col px-14 pt-12 pb-10">
		<!-- Main editorial block -->
		<div>
			<div class="mb-4.5 font-mono text-label font-semibold tracking-label text-accent uppercase">
				↳ 01 / OUVRIR UN COMPTE
			</div>
			<h1
				class="mb-7 font-serif text-[clamp(42px,5vw,68px)] leading-[0.98] text-white"
				style="font-weight: 500; letter-spacing: -0.025em; text-wrap: balance;"
			>
				Le vent ne triche pas.<br />
				<em style="font-style: italic; font-weight: 400; color: #E8724C;">Ton profil non plus.</em>
			</h1>
			<p class="max-w-115 text-[16px] leading-relaxed text-white/80">
				L'annuaire des moniteurs indépendants de sports de vent. Diplômes vérifiés, contact direct,
				zéro intermédiaire — la promesse Windmatch tient en trois lignes.
			</p>
		</div>

		<!-- Stats + testimonial -->
		<div class="mt-14">
			<div class="mb-7 h-px" style="background: rgba(255,255,255,.12);"></div>

			<div class="mb-9 grid grid-cols-3 gap-6">
				{#each stats as s (s.t)}
					<div>
						<div class="mb-1.5 font-display text-[32px] leading-none text-accent-soft">{s.n}</div>
						<div class="font-mono text-[10.5px] tracking-label text-white/55 uppercase">{s.t}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</aside>
