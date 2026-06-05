<script lang="ts">
</script>

<svelte:head>
	<title>Admin - Windprof</title>
</svelte:head>

<div class="mb-8">
	<div class="mb-2 font-mono text-label font-bold tracking-widest text-accent uppercase">
		↳ ADMIN · TABLEAU DE BORD
	</div>
	<h1
		class="m-0 font-display text-[42px] leading-none font-black tracking-tight text-ink uppercase"
	>
		Tableau de bord.
	</h1>
	<p class="mt-2.5 text-[13.5px] text-[#4A5260]">Vue d'ensemble de la plateforme Windprof.</p>
</div>

<div
	class="grid max-w-150 gap-px border border-ink/10 bg-ink/10"
	style="grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))"
>
	<a
		href="/admin/profs"
		class="group relative flex flex-col gap-2 bg-white p-[24px_20px] text-ink no-underline transition-colors duration-100 hover:bg-[#fbf8f1]"
	>
		<div class="mb-1 text-[18px] opacity-50">⚐</div>
		<div class="font-mono text-[10.5px] font-bold tracking-widest text-accent">MONITEURS</div>
		<div class="text-body-sm leading-normal text-[#4A5260]">
			Gérer les fiches, valider les diplômes et modérer les comptes.
		</div>
		<span
			class="absolute right-5 bottom-5 text-[16px] text-accent transition-transform duration-150 group-hover:translate-x-1"
		>
			→
		</span>
	</a>
</div>
