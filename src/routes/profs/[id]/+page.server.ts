import { getProf } from '$lib/server/mockData';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const prof = await getProf(params.id);
    if (!prof) {
        error(404, 'Prof not found');
    }
    return {
        prof
    };
};