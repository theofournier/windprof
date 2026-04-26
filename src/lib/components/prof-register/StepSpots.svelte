<div class="grid gap-5.5">
	<!-- City + region -->
	<div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
		<div>
			<label for="city" class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase">
				↳ VILLE D'ENSEIGNEMENT PRINCIPALE *
			</label>
			<div class="mb-1.5 font-mono text-[10.5px] tracking-wide text-muted">
				Sert au filtre de recherche par région
			</div>
			<input
				id="city"
				type="text"
				value="Leucate"
				class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
			/>
		</div>
		<div>
			<label for="region" class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase">
				↳ DÉPARTEMENT / RÉGION
			</label>
			<div class="mb-1.5 font-mono text-[10.5px] tracking-wide text-muted">&nbsp;</div>
			<input
				id="region"
				type="text"
				value="Aude — Occitanie"
				class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
			/>
		</div>
	</div>

	<!-- Spots list -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ SPOTS HABITUELS *
		</div>
		<div class="mb-3 font-mono text-label tracking-loose text-muted uppercase">
			⌥ Saisie libre en MVP 1 — la carte interactive arrive en MVP 2 (avec météo temps réel par spot)
		</div>
		<div class="mb-3 flex flex-col gap-2">
			{#each [
				{ name: 'Leucate — La Franqui', primary: true },
				{ name: 'La Palme', primary: false },
				{ name: 'Gruissan', primary: false }
			] as spot, i (spot.name)}
				<div
					class="grid items-center gap-3.5 rounded-lg border border-line bg-white px-4.5 py-3.5"
					style="grid-template-columns: auto 1fr auto auto"
				>
					<span class="h-2.5 w-2.5 rounded-full {i === 0 ? 'bg-accent' : 'bg-muted'}"></span>
					<input
						type="text"
						value={spot.name}
						class="border-none bg-transparent p-0 font-sans text-[15px] font-semibold text-ink outline-none"
					/>
					{#if spot.primary}
						<span class="inline-flex items-center gap-1.5 rounded-[4px] bg-bg-dark px-2.5 py-1 font-mono text-label font-semibold tracking-[0.04em] uppercase">
							Principal
						</span>
					{:else}
						<span></span>
					{/if}
					<button type="button" class="cursor-pointer font-mono text-label tracking-loose text-muted underline uppercase">
						Retirer
					</button>
				</div>
			{/each}
		</div>
		<button type="button" class="inline-flex cursor-pointer items-center gap-2.5 rounded-md border-[1.5px] border-ink bg-transparent px-4.5 py-3 font-display text-body-sm font-bold tracking-wide text-ink uppercase hover:opacity-80">
			+ Ajouter un spot
		</button>
	</div>

	<!-- Equipment -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ MATÉRIEL FOURNI
		</div>
		<div class="mb-2 font-mono text-[10.5px] tracking-wide text-muted">
			Si non, le rider amène son propre matériel
		</div>
		<div class="mb-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
			<div class="cursor-pointer rounded-[10px] border border-ink bg-white p-4.5">
				<div class="mb-1.5 flex items-center gap-2.5">
					<span class="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent text-label font-bold text-white">●</span>
					<span class="text-[14px] font-bold">Oui — matériel fourni</span>
				</div>
				<div class="pl-7 text-caption text-muted">Aile, planche, harnais, combi inclus</div>
			</div>
			<div class="cursor-pointer rounded-[10px] border border-line bg-bg-card p-4.5">
				<div class="flex items-center gap-2.5">
					<span class="h-4.5 w-4.5 rounded-full border-[1.5px] border-line"></span>
					<span class="text-[14px] font-semibold text-muted">Non — rider apporte son matos</span>
				</div>
			</div>
		</div>
		<input
			type="text"
			value="North Kiteboarding 2024 — tailles 7 / 9 / 12 m²"
			placeholder="Note optionnelle — ex : « North Kiteboarding 2024, tailles 7/9/12 »"
			class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
		/>
	</div>
</div>
