<section class="mx-auto max-w-360 px-4 pb-8 sm:px-8 lg:px-14">
	<div
		class="grid grid-cols-1 items-stretch gap-1 rounded-md border border-line bg-white p-2 shadow-[0_8px_24px_-16px_rgba(14,26,43,.25)] sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_auto]"
	>
		{#each [
			{ l: 'RÉGION', v: 'Toute la France', active: true },
			{ l: 'DISCIPLINE', v: 'Toutes' },
			{ l: "PLAN D'EAU", v: 'Mer · lac · lagune' },
			{ l: 'VENT MIN', v: '15 nœuds' }
		] as f, i}
			<div
				class="flex cursor-pointer flex-col gap-1 rounded px-4.5 py-3.5 transition-colors hover:bg-bg/60 {i === 0 ? 'bg-bg' : ''}"
			>
				<span class="font-mono text-micro tracking-label text-muted uppercase">{f.l}</span>
				<span class="text-[15px] font-semibold text-ink">{f.v}</span>
			</div>
		{/each}
		<button
			class="cursor-pointer rounded border-none bg-accent px-6 py-3.5 font-display text-body-sm font-bold text-white uppercase tracking-wide transition-colors hover:bg-[#C85D3A]"
		>
			Chercher →
		</button>
	</div>
</section>
