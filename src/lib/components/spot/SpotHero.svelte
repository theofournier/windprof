<script lang="ts">
	let {
		name,
		region,
		coords,
		avgRating,
		reviewCount,
		disciplines,
		level,
		description,
		bestMonths,
		facilities
	}: {
		name: string;
		region: string;
		coords: string;
		avgRating: number;
		reviewCount: number;
		disciplines: string[];
		level: string;
		description: string;
		bestMonths: string[];
		facilities: string[];
	} = $props();
</script>

<div>
	<!-- Live conditions badge -->
	<div
		class="inline-flex items-center gap-2 rounded-full border border-ink/14 bg-white px-3 py-1.5 font-mono text-label tracking-wider text-muted"
	>
		<span class="live-dot inline-block h-1.75 w-1.75 rounded-full bg-accent"></span>
		CONDITIONS LIVE · MAJ 14H12
	</div>

	<h1 class="mt-4.5 mb-2 text-[38px] leading-[0.95] lg:text-[52px]">{name}</h1>

	<div class="mb-1.5 text-base text-[#4A5260]">{region}</div>
	<div class="mb-5 font-mono text-label tracking-loose text-muted">{coords}</div>

	<!-- Rating row -->
	<div class="flex flex-wrap items-center gap-3 border-b border-ink/14 pb-5">
		<div class="flex items-center gap-1.5">
			<span class="text-lg text-accent">★</span>
			<span class="font-display text-xl">{avgRating.toFixed(1)}</span>
			<span class="text-sm text-muted">· {reviewCount} avis riders</span>
		</div>
	</div>

	<!-- Description -->
	<p class="my-5 text-[15px] leading-relaxed text-[#4A5260]">{description}</p>

	<!-- Disciplines + level chips -->
	<div class="mb-6 flex flex-wrap gap-1.5">
		{#each disciplines as d (d)}
			<span
				class="rounded-sm bg-ink px-2 py-1 font-mono text-label tracking-wide text-white uppercase"
				>{d}</span
			>
		{/each}
		<span
			class="rounded-sm bg-bg-dark px-2 py-1 font-mono text-label tracking-wide text-ink uppercase"
			>{level}</span
		>
	</div>

	<!-- Best months -->
	<div class="mb-5">
		<div class="mb-2.5 font-mono text-label tracking-label text-accent uppercase">
			↳ Meilleures périodes
		</div>
		<div class="flex flex-wrap gap-1.5">
			{#each bestMonths as m (m)}
				<span
					class="rounded-sm border border-line bg-white px-2.5 py-1 font-mono text-label tracking-wide text-ink uppercase"
					>{m}</span
				>
			{/each}
		</div>
	</div>

	<!-- Facilities -->
	<div>
		<div class="mb-2.5 font-mono text-label tracking-label text-accent uppercase">
			↳ Équipements & Services
		</div>
		<div class="flex flex-wrap gap-1.5">
			{#each facilities as f (f)}
				<span
					class="rounded-sm border border-line bg-white px-2.5 py-1 font-mono text-label tracking-wide text-ink uppercase"
					>{f}</span
				>
			{/each}
		</div>
	</div>
</div>

<style>
	.live-dot {
		box-shadow: 0 0 0 4px rgba(232, 114, 76, 0.22);
		animation: pulse 2s ease-in-out infinite;
	}
	@keyframes pulse {
		50% {
			box-shadow: 0 0 0 7px rgba(232, 114, 76, 0.05);
		}
	}
</style>
