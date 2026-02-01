import { useQuery } from "@tanstack/react-query";
import { api } from "../../shared/routes";

export function useCards() {
    return useQuery({
        queryKey: [api.cards.list.path],
        queryFn: async () => {
            const res = await fetch(api.cards.list.path);
            if (!res.ok) throw new Error("Failed to fetch cards");
            return api.cards.list.responses[200].parse(await res.json());
        },
    });
}

export function useCard(id: number) {
    return useQuery({
        queryKey: [api.cards.get.path, id],
        queryFn: async () => {
            const res = await fetch(api.cards.get.path.replace(":id", id.toString()));
            if (res.status === 404) return null;
            if (!res.ok) throw new Error("Failed to fetch card");
            return api.cards.get.responses[200].parse(await res.json());
        },
        enabled: !!id,
    });
}