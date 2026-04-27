import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "../auth.schema";

export const profProfiles = sqliteTable("prof_profiles", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .unique()
        .references(() => users.id, { onDelete: "cascade" }),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    bio: text("bio"),
    photoUrl: text("photo_url"),
    isVerified: integer("is_verified", { mode: "boolean" }).default(false).notNull(),
    isPublished: integer("is_published", { mode: "boolean" }).default(false).notNull(),
    city: text("city").notNull(),
    region: text("region"),
    phone: text("phone"),
    contactEmail: text("contact_email"),
    contactVisibility: text("contact_visibility", {
        enum: ["phone_email", "email_only", "phone_only"],
    }).default("phone_email"),
    responseTime: text("response_time", {
        enum: ["30min", "2h", "same_day", "within_24h"],
    }),
    // JSON: string[]
    websites: text("websites"),
    equipmentProvided: integer("equipment_provided", { mode: "boolean" }).default(false).notNull(),
    equipmentNote: text("equipment_note"),
    // JSON: string[] — e.g. ["Français","English","Español"]
    languages: text("languages"),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
        .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
        .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
        .$onUpdate(() => new Date())
        .notNull(),
});