<script lang="ts">
	import compass from '$lib/assets/compass.svg';
</script>

<section></section>

<section class="section relative">
	<div class="relative z-10 mx-auto max-w-360 px-5 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
		<h1
			class="mb-2 max-w-300 font-display text-[52px]/[0.92] text-white uppercase sm:text-[90px] lg:text-[140px]"
		>
			Chase the wind.
		</h1>
		<p class="mb-6 font-serif text-2xl font-normal tracking-snug text-accent italic sm:text-3xl lg:text-4xl">
			Et trouve le moniteur qui va avec.
		</p>
		<p class="mb-8 max-w-130 text-base/normal text-white/70 sm:text-lg">
			Windmatch croise les <b class="text-white">prévisions de vent</b> et l'annuaire des
			<b class="text-white">moniteurs indépendants</b> diplômés BPJEPS, DE, IKO et VDWS. Contact direct,
			zéro commission.
		</p>
		<a
			href="/profs"
			class="inline-block rounded-md bg-accent px-6 py-4 font-display text-sm font-bold text-white uppercase"
			>Chercher votre moniteur idéal →</a
		>
		<div class="mt-10 flex flex-wrap gap-5 font-mono text-caption text-white/55 uppercase sm:gap-9">
			<span>↳ 247 moniteurs</span>
			<span>↳ 60 spots</span>
			<span>↳ 3 disciplines</span>
		</div>
	</div>
	<img
		src={compass}
		alt="Illustration d'une boussole"
		class="absolute -bottom-10 -left-10 hidden h-55 w-55 opacity-80 lg:block"
	/>
	<div class="hero-grid absolute inset-0 opacity-40"></div>
	<div class="hero-wind absolute inset-0 opacity-50"></div>
</section>

<style>
	.section {
		background:
			radial-gradient(ellipse 60% 80% at 85% 100%, rgba(232, 114, 76, 0.22), transparent 60%),
			radial-gradient(ellipse 80% 60% at 10% 0%, rgba(23, 50, 79, 0.6), transparent 60%),
			linear-gradient(180deg, #07101c 0%, #0e1a2b 50%, #14243b 100%);
	}
	.hero-grid {
		background-image:
			linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
			linear-gradient(180deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
		background-size: 80px 80px;
		mask-image: radial-gradient(ellipse at 30% 40%, black, transparent 75%);
	}
	.hero-wind {
		background-image:
			repeating-linear-gradient(108deg, transparent 0 22px, rgba(255, 255, 255, 0.045) 22px 23px),
			repeating-linear-gradient(108deg, transparent 0 90px, rgba(255, 255, 255, 0.08) 90px 91px);
		mask-image: linear-gradient(95deg, transparent 0%, black 20%, black 80%, transparent 100%);
	}
</style>
