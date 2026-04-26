<div class="grid gap-6">
	<!-- Existing certs -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ DIPLÔMES UPLOADÉS
		</div>
		<div class="grid gap-2.5">
			{#each [
				{ n: 'BPJEPS · Glisses Aérotractées', y: '2013', s: 'verified', f: 'bpjeps_julien_2013.pdf' },
				{ n: 'IKO — Level 3 Senior Instructor', y: '2017', s: 'pending', f: 'iko_l3_certificate.pdf' }
			] as cert (cert.n)}
				<div class="flex flex-wrap items-center gap-3 rounded-[10px] border border-line bg-white px-5 py-4">
					<div class="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-bg-dark font-mono text-label font-bold">
						PDF
					</div>
					<div class="min-w-0 flex-1">
						<div class="text-[14px] font-bold">{cert.n}</div>
						<div class="mt-0.5 font-mono text-label tracking-wide text-muted uppercase">
							OBTENU EN {cert.y} · {cert.f}
						</div>
					</div>
					{#if cert.s === 'verified'}
						<span class="inline-flex items-center gap-1.5 rounded-[4px] bg-ink px-2.5 py-1 font-mono text-label font-semibold tracking-[0.04em] text-white uppercase">
							✓ VÉRIFIÉ
						</span>
					{:else}
						<span class="inline-flex items-center gap-1.5 rounded-[4px] bg-accent-soft px-2.5 py-1 font-mono text-label font-semibold tracking-[0.04em] text-ink uppercase">
							⏱ EN ATTENTE 48H
						</span>
					{/if}
					<button type="button" class="cursor-pointer font-mono text-label tracking-loose text-muted underline uppercase">
						Retirer
					</button>
				</div>
			{/each}
		</div>
	</div>

	<!-- Upload new cert -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ AJOUTER UN DIPLÔME
		</div>
		<div class="mb-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
			<div>
				<label for="cert-type" class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase">
					↳ TYPE DE DIPLÔME
				</label>
				<select
					id="cert-type"
					class="w-full appearance-none rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
					style="background-image: linear-gradient(45deg, transparent 50%, #6F7785 50%), linear-gradient(135deg, #6F7785 50%, transparent 50%); background-position: calc(100% - 18px) 18px, calc(100% - 13px) 18px; background-size: 5px 5px; background-repeat: no-repeat; padding-right: 38px;"
				>
					<option>BPJEPS · Glisses Aérotractées</option>
					<option>DE · Diplôme d'État</option>
					<option>IKO — Level 1/2/3</option>
					<option>VDWS · Wind/Kitesurf</option>
					<option>Autre</option>
				</select>
			</div>
			<div>
				<label for="cert-year" class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase">
					↳ ANNÉE D'OBTENTION
				</label>
				<input
					id="cert-year"
					type="text"
					placeholder="2022"
					class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink outline-none transition-all focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
				/>
			</div>
		</div>
		<div class="rounded-[10px] border-[1.5px] border-dashed border-muted bg-bg/60 px-7.5 py-10 text-center">
			<div class="mb-2 text-[32px]">↑</div>
			<div class="mb-1 text-[14px] font-bold">Glisser le scan ici, ou cliquer pour parcourir</div>
			<div class="font-mono text-label tracking-wide text-muted">PDF · JPG · PNG — 10 Mo max</div>
		</div>
	</div>

	<!-- Verification info card -->
	<div class="relative overflow-hidden rounded-[10px] bg-ink px-5.5 py-4.5">
		<div
			class="pointer-events-none absolute inset-0 opacity-50"
			style="background-image: repeating-linear-gradient(108deg, transparent 0 22px, rgba(255,255,255,.045) 22px 23px), repeating-linear-gradient(108deg, transparent 0 90px, rgba(255,255,255,.08) 90px 91px); mask-image: linear-gradient(95deg, transparent 0%, black 20%, black 80%, transparent 100%);"
		></div>
		<div class="relative grid items-center gap-4.5" style="grid-template-columns: auto 1fr">
			<div class="flex h-10.5 w-10.5 items-center justify-center rounded-full bg-accent text-xl font-bold text-white">
				✓
			</div>
			<div>
				<div class="mb-1 font-display text-[18px] font-black tracking-tight text-white uppercase">
					Vérification manuelle · 48h ouvrées
				</div>
				<div class="text-body-sm leading-relaxed text-white/80">
					Notre équipe contrôle chaque diplôme à la main. Tu reçois un mail dès l'activation du badge
					<b class="text-white">✓ Vérifié</b>. En attendant, ton profil reste visible mais sans badge.
				</div>
			</div>
		</div>
	</div>
</div>
