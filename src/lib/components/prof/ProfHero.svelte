<script lang="ts">
	import ProfContactCard from './ProfContactCard.svelte';
	import ProfSidebarLinks from './ProfSidebarLinks.svelte';

	let {
		name,
		location,
		stars,
		reviewCount,
		isVerified,
		isPremium,
		bio,
		disciplines,
		levels,
		phone,
		email,
		isOnline = true,
		responseTime = '2H'
	}: {
		name: string;
		location: string;
		stars: number;
		reviewCount: number;
		isVerified: boolean;
		isPremium: boolean;
		bio: string;
		disciplines: string[];
		levels: string[];
		phone: string;
		email: string;
		isOnline?: boolean;
		responseTime?: string;
	} = $props();
</script>

<div>
	<!-- Status pill -->
	<div
		class="inline-flex items-center gap-2 rounded-full border border-ink/14 bg-white px-3 py-1.5 font-mono text-label tracking-wider text-muted"
	>
		<span class="status-dot inline-block h-1.75 w-1.75 rounded-full bg-accent"></span>
		{#if isOnline}
			EN LIGNE · RÉPOND EN ≈{responseTime}
		{:else}
			HORS LIGNE
		{/if}
	</div>

	<h1 class="mt-4.5 mb-2 text-[38px] leading-[0.95] lg:text-[58px]">{name}</h1>

	<div class="mb-5 text-base text-[#4A5260]">{location}</div>

	<!-- Rating row -->
	<div class="flex flex-wrap items-center gap-3 border-b border-ink/14 pb-5">
		<div class="flex items-center gap-1.5">
			<span class="text-lg text-accent">★</span>
			<span class="font-display text-xl">{stars}</span>
			<span class="text-sm text-muted">· {reviewCount} avis</span>
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
	<p class="my-5 text-[15px] leading-relaxed text-[#4A5260]">{bio}</p>

	<!-- Discipline & level chips -->
	<div class="mb-5 flex flex-wrap gap-1.5">
		{#each disciplines as d (d)}
			<span
				class="rounded-sm bg-ink px-2 py-1 font-mono text-label tracking-wide text-white uppercase"
				>{d}</span
			>
		{/each}
		{#each levels as l (l)}
			<span
				class="rounded-sm bg-bg-dark px-2 py-1 font-mono text-label tracking-wide text-ink uppercase"
				>{l}</span
			>
		{/each}
	</div>

	<ProfContactCard {name} {phone} {email} />
	<ProfSidebarLinks />
</div>

<style>
	.status-dot {
		box-shadow: 0 0 0 4px rgba(232, 114, 76, 0.22);
		animation: pulse 2s ease-in-out infinite;
	}
	@keyframes pulse {
		50% {
			box-shadow: 0 0 0 7px rgba(232, 114, 76, 0.05);
		}
	}
</style>
