import { relations } from "drizzle-orm";
import { accounts, sessions, users } from "./auth.schema";
import { profProfiles } from "./prof/profProfiles.schema";
import { riderProfiles } from "./rider/riderProfiles.schema";
import { profSports } from "./prof/profSports.schema";
import { profSpots } from "./prof/profSpots.schema";
import { profPrices } from "./prof/profPrices.schema";
import { profCertifications } from "./prof/profCertifications.schema";
import { reviews } from "./review/reviews.schema";
import { ridersports } from "./rider/riderSports.schema";
import { riderSpots } from "./rider/riderSpots.schema";

export const usersRelations = relations(users, ({ many, one }) => ({
    sessions: many(sessions),
    accounts: many(accounts),
    profProfile: one(profProfiles, {
        fields: [users.id],
        references: [profProfiles.userId],
    }),
    riderProfile: one(riderProfiles, {
        fields: [users.id],
        references: [riderProfiles.userId],
    }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
    users: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
    users: one(users, {
        fields: [accounts.userId],
        references: [users.id],
    }),
}));


export const profProfilesRelations = relations(profProfiles, ({ one, many }) => ({
    user: one(users, { fields: [profProfiles.userId], references: [users.id] }),
    disciplines: many(profSports),
    spots: many(profSpots),
    priceItems: many(profPrices),
    certifications: many(profCertifications),
    reviews: many(reviews),
}));

export const profSportsRelations = relations(profSports, ({ one }) => ({
    profProfile: one(profProfiles, {
        fields: [profSports.profId],
        references: [profProfiles.id],
    }),
}));

export const profSpotsRelations = relations(profSpots, ({ one }) => ({
    profProfile: one(profProfiles, {
        fields: [profSpots.profId],
        references: [profProfiles.id],
    }),
}));

export const profPriceItemsRelations = relations(profPrices, ({ one }) => ({
    profProfile: one(profProfiles, {
        fields: [profPrices.profId],
        references: [profProfiles.id],
    }),
}));

export const profCertificationsRelations = relations(profCertifications, ({ one }) => ({
    profProfile: one(profProfiles, {
        fields: [profCertifications.profId],
        references: [profProfiles.id],
    }),
}));

export const riderProfilesRelations = relations(riderProfiles, ({ one, many }) => ({
    user: one(users, { fields: [riderProfiles.userId], references: [users.id] }),
    disciplines: many(ridersports),
    spots: many(riderSpots),
    reviews: many(reviews),
}));

export const riderSportsRelations = relations(ridersports, ({ one }) => ({
    riderProfile: one(riderProfiles, {
        fields: [ridersports.riderId],
        references: [riderProfiles.id],
    }),
}));

export const riderSpotsRelations = relations(riderSpots, ({ one }) => ({
    riderProfile: one(riderProfiles, {
        fields: [riderSpots.riderId],
        references: [riderProfiles.id],
    }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
    profProfile: one(profProfiles, {
        fields: [reviews.profId],
        references: [profProfiles.id],
    }),
    riderProfile: one(riderProfiles, {
        fields: [reviews.riderId],
        references: [riderProfiles.id],
    }),
}));
