<script lang="ts">
	import ProfContactCard from './ProfContactCard.svelte';
	import ProfReportLink from './ProfReportLink.svelte';

	let {
		name,
		location,
		stars,
		reviewCount,
		isVerified,
		isPremium,
		bio,
		sports,
		levels,
		phone,
		email
	}: {
		name: string;
		location: string;
		stars: number;
		reviewCount: number;
		isVerified: boolean;
		isPremium: boolean;
		bio: string;
		sports: string[];
		levels: string[];
		phone: string;
		email: string;
	} = $props();
</script>

<div>
	<h1 class="mb-2 font-display text-[38px] leading-[0.95] lg:text-[58px]">{name}</h1>

	<div class="mb-5 font-sans text-base font-normal text-muted">{location}</div>

	<!-- Rating row -->
	<div class="flex flex-wrap items-center gap-3 border-b border-ink/14 pb-5">
		<div class="flex items-center gap-1.5">
			<span class="text-lg text-accent">★</span>
			<span class="font-display text-xl font-black">{stars}</span>
			<a
				href="#avis"
				class="text-sm text-muted underline decoration-dotted underline-offset-2 transition-colors hover:text-ink"
			>· {reviewCount} avis</a
			>
		</div>
		{#if isVerified}
			<span
				class="rounded-sm bg-ink px-2.5 py-1.5 font-mono text-label font-bold tracking-label text-white"
				>✓ VÉRIFIÉ</span
			>
		{/if}
		{#if isPremium}
			<span
				class="rounded-sm bg-accent-soft px-2.5 py-1.5 font-mono text-label font-bold tracking-label text-ink"
				>★ PREMIUM</span
			>
		{/if}
	</div>

	<!-- Bio -->
	<p class="my-5 text-[15px] leading-relaxed text-muted">{bio}</p>

	<!-- Discipline & level chips -->
	<div class="mb-5 flex flex-wrap gap-1.5">
		{#each sports as s (s)}
			<span
				class="rounded-sm bg-ink px-2 py-1 font-mono text-label font-semibold tracking-wide text-white uppercase"
				>{s}</span
			>
		{/each}
		{#each levels as l (l)}
			<span
				class="rounded-sm bg-bg-dark px-2 py-1 font-mono text-label font-semibold tracking-wide text-ink uppercase"
				>{l}</span
			>
		{/each}
	</div>

	<ProfContactCard {name} {phone} {email} />
	<ProfReportLink />
</div>
