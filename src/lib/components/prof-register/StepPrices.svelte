<script lang="ts">
	const prices = [
		{ d: 'Cours individuel · kite', dur: '1h30', p: 90 },
		{ d: 'Cours individuel · wing', dur: '2h', p: 110 },
		{ d: 'Stage 3 demi-journées', dur: '3×2h', p: 280 },
		{ d: 'Groupe (max 3)', dur: '2h', p: 70 }
	];
</script>

<div class="grid gap-5.5">
	<!-- Pricing table -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ GRILLE TARIFAIRE INDICATIVE *
		</div>
		<div class="mb-3 font-mono text-label tracking-loose text-muted uppercase">
			⌥ Tarifs négociables en direct — Windmatch ne prend aucune commission
		</div>
		<div class="overflow-x-auto overflow-hidden rounded-[10px] border border-line">
			{#each prices as row, i (row.d)}
				<div
					class="grid items-center gap-3 px-5 py-3.5 {i < prices.length - 1 ? 'border-b border-line' : ''}"
					style="grid-template-columns: 2fr 1fr 1fr auto"
				>
					<input
						type="text"
						value={row.d}
						class="border-none bg-transparent p-0 font-sans text-[14px] font-semibold text-ink outline-none"
					/>
					<input
						type="text"
						value={row.dur}
						class="rounded-[4px] border border-line bg-white px-2.5 py-1.5 font-mono text-caption tracking-wide text-muted outline-none"
					/>
					<div class="flex items-center justify-end gap-1.5">
						<input
							type="text"
							value={row.p}
							class="w-20 rounded-[4px] border border-line bg-white px-2.5 py-1.5 text-right font-display text-[18px] font-black tracking-tight outline-none"
						/>
						<span class="font-display text-[18px] font-black tracking-tight text-muted">€</span>
					</div>
					<button type="button" class="cursor-pointer font-mono text-label tracking-loose text-muted uppercase">×</button>
				</div>
			{/each}
			<div class="border-t border-line bg-bg-dark px-5 py-3.5">
				<button type="button" class="cursor-pointer font-mono text-[11.5px] font-bold tracking-loose text-muted uppercase">
					+ Ajouter une formule
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
				value="https://julien-kite.com"
				placeholder="https://…"
				class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
			/>
			<input
				type="text"
				value="@julien.kite.leucate"
				placeholder="@pseudo"
				class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
			/>
		</div>
	</div>
</div>
