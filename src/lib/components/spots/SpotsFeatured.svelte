<script lang="ts">
	import type { Spot } from './types.js';

	let { spots }: { spots: Spot[] } = $props();

	const DIRS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
	const SIZE = 56;
	const cx = SIZE / 2, cy = SIZE / 2, r = SIZE / 2 - 2;
</script>

<section class="mx-auto max-w-360 px-4 pt-6 pb-14 sm:px-8 lg:px-14">
	<div class="mb-6 flex items-end justify-between">
		<div>
			<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
				↳ MAINTENANT · TOP CONDITIONS
			</div>
			<h2 class="m-0 font-display text-[42px] font-black leading-none tracking-[-0.03em]">
				Ça souffle
				<span class="font-serif font-normal italic normal-case tracking-[-0.02em] text-muted"
					>en ce moment</span
				>
			</h2>
		</div>
		<div class="hidden font-mono text-label tracking-wider text-muted uppercase lg:block">
			↻ Mis à jour il y a 4 min
		</div>
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each spots.slice(0, 3) as s, i}
			<a href="/spots/{s.id}">
				<article class="overflow-hidden rounded-[10px] bg-ink text-white">
					<!-- Wind header -->
					<div
						class="relative h-[200px]"
						style="background: #1a2a3f; background-image: repeating-linear-gradient(135deg, rgba(255,255,255,.04) 0 1px, transparent 1px 12px);"
					>
						<div
							class="absolute inset-0 flex flex-col justify-between"
							style="padding: 18px 20px;"
						>
							<div class="flex items-start justify-between">
								<span class="font-mono text-label tracking-widest text-white/60"
									>0{i + 1} / 03 · TOP CONDITIONS</span
								>
								<span
									class="rounded-sm px-2.25 py-1 font-mono text-micro font-bold tracking-label {s.tagHot
										? 'bg-accent text-white'
										: 'bg-success text-ink'}"
								>
									{s.tagHot ? '● ' : ''}{s.tag}
								</span>
							</div>
							<div class="flex items-end justify-between">
								<div class="font-display text-[54px] font-black leading-none text-accent-soft">
									{s.kt}<span class="ml-1 text-[18px] text-white/55">kt {s.dir}</span>
								</div>
								<!-- Compass -->
								<svg width={SIZE} height={SIZE} viewBox="0 0 {SIZE} {SIZE}">
									<circle
										cx={cx}
										cy={cy}
										r={r}
										fill="none"
										stroke="rgba(255,255,255,.25)"
										stroke-width="1"
									/>
									<circle
										cx={cx}
										cy={cy}
										r={r * 0.55}
										fill="none"
										stroke="rgba(255,255,255,.25)"
										stroke-width=".6"
										opacity=".6"
									/>
									{#each DIRS as _, li}
										{@const a = (li * Math.PI) / 4 - Math.PI / 2}
										{@const len = s.cardinals[li] ? r - 3 : r * 0.55}
										{@const x = cx + Math.cos(a) * len}
										{@const y = cy + Math.sin(a) * len}
										<line
											x1={cx}
											y1={cy}
											x2={x}
											y2={y}
											stroke={s.cardinals[li] ? '#E8724C' : 'rgba(255,255,255,.25)'}
											stroke-width={s.cardinals[li] ? 2.2 : 0.6}
											stroke-linecap="round"
										/>
									{/each}
									<circle cx={cx} cy={cy} r="2" fill="#E8724C" />
								</svg>
							</div>
						</div>
					</div>

					<!-- Body -->
					<div style="padding: 18px 20px 22px;">
						<h3 class="m-0 mb-1 font-display text-[26px] font-black leading-none tracking-[-0.025em]">
							{s.name}
						</h3>
						<div class="mb-3.5 text-[12.5px] text-white/60">{s.region}</div>

						<!-- Beaufort bar -->
						<div class="grid h-[18px] items-end" style="grid-template-columns: repeat(13,1fr); gap: 2px;">
							{#each { length: 13 } as _, bi}
								{@const on = bi <= s.beaufort}
								{@const c = on
									? bi < 3
										? 'rgba(255,255,255,.2)'
										: bi < 6
											? '#6FD29A'
											: bi < 9
												? '#F2B544'
												: '#E8724C'
									: 'rgba(255,255,255,.08)'}
								<div style="height: {on ? 6 + bi * 1.1 : 4}px; background: {c}; border-radius: 1px 1px 0 0;"></div>
							{/each}
						</div>

						<div
							class="mt-[14px] flex items-center justify-between border-t border-white/10 pt-[14px]"
						>
							<div class="flex gap-[5px]">
								{#each s.disciplines as d}
									<span
										class="rounded-sm border border-white/20 px-2 py-[3px] font-mono text-[10px] tracking-[.1em] text-white/85"
										>{d}</span
									>
								{/each}
							</div>
							<span class="font-mono text-[11px] font-bold tracking-[.14em] text-accent"
								>{s.moniteurs} MONIT. →</span
							>
						</div>
					</div>
				</article>
			</a>
		{/each}
	</div>
</section>
