<script lang="ts">
	import { enhance } from '$app/forms';
	import { untrack } from 'svelte';
	import { setRiderRegisterCtx, type RiderFormData } from '$lib/components/rider-register/context';
	import StepProfile from '$lib/components/rider-register/StepProfile.svelte';
	import StepDisciplines from '$lib/components/rider-register/StepDisciplines.svelte';
	import StepGoals from '$lib/components/rider-register/StepGoals.svelte';
	import StepPreferences from '$lib/components/rider-register/StepPreferences.svelte';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let formData: RiderFormData = $state(
		untrack(() => ({
			firstName: data.profile.firstName ?? '',
			lastName: data.profile.lastName ?? '',
			birthYear: data.profile.birthYear ?? new Date().getFullYear() - 25,
			city: data.profile.city ?? '',
			bio: data.profile.bio ?? '',
			sports: data.sports as RiderFormData['sports'],
			goals: (data.profile.goals as string[]) ?? [],
			formatPreferences: (data.profile.formatPreferences as string[]) ?? [],
			equipmentPreference:
				(data.profile.equipmentPreference as RiderFormData['equipmentPreference']) ?? '',
			spots: data.spots as RiderFormData['spots'],
			maxDistanceKm: data.profile.maxDistanceKm ?? 60,
			availabilityDays: (data.profile.availabilityDays as number[]) ?? [],
			availabilitySlots: (data.profile.availabilitySlots as string[]) ?? [],
			budgetRanges: (data.profile.budgetRanges as string[]) ?? [],
			photoFile: null,
			existingPhotoUrl: (data.profile as any).photoUrl ?? null
		}))
	);

	let sectionErrors = $state<Record<string, string>>({});

	setRiderRegisterCtx({
		get step() {
			return 0;
		},
		get data() {
			return formData;
		},
		get errors() {
			return sectionErrors;
		},
		goTo() {},
		next() {},
		prev() {}
	});

	const sections = [
		{ id: 'profil', num: '01', title: 'PROFIL' },
		{ id: 'disciplines', num: '02', title: 'DISCIPLINES' },
		{ id: 'objectifs', num: '03', title: 'OBJECTIFS' },
		{ id: 'preferences', num: '04', title: 'SPOTS & DISPO' }
	] as const;

	type SectionId = (typeof sections)[number]['id'];

	let savingSection = $state<SectionId | null>(null);
	let savedSection = $state<SectionId | null>(null);
	let visibleSection = $state<SectionId>('profil');

	$effect(() => {
		function onScroll() {
			const threshold = window.innerHeight * 0.35;
			let current: SectionId = sections[0].id;
			for (const s of sections) {
				const el = document.getElementById(s.id);
				if (el && el.getBoundingClientRect().top <= threshold) {
					current = s.id;
				}
			}
			visibleSection = current;
		}

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});

	function scrollToSection(id: string) {
		return (e: MouseEvent) => {
			e.preventDefault();
			const el = document.getElementById(id);
			if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			history.pushState(null, '', `#${id}`);
		};
	}

	function validateSection(id: SectionId): boolean {
		sectionErrors = {};
		if (id === 'profil') {
			if (!formData.firstName.trim()) sectionErrors.firstName = 'Le prénom est requis';
			if (!formData.city.trim()) sectionErrors.city = 'La ville est requise';
		} else if (id === 'disciplines') {
			if (formData.sports.length === 0)
				sectionErrors.sports = 'Sélectionne au moins une discipline';
			else if (formData.sports.some((s) => !s.level))
				sectionErrors.sportsLevel = 'Indique ton niveau pour chaque discipline sélectionnée';
		} else if (id === 'objectifs') {
			if (formData.goals.length === 0) sectionErrors.goals = 'Sélectionne au moins un objectif';
		} else if (id === 'preferences') {
			if (formData.spots.length === 0) sectionErrors.spots = 'Ajoute au moins un spot';
		}
		return Object.keys(sectionErrors).length === 0;
	}

	function makeProfilEnhance() {
		return ({ formData: fd, cancel }: { formData: FormData; cancel: () => void }) => {
			if (savingSection !== null) {
				cancel();
				return;
			}
			if (!validateSection('profil')) {
				cancel();
				return;
			}
			fd.set('section', 'profil');
			fd.set('formData', JSON.stringify(formData));
			if (formData.photoFile) {
				fd.append('profilePhoto', formData.photoFile);
			}
			savingSection = 'profil';
			return async ({
				result,
				update
			}: {
				result: { type: string };
				update: (opts?: { reset?: boolean }) => Promise<void>;
			}) => {
				savingSection = null;
				if (result.type === 'success') {
					savedSection = 'profil';
					setTimeout(() => {
						savedSection = null;
					}, 2500);
				} else {
					await update({ reset: false });
				}
			};
		};
	}

	function makeEnhance(sectionId: SectionId) {
		return ({ cancel }: { cancel: () => void }) => {
			if (savingSection !== null) {
				cancel();
				return;
			}
			if (!validateSection(sectionId)) {
				cancel();
				return;
			}
			savingSection = sectionId;
			return async ({
				result,
				update
			}: {
				result: { type: string };
				update: (opts?: { reset?: boolean }) => Promise<void>;
			}) => {
				savingSection = null;
				if (result.type === 'success') {
					savedSection = sectionId;
					setTimeout(() => {
						savedSection = null;
					}, 2500);
				} else {
					await update({ reset: false });
				}
			};
		};
	}
