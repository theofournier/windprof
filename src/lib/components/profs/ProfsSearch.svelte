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

{#snippet label(text: string)}
	<span class="font-mono text-label font-medium tracking-wider text-muted uppercase">{text}</span>
{/snippet}

<div
	class="grid grid-cols-1 items-stretch gap-2 rounded-xl bg-white p-2 shadow-2xl sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto]"
	style="box-shadow: 0 30px 80px -20px rgba(0,0,0,.5);"
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
		{@render label('DISCIPLINE')}
		<select
			class="w-full appearance-none border-none bg-transparent font-sans text-[15px] font-medium text-ink outline-none"
			value={sport}
			onchange={(e) => onSportChange((e.target as HTMLSelectElement).value)}
		>
			{#each sportOptions as opt}
				<option value={opt.value}>{opt.label}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-col gap-0.75 px-4 py-3">
		{@render label('NIVEAU')}
		<select
			class="w-full appearance-none border-none bg-transparent font-sans text-[15px] font-medium text-ink outline-none"
			bind:value={level}
		>
			{#each levelOptions as opt}
				<option value={opt.value}>{opt.label}</option>
			{/each}
		</select>
	</div>
	<button
		class="inline-flex cursor-pointer items-center justify-center rounded-lg bg-accent px-6 py-3 font-display text-sm font-black tracking-tight text-white uppercase transition-opacity hover:opacity-90"
	>
		Chercher →
	</button>
</div>
