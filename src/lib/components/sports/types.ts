export type Sport = {
	id: string;
	name: string;
	tagline: string;
	blurb: string;
	moniteurs: number;
	windMin: number;
	windMax: number;
	windSweet: string;
	beaufort: number[];
	learnTime: string;
	level: string;
	gear: string[];
	certifs: string[];
	season: number[];
	priceRange: string;
	icon: 'kite' | 'wing' | 'wind';
};
