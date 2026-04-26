<script lang="ts">
	let {
		profName,
		spots
	}: {
		profName: string;
		spots: { name: string; isPrimary?: boolean; label?: string; href?: string }[];
	} = $props();
</script>

<div class="mb-11">
	<div class="mb-2.5 font-mono text-label tracking-label text-accent uppercase">↳ SPOTS HABITUELS</div>
	<h2 class="mb-4.5 text-[38px]">Là où {profName} enseigne</h2>

	<div class="overflow-hidden rounded-2.5 border border-ink/14 bg-white">
		<!-- Map placeholder -->
		<div class="relative h-[220px] border-b border-ink/14 bg-[rgb(197,205,213)]">
			<span
				class="absolute top-3.5 left-3.5 rounded-sm bg-ink px-2.5 py-1.5 font-mono text-micro font-bold tracking-label text-white"
				>CARTE · LEUCATE</span
			>
			<span
				class="absolute top-[45%] left-[30%] h-4.5 w-4.5 rounded-full border-2 border-white bg-accent shadow-md"
			></span>
			<span
				class="absolute top-[60%] left-[55%] h-3.5 w-3.5 rounded-full border-2 border-white bg-ink"
			></span>
			<span
				class="absolute top-[30%] left-[70%] h-3.5 w-3.5 rounded-full border-2 border-white bg-ink"
			></span>
		</div>

		<div class="px-5.5 py-4.5">
			{#each spots as spot, i (i)}
				<div
					class="flex items-center justify-between py-2.5 {i < spots.length - 1
						? 'border-b border-ink/14'
						: ''}"
				>
					<div class="flex items-center gap-2.5">
						<span
							class="h-2.5 w-2.5 rounded-full {spot.isPrimary ? 'bg-accent' : 'bg-[#4A5260]'}"
						></span>
						<span class="text-[15px] font-semibold">{spot.name}</span>
						{#if spot.label}
							<span
								class="rounded-sm bg-bg-dark px-2 py-0.5 font-mono text-label tracking-wide text-ink uppercase"
								>{spot.label}</span
							>
						{/if}
					</div>
					{#if spot.href}
						<a href={spot.href} class="font-mono text-label tracking-loose text-[#4A5260] uppercase hover:underline">Voir</a>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>
