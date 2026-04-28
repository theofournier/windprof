<script lang="ts">
	import { enhance } from '$app/forms';
	import { setRiderRegisterCtx } from '$lib/components/rider-register/context';
	import RiderRegisterHeader from '$lib/components/rider-register/RiderRegisterHeader.svelte';
	import RiderRegisterSidebar from '$lib/components/rider-register/RiderRegisterSidebar.svelte';
	import RiderRegisterNav from '$lib/components/rider-register/RiderRegisterNav.svelte';
	import StepProfile from '$lib/components/rider-register/StepProfile.svelte';
	import StepDisciplines from '$lib/components/rider-register/StepDisciplines.svelte';
	import StepGoals from '$lib/components/rider-register/StepGoals.svelte';
	import StepPreferences from '$lib/components/rider-register/StepPreferences.svelte';
	import StepReview from '$lib/components/rider-register/StepReview.svelte';

	const { form } = $props<{ form: { error?: string } | null }>();

	const TOTAL_STEPS = 5;

	let step = $state(0);

	import type { RiderFormData } from '$lib/components/rider-register/context';

	let formData: RiderFormData = $state({
		firstName: '',
		lastName: '',
		birthYear: new Date().getFullYear() - 25,
		city: '',
		bio: '',
		sports: [],
		goals: [],
		formatPreferences: [],
		equipmentPreference: '',
		spots: [],
		maxDistanceKm: 60,
		availabilityDays: [],
		availabilitySlots: [],
		budgetRanges: [],
	});

	setRiderRegisterCtx({
		get step() {
			return step;
		},
		get data() {
			return formData;
		},
		goTo(n: number) {
			step = Math.max(0, Math.min(TOTAL_STEPS - 1, n));
		},
		next() {
			step = Math.min(TOTAL_STEPS - 1, step + 1);
		},
		prev() {
			step = Math.max(0, step - 1);
		}
	});

	const stepTitles = [
		'Salut, toi.',
		'Tu glisses comment ?',
		'Tu veux progresser sur quoi ?',
		'Quand & où ?',
		'On y est presque.'
	];

	const stepIntros = [
		"Trois infos pour qu'on personnalise ta recherche. Ton profil reste privé — il ne sert qu'au matching.",
		'Coche les disciplines qui te concernent et ton niveau actuel. Sois honnête, ça aide le moniteur à préparer la session.',
		"Cours d'initiation, perfectionnement, premier foil, sauter… Plus tu es précis, plus on cible juste.",
		'Tes spots préférés, tes dispos et un budget indicatif. Tout est modifiable plus tard.',
		'Vérifie ton profil. Tu peux le modifier quand tu veux depuis ton compte.'
	];

	const stepNumbers = ['01', '02', '03', '04', '05'];
</script>

<div class="min-h-screen bg-bg">
	<RiderRegisterHeader />

	<div
		class="mx-auto grid items-start gap-12 px-14 pt-10 pb-20"
		style="max-width: 1320px; grid-template-columns: 280px 1fr"
	>
		<RiderRegisterSidebar />

		<main class="min-w-0">
			<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
				↳ ÉTAPE {stepNumbers[step]} / 05
			</div>
			<h1
				class="m-0 mb-3 font-display text-[54px] font-black leading-[0.95] tracking-tight uppercase"
			>
				{stepTitles[step]}
			</h1>
			<p class="mb-8 max-w-140 text-[15.5px] leading-body text-muted">
				{stepIntros[step]}
			</p>

			{#if form?.error}
				<div class="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
					{form.error}
				</div>
			{/if}

			<form method="POST" use:enhance>
				<input type="hidden" name="formData" value={JSON.stringify(formData)} />

				{#if step === 0}
					<StepProfile />
				{:else if step === 1}
					<StepDisciplines />
				{:else if step === 2}
					<StepGoals />
				{:else if step === 3}
					<StepPreferences />
				{:else if step === 4}
					<StepReview />
				{/if}

				<RiderRegisterNav />
			</form>
		</main>
	</div>
</div>
