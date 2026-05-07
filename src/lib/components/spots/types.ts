export type Spot = {
	id: string;
	name: string;
	region: string;
	coords: string;
	kt: number;
	gust: number;
	dir: string;
	cardinals: number[]; // 8 values: N NE E SE S SW W NW
	beaufort: number;
	water: string;
	wind: string;
	moniteurs: number;
	disciplines: string[];
	level: string;
	tide: string;
	tag: string;
	tagHot: boolean;
};

export type SpotDetail = Spot & {
	description: string;
	avgRating: number;
	reviewCount: number;
	bestMonths: string[];
	facilities: string[];
	forecast: { day: string; speed: number; direction: string; status: 'good' | 'ok' | 'bad' }[];
	profs: { id: string; name: string; disciplines: string[]; rating: number; reviewCount: number; bio: string }[];
	reviews: { name: string; level: string; date: string; rating: number; text: string }[];
	distribution: { stars: number; count: number }[];
	glanceDetails: { label: string; value: string }[];
};
