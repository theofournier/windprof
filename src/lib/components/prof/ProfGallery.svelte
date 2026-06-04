<script lang="ts">
	let {
		photos = []
	}: {
		photos?: { url: string }[];
	} = $props();

	let selectedIndex = $state<number | null>(null);

	function open(index: number) {
		selectedIndex = index;
	}

	function close() {
		selectedIndex = null;
	}

	function prev() {
		if (selectedIndex === null) return;
		selectedIndex = (selectedIndex - 1 + photos.length) % photos.length;
	}

	function next() {
		if (selectedIndex === null) return;
		selectedIndex = (selectedIndex + 1) % photos.length;
	}

	function onKeydown(e: KeyboardEvent) {
		if (selectedIndex === null) return;
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowLeft') prev();
		if (e.key === 'ArrowRight') next();
	}
</script>

<svelte:window onkeydown={onKeydown} />

{#if photos.length === 0}
	<div class="photo-bg h-72 rounded-md bg-bg-card sm:h-96 lg:h-140"></div>
{:else}
	<div class="grid h-72 grid-cols-[2fr_1fr] grid-rows-2 gap-2.5 sm:h-96 lg:h-140">
		<!-- Main photo -->
		<button
			class="relative row-span-2 cursor-pointer overflow-hidden rounded-md bg-bg-card"
			onclick={() => open(0)}
		>
			<img src={photos[0].url} alt="" class="absolute inset-0 h-full w-full object-cover" />
		</button>

		<!-- Second photo -->
		<div class="relative overflow-hidden rounded-md bg-bg-card">
			{#if photos[1]}
				<button class="absolute inset-0 cursor-pointer" onclick={() => open(1)}>
					<img src={photos[1].url} alt="" class="h-full w-full object-cover" />
				</button>
			{/if}
		</div>

		<!-- Third slot / more photos overlay -->
		<div class="relative overflow-hidden rounded-md bg-bg-card">
			{#if photos[2]}
				<button class="absolute inset-0 cursor-pointer" onclick={() => open(2)}>
					<img src={photos[2].url} alt="" class="h-full w-full object-cover" />
				</button>
			{/if}
			{#if photos.length > 2}
				<button
					onclick={() => open(2)}
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
					+{photos.length - 2} PHOTOS
				</button>
			{/if}
		</div>
	</div>
{/if}

<!-- Lightbox overlay -->
{#if selectedIndex !== null}
	<div
		role="dialog"
		aria-modal="true"
		tabindex="-1"
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
		onclick={close}
		onkeydown={onKeydown}
	>
		<div
			role="presentation"
			class="relative flex h-full w-full items-center justify-center"
			onclick={(e) => e.stopPropagation()}
		>
			<img
				src={photos[selectedIndex].url}
				alt=""
				class="max-h-[90vh] max-w-[90vw] rounded-md object-contain shadow-2xl"
			/>

			<!-- Close -->
			<button
				onclick={close}
				class="absolute top-4 right-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
				aria-label="Fermer"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>

			<!-- Prev -->
			{#if photos.length > 1}
				<button
					onclick={prev}
					class="absolute left-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
					aria-label="Photo précédente"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="15 18 9 12 15 6" />
					</svg>
				</button>

				<!-- Next -->
				<button
					onclick={next}
					class="absolute right-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
					aria-label="Photo suivante"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="9 18 15 12 9 6" />
					</svg>
				</button>
			{/if}

			<!-- Counter -->
			<div
				class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-mono text-micro text-white"
			>
				{selectedIndex + 1} / {photos.length}
			</div>
		</div>
	</div>
{/if}

<style>
	.photo-bg {
		background-image: repeating-linear-gradient(
			135deg,
			rgba(0, 0, 0, 0.06) 0 1px,
			transparent 1px 10px
		);
	}
</style>
