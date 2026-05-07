<script lang="ts">
	let {
		regions = $bindable<string[]>([]),
		waterTypes = $bindable<string[]>([]),
		disciplines = $bindable<string[]>([]),
		windDirs = $bindable<string[]>([]),
		windMin = $bindable(0),
		windMax = $bindable(40),
		resultCount = 0,
		onreset
	}: {
		regions?: string[];
		waterTypes?: string[];
		disciplines?: string[];
		windDirs?: string[];
		windMin?: number;
		windMax?: number;
		resultCount?: number;
		onreset?: () => void;
	} = $props();

	const ALL_REGIONS = [
		{ l: 'Occitanie', n: 38 },
		{ l: 'PACA', n: 29 },
		{ l: 'Bretagne', n: 31 },
		{ l: 'Aquitaine', n: 18 },
		{ l: 'Hauts-de-France', n: 9 },
		{ l: 'Étranger', n: 37 }
	];
	const ALL_WATER = ['Mer plate', 'Mer · clapot', 'Vagues', 'Lagune flat', 'Lac'];
	const ALL_DISC = ['Kitesurf', 'Wingfoil', 'Windsurf'];
	const ALL_DIRS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

	function toggle(arr: string[], item: string): string[] {
		return arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item];
	}
</script>

<aside class="self-start rounded-[10px] border border-line bg-white p-6 lg:sticky lg:top-5">
	<div class="mb-1 flex items-center justify-between">
		<h3 class="m-0 font-display text-[18px] font-black">Filtres</h3>
		<button
			onclick={onreset}
			class="cursor-pointer border-none bg-transparent p-0 font-mono text-[11px] font-bold tracking-wide text-accent uppercase"
		>
			Reset
		</button>
	</div>

	<!-- Région -->
	<div class="border-t border-line py-4.5">
		<div class="mb-3 font-mono text-[10.5px] font-semibold tracking-label text-muted uppercase">
			RÉGION
		</div>
		{#each ALL_REGIONS as reg}
			<label class="flex cursor-pointer items-center justify-between py-1.5">
				<span class="flex items-center gap-2.5 text-[13.5px]">
					<span
						class="relative h-4 w-4 flex-shrink-0 rounded-sm border-[1.5px] {regions.includes(reg.l)
							? 'border-accent bg-accent'
							: 'border-muted bg-transparent'}"
					>
						{#if regions.includes(reg.l)}
							<span class="absolute -top-0.5 left-0.5 text-caption font-bold leading-none text-white"
								>✓</span
							>
						{/if}
					</span>
					{reg.l}
				</span>
				<span class="font-mono text-[11px] text-muted">{reg.n}</span>
				<input
					type="checkbox"
					class="sr-only"
					checked={regions.includes(reg.l)}
					onchange={() => (regions = toggle(regions, reg.l))}
				/>
			</label>
		{/each}
	</div>

	<!-- Plan d'eau -->
	<div class="border-t border-line py-4.5">
		<div class="mb-3 font-mono text-[10.5px] font-semibold tracking-label text-muted uppercase">
			PLAN D'EAU
		</div>
		{#each ALL_WATER as w}
			<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-[13.5px]">
				<span
					class="h-4 w-4 flex-shrink-0 rounded-sm border-[1.5px] {waterTypes.includes(w)
						? 'border-accent bg-accent'
						: 'border-muted bg-transparent'}"
				></span>
				{w}
				<input
					type="checkbox"
					class="sr-only"
					checked={waterTypes.includes(w)}
					onchange={() => (waterTypes = toggle(waterTypes, w))}
				/>
			</label>
		{/each}
	</div>

	<!-- Orientation -->
	<div class="border-t border-line py-4.5">
		<div class="mb-3 font-mono text-[10.5px] font-semibold tracking-label text-muted uppercase">
			ORIENTATION DOMINANTE
		</div>
		<div class="flex flex-wrap gap-1.5">
			{#each ALL_DIRS as d}
				<button
					onclick={() => (windDirs = toggle(windDirs, d))}
					class="cursor-pointer rounded-sm border px-2.75 py-1.25 font-mono text-label font-bold tracking-loose transition-colors {windDirs.includes(
						d
					)
						? 'border-ink bg-ink text-white'
						: 'border-line bg-transparent text-ink'}"
				>
					{d}
				</button>
			{/each}
		</div>
	</div>

	<!-- Vent live range -->
	<div class="border-t border-line py-4.5">
		<div class="mb-3 font-mono text-[10.5px] font-semibold tracking-label text-muted uppercase">
			VENT LIVE (kt)
		</div>
		<div class="mb-2 flex justify-between font-mono text-caption text-muted">
			<span>0 kt</span><span>40 kt</span>
		</div>
		<div class="relative mb-2.5 h-1 rounded-full bg-line">
			<div
				class="absolute top-0 bottom-0 rounded-full bg-accent"
				style="left: {(windMin / 40) * 100}%; right: {((40 - windMax) / 40) * 100}%;"
			></div>
			<div
				class="absolute -top-1 h-3 w-3 rounded-full border-2 border-accent bg-white"
				style="left: calc({(windMin / 40) * 100}% - 6px);"
			></div>
			<div
				class="absolute -top-1 h-3 w-3 rounded-full border-2 border-accent bg-white"
				style="left: calc({(windMax / 40) * 100}% - 6px);"
			></div>
		</div>
		<div class="font-mono text-[11px] tracking-loose text-muted">
			SÉLECTION : {windMin} – {windMax} KT
		</div>
	</div>

	<!-- Discipline -->
	<div class="border-t border-line py-4.5">
		<div class="mb-3 font-mono text-[10.5px] font-semibold tracking-label text-muted uppercase">
			DISCIPLINE
		</div>
		{#each ALL_DISC as d}
			<label class="flex cursor-pointer items-center gap-2.5 py-1.25 text-[13.5px]">
				<span
					class="h-4 w-4 flex-shrink-0 rounded-sm border-[1.5px] {disciplines.includes(d)
						? 'border-accent bg-accent'
						: 'border-muted bg-transparent'}"
				></span>
				{d}
				<input
					type="checkbox"
					class="sr-only"
					checked={disciplines.includes(d)}
					onchange={() => (disciplines = toggle(disciplines, d))}
				/>
			</label>
		{/each}
	</div>

	<div class="mt-4.5">
		<button
			class="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-md border-none bg-accent px-5.5 py-3.5 font-display text-body-sm font-bold text-white uppercase tracking-wide transition-colors hover:bg-[#C85D3A]"
		>
			Appliquer · {resultCount} spots
		</button>
	</div>
</aside>
