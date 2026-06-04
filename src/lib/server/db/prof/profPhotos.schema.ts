import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { profProfiles } from "./profProfiles.schema";
import { type InferSelectModel, type InferInsertModel, sql } from "drizzle-orm";

export const profPhotos = sqliteTable(
    "prof_photos",
    {
        id: text("id").primaryKey(),
        profId: text("prof_id")
            .notNull()
            .references(() => profProfiles.id, { onDelete: "cascade" }),
        // Cloudflare R2 object key — e.g. profs/{profId}/gallery/{uuid}.jpg
        key: text("key").notNull(),
        // Public-facing URL served from R2 / CDN
        url: text("url").notNull(),
        displayOrder: integer("display_order").default(0).notNull(),
        createdAt: integer("created_at", { mode: "timestamp_ms" })
            .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
            .notNull(),
    },
    (t) => [index("prof_photos_profId_idx").on(t.profId)],
);

export type ProfPhoto = InferSelectModel<typeof profPhotos>;
export type NewProfPhoto = InferInsertModel<typeof profPhotos>;
