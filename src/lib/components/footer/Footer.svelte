<script lang="ts">
	import logo from '$lib/assets/logo.svg';
</script>

<footer class="bg-ink px-14 pt-16 pb-9 text-white/70">
	<div class="mx-auto mb-12 flex max-w-360 items-center gap-5 border-b border-white/8 pb-8">
		<div class="font-mono text-[10px] tracking-widest text-white/40">BEAUFORT · 0–12</div>
		<div class="grid h-6.5 flex-1 grid-cols-[repeat(13,1fr)] items-end gap-0.5">
			<div class="rounded-t-[1px] bg-white/15" style="height:6px"></div>
			<div class="rounded-t-[1px] bg-white/15" style="height:7.6px"></div>
			<div class="rounded-t-[1px] bg-white/15" style="height:9.2px"></div>
			<div class="rounded-t-[1px] bg-success" style="height:10.8px"></div>
			<div class="rounded-t-[1px] bg-success" style="height:12.4px"></div>
			<div class="rounded-t-[1px] bg-success" style="height:14px"></div>
			<div class="rounded-t-[1px] bg-accent-soft" style="height:15.6px"></div>
			<div class="rounded-t-[1px] bg-accent-soft" style="height:17.2px"></div>
			<div class="rounded-t-[1px] bg-accent-soft" style="height:18.8px"></div>
			<div class="rounded-t-[1px] bg-accent" style="height:20.4px"></div>
			<div class="rounded-t-[1px] bg-accent" style="height:22px"></div>
			<div class="rounded-t-[1px] bg-accent" style="height:23.6px"></div>
			<div class="rounded-t-[1px] bg-accent" style="height:25.2px"></div>
		</div>
		<div class="font-mono text-[10px] tracking-widest text-white/40">0 → 64+ KT</div>
	</div>

	<div class="mx-auto grid max-w-360 grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10">
		<div>
			<div class="mb-4.5 flex items-center gap-2.5">
				<img src={logo} alt="Logo Windprof" class="h-6" />
				<span class="font-display text-xl font-black tracking-[-0.03em] text-white uppercase"
					>Windprof</span
				>
			</div>
			<p class="max-w-[320px] text-[13px] leading-relaxed">
				L'annuaire des moniteurs indépendants de sports de vent en France. Prévisions, diplômes
				vérifiés, contact direct.
			</p>
		</div>

		<div class="flex flex-col">
			<div class="mb-3.5 font-mono text-[11px] tracking-[0.14em] text-white/40">PRODUIT</div>
			<a href="/profs" class="mb-2 text-[13px]">Moniteurs</a>
			<a href="/spots" class="mb-2 text-[13px]">Spots</a>
			<a href="/prof-register" class="mb-2 text-[13px]">Devenir moniteur</a>
		</div>

		<div class="flex flex-col">
			<div class="mb-3.5 font-mono text-[11px] tracking-[0.14em] text-white/40">DISCIPLINES</div>
			<a href="/sports/kitesurf" class="mb-2 text-[13px]">Kitesurf</a>
			<a href="/sports/wingfoil" class="mb-2 text-[13px]">Wingfoil</a>
			<a href="/sports/windsurf" class="mb-2 text-[13px]">Windsurf</a>
		</div>

		<div class="flex flex-col">
			<div class="mb-3.5 font-mono text-[11px] tracking-[0.14em] text-white/40">ENTREPRISE</div>
			<a href="/about" class="mb-2 text-[13px]">À propos</a>
			<a href="/blog" class="mb-2 text-[13px]">Blog</a>
			<a href="/contact" class="mb-2 text-[13px]">Contact</a>
		</div>

		<div class="flex flex-col">
			<div class="mb-3.5 font-mono text-[11px] tracking-[0.14em] text-white/40">LÉGAL</div>
			<a href="/cgu" class="mb-2 text-[13px]">CGU</a>
			<a href="/privacy" class="mb-2 text-[13px]">Confidentialité</a>
			<a href="/legal" class="mb-2 text-[13px]">Mentions</a>
		</div>
	</div>

	<div
		class="mx-auto mt-10 flex max-w-360 justify-between border-t border-white/8 pt-5.5 font-mono text-[11px] tracking-[0.1em] text-white/45"
	>
		<span>© 2026 WINDPROF</span>
		<span>49°.20'N · 1°.41'O · FAIT AVEC DU VENT · PORTBAIL-SUR-MER</span>
	</div>
</footer>
