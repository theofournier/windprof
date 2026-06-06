<script lang="ts">
	import { enhance } from '$app/forms';
	import { setRiderRegisterCtx } from '$lib/components/rider-register/context';
	import RiderRegisterSidebar from '$lib/components/rider-register/RiderRegisterSidebar.svelte';
	import RiderRegisterNav from '$lib/components/rider-register/RiderRegisterNav.svelte';
	import StepProfile from '$lib/components/rider-register/StepProfile.svelte';
	import StepDisciplines from '$lib/components/rider-register/StepDisciplines.svelte';
	import StepGoals from '$lib/components/rider-register/StepGoals.svelte';
	import StepPreferences from '$lib/components/rider-register/StepPreferences.svelte';
	import StepReview from '$lib/components/rider-register/StepReview.svelte';
	import LeaveWarningDialog from '$lib/components/global/LeaveWarningDialog.svelte';

	const { data, form } = $props<{ data: { missing: boolean }; form: { error?: string } | null }>();

	let submitted = $state(false);
	let submitting = $state(false);

	const TOTAL_STEPS = 5;

	let step = $state(0);
	let stepErrors: Record<string, string> = $state({});

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
		photoFile: null,
		existingPhotoUrl: null
	});

	function validateStep(): boolean {
		stepErrors = {};
		if (step === 0) {
			if (!formData.firstName.trim()) stepErrors.firstName = 'Le prénom est requis';
			if (!formData.city.trim()) stepErrors.city = 'La ville est requise';
		} else if (step === 1) {
			if (formData.sports.length === 0) stepErrors.sports = 'Sélectionne au moins une discipline';
			else if (formData.sports.some((s) => !s.level))
				stepErrors.sportsLevel = 'Indique ton niveau pour chaque discipline sélectionnée';
		} else if (step === 2) {
			if (formData.goals.length === 0) stepErrors.goals = 'Sélectionne au moins un objectif';
		}
		return Object.keys(stepErrors).length === 0;
	}

	setRiderRegisterCtx({
		get step() {
			return step;
		},
		get data() {
			return formData;
		},
		get errors() {
			return stepErrors;
		},
		get submitting() {
			return submitting;
		},
		goTo(n: number) {
			step = Math.max(0, Math.min(TOTAL_STEPS - 1, n));
		},
		next() {
			if (!validateStep()) return;
			stepErrors = {};
			step = Math.min(TOTAL_STEPS - 1, step + 1);
			window.scrollTo({ top: 50, behavior: 'smooth' });
		},
		prev() {
			stepErrors = {};
			step = Math.max(0, step - 1);
			window.scrollTo({ top: 50, behavior: 'smooth' });
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

<svelte:head>
	<title>Création rider — Windprof</title>
</svelte:head>

{#if data.missing}
	<div class="border-b border-amber-200 bg-amber-50 px-6 py-4">
		<div class="mx-auto" style="max-width: 1320px">
			<p class="text-body-sm font-bold tracking-widest text-amber-800 uppercase">
				Profil incomplet
			</p>
			<p class="mt-0.5 text-[13.5px] text-amber-700">
				Il nous manque quelques informations. Complète ton profil ci-dessous pour accéder à
				Windprof.
			</p>
		</div>
	</div>
{/if}

<div class="min-h-screen bg-bg">
	<div
		class="mx-auto px-4 pt-6 pb-16 sm:px-8 lg:grid lg:grid-cols-[280px_1fr] lg:items-start lg:gap-12 lg:px-14 lg:pt-10 lg:pb-20"
		style="max-width: 1320px"
	>
		<div class="hidden lg:block">
			<RiderRegisterSidebar />
		</div>

		<main class="min-w-0">
			<div class="mb-2.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
				↳ ÉTAPE {stepNumbers[step]} / 05
			</div>
			<div class="mb-5 flex gap-0.75 lg:hidden">
				{#each Array.from({ length: 5 }) as _, i}
					<div class="h-1 flex-1 rounded-xs {i <= step ? 'bg-accent' : 'bg-line'}"></div>
				{/each}
			</div>
			<h1
				class="m-0 mb-3 font-display text-[36px] leading-[0.95] font-black tracking-tight uppercase sm:text-[44px] lg:text-[54px]"
			>
				{stepTitles[step]}
			</h1>
			<p class="mb-8 max-w-140 text-[15.5px] leading-body text-muted">
				{stepIntros[step]}
			</p>

			{#if form?.error}
				<div
					class="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700"
				>
					{form.error}
				</div>
			{/if}

			<form
				method="POST"
				enctype="multipart/form-data"
				use:enhance={({ formData: fd }) => {
					if (formData.photoFile) {
						fd.append('profilePhoto', formData.photoFile);
					}
					submitting = true;
					return async ({ result, update }) => {
						if (result.type === 'redirect') submitted = true;
						else submitting = false;
						await update();
					};
				}}
			>
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

<LeaveWarningDialog {submitted} />
