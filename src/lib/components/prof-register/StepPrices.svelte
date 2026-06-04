<script lang="ts">
	import { getProfRegisterCtx } from './context';

	const ctx = getProfRegisterCtx();

	const EXAMPLES = [
		{ description: 'Cours découverte · kitesurf', duration: '2h', priceEur: 80 },
		{ description: 'Cours individuel · kitesurf', duration: '1h30', priceEur: 90 },
		{ description: 'Cours en duo · kitesurf', duration: '2h', priceEur: 65 },
		{ description: 'Stage 5 jours · kitesurf', duration: '5 jours', priceEur: 400 },
		{ description: 'Pack 5 cours · kitesurf', duration: '5×1h30', priceEur: 380 },
		{ description: 'Cours découverte · wingfoil', duration: '2h', priceEur: 90 },
		{ description: 'Cours individuel · wingfoil', duration: '1h30', priceEur: 100 },
		{ description: 'Cours en duo · wingfoil', duration: '2h', priceEur: 70 },
		{ description: 'Stage 5 jours · wingfoil', duration: '5 jours', priceEur: 450 },
		{ description: 'Pack 5 cours · wingfoil', duration: '5×1h30', priceEur: 420 },
		{ description: 'Cours découverte · windsurf', duration: '2h', priceEur: 75 },
		{ description: 'Cours individuel · windsurf', duration: '1h30', priceEur: 85 },
		{ description: 'Cours en duo · windsurf', duration: '2h', priceEur: 60 },
		{ description: 'Stage 5 jours · windsurf', duration: '5 jours', priceEur: 380 },
		{ description: 'Pack 5 cours · windsurf', duration: '5×1h30', priceEur: 350 }
	];

	let dropdownOpen = $state(false);
	let selected = $state(new Set<number>());
	let triggerEl: HTMLButtonElement | null = $state(null);
	let dropdownPos = $state({ top: 0, left: 0 });

	function openDropdown() {
		if (triggerEl) {
			const rect = triggerEl.getBoundingClientRect();
			dropdownPos = { top: rect.bottom + 6, left: rect.left };
		}
		dropdownOpen = !dropdownOpen;
	}

	function toggleExample(i: number) {
		const next = new Set(selected);
		if (next.has(i)) next.delete(i);
		else next.add(i);
		selected = next;
	}

	function addSelected() {
		for (const i of selected) {
			ctx.data.prices.push({ ...EXAMPLES[i] });
		}
		selected = new Set();
		dropdownOpen = false;
	}

	function addPrice() {
		ctx.data.prices.push({ description: '', duration: '', priceEur: 0 });
	}

	function removePrice(idx: number) {
		ctx.data.prices.splice(idx, 1);
	}
</script>

