import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "../shared/routes";

export async function registerRoutes(
    httpServer: Server,
    app: Express
): Promise<Server> {

    // Packs
    app.get(api.packs.list.path, async (req, res) => {
        const packs = await storage.getPacks();
        res.json(packs);
    });

    app.get(api.packs.get.path, async (req, res) => {
        const pack = await storage.getPack(Number(req.params.id));
        if (!pack) return res.status(404).json({ message: "Pack not found" });
        res.json(pack);
    });

    // Cards
    app.get(api.cards.list.path, async (req, res) => {
        const cards = await storage.getCards();
        res.json(cards);
    });

    app.get(api.cards.get.path, async (req, res) => {
        const card = await storage.getCard(Number(req.params.id));
        if (!card) return res.status(404).json({ message: "Card not found" });
        res.json(card);
    });

    // Seed Data Endpoint (for development)
    app.post("/api/seed", async (req, res) => {
        const existingPacks = await storage.getPacks();
        if (existingPacks.length === 0) {
            // Seed Packs
            await storage.createPack({
                name: "Starter Pack",
                description: "A basic pack to get you started. Contains 3 cards.",
                priceEth: "0.01",
                imageUrl: "https://placehold.co/400x600/1a1a1a/ffffff?text=Starter+Pack",
                cardCount: 3,
                active: true
            });
            await storage.createPack({
                name: "Elite Pack",
                description: "High chance of rare cards. Contains 5 cards.",
                priceEth: "0.05",
                imageUrl: "https://placehold.co/400x600/4a1a1a/ffffff?text=Elite+Pack",
                cardCount: 5,
                active: true
            });

            // Seed Cards
            await storage.createCard({
                name: "Crypto Knight",
                description: "A brave warrior of the blockchain.",
                rarity: "common",
                imageUrl: "https://placehold.co/300x400/333/fff?text=Crypto+Knight",
                stats: { attack: 10, defense: 10, speed: 5 }
            });
            await storage.createCard({
                name: "Ether Mage",
                description: "Wields the power of gas.",
                rarity: "rare",
                imageUrl: "https://placehold.co/300x400/224/fff?text=Ether+Mage",
                stats: { attack: 25, defense: 5, speed: 15 }
            });
            await storage.createCard({
                name: "Dragon of Dao",
                description: "Legendary guardian of the treasury.",
                rarity: "legendary",
                imageUrl: "https://placehold.co/300x400/630/fff?text=Dragon+of+Dao",
                stats: { attack: 50, defense: 40, speed: 30 }
            });
            await storage.createCard({
                name: "Block Golem",
                description: "Unstoppable force.",
                rarity: "common",
                imageUrl: "https://placehold.co/300x400/444/fff?text=Block+Golem",
                stats: { attack: 15, defense: 25, speed: 2 }
            });
        }
        res.json({ message: "Database seeded successfully" });
    });

    return httpServer;
}