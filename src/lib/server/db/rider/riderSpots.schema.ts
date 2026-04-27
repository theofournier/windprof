import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { riderProfiles } from "./riderProfiles.schema";

export const riderSpots = sqliteTable(
    "rider_spots",
    {
        id: text("id").primaryKey(),
        riderId: text("rider_id")
            .notNull()
            .references(() => riderProfiles.id, { onDelete: "cascade" }),
        name: text("name").notNull(),
        isPreferred: integer("is_preferred", { mode: "boolean" }).default(false).notNull(),
        displayOrder: integer("display_order").default(0).notNull(),
    },
    (t) => [index("rider_spots_riderId_idx").on(t.riderId)],
);