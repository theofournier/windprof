import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { profProfiles } from "./profProfiles.schema";

export const profSpots = sqliteTable(
    "prof_spots",
    {
        id: text("id").primaryKey(),
        profId: text("prof_id")
            .notNull()
            .references(() => profProfiles.id, { onDelete: "cascade" }),
        name: text("name").notNull(),
        isPrimary: integer("is_primary", { mode: "boolean" }).default(false).notNull(),
        displayOrder: integer("display_order").default(0).notNull(),
    },
    (t) => [index("prof_spots_profId_idx").on(t.profId)],
);