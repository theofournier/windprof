<script lang="ts">
	import ProfSectionTitle from './ProfSectionTitle.svelte';

	let {
		certifications
	}: {
		certifications: { name: string; isVerified: boolean }[];
	} = $props();
</script>

{#if certifications.length > 0}
	<div class="mb-11">
		<ProfSectionTitle title="DIPLÔMES &amp; CERTIFICATIONS" />
		<h2 class="mt-2.5 mb-4.5 text-[38px]">Vérifié à la main</h2>

		<div class="flex flex-col gap-3 sm:grid sm:grid-cols-3">
			{#each certifications as cert (cert.name)}
				<div class="flex items-center gap-4 rounded-md border border-ink/14 bg-white px-5 py-4.5">
					<div class="min-w-0 flex-1">
						<div class="text-sm leading-snug font-bold">{cert.name}</div>
					</div>
					{#if cert.isVerified}
						<span
							class="inline-flex flex-none items-center gap-1 rounded-[4px] bg-accent px-2.5 py-1 font-mono text-label font-semibold tracking-wide text-white uppercase"
						>
							✓ Vérifié
						</span>
					{/if}
				</div>
			{/each}
		</div>
	</div>
{/if}
