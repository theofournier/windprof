<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import { untrack } from 'svelte';
	import { setProfRegisterCtx, type ProfFormData } from '$lib/components/prof-register/context';
	import StepIdentity from '$lib/components/prof-register/StepIdentity.svelte';
	import StepDisciplines from '$lib/components/prof-register/StepDisciplines.svelte';
	import StepCerts from '$lib/components/prof-register/StepCerts.svelte';
	import StepSpots from '$lib/components/prof-register/StepSpots.svelte';
	import StepPrices from '$lib/components/prof-register/StepPrices.svelte';
	import StepContact from '$lib/components/prof-register/StepContact.svelte';
	import StepGallery, { type GalleryState } from '$lib/components/prof-register/StepGallery.svelte';
	import PublishToggle from '$lib/components/prof-account/PublishToggle.svelte';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let formData: ProfFormData = $state(
		untrack(() => {
			const ws = (data.profile.websites as string[]) ?? [];
			return {
				firstName: data.profile.firstName ?? '',
				lastName: data.profile.lastName ?? '',
				bio: data.profile.bio ?? '',
				languages: (data.profile.languages as string[]) ?? [],
				sports: data.sports as ProfFormData['sports'],
				certifications: data.certifications.map((c) => ({
					...c,
					file: null,
					fileName: c.fileName ?? null,
					fileUrl: c.fileUrl ?? null,
					status: c.status ?? null
				})) as ProfFormData['certifications'],
				city: data.profile.city ?? '',
				region: data.profile.region ?? '',
				spots: data.spots as ProfFormData['spots'],
				equipmentProvided: data.profile.equipmentProvided ?? true,
				equipmentNote: data.profile.equipmentNote ?? '',
				prices: data.prices as ProfFormData['prices'],
				websites: [ws[0] ?? '', ws[1] ?? ''],
				phone: data.profile.phone ?? '',
				contactEmail: data.profile.contactEmail ?? '',
				contactVisibility: data.profile.contactVisibility ?? 'phone_email',
				responseTime: data.profile.responseTime ?? '',
				gallery: [],
				photoFile: null,
				existingPhotoUrl: (data.profile as any).photoUrl ?? null
			};
		})
	);

	let sectionErrors = $state<Record<string, string>>({});

	setProfRegisterCtx({
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
		prev() {},
		submitting: false
	});

	const sections = [
		{ id: 'identite', num: '01', title: 'IDENTITÉ' },
		{ id: 'disciplines', num: '02', title: 'DISCIPLINES' },
		{ id: 'certifications', num: '03', title: 'DIPLÔMES' },
		{ id: 'spots', num: '04', title: 'SPOTS & MATÉRIEL' },
		{ id: 'tarifs', num: '05', title: 'TARIFS & LIENS' },
		{ id: 'contact', num: '06', title: 'CONTACT' },
		{ id: 'galerie', num: '07', title: 'GALERIE' }
	] as const;

	type SectionId = (typeof sections)[number]['id'];

	let savingSection = $state<SectionId | null>(null);
	let savedSection = $state<SectionId | null>(null);
	let visibleSection = $state<SectionId>('identite');

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
		if (id === 'identite') {
			if (!formData.firstName.trim()) sectionErrors.firstName = 'Le prénom est requis';
			if (!formData.lastName.trim()) sectionErrors.lastName = 'Le nom est requis';
		} else if (id === 'disciplines') {
			if (formData.sports.length === 0)
				sectionErrors.sports = 'Sélectionne au moins une discipline';
			else if (formData.sports.some((s) => s.acceptedLevels.length === 0))
				sectionErrors.sportsLevels = 'Sélectionne au moins un niveau pour chaque discipline';
		} else if (id === 'spots') {
			if (!formData.city.trim()) sectionErrors.city = 'La ville est requise';
			if (formData.spots.length === 0) sectionErrors.spots = 'Ajoute au moins un spot';
		} else if (id === 'tarifs') {
			if (formData.prices.length === 0)
				sectionErrors.prices = 'Ajoute au moins une formule tarifaire';
			else if (formData.prices.some((p) => !p.description.trim()))
				sectionErrors.pricesDesc = 'Chaque formule doit avoir une description';
		} else if (id === 'contact') {
			if (!formData.phone.trim() && !formData.contactEmail.trim())
				sectionErrors.contact = 'Renseigne au moins un téléphone ou un email de contact';
		}
		// galerie: no validation needed
		return Object.keys(sectionErrors).length === 0;
	}

	// Gallery-specific state (survives remounts via closure)
	let galleryState = $state<GalleryState>({ existingIds: [], deletedIds: [], newFiles: [] });

	function makeGalleryEnhance() {
		return ({ formData: fd, cancel }: { formData: FormData; cancel: () => void }) => {
			if (savingSection !== null) {
				cancel();
				return;
			}
			fd.set('existingIds', JSON.stringify(galleryState.existingIds));
			fd.set('deletedIds', JSON.stringify(galleryState.deletedIds));
			for (const file of galleryState.newFiles) {
				fd.append('newPhoto', file);
			}
			savingSection = 'galerie';
			return async ({
				result,
				update
			}: {
				result: { type: string };
				update: (opts?: { reset?: boolean }) => Promise<void>;
			}) => {
				savingSection = null;
				if (result.type === 'success') {
					savedSection = 'galerie';
					setTimeout(() => {
						savedSection = null;
					}, 2500);
				} else {
					await update({ reset: false });
				}
			};
		};
	}

	function makeIdentityEnhance() {
		return ({ formData: fd, cancel }: { formData: FormData; cancel: () => void }) => {
			if (savingSection !== null) {
				cancel();
				return;
			}
			if (!validateSection('identite')) {
				cancel();
				return;
			}
			fd.set('section', 'identite');
			fd.set('formData', JSON.stringify(formData));
			if (formData.photoFile) {
				fd.append('profilePhoto', formData.photoFile);
			}
			savingSection = 'identite';
			return async ({
				result,
				update
			}: {
				result: { type: string };
				update: (opts?: { reset?: boolean }) => Promise<void>;
			}) => {
				savingSection = null;
				if (result.type === 'success') {
					savedSection = 'identite';
					setTimeout(() => {
						savedSection = null;
					}, 2500);
				} else {
					await update({ reset: false });
				}
			};
		};
	}

	function makeCertsEnhance() {
		return ({ formData: fd, cancel }: { formData: FormData; cancel: () => void }) => {
			if (savingSection !== null) {
				cancel();
				return;
			}
			fd.set('section', 'certifications');
			fd.set('formData', JSON.stringify(formData));
			formData.certifications.forEach((cert, i) => {
				if (cert.file) fd.append(`certFile_${i}`, cert.file);
			});
			savingSection = 'certifications';
			return async ({
				result,
				update
			}: {
				result: { type: string };
				update: (opts?: { reset?: boolean }) => Promise<void>;
			}) => {
				savingSection = null;
				if (result.type === 'success') {
					savedSection = 'certifications';
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

			<div class="flex items-center gap-4">
				<PublishToggle isPublished={data.profile.isPublished} />

				<a
					href={resolve('/profs/[id]', { id: data.profile.id })}
					class="font-mono text-label font-semibold tracking-widest text-muted uppercase transition-colors hover:text-ink"
				>
					↗ Voir ma fiche
				</a>
			</div>
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
						{#if s.id === 'galerie'}
							<form
								method="POST"
								action="?/update"
								enctype="multipart/form-data"
								use:enhance={makeGalleryEnhance()}
							>
								<input type="hidden" name="section" value="galerie" />
								<StepGallery
									existingPhotos={data.gallery}
									onGalleryChange={(state) => {
										galleryState = state;
									}}
								/>
								{#if (form as any)?.section === 'galerie' && (form as any)?.error}
									<div
										class="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700"
									>
										{(form as any).error}
									</div>
								{/if}
								<div class="mt-8 flex items-center justify-between border-b border-line pb-5">
									{#if savedSection === 'galerie'}
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
										{savingSection === 'galerie' ? 'Sauvegarde…' : 'Enregistrer'}
									</button>
								</div>
							</form>
						{:else if s.id === 'identite'}
							<form
								method="POST"
								action="?/update"
								enctype="multipart/form-data"
								use:enhance={makeIdentityEnhance()}
							>
								<StepIdentity />
								{#if (form as any)?.section === 'identite' && (form as any)?.error}
									<div
										class="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700"
									>
										{(form as any).error}
									</div>
								{/if}
								<div class="mt-8 flex items-center justify-between border-b border-line pb-5">
									{#if savedSection === 'identite'}
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
										{savingSection === 'identite' ? 'Sauvegarde…' : 'Enregistrer'}
									</button>
								</div>
							</form>
						{:else if s.id === 'certifications'}
							<form
								method="POST"
								action="?/update"
								enctype="multipart/form-data"
								use:enhance={makeCertsEnhance()}
							>
								<StepCerts />

								{#if (form as any)?.section === 'certifications' && (form as any)?.error}
									<div
										class="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700"
									>
										{(form as any).error}
									</div>
								{/if}

								<div class="mt-8 flex items-center justify-between border-b border-line pb-5">
									{#if savedSection === 'certifications'}
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
										{savingSection === 'certifications' ? 'Sauvegarde…' : 'Enregistrer'}
									</button>
								</div>
							</form>
						{:else}
							<form method="POST" action="?/update" use:enhance={makeEnhance(s.id)}>
								<input type="hidden" name="section" value={s.id} />
								<input type="hidden" name="formData" value={JSON.stringify(formData)} />

								{#if s.id === 'disciplines'}
									<StepDisciplines />
								{:else if s.id === 'spots'}
									<StepSpots />
								{:else if s.id === 'tarifs'}
									<StepPrices />
								{:else if s.id === 'contact'}
									<StepContact />
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
										<button
											type="submit"
											disabled={savingSection !== null}
											class="inline-flex cursor-pointer items-center gap-2.5 rounded-md bg-ink px-6 py-3 font-display text-[13.5px] font-bold tracking-wide text-white uppercase hover:opacity-85 disabled:opacity-50"
										>
											Enregistrer
										</button>
									{:else}
										<span></span>
										<button
											type="submit"
											disabled={savingSection !== null}
											class="inline-flex cursor-pointer items-center gap-2.5 rounded-md bg-ink px-6 py-3 font-display text-[13.5px] font-bold tracking-wide text-white uppercase hover:opacity-85 disabled:opacity-50"
										>
											{savingSection === s.id ? 'Sauvegarde…' : 'Enregistrer'}
										</button>
									{/if}
								</div>
							</form>
						{/if}
					</section>
				{/each}
			</div>
		</div>
	</main>
</div>
