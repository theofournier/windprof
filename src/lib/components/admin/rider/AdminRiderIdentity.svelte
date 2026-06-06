<script lang="ts">
	import type { AdminRiderDetail } from './types';
	import { sectionHeader, registeredAgo } from './types';

	let { rider }: { rider: AdminRiderDetail } = $props();

	const ago = $derived(registeredAgo(rider.createdAt));

	const kvGrid = 'grid gap-x-5 gap-y-3.5 [grid-template-columns:140px_1fr]';
	const kvDt =
		'font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase text-muted pt-0.5';
</script>

<section class="border border-ink/10 bg-white">
	<div class={sectionHeader}>
		<div class="flex items-baseline gap-2.5">
			<span class="font-display text-[18px] font-black tracking-[-0.02em] uppercase">Identité</span>
			<span class="text-[12px] text-muted">Coordonnées et compte</span>
		</div>
	</div>
	<div class="px-6 py-5">
		<dl class={kvGrid}>
			<dt class={kvDt}>Nom complet</dt>
			<dd class="text-[13.5px] text-ink">{rider.firstName} {rider.lastName ?? ''}</dd>

			<dt class={kvDt}>Email</dt>
			<dd class="text-[13.5px] text-ink">
				<span class="font-mono text-[12.5px]">{rider.user?.email ?? '—'}</span>
				{#if rider.user?.emailVerified}
					<span class="ml-2 font-mono text-[10.5px] font-bold tracking-loose text-[#1f6f47]"
						>● VÉRIFIÉ</span
					>
				{:else}
					<span class="ml-2 font-mono text-[10.5px] font-bold tracking-loose text-[#9a3a2c]"
						>● NON VÉRIFIÉ</span
					>
				{/if}
			</dd>

			<dt class={kvDt}>Ville</dt>
			<dd class="text-[13.5px] text-ink">{rider.city}</dd>

			{#if rider.birthYear}
				<dt class={kvDt}>Année naissance</dt>
				<dd class="text-[13.5px] text-ink">{rider.birthYear}</dd>
			{/if}

			<dt class={kvDt}>Inscription</dt>
			<dd class="text-[13.5px] text-ink">
				{new Date(rider.createdAt).toISOString().slice(0, 10)}
				<span class="ml-1.5 text-muted">· {ago}</span>
			</dd>

			{#if rider.bio}
				<dt class={kvDt}>Bio</dt>
				<dd class="text-[13px] leading-[1.5] text-[#4A5260]">{rider.bio}</dd>
			{/if}
		</dl>
	</div>
</section>
