import { task } from "$lib/server/db/schema";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ locals }) => {
    try {
        const db = locals.db;
        if (!db) {
            return json({ error: 'Database not available' }, { status: 500 });
        }

        const results = await db.select().from(task);

        return json({ tasks: results });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return json({ error: 'Failed to fetch tasks' }, { status: 500 });
    }
};