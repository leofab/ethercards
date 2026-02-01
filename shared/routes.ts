import { z } from 'zod';
import { packTypes, cardTemplates, insertPackTypeSchema, insertCardTemplateSchema } from './schema';

export const errorSchemas = {
    notFound: z.object({ message: z.string() }),
    validation: z.object({ message: z.string(), field: z.string().optional() }),
    internal: z.object({ message: z.string() }),
};

export const api = {
    packs: {
        list: {
            method: 'GET' as const,
            path: '/api/packs',
            responses: {
                200: z.array(z.custom<typeof packTypes.$inferSelect>()),
            },
        },
        get: {
            method: 'GET' as const,
            path: '/api/packs/:id',
            responses: {
                200: z.custom<typeof packTypes.$inferSelect>(),
                404: errorSchemas.notFound,
            },
        },
    },
    cards: {
        list: {
            method: 'GET' as const,
            path: '/api/cards',
            responses: {
                200: z.array(z.custom<typeof cardTemplates.$inferSelect>()),
            },
        },
        get: {
            method: 'GET' as const,
            path: '/api/cards/:id',
            responses: {
                200: z.custom<typeof cardTemplates.$inferSelect>(),
                404: errorSchemas.notFound,
            },
        },
    },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
    let url = path;
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (url.includes(`:${key}`)) {
                url = url.replace(`:${key}`, String(value));
            }
        });
    }
    return url;
}