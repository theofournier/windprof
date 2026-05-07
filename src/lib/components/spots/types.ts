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
