import { getImage } from 'astro:assets';
import heroPhoto from '@/assets/profile.jpg';
import type { Preload } from '@/layouts/Base.astro';

export { heroPhoto };

export const heroPhotoWidths = [128, 256, 288, 400, 576];
export const heroPhotoSizes = '(min-width: 1024px) 288px, (min-width: 768px) 256px, (min-width: 640px) 160px, 128px';

/** Preload hint for the hero photo (AVIF, the format modern browsers pick). */
export async function heroPreload(): Promise<Preload> {
  const image = await getImage({ src: heroPhoto, format: 'avif', widths: heroPhotoWidths });
  return { srcset: image.srcSet.attribute, sizes: heroPhotoSizes, type: 'image/avif' };
}
