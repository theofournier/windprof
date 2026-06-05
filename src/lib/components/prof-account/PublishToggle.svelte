<script lang="ts">
	import { enhance } from '$app/forms';
	import { fromAction } from 'svelte/attachments';

	let { isPublished }: { isPublished: boolean } = $props();

	let showModal = $state(false);
	let formEl: HTMLFormElement | null = null;

	function captureForm(node: HTMLFormElement) {
		formEl = node;
		return () => {
			formEl = null;
		};
	}

	function requestToggle() {
		showModal = true;
	}

	function confirm() {
		showModal = false;
		formEl?.requestSubmit();
	}

	function cancel() {
		showModal = false;
	}
</script>

<!-- Hidden form -->
<form
	method="POST"
	action="?/togglePublish"
	{@attach captureForm}
	{@attach fromAction(enhance)}
	class="hidden"
></form>

<!-- Switch row -->
<button
	type="button"
	onclick={requestToggle}
	class="inline-flex cursor-pointer items-center gap-3 rounded-md px-1 py-1 transition-colors hover:opacity-80"
	aria-pressed={isPublished}
>
	<!-- Track -->
	<span
		class="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 transition-colors duration-200 {isPublished
			? 'border-green-500 bg-green-500'
			: 'border-muted/40 bg-muted/20'}"
	>
		<!-- Thumb -->
		<span
			class="inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 {isPublished
				? 'translate-x-5'
				: 'translate-x-0.5'}"
		></span>
	</span>
	<span
		class="font-mono text-label font-semibold tracking-widest uppercase {isPublished
			? 'text-green-700'
			: 'text-muted'}"
	>
		{isPublished ? 'Publié' : 'Non publié'}
	</span>
</button>

<!-- Modal -->
{#if showModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4 backdrop-blur-sm"
		role="presentation"
	>
		<div
			class="w-full max-w-[420px] rounded-xl border border-line bg-white p-7 shadow-xl"
			role="alertdialog"
			aria-modal="true"
			aria-labelledby="publish-dialog-title"
			aria-describedby="publish-dialog-desc"
		>
			<div class="mb-1 font-mono text-[11px] font-semibold tracking-widest text-accent uppercase">
				↳ {isPublished ? 'DÉPUBLIER' : 'PUBLIER'}
			</div>
			<h2
				id="publish-dialog-title"
				class="mb-3 font-display text-[26px] leading-tight font-black tracking-tight text-ink uppercase"
			>
				{isPublished ? 'Masquer le profil ?' : 'Publier le profil ?'}
			</h2>
			<p id="publish-dialog-desc" class="mb-7 text-[14px] leading-relaxed text-muted">
				{#if isPublished}
					Ton profil ne sera plus visible dans les résultats de recherche. Les riders ne pourront
					plus te trouver ni te contacter via Windprof. Tu pourras le republier à tout moment.
				{:else}
					Ton profil sera visible par tous les riders sur Windprof. Ils pourront te trouver dans les
					résultats de recherche et te contacter directement.
				{/if}
			</p>

			<div class="flex flex-col gap-2.5">
				<button
					onclick={confirm}
					class="w-full rounded-lg bg-ink px-4 py-3 text-[14px] font-semibold text-white transition hover:bg-ink/85"
				>
					{isPublished ? 'Oui, masquer' : 'Oui, publier'}
				</button>
				<button
					onclick={cancel}
					class="w-full rounded-lg border border-line bg-white px-4 py-3 text-[14px] font-semibold text-ink transition hover:bg-bg"
				>
					Annuler
				</button>
			</div>
		</div>
	</div>
{/if}
