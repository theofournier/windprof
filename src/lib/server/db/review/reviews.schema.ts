import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { profProfiles } from "../prof/profProfiles.schema";
import { riderProfiles } from "../rider/riderProfiles.schema";
import { sql, type InferSelectModel, type InferInsertModel } from "drizzle-orm";

export const reviews = sqliteTable(
    "reviews",
    {
        id: text("id").primaryKey(),
        profId: text("prof_id")
            .notNull()
            .references(() => profProfiles.id, { onDelete: "cascade" }),
        riderId: text("rider_id").references(() => riderProfiles.id, { onDelete: "set null" }),
        riderName: text("rider_name"),
        riderLevel: text("rider_level"),
        rating: integer("rating").notNull(),
        body: text("body"),
        createdAt: integer("created_at", { mode: "timestamp_ms" })
            .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
            .notNull(),
    },
    (t) => [
        index("reviews_profId_idx").on(t.profId),
        index("reviews_riderId_idx").on(t.riderId),
    ],
);

export type Review = InferSelectModel<typeof reviews>;
export type NewReview = InferInsertModel<typeof reviews>;