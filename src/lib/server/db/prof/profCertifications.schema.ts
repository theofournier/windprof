import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { profProfiles } from "./profProfiles.schema";
import { sql, type InferSelectModel, type InferInsertModel } from "drizzle-orm";

export const profCertifications = sqliteTable(
    "prof_certifications",
    {
        id: text("id").primaryKey(),
        profId: text("prof_id")
            .notNull()
            .references(() => profProfiles.id, { onDelete: "cascade" }),
        type: text("type").notNull(),
        year: integer("year"),
        fileName: text("file_name"),
        fileUrl: text("file_url"),
        status: text("status", { enum: ["pending", "verified", "rejected"] })
            .default("pending")
            .notNull(),
        createdAt: integer("created_at", { mode: "timestamp_ms" })
            .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
            .notNull(),
        updatedAt: integer("updated_at", { mode: "timestamp_ms" })
            .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
            .$onUpdate(() => new Date())
            .notNull(),
    },
    (t) => [index("prof_certifications_profId_idx").on(t.profId)],
);

export type ProfCertification = InferSelectModel<typeof profCertifications>;
export type NewProfCertification = InferInsertModel<typeof profCertifications>;