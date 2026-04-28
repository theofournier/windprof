<script lang="ts">
	import { getRiderRegisterCtx, type RiderFormData } from './context';

	const ctx = getRiderRegisterCtx();

	const GOALS = [
		{ n: 'Découvrir le sport', d: 'Première session, prendre les bases' },
		{ n: 'Solidifier les bases', d: 'Bords, virements, départ planning' },
		{ n: 'Passer au foil', d: 'Premier vol, transitions au foil' },
		{ n: 'Apprendre à sauter', d: 'Premier saut, hauteur, atterrissage' },
		{ n: 'Faire de la vague', d: 'Lecture vague, virages engagés' },
		{ n: 'Tricks / freestyle', d: 'Rotations, slides, figures' },
		{ n: 'Reprendre en sécurité', d: 'Après une pause, redevenir confiant' },
		{ n: 'Juste rider ensemble', d: 'Coach session sans objectif précis' }
	];

	const FORMATS = [
		{ value: 'individual', label: 'Cours individuel', desc: '1-1, max attention' },
		{ value: 'duo', label: 'Duo (2 riders)', desc: 'Avec un·e proche' },
		{ value: 'small_group', label: 'Petit groupe (3)', desc: 'Plus économique' },
		{ value: 'stage', label: 'Stage / week-end', desc: 'Progression intense' }
	];

	const EQUIPMENT: Array<{ value: RiderFormData['equipmentPreference']; label: string; desc: string }> = [
		{ value: 'own', label: "J'ai mon matériel", desc: 'Je viens avec' },
		{ value: 'provided', label: 'Matériel à fournir', desc: 'Le moniteur prête' },
		{ value: 'any', label: 'Peu importe', desc: "Je m'adapte" }
	];

	function toggleGoal(name: string) {
		const idx = ctx.data.goals.indexOf(name);
		if (idx >= 0) ctx.data.goals.splice(idx, 1);
		else ctx.data.goals.push(name);
	}

	function toggleFormat(value: string) {
		const idx = ctx.data.formatPreferences.indexOf(value);
		if (idx >= 0) ctx.data.formatPreferences.splice(idx, 1);
		else ctx.data.formatPreferences.push(value);
	}
</script>

<div class="grid gap-6">
	<!-- Goals -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ TES OBJECTIFS *
			<span class="font-sans text-label font-normal tracking-normal text-muted normal-case">
				— sélection multiple
			</span>
		</div>
		<div class="grid grid-cols-2 gap-2.5">
			{#each GOALS as g (g.n)}
				{@const on = ctx.data.goals.includes(g.n)}
				<div
					role="checkbox"
					aria-checked={on}
					tabindex="0"
					onclick={() => toggleGoal(g.n)}
					onkeydown={(e) => e.key === 'Enter' && toggleGoal(g.n)}
					class="grid cursor-pointer items-start rounded-[10px] border p-4 {on
						? 'border-ink bg-white shadow-[inset_0_0_0_1px_var(--color-ink)]'
						: 'border-line bg-bg-card'}"
					style="grid-template-columns: auto 1fr; gap: 12px"
				>
					<span
						class="mt-0.5 flex h-5 w-5 items-center justify-center rounded-[4px] text-caption font-bold text-white {on
							? 'bg-accent'
							: 'border-[1.5px] border-line bg-transparent'}"
					>
						{on ? '✓' : ''}
					</span>
					<div>
						<div class="text-[14px] font-bold">{g.n}</div>
						<div class="mt-0.5 text-[12.5px] leading-snug text-muted">{g.d}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Format -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ FORMAT PRÉFÉRÉ
			<span class="font-sans text-label font-normal tracking-normal text-muted normal-case">
				— tu pourras toujours choisir autre chose au moment de réserver
			</span>
		</div>
		<div class="grid grid-cols-4 gap-2.5">
			{#each FORMATS as f (f.value)}
				{@const on = ctx.data.formatPreferences.includes(f.value)}
				<div
					role="checkbox"
					aria-checked={on}
					tabindex="0"
					onclick={() => toggleFormat(f.value)}
					onkeydown={(e) => e.key === 'Enter' && toggleFormat(f.value)}
					class="cursor-pointer rounded-[10px] border p-3.5 {on
						? 'border-ink bg-white shadow-[inset_0_0_0_1px_var(--color-ink)]'
						: 'border-line bg-bg-card'}"
				>
					<div class="mb-1 flex items-center gap-2">
						<span
							class="flex h-4 w-4 items-center justify-center rounded-[4px] text-micro font-bold text-white {on
								? 'bg-accent'
								: 'border-[1.5px] border-line bg-transparent'}"
						>
							{on ? '✓' : ''}
						</span>
						<span class="text-body-sm font-bold">{f.label}</span>
					</div>
					<div class="pl-6 text-[11.5px] text-muted">{f.desc}</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Equipment -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ MATÉRIEL
			<span class="font-sans text-label font-normal tracking-normal text-muted normal-case">
				— le moniteur saura quoi proposer
			</span>
		</div>
		<div class="grid grid-cols-3 gap-2.5">
			{#each EQUIPMENT as m (m.value)}
				{@const on = ctx.data.equipmentPreference === m.value}
				<div
					role="radio"
					aria-checked={on}
					tabindex="0"
					onclick={() => (ctx.data.equipmentPreference = m.value)}
					onkeydown={(e) => e.key === 'Enter' && (ctx.data.equipmentPreference = m.value)}
					class="cursor-pointer rounded-[10px] border p-3.5 {on
						? 'border-ink bg-white shadow-[inset_0_0_0_1px_var(--color-ink)]'
						: 'border-line bg-bg-card'}"
				>
					<div class="mb-1 flex items-center gap-2">
						<span
							class="flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white {on
								? 'bg-accent'
								: 'border-[1.5px] border-line bg-transparent'}"
						>
							{on ? '●' : ''}
						</span>
						<span class="text-body-sm font-bold">{m.label}</span>
					</div>
					<div class="pl-6 text-[11.5px] text-muted">{m.desc}</div>
				</div>
			{/each}
		</div>
	</div>
</div>
