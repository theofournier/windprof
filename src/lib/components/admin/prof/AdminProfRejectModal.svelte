<script lang="ts">
	import { enhance } from '$app/forms';

	let {
		open,
		certId,
		certName,
		onclose
	}: {
		open: boolean;
		certId: string;
		certName: string;
		onclose: () => void;
	} = $props();

	const REJECT_REASONS = [
		'Document illisible ou de mauvaise qualité',
		'Diplôme expiré',
		'Diplôme non reconnu par les autorités françaises',
		'Nom sur le document ne correspond pas',
		'Document falsifié ou suspect',
		'Autre motif (préciser ci-dessous)'
	];
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
			aria-label="Rejeter le diplôme"
			tabindex="-1"
			class="w-full max-w-[560px] overflow-hidden rounded-lg bg-white shadow-[0_24px_60px_rgba(0,0,0,.3)]"
			onclick={(e) => e.stopPropagation()}
			onkeydown={() => {}}
		>
			<div class="border-b border-ink/8 px-6 pt-5.5 pb-1.5">
				<div
					class="mb-1.5 font-mono text-[10.5px] font-bold tracking-[0.16em] text-[#9a3a2c] uppercase"
				>
					↳ ACTION DESTRUCTIVE
				</div>
				<div class="font-display text-[22px] font-black tracking-[-0.02em] text-ink">
					Rejeter le diplôme.
				</div>
				<p class="mt-2 mb-3.5 text-[13px] leading-[1.5] text-[#4A5260]">
					Le moniteur sera notifié par email avec le motif. Son statut repassera en <b>PENDING</b> et
					il devra re-uploader un nouveau justificatif.
				</p>
			</div>

			<form
				method="POST"
				action="?/rejectCert"
				use:enhance={() => {
					return ({ update }) => {
						onclose();
						update();
					};
				}}
			>
				<input type="hidden" name="certId" value={certId} />
				<div class="px-6 py-5">
					<div
						class="mb-2 font-mono text-[10.5px] font-semibold tracking-[0.14em] text-muted uppercase"
					>
						Motif (obligatoire) ↓
					</div>
					<div class="mb-3.5 flex flex-col gap-1.5">
						{#each REJECT_REASONS as opt, i (opt)}
							<label
								class="flex cursor-pointer items-center gap-2.25 rounded border border-ink/12 px-2.5 py-2 text-[12.5px] {i ===
								0
									? 'bg-[rgba(232,114,76,0.06)]'
									: 'bg-white'}"
							>
								<input
									type="radio"
									name="reason"
									value={opt}
									checked={i === 0}
									class="accent-accent"
								/>
								{opt}
							</label>
						{/each}
					</div>
					<textarea
						name="note"
						placeholder="Précisions à transmettre au moniteur (visible dans l'email)…"
						class="w-full resize-y rounded border border-ink/14 bg-white p-2.5 text-[12.5px] outline-none"
						style="min-height:80px"
					></textarea>
				</div>
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
						>Confirmer le rejet</button
					>
				</div>
			</form>
		</div>
	</div>
{/if}
