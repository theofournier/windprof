<script lang="ts">
	import logo from '$lib/assets/logo.svg';
</script>

<footer class="bg-ink px-5 py-9 text-white/70 sm:px-10 sm:pt-16 lg:px-14">
	<div
		class="mx-auto grid max-w-360 grid-cols-2 gap-8 sm:grid-cols-[2fr_1fr_1fr] lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] lg:gap-10"
	>
		<div class="col-span-2 sm:col-span-1">
			<div class="mb-4.5 flex items-center gap-2.5">
				<img src={logo} alt="Logo Windprof" class="h-6" />
				<span class="font-display text-xl font-black tracking-[-0.03em] text-white uppercase"
					>Windprof</span
				>
			</div>
			<p class="max-w-[320px] text-body-sm leading-relaxed">
				L'annuaire des moniteurs indépendants de sports de vent en France. Prévisions, diplômes
				vérifiés, contact direct.
			</p>
		</div>

		<div class="flex flex-col">
			<div class="mb-3.5 font-mono text-label tracking-label text-white/40">PRODUIT</div>
			<a href="/profs" class="mb-2 text-body-sm">Moniteurs</a>
			<a href="/become-prof" class="mb-2 text-body-sm">Devenir moniteur</a>
		</div>

		<div class="flex flex-col">
			<div class="mb-3.5 font-mono text-label tracking-label text-white/40">DISCIPLINES</div>
			<a href="/sports#kitesurf" class="mb-2 text-body-sm">Kitesurf</a>
			<a href="/sports#wingfoil" class="mb-2 text-body-sm">Wingfoil</a>
			<a href="/sports#windsurf" class="mb-2 text-body-sm">Windsurf</a>
		</div>

		<div class="flex flex-col">
			<div class="mb-3.5 font-mono text-label tracking-label text-white/40">ENTREPRISE</div>
			<a href="/about" class="mb-2 text-body-sm">À propos</a>
			<a href="/blog" class="mb-2 text-body-sm">Blog</a>
			<a href="/contact" class="mb-2 text-body-sm">Contact</a>
		</div>

		<div class="flex flex-col">
			<div class="mb-3.5 font-mono text-label tracking-label text-white/40">LÉGAL</div>
			<a href="/cgu" class="mb-2 text-body-sm">CGU</a>
			<a href="/privacy" class="mb-2 text-body-sm">Confidentialité</a>
			<a href="/legal" class="mb-2 text-body-sm">Mentions</a>
		</div>
	</div>

	<div
		class="mx-auto mt-10 flex max-w-360 flex-col gap-2 border-t border-white/8 pt-5.5 font-mono text-label tracking-loose text-white/45 sm:flex-row sm:justify-between"
	>
		<span>© 2026 WINDPROF</span>
		<span class="sm:text-right">49°.20'N · 1°.41'O · FAIT AVEC DU VENT · PORTBAIL-SUR-MER</span>
	</div>
</footer>
