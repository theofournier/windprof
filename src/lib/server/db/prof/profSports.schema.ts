import { sqliteTable, text, index } from "drizzle-orm/sqlite-core";
import { profProfiles } from "./profProfiles.schema";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

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

export type ProfSport = InferSelectModel<typeof profSports>;
export type NewProfSport = InferInsertModel<typeof profSports>;