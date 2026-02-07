import { Navigation } from "../components/Navigation";
import { useCards } from "../hooks/use-cards";
import { Loader2, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "../components/ui/input";

export default function Collection() {
    // In a real app, fetch user-owned cards. Here we fetch all templates as a demo.
    const { data: cards, isLoading } = useCards();
    const [search, setSearch] = useState("");

    const filteredCards = cards?.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.rarity.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background pb-20">
            <Navigation />

            <main className="pt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-4xl font-display font-bold text-white mb-2">My Collection</h1>
                        <p className="text-muted-foreground">Manage your deck and view your artifacts.</p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name or rarity..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 bg-secondary border-border focus:ring-primary/50"
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {filteredCards?.map((card) => (
                            <div key={card.id} className="relative group">
                                {/* Simplified static display for collection view */}
                                <div className="aspect-[2/3] rounded-xl overflow-hidden bg-secondary border border-border group-hover:border-primary/50 transition-colors relative">
                                    <img
                                        src={card.imageUrl}
                                        alt={card.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                        <p className="text-white font-bold">{card.name}</p>
                                        <p className="text-xs text-primary uppercase font-bold">{card.rarity}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {filteredCards?.length === 0 && (
                            <div className="col-span-full text-center py-20 text-muted-foreground">
                                No cards found matching your search.
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}