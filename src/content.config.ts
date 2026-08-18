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

export const collections = {
  'history': historyCollection,
  'resources': resourcesCollection,
  'thesis': thesisCollection,
};
