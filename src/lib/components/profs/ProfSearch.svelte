<script lang="ts">
	let {
		location = $bindable(''),
		sports = $bindable([]),
		level = $bindable('')
	}: {
		location?: string;
		sports?: string[];
		level?: string;
	} = $props();

	const sportOptions = [
		{ value: '', label: 'Toutes disciplines' },
		{ value: 'kitesurf', label: 'Kitesurf' },
		{ value: 'wingfoil', label: 'Wingfoil' },
		{ value: 'windsurf', label: 'Windsurf' }
	];

	const levelOptions = [
		{ value: '', label: 'Tous niveaux' },
		{ value: 'beginner', label: 'Débutant' },
		{ value: 'intermediate', label: 'Intermédiaire' },
		{ value: 'advanced', label: 'Avancé' }
	];

	let sport = $derived(sports.length === 1 ? sports[0] : '');

	function onSportChange(value: string) {
		sports = value ? [value] : [];
	}
</script>

<div
	class="grid grid-cols-1 items-stretch gap-1 rounded-md bg-white p-2 shadow-[0px_20px_50px_-20px_rgba(0,0,0,0.5)] sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto]"
>
	<div class="flex flex-col gap-0.75 rounded-sm bg-bg px-4.5 py-3.5">
		<span class="font-mono text-micro font-semibold tracking-label text-muted uppercase">SPOT</span>
		<input
			type="text"
			class="w-full bg-transparent text-[15px] font-semibold text-ink outline-none placeholder:font-normal placeholder:text-muted/60"
			placeholder="Ex: Leucate, Aude"
			bind:value={location}
		/>
	</div>
	<div class="flex flex-col gap-0.75 rounded-sm px-4.5 py-3.5">
		<span class="font-mono text-micro font-semibold tracking-label text-muted uppercase"
			>DISCIPLINE</span
		>
		<select
			class="w-full appearance-none border-none bg-transparent text-[15px] font-semibold text-ink outline-none"
			value={sport}
			onchange={(e) => onSportChange((e.target as HTMLSelectElement).value)}
		>
			{#each sportOptions as opt}
				<option value={opt.value}>{opt.label}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-col gap-0.75 rounded-sm px-4.5 py-3.5">
		<span class="font-mono text-micro font-semibold tracking-label text-muted uppercase"
			>NIVEAU</span
		>
		<select
			class="w-full appearance-none border-none bg-transparent text-[15px] font-semibold text-ink outline-none"
			bind:value={level}
		>
			{#each levelOptions as opt}
				<option value={opt.value}>{opt.label}</option>
			{/each}
		</select>
	</div>
	<button
		class="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-sm border-0 bg-accent px-6 py-3.5 font-display text-body-sm font-bold tracking-[0.04em] text-white uppercase sm:col-span-2 lg:col-span-1"
	>
		Chercher →
	</button>
</div>
