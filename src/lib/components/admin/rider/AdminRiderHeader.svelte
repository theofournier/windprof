<script lang="ts">
	import { enhance } from '$app/forms';
	import type { AdminRiderDetail } from './types';
	import { registeredAgo } from './types';

	let {
		rider,
		onsuspend,
		ondelete
	}: {
		rider: AdminRiderDetail;
		onsuspend: () => void;
		ondelete: () => void;
	} = $props();

	const initials = $derived(
		`${rider.firstName[0] ?? ''}${(rider.lastName ?? '')[0] ?? ''}`.toUpperCase()
	);
	const isBanned = $derived(rider.user?.banned ?? false);
	const ago = $derived(registeredAgo(rider.createdAt));
</script>

<div
	class="mb-4.5 border border-ink/10 bg-white"
	style="background: linear-gradient(135deg,#fff,#FBF8F1)"
>
	<div class="grid grid-cols-[auto_1fr_auto] items-center gap-6 p-6">
		<!-- Avatar -->
		<div class="relative">
			<div
				class="flex h-22 w-22 items-center justify-center rounded-full border-[3px] border-white shadow-[0_4px_14px_rgba(0,0,0,0.08)]"
				style="background: repeating-linear-gradient(45deg,#e8e0d0 0px,#e8e0d0 4px,#f2ede3 4px,#f2ede3 8px)"
			>
				{#if rider.photoUrl}
					<img src={rider.photoUrl} alt="" class="h-full w-full rounded-full object-cover" />
				{:else}
					<span class="font-display text-[28px] font-black text-[#4A5260]">{initials}</span>
				{/if}
			</div>
			{#if isBanned}
				<span
					class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-sm bg-[rgba(179,78,62,0.14)] px-2 py-0.5 font-mono text-[9px] font-bold tracking-loose whitespace-nowrap text-[#9a3a2c] uppercase"
				>
					<span class="mr-1 inline-block h-1.25 w-1.25 rounded-full bg-[#9a3a2c]"></span>suspendu
				</span>
			{:else}
				<span
					class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-sm bg-[rgba(111,210,154,0.18)] px-2 py-0.5 font-mono text-[9px] font-bold tracking-loose whitespace-nowrap text-[#1f6f47] uppercase"
				>
					<span class="mr-1 inline-block h-1.25 w-1.25 rounded-full bg-[#1f6f47]"></span>actif
				</span>
			{/if}
		</div>

		<!-- Identity -->
		<div>
			<div class="mb-1.5 font-mono text-[10.5px] font-bold tracking-widest text-accent uppercase">
				↳ FICHE RIDER · #{rider.id}
			</div>
			<h1
				class="m-0 font-display text-[36px] leading-none font-black tracking-tight text-ink uppercase"
			>
				{rider.firstName}
				{rider.lastName ?? ''}
			</h1>
			<div class="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-[#4A5260]">
				{#if rider.city}
					<span class="flex items-center gap-1.5">
						<svg width="11" height="11" viewBox="0 0 16 16" fill="none">
							<path
								d="M8 1.5C5 1.5 3 3.5 3 6.5c0 4 5 8 5 8s5-4 5-8c0-3-2-5-5-5Z"
								stroke="#4A5260"
								stroke-width="1.4"
							/>
							<circle cx="8" cy="6" r="1.6" fill="#4A5260" />
						</svg>
						{rider.city}
					</span>
					<span class="text-ink/20">·</span>
				{/if}
				{#if rider.user?.email}
					<span class="font-mono tracking-[0.06em]">{rider.user.email}</span>
					<span class="text-ink/20">·</span>
				{/if}
				{#if rider.reviews.length > 0}
					<span><b>{rider.reviews.length}</b> avis laissé{rider.reviews.length > 1 ? 's' : ''}</span
					>
				{/if}
			</div>
		</div>

		<!-- Meta -->
		<div class="flex flex-col items-end gap-2">
			<div class="font-mono text-[10.5px] tracking-[0.06em] text-muted">
				Inscrit · {new Date(rider.createdAt).toISOString().slice(0, 10)} · {ago}
			</div>
		</div>
	</div>

	<!-- Quick actions -->
	<div class="flex flex-wrap items-center gap-2 border-t border-ink/8 bg-white px-7 py-3.5">
		<span class="mr-1.5 font-mono text-micro tracking-label text-muted uppercase"
			>Actions rapides ↓</span
		>

		{#if isBanned}
			<form method="POST" action="?/unsuspend" use:enhance>
				<input type="hidden" name="userId" value={rider.user?.id} />
				<button
					class="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-[#1f6f47] bg-[#1f6f47] px-3 py-2 font-display text-[12.5px] font-bold tracking-[0.04em] text-white uppercase"
				>
					<svg width="13" height="13" viewBox="0 0 16 16" fill="none">
						<path d="M4 8h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
						<path
							d="M10 5l3 3-3 3"
							stroke="currentColor"
							stroke-width="1.6"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					Lever la suspension
				</button>
			</form>
		{:else}
			<button
				onclick={onsuspend}
				class="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-ink/30 bg-white px-3 py-2 font-display text-[12.5px] font-bold tracking-[0.04em] text-ink uppercase"
			>
				<svg width="13" height="13" viewBox="0 0 16 16" fill="none">
					<rect x="4" y="3" width="3" height="10" rx="1" fill="currentColor" />
					<rect x="9" y="3" width="3" height="10" rx="1" fill="currentColor" />
				</svg>
				Suspendre
			</button>
		{/if}

		<button
			onclick={ondelete}
			class="inline-flex cursor-pointer items-center gap-2 rounded-sm border border-ink/20 bg-white px-3 py-2 font-display text-[12.5px] font-bold tracking-[0.04em] text-muted uppercase"
		>
			<svg width="13" height="13" viewBox="0 0 16 16" fill="none">
				<path
					d="M3 5h10M6 5V3h4v2M5 5l1 9h4l1-9"
					stroke="currentColor"
					stroke-width="1.4"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			Supprimer le compte
		</button>
	</div>
</div>
