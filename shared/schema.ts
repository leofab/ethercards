import { pgTable, text, serial, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

// Metadata for the types of packs available for sale
export const packTypes = pgTable("pack_types", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    priceEth: text("price_eth").notNull(), // Store as string to avoid precision issues
    imageUrl: text("image_url").notNull(),
    cardCount: integer("card_count").notNull(),
    active: boolean("active").default(true),
});

// Metadata for the card templates (the "Card Data" mentioned in architecture)
export const cardTemplates = pgTable("card_templates", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    rarity: text("rarity").notNull(), // 'common', 'rare', 'epic', 'legendary'
    imageUrl: text("image_url").notNull(),
    stats: jsonb("stats").notNull(), // { attack: 10, defense: 5, etc. }
});

// === SCHEMAS ===

// @ts-ignore
export const insertPackTypeSchema = createInsertSchema(packTypes).omit({ id: true });
// @ts-ignore
export const insertCardTemplateSchema = createInsertSchema(cardTemplates).omit({ id: true });

// === EXPLICIT TYPES ===

export type PackType = typeof packTypes.$inferSelect;
export type InsertPackType = z.infer<typeof insertPackTypeSchema>;

export type CardTemplate = typeof cardTemplates.$inferSelect;
export type InsertCardTemplate = z.infer<typeof insertCardTemplateSchema>;

// Request/Response types
export type PackTypeListResponse = PackType[];
export type CardTemplateListResponse = CardTemplate[];