<script lang="ts">
	import type { PageProps } from './$types';
	import ProfBreadcrumb from '$lib/components/prof/ProfBreadcrumb.svelte';
	import ProfGallery from '$lib/components/prof/ProfGallery.svelte';
	import ProfHero from '$lib/components/prof/ProfHero.svelte';
	import ProfStats from '$lib/components/prof/ProfStats.svelte';
	import ProfPricing from '$lib/components/prof/ProfPricing.svelte';
	import ProfCertifications from '$lib/components/prof/ProfCertifications.svelte';
	import ProfSpots from '$lib/components/prof/ProfSpots.svelte';
	import ProfReviews from '$lib/components/prof/ProfReviews.svelte';
	import ProfAtAGlance from '$lib/components/prof/ProfAtAGlance.svelte';
	import ProfWindForecast from '$lib/components/prof/ProfWindForecast.svelte';

	let { data }: PageProps = $props();
</script>

<ProfBreadcrumb
	segments={[
		{ label: 'MONITEURS', href: '/profs' },
		{ label: 'AUDE' },
		{ label: 'LEUCATE' },
		{ label: 'JULIEN MERCIER' }
	]}
/>

<section
	class="mx-auto grid max-w-360 grid-cols-1 gap-8 px-4 pt-7 pb-12 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-10 lg:px-14"
>
	<ProfGallery name="Julien Mercier" windDirection="N/NE" windRange="12–28 kt" photoCount={4} />
	<ProfHero
		name="Julien Mercier"
		location="Leucate — La Franqui · Aude"
		stars={4.9}
		reviewCount={42}
		isVerified={true}
		isPremium={true}
		bio="Moniteur indépendant depuis 12 ans, spécialisé dans la progression des riders intermédiaires. Je bosse en petit comité (max 3 personnes) pour garder le temps à l'eau au maximum. BPJEPS + IKO Level 3."
		disciplines={['Kitesurf', 'Wingfoil']}
		levels={['Débutant', 'Intermédiaire', 'Avancé', '✓ Matériel fourni']}
		phone="06 ·· ·· ·· 42"
		email="julien@…"
	/>
</section>

<ProfStats
	stats={[
		{ value: '12 ans', label: "D'EXPÉRIENCE" },
		{ value: '~380', label: 'RIDERS ACCOMPAGNÉS' },
		{ value: '3 max', label: 'RIDERS / SESSION' },
		{ value: '12 kt', label: 'VENT MINIMUM' }
	]}
/>

<section
	class="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-4 pt-4 pb-16 sm:px-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10 lg:px-14"
>
	<div>
		<ProfPricing
			items={[
				{ label: 'Cours individuel · kite', duration: '1h30', price: '90€' },
				{ label: 'Cours individuel · wing', duration: '2h', price: '110€' },
				{ label: 'Stage 3 demi-journées', duration: '3×2h', price: '280€' },
				{ label: 'Groupe (max 3)', duration: '2h', price: '70€' }
			]}
		/>
		<ProfCertifications
			certifications={[
				{ name: 'BPJEPS · Glisses Aérotractées', year: '2013' },
				{ name: 'IKO — Level 3 Senior Instructor', year: '2017' },
				{ name: 'Secourisme PSC1', year: '2022' }
			]}
		/>
		<ProfSpots
			profName="Julien"
			spots={[
				{ name: 'Leucate — La Franqui', isPrimary: true, label: 'Principal' },
				{ name: 'La Palme' },
				{ name: 'Gruissan' }
			]}
		/>
		<ProfReviews
			averageRating={4.9}
			totalReviews={42}
			distribution={[
				{ stars: 5, count: 36 },
				{ stars: 4, count: 5 },
				{ stars: 3, count: 1 },
				{ stars: 2, count: 0 },
				{ stars: 1, count: 0 }
			]}
			reviews={[
				{
					name: 'Paul G.',
					level: 'Intermédiaire',
					date: 'il y a 3 semaines',
					rating: 5,
					text: "Dix minutes pour trouver, dix minutes pour lire les avis, un coup de fil. Deux jours après j'étais à l'eau. Julien explique hyper bien, repère les détails qui bloquent. Je reviens l'an prochain."
				},
				{
					name: 'Clara B.',
					level: 'Débutante',
					date: 'il y a 2 mois',
					rating: 5,
					text: "Première prise de kite, j'étais un peu anxieuse. Julien prend le temps, il ne pousse pas. À la fin de la 2e demi-journée j'enchaînais des bords. Matos impec et spot rêvé."
				},
				{
					name: 'Malik R.',
					level: 'Avancé',
					date: 'il y a 2 mois',
					rating: 4,
					text: "Session spécifique strapless, exactement ce que je cherchais. Peut-être un peu moins de théorie et plus d'eau au début, mais le feedback vidéo à la fin a tout rattrapé."
				}
			]}
		/>
	</div>

	<aside class="order-first flex flex-col gap-4.5 lg:sticky lg:top-5 lg:order-0 lg:self-start">
		<ProfAtAGlance
			details={[
				{ label: 'Disciplines', value: 'Kitesurf · Wingfoil' },
				{ label: 'Niveaux', value: 'Débutant · Intermédiaire · Avancé' },
				{ label: 'Langues', value: 'Français · English · Español' },
				{ label: 'Vent minimum', value: '12 kt' },
				{ label: 'Matériel', value: 'Fourni · North Kiteboarding' },
				{ label: 'Assurance', value: 'RC Pro FFVL' },
				{ label: 'Inscrit depuis', value: 'Mars 2026' }
			]}
		/>
		<ProfWindForecast
			days={[
				{ day: 'SAM', speed: 18, direction: 'SW', status: 'good' },
				{ day: 'DIM', speed: 16, direction: 'W', status: 'good' },
				{ day: 'LUN', speed: 11, direction: 'W', status: 'ok' },
				{ day: 'MAR', speed: 7, direction: 'N', status: 'bad' },
				{ day: 'MER', speed: 14, direction: 'N', status: 'good' }
			]}
			threshold={12}
			profFirstName="Julien"
		/>
	</aside>
</section>
