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
	<div class="grid grid-cols-2 gap-3.5">
		<div>
			<label for="phone" class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase">
				↳ TÉLÉPHONE
			</label>
			<div class="mb-1.5 font-mono text-[10.5px] tracking-wide text-muted">
				Affiché sur ta fiche publique
			</div>
			<input
				id="phone"
				type="tel"
				value="06 12 34 56 42"
				placeholder="06 12 34 56 78"
				class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
			/>
		</div>
		<div>
			<label for="contact-email" class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase">
				↳ EMAIL DE CONTACT
			</label>
			<div class="mb-1.5 font-mono text-[10.5px] tracking-wide text-muted">
				Peut différer de l'email du compte
			</div>
			<input
				id="contact-email"
				type="email"
				value="julien.mercier@leucate-kite.fr"
				placeholder="contact@…"
				class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
			/>
		</div>
	</div>

	<!-- Visibility -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ VISIBILITÉ DES COORDONNÉES
		</div>
		<div class="grid grid-cols-3 gap-2.5">
			{#each [
				{ n: 'Téléphone + email', d: 'Recommandé', on: true },
				{ n: 'Email seulement', d: 'Si tu préfères filtrer', on: false },
				{ n: 'Téléphone seulement', d: 'Réponse plus rapide', on: false }
			] as opt}
				<div class="cursor-pointer rounded-[10px] border p-4 {opt.on ? 'border-ink bg-white' : 'border-line bg-bg-card'}">
					<div class="mb-1 flex items-center gap-2">
						<span class="flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white {opt.on ? 'bg-accent' : 'border-[1.5px] border-line bg-transparent'}">
							{opt.on ? '●' : ''}
						</span>
						<span class="text-[13.5px] font-bold">{opt.n}</span>
					</div>
					<div class="pl-6 text-[11.5px] text-muted">{opt.d}</div>
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
			{#each [
				{ t: '≈ 30 min', on: false },
				{ t: '≈ 2 h', on: true },
				{ t: 'Dans la journée', on: false },
				{ t: 'Sous 24 h', on: false }
			] as opt}
				<span class="inline-flex cursor-pointer items-center gap-1.5 rounded-[4px] px-3.5 py-2 font-mono text-label font-semibold tracking-[0.04em] uppercase {opt.on ? 'bg-ink text-white' : 'border border-line bg-transparent'}">
					{opt.t}
				</span>
			{/each}
		</div>
	</div>
</div>
