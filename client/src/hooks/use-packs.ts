import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/routes";

export function usePacks() {
    return useQuery({
        queryKey: [api.packs.list.path],
        queryFn: async () => {
            const res = await fetch(api.packs.list.path);
            if (!res.ok) throw new Error("Failed to fetch packs");
            return api.packs.list.responses[200].parse(await res.json());
        },
    });
}

export function usePack(id: number) {
    return useQuery({
        queryKey: [api.packs.get.path, id],
        queryFn: async () => {
            // Note: buildUrl handles param substitution if needed, but simple fetch works for generated query keys in react-query if handled manually
            const res = await fetch(api.packs.get.path.replace(":id", id.toString()));
            if (res.status === 404) return null;
            if (!res.ok) throw new Error("Failed to fetch pack");
            return api.packs.get.responses[200].parse(await res.json());
        },
        enabled: !!id,
    });
}