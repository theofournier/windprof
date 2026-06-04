<script lang="ts">
	import { getProfRegisterCtx } from './context';
	import { onDestroy, untrack } from 'svelte';

	type ExistingPhoto = { id: string; url: string };
	type GalleryItem =
		| { kind: 'existing'; id: string; url: string }
		| { kind: 'new'; file: File; url: string };

	export type GalleryState = {
		existingIds: string[]; // current order of kept existing photos
		deletedIds: string[];
		newFiles: File[];
	};

	let {
		existingPhotos = [],
		onGalleryChange
	}: {
		existingPhotos?: ExistingPhoto[];
		onGalleryChange?: (state: GalleryState) => void;
	} = $props();

	const ctx = getProfRegisterCtx();

	const MAX_PHOTOS = 10;

	let photos = $state<GalleryItem[]>(
		untrack(() => [
			...existingPhotos.map((p) => ({ kind: 'existing' as const, id: p.id, url: p.url })),
			...ctx.data.gallery.map((f) => ({
				kind: 'new' as const,
				file: f,
				url: URL.createObjectURL(f)
			}))
		])
	);

	let deletedIds = $state<string[]>([]);
	let dropZoneOver = $state(false);
	let fileInput = $state<HTMLInputElement>();

	// Reorder state
	let dragIndex = $state<number | null>(null);
	let dragOverIndex = $state<number | null>(null);

	function sync() {
		const newFiles = photos.filter((p): p is GalleryItem & { kind: 'new' } => p.kind === 'new');
		const existingInOrder = photos
			.filter((p): p is GalleryItem & { kind: 'existing' } => p.kind === 'existing')
			.map((p) => p.id);

		ctx.data.gallery = newFiles.map((p) => p.file);
		onGalleryChange?.({
			existingIds: existingInOrder,
			deletedIds,
			newFiles: newFiles.map((p) => p.file)
		});
	}

	function addFiles(files: FileList | null) {
		if (!files) return;
		const remaining = MAX_PHOTOS - photos.length;
		if (remaining <= 0) return;
		const toAdd = Array.from(files)
			.filter((f) => f.type.startsWith('image/'))
			.slice(0, remaining);
		for (const f of toAdd) {
			photos.push({ kind: 'new', file: f, url: URL.createObjectURL(f) });
		}
		sync();
	}

	function removePhoto(i: number) {
		const photo = photos[i];
		if (photo.kind === 'new') URL.revokeObjectURL(photo.url);
		else deletedIds.push(photo.id);
		photos.splice(i, 1);
		sync();
	}

	// Photo reorder handlers
	function onPhotoDragStart(e: DragEvent, i: number) {
		dragIndex = i;
		e.dataTransfer!.effectAllowed = 'move';
		e.dataTransfer!.setData('text/plain', String(i));
	}

	function onPhotoDragOver(e: DragEvent, i: number) {
		e.preventDefault();
		if (dragIndex === null || dragIndex === i) return;
		dragOverIndex = i;
		e.dataTransfer!.dropEffect = 'move';
	}

	function onPhotoDrop(e: DragEvent, i: number) {
		e.preventDefault();
		e.stopPropagation();
		if (dragIndex !== null && dragIndex !== i) {
			const [moved] = photos.splice(dragIndex, 1);
			photos.splice(i, 0, moved);
			sync();
		}
		dragIndex = null;
		dragOverIndex = null;
	}

	function onPhotoDragEnd() {
		dragIndex = null;
		dragOverIndex = null;
	}

	// File drop zone handlers
	function onZoneDrop(e: DragEvent) {
		e.preventDefault();
		dropZoneOver = false;
		if (dragIndex !== null) return;
		addFiles(e.dataTransfer?.files ?? null);
	}

	onDestroy(() => {
		for (const p of photos) {
			if (p.kind === 'new') URL.revokeObjectURL(p.url);
		}
	});
</script>

