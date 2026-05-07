<section class="mx-auto max-w-360 px-4 pb-16 sm:px-8 lg:px-14">
	<div
		class="relative min-h-[380px] overflow-hidden rounded-[10px] bg-ink p-8 text-white lg:p-9"
	>
		<!-- Wind lines overlay -->
		<div
			class="pointer-events-none absolute inset-0 opacity-50"
			style="background-image: repeating-linear-gradient(108deg, transparent 0 22px, rgba(255,255,255,.045) 22px 23px), repeating-linear-gradient(108deg, transparent 0 90px, rgba(255,255,255,.08) 90px 91px); mask-image: linear-gradient(95deg, transparent 0%, black 20%, black 80%, transparent 100%);"
		></div>

		<div class="relative grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr]">
			<!-- Left: info -->
			<div>
				<div class="mb-[14px] font-mono text-label font-semibold tracking-widest text-accent uppercase">
					↳ CARTE LIVE
				</div>
				<h3 class="m-0 mb-4 font-display text-[42px] font-black leading-[0.95] tracking-[-0.03em]">
					Vue d'ensemble
				</h3>
				<p class="m-0 mb-5 text-[14.5px] leading-[1.6] text-white/70">
					Survole les régions pour voir les spots. Couleurs :
					<b class="text-success">vert</b> = vent stable,
					<b class="text-accent-soft">jaune</b> = soutenu,
					<b class="text-accent">orange</b> = costaud,
					<b class="text-[#B34E3E]">rouge</b> = tempête.
				</p>
				<div class="mt-6 flex gap-4 border-t border-white/10 pt-5">
					<div>
						<div class="font-display text-[32px] font-black leading-none text-accent-soft">162</div>
						<div class="mt-1 font-mono text-[10px] tracking-label text-white/55 uppercase">SPOTS</div>
					</div>
					<div>
						<div class="font-display text-[32px] font-black leading-none text-accent-soft">87</div>
						<div class="mt-1 font-mono text-[10px] tracking-label text-white/55 uppercase">FAVORABLES</div>
					</div>
					<div>
						<div class="font-display text-[32px] font-black leading-none text-accent">4</div>
						<div class="mt-1 font-mono text-[10px] tracking-label text-white/55 uppercase">HOT &gt; 25KT</div>
					</div>
				</div>
			</div>

			<!-- Right: map -->
			<div
				class="relative h-[340px] overflow-hidden rounded-md border border-white/12"
				style="background: rgba(255,255,255,.02);"
			>
				<!-- Grid overlay -->
				<div
					class="pointer-events-none absolute inset-0 opacity-[.18]"
					style="background-image: linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,.08) 1px, transparent 1px); background-size: 80px 80px; mask-image: radial-gradient(ellipse at 30% 40%, black, transparent 75%);"
				></div>
				<svg
					viewBox="0 0 600 360"
					preserveAspectRatio="xMidYMid meet"
					class="absolute inset-0 h-full w-full"
				>
					<!-- France outline (schematic) -->
					<path
						d="M 180 60 Q 320 40, 460 90 Q 510 150, 510 230 Q 470 310, 360 320 Q 240 320, 170 260 Q 110 200, 130 130 Q 150 80, 180 60 Z"
						fill="rgba(255,255,255,.04)"
						stroke="rgba(255,255,255,.18)"
						stroke-width="1"
					/>
					<!-- Spot dots -->
					{#each [
						{ x: 220, y: 280, c: '#6FD29A', s: 'Hourtin' },
						{ x: 200, y: 210, c: '#F2B544', s: 'Quiberon' },
						{ x: 175, y: 170, c: '#F2B544', s: 'La Torche' },
						{ x: 295, y: 130, c: '#6FD29A', s: 'Wissant' },
						{ x: 330, y: 295, c: '#F2B544', s: 'Palavas' },
						{ x: 355, y: 280, c: '#E8724C', s: 'Leucate' },
						{ x: 340, y: 285, c: '#F2B544', s: 'Gruissan' },
						{ x: 380, y: 285, c: '#F2B544', s: 'Beauduc' },
						{ x: 430, y: 290, c: '#6FD29A', s: 'Almanarre' },
						{ x: 455, y: 280, c: '#6FD29A', s: 'Hyères' }
					] as d}
						<g>
							<circle
								cx={d.x}
								cy={d.y}
								r={d.c === '#E8724C' ? 9 : 6}
								fill={d.c}
								opacity=".25"
							/>
							<circle cx={d.x} cy={d.y} r={d.c === '#E8724C' ? 5 : 4} fill={d.c} />
							<text
								x={d.x + 9}
								y={d.y + 3}
								fill="rgba(255,255,255,.85)"
								font-size="9.5"
								font-family="JetBrains Mono, monospace"
								letter-spacing=".05em">{d.s.toUpperCase()}</text
							>
						</g>
					{/each}
					<!-- Wind arrows -->
					{#each [
						[150, 140, 40],
						[480, 180, 210],
						[350, 310, 180]
					] as [x, y, rot]}
						<g transform="rotate({rot} {x} {y})">
							<line x1={x - 15} y1={y} x2={x + 15} y2={y} stroke="#E8724C" stroke-width="1.4" />
							<polyline
								points="{x + 9},{y - 4} {x + 15},{y} {x + 9},{y + 4}"
								stroke="#E8724C"
								stroke-width="1.4"
								fill="none"
							/>
						</g>
					{/each}
				</svg>
				<span
					class="absolute bottom-2.5 right-3.5 font-mono text-[9px] tracking-[.12em] text-white/40"
					>SCHÉMATIQUE · NON GÉOLOCALISÉE</span
				>
			</div>
		</div>
	</div>
</section>
