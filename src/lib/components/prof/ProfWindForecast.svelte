<script lang="ts">
	let {
		days,
		threshold,
		profFirstName
	}: {
		days: { day: string; speed: number; direction: string; status: 'good' | 'ok' | 'bad' }[];
		threshold: number;
		profFirstName: string;
	} = $props();

	const statusColor: Record<string, string> = {
		good: 'bg-success',
		ok: 'bg-accent-soft',
		bad: 'bg-[rgb(179,78,62)]'
	};
</script>

<div class="relative overflow-hidden rounded-2.5 border border-ink bg-ink px-6 py-5.5 text-white">
	<div class="relative">
		<div class="font-mono text-label tracking-label text-accent uppercase">↳ VENT · PROCHAINS 5J</div>
		<div class="mt-3.5 grid grid-cols-5 gap-1.5">
			{#each days as day (day.day)}
				<div class="rounded-md border border-white/6 bg-white/5 px-1 py-3 text-center">
					<div class="font-mono text-micro tracking-loose text-white/50">{day.day}</div>
					<div class="mt-2 font-display text-2xl text-white">{day.speed}</div>
					<div class="mt-0.5 font-mono text-[9px] tracking-loose text-white/50">
						{day.direction} · KT
					</div>
					<span class="mt-2 inline-block h-2 w-2 rounded-full {statusColor[day.status]}"></span>
				</div>
			{/each}
		</div>
		<div class="mt-3.5 text-center font-mono text-label tracking-wide text-white/60 uppercase">
			Seuil {profFirstName} : {threshold} kt → SAM/DIM ✓
		</div>
	</div>
</div>
