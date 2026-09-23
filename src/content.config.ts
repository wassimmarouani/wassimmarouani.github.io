import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = z.object({ en: z.string(), fr: z.string(), ar: z.string() });
const localizedList = z.object({
  en: z.array(z.string()),
  fr: z.array(z.string()),
  ar: z.array(z.string()),
});
/** Technology names stay in Latin script, so they may be a plain string. */
const maybeLocalized = z.union([z.string(), localized]);

export const tracks = ['fullstack', 'bi-data', 'ecommerce'] as const;
export const contexts = ['professional', 'client', 'academic', 'personal'] as const;

const diagramNode = z.object({
  id: z.string(),
  label: maybeLocalized,
  detail: maybeLocalized.optional(),
});

/**
 * An architecture flow read in the page's reading direction: columns are
 * steps, nodes in one column run in parallel. Without explicit `edges`, every
 * node is connected to every node of the next column.
 */
const diagram = z.object({
  columns: z.array(z.array(diagramNode).min(1)).min(2),
  edges: z.array(z.tuple([z.string(), z.string()])).optional(),
  /** Optional label on the connection between column i and i + 1. */
  gapLabels: z.array(z.string().nullable()).optional(),
  caption: localized,
});

const caseStudy = z.object({
  role: localized,
  problem: localized,
  built: localizedList,
  highlights: localizedList.optional(),
  limitations: localizedList.optional(),
  diagram,
});

const projects = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/projects' }),
  schema: z.object({
    /** "no" until the French and Arabic text has been reviewed. */
    _reviewed: z.enum(['no', 'yes']),
    order: z.number().int(),
    featured: z.boolean().default(false),
    context: z.enum(contexts),
    tracks: z.array(z.enum(tracks)).min(1),
    title: localized,
    summary: localized,
    stack: z.array(z.string()).min(1),
    links: z
      .object({
        github: z.url().optional(),
        live: z.url().optional(),
      })
      .default({}),
    /** Shown instead of a code link when the source cannot be public. */
    privateCode: z.boolean().default(false),
    caseStudy: caseStudy.optional(),
  }),
});

export const collections = { projects };
