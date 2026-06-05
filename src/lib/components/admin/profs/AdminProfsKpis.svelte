<script lang="ts">
	import type { Kpi } from './types';

	let { kpis }: { kpis: Kpi[] } = $props();
</script>

<div class="mb-6 grid grid-cols-4 gap-px border border-ink/10 bg-ink/10">
	{#each kpis as kpi}
		<div
			class="flex flex-col gap-1.5 bg-white p-[18px_20px]"
			class:bg-[linear-gradient(135deg,#fff,#fbf1ea)]={kpi.accent}
		>
			<div class="font-mono text-[10.5px] font-semibold tracking-widest text-muted uppercase">
				{kpi.lbl}
			</div>
			<div
				class="font-display text-[38px] leading-none font-black tracking-[-0.03em]"
				class:text-accent={kpi.accent}
				class:text-ink={!kpi.accent}
			>
				{kpi.val}
			</div>
			<div
				class="font-mono text-label tracking-[0.06em]"
				class:text-accent={kpi.dir === 'flag'}
				class:text-[#1f6f47]={kpi.dir === 'up'}
				class:text-muted={kpi.dir !== 'flag' && kpi.dir !== 'up'}
			>
				{kpi.dir === 'flag' ? '⚐ ' : kpi.dir === 'up' ? '▲ ' : '─ '}{kpi.delta}
			</div>
		</div>
	{/each}
</div>
