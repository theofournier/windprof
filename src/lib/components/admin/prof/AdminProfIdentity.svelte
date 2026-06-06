<script lang="ts">
	import type { AdminProfDetail } from './types';
	import { tag, sectionHeader, parseLangs, registeredAgo } from './types';

	let { prof }: { prof: AdminProfDetail } = $props();

	const langs = $derived(parseLangs(prof.languages));
	const ago = $derived(registeredAgo(prof.createdAt));

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
			<dd class="text-[13.5px] text-ink">{prof.firstName} {prof.lastName}</dd>

			<dt class={kvDt}>Email</dt>
			<dd class="text-[13.5px] text-ink">
				<span class="font-mono text-[12.5px]">{prof.user?.email ?? '—'}</span>
				{#if prof.contactEmail}
					<span class="font-mono text-[12.5px]">({prof.contactEmail})</span>
				{/if}
				{#if prof.user?.emailVerified}
					<span class="ml-2 font-mono text-[10.5px] font-bold tracking-loose text-[#1f6f47]"
						>● VÉRIFIÉ</span
					>
				{:else}
					<span class="ml-2 font-mono text-[10.5px] font-bold tracking-loose text-[#9a3a2c]"
						>● NON VÉRIFIÉ</span
					>
				{/if}
			</dd>

			<dt class={kvDt}>Téléphone</dt>
			<dd class="text-[13.5px] text-ink">
				{#if prof.phone}
					<span class="font-mono text-[12.5px]">{prof.phone}</span>
				{:else}
					<span class="text-muted">—</span>
				{/if}
			</dd>

			<dt class={kvDt}>Inscription</dt>
			<dd class="text-[13.5px] text-ink">
				{new Date(prof.createdAt).toISOString().slice(0, 10)}
				<span class="ml-1.5 text-muted">· {ago}</span>
			</dd>

			<dt class={kvDt}>Localisation</dt>
			<dd class="text-[13.5px] text-ink">
				{prof.city}{#if prof.region}
					· {prof.region}{/if}
			</dd>

			{#if langs.length > 0}
				<dt class={kvDt}>Langues</dt>
				<dd class="text-[13.5px] text-ink">
					<div class="flex flex-wrap gap-1.5">
						{#each langs as lang (lang)}
							<span class={tag}>{lang}</span>
						{/each}
					</div>
				</dd>
			{/if}
		</dl>
	</div>
</section>
