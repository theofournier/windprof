<script lang="ts">
	import AdminProfHeader from '$lib/components/admin/prof/AdminProfHeader.svelte';
	import AdminProfIdentity from '$lib/components/admin/prof/AdminProfIdentity.svelte';
	import AdminProfCertifications from '$lib/components/admin/prof/AdminProfCertifications.svelte';
	import AdminProfDisciplines from '$lib/components/admin/prof/AdminProfDisciplines.svelte';
	import AdminProfReviews from '$lib/components/admin/prof/AdminProfReviews.svelte';
	import AdminProfReports from '$lib/components/admin/prof/AdminProfReports.svelte';
	import AdminProfSubmittedReports from '$lib/components/admin/prof/AdminProfSubmittedReports.svelte';
	import AdminProfSidebar from '$lib/components/admin/prof/AdminProfSidebar.svelte';
	import AdminProfRejectModal from '$lib/components/admin/prof/AdminProfRejectModal.svelte';
	import AdminProfSuspendModal from '$lib/components/admin/prof/AdminProfSuspendModal.svelte';
	import AdminProfDeleteModal from '$lib/components/admin/prof/AdminProfDeleteModal.svelte';

	let { data } = $props();
	let prof = $derived(data.prof);

	type RejectState = { open: false } | { open: true; certId: string; certName: string };
	let rejectState = $state<RejectState>({ open: false });
	let suspendOpen = $state(false);
	let deleteOpen = $state(false);

	function openReject(certId: string, certName: string) {
		rejectState = { open: true, certId, certName };
	}
</script>

<svelte:head>
	<title>{prof.firstName} {prof.lastName} - Admin - Windprof</title>
</svelte:head>

<div>
	<AdminProfHeader
		{prof}
		onsuspend={() => (suspendOpen = true)}
		ondelete={() => (deleteOpen = true)}
	/>

	<div class="grid [grid-template-columns:1fr_380px] gap-[18px]">
		<div class="flex flex-col gap-[18px]">
			<AdminProfIdentity {prof} />
			<AdminProfCertifications {prof} onreject={openReject} />
			<AdminProfDisciplines {prof} />
			<AdminProfReviews {prof} />
			<AdminProfReports {prof} />
			<AdminProfSubmittedReports reports={data.submittedReports} />
		</div>
		<AdminProfSidebar {prof} />
	</div>
</div>

<AdminProfRejectModal
	open={rejectState.open}
	certId={rejectState.open ? rejectState.certId : ''}
	certName={rejectState.open ? rejectState.certName : ''}
	onclose={() => (rejectState = { open: false })}
/>

<AdminProfSuspendModal open={suspendOpen} {prof} onclose={() => (suspendOpen = false)} />

<AdminProfDeleteModal open={deleteOpen} {prof} onclose={() => (deleteOpen = false)} />
