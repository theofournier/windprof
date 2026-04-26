<script lang="ts">
	let {
		averageRating,
		totalReviews,
		distribution,
		reviews
	}: {
		averageRating: number;
		totalReviews: number;
		distribution: { stars: number; count: number }[];
		reviews: { name: string; level: string; date: string; rating: number; text: string }[];
	} = $props();
</script>

<div>
	<div class="mb-4.5 flex items-end justify-between">
		<div>
			<div class="mb-2.5 font-mono text-label tracking-label text-accent uppercase">
				↳ AVIS DES RIDERS
			</div>
			<h2 class="m-0 text-[38px]">★ {averageRating} · {totalReviews} avis</h2>
		</div>
		<button class="cursor-pointer text-sm text-muted underline">Voir tous</button>
	</div>

	<!-- Rating summary -->
	<div
		class="mb-5 grid grid-cols-[1fr_2fr] items-center gap-8 rounded-2.5 border border-ink/14 bg-white px-6 py-5.5"
	>
		<div class="text-center">
			<div class="font-display text-[70px] leading-none tracking-tight text-ink">
				{averageRating}
			</div>
			<div class="mt-1.5 text-base text-accent">★★★★★</div>
			<div class="mt-1.5 font-mono text-label tracking-wider text-muted">{totalReviews} AVIS</div>
		</div>
		<div>
			{#each distribution as bar (bar.stars)}
				<div class="mb-1.5 flex items-center gap-2.5">
					<span class="w-5 font-mono text-label text-muted">{bar.stars}★</span>
					<div class="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/14">
						<div
							class="h-full bg-accent"
							style="width: {((bar.count / totalReviews) * 100).toFixed(2)}%"
						></div>
					</div>
					<span class="w-6 text-right font-mono text-label text-muted">{bar.count}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Review cards -->
	<div class="flex flex-col gap-3.5">
		{#each reviews as review (review.name)}
			<div class="rounded-2.5 border border-ink/14 bg-white px-6 py-5.5">
				<div class="mb-2.5 flex items-start justify-between">
					<div class="flex items-center gap-3">
						<div class="h-10 w-10 rounded-full bg-bg-dark"></div>
						<div>
							<div class="text-sm font-bold">{review.name}</div>
							<div class="font-mono text-label tracking-wide text-muted uppercase">
								{review.level} · {review.date}
							</div>
						</div>
					</div>
					<div class="text-sm text-accent">
						{#each { length: review.rating } as _, i (i)}★{/each}<span class="text-ink/14"
							>{#each { length: 5 - review.rating } as _, i (i)}★{/each}</span
						>
					</div>
				</div>
				<p class="m-0 text-[14.5px] leading-relaxed text-[#4A5260]">« {review.text} »</p>
			</div>
		{/each}
	</div>
</div>
