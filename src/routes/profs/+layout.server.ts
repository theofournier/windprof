import { getProfs } from '$lib/server/mockData';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
    const profs = await getProfs();
    return {
        profs
    };
};