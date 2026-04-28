<script lang="ts">
	import { getProfRegisterCtx, type ContactVisibility, type ResponseTime } from './context';

	const ctx = getProfRegisterCtx();

	const VISIBILITY: Array<{ value: ContactVisibility; label: string; desc: string }> = [
		{ value: 'phone_email', label: 'Téléphone + email', desc: 'Recommandé' },
		{ value: 'email_only', label: 'Email seulement', desc: 'Si tu préfères filtrer' },
		{ value: 'phone_only', label: 'Téléphone seulement', desc: 'Réponse plus rapide' }
	];

	const RESPONSE_TIMES: Array<{ value: ResponseTime; label: string }> = [
		{ value: '30min', label: '≈ 30 min' },
		{ value: '2h', label: '≈ 2 h' },
		{ value: 'same_day', label: 'Dans la journée' },
		{ value: 'within_24h', label: 'Sous 24 h' }
	];
</script>

<div class="grid gap-5.5">
	<!-- Info card -->
	<div class="relative overflow-hidden rounded-[10px] bg-ink px-5.5 py-4.5">
		<div
			class="pointer-events-none absolute inset-0 opacity-50"
			style="background-image: repeating-linear-gradient(108deg, transparent 0 22px, rgba(255,255,255,.045) 22px 23px), repeating-linear-gradient(108deg, transparent 0 90px, rgba(255,255,255,.08) 90px 91px); mask-image: linear-gradient(95deg, transparent 0%, black 20%, black 80%, transparent 100%);"
		></div>
		<div class="relative">
			<div class="mb-2 font-mono text-label font-semibold tracking-widest text-accent uppercase">
				↳ TU GARDES LA MAIN
			</div>
			<div class="max-w-135 text-[14px] leading-body text-white/85">
				Les riders te contactent <b class="text-white">directement</b> par téléphone ou email — pas de
				messagerie tierce, pas de commission. Tu fais ton planning comme tu veux.
			</div>
		</div>
	</div>

	<!-- Phone + email -->
	<div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
		<div>
			<label
				for="phone"
				class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase"
			>
				↳ TÉLÉPHONE
			</label>
			<div class="mb-1.5 font-mono text-[10.5px] tracking-wide text-muted">
				Affiché sur ta fiche publique
			</div>
			<input
				id="phone"
				type="tel"
				placeholder="06 12 34 56 78"
				bind:value={ctx.data.phone}
				class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
			/>
		</div>
		<div>
			<label
				for="contact-email"
				class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase"
			>
				↳ EMAIL DE CONTACT
			</label>
			<div class="mb-1.5 font-mono text-[10.5px] tracking-wide text-muted">
				Peut différer de l'email du compte
			</div>
			<input
				id="contact-email"
				type="email"
				placeholder="contact@…"
				bind:value={ctx.data.contactEmail}
				class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
			/>
		</div>
	</div>

	<!-- Visibility -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ VISIBILITÉ DES COORDONNÉES
		</div>
		<div class="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
			{#each VISIBILITY as opt (opt.value)}
				{@const on = ctx.data.contactVisibility === opt.value}
				<div
					role="radio"
					aria-checked={on}
					tabindex="0"
					onclick={() => (ctx.data.contactVisibility = opt.value)}
					onkeydown={(e) => e.key === 'Enter' && (ctx.data.contactVisibility = opt.value)}
					class="cursor-pointer rounded-[10px] border p-4 {on
						? 'border-ink bg-white'
						: 'border-line bg-bg-card'}"
				>
					<div class="mb-1 flex items-center gap-2">
						<span
							class="flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white {on
								? 'bg-accent'
								: 'border-[1.5px] border-line bg-transparent'}"
						>
							{on ? '●' : ''}
						</span>
						<span class="text-[13.5px] font-bold">{opt.label}</span>
					</div>
					<div class="pl-6 text-[11.5px] text-muted">{opt.desc}</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Response time -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ DÉLAI DE RÉPONSE MOYEN
		</div>
		<div class="mb-2 font-mono text-[10.5px] tracking-wide text-muted">
			Indication affichée à côté du dot 'en ligne' — incite les riders à appeler
		</div>
		<div class="flex flex-wrap gap-2">
			{#each RESPONSE_TIMES as opt (opt.value)}
				{@const on = ctx.data.responseTime === opt.value}
				<span
					role="radio"
					aria-checked={on}
					tabindex="0"
					onclick={() => (ctx.data.responseTime = opt.value)}
					onkeydown={(e) => e.key === 'Enter' && (ctx.data.responseTime = opt.value)}
					class="inline-flex cursor-pointer items-center gap-1.5 rounded-[4px] px-3.5 py-2 font-mono text-label font-semibold tracking-[0.04em] uppercase {on
						? 'bg-ink text-white'
						: 'border border-line bg-transparent'}"
				>
					{opt.label}
				</span>
			{/each}
		</div>
	</div>
</div>
