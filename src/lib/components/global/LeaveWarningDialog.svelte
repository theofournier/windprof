<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { authClient } from '$lib/auth.client';

	let { submitted = false }: { submitted?: boolean } = $props();

	let showDialog = $state(false);
	let pendingUrl = $state('/');
	let isLeaving = $state(false);
	let loading = $state(false);

	beforeNavigate(({ cancel, to }) => {
		if (submitted || isLeaving) return;
		if (to?.url) {
			cancel();
			pendingUrl = to.url.href;
			showDialog = true;
		}
	});

	$effect(() => {
		if (submitted) return;
		const handler = (e: BeforeUnloadEvent) => {
			e.preventDefault();
			e.returnValue = '';
		};
		window.addEventListener('beforeunload', handler);
		return () => window.removeEventListener('beforeunload', handler);
	});

	async function handleLeave() {
		loading = true;
		isLeaving = true;
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					location.href = pendingUrl;
				},
				onError: () => {
					location.href = pendingUrl;
				}
			}
		});
	}

	function handleStay() {
		showDialog = false;
	}
</script>

{#if showDialog}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4 backdrop-blur-sm"
		role="presentation"
	>
		<!-- Dialog -->
		<div
			class="w-full max-w-[420px] rounded-xl border border-line bg-white p-7 shadow-xl"
			role="alertdialog"
			aria-modal="true"
			aria-labelledby="leave-dialog-title"
			aria-describedby="leave-dialog-desc"
		>
			<div class="mb-1 font-mono text-[11px] font-semibold tracking-widest text-accent uppercase">
				↳ ATTENTION
			</div>
			<h2
				id="leave-dialog-title"
				class="mb-3 font-display text-[26px] leading-tight font-black tracking-tight uppercase text-ink"
			>
				Profil non sauvegardé.
			</h2>
			<p id="leave-dialog-desc" class="mb-7 text-[14px] leading-relaxed text-muted">
				Tu n'as pas finalisé ton inscription. Si tu quittes maintenant, tes informations seront
				perdues et tu seras déconnecté(e).
			</p>

			<div class="flex flex-col gap-2.5">
				<button
					onclick={handleStay}
					class="w-full rounded-lg border border-line bg-white px-4 py-3 text-[14px] font-semibold text-ink transition hover:bg-bg"
				>
					Continuer l'inscription
				</button>
				<button
					onclick={handleLeave}
					disabled={loading}
					class="w-full rounded-lg bg-ink px-4 py-3 text-[14px] font-semibold text-white transition hover:bg-ink/85 disabled:opacity-60"
				>
					{loading ? 'Déconnexion…' : 'Quitter et se déconnecter'}
				</button>
			</div>
		</div>
	</div>
{/if}
