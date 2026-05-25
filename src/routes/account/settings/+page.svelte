<script lang="ts">
	import { enhance } from '$app/forms';
	import { untrack } from 'svelte';
	import type { PageData, ActionData } from './$types';
	import googleIcon from '$lib/assets/google.svg';
	import facebookIcon from '$lib/assets/facebook.svg';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	type SectionId = 'password' | 'connexions' | 'sessions' | 'danger';

	let sections = $derived.by(() => {
		const raw: { id: SectionId; title: string }[] = [];
		if (data.hasPassword) raw.push({ id: 'password', title: 'MOT DE PASSE' });
		if (data.oauthProviders.length > 0) raw.push({ id: 'connexions', title: 'CONNEXIONS' });
		raw.push({ id: 'sessions', title: 'SESSIONS' });
		raw.push({ id: 'danger', title: 'COMPTE' });
		return raw.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, '0') }));
	});

	let numOf = $derived(
		Object.fromEntries(sections.map((s) => [s.id, s.num])) as Partial<Record<SectionId, string>>
	);

	let visibleSection = $state<SectionId>(
		untrack(() => {
			if (data.hasPassword) return 'password';
			if (data.oauthProviders.length > 0) return 'connexions';
			return 'sessions';
		})
	);

	const PROVIDER_INFO: Record<string, { label: string; icon: string }> = {
		google: { label: 'Google', icon: googleIcon },
		facebook: { label: 'Facebook', icon: facebookIcon }
	};
	function providerInfo(id: string) {
		return PROVIDER_INFO[id] ?? { label: id.charAt(0).toUpperCase() + id.slice(1), icon: '' };
	}
	let savingSection = $state<SectionId | null>(null);
	let savedSection = $state<SectionId | null>(null);
	let revokingToken = $state<string | null>(null);
	let showDeleteForm = $state(false);
	let deleteConfirmText = $state('');

	$effect(() => {
		const f = form as any;
		if (f?.success && f?.action === 'changePassword') {
			savedSection = 'password';
			setTimeout(() => {
				savedSection = null;
			}, 3000);
		}
	});

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

	function makePasswordEnhance() {
		return ({ cancel }: { cancel: () => void }) => {
			if (savingSection !== null) {
				cancel();
				return;
			}
			savingSection = 'password';
			return async ({ update }: { update: (o?: { reset?: boolean }) => Promise<void> }) => {
				savingSection = null;
				await update({ reset: false });
			};
		};
	}

	function makeRevokeEnhance(token: string) {
		return ({ cancel }: { cancel: () => void }) => {
			if (revokingToken !== null) {
				cancel();
				return;
			}
			revokingToken = token;
			return async ({ update }: { update: (o?: { reset?: boolean }) => Promise<void> }) => {
				revokingToken = null;
				await update({ reset: false });
			};
		};
	}

	function makeRevokeAllEnhance() {
		return ({ cancel }: { cancel: () => void }) => {
			if (savingSection !== null) {
				cancel();
				return;
			}
			savingSection = 'sessions';
			return async ({ update }: { update: (o?: { reset?: boolean }) => Promise<void> }) => {
				savingSection = null;
				await update({ reset: false });
			};
		};
	}

	function makeDeleteEnhance() {
		return ({ cancel }: { cancel: () => void }) => {
			if (savingSection !== null) {
				cancel();
				return;
			}
			savingSection = 'danger';
			return async ({ update }: { update: (o?: { reset?: boolean }) => Promise<void> }) => {
				savingSection = null;
				await update({ reset: false });
			};
		};
	}

	function formatDate(d: Date | string | null | undefined) {
		if (!d) return '—';
		return new Intl.DateTimeFormat('fr-FR', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(new Date(d));
	}

	function parseDevice(ua: string | null | undefined): string {
		if (!ua) return 'Appareil inconnu';
		if (/iPhone|iPad/.test(ua)) return 'iPhone / iPad';
		if (/Android/.test(ua)) return 'Android';
		if (/Firefox/.test(ua)) return 'Firefox';
		if (/Edg/.test(ua)) return 'Edge';
		if (/Chrome/.test(ua)) return 'Chrome';
		if (/Safari/.test(ua)) return 'Safari';
		return 'Navigateur';
	}
</script>

<svelte:head>
	<title>Sécurité — Windprof</title>
</svelte:head>

<div class="min-h-screen bg-bg">
	<main class="mx-auto px-5 pt-10 pb-20 sm:px-8" style="max-width: 1140px">
		<!-- Page title -->
		<div class="mb-1.5 font-mono text-label font-semibold tracking-widest text-accent uppercase">
			↳ PARAMÈTRES
		</div>

		<!-- Desktop layout -->
		<div class="lg:grid lg:items-start lg:gap-10" style="grid-template-columns: 210px 1fr">
			<!-- Sidebar nav (desktop) -->
			<aside class="sticky top-5 hidden lg:block">
				<div class="sticky overflow-hidden">
					{#each sections as s (s.id)}
						<a
							href="#{s.id}"
							onclick={scrollToSection(s.id)}
							class="flex w-full items-center gap-3 rounded-md p-3 text-left transition-colors {visibleSection ===
							s.id
								? 'border border-muted/50 bg-white'
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

			<!-- Content -->
			<div class="flex flex-col gap-10">
				<!-- Change password -->
				{#if data.hasPassword}
					<section id="password" style="scroll-margin-top: 2rem">
						<div class="mb-6">
							<div class="font-mono text-[10.5px] font-bold tracking-widest text-accent uppercase">
								↳ {numOf.password} ·
								<span class="font-display text-3xl font-black tracking-tighter text-ink"
									>MOT DE PASSE</span
								>
							</div>
						</div>

						<form method="POST" action="?/changePassword" use:enhance={makePasswordEnhance()}>
							<div class="flex flex-col gap-4">
								<div>
									<label
										for="currentPassword"
										class="mb-1.5 block font-mono text-[11px] font-semibold tracking-widest text-muted uppercase"
									>
										Mot de passe actuel
									</label>
									<input
										id="currentPassword"
										type="password"
										name="currentPassword"
										required
										autocomplete="current-password"
										class="w-full rounded-md border border-line bg-white px-4 py-3 font-sans text-[14px] text-ink transition-colors outline-none focus:border-ink"
									/>
								</div>
								<div>
									<label
										for="newPassword"
										class="mb-1.5 block font-mono text-[11px] font-semibold tracking-widest text-muted uppercase"
									>
										Nouveau mot de passe
									</label>
									<input
										id="newPassword"
										type="password"
										name="newPassword"
										required
										minlength="8"
										autocomplete="new-password"
										class="w-full rounded-md border border-line bg-white px-4 py-3 font-sans text-[14px] text-ink transition-colors outline-none focus:border-ink"
									/>
								</div>
								<div>
									<label
										for="confirmPassword"
										class="mb-1.5 block font-mono text-[11px] font-semibold tracking-widest text-muted uppercase"
									>
										Confirmer le nouveau mot de passe
									</label>
									<input
										id="confirmPassword"
										type="password"
										name="confirmPassword"
										required
										minlength="8"
										autocomplete="new-password"
										class="w-full rounded-md border border-line bg-white px-4 py-3 font-sans text-[14px] text-ink transition-colors outline-none focus:border-ink"
									/>
								</div>
							</div>

							{#if (form as any)?.action === 'changePassword' && (form as any)?.error}
								<div
									class="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700"
								>
									{(form as any).error}
								</div>
							{/if}

							<div class="mt-8 flex items-center justify-between border-b border-line pb-5">
								{#if savedSection === 'password'}
									<span
										class="font-mono text-label font-semibold tracking-widest text-green-600 uppercase"
									>
										✓ Mot de passe mis à jour
									</span>
								{:else}
									<span class="font-mono text-[12px] text-muted">Min. 8 caractères</span>
								{/if}
								<button
									type="submit"
									disabled={savingSection !== null}
									class="inline-flex cursor-pointer items-center gap-2.5 rounded-md bg-ink px-6 py-3 font-display text-[13.5px] font-bold tracking-wide text-white uppercase hover:opacity-85 disabled:opacity-50"
								>
									{savingSection === 'password' ? 'Mise à jour…' : 'Mettre à jour'}
								</button>
							</div>
						</form>
					</section>
				{/if}

				<!-- OAuth connections -->
				{#if data.oauthProviders.length > 0}
					<section id="connexions" style="scroll-margin-top: 2rem">
						<div class="mb-6">
							<div class="font-mono text-[10.5px] font-bold tracking-widest text-accent uppercase">
								↳ {numOf.connexions} ·
								<span class="font-display text-3xl font-black tracking-tighter text-ink"
									>CONNEXIONS</span
								>
							</div>
						</div>

						<div class="flex flex-col gap-3">
							{#each data.oauthProviders as provider (provider)}
								{@const info = providerInfo(provider)}
								<div
									class="flex items-center gap-4 rounded-[10px] border border-line bg-white px-5 py-4"
								>
									{#if info.icon}
										<img src={info.icon} alt={info.label} class="h-6 w-6 shrink-0" />
									{:else}
										<span
											class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-line text-[11px] font-bold text-muted"
										>
											{info.label.charAt(0)}
										</span>
									{/if}
									<span class="font-mono text-[13px] font-bold text-ink">
										{info.label}
									</span>
									<span
										class="ml-auto rounded-full bg-green-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-green-700 uppercase"
									>
										connecté
									</span>
								</div>
							{/each}
						</div>
					</section>
				{/if}

				<!-- Active sessions -->
				<section id="sessions" style="scroll-margin-top: 2rem">
					<div class="mb-6">
						<div class="font-mono text-[10.5px] font-bold tracking-widest text-accent uppercase">
							↳ {numOf.sessions} ·
							<span class="font-display text-3xl font-black tracking-tighter text-ink"
								>SESSIONS ACTIVES</span
							>
						</div>
					</div>

					<div class="flex flex-col gap-3">
						{#each data.sessions as session (session.id)}
							{@const isCurrent = session.token === data.currentSessionToken}
							<div
								class="flex items-start justify-between gap-4 rounded-[10px] border px-5 py-4 {isCurrent
									? 'border-ink bg-ink/[0.03]'
									: 'border-line bg-white'}"
							>
								<div class="min-w-0 flex-1">
									<div class="mb-1 flex items-center gap-2">
										<span class="font-mono text-[12px] font-bold text-ink">
											{parseDevice(session.userAgent)}
										</span>
										{#if isCurrent}
											<span
												class="rounded-full bg-ink px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest text-white uppercase"
											>
												session actuelle
											</span>
										{/if}
									</div>
									<div class="font-mono text-[11px] text-muted">
										{session.ipAddress ?? 'IP inconnue'} · Créée le {formatDate(session.createdAt)}
									</div>
									<div class="font-mono text-[11px] text-muted/70">
										Expire le {formatDate(session.expiresAt)}
									</div>
								</div>

								{#if !isCurrent}
									<form
										method="POST"
										action="?/revokeSession"
										use:enhance={makeRevokeEnhance(session.token)}
									>
										<input type="hidden" name="token" value={session.token} />
										<button
											type="submit"
											disabled={revokingToken !== null}
											class="shrink-0 cursor-pointer rounded-md border border-line px-3 py-2 font-mono text-[11px] font-semibold text-muted uppercase transition-colors hover:border-red-300 hover:text-red-600 disabled:opacity-40"
										>
											{revokingToken === session.token ? '…' : 'Révoquer'}
										</button>
									</form>
								{/if}
							</div>
						{:else}
							<div
								class="rounded-[10px] border border-line px-5 py-6 text-center font-mono text-[12px] text-muted"
							>
								Aucune session active.
							</div>
						{/each}
					</div>

					{#if (form as any)?.action === 'revokeSession' && (form as any)?.error}
						<div
							class="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700"
						>
							{(form as any).error}
						</div>
					{/if}

					{#if data.sessions.length > 1}
						<div class="mt-6 flex justify-end border-t border-line pt-5">
							<form method="POST" action="?/revokeAllSessions" use:enhance={makeRevokeAllEnhance()}>
								<button
									type="submit"
									disabled={savingSection !== null}
									class="cursor-pointer font-mono text-[11.5px] font-semibold text-muted uppercase underline-offset-2 transition-colors hover:text-red-600 hover:underline disabled:opacity-50"
								>
									{savingSection === 'sessions'
										? 'Déconnexion…'
										: 'Déconnecter toutes les autres sessions'}
								</button>
							</form>
						</div>
					{/if}
				</section>

				<!-- Delete account / Danger zone -->
				<section id="danger" style="scroll-margin-top: 2rem">
					<div class="mb-6">
						<div class="font-mono text-[10.5px] font-bold tracking-widest text-accent uppercase">
							↳ {numOf.danger} ·
							<span class="font-display text-3xl font-black tracking-tighter text-ink">COMPTE</span>
						</div>
					</div>

					<div class="rounded-[10px] border border-red-200 bg-red-50/30 p-6">
						<h2
							class="mb-1 font-display text-[18px] font-black tracking-tight text-red-700 uppercase"
						>
							Zone de danger
						</h2>
						<p class="mb-5 font-sans text-[14px] text-red-700/80">
							La suppression de votre compte est irréversible. Toutes vos données seront
							définitivement effacées.
						</p>

						{#if !showDeleteForm}
							<button
								type="button"
								onclick={() => {
									showDeleteForm = true;
								}}
								class="cursor-pointer rounded-md border border-red-300 bg-white px-5 py-2.5 font-mono text-[12px] font-semibold text-red-600 uppercase transition-colors hover:border-red-600 hover:bg-red-600 hover:text-white"
							>
								Supprimer mon compte
							</button>
						{:else}
							<form method="POST" action="?/deleteAccount" use:enhance={makeDeleteEnhance()}>
								<div class="flex flex-col gap-4">
									{#if data.hasPassword}
										<div>
											<label
												for="deletePassword"
												class="mb-1.5 block font-mono text-[11px] font-semibold tracking-widest text-red-700/70 uppercase"
											>
												Mot de passe actuel
											</label>
											<input
												id="deletePassword"
												type="password"
												name="password"
												required
												autocomplete="current-password"
												class="w-full rounded-md border border-red-200 bg-white px-4 py-3 font-sans text-[14px] text-ink transition-colors outline-none focus:border-red-400"
											/>
										</div>
									{:else}
										<input type="hidden" name="password" value="" />
									{/if}

									<div>
										<label
											for="deleteConfirmText"
											class="mb-1.5 block font-mono text-[11px] font-semibold tracking-widest text-red-700/70 uppercase"
										>
											Tapez <span class="text-red-700">SUPPRIMER</span> pour confirmer
										</label>
										<input
											id="deleteConfirmText"
											type="text"
											name="confirmText"
											bind:value={deleteConfirmText}
											placeholder="SUPPRIMER"
											autocomplete="off"
											class="w-full rounded-md border border-red-200 bg-white px-4 py-3 font-sans text-[14px] text-ink transition-colors outline-none focus:border-red-400"
										/>
									</div>
								</div>

								{#if (form as any)?.action === 'deleteAccount' && (form as any)?.error}
									<div
										class="mt-4 rounded-md border border-red-300 bg-red-100 px-4 py-3 text-[14px] text-red-700"
									>
										{(form as any).error}
									</div>
								{/if}

								<div class="mt-5 flex items-center gap-3">
									<button
										type="submit"
										disabled={savingSection !== null || deleteConfirmText !== 'SUPPRIMER'}
										class="inline-flex cursor-pointer items-center rounded-md bg-red-600 px-5 py-2.5 font-display text-[13.5px] font-bold tracking-wide text-white uppercase transition-colors hover:bg-red-700 disabled:opacity-40"
									>
										{savingSection === 'danger' ? 'Suppression…' : 'Supprimer définitivement'}
									</button>
									<button
										type="button"
										onclick={() => {
											showDeleteForm = false;
											deleteConfirmText = '';
										}}
										class="cursor-pointer font-mono text-[12px] text-muted uppercase transition-colors hover:text-ink"
									>
										Annuler
									</button>
								</div>
							</form>
						{/if}
					</div>
				</section>
			</div>
		</div>
	</main>
</div>
