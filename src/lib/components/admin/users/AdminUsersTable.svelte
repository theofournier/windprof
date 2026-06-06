<script lang="ts">
	import type { AdminUser } from './types';
	import AdminUsersTableRow from './AdminUsersTableRow.svelte';
	import AdminUserSuspendModal from './AdminUserSuspendModal.svelte';
	import AdminUserDeleteModal from './AdminUserDeleteModal.svelte';

	let { users, total }: { users: AdminUser[]; total: number } = $props();

	const cols = ['Utilisateur', 'Email', 'Type', 'Email vérifié', 'Statut', 'Inscription', ''];

	let suspendTarget = $state<AdminUser | null>(null);
	let deleteTarget = $state<AdminUser | null>(null);
</script>

<div class="border border-t-0 border-ink/10 bg-white">
	<table class="w-full border-collapse text-[12.5px]">
		<thead>
			<tr>
				{#each cols as col}
					<th
						class="border-b border-line bg-bg px-3.5 py-2.5 text-left font-mono text-micro font-bold tracking-label whitespace-nowrap text-[#4A5260] uppercase"
					>
						{col}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each users as user (user.id)}
				<AdminUsersTableRow
					{user}
					onSuspend={() => (suspendTarget = user)}
					onDelete={() => (deleteTarget = user)}
				/>
			{:else}
				<tr>
					<td
						colspan="7"
						class="px-4 py-12 text-center font-mono text-caption tracking-loose uppercase text-muted"
					>
						Aucun utilisateur sans profil.
					</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<div class="flex items-center border-t border-ink/[0.07] bg-[#fbf8f1] px-4 py-3.5">
		<div class="font-mono text-label tracking-[0.06em] text-[#4A5260]">
			<b class="text-ink">{users.length}</b> sur <b class="text-ink">{total}</b> utilisateurs sans profil
		</div>
	</div>
</div>

{#if suspendTarget}
	<AdminUserSuspendModal open={true} user={suspendTarget} onclose={() => (suspendTarget = null)} />
{/if}

{#if deleteTarget}
	<AdminUserDeleteModal open={true} user={deleteTarget} onclose={() => (deleteTarget = null)} />
{/if}
