<script lang="ts">
	import { getProfRegisterCtx } from './context';

	const ctx = getProfRegisterCtx();

	const LANGUAGES = ['Français', 'English', 'Español', 'Deutsch', 'Italiano', 'Nederlands'];

	function toggleLang(lang: string) {
		const idx = ctx.data.languages.indexOf(lang);
		if (idx >= 0) ctx.data.languages.splice(idx, 1);
		else ctx.data.languages.push(lang);
	}

	let fileInput: HTMLInputElement;
	let previewUrl = $state<string | null>(ctx.data.existingPhotoUrl ?? null);

	function handleFileChange(e: Event) {
		const file = (e.currentTarget as HTMLInputElement).files?.[0] ?? null;
		if (!file) return;
		ctx.data.photoFile = file;
		previewUrl = URL.createObjectURL(file);
	}
</script>

<div class="grid grid-cols-1 items-start gap-8 sm:grid-cols-[220px_1fr]">
	<!-- Photo upload -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ PHOTO DE PROFIL *
		</div>
		<button
			type="button"
			class="relative cursor-pointer overflow-hidden rounded-full border-[1.5px] border-dashed border-muted focus:ring-2 focus:ring-accent focus:outline-none"
			style="width: 200px; height: 200px;"
			onclick={() => fileInput.click()}
			aria-label="Choisir une photo de profil"
		>
			{#if previewUrl}
				<img
					src={previewUrl}
					alt={ctx.data.firstName || 'Aperçu'}
					class="absolute inset-0 h-full w-full rounded-full object-cover"
				/>
				<div
					class="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-full bg-black/30 opacity-0 transition-opacity hover:opacity-100"
				>
					<span class="text-[26px] text-white">↑</span>
					<span class="font-mono text-[9.5px] tracking-wider text-white uppercase">CHANGER</span>
				</div>
			{:else}
				<div class="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/55">
					<span class="text-[30px]">↑</span>
					<span class="font-mono text-micro tracking-wider text-muted uppercase"
						>UPLOAD JPG / PNG</span
					>
					<span class="font-mono text-[9px] tracking-wide text-muted">min 600×600 · 5 Mo max</span>
				</div>
			{/if}
		</button>
		<input
			bind:this={fileInput}
			type="file"
			accept="image/jpeg,image/png,image/webp"
			class="sr-only"
			onchange={handleFileChange}
		/>
		<div class="mt-2.5 font-mono text-[10.5px] leading-relaxed tracking-wide text-muted">
			Recadrage automatique. Évite la photo de groupe.
		</div>
	</div>

	<!-- Fields -->
	<div class="grid gap-4.5">
		<!-- Name row -->
		<div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
			<div>
				<label
					for="prenom"
					class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase"
				>
					↳ PRÉNOM *
				</label>
				<input
					id="prenom"
					type="text"
					placeholder="Julien"
					bind:value={ctx.data.firstName}
					class="w-full rounded-md border bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink transition-all outline-none focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)] {ctx
						.errors.firstName
						? 'border-red-400 focus:border-red-400'
						: 'border-line focus:border-ink'}"
				/>
				{#if ctx.errors.firstName}
					<p class="mt-1.5 font-mono text-label text-red-500">{ctx.errors.firstName}</p>
				{/if}
			</div>
			<div>
				<label
					for="nom"
					class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase"
				>
					↳ NOM *
				</label>
				<input
					id="nom"
					type="text"
					placeholder="Mercier"
					bind:value={ctx.data.lastName}
					class="w-full rounded-md border bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink transition-all outline-none focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)] {ctx
						.errors.lastName
						? 'border-red-400 focus:border-red-400'
						: 'border-line focus:border-ink'}"
				/>
				{#if ctx.errors.lastName}
					<p class="mt-1.5 font-mono text-label text-red-500">{ctx.errors.lastName}</p>
				{/if}
			</div>
		</div>

		<!-- Bio -->
		<div>
			<label
				for="bio"
				class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase"
			>
				↳ BIO · PRÉSENTATION LIBRE
			</label>
			<textarea
				id="bio"
				rows={5}
				placeholder="Trois phrases qui résument ton approche, ton style, ce qui te différencie…"
				bind:value={ctx.data.bio}
				maxlength={300}
				class="w-full resize-y rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] leading-body text-ink transition-all outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
			></textarea>
			<div class="mt-1 text-right font-mono text-[10.5px] tracking-wide text-muted">
				{ctx.data.bio.length} / 300
			</div>
			<div class="mt-1 font-mono text-[10.5px] tracking-wide text-muted">
				300 caractères max — c'est ce que les riders lisent en premier sur ta fiche
			</div>
		</div>

		<!-- Languages -->
		<div>
			<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
				↳ LANGUES PARLÉES
			</div>
			<div class="mb-1.5 font-mono text-[10.5px] tracking-wide text-muted">
				Optionnel — utile si tu enseignes en zone touristique
			</div>
			<div class="flex flex-wrap gap-1.5">
				{#each LANGUAGES as lang (lang)}
					{@const on = ctx.data.languages.includes(lang)}
					<span
						role="checkbox"
						aria-checked={on}
						tabindex="0"
						onclick={() => toggleLang(lang)}
						onkeydown={(e) => e.key === 'Enter' && toggleLang(lang)}
						class="inline-flex cursor-pointer items-center gap-1.5 rounded-[4px] px-2.5 py-1 font-mono text-label font-semibold tracking-[0.04em] uppercase {on
							? 'bg-ink text-white'
							: 'border border-line bg-transparent'}"
					>
						{on ? '✓ ' : ''}{lang}
					</span>
				{/each}
			</div>
		</div>
	</div>
</div>
