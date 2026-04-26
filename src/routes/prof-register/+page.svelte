<script lang="ts">
	import { setContext } from 'svelte';
	import ProfRegisterHeader from '$lib/components/prof-register/ProfRegisterHeader.svelte';
	import ProfRegisterSidebar from '$lib/components/prof-register/ProfRegisterSidebar.svelte';
	import ProfRegisterNav from '$lib/components/prof-register/ProfRegisterNav.svelte';
	import StepIdentity from '$lib/components/prof-register/StepIdentity.svelte';
	import StepDisciplines from '$lib/components/prof-register/StepDisciplines.svelte';
	import StepCerts from '$lib/components/prof-register/StepCerts.svelte';
	import StepSpots from '$lib/components/prof-register/StepSpots.svelte';
	import StepPrices from '$lib/components/prof-register/StepPrices.svelte';
	import StepContact from '$lib/components/prof-register/StepContact.svelte';
	import StepReview from '$lib/components/prof-register/StepReview.svelte';

	const TOTAL_STEPS = 7;

	let step = $state(0);

	setContext('profRegister', {
		get step() {
			return step;
		},
		next() {
			step = Math.min(TOTAL_STEPS - 1, step + 1);
		},
		prev() {
			step = Math.max(0, step - 1);
		}
	});

	const stepTitles = [
		'Qui es-tu ?',
		'Que fais-tu glisser ?',
		'Tes diplômes.',
		'Où enseignes-tu ?',
		'Tes tarifs.',
		'Comment te joindre ?',
		'Prêt à publier.'
	];

	const stepIntros = [
		"Une photo nette, ton vrai nom, et trois phrases pour te présenter. C'est ce que les riders verront en premier.",
		'Coche tes disciplines et les niveaux que tu acceptes. Tu pourras affiner spot par spot plus tard.',
		'Upload tes diplômes BPJEPS / DE / IKO / VDWS. Notre équipe vérifie sous 48h et active ton badge ✓ Vérifié.',
		"Indique ta ville principale et tes spots habituels. La carte interactive arrive au MVP 2 — pour l'instant, du texte libre.",
		'Tarifs indicatifs par discipline. Les riders te contactent directement, tu négocies en direct, sans commission.',
		"Téléphone et/ou email. Ces infos seront affichées sur ta fiche publique : c'est le cœur de la promesse Windmatch.",
		'Vérifie que tout est bon. Tu pourras éditer ton profil à tout moment depuis ton dashboard.'
	];

	const stepNumbers = ['01', '02', '03', '04', '05', '06', '07'];
</script>

<div class="min-h-screen bg-bg">
	<ProfRegisterHeader />

	<div
		class="mx-auto px-4 pt-6 pb-16 sm:px-8 lg:grid lg:items-start lg:gap-12 lg:px-14 lg:pt-10 lg:pb-20 lg:grid-cols-[280px_1fr]"
		style="max-width: 1320px"
	>
		<div class="hidden lg:block">
			<ProfRegisterSidebar />
		</div>

		<main class="min-w-0">
			<div class="mb-2.5 font-mono text-[11px] font-semibold tracking-widest text-accent uppercase">
				↳ ÉTAPE {stepNumbers[step]} / 07
			</div>
			<h1
				class="m-0 mb-3 font-display text-[36px] leading-[0.95] font-black tracking-tight uppercase sm:text-[44px] lg:text-[54px]"
			>
				{stepTitles[step]}
			</h1>
			<p class="mb-8 max-w-[560px] text-[15.5px] leading-body text-muted">
				{stepIntros[step]}
			</p>

			{#if step === 0}
				<StepIdentity />
			{:else if step === 1}
				<StepDisciplines />
			{:else if step === 2}
				<StepCerts />
			{:else if step === 3}
				<StepSpots />
			{:else if step === 4}
				<StepPrices />
			{:else if step === 5}
				<StepContact />
			{:else if step === 6}
				<StepReview />
			{/if}

			<ProfRegisterNav />
		</main>
	</div>
</div>
