<script lang="ts">
	import { getProfRegisterCtx } from './context';

	const ctx = getProfRegisterCtx();

	const steps = [
		{ n: '01', t: 'Identité', s: 'Photo, prénom, nom, bio' },
		{ n: '02', t: 'Disciplines', s: 'Sports & niveaux acceptés' },
		{ n: '03', t: 'Diplômes', s: 'Certifications à vérifier' },
		{ n: '04', t: 'Spots', s: "Ville & lieux d'enseignement" },
		{ n: '05', t: 'Tarifs', s: 'Grille indicative & matériel' },
		{ n: '06', t: 'Contact', s: 'Coordonnées visibles publiquement' },
		{ n: '07', t: 'Récap', s: 'Aperçu avant publication' }
	];
</script>

<aside class="sticky top-6">
	<div class="mb-3.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
		↳ ÉTAPES · 7
	</div>
	<div class="font-display text-[32px] leading-none font-black tracking-tight uppercase">
		Crée ton<br />profil moniteur.
	</div>
	<p class="mt-3.5 mb-5.5 text-[13.5px] leading-body text-muted">
		~8 minutes.
	</p>

	<!-- Progress bar -->
	<div class="mb-6 flex gap-0.75">
		{#each steps as _, i}
			<div class="h-1 flex-1 rounded-xs {i <= ctx.step ? 'bg-accent' : 'bg-line'}"></div>
		{/each}
	</div>

	<!-- Step list -->
	<div class="flex flex-col gap-0.5">
		{#each steps as s, i}
			{@const active = i === ctx.step}
			{@const done = i < ctx.step}
			<div
				class="grid items-center gap-3 rounded-md px-3 py-3 {active
					? 'border border-line bg-white'
					: 'border border-transparent'}"
				style="grid-template-columns: 34px 1fr"
			>
				<div
					class="flex h-7.5 w-7.5 items-center justify-center rounded-full font-mono text-label font-bold tracking-wide {done
						? 'bg-accent text-white'
						: active
							? 'bg-ink text-white'
							: 'border border-line text-muted'}"
				>
					{done ? '✓' : s.n}
				</div>
				<div>
					<div class="text-[13.5px] {active ? 'font-bold text-ink' : 'font-semibold text-muted'}">
						{s.t}
					</div>
					<div class="mt-0.5 font-mono text-micro tracking-wide text-muted uppercase">{s.s}</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Early adopter card -->
	<div class="relative mt-6 overflow-hidden rounded-[10px] bg-ink px-4.5 py-4">
		<div
			class="pointer-events-none absolute inset-0 opacity-50"
			style="background-image: repeating-linear-gradient(108deg, transparent 0 22px, rgba(255,255,255,.045) 22px 23px), repeating-linear-gradient(108deg, transparent 0 90px, rgba(255,255,255,.08) 90px 91px); mask-image: linear-gradient(95deg, transparent 0%, black 20%, black 80%, transparent 100%);"
		></div>
		<div class="relative">
			<div class="mb-2 font-mono text-micro tracking-widest text-accent-soft uppercase">
				★ EARLY ADOPTER
			</div>
			<div class="text-body-sm leading-relaxed text-white/85">
				Les 20 premiers moniteurs inscrits ont <b class="text-white">6 mois Premium offerts</b>.
			</div>
			<div class="mt-2.5 font-mono text-micro tracking-loose text-white/50">
				14/20 PLACES RESTANTES
			</div>
		</div>
	</div>
</aside>
