<script lang="ts">
	import { enhance } from '$app/forms';
	import type { AdminUser } from './types';

	let {
		user,
		onSuspend,
		onDelete
	}: {
		user: AdminUser;
		onSuspend: () => void;
		onDelete: () => void;
	} = $props();

	const isSuspended = $derived(user.banned ?? false);

	const initials = $derived(
		(user.name ?? '?')
			.split(' ')
			.map((n) => n[0] ?? '')
			.join('')
			.slice(0, 2)
			.toUpperCase()
	);

	const formattedDate = $derived(
		user.createdAt
			? new Date(user.createdAt).toLocaleDateString('fr-FR', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit'
				})
			: '—'
	);

	const typeLabel = $derived(user.type === 'prof' ? 'Moniteur' : 'Rider');

	const tdBase =
		'border-b border-ink/[0.07] px-[14px] py-[11px] align-middle group-hover:bg-[#fbf8f1]';
</script>

<tr class="group" class:shadow-[inset_3px_0_0_#E8724C]={isSuspended}>
	<!-- Name -->
	<td class={tdBase}>
		<div class="flex items-center gap-2.5">
			<div
				class="flex h-7.5 w-7.5 shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-dark font-display text-label font-bold text-[#4A5260]"
			>
				{#if user.image}
					<img src={user.image} alt="" class="h-full w-full object-cover" />
				{:else}
					{initials}
				{/if}
			</div>
			<div>
				<div class="flex items-center gap-1.5 text-body-sm font-semibold text-ink">
					{user.name}
					{#if isSuspended}
						<span
							title="Compte suspendu"
							class="inline-flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-accent font-display text-[9px] font-black text-white"
							>!</span
						>
					{/if}
				</div>
			</div>
		</div>
	</td>

	<!-- Email -->
	<td class="{tdBase} font-mono text-label tracking-[0.01em] text-[#4A5260]">
		{user.email}
	</td>

	<!-- Type -->
	<td class={tdBase}>
		<span
			class="inline-flex items-center rounded-sm border border-ink/16 bg-bg px-1.75 py-0.5 font-mono text-[10.5px] font-semibold tracking-[0.04em] text-ink"
		>
			{typeLabel}
		</span>
	</td>

	<!-- Email verified -->
	<td class={tdBase}>
		{#if user.emailVerified}
			<span
				class="inline-flex items-center gap-1.5 rounded-sm bg-[rgba(111,210,154,0.18)] px-2 py-0.5 font-mono text-micro font-bold tracking-wide text-[#1f6f47] uppercase"
			>
				<span class="h-1.25 w-1.25 rounded-full bg-current"></span>Vérifié
			</span>
		{:else}
			<span
				class="inline-flex items-center gap-1.5 rounded-sm bg-[rgba(179,78,62,0.14)] px-2 py-0.5 font-mono text-micro font-bold tracking-wide text-[#9a3a2c] uppercase"
			>
				<span class="h-1.25 w-1.25 rounded-full bg-current"></span>Non vérifié
			</span>
		{/if}
	</td>

	<!-- Statut -->
	<td class={tdBase}>
		{#if isSuspended}
			<span
				class="inline-flex items-center gap-1.5 rounded-sm bg-[rgba(179,78,62,0.14)] px-2 py-0.5 font-mono text-micro font-bold tracking-wide text-[#9a3a2c] uppercase"
			>
				<span class="h-1.25 w-1.25 rounded-full bg-current"></span>Suspendu
			</span>
		{:else}
			<span
				class="inline-flex items-center gap-1.5 rounded-sm bg-[rgba(111,210,154,0.18)] px-2 py-0.5 font-mono text-micro font-bold tracking-wide text-[#1f6f47] uppercase"
			>
				<span class="h-1.25 w-1.25 rounded-full bg-current"></span>Actif
			</span>
		{/if}
	</td>

	<!-- Inscription -->
	<td class="{tdBase} font-mono text-[10.5px] text-[#4A5260]">
		{formattedDate}
	</td>

	<!-- Actions -->
	<td class={tdBase}>
		<div class="flex justify-end gap-1">
			{#if isSuspended}
				<form method="POST" action="?/unsuspend" use:enhance>
					<input type="hidden" name="userId" value={user.id} />
					<button
						type="submit"
						title="Réactiver le compte"
						class="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-line bg-white text-[#1f6f47] hover:bg-bg hover:text-ink"
					>
						<svg width="12" height="12" viewBox="0 0 16 16" fill="none">
							<path
								d="M13 8A5 5 0 1 1 3 8a5 5 0 0 1 10 0Z"
								stroke="currentColor"
								stroke-width="1.5"
							/>
							<path
								d="m6 8 1.5 1.5L10 6"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
				</form>
			{:else}
				<button
					type="button"
					title="Suspendre le compte"
					onclick={onSuspend}
					class="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-line bg-white text-[#4A5260] hover:bg-bg hover:text-accent"
				>
					<svg width="12" height="12" viewBox="0 0 16 16" fill="none">
						<rect x="4" y="3" width="2.5" height="10" rx="1" fill="currentColor" />
						<rect x="9.5" y="3" width="2.5" height="10" rx="1" fill="currentColor" />
					</svg>
				</button>
			{/if}

			<button
				type="button"
				title="Supprimer le compte"
				onclick={onDelete}
				class="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-line bg-white text-[#4A5260] hover:border-[#9a3a2c]/30 hover:bg-[rgba(179,78,62,0.1)] hover:text-[#9a3a2c]"
			>
				<svg width="12" height="12" viewBox="0 0 16 16" fill="none">
					<path
						d="M3 4h10M6 4V3h4v1M5 4l.5 9h5L11 4"
						stroke="currentColor"
						stroke-width="1.4"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>
	</td>
</tr>
