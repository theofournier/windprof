<div class="grid items-start gap-8" style="grid-template-columns: 180px 1fr">
	<!-- Photo upload -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ PHOTO · OPTIONNEL
		</div>
		<div
			class="relative overflow-hidden rounded-full border-[1.5px] border-dashed border-muted"
			style="width: 160px; height: 160px;"
		>
			<div class="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-white/55">
				<span class="text-[26px]">↑</span>
				<span class="font-mono text-[9.5px] tracking-wider text-muted uppercase">UPLOAD</span>
			</div>
		</div>
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
					value="Léa"
					class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
				/>
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
					value="Berthet"
					class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
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
					class="w-full appearance-none rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
					style="background-image: linear-gradient(45deg, transparent 50%, #6F7785 50%), linear-gradient(135deg, #6F7785 50%, transparent 50%); background-position: calc(100% - 18px) 18px, calc(100% - 13px) 18px; background-size: 5px 5px; background-repeat: no-repeat; padding-right: 38px;"
				>
					{#each Array.from({ length: 60 }, (_, i) => 2010 - i) as year (year)}
						<option value={year} selected={year === 1995}>{year}</option>
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
					value="Montpellier"
					class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
				/>
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
				class="w-full resize-y rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] leading-body text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
				>Je ride depuis 4 ans en wing, plutôt en mode vacances. Cette année je veux passer le cap du foil propre.</textarea
			>
		</div>
	</div>
</div>
