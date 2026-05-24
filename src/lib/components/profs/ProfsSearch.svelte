<script lang="ts">
	let {
		location = $bindable(''),
		sports = $bindable([]),
		levels = $bindable([])
	}: {
		location?: string;
		sports?: string[];
		levels?: string[];
	} = $props();

	const sportOptions = [
		{ value: 'kitesurf', label: 'Kitesurf' },
		{ value: 'wingfoil', label: 'Wingfoil' },
		{ value: 'windsurf', label: 'Windsurf' }
	];

	const levelOptions = [
		{ value: 'beginner', label: 'Débutant' },
		{ value: 'intermediate', label: 'Intermédiaire' },
		{ value: 'advanced', label: 'Avancé' }
	];

	let sportOpen = $state(false);
	let levelOpen = $state(false);

	function toggleSport(value: string) {
		sports = sports.includes(value) ? sports.filter((s) => s !== value) : [...sports, value];
	}

	function toggleLevel(value: string) {
		levels = levels.includes(value) ? levels.filter((l) => l !== value) : [...levels, value];
	}

	function getSelectedLabel(
		options: { value: string; label: string }[],
		selected: string[]
	): string | null {
		if (!selected.length) return null;
		return options
			.filter((o) => selected.includes(o.value))
			.map((o) => o.label)
			.join(', ');
	}

	let sportLabel = $derived(getSelectedLabel(sportOptions, sports));
	let levelLabel = $derived(getSelectedLabel(levelOptions, levels));
</script>

{#snippet label(text: string)}
	<span class="font-mono text-label font-medium tracking-wider text-muted uppercase">{text}</span>
{/snippet}

{#snippet multiSelect(
	labelText: string,
	options: { value: string; label: string }[],
	selected: string[],
	selectedLabel: string | null,
	placeholder: string,
	isOpen: boolean,
	onToggle: (value: string) => void,
	setOpen: (v: boolean) => void
)}
	{@render label(labelText)}
	<div class="relative">
		<button
			type="button"
			onclick={() => setOpen(!isOpen)}
			class="relative z-50 flex w-full min-w-0 cursor-pointer items-center gap-1 text-left font-sans text-[15px] font-medium outline-none"
		>
			<span class="min-w-0 flex-1 truncate {selectedLabel ? 'text-ink' : 'text-muted/60'}">
				{selectedLabel ?? placeholder}
			</span>
			<svg
				class="shrink-0 text-muted/60 transition-transform {isOpen ? 'rotate-180' : ''}"
				width="14"
				height="14"
				viewBox="0 0 14 14"
				fill="none"
				aria-hidden="true"
			>
				<path
					d="M3 5L7 9L11 5"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
		{#if isOpen}
			<div
				class="fixed inset-0 z-40"
				onclick={() => setOpen(false)}
				role="presentation"
				aria-hidden="true"
			></div>
			<div
				class="absolute top-full left-0 z-60 mt-2 min-w-48 overflow-hidden rounded-lg border border-line bg-white shadow-md"
			>
				{#each options as opt (opt.value)}
					{@const checked = selected.includes(opt.value)}
					<label
						class="flex cursor-pointer items-center gap-3 px-3 py-2.5 transition-colors hover:bg-bg"
					>
						<input type="checkbox" class="sr-only" {checked} onchange={() => onToggle(opt.value)} />
						<span
							class="flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors {checked
								? 'border-accent bg-accent'
								: 'border-muted/40 bg-white'}"
						>
							{#if checked}
								<svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
									<path
										d="M1 4L3.5 6.5L9 1"
										stroke="white"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							{/if}
						</span>
						<span class="font-sans text-sm font-medium {checked ? 'text-ink' : 'text-muted'}"
							>{opt.label}</span
						>
					</label>
				{/each}
			</div>
		{/if}
	</div>
{/snippet}

<div
	class="grid grid-cols-1 items-stretch gap-2 rounded-xl bg-white p-2 shadow-md sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto]"
>
	<div class="flex flex-col gap-0.75 border-b border-line px-4 py-3 sm:border-r sm:border-b-0">
		{@render label('SPOT')}
		<input
			type="text"
			class="w-full bg-transparent font-sans text-[15px] font-medium text-ink outline-none placeholder:font-normal placeholder:text-muted/60"
			placeholder="Ex: Leucate, Aude"
			bind:value={location}
		/>
	</div>
	<div class="flex flex-col gap-0.75 border-b border-line px-4 py-3 sm:border-r sm:border-b-0">
		{@render multiSelect(
			'DISCIPLINE',
			sportOptions,
			sports,
			sportLabel,
			'Toutes disciplines',
			sportOpen,
			toggleSport,
			(v) => {
				sportOpen = v;
				if (v) levelOpen = false;
			}
		)}
	</div>
	<div class="flex flex-col gap-0.75 px-4 py-3">
		{@render multiSelect(
			'NIVEAU',
			levelOptions,
			levels,
			levelLabel,
			'Tous niveaux',
			levelOpen,
			toggleLevel,
			(v) => {
				levelOpen = v;
				if (v) sportOpen = false;
			}
		)}
	</div>
	<button
		class="inline-flex cursor-pointer items-center justify-center rounded-lg bg-accent px-6 py-3 font-display text-sm font-black tracking-tight text-white uppercase transition-opacity hover:opacity-90"
	>
		Chercher →
	</button>
</div>