<div class="grid gap-5.5">
	<!-- Pricing table -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ GRILLE TARIFAIRE INDICATIVE *
		</div>
		<div class="mb-3 font-mono text-label tracking-loose text-muted uppercase">
			⌥ Tarifs négociables en direct — Windprof ne prend aucune commission
		</div>
		{#if ctx.errors.prices}
			<p class="mb-2 font-mono text-label text-red-500">{ctx.errors.prices}</p>
		{/if}
		{#if ctx.errors.pricesDesc}
			<p class="mb-2 font-mono text-label text-red-500">{ctx.errors.pricesDesc}</p>
		{/if}
		<div class="overflow-hidden overflow-x-auto rounded-[10px] border border-line">
			{#each ctx.data.prices as row, i (i)}
				<div
					class="grid items-center gap-3 px-5 py-3.5 {i < ctx.data.prices.length - 1
						? 'border-b border-line'
						: ''}"
					style="grid-template-columns: 2fr 1fr 1fr auto"
				>
					<input
						type="text"
						placeholder="Cours individuel · kitesurf"
						bind:value={row.description}
						class="border-none bg-transparent p-0 font-sans text-[14px] font-semibold outline-none {ctx
							.errors.pricesDesc && !row.description.trim()
							? 'text-red-400 placeholder:text-red-300'
							: 'text-ink'}"
					/>
					<input
						type="text"
						placeholder="1h30"
						bind:value={row.duration}
						class="rounded-[4px] border border-line bg-white px-2.5 py-1.5 font-mono text-caption tracking-wide text-muted outline-none"
					/>
					<div class="flex items-center justify-end gap-1.5">
						<input
							type="number"
							min="0"
							bind:value={row.priceEur}
							class="w-20 rounded-[4px] border border-line bg-white px-2.5 py-1.5 text-right font-display text-[18px] font-black tracking-tight outline-none"
						/>
						<span class="font-display text-[18px] font-black tracking-tight text-muted">€</span>
					</div>
					<button
						type="button"
						onclick={() => removePrice(i)}
						class="cursor-pointer font-mono text-label tracking-loose text-muted uppercase"
						>X</button
					>
				</div>
			{/each}
			<div class="border-t border-line bg-bg-dark px-5 py-3.5">
				<div class="mb-3 flex items-center gap-2">
					<!-- Multiselect dropdown -->
					<div>
						{#if dropdownOpen}
							<div
								class="fixed inset-0 z-40"
								role="presentation"
								onclick={() => (dropdownOpen = false)}
								onkeydown={() => (dropdownOpen = false)}
							></div>
							<div
								class="fixed z-50 max-h-52 min-w-56 overflow-y-auto rounded-[8px] border border-line bg-white shadow-md"
								style="top: {dropdownPos.top}px; left: {dropdownPos.left}px"
							>
								{#each EXAMPLES as ex, i}
									<label
										class="flex cursor-pointer items-center gap-3 px-4 py-2.5 transition-colors hover:bg-bg-dark {i <
										EXAMPLES.length - 1
											? 'border-b border-line'
											: ''}"
									>
										<input
											type="checkbox"
											checked={selected.has(i)}
											onchange={() => toggleExample(i)}
											class="accent-ink"
										/>
										<span class="font-mono text-label tracking-wide text-ink">
											{ex.description}
										</span>
										<span class="ml-auto pl-4 font-mono text-[10.5px] text-muted">
											{ex.duration} · {ex.priceEur}€
										</span>
									</label>
								{/each}
							</div>
						{/if}
						<button
							type="button"
							bind:this={triggerEl}
							onclick={openDropdown}
							class="flex cursor-pointer items-center gap-2 rounded-md border border-line bg-white px-3 py-1.5 font-mono text-label tracking-wide text-muted transition-colors hover:border-ink hover:text-ink"
						>
							<span>
								{selected.size > 0
									? `${selected.size} formule${selected.size > 1 ? 's' : ''} sélectionnée${selected.size > 1 ? 's' : ''}`
									: 'Ajouter depuis les exemples'}
							</span>
							<span class="text-[9px]">{dropdownOpen ? '▲' : '▼'}</span>
						</button>
					</div>
					<!-- Add button -->
					<button
						type="button"
						onclick={addSelected}
						disabled={selected.size === 0}
						class="rounded-[6px] border px-3 py-1.5 font-mono text-[11px] font-bold tracking-wide uppercase transition-colors {selected.size >
						0
							? 'cursor-pointer border-ink bg-ink text-white'
							: 'cursor-not-allowed border-line bg-transparent text-muted opacity-40'}"
					>
						+ Ajouter{selected.size > 0 ? ` (${selected.size})` : ''}
					</button>
				</div>
				<button
					type="button"
					onclick={addPrice}
					class="cursor-pointer font-mono text-[11.5px] font-bold tracking-loose text-muted uppercase"
				>
					+ Ajouter une formule vide
				</button>
			</div>
		</div>
	</div>

	<!-- Website / Instagram -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ SITE PERSO / INSTAGRAM
		</div>
		<div class="mb-2 font-mono text-[10.5px] tracking-wide text-muted">
			Optionnel — affiché en bas de ta fiche publique
		</div>
		<div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
			<input
				type="text"
				bind:value={ctx.data.websites[0]}
				placeholder="https://…"
				class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink transition-all outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
			/>
			<input
				type="text"
				bind:value={ctx.data.websites[1]}
				placeholder="@pseudo"
				class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink transition-all outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
			/>
		</div>
	</div>
</div>
