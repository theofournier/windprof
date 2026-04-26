<script lang="ts">
	const stats = [
		{ n: '0%', t: 'commission' },
		{ n: '48h', t: 'vérif. diplômes' },
		{ n: '~10 min', t: 'pour publier' }
	];
</script>

<aside class="relative flex flex-1 flex-col overflow-hidden bg-ink text-white">
	<div class="wm-grid pointer-events-none"></div>
	<div class="wm-wind-lines pointer-events-none"></div>

	<div class="relative z-10 flex flex-1 flex-col px-14 pt-12 pb-10">
		<!-- Main editorial block -->
		<div>
			<div
				class="mb-[18px] font-mono text-[11px] font-semibold tracking-label text-accent uppercase"
			>
				↳ 01 / OUVRIR UN COMPTE
			</div>
			<h1
				class="mb-7 font-serif text-[clamp(42px,5vw,68px)] leading-[0.98] text-white"
				style="font-weight: 500; letter-spacing: -0.025em; text-wrap: balance;"
			>
				Le vent ne triche pas.<br />
				<em style="font-style: italic; font-weight: 400; color: #E8724C;">Ton profil non plus.</em>
			</h1>
			<p class="max-w-[460px] text-[16px] leading-relaxed text-white/80">
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

			<!-- Testimonial card -->
			<div
				class="rounded-lg border p-[20px_22px]"
				style="border-color: rgba(255,255,255,.12); background: rgba(255,255,255,.03); backdrop-filter: blur(2px);"
			>
				<div class="flex items-center gap-3.5">
					<div class="avatar-stripe h-11 w-11 flex-shrink-0 rounded-full"></div>
					<div>
						<div class="font-serif text-[16px] leading-[1.4] text-white italic">
							« Premier mois, j'ai eu 9 demandes — sans payer une commission. »
						</div>
						<div class="mt-2 font-mono text-[10.5px] tracking-wider text-white/50 uppercase">
							Maxime · Moniteur kite · La Torche
						</div>
					</div>
				</div>
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

	.avatar-stripe {
		background: repeating-linear-gradient(
			45deg,
			rgba(255, 255, 255, 0.12) 0px,
			rgba(255, 255, 255, 0.12) 4px,
			rgba(255, 255, 255, 0.04) 4px,
			rgba(255, 255, 255, 0.04) 8px
		);
	}
</style>
