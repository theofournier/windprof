<script lang="ts">
	import WindLines from '../global/WindLines.svelte';
</script>

<aside class="relative flex flex-1 flex-col overflow-hidden bg-ink text-white">
	<WindLines />

	<div class="relative z-10 flex flex-1 flex-col px-14 pt-12 pb-10">
		<!-- Main editorial block -->
		<div>
			<div
				class="mb-[18px] font-mono text-[11px] font-semibold tracking-label text-accent uppercase"
			>
				↳ BIENVENUE / RE-CONNEXION
			</div>
			<h1
				class="mb-7 font-serif text-[clamp(42px,5vw,68px)] leading-[0.98] text-white"
				style="font-weight: 500; letter-spacing: -0.025em; text-wrap: balance;"
			>
				Re-bonjour.<br />
				<em style="font-style: italic; font-weight: 400; color: #E8724C;">Le vent t'attend.</em>
			</h1>
			<p class="max-w-[460px] text-[16px] leading-relaxed text-white/80">
				Reprends là où tu en étais.
			</p>
		</div>
	</div>
</aside>
