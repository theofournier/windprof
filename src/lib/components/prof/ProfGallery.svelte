<script lang="ts">
	let {
		name,
		photoCount = 4
	}: {
		name: string;
		photoCount?: number;
	} = $props();
</script>

<div class="grid h-72 grid-cols-[2fr_1fr] grid-rows-2 gap-2.5 sm:h-96 lg:h-140">
	<!-- Main photo -->
	<div class="photo-bg relative row-span-2 rounded-md bg-bg-card">
		<span
			class="absolute bottom-3.5 left-3.5 rounded-sm bg-white/88 px-2 py-1 font-mono text-micro tracking-wider text-ink"
		>
			PHOTO · {name.toUpperCase()} EN SESSION
		</span>
		<span
			class="absolute top-3.5 right-3.5 rounded-sm bg-ink px-2.5 py-1.5 font-mono text-micro font-bold tracking-label text-white"
		>
			1 / {photoCount}
		</span>
	</div>

	<!-- Spot photo -->
	<div class="photo-bg relative rounded-md bg-bg-card">
		<span
			class="absolute bottom-2.5 left-2.5 rounded-sm bg-white/88 px-1.5 py-0.5 font-mono text-[9px] tracking-loose"
			>SPOT</span
		>
	</div>

	<!-- More photos overlay -->
	<div class="photo-bg relative rounded-md bg-bg-card">
		<button
			class="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-md border-0 bg-ink/50 font-display text-caption font-bold -tracking-tighter text-white uppercase"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="22"
				height="22"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<rect x="3" y="3" width="7" height="7" rx="1" />
				<rect x="14" y="3" width="7" height="7" rx="1" />
				<rect x="3" y="14" width="7" height="7" rx="1" />
				<rect x="14" y="14" width="7" height="7" rx="1" />
			</svg>
			+{photoCount - 2} PHOTOS
		</button>
	</div>
</div>

<style>
	.photo-bg {
		background-image: repeating-linear-gradient(
			135deg,
			rgba(0, 0, 0, 0.06) 0 1px,
			transparent 1px 10px
		);
	}
</style>
