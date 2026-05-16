<script lang="ts">
	import WindLines from '../global/WindLines.svelte';
	import kitesurfLogo from '$lib/assets/kitesurf.svg';
	import wingfoilfLogo from '$lib/assets/wingfoil.svg';
	import windsurfLogo from '$lib/assets/windsurf.svg';
</script>

{#snippet sportCard(
	position: string,
	icon: string,
	prof: string,
	name: string,
	description: string,
	href: string
)}
	<a {href} class="group relative flex min-h-35 flex-col overflow-hidden rounded-xl bg-white">
		<!-- dark overlay + windlines, fades in on hover -->
		<div
			class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		>
			<div class="sport-dark absolute inset-0"></div>
			<WindLines withGrid={false} />
		</div>

		<div class="relative z-10 flex h-full flex-col p-7">
			<div class="absolute top-2 right-2">
				<img
					src={icon}
					alt="Icon {name}"
					class="h-22 invert transition-[filter] duration-300 group-hover:invert-0"
				/>
			</div>
			<div class="flex items-start justify-between">
				<div
					class="font-mono text-label font-semibold tracking-wider uppercase text-muted transition-colors duration-300 group-hover:text-white/40"
				>
					{position}
				</div>
			</div>
			<div
				class="mt-4 font-mono text-label font-semibold tracking-wider text-accent-soft uppercase"
			>
				{prof} MONITEURS
			</div>
			<h3
				class="mt-2 font-display text-[32px] leading-none font-black tracking-tight text-ink transition-colors duration-300 group-hover:text-white"
			>
				{name}
			</h3>
			<p class="mt-3 text-[14px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-white/60">
				{description}
			</p>
			<div class="mt-auto flex items-center justify-between pt-6">
				<span
					class="font-mono text-label font-semibold tracking-wider uppercase text-muted transition-colors duration-300 group-hover:text-white/40"
					>EXPLORER</span
				>
				<div
					class="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white"
				>
					→
				</div>
			</div>
		</div>
	</a>
{/snippet}

<section class="mx-auto max-w-360 px-5 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-18">
	<!-- Section header -->
	<div class="mb-10 flex flex-col items-end justify-between sm:flex-row">
		<div>
			<div class="mb-3 font-mono text-label font-semibold tracking-wider text-accent uppercase">
				↳ DISCIPLINES
			</div>
			<h2 class="text-[40px] leading-[0.95] tracking-tight sm:text-[54px] lg:text-[68px]">
				Trois sports.
				<span class="font-serif font-normal tracking-normal normal-case italic">
					Un même vent.</span
				>
			</h2>
		</div>
		<a
			href="/sports"
			class="font-mono text-label font-semibold tracking-wider text-muted uppercase transition-colors hover:text-ink"
		>
			Toutes les disciplines →
		</a>
	</div>

	<!-- 3 cards grid -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
		{@render sportCard(
			'01',
			kitesurfLogo,
			'312',
			'Kitesurf',
			'Aile, planche, lignes. Le plus enseigné du réseau.',
			'/sports#kitesurf'
		)}

		{@render sportCard(
			'02',
			wingfoilfLogo,
			'184',
			'Wingfoil',
			'Wing à la main, foil sous les pieds. Discipline en explosion.',
			'/sports#wingfoil'
		)}

		{@render sportCard(
			'03',
			windsurfLogo,
			'96',
			'Windsurf',
			"L'école originelle. Foil, freeride, vagues — tout y passe.",
			'/sports#windsurf'
		)}
	</div>
</section>

<style>
	.sport-dark {
		background: linear-gradient(135deg, #0e1a2b 0%, #07101c 100%);
	}
</style>
