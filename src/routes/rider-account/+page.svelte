<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
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
			equipmentPreference: (data.profile.equipmentPreference as RiderFormData['equipmentPreference']) ?? '',
			spots: data.spots as RiderFormData['spots'],
			maxDistanceKm: data.profile.maxDistanceKm ?? 60,
			availabilityDays: (data.profile.availabilityDays as number[]) ?? [],
			availabilitySlots: (data.profile.availabilitySlots as string[]) ?? [],
			budgetRanges: (data.profile.budgetRanges as string[]) ?? []
		}))
	);

	setRiderRegisterCtx({
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
		{ id: 'profil', num: '01', title: 'PROFIL' },
		{ id: 'disciplines', num: '02', title: 'DISCIPLINES' },
		{ id: 'objectifs', num: '03', title: 'OBJECTIFS' },
		{ id: 'preferences', num: '04', title: 'SPOTS & DISPO' }
	] as const;

	type SectionId = (typeof sections)[number]['id'];

	let active = $state<SectionId>('profil');
	let saving = $state(false);
	let savedSection = $state<SectionId | null>(null);

	function makeEnhance(sectionId: SectionId) {
		return ({ cancel }: { cancel: () => void }) => {
			if (saving) {
				cancel();
				return;
			}
			saving = true;
			return async ({
				result,
				update
			}: {
				result: { type: string };
				update: (opts?: { reset?: boolean }) => Promise<void>;
			}) => {
				saving = false;
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

	const activeSection = $derived(sections.find((s) => s.id === active)!);
</script>

<div class="min-h-screen bg-bg">
	<!-- Header -->
	<header class="border-b border-line bg-white">
		<div
			class="mx-auto flex items-center justify-between px-5 py-4 sm:px-8"
			style="max-width: 1140px"
		>
			<a href={resolve('/')} class="font-display text-[20px] font-black tracking-tight uppercase">
				WINDMATCH
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
						<button
							type="button"
							onclick={() => (active = s.id)}
							class="flex items-center gap-2 rounded-[6px] px-3 py-2.5 font-mono text-[10.5px] font-bold tracking-widest uppercase transition-colors {active ===
							s.id
								? 'bg-ink text-white'
								: 'border border-line text-muted hover:border-ink hover:text-ink'}"
						>
							{#if savedSection === s.id}
								<span class="text-green-400">✓</span>
							{/if}
							{s.num}
							<span class="hidden sm:inline">· {s.title.split(' ')[0]}</span>
						</button>
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
						<button
							type="button"
							onclick={() => (active = s.id)}
							class="flex w-full items-center gap-3 px-4.5 py-4 text-left transition-colors {i <
							sections.length - 1
								? 'border-b border-line'
								: ''} {active === s.id ? 'bg-ink' : 'hover:bg-bg-dark'}"
						>
							<span
								class="shrink-0 font-mono text-[9.5px] font-semibold tracking-widest uppercase {active ===
								s.id
									? 'text-white/40'
									: 'text-muted'}"
							>
								{s.num}
							</span>
							<span
								class="min-w-0 flex-1 truncate font-mono text-[11.5px] font-bold tracking-wide uppercase {active ===
								s.id
									? 'text-white'
									: 'text-ink'}"
							>
								{s.title}
							</span>
							{#if savedSection === s.id}
								<span class="shrink-0 text-[12px] text-green-400">✓</span>
							{/if}
						</button>
					{/each}
				</div>
			</nav>

			<!-- Content panel -->
			<div>
				<!-- Section heading -->
				<div class="mb-6">
					<div class="font-mono text-[10.5px] font-semibold tracking-widest text-accent uppercase">
						↳ {activeSection.num} · {activeSection.title}
					</div>
				</div>

				<!-- Form -->
				<form method="POST" action="?/update" use:enhance={makeEnhance(active)}>
					<input type="hidden" name="section" value={active} />
					<input type="hidden" name="formData" value={JSON.stringify(formData)} />

					{#if active === 'profil'}
						<StepProfile />
					{:else if active === 'disciplines'}
						<StepDisciplines />
					{:else if active === 'objectifs'}
						<StepGoals />
					{:else if active === 'preferences'}
						<StepPreferences />
					{/if}

					<!-- Error -->
					{#if (form as any)?.section === active && (form as any)?.error}
						<div
							class="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700"
						>
							{(form as any).error}
						</div>
					{/if}

					<!-- Save row -->
					<div class="mt-8 flex items-center justify-between border-t border-line pt-5">
						{#if savedSection === active}
							<span
								class="font-mono text-[11px] font-semibold tracking-widest text-green-600 uppercase"
							>
								✓ Modifications sauvegardées
							</span>
						{:else}
							<span></span>
						{/if}
						<button
							type="submit"
							disabled={saving}
							class="inline-flex cursor-pointer items-center gap-2.5 rounded-md bg-ink px-6 py-3 font-display text-[13.5px] font-bold tracking-wide text-white uppercase hover:opacity-85 disabled:opacity-50"
						>
							{saving ? 'Sauvegarde…' : 'Enregistrer'}
						</button>
					</div>
				</form>
			</div>
		</div>
	</main>
</div>
