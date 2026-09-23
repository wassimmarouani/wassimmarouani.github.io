import { existsSync } from 'node:fs';
import { join } from 'node:path';

/** File name inside public/cv/. */
const CV_FILE = 'Wassim_Marouani_CV.pdf';

/**
 * Public URL of the CV, or undefined when the PDF is missing from public/cv/,
 * so the site never links to a file that doesn't exist. Evaluated at build time
 * (from the project root).
 */
export const cvHref: string | undefined = existsSync(join(process.cwd(), 'public', 'cv', CV_FILE))
  ? `/cv/${CV_FILE}`
  : undefined;
