import { sqliteTable, text, index } from "drizzle-orm/sqlite-core";
import { profProfiles } from "./profProfiles.schema";

export const profSports = sqliteTable(
    "prof_sports",
    {
        id: text("id").primaryKey(),
        profId: text("prof_id")
            .notNull()
            .references(() => profProfiles.id, { onDelete: "cascade" }),
        sport: text("sport", {
            enum: ["kitesurf", "wingfoil", "windsurf"],
        }).notNull(),
        // JSON: ("beginner" | "intermediate" | "advanced" | "all")[]
        acceptedLevels: text("accepted_levels"),
    },
    (t) => [index("prof_sports_profId_idx").on(t.profId)],
);