<script lang="ts">
	import { getProfRegisterCtx } from './context';

	const ctx = getProfRegisterCtx();

	const CERT_TYPES = [
		'BPJEPS · Glisses Aérotractées',
		"DE · Diplôme d'État",
		'IKO — Level 1/2/3',
		'VDWS · Wind/Kitesurf',
		'Autre'
	];

	let newType = $state(CERT_TYPES[0]);
	let newCustomType = $state('');
	let newYear = $state('');
	let newFile: File | null = $state(null);

	function addCert() {
		const resolvedType = newType === 'Autre' ? newCustomType.trim() : newType;
		if (!resolvedType) return;
		ctx.data.certifications.push({ type: resolvedType, year: newYear.trim(), file: newFile });
		newYear = '';
		newFile = null;
		newCustomType = '';
	}

	function removeCert(idx: number) {
		ctx.data.certifications.splice(idx, 1);
	}

	function onFileChange(e: Event) {
		const input = e.currentTarget as HTMLInputElement;
		newFile = input.files?.[0] ?? null;
	}
</script>

<div class="grid gap-6">
	<!-- Existing certs -->
	{#if ctx.data.certifications.length > 0}
		<div>
			<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
				↳ DIPLÔMES AJOUTÉS
			</div>
			<div class="grid gap-2.5">
				{#each ctx.data.certifications as cert, i (i)}
					<div
						class="flex flex-wrap items-center gap-3 rounded-[10px] border border-line bg-white px-5 py-4"
					>
						<div
							class="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-bg-dark font-mono text-label font-bold"
						>
							DIP
						</div>
						<div class="min-w-0 flex-1">
							<div class="text-[14px] font-bold">{cert.type}</div>
							{#if cert.year}
								<div class="mt-0.5 font-mono text-label tracking-wide text-muted uppercase">
									OBTENU EN {cert.year}
								</div>
							{/if}
							{#if cert.fileUrl}
								<a
									href={cert.fileUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="mt-0.5 inline-block font-mono text-label tracking-wide text-accent underline"
								>
									📎 {cert.fileName ?? cert.file?.name ?? 'Justificatif'}
								</a>
							{:else if cert.file}
								<div class="mt-0.5 font-mono text-label tracking-wide text-muted">
									📎 {cert.file.name}
								</div>
							{/if}
						</div>
						{#if cert.status === 'verified'}
							<span
								class="inline-flex items-center gap-1.5 rounded-[4px] bg-accent px-2.5 py-1 font-mono text-label font-semibold tracking-[0.04em] text-white uppercase"
							>
								✓ VÉRIFIÉ
							</span>
						{:else if cert.status === 'rejected'}
							<span
								class="inline-flex items-center gap-1.5 rounded-[4px] bg-red-100 px-2.5 py-1 font-mono text-label font-semibold tracking-[0.04em] text-red-700 uppercase"
							>
								✕ REFUSÉ
							</span>
						{:else}
							<span
								class="inline-flex items-center gap-1.5 rounded-[4px] bg-accent-soft px-2.5 py-1 font-mono text-label font-semibold tracking-[0.04em] text-ink uppercase"
							>
								⏱ EN ATTENTE
							</span>
						{/if}
						<button
							type="button"
							onclick={() => removeCert(i)}
							class="cursor-pointer font-mono text-label tracking-loose text-muted uppercase underline"
						>
							Retirer
						</button>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Add cert -->
	<div>
		<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ AJOUTER UN DIPLÔME
		</div>
		<div class="mb-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
			<div>
				<label
					for="cert-type"
					class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase"
				>
					↳ TYPE DE DIPLÔME
				</label>
				<select
					id="cert-type"
					bind:value={newType}
					class="w-full appearance-none rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink transition-all outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
					style="background-image: linear-gradient(45deg, transparent 50%, #6F7785 50%), linear-gradient(135deg, #6F7785 50%, transparent 50%); background-position: calc(100% - 18px) 18px, calc(100% - 13px) 18px; background-size: 5px 5px; background-repeat: no-repeat; padding-right: 38px;"
				>
					{#each CERT_TYPES as t (t)}
						<option value={t}>{t}</option>
					{/each}
				</select>
			</div>
			<div>
				<label
					for="cert-year"
					class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase"
				>
					↳ ANNÉE D'OBTENTION
				</label>
				<input
					id="cert-year"
					type="text"
					placeholder="2022"
					bind:value={newYear}
					class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink transition-all outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
				/>
			</div>

			{#if newType === 'Autre'}
				<div class="sm:col-span-2">
					<label
						for="cert-custom"
						class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase"
					>
						↳ NOM DU DIPLÔME
					</label>
					<input
						id="cert-custom"
						type="text"
						placeholder="Ex : Brevet National de Sécurité et de Sauvetage Aquatique"
						bind:value={newCustomType}
						class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14.5px] text-ink transition-all outline-none focus:border-ink focus:shadow-[0_0_0_3px_rgba(14,26,43,.08)]"
					/>
				</div>
			{/if}

			<div class="sm:col-span-2">
				<label
					for="cert-file"
					class="mb-2.5 block font-mono text-label font-semibold tracking-widest text-accent uppercase"
				>
					↳ JUSTIFICATIF <span class="font-sans font-normal tracking-normal text-muted normal-case"
						>(optionnel — PDF ou image)</span
					>
				</label>
				<input
					id="cert-file"
					type="file"
					accept=".pdf,image/jpeg,image/png,image/webp"
					onchange={onFileChange}
					class="w-full rounded-md border border-line bg-white px-3.5 py-3 font-sans text-[14px] text-ink transition-all outline-none file:mr-3 file:cursor-pointer file:rounded file:border-0 file:bg-bg-dark file:px-3 file:py-1 file:font-mono file:text-label file:font-semibold file:uppercase focus:border-ink"
				/>
			</div>
		</div>
		<button
			type="button"
			onclick={addCert}
			class="inline-flex cursor-pointer items-center gap-2.5 rounded-md border-[1.5px] border-ink bg-transparent px-4.5 py-3 font-display text-body-sm font-bold tracking-wide text-ink uppercase hover:opacity-80"
		>
			+ Ajouter ce diplôme
		</button>
	</div>

	<!-- Verification info card -->
	<div class="relative overflow-hidden rounded-[10px] bg-ink px-5.5 py-4.5">
		<div
			class="pointer-events-none absolute inset-0 opacity-50"
			style="background-image: repeating-linear-gradient(108deg, transparent 0 22px, rgba(255,255,255,.045) 22px 23px), repeating-linear-gradient(108deg, transparent 0 90px, rgba(255,255,255,.08) 90px 91px); mask-image: linear-gradient(95deg, transparent 0%, black 20%, black 80%, transparent 100%);"
		></div>
		<div class="relative grid items-center gap-4.5" style="grid-template-columns: auto 1fr">
			<div
				class="flex h-10.5 w-10.5 items-center justify-center rounded-full bg-accent text-xl font-bold text-white"
			>
				✓
			</div>
			<div>
				<div class="mb-1 font-display text-[18px] font-black tracking-tight text-white uppercase">
					Vérification manuelle · 48h ouvrées
				</div>
				<div class="text-body-sm leading-relaxed text-white/80">
					Notre équipe contrôle chaque diplôme à la main. Tu reçois un mail dès l'activation du
					badge
					<b class="text-white">✓ Vérifié</b>. En attendant, ton profil reste visible mais sans
					badge.
				</div>
			</div>
		</div>
	</div>
</div>
