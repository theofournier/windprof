<script lang="ts">
	import AdminRiderHeader from '$lib/components/admin/rider/AdminRiderHeader.svelte';
	import AdminRiderIdentity from '$lib/components/admin/rider/AdminRiderIdentity.svelte';
	import AdminRiderDisciplines from '$lib/components/admin/rider/AdminRiderDisciplines.svelte';
	import AdminRiderReviews from '$lib/components/admin/rider/AdminRiderReviews.svelte';
	import AdminRiderReports from '$lib/components/admin/rider/AdminRiderReports.svelte';
	import AdminRiderSidebar from '$lib/components/admin/rider/AdminRiderSidebar.svelte';
	import AdminRiderSuspendModal from '$lib/components/admin/rider/AdminRiderSuspendModal.svelte';
	import AdminRiderDeleteModal from '$lib/components/admin/rider/AdminRiderDeleteModal.svelte';

	let { data } = $props();
	let rider = $derived(data.rider);

	let suspendOpen = $state(false);
	let deleteOpen = $state(false);
</script>

<svelte:head>
	<title>{rider.firstName} {rider.lastName ?? ''} - Admin - Windprof</title>
</svelte:head>

<div>
	<AdminRiderHeader
		{rider}
		onsuspend={() => (suspendOpen = true)}
		ondelete={() => (deleteOpen = true)}
	/>

	<div class="grid grid-cols-[1fr_380px] gap-4.5">
		<div class="flex flex-col gap-4.5">
			<AdminRiderIdentity {rider} />
			<AdminRiderDisciplines {rider} />
			<AdminRiderReviews {rider} />
			<AdminRiderReports reports={data.submittedReports} />
		</div>
		<AdminRiderSidebar {rider} />
	</div>
</div>

<AdminRiderSuspendModal open={suspendOpen} {rider} onclose={() => (suspendOpen = false)} />
<AdminRiderDeleteModal open={deleteOpen} {rider} onclose={() => (deleteOpen = false)} />
