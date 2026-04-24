<script lang="ts">
	let {
		id,
		name,
		isVerified = false,
		location,
		stars,
		reviewCount,
		sports,
		price,
		certifications
	}: {
		id: string;
		name: string;
		isVerified?: boolean;
		location: string;
		stars: number;
		reviewCount: number;
		sports: string[];
		price: number;
		certifications: string[];
	} = $props();
</script>

<a href="/profs/{id}">
	<article class="flex flex-col rounded-[10px] border border-solid border-ink/14 bg-white">
		<div class="item-bg relative flex h-64 items-end rounded-t-[10px] border-b border-b-ink/14 p-4">
			<h3
				class="rounded-sm bg-white/85 px-2 py-1 font-display text-2xl font-black tracking-tight uppercase"
			>
				{name}
			</h3>
			{#if isVerified}
				<span
					class="absolute top-4 left-4 rounded-sm bg-ink px-2 py-1 font-mono text-micro font-bold tracking-wider text-white"
					>Vérifié</span
				>
			{/if}
			<button
				class="absolute top-4 right-4 h-8 w-8 cursor-pointer rounded-full bg-white/90 text-sm text-muted"
				>♡</button
			>
		</div>
		<div class="p-6">
			<div class="mb-3 flex items-baseline justify-between">
				<span class="text-sm text-muted">{location}</span>
				<span class="text-sm text-muted">
					★ {stars} <span class="opacity-60">({reviewCount})</span>
				</span>
			</div>
			<div class="mb-4 flex flex-wrap gap-1.5">
				{#each sports as sport}
					<span
						class="rounded-[4px] bg-bg-dark px-2 py-1 font-mono text-label font-semibold tracking-[0.04em] uppercase"
					>
						{sport}
					</span>
				{/each}
			</div>
			<div class="mb-4 border-t border-t-ink/14"></div>
			<div class="flex items-center justify-between">
				<div>
					<div class="font-mono text-micro tracking-wider text-muted uppercase">À partir de</div>
					<div class="mt-0.5 font-display text-[26px] font-black tracking-tight">{price}€/h</div>
				</div>
				<div class="text-right">
					<div class="font-mono text-micro tracking-wider text-muted uppercase">Diplômes</div>
					<div class="mt-1 text-caption font-semibold">{certifications.join(' · ')}</div>
				</div>
			</div>
		</div>
	</article>
</a>

<style>
	.item-bg {
		background-image: repeating-linear-gradient(
			135deg,
			rgba(0, 0, 0, 0.06) 0 1px,
			transparent 1px 10px
		);
		background-color: var(--color-bg-card);
	}
</style>
