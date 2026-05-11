import { sqliteTable, text, index } from "drizzle-orm/sqlite-core";
import { riderProfiles } from "./riderProfiles.schema";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

export const ridersports = sqliteTable(
    "rider_sports",
    {
        id: text("id").primaryKey(),
        riderId: text("rider_id")
            .notNull()
            .references(() => riderProfiles.id, { onDelete: "cascade" }),
        sport: text("sport", {
            enum: ["kitesurf", "wingfoil", "windsurf"],
        }).notNull(),
        level: text("level", {
            enum: ["discovery", "beginner", "intermediate", "advanced"],
        }),
    },
    (t) => [index("rider_sports_riderId_idx").on(t.riderId)],
);

export type RiderSport = InferSelectModel<typeof ridersports>;
export type NewRiderSport = InferInsertModel<typeof ridersports>;