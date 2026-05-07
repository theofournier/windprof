<script lang="ts">
	let {
		name,
		kt,
		dir,
		gust,
		tag,
		tagHot,
		cardinals,
		beaufort
	}: {
		name: string;
		kt: number;
		dir: string;
		gust: number;
		tag: string;
		tagHot: boolean;
		cardinals: number[];
		beaufort: number;
	} = $props();

	const DIRS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
	const SZ = 96;
	const cx = SZ / 2,
		cy = SZ / 2,
		r = SZ / 2 - 2;
</script>

<div class="relative overflow-hidden rounded-2xl bg-ink" style="min-height: 460px;">
	<!-- Hatching background -->
	<div
		class="absolute inset-0"
		style="background: #1a2a3f; background-image: repeating-linear-gradient(135deg, rgba(255,255,255,.03) 0 1px, transparent 1px 14px);"
	></div>

	<!-- Photo label -->
	<div class="absolute top-5 left-5 font-mono text-label tracking-widest text-white/40 uppercase">
		PHOTO · {name.split('—')[0].trim().toUpperCase()}
	</div>

	<!-- Tag badge -->
	<div class="absolute top-5 right-5">
		<span
			class="rounded-sm px-2.5 py-1.5 font-mono text-micro font-bold tracking-label {tagHot
				? 'bg-accent text-white'
				: 'bg-success text-ink'}"
		>
			{tagHot ? '● ' : ''}{tag}
		</span>
	</div>

	<!-- Bottom overlay: wind + beaufort + compass -->
	<div class="absolute right-0 bottom-0 left-0 p-6">
		<!-- Beaufort bar -->
		<div class="mb-4 grid h-[22px] items-end" style="grid-template-columns: repeat(13,1fr); gap: 2px;">
			{#each { length: 13 } as _, i (i)}
				{@const on = i <= beaufort}
				{@const c = on
					? i < 3
						? 'rgba(255,255,255,.18)'
						: i < 6
							? '#6FD29A'
							: i < 9
								? '#F2B544'
								: '#E8724C'
					: 'rgba(255,255,255,.06)'}
				<div style="height: {on ? 6 + i * 1.3 : 4}px; background: {c}; border-radius: 1px 1px 0 0;"></div>
			{/each}
		</div>

		<div class="flex items-end justify-between">
			<div>
				<div class="mb-1 font-mono text-label tracking-wider text-white/50 uppercase">
					Vent live · Beaufort F{beaufort}
				</div>
				<div class="font-display text-[80px] font-black leading-none text-accent-soft">
					{kt}<span class="ml-2 text-[26px] text-white/50">kt</span>
				</div>
				<div class="mt-1.5 font-mono text-label tracking-wider text-white/60 uppercase">
					↗ {dir} · Rafales {gust} kt
				</div>
			</div>

			<!-- Compass -->
			<svg width={SZ} height={SZ} viewBox="0 0 {SZ} {SZ}">
				<circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,.2)" stroke-width="1" />
				<circle
					cx={cx}
					cy={cy}
					r={r * 0.55}
					fill="none"
					stroke="rgba(255,255,255,.2)"
					stroke-width=".6"
					opacity=".6"
				/>
				{#each DIRS as _, i (i)}
					{@const a = (i * Math.PI) / 4 - Math.PI / 2}
					{@const len = cardinals[i] ? r - 3 : r * 0.55}
					{@const x = cx + Math.cos(a) * len}
					{@const y = cy + Math.sin(a) * len}
					<line
						x1={cx}
						y1={cy}
						x2={x}
						y2={y}
						stroke={cardinals[i] ? '#E8724C' : 'rgba(255,255,255,.2)'}
						stroke-width={cardinals[i] ? 2.5 : 0.6}
						stroke-linecap="round"
					/>
				{/each}
				<circle cx={cx} cy={cy} r="3" fill="#E8724C" />
				<!-- Cardinal labels -->
				{#each DIRS as d, i (i)}
					{@const a = (i * Math.PI) / 4 - Math.PI / 2}
					{@const lx = cx + Math.cos(a) * (r + 10)}
					{@const ly = cy + Math.sin(a) * (r + 10)}
					<text
						x={lx}
						y={ly}
						text-anchor="middle"
						dominant-baseline="central"
						font-size="7"
						font-family="JetBrains Mono, monospace"
						fill={cardinals[i] ? 'rgba(232,114,76,.9)' : 'rgba(255,255,255,.3)'}
					>{d}</text>
				{/each}
			</svg>
		</div>
	</div>
</div>
