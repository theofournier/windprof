import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { profProfiles } from "../prof/profProfiles.schema";
import { users } from "../auth.schema";
import { sql, type InferSelectModel, type InferInsertModel } from "drizzle-orm";

export const REPORT_REASONS = [
    'Informations incorrectes',
    "Faux profil / usurpation d'identité",
    'Comportement inapproprié',
    'Arnaque ou fraude',
    'Profil en double',
    'Autre',
] as const;

export type ReportReason = (typeof REPORT_REASONS)[number];

export const REPORT_STATUSES = ['pending', 'reviewed', 'dismissed'] as const;
export type ReportStatus = (typeof REPORT_STATUSES)[number];

export const reports = sqliteTable(
    "reports",
    {
        id: text("id").primaryKey(),
        profId: text("prof_id")
            .notNull()
            .references(() => profProfiles.id, { onDelete: "cascade" }),
        userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
        reporterEmail: text("reporter_email").notNull(),
        reason: text("reason").notNull(),
        description: text("description"),
        status: text("status", { enum: ["pending", "reviewed", "dismissed"] })
            .default("pending")
            .notNull(),
        createdAt: integer("created_at", { mode: "timestamp_ms" })
            .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
            .notNull(),
    },
    (t) => [
        index("reports_profId_idx").on(t.profId),
        index("reports_status_idx").on(t.status),
    ],
);

export type Report = InferSelectModel<typeof reports>;
export type NewReport = InferInsertModel<typeof reports>;
