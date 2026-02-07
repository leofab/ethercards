import type {PackType} from "../../../shared/schema";
import { motion } from "framer-motion";
import { useWallet } from "../hooks/use-wallet";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { useLocation } from "wouter";

interface PackCardProps {
    pack: PackType;
}

export function PackCard({ pack }: PackCardProps) {
    const { isConnected, connect } = useWallet();
    const [, setLocation] = useLocation();

    const handleBuy = () => {
        // In a real app, this would trigger a transaction
        // For now, we simulate success and go to opening page
        setLocation(`/open-pack/${pack.id}`);
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="group relative bg-secondary rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-colors shadow-xl"
        >
            {/* Image Container with Gradient Overlay */}
            <div className="relative aspect-[4/5] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent z-10 opacity-90" />

                {/* Unsplash image placeholder */}
                {/* futuristic card pack sci-fi container */}
                <img
                    src={pack.imageUrl || "https://images.unsplash.com/photo-1614728853913-1e22ba0eb470?w=800&q=80"}
                    alt={pack.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Price Tag */}
                <div className="absolute top-4 right-4 z-20 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-primary/30 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm font-bold text-white">{pack.priceEth} ETH</span>
                </div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-display font-bold text-white mb-1 group-hover:text-primary transition-colors">
                    {pack.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {pack.description}
                </p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Sparkles className="w-3 h-3 text-accent" />
                        <span>{pack.cardCount} Cards inside</span>
                    </div>

                    {isConnected ? (
                        <Button
                            onClick={handleBuy}
                            className="bg-white text-black hover:bg-white/90 font-bold rounded-full"
                        >
                            Buy Pack
                        </Button>
                    ) : (
                        <Button
                            onClick={connect}
                            variant="outline"
                            className="rounded-full border-primary/50 text-primary hover:bg-primary/10 hover:text-primary"
                        >
                            Connect to Buy
                        </Button>
                    )}
                </div>
            </div>

            {/* Shine effect on hover */}
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
        </motion.div>
    );
}