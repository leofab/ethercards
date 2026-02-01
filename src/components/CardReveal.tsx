import type {CardTemplate} from "../../shared/schema";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../lib/utils";
import { Shield, Swords } from "lucide-react";

interface CardRevealProps {
    card: CardTemplate;
    index: number;
}

export function CardReveal({ card, index }: CardRevealProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const rarityColors = {
        common: "border-slate-500 shadow-slate-500/20 text-slate-400",
        rare: "border-blue-500 shadow-blue-500/30 text-blue-400",
        epic: "border-purple-500 shadow-purple-500/40 text-purple-400",
        legendary: "border-amber-500 shadow-amber-500/50 text-amber-400 card-glow-legendary",
    };

    const rarityBg = {
        common: "bg-slate-900/90",
        rare: "bg-blue-950/90",
        epic: "bg-purple-950/90",
        legendary: "bg-amber-950/90",
    };

    // Convert generic jsonb stats to specific shape safely
    const stats = card.stats as { attack: number; defense: number };

    return (
        <div className="perspective-1000 w-full aspect-[2/3]">
            <motion.div
                initial={{ y: 50, opacity: 0, rotateY: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className={cn(
                    "w-full h-full relative transform-style-3d transition-transform duration-700 cursor-pointer",
                    isFlipped ? "rotate-y-180" : ""
                )}
                onClick={() => setIsFlipped(true)}
            >
                {/* Card Back */}
                <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden border-2 border-primary/30 bg-secondary shadow-xl">
                    <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-secondary flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                            <div className="w-8 h-8 rounded-full bg-primary" />
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none" />
                </div>

                {/* Card Front */}
                <div className={cn(
                    "absolute inset-0 backface-hidden rotate-y-180 rounded-xl overflow-hidden border-2 flex flex-col shadow-2xl",
                    rarityColors[card.rarity as keyof typeof rarityColors] || rarityColors.common,
                    rarityBg[card.rarity as keyof typeof rarityBg] || rarityBg.common
                )}>
                    {/* Card Image */}
                    <div className="h-[55%] relative overflow-hidden bg-black/50">
                        <img
                            src={card.imageUrl}
                            alt={card.name}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/60 border border-white/10 backdrop-blur-sm">
                            {card.rarity}
                        </div>
                    </div>

                    {/* Card Content */}
                    <div className="flex-1 p-4 flex flex-col">
                        <h4 className="font-display font-bold text-lg text-white mb-1">{card.name}</h4>
                        <p className="text-xs text-white/60 line-clamp-3 mb-4 flex-grow">
                            {card.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-2 border-t border-white/10">
                            <div className="flex items-center space-x-1.5 text-red-400">
                                <Swords className="w-4 h-4" />
                                <span className="font-bold font-mono">{stats.attack || 0}</span>
                            </div>
                            <div className="flex items-center space-x-1.5 text-blue-400">
                                <Shield className="w-4 h-4" />
                                <span className="font-bold font-mono">{stats.defense || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}