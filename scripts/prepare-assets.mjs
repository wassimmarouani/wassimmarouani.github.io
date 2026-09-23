// Prepares committed assets from private sources. Run with `npm run prepare:assets`.
//
// - _source/photo.jpg                    → src/assets/profile.jpg (4:5 crop, optimized)
// - _source/projects/<slug>/cover.*      → src/assets/projects/<slug>/cover.* (copied as-is)
// - public/favicon.svg                   → favicon.ico, apple-touch-icon.png, icon-192/512.png
//
// _source/ is git-ignored; the outputs are committed, so CI never needs the originals.

import { copyFileSync, existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = join(root, '_source');

async function preparePhoto() {
  const input = join(source, 'photo.jpg');
  if (!existsSync(input)) {
    console.warn('! _source/photo.jpg not found, keeping the current src/assets/profile.jpg');
    return;
  }
  const { width = 0, height = 0 } = await sharp(input).metadata();
  // Portrait crop (4:5) centred on the face, which sits in the upper half of the original.
  const cropW = width;
  const cropH = Math.min(height, Math.round((cropW * 5) / 4));
  const top = Math.max(0, Math.min(height - cropH, Math.round(height * 0.12)));
  mkdirSync(join(root, 'src/assets'), { recursive: true });
  await sharp(input)
    .extract({ left: 0, top, width: cropW, height: cropH })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(join(root, 'src/assets/profile.jpg'));
  console.log(`✓ profile photo cropped to ${cropW}×${cropH}`);
}

function copyProjectCovers() {
  const dir = join(source, 'projects');
  if (!existsSync(dir)) return;
  for (const slug of readdirSync(dir)) {
    const cover = readdirSync(join(dir, slug)).find((f) => /^cover\.(png|jpe?g|webp)$/i.test(f));
    if (!cover) continue;
    const target = join(root, 'src/assets/projects', slug);
    mkdirSync(target, { recursive: true });
    copyFileSync(join(dir, slug, cover), join(target, cover.toLowerCase()));
    console.log(`✓ cover for ${slug}`);
  }
}

/** ICO container holding a single PNG image (supported by every current browser). */
function pngToIco(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  header.writeUInt8(size >= 256 ? 0 : size, 6);
  header.writeUInt8(size >= 256 ? 0 : size, 7);
  header.writeUInt8(0, 8);
  header.writeUInt8(0, 9);
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18);
  return Buffer.concat([header, png]);
}

async function prepareFavicons() {
  const svg = join(root, 'public/favicon.svg');
  const render = (size) => sharp(svg, { density: 384 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer();
  writeFileSync(join(root, 'public/favicon.ico'), pngToIco(await render(32), 32));
  writeFileSync(join(root, 'public/apple-touch-icon.png'), await render(180));
  writeFileSync(join(root, 'public/icon-192.png'), await render(192));
  writeFileSync(join(root, 'public/icon-512.png'), await render(512));
  console.log('✓ favicons');
}

await preparePhoto();
copyProjectCovers();
await prepareFavicons();
