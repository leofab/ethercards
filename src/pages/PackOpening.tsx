import { useState } from "react";
import { useLocation } from "wouter";
import { Navigation } from "../components/Navigation";
import { useCards } from "../hooks/use-cards";
import { CardReveal } from "../components/CardReveal";
import { Button } from "../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowLeft, PackageOpen } from "lucide-react";
import type {CardTemplate} from "../../shared/schema";

export default function PackOpening() {
    const [, setLocation] = useLocation();
    const { data: allCards} = useCards();
    const [revealedCards, setRevealedCards] = useState<CardTemplate[]>([]);
    const [stage, setStage] = useState<'closed' | 'opening' | 'revealing'>('closed');

    // Simulate picking random cards
    const openPack = () => {
        if (!allCards) return;
        setStage('opening');

        // Simulate API delay / Opening animation time
        setTimeout(() => {
            // Pick 5 random cards
            const shuffled = [...allCards].sort(() => 0.5 - Math.random());
            setRevealedCards(shuffled.slice(0, 5));
            setStage('revealing');
        }, 2000);
    };

    // If we arrive here, auto-trigger opening if intended,
    // or show a "Tap to Open" UI. Let's do Tap to Open for drama.

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navigation />

            <main className="flex-1 flex flex-col items-center justify-center relative pt-20 px-4">

                {/* Back Button */}
                <button
                    onClick={() => setLocation("/")}
                    className="absolute top-24 left-8 text-muted-foreground hover:text-white flex items-center space-x-2 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Store</span>
                </button>

                <AnimatePresence mode="wait">

                    {/* Stage 1: Closed Pack */}
                    {stage === 'closed' && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.5, opacity: 0 }}
                            className="text-center"
                        >
                            <div className="relative w-64 h-80 bg-gradient-to-br from-primary to-purple-900 rounded-xl shadow-2xl shadow-primary/20 flex items-center justify-center cursor-pointer group hover:scale-105 transition-transform duration-300 border-4 border-white/10" onClick={openPack}>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30" />
                            <PackageOpen className="w-24 h-24 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-8 text-white font-display font-bold text-xl tracking-widest uppercase">
                                Open Pack
                            </div>
                        </div>
                        <p className="mt-8 text-muted-foreground">Tap the pack to reveal your cards</p>
                        </motion.div>
                        )}

                    {/* Stage 2: Opening Animation */}
                    {stage === 'opening' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm"
                        >
                            <div className="text-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-primary blur-3xl opacity-20 animate-pulse" />
                                    <Loader2 className="w-16 h-16 text-primary animate-spin relative z-10" />
                                </div>
                                <h2 className="mt-8 text-2xl font-display font-bold text-white animate-pulse">
                                    Decrypting Artifacts...
                                </h2>
                            </div>
                        </motion.div>
                    )}

                    {/* Stage 3: Revealing Cards */}
                    {stage === 'revealing' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full max-w-5xl"
                        >
                            <h2 className="text-3xl font-display font-bold text-center mb-12 text-white">
                                New Cards Acquired!
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                                {revealedCards.map((card, idx) => (
                                    <CardReveal key={`${card.id}-${idx}`} card={card} index={idx} />
                                ))}
                            </div>

                            <div className="mt-12 text-center">
                                <Button
                                    onClick={() => setLocation("/")}
                                    size="lg"
                                    className="bg-white text-black hover:bg-white/90 font-bold rounded-full px-8"
                                >
                                    Return to Store
                                </Button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </main>
        </div>
    );
}