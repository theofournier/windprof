import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { SpotDetail } from '$lib/components/spots/types.js';

const SPOTS_DETAIL: SpotDetail[] = [
	{
		id: 'leucate',
		name: 'Leucate — La Franqui',
		region: 'Aude · Occitanie',
		coords: '42.91°N · 3.05°E',
		kt: 24,
		gust: 32,
		dir: 'N',
		cardinals: [1, 1, 0, 0, 0, 0, 0, 0],
		beaufort: 6,
		water: 'mer · plate à clapot',
		wind: 'tramontane',
		moniteurs: 18,
		disciplines: ['Kitesurf', 'Wingfoil'],
		level: 'Tous niveaux',
		tide: 'faible',
		tag: 'CONDITIONS HOT',
		tagHot: true,
		description:
			"Leucate La Franqui est l'un des spots de kitesurf les plus réputés de France. La tramontane y souffle avec une régularité remarquable d'avril à septembre, créant des conditions parfaites pour riders de tous niveaux. Le lagon offre un plan d'eau plat idéal pour les débutants, tandis que la plage ouverte sur la Méditerranée attire les riders en quête de vagues et de sauts.",
		avgRating: 4.7,
		reviewCount: 89,
		bestMonths: ['Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep'],
		facilities: ['Parking', 'École agréée', 'Location matériel', 'Douches', 'Snack', 'Toilettes'],
		forecast: [
			{ day: 'MER', speed: 24, direction: 'N', status: 'good' },
			{ day: 'JEU', speed: 18, direction: 'NE', status: 'ok' },
			{ day: 'VEN', speed: 8, direction: 'SW', status: 'bad' },
			{ day: 'SAM', speed: 22, direction: 'N', status: 'good' },
			{ day: 'DIM', speed: 26, direction: 'N', status: 'good' }
		],
		profs: [
			{
				id: 'prof-1',
				name: 'Marc Durand',
				disciplines: ['Kitesurf'],
				rating: 4.9,
				reviewCount: 34,
				bio: "Champion de France 2018, je transmets ma passion avec pédagogie depuis 12 ans sur le spot de La Franqui. Spécialisé progression rapide et freeride."
			},
			{
				id: 'prof-2',
				name: 'Sophie Renard',
				disciplines: ['Kitesurf', 'Wingfoil'],
				rating: 4.8,
				reviewCount: 22,
				bio: 'Monitrice diplômée BPJEPS, spécialisée débutants et femmes débutantes. Pédagogie douce et cadre sécurisé.'
			},
			{
				id: 'prof-3',
				name: 'Julien Mas',
				disciplines: ['Wingfoil'],
				rating: 4.7,
				reviewCount: 18,
				bio: "Premier moniteur wingfoil certifié de la région, formé par l'IKO et la FFVL. Foil, wave et freeride."
			}
		],
		reviews: [
			{
				name: 'Antoine B.',
				level: 'INTERMÉDIAIRE',
				date: 'il y a 2 semaines',
				rating: 5,
				text: "Spot exceptionnel ! La tramontane était au rendez-vous, plan d'eau parfait pour progresser en kite. Je recommande à 100%, le staff est top et l'organisation impeccable."
			},
			{
				name: 'Camille R.',
				level: 'DÉBUTANT',
				date: 'il y a 1 mois',
				rating: 5,
				text: "Première fois en kitesurf ici et c'était parfait. Les conditions sont clémentes pour les débutants, les moniteurs patients et le spot grand pour ne pas se croiser."
			},
			{
				name: 'Pierre M.',
				level: 'AVANCÉ',
				date: 'il y a 2 mois',
				rating: 4,
				text: 'Très bon spot avec une tramontane régulière et franche. Un peu chargé en été mais le spot est grand. Eau plate côté lagon, idéal pour les figures.'
			},
			{
				name: 'Sarah D.',
				level: 'INTERMÉDIAIRE',
				date: 'il y a 3 mois',
				rating: 5,
				text: "Leucate c'est la référence en France pour le kitesurf. Vent constant, eau plate côté lagon, plein de moniteurs compétents et une ambiance géniale."
			}
		],
		distribution: [
			{ stars: 5, count: 62 },
			{ stars: 4, count: 18 },
			{ stars: 3, count: 6 },
			{ stars: 2, count: 2 },
			{ stars: 1, count: 1 }
		],
		glanceDetails: [
			{ label: "Plan d'eau", value: 'Mer · Plate à clapot' },
			{ label: 'Vent dominant', value: 'Tramontane (N)' },
			{ label: 'Marnage', value: 'Faible' },
			{ label: 'Disciplines', value: 'Kitesurf · Wingfoil' },
			{ label: 'Niveau', value: 'Tous niveaux' },
			{ label: 'Moniteurs actifs', value: '18' },
			{ label: 'Accès', value: 'Libre · Parking payant' },
			{ label: 'Saison', value: 'Avr — Sep' }
		]
	},
	{
		id: 'la-torche',
		name: 'La Torche',
		region: 'Finistère · Bretagne',
		coords: '47.83°N · 4.36°W',
		kt: 18,
		gust: 26,
		dir: 'W',
		cardinals: [0, 0, 0, 1, 1, 0, 0, 0],
		beaufort: 5,
		water: 'océan · vagues',
		wind: 'thermique W',
		moniteurs: 14,
		disciplines: ['Wingfoil', 'Windsurf'],
		level: 'Intermédiaire',
		tide: 'forte',
		tag: 'FAVORABLE',
		tagHot: false,
		description:
			"La Torche est un spot légendaire de la côte bretonne. Exposée aux vents d'ouest atlantiques, cette presqu'île offre des vagues régulières et un fetch exceptionnel. Idéale pour le windsurf et le wingfoil niveau intermédiaire à avancé. Attention au marnage important et aux courants.",
		avgRating: 4.5,
		reviewCount: 61,
		bestMonths: ['Mai', 'Juin', 'Juil', 'Août'],
		facilities: ['Parking', 'École', 'Location', 'Camping proche'],
		forecast: [
			{ day: 'MER', speed: 18, direction: 'W', status: 'ok' },
			{ day: 'JEU', speed: 22, direction: 'W', status: 'good' },
			{ day: 'VEN', speed: 24, direction: 'SW', status: 'good' },
			{ day: 'SAM', speed: 14, direction: 'NW', status: 'ok' },
			{ day: 'DIM', speed: 10, direction: 'N', status: 'bad' }
		],
		profs: [
			{
				id: 'prof-4',
				name: 'Gaël Le Berre',
				disciplines: ['Windsurf', 'Wingfoil'],
				rating: 4.8,
				reviewCount: 28,
				bio: 'Breton de souche, je navigue sur La Torche depuis 20 ans. Formateur FFVL, spécialiste vague et freeride.'
			},
			{
				id: 'prof-5',
				name: 'Anaïs Coat',
				disciplines: ['Wingfoil'],
				rating: 4.6,
				reviewCount: 15,
				bio: 'Monitrice passionnée de wingfoil, je propose des stages découverte et progression en petit groupe.'
			}
		],
		reviews: [
			{
				name: 'Thomas L.',
				level: 'AVANCÉ',
				date: 'il y a 3 semaines',
				rating: 5,
				text: "Un des plus beaux spots de France. Les vagues sont régulières, le vent thermique fiable en été. Attention au marnage mais c'est magnifique."
			},
			{
				name: 'Marie C.',
				level: 'INTERMÉDIAIRE',
				date: 'il y a 2 mois',
				rating: 4,
				text: "Spot exigeant mais tellement gratifiant. Il faut être au bon niveau pour profiter pleinement. L'école est très pro."
			}
		],
		distribution: [
			{ stars: 5, count: 38 },
			{ stars: 4, count: 17 },
			{ stars: 3, count: 4 },
			{ stars: 2, count: 1 },
			{ stars: 1, count: 1 }
		],
		glanceDetails: [
			{ label: "Plan d'eau", value: 'Océan · Vagues' },
			{ label: 'Vent dominant', value: 'Thermique W' },
			{ label: 'Marnage', value: 'Fort (5–6 m)' },
			{ label: 'Disciplines', value: 'Wingfoil · Windsurf' },
			{ label: 'Niveau', value: 'Intermédiaire+' },
			{ label: 'Moniteurs actifs', value: '14' },
			{ label: 'Accès', value: 'Libre · Parking gratuit' },
			{ label: 'Saison', value: 'Mai — Août' }
		]
	},
	{
		id: 'tarifa',
		name: 'Tarifa',
		region: 'Andalousie · Étranger',
		coords: '36.01°N · 5.61°W',
		kt: 27,
		gust: 35,
		dir: 'W',
		cardinals: [0, 0, 0, 1, 1, 0, 0, 0],
		beaufort: 7,
		water: 'détroit',
		wind: 'levante / poniente',
		moniteurs: 24,
		disciplines: ['Kitesurf', 'Wingfoil'],
		level: 'Tous niveaux',
		tide: 'forte',
		tag: 'TEMPÊTE',
		tagHot: true,
		description:
			"Tarifa est la capitale mondiale du kitesurf. Située au point le plus au sud de l'Europe, au croisement entre l'Atlantique et la Méditerranée, elle bénéficie de deux vents dominants : le levante (est) et le poniente (ouest). Le vent y souffle presque 300 jours par an, avec des conditions souvent extrêmes.",
		avgRating: 4.9,
		reviewCount: 214,
		bestMonths: ['Avr', 'Mai', 'Juin', 'Sep', 'Oct'],
		facilities: [
			'Parking',
			'Écoles agréées',
			'Location premium',
			'Douches',
			'Restaurants',
			'Hébergements'
		],
		forecast: [
			{ day: 'MER', speed: 27, direction: 'W', status: 'good' },
			{ day: 'JEU', speed: 32, direction: 'W', status: 'good' },
			{ day: 'VEN', speed: 28, direction: 'NE', status: 'good' },
			{ day: 'SAM', speed: 20, direction: 'NE', status: 'good' },
			{ day: 'DIM', speed: 15, direction: 'SW', status: 'ok' }
		],
		profs: [
			{
				id: 'prof-6',
				name: 'Carlos Vega',
				disciplines: ['Kitesurf'],
				rating: 5.0,
				reviewCount: 67,
				bio: 'Moniteur IKO level 2, 15 ans à Tarifa. Cours en français, espagnol et anglais. Spécialiste débutants et freestyle.'
			},
			{
				id: 'prof-7',
				name: 'Elena Ruiz',
				disciplines: ['Kitesurf', 'Wingfoil'],
				rating: 4.9,
				reviewCount: 42,
				bio: 'Ancienne compétitrice, je propose des stages intensifs sur 3 ou 5 jours pour une progression rapide garantie.'
			}
		],
		reviews: [
			{
				name: 'Florian K.',
				level: 'AVANCÉ',
				date: 'il y a 1 semaine',
				rating: 5,
				text: 'Tarifa, ça change la vie. 27 nœuds de moyenne sur 5 jours, eau plate côté Valdevaqueros. On a poussé des boutons qu\'on n\'avait jamais touchés.'
			},
			{
				name: 'Julie M.',
				level: 'DÉBUTANT',
				date: 'il y a 3 semaines',
				rating: 5,
				text: "J'avais peur que ce soit trop fort pour débuter mais l'école de Carlos est incroyable. Progression rapide, sécurité au top."
			}
		],
		distribution: [
			{ stars: 5, count: 178 },
			{ stars: 4, count: 28 },
			{ stars: 3, count: 6 },
			{ stars: 2, count: 1 },
			{ stars: 1, count: 1 }
		],
		glanceDetails: [
			{ label: "Plan d'eau", value: 'Détroit · Mixte' },
			{ label: 'Vent dominant', value: 'Levante / Poniente' },
			{ label: 'Marnage', value: 'Modéré' },
			{ label: 'Disciplines', value: 'Kitesurf · Wingfoil' },
			{ label: 'Niveau', value: 'Tous niveaux' },
			{ label: 'Moniteurs actifs', value: '24' },
			{ label: 'Accès', value: 'Libre · Parking' },
			{ label: 'Saison', value: 'Avr — Oct' }
		]
	}
];

export const load: PageServerLoad = async ({ params }) => {
	const spot = SPOTS_DETAIL.find((s) => s.id === params.id);
	if (!spot) {
		error(404, 'Spot introuvable');
	}
	return { spot };
};
