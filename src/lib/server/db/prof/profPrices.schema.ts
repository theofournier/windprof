import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { profProfiles } from "./profProfiles.schema";

export const profPrices = sqliteTable(
    "prof_prices",
    {
        id: text("id").primaryKey(),
        profId: text("prof_id")
            .notNull()
            .references(() => profProfiles.id, { onDelete: "cascade" }),
        description: text("description").notNull(),
        duration: text("duration"),
        priceEur: integer("price_eur").notNull(),
        displayOrder: integer("display_order").default(0).notNull(),
    },
    (t) => [index("prof_prices_profId_idx").on(t.profId)],
);