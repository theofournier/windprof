<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import { page } from '$app/state';

	let { children, data } = $props();

	let isAdmin = $derived(page.url.pathname.startsWith('/admin'));
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{#if !isAdmin}
	<Navbar user={data.user} />
{/if}
{@render children()}
{#if !isAdmin}
	<Footer />
{/if}
