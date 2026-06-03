<script lang="ts">
	import WindLines from '../global/WindLines.svelte';
	import ProfSectionTitle from './ProfSectionTitle.svelte';

	let {
		name,
		phone,
		email,
		responseTime = '2H'
	}: {
		name: string;
		phone?: string;
		email?: string;
		responseTime?: string;
	} = $props();
</script>

<div class="relative rounded-[10px] bg-ink px-6 py-5.5 text-white">
	<WindLines withGrid={false} />

	{#if phone || email}
		<ProfSectionTitle title="CONTACT · RÉPOND EN ≈{responseTime}" />
		<div class="mt-3.5 mb-4 grid grid-cols-2 gap-2.5">
			{#if phone}
				<div class="rounded-md border border-white/10 bg-white/6 px-3.5 py-3">
					<div class="font-mono text-micro tracking-label text-white/55">TÉLÉPHONE</div>
					<span class="mt-1 font-display text-[15px] font-bold">{phone}</span>
				</div>
			{/if}
			{#if email}
				<div class="rounded-md border border-white/10 bg-white/6 px-3.5 py-3">
					<div class="font-mono text-micro tracking-label text-white/55">EMAIL</div>
					<span class="mt-1 font-display text-[15px] font-bold">{email}</span>
				</div>
			{/if}
		</div>

		<div class="flex gap-2.5">
			{#if phone}
				<a
					href="tel:{phone}"
					class="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md bg-accent px-4 py-3.5 font-display text-[15px] font-bold text-white"
				>
					📞 Appeler {name}
				</a>
			{/if}
			{#if email}
				<a
					href="mailto:{email}"
					class="cursor-pointer rounded-md border border-white/20 bg-white/8 px-4.5 py-3.5 text-[15px] text-white"
					>✉</a
				>
			{/if}
		</div>

		<div class="mt-3 text-center font-mono text-[10.5px] tracking-loose text-white/50 uppercase">
			Le moniteur gère ses tarifs et son planning
		</div>
	{:else}
		<div
			class="mt-3.5 mb-4 rounded-md border border-white/10 bg-white/6 px-3.5 py-4 text-center font-mono text-label tracking-label text-white/50 uppercase"
		>
			Aucune coordonnée disponible
		</div>
	{/if}
</div>
