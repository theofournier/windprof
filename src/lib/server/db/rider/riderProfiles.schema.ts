import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "../auth.schema";
import { sql, type InferSelectModel, type InferInsertModel } from "drizzle-orm";

export const riderProfiles = sqliteTable("rider_profiles", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .unique()
        .references(() => users.id, { onDelete: "cascade" }),
    firstName: text("first_name").notNull(),
    lastName: text("last_name"),
    photoUrl: text("photo_url"),
    birthYear: integer("birth_year"),
    city: text("city").notNull(),
    bio: text("bio"),
    maxDistanceKm: integer("max_distance_km"),
    equipmentPreference: text("equipment_preference", {
        enum: ["own", "provided", "any"],
    }),
    // JSON: string[] — e.g. ["Passer au foil","Reprendre en sécurité"]
    goals: text("goals"),
    // JSON: ("individual" | "duo" | "small_group" | "stage")[]
    formatPreferences: text("format_preferences"),
    // JSON: number[] — 0=Mon … 6=Sun
    availabilityDays: text("availability_days"),
    // JSON: ("morning" | "midday" | "afternoon" | "end_of_day" | "weekends_only" | "school_holidays")[]
    availabilitySlots: text("availability_slots"),
    // JSON: string[] — e.g. ["60-90","90-130"]
    budgetRanges: text("budget_ranges"),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
        .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
        .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
        .$onUpdate(() => new Date())
        .notNull(),
});

export type RiderProfile = InferSelectModel<typeof riderProfiles>;
export type NewRiderProfile = InferInsertModel<typeof riderProfiles>;