<div class="grid gap-6">
	<!-- Info card -->
	<div class="relative overflow-hidden rounded-[10px] bg-ink px-5.5 py-4.5">
		<div
			class="pointer-events-none absolute inset-0 opacity-50"
			style="background-image: repeating-linear-gradient(108deg, transparent 0 22px, rgba(255,255,255,.045) 22px 23px), repeating-linear-gradient(108deg, transparent 0 90px, rgba(255,255,255,.08) 90px 91px); mask-image: linear-gradient(95deg, transparent 0%, black 20%, black 80%, transparent 100%);"
		></div>
		<div class="relative">
			<div class="mb-2 font-mono text-label font-semibold tracking-widest text-accent uppercase">
				↳ TA GALERIE PHOTOS
			</div>
			<div class="max-w-135 text-[14px] leading-body text-white/85">
				Ajoute jusqu'à <b class="text-white">10 photos</b> de tes sessions, ton matériel ou tes spots.
				La première photo devient la couverture de ta galerie.
			</div>
		</div>
	</div>

	<!-- Counter -->
	<div>
		<div class="mb-2.5">
			<div class="font-mono text-label font-semibold tracking-widest text-accent uppercase">
				↳ PHOTOS · {photos.length} / {MAX_PHOTOS}
			</div>
		</div>

		<!-- Photo grid -->
		{#if photos.length > 0}
			<div
				role="list"
				class="mb-3.5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
			>
				{#each photos as photo, i (photo.kind === 'existing' ? photo.id : photo.url)}
					<div
						role="listitem"
						draggable="true"
						ondragstart={(e) => onPhotoDragStart(e, i)}
						ondragover={(e) => onPhotoDragOver(e, i)}
						ondrop={(e) => onPhotoDrop(e, i)}
						ondragend={onPhotoDragEnd}
						class="group relative overflow-hidden rounded-[10px] border bg-bg-dark transition-opacity {dragIndex ===
						i
							? 'opacity-40'
							: 'opacity-100'} {dragOverIndex === i && dragIndex !== i
							? 'border-accent ring-2 ring-accent/30'
							: 'border-line'}"
						style="aspect-ratio: 1; cursor: grab"
					>
						<img src={photo.url} alt="" class="h-full w-full object-cover" />
						<button
							type="button"
							onclick={() => removePhoto(i)}
							class="absolute top-1.5 right-1.5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-ink/80 font-mono text-label font-bold text-white opacity-0 transition-opacity group-hover:opacity-100"
							aria-label="Retirer la photo"
						>
							×
						</button>
						{#if i === 0}
							<div
								class="absolute bottom-1.5 left-1.5 rounded-sm bg-ink/80 px-1.5 py-0.5 font-mono text-[8px] font-bold tracking-widest text-white uppercase"
							>
								COUVERTURE
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}

		<!-- Drop zone -->
		{#if photos.length < MAX_PHOTOS}
			<div
				role="button"
				tabindex="0"
				ondrop={onZoneDrop}
				ondragover={(e) => {
					e.preventDefault();
					if (dragIndex === null) dropZoneOver = true;
				}}
				ondragleave={() => (dropZoneOver = false)}
				onclick={() => fileInput?.click()}
				onkeydown={(e) => e.key === 'Enter' && fileInput?.click()}
				class="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-[10px] border-[1.5px] border-dashed py-10 transition-colors {dropZoneOver
					? 'border-accent bg-accent/5'
					: 'border-muted bg-bg-card hover:border-ink/50'}"
			>
				<span class="text-[32px]">↑</span>
				<div class="text-center">
					<div class="font-mono text-label font-semibold tracking-wider text-ink uppercase">
						Glisse tes photos ici
					</div>
					<div class="mt-1 font-mono text-[10.5px] tracking-wide text-muted">
						JPG · PNG · WEBP · 10 Mo max · {MAX_PHOTOS - photos.length} emplacement{MAX_PHOTOS -
							photos.length >
						1
							? 's'
							: ''} restant{MAX_PHOTOS - photos.length > 1 ? 's' : ''}
					</div>
				</div>
			</div>
		{:else}
			<div
				class="rounded-[10px] bg-bg-dark px-4.5 py-4 text-center font-mono text-label tracking-wide text-muted uppercase"
			>
				Galerie complète · 10 / 10 photos
			</div>
		{/if}

		<input
			bind:this={fileInput}
			type="file"
			accept="image/*"
			multiple
			class="hidden"
			onchange={(e) => addFiles(e.currentTarget.files)}
		/>
	</div>

	<!-- Tip -->
	<div class="rounded-lg bg-bg-dark px-4.5 py-3.5 text-body-sm leading-relaxed text-muted">
		La <b class="text-ink">première photo</b> devient la couverture de ta galerie. Glisse pour réordonner.
		Formats acceptés : JPG, PNG, WEBP — 10 Mo max par photo.
	</div>
</div>