</script>

<svelte:head>
	<title>{formData.firstName} {formData.lastName} — Windprof</title>
</svelte:head>

<div class="min-h-screen bg-bg">
	<main
		class="mx-auto px-4 pt-6 pb-16 sm:px-8 lg:px-14 lg:pt-10 lg:pb-20"
		style="max-width: 1320px"
	>
		<!-- Page title -->
		<div class="mb-1.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ MON PROFIL
		</div>
		<div
			class="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-5"
		>
			<h1
				class="m-0 font-display text-[34px] leading-[0.95] font-black tracking-tight uppercase sm:text-[40px]"
			>
				{formData.firstName}
				{formData.lastName}
			</h1>
		</div>

		<a
			href="/account/settings"
			class="mb-8 inline-flex font-mono text-label font-semibold tracking-widest text-muted uppercase transition-colors hover:text-ink"
		>
			↗ Paramètres du compte
		</a>

		<!-- Desktop layout: sidebar + content -->
		<div class="lg:grid lg:items-start lg:gap-12" style="grid-template-columns: 280px 1fr">
			<!-- Sidebar nav (desktop only) -->
			<aside class="sticky top-5 hidden lg:block">
				<div class="sticky overflow-hidden">
					{#each sections as s, i (s.id)}
						<a
							href="#{s.id}"
							onclick={scrollToSection(s.id)}
							class="flex w-full items-center gap-3 rounded-md p-3 text-left transition-colors {visibleSection ===
							s.id
								? 'border border-muted/50 bg-white '
								: 'hover:bg-bg-dark'}"
						>
							<span
								class="shrink-0 items-center justify-center p-2 text-center font-mono text-[9.5px] font-semibold tracking-widest uppercase {visibleSection ===
								s.id
									? 'rounded-full bg-ink text-white'
									: 'rounded-full border border-muted/50 p-1 text-muted'}"
							>
								{s.num}
							</span>
							<span
								class="min-w-0 flex-1 truncate font-mono text-[11.5px] font-bold tracking-wide uppercase {visibleSection ===
								s.id
									? 'text-ink'
									: 'text-muted'}"
							>
								{s.title}
							</span>
							{#if savedSection === s.id}
								<span class="shrink-0 text-caption text-green-400">✓</span>
							{/if}
						</a>
					{/each}
				</div>
			</aside>

			<!-- Content: all sections stacked -->
			<div class="flex flex-col gap-10">
				{#each sections as s (s.id)}
					<section id={s.id} style="scroll-margin-top: 2rem">
						<!-- Section heading -->
						<div class="mb-6">
							<div class="font-mono text-[10.5px] font-bold tracking-widest text-accent uppercase">
								↳ {s.num} ·
								<span class="font-display text-3xl font-black tracking-tighter text-ink"
									>{s.title}</span
								>
							</div>
						</div>

						<!-- Form -->
						{#if s.id === 'profil'}
							<form
								method="POST"
								action="?/update"
								enctype="multipart/form-data"
								use:enhance={makeProfilEnhance()}
							>
								<StepProfile />
								{#if (form as any)?.section === 'profil' && (form as any)?.error}
									<div
										class="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700"
									>
										{(form as any).error}
									</div>
								{/if}
								<div class="mt-8 flex items-center justify-between border-b border-line pb-5">
									{#if savedSection === 'profil'}
										<span
											class="font-mono text-label font-semibold tracking-widest text-green-600 uppercase"
										>
											✓ Modifications sauvegardées
										</span>
									{:else}
										<span></span>
									{/if}
									<button
										type="submit"
										disabled={savingSection !== null}
										class="inline-flex cursor-pointer items-center gap-2.5 rounded-md bg-ink px-6 py-3 font-display text-[13.5px] font-bold tracking-wide text-white uppercase hover:opacity-85 disabled:opacity-50"
									>
										{savingSection === 'profil' ? 'Sauvegarde…' : 'Enregistrer'}
									</button>
								</div>
							</form>
						{:else}
							<form method="POST" action="?/update" use:enhance={makeEnhance(s.id)}>
								<input type="hidden" name="section" value={s.id} />
								<input type="hidden" name="formData" value={JSON.stringify(formData)} />

								{#if s.id === 'disciplines'}
									<StepDisciplines />
								{:else if s.id === 'objectifs'}
									<StepGoals />
								{:else if s.id === 'preferences'}
									<StepPreferences />
								{/if}

								<!-- Error -->
								{#if (form as any)?.section === s.id && (form as any)?.error}
									<div
										class="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700"
									>
										{(form as any).error}
									</div>
								{/if}

								<!-- Save row -->
								<div class="mt-8 flex items-center justify-between border-b border-line pb-5">
									{#if savedSection === s.id}
										<span
											class="font-mono text-label font-semibold tracking-widest text-green-600 uppercase"
										>
											✓ Modifications sauvegardées
										</span>
									{:else}
										<span></span>
									{/if}
									<button
										type="submit"
										disabled={savingSection !== null}
										class="inline-flex cursor-pointer items-center gap-2.5 rounded-md bg-ink px-6 py-3 font-display text-[13.5px] font-bold tracking-wide text-white uppercase hover:opacity-85 disabled:opacity-50"
									>
										{savingSection === s.id ? 'Sauvegarde…' : 'Enregistrer'}
									</button>
								</div>
							</form>
						{/if}
					</section>
				{/each}
			</div>
		</div>
	</main>
</div>
