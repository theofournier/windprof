<script lang="ts">
	import { getProfRegisterCtx } from './context';

	const ctx = getProfRegisterCtx();

	const SPORT_LABELS: Record<string, string> = {
		kitesurf: 'Kitesurf',
		wingfoil: 'Wingfoil',
		windsurf: 'Windsurf'
	};
	const RESPONSE_LABELS: Record<string, string> = {
		'30min': '≈ 30 MIN',
		'2h': '≈ 2H',
		same_day: 'DANS LA JOURNÉE',
		within_24h: 'SOUS 24H'
	};
</script>

<div class="grid gap-3.5">
	<!-- Profile header card -->
	<div
		class="grid grid-cols-[auto_1fr] items-center gap-4.5 rounded-[10px] border border-line bg-white px-5.5 py-4.5"
	>
		<div
			class="h-20 w-20 rounded-full"
			style="background: repeating-linear-gradient(45deg, #E6DFD0 0px, #E6DFD0 4px, #D9D4CB 4px, #D9D4CB 8px)"
		></div>
		<div>
			<div class="font-display text-[30px] font-black leading-none tracking-tight uppercase">
				{ctx.data.firstName}
				{ctx.data.lastName}
			</div>
			<div class="mt-1 text-[13.5px] text-muted">
				{ctx.data.city}{ctx.data.region ? ' — ' + ctx.data.region : ''}
			</div>
			<div class="mt-2.5 flex flex-wrap gap-1.5">
				{#each ctx.data.sports as s (s.sport)}
					<span
						class="inline-flex items-center gap-1.5 rounded-[4px] bg-ink px-2.5 py-1 font-mono text-label font-semibold tracking-[0.04em] text-white uppercase"
					>
						{SPORT_LABELS[s.sport] ?? s.sport}
					</span>
				{/each}
			</div>
		</div>
	</div>

	<!-- Recap grid -->
	<div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
		<!-- Diplômes -->
		<div class="rounded-[10px] border border-line bg-white px-5.5 py-5">
			<div class="mb-3 flex items-center justify-between">
				<div class="font-mono text-label font-semibold tracking-widest text-accent uppercase">
					↳ DIPLÔMES
				</div>
				<button
					type="button"
					onclick={() => ctx.goTo(2)}
					class="cursor-pointer font-mono text-label tracking-loose text-muted underline uppercase"
					>Modifier</button
				>
			</div>
			<div class="text-[13.5px] leading-relaxed">
				{#if ctx.data.certifications.length}
					{#each ctx.data.certifications as c (c.type + c.year)}
						{c.type}{c.year ? ' · ' + c.year : ''}
						<span class="font-mono text-micro text-accent-soft">EN ATTENTE</span><br />
					{/each}
				{:else}
					<span class="text-muted">Aucun diplôme ajouté</span>
				{/if}
			</div>
		</div>

		<!-- Spots -->
		<div class="rounded-[10px] border border-line bg-white px-5.5 py-5">
			<div class="mb-3 flex items-center justify-between">
				<div class="font-mono text-label font-semibold tracking-widest text-accent uppercase">
					↳ SPOTS
				</div>
				<button
					type="button"
					onclick={() => ctx.goTo(3)}
					class="cursor-pointer font-mono text-label tracking-loose text-muted underline uppercase"
					>Modifier</button
				>
			</div>
			<div class="text-[13.5px] leading-relaxed">
				{#if ctx.data.spots.length}
					{#each ctx.data.spots as spot (spot.name)}
						{spot.name}{spot.isPrimary ? ' (principal)' : ''}<br />
					{/each}
				{:else}
					<span class="text-muted">Aucun spot ajouté</span>
				{/if}
			</div>
		</div>

		<!-- Tarifs -->
		<div class="rounded-[10px] border border-line bg-white px-5.5 py-5">
			<div class="mb-3 flex items-center justify-between">
				<div class="font-mono text-label font-semibold tracking-widest text-accent uppercase">
					↳ TARIFS
				</div>
				<button
					type="button"
					onclick={() => ctx.goTo(4)}
					class="cursor-pointer font-mono text-label tracking-loose text-muted underline uppercase"
					>Modifier</button
				>
			</div>
			<div class="text-[13.5px] leading-[1.7]">
				{#if ctx.data.prices.length}
					{#each ctx.data.prices as p (p.description)}
						{p.description}{p.duration ? ' · ' + p.duration : ''} — <b>{p.priceEur} €</b><br />
					{/each}
				{:else}
					<span class="text-muted">Aucun tarif renseigné</span>
				{/if}
			</div>
		</div>

		<!-- Contact -->
		<div class="rounded-[10px] border border-line bg-white px-5.5 py-5">
			<div class="mb-3 flex items-center justify-between">
				<div class="font-mono text-label font-semibold tracking-widest text-accent uppercase">
					↳ CONTACT
				</div>
				<button
					type="button"
					onclick={() => ctx.goTo(5)}
					class="cursor-pointer font-mono text-label tracking-loose text-muted underline uppercase"
					>Modifier</button
				>
			</div>
			<div class="text-[13.5px] leading-relaxed">
				{#if ctx.data.phone}{ctx.data.phone}<br />{/if}
				{#if ctx.data.contactEmail}{ctx.data.contactEmail}<br />{/if}
				{#if ctx.data.responseTime}
					<span class="font-mono text-label tracking-wide text-muted">
						Délai moyen {RESPONSE_LABELS[ctx.data.responseTime] ?? ctx.data.responseTime}
					</span>
				{/if}
				{#if !ctx.data.phone && !ctx.data.contactEmail}
					<span class="text-muted">Non renseigné</span>
				{/if}
			</div>
		</div>
	</div>

	<!-- Terms notice -->
	<div class="rounded-lg bg-bg-dark px-4.5 py-3.5 text-body-sm leading-relaxed text-muted">
		✓ En publiant, tu acceptes les <u>CGU moniteur</u> et confirmes que les diplômes ajoutés
		t'appartiennent. La vérification prend ~48h ouvrées.
	</div>
</div>
