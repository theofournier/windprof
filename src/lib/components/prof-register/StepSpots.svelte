<script lang="ts">
	import { getProfRegisterCtx } from './context';

	const ctx = getProfRegisterCtx();

	let newSpotName = $state('');

	function addSpot() {
		const name = newSpotName.trim();
		if (!name) return;
		const isFirst = ctx.data.spots.length === 0;
		ctx.data.spots.push({ name, isPrimary: isFirst });
		newSpotName = '';
	}

	function removeSpot(idx: number) {
		ctx.data.spots.splice(idx, 1);
		if (ctx.data.spots.length > 0 && !ctx.data.spots.some((s: any) => s.isPrimary)) {
			ctx.data.spots[0].isPrimary = true;
		}
	}

	function setPrimary(idx: number) {
		ctx.data.spots.forEach((s: any, i: number) => {
			s.isPrimary = i === idx;
		});
	}
</script>

<div class="grid gap-5.5">
	<!-- City + region -->
	<div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
		<div>
			<label
				for="city"
				class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase"
			>
				↳ VILLE D'ENSEIGNEMENT PRINCIPALE *
			</label>
			<div class="mb-1.5 font-mono text-[10.5px] tracking-wide text-muted">
				Sert au filtre de recherche par région
			</div>
			<input
				id="city"
				type="text"
				placeholder="Leucate"
				bind:value={ctx.data.city}
				class="w-full rounded-md border bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)] {ctx.errors.city ? 'border-red-400 focus:border-red-400' : 'border-line focus:border-ink'}"
			/>
			{#if ctx.errors.city}
				<p class="mt-1.5 font-mono text-label text-red-500">{ctx.errors.city}</p>
			{/if}
		</div>
		<div>
			<label
				for="region"
				class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase"
			>
				↳ DÉPARTEMENT / RÉGION
			</label>
			<div class="mb-1.5 font-mono text-[10.5px] tracking-wide text-muted">&nbsp;</div>
			<input
				id="region"
				type="text"
				placeholder="Aude — Occitanie"
				bind:value={ctx.data.region}
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
			⌥ Saisie libre en MVP 1 — la carte interactive arrive en MVP 2
		</div>
		{#if ctx.data.spots.length > 0}
			<div class="mb-3 flex flex-col gap-2">
				{#each ctx.data.spots as spot, i (i)}
					<div
						class="grid items-center gap-3.5 rounded-lg border border-line bg-white px-4.5 py-3.5"
						style="grid-template-columns: auto 1fr auto auto"
					>
						<button
							type="button"
							onclick={() => setPrimary(i)}
							class="h-2.5 w-2.5 rounded-full {spot.isPrimary ? 'bg-accent' : 'bg-muted'}"
							title="Marquer comme principal"
						></button>
						<span class="font-sans text-[15px] font-semibold text-ink">{spot.name}</span>
						{#if spot.isPrimary}
							<span
								class="inline-flex items-center gap-1.5 rounded-[4px] bg-bg-dark px-2.5 py-1 font-mono text-label font-semibold tracking-[0.04em] uppercase"
							>
								Principal
							</span>
						{:else}
							<span></span>
						{/if}
						<button
							type="button"
							onclick={() => removeSpot(i)}
							class="cursor-pointer font-mono text-label tracking-loose text-muted underline uppercase"
						>
							Retirer
						</button>
					</div>
				{/each}
			</div>
		{/if}
		{#if ctx.errors.spots}
			<p class="mb-2 font-mono text-label text-red-500">{ctx.errors.spots}</p>
		{/if}
		<div class="flex gap-2">
			<input
				type="text"
				placeholder="Leucate — La Franqui"
				bind:value={newSpotName}
				onkeydown={(e) => e.key === 'Enter' && (e.preventDefault(), addSpot())}
				class="flex-1 rounded-md border bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)] {ctx.errors.spots && ctx.data.spots.length === 0 ? 'border-red-400 focus:border-red-400' : 'border-line focus:border-ink'}"
			/>
			<button
				type="button"
				onclick={addSpot}
				class="inline-flex cursor-pointer items-center gap-2.5 rounded-md border-[1.5px] border-ink bg-transparent px-4.5 py-3 font-display text-body-sm font-bold tracking-wide text-ink uppercase hover:opacity-80"
			>
				+ Ajouter
			</button>
		</div>
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
			<div
				role="radio"
				aria-checked={ctx.data.equipmentProvided}
				tabindex="0"
				onclick={() => (ctx.data.equipmentProvided = true)}
				onkeydown={(e) => e.key === 'Enter' && (ctx.data.equipmentProvided = true)}
				class="cursor-pointer rounded-[10px] border p-4.5 {ctx.data.equipmentProvided
					? 'border-ink bg-white'
					: 'border-line bg-bg-card'}"
			>
				<div class="mb-1.5 flex items-center gap-2.5">
					<span
						class="flex h-4.5 w-4.5 items-center justify-center rounded-full text-label font-bold text-white {ctx
							.data.equipmentProvided
							? 'bg-accent'
							: 'border-[1.5px] border-line bg-transparent'}"
					>
						{ctx.data.equipmentProvided ? '●' : ''}
					</span>
					<span class="text-[14px] font-bold">Oui — matériel fourni</span>
				</div>
				<div class="pl-7 text-caption text-muted">Aile, planche, harnais, combi inclus</div>
			</div>
			<div
				role="radio"
				aria-checked={!ctx.data.equipmentProvided}
				tabindex="0"
				onclick={() => (ctx.data.equipmentProvided = false)}
				onkeydown={(e) => e.key === 'Enter' && (ctx.data.equipmentProvided = false)}
				class="cursor-pointer rounded-[10px] border p-4.5 {!ctx.data.equipmentProvided
					? 'border-ink bg-white'
					: 'border-line bg-bg-card'}"
			>
				<div class="flex items-center gap-2.5">
					<span
						class="h-4.5 w-4.5 items-center justify-center rounded-full {!ctx.data
							.equipmentProvided
							? 'flex bg-accent text-label font-bold text-white'
							: 'border-[1.5px] border-line'}"
					>
						{!ctx.data.equipmentProvided ? '●' : ''}
					</span>
					<span class="text-[14px] font-semibold text-muted">Non — rider apporte son matos</span>
				</div>
			</div>
		</div>
		<input
			type="text"
			placeholder="Note optionnelle — ex : « North Kiteboarding 2024, tailles 7/9/12 »"
			bind:value={ctx.data.equipmentNote}
			class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
		/>
	</div>
</div>
