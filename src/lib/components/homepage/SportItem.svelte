<script lang="ts">
	let { name, profsCount, spotCount, windMin, windMax, url } = $props();
</script>

<a href={url} class="relative rounded-lg bg-ink px-8 py-6 text-white">
	<div class="card-bg absolute"></div>
	<div class="relative">
		<h3 class="mb-1.5 font-display text-[44px] tracking-tight uppercase">{name}</h3>
		<p class="mb-6 font-mono text-sm tracking-wide text-white/55">
			{profsCount} moniteurs · {spotCount} spots
		</p>
		<div class="flex items-end justify-between">
			<div>
				<p class="font-mono text-[10px] tracking-wider text-white/55 uppercase">Vent typique</p>
				<p class="mt-1 font-display text-[22px] font-black tracking-tight text-accent-soft">
					{windMin}-{windMax}kt
				</p>
			</div>
			<span class="text-[28px] text-accent">→</span>
		</div>
	</div>
</a>

<style>
	.card-bg {
		inset: 0;
		background: repeating-linear-gradient(
			108deg,
			transparent 0px,
			transparent 22px,
			rgba(255, 255, 255, 0.04) 22px,
			rgba(255, 255, 255, 0.04) 23px
		);
	}
</style>
