<script lang="ts">
	import type { Spot } from './types.js';

	let { spot, index }: { spot: Spot; index: number } = $props();

	const DIRS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
	const SZ = 70;
	const cx = SZ / 2, cy = SZ / 2, r = SZ / 2 - 2;
</script>

<a href="/spots/{spot.id}">
	<!-- Desktop: horizontal table row -->
	<article
		class="hidden overflow-hidden rounded-[10px] border border-line bg-white lg:grid"
		style="grid-template-columns: 200px 1.5fr 1fr 90px 100px 1fr 120px;"
	>
		<!-- Photo placeholder -->
		<div
			class="relative h-[130px] bg-bg-card"
			style="background-image: repeating-linear-gradient(135deg, rgba(0,0,0,.06) 0 1px, transparent 1px 10px);"
		>
			<span
				class="absolute top-2.5 left-2.5 rounded-sm bg-ink px-1.75 py-0.75 font-mono text-[9.5px] font-bold tracking-label text-white"
				>{String(index + 1).padStart(2, '0')}</span
			>
			<span
				class="absolute bottom-2.5 left-2.5 rounded-sm bg-white/85 px-1.5 py-0.75 font-mono text-[9px] tracking-loose"
				style="color: #3a332a;"
				>PHOTO · {spot.name.split('—')[0].toUpperCase().trim()}</span
			>
		</div>

		<!-- Name + region + coords -->
		<div class="flex flex-col justify-center border-r border-line px-5.5 py-4.5">
			<div class="mb-1 flex items-center gap-2">
				<h3 class="m-0 font-display text-[22px] font-black tracking-snug">{spot.name}</h3>
				<span
					class="rounded-sm px-2.25 py-1 font-mono text-micro font-bold tracking-label {spot.tagHot
						? 'bg-accent text-white'
						: 'bg-success text-ink'}"
				>
					{spot.tagHot ? '● ' : ''}{spot.tag}
				</span>
			</div>
			<div class="mb-2 text-[12.5px] text-muted">{spot.region}</div>
			<div class="font-mono text-[10.5px] tracking-loose text-muted">{spot.coords}</div>
		</div>

		<!-- Disciplines + level -->
		<div class="flex flex-col justify-center border-r border-line px-5.5 py-4.5">
			<div class="mb-2 flex flex-wrap gap-[5px]">
				{#each spot.disciplines as d}
					<span
						class="inline-flex items-center rounded-sm bg-bg-dark px-2.5 py-1 font-mono text-label font-semibold tracking-[.04em] uppercase"
						>{d}</span
					>
				{/each}
			</div>
			<div class="font-mono text-micro tracking-wider text-muted uppercase">
				NIVEAU · {spot.level}
			</div>
		</div>

		<!-- Compass -->
		<div class="flex items-center justify-center border-r border-line">
			<svg width={SZ} height={SZ} viewBox="0 0 {SZ} {SZ}">
				<circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(14,26,43,.14)" stroke-width="1" />
				<circle
					cx={cx}
					cy={cy}
					r={r * 0.55}
					fill="none"
					stroke="rgba(14,26,43,.14)"
					stroke-width=".6"
					opacity=".6"
				/>
				{#each DIRS as _, i}
					{@const a = (i * Math.PI) / 4 - Math.PI / 2}
					{@const len = spot.cardinals[i] ? r - 3 : r * 0.55}
					{@const x = cx + Math.cos(a) * len}
					{@const y = cy + Math.sin(a) * len}
					<line
						x1={cx}
						y1={cy}
						x2={x}
						y2={y}
						stroke={spot.cardinals[i] ? '#E8724C' : 'rgba(14,26,43,.14)'}
						stroke-width={spot.cardinals[i] ? 2.2 : 0.6}
						stroke-linecap="round"
					/>
				{/each}
				<circle cx={cx} cy={cy} r="2" fill="#E8724C" />
			</svg>
		</div>

		<!-- Wind live -->
		<div class="flex flex-col justify-center border-r border-line px-3 py-4.5 text-center">
			<div
				class="font-display text-[30px] font-black leading-none {spot.tagHot
					? 'text-accent'
					: 'text-ink'}"
			>
				{spot.kt}<span class="ml-0.5 text-body-sm text-muted">kt</span>
			</div>
			<div class="mt-1 font-mono text-micro tracking-loose text-muted">
				↗ {spot.dir} · raf. {spot.gust}
			</div>
		</div>

		<!-- Beaufort + water -->
		<div class="flex flex-col justify-center border-r border-line px-4.5 py-4.5">
			<div class="mb-1.5 font-mono text-micro tracking-wider text-muted uppercase">
				BEAUFORT · F{spot.beaufort}
			</div>
			<div
				class="grid h-[18px] items-end"
				style="grid-template-columns: repeat(13,1fr); gap: 2px;"
			>
				{#each { length: 13 } as _, i}
					{@const on = i <= spot.beaufort}
					{@const c = on
						? i < 3
							? 'rgba(14,26,43,.14)'
							: i < 6
								? '#6FD29A'
								: i < 9
									? '#F2B544'
									: '#E8724C'
						: 'rgba(14,26,43,.08)'}
					<div
						style="height: {on ? 6 + i * 1.1 : 4}px; background: {c}; border-radius: 1px 1px 0 0;"
					></div>
				{/each}
			</div>
			<div class="mt-2 text-[11.5px] text-muted">{spot.water}</div>
		</div>

		<!-- CTA -->
		<div class="flex flex-col items-start justify-center bg-bg-dark px-4.5 py-4.5">
			<div class="font-display text-[24px] font-black leading-none text-ink">{spot.moniteurs}</div>
			<div class="mb-2.5 mt-1 font-mono text-[9.5px] tracking-wider text-muted uppercase">
				MONITEURS
			</div>
			<div class="font-mono text-[10.5px] font-bold tracking-label text-accent uppercase">
				VOIR FICHE →
			</div>
		</div>
	</article>

	<!-- Mobile: stacked card -->
	<article class="overflow-hidden rounded-[10px] border border-line bg-white lg:hidden">
		<div
			class="relative h-28 bg-bg-card"
			style="background-image: repeating-linear-gradient(135deg, rgba(0,0,0,.06) 0 1px, transparent 1px 10px);"
		>
			<span
				class="absolute top-2.5 left-2.5 rounded-sm bg-ink px-1.75 py-0.75 font-mono text-[9.5px] font-bold tracking-label text-white"
				>{String(index + 1).padStart(2, '0')}</span
			>
			<span
				class="absolute top-2.5 right-2.5 rounded-sm px-2.25 py-1 font-mono text-micro font-bold tracking-label {spot.tagHot
					? 'bg-accent text-white'
					: 'bg-success text-ink'}"
			>
				{spot.tagHot ? '● ' : ''}{spot.tag}
			</span>
		</div>
		<div class="p-5">
			<h3 class="m-0 mb-0.5 font-display text-[20px] font-black tracking-tight">{spot.name}</h3>
			<div class="mb-3 font-mono text-label tracking-wider text-muted uppercase">{spot.region}</div>
			<div class="mb-3 flex flex-wrap gap-1.5">
				{#each spot.disciplines as d}
					<span
						class="rounded-sm bg-bg-dark px-2.5 py-1 font-mono text-label font-semibold tracking-[.04em] uppercase"
						>{d}</span
					>
				{/each}
			</div>
			<div class="flex items-end justify-between border-t border-line pt-3">
				<div>
					<div class="font-mono text-micro tracking-wider text-muted uppercase">Vent live</div>
					<div
						class="font-display text-[28px] font-black leading-none {spot.tagHot
							? 'text-accent'
							: 'text-ink'}"
					>
						{spot.kt}<span class="ml-0.5 text-caption text-muted">kt {spot.dir}</span>
					</div>
				</div>
				<div class="text-right">
					<div class="font-mono text-micro tracking-wider text-muted uppercase">Moniteurs</div>
					<div class="font-display text-[28px] font-black leading-none text-ink">
						{spot.moniteurs}
					</div>
				</div>
				<div class="font-mono text-[10.5px] font-bold tracking-label text-accent uppercase">
					VOIR →
				</div>
			</div>
		</div>
	</article>
</a>
