import { db } from "./db";
import {
    packTypes,
    cardTemplates,
    type PackType,
    type CardTemplate,
    type InsertPackType,
    type InsertCardTemplate
} from "../shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
    // Packs
    getPacks(): Promise<PackType[]>;
    getPack(id: number): Promise<PackType | undefined>;
    createPack(pack: InsertPackType): Promise<PackType>;

    // Cards
    getCards(): Promise<CardTemplate[]>;
    getCard(id: number): Promise<CardTemplate | undefined>;
    createCard(card: InsertCardTemplate): Promise<CardTemplate>;
}

export class DatabaseStorage implements IStorage {
    // Packs
    async getPacks(): Promise<PackType[]> {
        return await db.select().from(packTypes);
    }

    async getPack(id: number): Promise<PackType | undefined> {
        const [pack] = await db.select().from(packTypes).where(eq(packTypes.id, id));
        return pack;
    }

    async createPack(pack: InsertPackType): Promise<PackType> {
        // @ts-ignore
        const [newPack] = await db.insert(packTypes).values(pack).returning();
        return newPack;
    }

    // Cards
    async getCards(): Promise<CardTemplate[]> {
        return await db.select().from(cardTemplates);
    }

    async getCard(id: number): Promise<CardTemplate | undefined> {
        const [card] = await db.select().from(cardTemplates).where(eq(cardTemplates.id, id));
        return card;
    }

    async createCard(card: InsertCardTemplate): Promise<CardTemplate> {
        // @ts-ignore
        const [newCard] = await db.insert(cardTemplates).values(card).returning();
        return newCard;
    }
}

export const storage = new DatabaseStorage();