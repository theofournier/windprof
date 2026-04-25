<script lang="ts">
	let {
		name,
		windDirection,
		windRange,
		photoCount = 4
	}: {
		name: string;
		windDirection: string;
		windRange: string;
		photoCount?: number;
	} = $props();
</script>

<div class="grid h-140 grid-cols-[2fr_1fr] grid-rows-2 gap-2.5">
	<!-- Main photo -->
	<div class="relative row-span-2 rounded-2.5 bg-bg-dark">
		<span
			class="absolute bottom-3.5 left-3.5 rounded-sm bg-white/88 px-2 py-1 font-mono text-micro tracking-wider text-[#3A332A]"
		>
			PHOTO · {name.toUpperCase()} EN SESSION
		</span>
		<span
			class="absolute top-3.5 right-3.5 rounded-sm bg-ink px-2.5 py-1.5 font-mono text-micro font-bold tracking-label text-white"
		>
			1 / {photoCount}
		</span>
		<div class="absolute top-3.5 left-3.5 flex gap-1.5">
			<span
				class="rounded-sm bg-ink/85 px-2.5 py-1.5 font-mono text-micro tracking-loose text-white"
				>↗ {windDirection}</span
			>
			<span
				class="rounded-sm bg-ink/85 px-2.5 py-1.5 font-mono text-micro tracking-loose text-accent-soft"
				>{windRange}</span
			>
		</div>
	</div>

	<!-- Spot photo -->
	<div class="relative rounded-2 bg-bg-dark">
		<span
			class="absolute bottom-2.5 left-2.5 rounded-xs bg-white/88 px-1.5 py-0.5 font-mono text-[9px] tracking-loose"
			>SPOT</span
		>
	</div>

	<!-- More photos overlay -->
	<div class="relative rounded-2 bg-bg-card">
		<button
			class="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2 border-0 bg-ink/50 font-display text-caption font-bold -tracking-tighter text-white uppercase"
		>
			<span class="text-lg">⊞</span>
			+{photoCount - 2} PHOTOS
		</button>
	</div>
</div>
