<script lang="ts">
	let {
		certifications
	}: {
		certifications: { name: string; year: string }[];
	} = $props();
</script>

<div class="mb-11">
	<div class="mb-2.5 font-mono text-label tracking-label text-accent uppercase">
		↳ DIPLÔMES &amp; CERTIFICATIONS
	</div>
	<h2 class="mb-4.5 text-[38px]">Vérifié à la main</h2>

	<div class="grid grid-cols-3 gap-3.5">
		{#each certifications as cert (cert.name)}
			<div class="rounded-2.5 border border-ink/14 bg-white px-5 py-5.5">
				<div class="mb-2.5 text-[26px] text-accent">✓</div>
				<div class="mb-1.5 text-sm font-bold leading-snug">{cert.name}</div>
				<div class="font-mono text-label tracking-wider text-muted">OBTENU EN {cert.year}</div>
			</div>
		{/each}
	</div>
</div>
