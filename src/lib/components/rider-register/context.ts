import { createContext } from 'svelte';

export type RiderSport = 'kitesurf' | 'wingfoil' | 'windsurf';
export type RiderLevel = 'discovery' | 'beginner' | 'intermediate' | 'advanced';

export type RiderFormData = {
	firstName: string;
	lastName: string;
	birthYear: number;
	city: string;
	bio: string;
	sports: Array<{ sport: RiderSport; level: RiderLevel | '' }>;
	goals: string[];
	formatPreferences: string[];
	equipmentPreference: 'own' | 'provided' | 'any' | '';
	spots: Array<{ name: string; isPreferred: boolean }>;
	maxDistanceKm: number;
	availabilityDays: number[];
	availabilitySlots: string[];
	budgetRanges: string[];
};

export type RiderRegisterCtx = {
	readonly step: number;
	readonly data: RiderFormData;
	readonly errors: Record<string, string>;
	goTo(n: number): void;
	next(): void;
	prev(): void;
};

export const [getRiderRegisterCtx, setRiderRegisterCtx] = createContext<RiderRegisterCtx>();
