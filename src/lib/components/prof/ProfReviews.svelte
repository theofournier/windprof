<script lang="ts">
	import ProfSectionTitle from './ProfSectionTitle.svelte';
	import ProfReviewForm from './ProfReviewForm.svelte';

	let {
		averageRating,
		totalReviews,
		distribution,
		reviews,
		profId,
		profName,
		userType
	}: {
		averageRating: number;
		totalReviews: number;
		distribution: { stars: number; count: number }[];
		reviews: { name: string; level: string; date: string; rating: number; text: string }[];
		profId: string;
		profName: string;
		userType: 'rider' | 'prof' | null;
	} = $props();

	const LIMIT = 5;
	let showAll = $state(false);

	const visibleReviews = $derived(showAll ? reviews : reviews.slice(0, LIMIT));

	function starType(position: number, rating: number): 'full' | 'half' | 'empty' {
		if (position <= Math.floor(rating)) return 'full';
		if (position === Math.ceil(rating) && rating % 1 !== 0) return 'half';
		return 'empty';
	}
</script>

{#snippet starRating(rating: number, sizeClass: string = 'text-base')}
	<span class="flex items-center">
		{#each { length: 5 } as _, i (i)}
			{@const type = starType(i + 1, rating)}
			{#if type === 'half'}
				<span class="relative inline-block {sizeClass}">
					<span class="text-ink/20">★</span>
					<span class="absolute inset-0 w-[50%] overflow-hidden text-accent">★</span>
				</span>
			{:else}
				<span class="{sizeClass} {type === 'full' ? 'text-accent' : 'text-ink/20'}">★</span>
			{/if}
		{/each}
	</span>
{/snippet}

<div id="avis">
	<div class="mb-4.5 flex items-end justify-between">
		<div>
			<ProfSectionTitle title="AVIS DES RIDERS" />
			<h2 class="m-0 text-[38px]">★ {averageRating} · {totalReviews} avis</h2>
		</div>
	</div>

	<!-- Rating summary -->
	<div
		class="mb-5 grid grid-cols-[1fr_2fr] items-center gap-8 rounded-md border border-ink/14 bg-white px-6 py-5.5"
	>
		<div class="text-center">
			<div class="font-display text-[70px] leading-none font-black tracking-tight text-ink">
				{averageRating}
			</div>
			<div class="mt-1.5 flex justify-center">
				{@render starRating(averageRating, 'text-xl')}
			</div>
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
	<div class="flex flex-col gap-2">
		{#each visibleReviews as review (review.name)}
			<div class="rounded-md border border-ink/14 bg-white px-6 py-5.5">
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
					<div>
						{@render starRating(review.rating, 'text-sm')}
					</div>
				</div>
				<p class="m-0 text-[14.5px] leading-relaxed text-ink">{review.text}</p>
			</div>
		{/each}
	</div>
	{#if reviews.length > LIMIT}
		<button
			class="mt-2.5 cursor-pointer font-mono text-sm font-bold text-ink uppercase underline"
			onclick={() => (showAll = !showAll)}
		>
			{showAll ? 'Voir moins' : 'Voir tous'}
		</button>
	{/if}

	<ProfReviewForm {profId} {profName} {userType} />
</div>
