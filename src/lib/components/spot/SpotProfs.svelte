<script lang="ts">
	let {
		profs
	}: {
		profs: {
			id: string;
			name: string;
			disciplines: string[];
			rating: number;
			reviewCount: number;
			bio: string;
		}[];
	} = $props();
</script>

<div>
	<div class="mb-4.5 flex items-end justify-between">
		<div>
			<div class="mb-2.5 font-mono text-label tracking-label text-accent uppercase">
				↳ MONITEURS SUR CE SPOT
			</div>
			<h2 class="m-0 text-[38px]">
				{profs.length} moniteur{profs.length > 1 ? 's' : ''}
				<span class="font-serif font-normal italic normal-case tracking-[-0.02em] text-muted"
					>· actifs ici</span
				>
			</h2>
		</div>
		<a
			href="/profs"
			class="hidden font-mono text-label tracking-wider text-muted uppercase underline sm:block"
			>Voir tous →</a
		>
	</div>

	<div class="flex flex-col gap-3">
		{#each profs as prof (prof.id)}
			<a
				href="/profs/{prof.id}"
				class="block rounded-2.5 border border-ink/14 bg-white px-6 py-5 transition-shadow hover:shadow-md"
			>
				<div class="flex items-start justify-between gap-4">
					<div class="flex items-start gap-4">
						<!-- Avatar placeholder -->
						<div
							class="h-12 w-12 shrink-0 rounded-full bg-bg-dark"
							style="background-image: repeating-linear-gradient(135deg, rgba(0,0,0,.06) 0 1px, transparent 1px 8px);"
						></div>
						<div class="min-w-0">
							<div class="mb-1 font-display text-[18px] font-black tracking-tight">
								{prof.name}
							</div>
							<div class="mb-2 flex flex-wrap gap-1">
								{#each prof.disciplines as d (d)}
									<span
										class="rounded-sm bg-bg-dark px-2 py-0.5 font-mono text-label tracking-wide text-ink uppercase"
										>{d}</span
									>
								{/each}
							</div>
							<p class="m-0 line-clamp-2 text-[13px] leading-relaxed text-muted">{prof.bio}</p>
						</div>
					</div>
					<div class="shrink-0 text-right">
						<div class="text-sm font-semibold text-accent">★ {prof.rating.toFixed(1)}</div>
						<div class="mt-0.5 font-mono text-micro tracking-wider text-muted">
							{prof.reviewCount} avis
						</div>
						<div class="mt-2 font-mono text-label font-bold tracking-label text-accent uppercase">
							VOIR →
						</div>
					</div>
				</div>
			</a>
		{/each}
	</div>
</div>
