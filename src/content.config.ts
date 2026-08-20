import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const historyCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/history" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    author: z.string().optional(),
  }),
});

const resourcesCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/resources" }),
  schema: z.object({
    title: z.string(),
    link: z.string().url(),
    category: z.string(),
    description: z.string().optional(),
  }),
});

const thesisCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/thesis" }),
  schema: z.object({
    title: z.string(),
    chapterNumber: z.number(),
    description: z.string().optional(),
  }),
});

const memorialCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/memorial" }),
  schema: z.object({
    name: z.string(),
    yearOfBirth: z.number().optional(),
    yearOfDeath: z.number().optional(),
    origin: z.string().optional(),
    location: z.string().optional(),
    island: z.enum(["St. Croix", "St. Thomas", "St. John"]).optional(),
    plantation: z.string().optional(),
    biography: z.string().optional(),
    notes: z.string().optional(),
    tags: z.array(z.string()).optional(),
    mapLat: z.number().optional(),
    mapLng: z.number().optional(),
  }),
});

export const collections = {
  'history': historyCollection,
  'resources': resourcesCollection,
  'thesis': thesisCollection,
  'memorial': memorialCollection,
};
