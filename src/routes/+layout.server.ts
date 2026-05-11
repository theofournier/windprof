import { getProfs } from '$lib/server/db/mockData';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
    const profs = await getProfs();
    return {
        profs,
        user: event.locals.user ?? null,
    };
};