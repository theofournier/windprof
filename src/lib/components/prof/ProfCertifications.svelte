<script lang="ts">
	import ProfSectionTitle from './ProfSectionTitle.svelte';

	let {
		certifications
	}: {
		certifications: { name: string; year: string }[];
	} = $props();
</script>

<div class="mb-11">
	<ProfSectionTitle title="DIPLÔMES &amp; CERTIFICATIONS" />
	<h2 class="mt-2.5 mb-4.5 text-[38px]">Vérifié à la main</h2>

	<div class="flex flex-col gap-3.5 sm:grid sm:grid-cols-3">
		{#each certifications as cert (cert.name)}
			<div class="flex items-center gap-4 rounded-md border border-ink/14 bg-white px-5 py-5.5">
				<div class="mb-2.5 text-[26px] text-accent">✓</div>
				<div>
					<div class="mb-1.5 text-sm leading-snug font-bold">{cert.name}</div>
					<div class="font-mono text-label tracking-wider text-muted">OBTENU EN {cert.year}</div>
				</div>
			</div>
		{/each}
	</div>
</div>
