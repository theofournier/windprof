<script lang="ts">
	import { getRiderRegisterCtx } from './context';

	const ctx = getRiderRegisterCtx();

	let fileInput: HTMLInputElement;
	let previewUrl = $state<string | null>(ctx.data.existingPhotoUrl ?? null);

	function handleFileChange(e: Event) {
		const file = (e.currentTarget as HTMLInputElement).files?.[0] ?? null;
		if (!file) return;
		ctx.data.photoFile = file;
		previewUrl = URL.createObjectURL(file);
	}
</script>

<div class="grid grid-cols-1 items-start gap-8 sm:grid-cols-[180px_1fr]">
	<!-- Photo upload -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ PHOTO · OPTIONNEL
		</div>
		<button
			type="button"
			class="relative cursor-pointer overflow-hidden rounded-full border-[1.5px] border-dashed border-muted focus:ring-2 focus:ring-accent focus:outline-none"
			style="width: 160px; height: 160px;"
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
					class="absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-full bg-black/30 opacity-0 transition-opacity hover:opacity-100"
				>
					<span class="text-[22px] text-white">↑</span>
					<span class="font-mono text-[9px] tracking-wider text-white uppercase">CHANGER</span>
				</div>
			{:else}
				<div class="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-white/55">
					<span class="text-[26px]">↑</span>
					<span class="font-mono text-[9.5px] tracking-wider text-muted uppercase">UPLOAD</span>
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
			Aide le moniteur à te reconnaître sur le spot.
		</div>
	</div>

	<!-- Fields -->
	<div class="grid gap-4.5">
		<!-- Name row -->
		<div class="grid grid-cols-2 gap-3.5">
			<div>
				<label
					for="rider-prenom"
					class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase"
				>
					↳ PRÉNOM *
				</label>
				<input
					id="rider-prenom"
					type="text"
					placeholder="Léa"
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
					for="rider-nom"
					class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase"
				>
					↳ NOM
					<span class="font-sans text-label font-normal tracking-normal text-muted normal-case"
						>— optionnel</span
					>
				</label>
				<input
					id="rider-nom"
					type="text"
					placeholder="Berthet"
					bind:value={ctx.data.lastName}
					class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink transition-all outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
				/>
			</div>
		</div>

		<!-- Birth year + city -->
		<div class="grid grid-cols-2 gap-3.5">
			<div>
				<label
					for="rider-birth"
					class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase"
				>
					↳ ANNÉE DE NAISSANCE
					<span class="font-sans text-label font-normal tracking-normal text-muted normal-case"
						>— aide à adapter le coaching</span
					>
				</label>
				<select
					id="rider-birth"
					bind:value={ctx.data.birthYear}
					class="w-full appearance-none rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink transition-all outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
					style="background-image: linear-gradient(45deg, transparent 50%, #6F7785 50%), linear-gradient(135deg, #6F7785 50%, transparent 50%); background-position: calc(100% - 18px) 18px, calc(100% - 13px) 18px; background-size: 5px 5px; background-repeat: no-repeat; padding-right: 38px;"
				>
					{#each Array.from({ length: 60 }, (_, i) => 2010 - i) as year (year)}
						<option value={year}>{year}</option>
					{/each}
				</select>
			</div>
			<div>
				<label
					for="rider-city"
					class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase"
				>
					↳ VILLE DE RÉSIDENCE *
				</label>
				<input
					id="rider-city"
					type="text"
					placeholder="Montpellier"
					bind:value={ctx.data.city}
					class="w-full rounded-md border bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink transition-all outline-none focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)] {ctx
						.errors.city
						? 'border-red-400 focus:border-red-400'
						: 'border-line focus:border-ink'}"
				/>
				{#if ctx.errors.city}
					<p class="mt-1.5 font-mono text-label text-red-500">{ctx.errors.city}</p>
				{/if}
			</div>
		</div>

		<!-- Bio -->
		<div>
			<label
				for="rider-bio"
				class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase"
			>
				↳ QUELQUES MOTS SUR TOI
				<span class="font-sans text-label font-normal tracking-normal text-muted normal-case"
					>— optionnel</span
				>
			</label>
			<div class="mb-1.5 font-mono text-[10.5px] tracking-wide text-muted">
				Visible uniquement par le moniteur quand tu le contactes
			</div>
			<textarea
				id="rider-bio"
				rows={3}
				placeholder="Pratique régulière, en famille, en stage l'été…"
				bind:value={ctx.data.bio}
				class="w-full resize-y rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] leading-body text-ink transition-all outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
			></textarea>
		</div>
	</div>
</div>
