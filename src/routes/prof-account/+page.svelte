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
				certifications: data.certifications as ProfFormData['certifications'],
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
				responseTime: data.profile.responseTime ?? ''
			};
		})
	);

	setProfRegisterCtx({
		get step() {
			return 0;
		},
		get data() {
			return formData;
		},
		goTo() {},
		next() {},
		prev() {}
	});

	const sections = [
		{ id: 'identite', num: '01', title: 'IDENTITÉ' },
		{ id: 'disciplines', num: '02', title: 'DISCIPLINES' },
		{ id: 'certifications', num: '03', title: 'DIPLÔMES' },
		{ id: 'spots', num: '04', title: 'SPOTS & MATÉRIEL' },
		{ id: 'tarifs', num: '05', title: 'TARIFS & LIENS' },
		{ id: 'contact', num: '06', title: 'CONTACT' }
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

	function makeEnhance(sectionId: SectionId) {
		return ({ cancel }: { cancel: () => void }) => {
			if (savingSection !== null) {
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

<div class="min-h-screen bg-bg">
	<!-- Header -->
	<header class="border-b border-line bg-white">
		<div
			class="mx-auto flex items-center justify-between px-5 py-4 sm:px-8"
			style="max-width: 1140px"
		>
			<a href={resolve('/')} class="font-display text-[20px] font-black tracking-tight uppercase">
				WINDPROF
			</a>
			<a
				href={resolve('/profs/[id]', { id: data.profile.id })}
				class="font-mono text-label font-semibold tracking-widest text-muted uppercase transition-colors hover:text-ink"
			>
				↗ Voir ma fiche
			</a>
		</div>
	</header>

	<main class="mx-auto px-5 pt-10 pb-20 sm:px-8" style="max-width: 1140px">
		<!-- Page title -->
		<div class="mb-1.5 font-mono text-[11px] font-semibold tracking-widest text-accent uppercase">
			↳ MON PROFIL
		</div>
		<h1
			class="m-0 mb-8 font-display text-[34px] leading-[0.95] font-black tracking-tight uppercase sm:text-[40px]"
		>
			{formData.firstName}
			{formData.lastName}
		</h1>

		<!-- Mobile tab bar -->
		<div class="mb-6 lg:hidden">
			<div class="-mx-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8">
				<div class="flex gap-1.5 pb-1" style="min-width: max-content">
					{#each sections as s (s.id)}
						<a
							href="#{s.id}"
							onclick={scrollToSection(s.id)}
							class="flex items-center gap-2 rounded-[6px] px-3 py-2.5 font-mono text-[10.5px] font-bold tracking-widest uppercase transition-colors {visibleSection ===
							s.id
								? 'bg-ink text-white'
								: 'border border-line text-muted hover:border-ink hover:text-ink'}"
						>
							{#if savedSection === s.id}
								<span class="text-green-400">✓</span>
							{/if}
							{s.num}
							<span class="hidden sm:inline">· {s.title.split(' ')[0]}</span>
						</a>
					{/each}
				</div>
			</div>
		</div>

		<!-- Desktop layout: sidebar + content -->
		<div class="lg:grid lg:items-start lg:gap-10" style="grid-template-columns: 210px 1fr">
			<!-- Sidebar nav (desktop only) -->
			<nav class="hidden lg:block">
				<div class="sticky overflow-hidden rounded-[10px] border border-line" style="top: 2rem">
					{#each sections as s, i (s.id)}
						<a
							href="#{s.id}"
							onclick={scrollToSection(s.id)}
							class="flex w-full items-center gap-3 px-4.5 py-4 text-left transition-colors {i <
							sections.length - 1
								? 'border-b border-line'
								: ''} {visibleSection === s.id ? 'bg-ink' : 'hover:bg-bg-dark'}"
						>
							<span
								class="shrink-0 font-mono text-[9.5px] font-semibold tracking-widest uppercase {visibleSection ===
								s.id
									? 'text-white/40'
									: 'text-muted'}"
							>
								{s.num}
							</span>
							<span
								class="min-w-0 flex-1 truncate font-mono text-[11.5px] font-bold tracking-wide uppercase {visibleSection ===
								s.id
									? 'text-white'
									: 'text-ink'}"
							>
								{s.title}
							</span>
							{#if savedSection === s.id}
								<span class="shrink-0 text-[12px] text-green-400">✓</span>
							{/if}
						</a>
					{/each}
				</div>
			</nav>

			<!-- Content: all sections stacked -->
			<div class="flex flex-col gap-14">
				{#each sections as s (s.id)}
					<section id={s.id} style="scroll-margin-top: 2rem">
						<!-- Section heading -->
						<div class="mb-6">
							<div
								class="font-mono text-[10.5px] font-semibold tracking-widest text-accent uppercase"
							>
								↳ {s.num} · {s.title}
							</div>
						</div>

						<!-- Form -->
						<form method="POST" action="?/update" use:enhance={makeEnhance(s.id)}>
							<input type="hidden" name="section" value={s.id} />
							<input type="hidden" name="formData" value={JSON.stringify(formData)} />

							{#if s.id === 'identite'}
								<StepIdentity />
							{:else if s.id === 'disciplines'}
								<StepDisciplines />
							{:else if s.id === 'certifications'}
								<StepCerts />
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
							<div class="mt-8 flex items-center justify-between border-t border-line pt-5">
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
					</section>
				{/each}
			</div>
		</div>
	</main>
</div>
