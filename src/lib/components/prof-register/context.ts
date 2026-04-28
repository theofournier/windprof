import { createContext } from 'svelte';

export type ProfSport = 'kitesurf' | 'wingfoil' | 'windsurf';
export type ContactVisibility = 'phone_email' | 'email_only' | 'phone_only';
export type ResponseTime = '30min' | '2h' | 'same_day' | 'within_24h';

export type ProfFormData = {
	firstName: string;
	lastName: string;
	bio: string;
	languages: string[];
	sports: Array<{ sport: ProfSport; acceptedLevels: string[] }>;
	certifications: Array<{ type: string; year: string }>;
	city: string;
	region: string;
	spots: Array<{ name: string; isPrimary: boolean }>;
	equipmentProvided: boolean;
	equipmentNote: string;
	prices: Array<{ description: string; duration: string; priceEur: number }>;
	websites: string[];
	phone: string;
	contactEmail: string;
	contactVisibility: ContactVisibility;
	responseTime: ResponseTime | '';
};

export type ProfRegisterCtx = {
	readonly step: number;
	readonly data: ProfFormData;
	goTo(n: number): void;
	next(): void;
	prev(): void;
};

export const [getProfRegisterCtx, setProfRegisterCtx] = createContext<ProfRegisterCtx>();