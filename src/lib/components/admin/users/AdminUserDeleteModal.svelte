<script lang="ts">
	import type { AdminUser } from './types';

	let {
		open,
		user,
		onclose
	}: {
		open: boolean;
		user: AdminUser;
		onclose: () => void;
	} = $props();
</script>

{#if open}
	<div
		role="presentation"
		class="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(14,26,43,0.55)] p-8 backdrop-blur-[2px]"
		onclick={onclose}
		onkeydown={(e) => e.key === 'Escape' && onclose()}
	>
		<div
			role="dialog"
			aria-modal="true"
			aria-label="Supprimer le compte"
			tabindex="-1"
			class="w-full max-w-[480px] overflow-hidden rounded-lg bg-white shadow-[0_24px_60px_rgba(0,0,0,.3)]"
			onclick={(e) => e.stopPropagation()}
			onkeydown={() => {}}
		>
			<div class="border-b border-ink/8 px-6 pt-5.5 pb-1.5">
				<div
					class="mb-1.5 font-mono text-[10.5px] font-bold tracking-[0.16em] text-[#9a3a2c] uppercase"
				>
					↳ ACTION IRRÉVERSIBLE
				</div>
				<div class="font-display text-[22px] font-black tracking-[-0.02em] text-ink">
					Supprimer le compte.
				</div>
				<p class="mt-2 mb-3.5 text-[13px] leading-[1.5] text-[#4A5260]">
					Le compte de <b>{user.name}</b> ({user.email}) sera définitivement supprimé. Cette action
					est irréversible.
				</p>
			</div>
			<form method="POST" action="?/deleteAccount">
				<input type="hidden" name="userId" value={user.id} />
				<div class="flex justify-end gap-2 bg-[#F2EDE3] px-6 py-3.5">
					<button
						type="button"
						onclick={onclose}
						class="inline-flex cursor-pointer items-center gap-1.5 rounded-sm border border-ink/20 bg-white px-3 py-2 font-mono text-[11px] font-semibold tracking-[0.04em] text-[#4A5260] uppercase"
						>Annuler</button
					>
					<button
						type="submit"
						class="inline-flex cursor-pointer items-center gap-2 rounded-sm border-0 bg-[#9a3a2c] px-3.5 py-2 font-display text-[12.5px] font-bold tracking-[0.04em] text-white uppercase"
						>Supprimer définitivement</button
					>
				</div>
			</form>
		</div>
	</div>
{/if}
