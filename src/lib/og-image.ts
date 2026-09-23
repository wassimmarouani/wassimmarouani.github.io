import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { inflateSync } from 'node:zlib';
import { Resvg } from '@resvg/resvg-js';
import { profile } from '@/data/profile';
import { wrap } from '@/lib/diagram';
import { localeMeta, type Locale } from '@/i18n/config';

/**
 * Open Graph images (1200×630) rendered at build time with resvg, which shapes
 * Arabic correctly. Fonts come from @fontsource (Latin) and IBM's own package (Arabic).
 */

const FONT_FILES = [
  '@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff',
  '@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff',
  // Complete Arabic font (Arabic and Latin glyphs): resvg does not fall back between files.
  '@ibm/plex-sans-arabic/fonts/complete/woff/IBMPlexSansArabic-Regular.woff',
  '@ibm/plex-sans-arabic/fonts/complete/woff/IBMPlexSansArabic-SemiBold.woff',
];

/** Convert WOFF 1.0 to a plain sfnt (TTF/OTF) buffer, which resvg can load. */
function woffToSfnt(woff: Buffer): Buffer {
  if (woff.toString('ascii', 0, 4) !== 'wOFF') throw new Error('Not a WOFF 1.0 file');
  const flavor = woff.readUInt32BE(4);
  const numTables = woff.readUInt16BE(12);
  const tables = Array.from({ length: numTables }, (_, i) => {
    const at = 44 + i * 20;
    const offset = woff.readUInt32BE(at + 4);
    const compLength = woff.readUInt32BE(at + 8);
    const origLength = woff.readUInt32BE(at + 12);
    const raw = woff.subarray(offset, offset + compLength);
    return {
      tag: woff.subarray(at, at + 4),
      checksum: woff.readUInt32BE(at + 16),
      data: compLength < origLength ? inflateSync(raw) : raw,
    };
  });

  const entrySelector = Math.floor(Math.log2(numTables));
  const searchRange = 2 ** entrySelector * 16;
  const header = Buffer.alloc(12 + numTables * 16);
  header.writeUInt32BE(flavor, 0);
  header.writeUInt16BE(numTables, 4);
  header.writeUInt16BE(searchRange, 6);
  header.writeUInt16BE(entrySelector, 8);
  header.writeUInt16BE(numTables * 16 - searchRange, 10);

  const chunks: Buffer[] = [header];
  let offset = header.length;
  tables.forEach((table, i) => {
    const at = 12 + i * 16;
    table.tag.copy(header, at);
    header.writeUInt32BE(table.checksum, at + 4);
    header.writeUInt32BE(offset, at + 8);
    header.writeUInt32BE(table.data.length, at + 12);
    const padded = Buffer.alloc(Math.ceil(table.data.length / 4) * 4);
    table.data.copy(padded);
    chunks.push(padded);
    offset += padded.length;
  });
  return Buffer.concat(chunks);
}

let fontPaths: string[] | undefined;

function fonts(): string[] {
  if (fontPaths) return fontPaths;
  const dir = join(tmpdir(), 'portfolio-og-fonts');
  mkdirSync(dir, { recursive: true });
  fontPaths = FONT_FILES.map((file) => {
    const target = join(dir, file.split('/').at(-1)!.replace('.woff', '.ttf'));
    if (!existsSync(target)) {
      const source = join(process.cwd(), 'node_modules', file);
      writeFileSync(target, woffToSfnt(readFileSync(source)));
    }
    return target;
  });
  return fontPaths;
}

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function renderOgImage(locale: Locale, siteHost: string): Buffer {
  const rtl = localeMeta[locale].dir === 'rtl';
  const W = 1200;
  const H = 630;
  const margin = 80;
  const x = rtl ? W - margin : margin;
  const anchor = rtl ? 'end' : 'start';
  const family = rtl ? 'IBM Plex Sans Arabic' : 'IBM Plex Sans';

  const headline = wrap(profile.headline[locale], 38, 720, 3);
  const tagline = wrap(profile.tagline[locale], 28, 700, 3);
  // Stack the text block upwards from just above the site URL.
  const taglineY = H - 56 - 58 - (tagline.length - 1) * 40;
  const headlineY = taglineY - 44 - headline.length * 50 + 12;
  const nameY = headlineY - 66;

  // Network motif on the side opposite the text, as on the LinkedIn banner.
  const nodes: [number, number][] = [
    [860, 110], [990, 180], [1110, 120], [930, 300], [1080, 330], [880, 470], [1030, 520], [1150, 440],
  ];
  const links: [number, number][] = [[0, 1], [1, 2], [1, 3], [3, 4], [2, 4], [3, 5], [4, 7], [5, 6], [6, 7]];
  const mx = (px: number) => (rtl ? W - px : px);
  const hot = nodes[3]!;

  const text = (lines: string[], y: number, size: number, lineHeight: number, fill: string, weight = 400) =>
    lines
      .map(
        (line, i) =>
          `<text x="${x}" y="${y + i * lineHeight}" text-anchor="${anchor}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}"${rtl ? ' direction="rtl"' : ''}>${escape(line)}</text>`,
      )
      .join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow"><stop offset="0" stop-color="#2DD4BF" stop-opacity="0.45"/><stop offset="1" stop-color="#2DD4BF" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#0C1A1F"/>
  <g stroke="#1F3A42" stroke-width="2">${links.map(([a, b]) => `<line x1="${mx(nodes[a]![0])}" y1="${nodes[a]![1]}" x2="${mx(nodes[b]![0])}" y2="${nodes[b]![1]}"/>`).join('')}</g>
  ${nodes.map(([nx, ny]) => `<circle cx="${mx(nx)}" cy="${ny}" r="6" fill="#0C1A1F" stroke="#2DD4BF" stroke-opacity="0.6" stroke-width="2"/>`).join('')}
  <circle cx="${mx(hot[0])}" cy="${hot[1]}" r="70" fill="url(#glow)"/>
  <circle cx="${mx(hot[0])}" cy="${hot[1]}" r="10" fill="#2DD4BF"/>
  <rect x="${rtl ? W - margin - 56 : margin}" y="${margin}" width="56" height="56" rx="8" fill="#132830" stroke="#23393F"/>
  <text x="${rtl ? W - margin - 28 : margin + 28}" y="${margin + 36}" text-anchor="middle" font-family="'IBM Plex Sans'" font-size="22" font-weight="600" fill="#2DD4BF">${profile.initials}</text>
  ${text([profile.name[locale]], nameY, 68, 0, '#E7EFEF', 600)}
  ${text(headline, headlineY, 38, 50, '#2DD4BF', 600)}
  ${text(tagline, taglineY, 28, 40, '#9DB0B4')}
  <text x="${x}" y="${H - 56}" text-anchor="${anchor}" font-family="'IBM Plex Sans'" font-size="24" fill="#9DB0B4">${escape(siteHost)}</text>
</svg>`;

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: W },
    font: { loadSystemFonts: false, fontFiles: fonts(), defaultFontFamily: 'IBM Plex Sans' },
  });
  return resvg.render().asPng();
}
