import { Navigation } from "../components/Navigation";
import { Swords } from "lucide-react";

export default function Arena() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="py-20 flex flex-col items-center justify-center">
                    <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-8 border border-border animate-pulse">
                        <Swords className="w-12 h-12 text-muted-foreground" />
                    </div>

                    <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
                        The Arena is Closed
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-lg mx-auto mb-8">
                        Phase 2 construction in progress. Prepare your decks, for the battles ahead will be legendary.
                    </p>

                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono text-sm">
                        <span>COMING SOON</span>
                    </div>
                </div>
            </main>
        </div>
    );
}