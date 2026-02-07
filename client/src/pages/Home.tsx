import { usePacks } from "../hooks/use-packs";
import { PackCard } from "../components/PackCard";
import { Navigation } from "../components/Navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Home() {
    const { data: packs, isLoading, error } = usePacks();

    return (
        <div className="min-h-screen bg-background pb-20">
            <Navigation />

            <main className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Section */}
                <section className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-display font-extrabold mb-6 tracking-tight"
                    >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">
              Collect. Battle.
            </span>
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent text-glow">
              Conquer.
            </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground max-w-2xl mx-auto"
                    >
                        Acquire rare artifacts from the depths of the void. Build your ultimate deck and dominate the arena.
                    </motion.p>
                </section>

                {/* Storefront */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-display font-bold text-white">Available Packs</h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent ml-8 opacity-50" />
                    </div>

                    {isLoading ? (
                        <div className="h-64 flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        </div>
                    ) : error ? (
                        <div className="text-center text-destructive py-10">
                            Failed to load packs. Please try again later.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {packs?.map((pack) => (
                                <PackCard key={pack.id} pack={pack} />
                            ))}
                        </div>
                    )}
                </section>

            </main>
        </div>
    );
}