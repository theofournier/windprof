<aside class="rounded-[10px] border border-ink/14 bg-white px-6 py-5.5 lg:sticky lg:top-5 lg:self-start">
	<div class="mb-1 flex items-center justify-between">
		<h3 class="m-0 text-lg">Trier</h3>
		<button
			class="cursor-pointer font-mono text-label font-bold tracking-wide text-accent uppercase"
			>Reset</button
		>
	</div>

	<div class="border-t border-ink/14 py-4.5">
		<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
			<input type="radio" name="niveau" class="sr-only" />
			<span class="size-4 rounded-full border-[1.5px] border-muted"></span>
			Pertinence
		</label>
		<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
			<input type="radio" name="niveau" checked class="sr-only" />
			<span class="size-4 rounded-full border-[1.5px] border-accent bg-accent"></span>
			Note
		</label>
		<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
			<input type="radio" name="niveau" class="sr-only" />
			<span class="size-4 rounded-full border-[1.5px] border-muted"></span>
			Tarif
		</label>
		<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
			<input type="radio" name="niveau" class="sr-only" />
			<span class="size-4 rounded-full border-[1.5px] border-muted"></span>
			Vent
		</label>
	</div>

	<div class="mb-1 flex items-center justify-between">
		<h3 class="m-0 text-lg">Filtres</h3>
		<button
			class="cursor-pointer font-mono text-label font-bold tracking-wide text-accent uppercase"
			>Reset</button
		>
	</div>

	<div class="border-t border-ink/14 py-4.5">
		<div class="mb-3 font-mono text-micro font-semibold tracking-label text-muted uppercase">
			DISCIPLINE
		</div>
		<label class="flex cursor-pointer items-center justify-between py-1.5">
			<input type="checkbox" checked class="sr-only" />
			<span class="flex items-center gap-2.5 text-sm">
				<span class="relative size-4 rounded-sm border-[1.5px] border-accent bg-accent">
					<span class="absolute -top-0.5 left-0.5 text-caption font-bold text-white">✓</span>
				</span>
				Kitesurf
			</span>
			<span class="font-mono text-label text-muted">28</span>
		</label>
		<label class="flex cursor-pointer items-center justify-between py-1.5">
			<input type="checkbox" class="sr-only" />
			<span class="flex items-center gap-2.5 text-sm">
				<span class="size-4 rounded-sm border-[1.5px] border-muted"></span>
				Wingfoil
			</span>
			<span class="font-mono text-label text-muted">14</span>
		</label>
		<label class="flex cursor-pointer items-center justify-between py-1.5">
			<input type="checkbox" class="sr-only" />
			<span class="flex items-center gap-2.5 text-sm">
				<span class="size-4 rounded-sm border-[1.5px] border-muted"></span>
				Windsurf
			</span>
			<span class="font-mono text-label text-muted">9</span>
		</label>
	</div>

	<div class="border-t border-ink/14 py-4.5">
		<div class="mb-3 font-mono text-micro font-semibold tracking-label text-muted uppercase">
			NIVEAU
		</div>
		<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
			<input type="radio" name="niveau" class="sr-only" />
			<span class="size-4 rounded-full border-[1.5px] border-muted"></span>
			Débutant
		</label>
		<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
			<input type="radio" name="niveau" checked class="sr-only" />
			<span class="size-4 rounded-full border-[1.5px] border-accent bg-accent"></span>
			Intermédiaire
		</label>
		<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
			<input type="radio" name="niveau" class="sr-only" />
			<span class="size-4 rounded-full border-[1.5px] border-muted"></span>
			Avancé
		</label>
		<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
			<input type="radio" name="niveau" class="sr-only" />
			<span class="size-4 rounded-full border-[1.5px] border-muted"></span>
			Tous niveaux
		</label>
	</div>

	<div class="border-t border-ink/14 py-4.5">
		<div class="mb-3 font-mono text-micro font-semibold tracking-label text-muted uppercase">
			TARIF / HEURE
		</div>
		<div class="mb-2 flex justify-between font-mono text-caption text-muted">
			<span>40€</span><span>100€</span>
		</div>
		<div class="relative mb-2.5 h-1 rounded-full bg-ink/14">
			<div class="absolute inset-y-0 right-[35%] left-[15%] rounded-full bg-accent"></div>
			<div
				class="absolute -top-1 left-[15%] size-3 -translate-x-1/2 rounded-full border-2 border-accent bg-white"
			></div>
			<div
				class="absolute -top-1 right-[35%] size-3 translate-x-1/2 rounded-full border-2 border-accent bg-white"
			></div>
		</div>
		<div class="font-mono text-label tracking-loose text-muted uppercase">
			SÉLECTION : 49€ – 75€
		</div>
	</div>

	<div class="border-t border-ink/14 py-4.5">
		<div class="mb-3 font-mono text-micro font-semibold tracking-label text-muted uppercase">
			OPTIONS
		</div>
		<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-sm">
			<input type="checkbox" checked class="sr-only" />
			<span class="relative h-4.5 w-7.5 rounded-full bg-accent transition-colors">
				<span class="absolute top-0.5 left-[14px] size-[14px] rounded-full bg-white shadow-sm"
				></span>
			</span>
			Matériel fourni
		</label>
		<label class="flex cursor-pointer items-center gap-2.5 py-[5px] text-sm">
			<input type="checkbox" checked class="sr-only" />
			<span class="relative h-[18px] w-[30px] rounded-full bg-accent transition-colors">
				<span class="absolute top-[2px] left-[14px] size-[14px] rounded-full bg-white shadow-sm"
				></span>
			</span>
			Diplôme vérifié
		</label>
	</div>

	<div class="border-t border-ink/14 py-[18px]">
		<div class="mb-3 font-mono text-micro font-semibold tracking-label text-muted uppercase">
			LANGUES
		</div>
		<div class="flex flex-wrap gap-1.5">
			<span
				class="cursor-pointer rounded-sm border border-ink bg-ink px-[11px] py-[5px] font-mono text-label font-bold tracking-loose text-white"
				>FR</span
			>
			<span
				class="cursor-pointer rounded-sm border border-ink bg-ink px-[11px] py-[5px] font-mono text-label font-bold tracking-loose text-white"
				>EN</span
			>
			<span
				class="cursor-pointer rounded-sm border border-ink/14 px-[11px] py-[5px] font-mono text-label font-bold tracking-loose text-ink"
				>ES</span
			>
			<span
				class="cursor-pointer rounded-sm border border-ink/14 px-[11px] py-[5px] font-mono text-label font-bold tracking-loose text-ink"
				>IT</span
			>
			<span
				class="cursor-pointer rounded-sm border border-ink/14 px-[11px] py-[5px] font-mono text-label font-bold tracking-loose text-ink"
				>DE</span
			>
			<span
				class="cursor-pointer rounded-sm border border-ink/14 px-[11px] py-[5px] font-mono text-label font-bold tracking-loose text-ink"
				>NL</span
			>
		</div>
	</div>

	<div class="mt-[18px]">
		<button
			class="inline-flex w-full cursor-pointer items-center justify-center rounded-sm bg-accent px-6 py-3.5 font-display text-body-sm font-bold tracking-[0.04em] text-white uppercase"
		>
			Appliquer · 48 résultats
		</button>
	</div>
</aside>
