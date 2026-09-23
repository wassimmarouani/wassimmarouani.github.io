import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

export type Project = CollectionEntry<'projects'>;
export type Track = Project['data']['tracks'][number];

export async function getProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export async function getCaseStudies(): Promise<(Project & { data: { caseStudy: NonNullable<Project['data']['caseStudy']> } })[]> {
  const projects = await getProjects();
  return projects.filter(
    (p): p is Project & { data: { caseStudy: NonNullable<Project['data']['caseStudy']> } } =>
      p.data.featured && p.data.caseStudy !== undefined,
  );
}

/**
 * Screenshots live in src/assets/projects/<slug>/cover.(png|jpg|jpeg|webp).
 * Projects without one get a generated cover instead of a broken image.
 */
const covers = import.meta.glob<{ default: ImageMetadata }>('/src/assets/projects/*/cover.{png,jpg,jpeg,webp}', {
  eager: true,
});

export function getCover(slug: string): ImageMetadata | undefined {
  const match = Object.entries(covers).find(([path]) => path.split('/').at(-2) === slug);
  return match?.[1].default;
}
