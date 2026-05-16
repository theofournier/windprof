<script lang="ts">
	const testimonials = [
		{
			quote:
				'Trouvé Anaïs en quinze minutes. Cours réservé en direct, pas de plateforme entre nous. Trois sessions plus tard je tape mes premiers vols.',
			author: 'Paul G.',
			role: 'Rider · Wingfoil',
			spot: 'La Torche'
		},
		{
			quote:
				"Avant Windprof je perdais des élèves dans les commissions des plateformes. Ici j'ai retrouvé une relation directe — et de la marge.",
			author: 'Marco D.',
			role: 'Moniteur · Windsurf',
			spot: 'Almanarre'
		},
		{
			quote:
				"L'annuaire est exactement ce qu'il manquait. On voit les diplômes, les spots, le vent accepté. Je sais qui appeler avant même d'arriver.",
			author: 'Clara B.',
			role: 'Rider · Kitesurf',
			spot: 'Leucate'
		}
	];
</script>

<section class="mx-auto max-w-360 px-5 py-16 sm:px-10 lg:px-14">
	<!-- Section header -->
	<div class="mb-10">
		<div class="mb-3 font-mono text-label font-semibold tracking-wider text-accent uppercase">
			↳ LES VOIX
		</div>
		<h2 class="text-[40px] leading-[0.95] tracking-tight sm:text-[54px] lg:text-[68px]">
			Ils ont trouvé
			<span class="font-serif font-normal tracking-normal normal-case italic"> leur vent.</span>
		</h2>
	</div>

	<!-- Testimonial cards -->
	<div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
		{#each testimonials as t (t.author)}
			<div class="flex flex-col rounded-xl border border-line bg-white p-7">
				<!-- Stars -->
				<div class="mb-4 flex gap-0.5">
					{#each [1, 2, 3, 4, 5] as s (s)}
						<span class="text-lg text-accent">★</span>
					{/each}
				</div>

				<!-- Quote -->
				<blockquote
					class="mb-6 flex-1 font-serif text-[18px] leading-relaxed text-ink italic sm:text-[20px]"
				>
					"{t.quote}"
				</blockquote>

				<!-- Divider -->
				<div class="mb-4 border-t border-line"></div>

				<!-- Author -->
				<div class="flex items-center justify-between">
					<div>
						<div class="font-mono text-label font-semibold tracking-wider text-ink uppercase">
							{t.author}
						</div>
						<div class="font-mono text-caption font-semibold tracking-wider text-muted uppercase">
							{t.role}
						</div>
					</div>
					<span class="font-mono text-label font-semibold tracking-wider text-accent uppercase"
						>{t.spot}</span
					>
				</div>
			</div>
		{/each}
	</div>
</section>
