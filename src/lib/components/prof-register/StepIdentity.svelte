<div class="grid items-start gap-8" style="grid-template-columns: 220px 1fr">
	<!-- Photo upload -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ PHOTO DE PROFIL *
		</div>
		<div
			class="relative overflow-hidden rounded-full border-[1.5px] border-dashed border-muted"
			style="width: 200px; height: 200px;"
		>
			<div class="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/55">
				<span class="text-[30px]">↑</span>
				<span class="font-mono text-micro tracking-wider text-muted uppercase">UPLOAD JPG / PNG</span>
				<span class="font-mono text-[9px] tracking-wide text-muted">min 600×600 · 5 Mo max</span>
			</div>
		</div>
		<div class="mt-2.5 font-mono text-[10.5px] leading-relaxed tracking-wide text-muted">
			Recadrage automatique. Évite la photo de groupe.
		</div>
	</div>

	<!-- Fields -->
	<div class="grid gap-4.5">
		<!-- Name row -->
		<div class="grid grid-cols-2 gap-3.5">
			<div>
				<label for="prenom" class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase">
					↳ PRÉNOM *
				</label>
				<input
					id="prenom"
					type="text"
					placeholder="Julien"
					value="Julien"
					class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
				/>
			</div>
			<div>
				<label for="nom" class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase">
					↳ NOM *
				</label>
				<input
					id="nom"
					type="text"
					placeholder="Mercier"
					value="Mercier"
					class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
				/>
			</div>
		</div>

		<!-- Bio -->
		<div>
			<label for="bio" class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase">
				↳ BIO · PRÉSENTATION LIBRE
			</label>
			<textarea
				id="bio"
				rows={5}
				placeholder="Trois phrases qui résument ton approche, ton style, ce qui te différencie…"
				class="w-full resize-y rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] leading-body text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
				>Moniteur indépendant depuis 12 ans, spécialisé dans la progression des riders intermédiaires. Je bosse en petit comité (max 3 personnes) pour garder le temps à l'eau au maximum. BPJEPS + IKO Level 3.</textarea
			>
			<div class="mt-1 text-right font-mono text-[10.5px] tracking-wide text-muted">187 / 300</div>
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
				{#each [
					{ l: 'Français', on: true },
					{ l: 'English', on: true },
					{ l: 'Español', on: true },
					{ l: 'Deutsch', on: false },
					{ l: 'Italiano', on: false },
					{ l: 'Nederlands', on: false }
				] as lang}
					<span class="inline-flex cursor-pointer items-center gap-1.5 rounded-[4px] px-2.5 py-1 font-mono text-label font-semibold tracking-[0.04em] uppercase {lang.on ? 'bg-ink text-white' : 'border border-line bg-transparent'}">
						{lang.on ? '✓ ' : ''}{lang.l}
					</span>
				{/each}
			</div>
		</div>
	</div>
</div>
