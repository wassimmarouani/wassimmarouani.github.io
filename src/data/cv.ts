import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { UIKey } from '@/i18n';

export interface CvFile {
  id: 'developer' | 'bi';
  label: UIKey;
  /** File name inside public/cv/. */
  file: string;
}

const all: CvFile[] = [
  { id: 'developer', label: 'cv.developer', file: 'Wassim_Marouani_CV.pdf' },
  { id: 'bi', label: 'cv.bi', file: 'CV2026_english.pdf' },
];

/**
 * Only CVs that are actually present in public/cv/ are offered, so the site
 * never links to a missing file. Evaluated at build time (from the project root).
 */
export const cvs: (CvFile & { href: string })[] = all
  .filter((cv) => existsSync(join(process.cwd(), 'public', 'cv', cv.file)))
  .map((cv) => ({ ...cv, href: `/cv/${cv.file}` }));
