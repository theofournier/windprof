<script lang="ts">
	import { enhance } from '$app/forms';
	import { setProfRegisterCtx } from '$lib/components/prof-register/context';
	import type { ProfFormData } from '$lib/components/prof-register/context';
	import ProfRegisterSidebar from '$lib/components/prof-register/ProfRegisterSidebar.svelte';
	import ProfRegisterNav from '$lib/components/prof-register/ProfRegisterNav.svelte';
	import StepIdentity from '$lib/components/prof-register/StepIdentity.svelte';
	import StepDisciplines from '$lib/components/prof-register/StepDisciplines.svelte';
	import StepCerts from '$lib/components/prof-register/StepCerts.svelte';
	import StepSpots from '$lib/components/prof-register/StepSpots.svelte';
	import StepPrices from '$lib/components/prof-register/StepPrices.svelte';
	import StepContact from '$lib/components/prof-register/StepContact.svelte';
	import StepGallery from '$lib/components/prof-register/StepGallery.svelte';
	import StepReview from '$lib/components/prof-register/StepReview.svelte';
	import LeaveWarningDialog from '$lib/components/global/LeaveWarningDialog.svelte';

	const { data, form } = $props<{ data: { missing: boolean }; form: { error?: string } | null }>();

	let submitted = $state(false);

	const TOTAL_STEPS = 8;

	let step = $state(0);
	let stepErrors: Record<string, string> = $state({});

	let formData: ProfFormData = $state({
		firstName: '',
		lastName: '',
		bio: '',
		languages: [],
		sports: [],
		certifications: [],
		city: '',
		region: '',
		spots: [],
		equipmentProvided: true,
		equipmentNote: '',
		prices: [],
		websites: ['', ''],
		phone: '',
		contactEmail: '',
		contactVisibility: 'phone_email',
		responseTime: '',
		gallery: [],
		photoFile: null,
		existingPhotoUrl: null
	});

	function validateStep(): boolean {
		stepErrors = {};
		if (step === 0) {
			if (!formData.firstName.trim()) stepErrors.firstName = 'Le prénom est requis';
			if (!formData.lastName.trim()) stepErrors.lastName = 'Le nom est requis';
		} else if (step === 1) {
			if (formData.sports.length === 0) stepErrors.sports = 'Sélectionne au moins une discipline';
			else if (formData.sports.some((s) => s.acceptedLevels.length === 0))
				stepErrors.sportsLevels = 'Sélectionne au moins un niveau pour chaque discipline';
		} else if (step === 2) {
			if (formData.certifications.length === 0)
				stepErrors.certifications = 'Ajoute au moins un diplôme';
		} else if (step === 3) {
			if (!formData.city.trim()) stepErrors.city = 'La ville est requise';
			if (formData.spots.length === 0) stepErrors.spots = 'Ajoute au moins un spot';
		} else if (step === 4) {
			if (formData.prices.length === 0) stepErrors.prices = 'Ajoute au moins une formule tarifaire';
			else if (formData.prices.some((p) => !p.description.trim()))
				stepErrors.pricesDesc = 'Chaque formule doit avoir une description';
		} else if (step === 5) {
			if (!formData.phone.trim() && !formData.contactEmail.trim())
				stepErrors.contact = 'Renseigne au moins un téléphone ou un email de contact';
		}
		// step 6 = gallery (optional, no validation)
		return Object.keys(stepErrors).length === 0;
	}

	setProfRegisterCtx({
		get step() {
			return step;
		},
		get data() {
			return formData;
		},
		get errors() {
			return stepErrors;
		},
		goTo(n: number) {
			step = Math.max(0, Math.min(TOTAL_STEPS - 1, n));
			window.scrollTo({ top: 50, behavior: 'smooth' });
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
		'Qui es-tu ?',
		'Que fais-tu glisser ?',
		'Tes diplômes.',
		'Où enseignes-tu ?',
		'Tes tarifs.',
		'Comment te joindre ?',
		'Ta galerie.',
		'Prêt à publier.'
	];

	const stepIntros = [
		"Une photo nette, ton vrai nom, et trois phrases pour te présenter. C'est ce que les riders verront en premier.",
		'Coche tes disciplines et les niveaux que tu acceptes. Tu pourras affiner spot par spot plus tard.',
		'Upload tes diplômes BPJEPS / DE / IKO / VDWS. Notre équipe vérifie sous 48h et active ton badge ✓ Vérifié.',
		"Indique ta ville principale et tes spots habituels. La carte interactive arrive au MVP 2 — pour l'instant, du texte libre.",
		'Tarifs indicatifs par discipline. Les riders te contactent directement, tu négocies en direct, sans commission.',
		"Téléphone et/ou email. Ces infos seront affichées sur ta fiche publique : c'est le cœur de la promesse Windprof.",
		"Ajoute jusqu'à 10 photos de tes sessions, ton matériel ou tes spots. Optionnel — tu pourras en ajouter plus tard.",
		'Vérifie que tout est bon. Tu pourras éditer ton profil à tout moment depuis ton dashboard.'
	];

	const stepNumbers = ['01', '02', '03', '04', '05', '06', '07', '08'];
</script>

<svelte:head>
	<title>Création moniteur — Windprof</title>
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
			<ProfRegisterSidebar />
		</div>

		<main class="min-w-0">
			<div class="mb-2.5 font-mono text-[11px] font-semibold tracking-widest text-accent uppercase">
				↳ ÉTAPE {stepNumbers[step]} / 08
			</div>
			<h1
				class="m-0 mb-3 font-display text-[36px] leading-[0.95] font-black tracking-tight uppercase sm:text-[44px] lg:text-[54px]"
			>
				{stepTitles[step]}
			</h1>
			<p class="mb-8 max-w-[560px] text-[15.5px] leading-body text-muted">
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
					for (const file of formData.gallery) {
						fd.append('gallery', file);
					}
					return async ({ result, update }) => {
						if (result.type === 'redirect') submitted = true;
						await update();
					};
				}}
			>
				<input type="hidden" name="formData" value={JSON.stringify(formData)} />

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
					<StepGallery />
				{:else if step === 7}
					<StepReview />
				{/if}

				<ProfRegisterNav />
			</form>
		</main>
	</div>
</div>

<LeaveWarningDialog {submitted} />
