import type { LayoutServerLoad } from './$types';
import { profProfiles } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { getProfs } from '$lib/server/db/mockData';

export const load: LayoutServerLoad = async (event) => {
    const profs = await getProfs();

    return { profs };
};
