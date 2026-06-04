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
		certifications,
		photoUrl = null
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
		photoUrl?: string | null;
	} = $props();
</script>

<a href="/profs/{id}">
	<article
		class="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm"
	>
		<div class="item-bg relative flex h-60 overflow-hidden">
			{#if photoUrl}
				<img src={photoUrl} alt={name} class="absolute inset-0 h-full w-full object-cover" />
			{/if}
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
		<div class="flex flex-1 flex-col justify-between p-6">
			<div>
				<div class="flex items-baseline justify-between">
					<h3 class="font-display text-2xl font-black tracking-tight text-ink uppercase">
						{name}
					</h3>
					<div class="mt-1 flex items-baseline gap-1">
						<span class="text-sm text-accent">★</span>
						<span class="font-mono text-caption text-muted">{stars} ({reviewCount})</span>
					</div>
				</div>
				<div class="mb-3">
					<span class="font-mono text-caption font-semibold tracking-wider text-muted uppercase"
						>{location}</span
					>
				</div>
				<div class="mb-4 flex flex-wrap gap-1.5">
					{#each sports as sport (sport)}
						<span
							class="rounded border border-line bg-bg-card px-2 py-1 font-mono text-label font-semibold tracking-wider text-ink uppercase"
						>
							{sport}
						</span>
					{/each}
				</div>
			</div>
			<div>
				<div class="mb-4 border-t border-line"></div>
				<div class="flex items-center justify-between">
					<div>
						<div class="font-mono text-micro tracking-wider text-muted uppercase">Dès</div>
						<div class="mt-0.5 font-display text-[22px] font-black tracking-tight text-ink">
							{price}€/h
						</div>
					</div>
					<div class="text-right">
						<div class="font-mono text-micro tracking-wider text-muted uppercase">Diplômes</div>
						<div class="mt-1 text-caption font-semibold">{certifications.join(' · ')}</div>
					</div>
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
