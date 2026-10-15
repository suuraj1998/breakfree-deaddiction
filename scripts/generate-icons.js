import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createPngBuffer(width, height, drawFn) {
  // 1. PNG Header
  const header = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // 2. IHDR Chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // 8-bit depth
  ihdrData.writeUInt8(6, 9); // RGBA
  ihdrData.writeUInt8(0, 10);
  ihdrData.writeUInt8(0, 11);
  ihdrData.writeUInt8(0, 12);

  const ihdrChunk = createChunk('IHDR', ihdrData);

  // 3. Scanlines
  const rowSize = 1 + width * 4;
  const rawScanlines = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawScanlines[rowOffset] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = drawFn(x, y, width, height);
      const pixelOffset = rowOffset + 1 + x * 4;
      rawScanlines[pixelOffset] = r;
      rawScanlines[pixelOffset + 1] = g;
      rawScanlines[pixelOffset + 2] = b;
      rawScanlines[pixelOffset + 3] = a;
    }
  }

  // Deflate
  const compressed = zlib.deflateSync(rawScanlines, { level: 9 });
  const idatChunk = createChunk('IDAT', compressed);

  // 4. IEND Chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const len = data.length;
  const chunk = Buffer.alloc(4 + 4 + len + 4);
  chunk.writeUInt32BE(len, 0);
  typeBuf.copy(chunk, 4);
  data.copy(chunk, 8);

  const toCrc = Buffer.concat([typeBuf, data]);
  const crc = zlib.crc32(toCrc);
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

// Icon generator logic: dark slate background, emerald shield with gold spark
function drawIcon(x, y, w, h, isMaskable = false) {
  const nx = x / w; // 0..1
  const ny = y / h; // 0..1
  const cx = 0.5;
  const cy = 0.5;
  const dx = nx - cx;
  const dy = ny - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Background: Deep Slate Gradient
  let r = Math.round(2 + (15 - 2) * (1 - dist * 1.4));
  let g = Math.round(6 + (23 - 6) * (1 - dist * 1.4));
  let b = Math.round(23 + (42 - 23) * (1 - dist * 1.4));
  let a = 255;
  r = Math.max(2, Math.min(25, r));
  g = Math.max(6, Math.min(35, g));
  b = Math.max(23, Math.min(50, b));

  // Scale bounds for maskable safe margin
  const scale = isMaskable ? 0.72 : 0.88;
  const px = (nx - 0.5) / scale + 0.5;
  const py = (ny - 0.5) / scale + 0.5;

  // Shield formula:
  // x within [0.22, 0.78], y within [0.18, 0.82]
  if (px >= 0.22 && px <= 0.78 && py >= 0.18 && py <= 0.82) {
    const shieldTop = 0.18 + Math.abs(px - 0.5) * 0.12;
    // Lower curve
    const relX = Math.abs(px - 0.5) / 0.28; // 0 at center, 1 at edge
    const shieldBottom = 0.82 - Math.pow(1 - relX, 1.8) * 0.28;

    if (py >= shieldTop && py <= shieldBottom) {
      // Shield edge highlight or inner body
      const edgeDist = Math.min(
        Math.abs(py - shieldTop),
        Math.abs(py - shieldBottom),
        Math.abs(px - 0.22),
        Math.abs(px - 0.78)
      );

      if (edgeDist < 0.02) {
        // Glowing emerald edge
        r = 52; g = 211; b = 153; // Emerald 400
      } else {
        // Inner gradient: emerald to teal
        const factor = (py - 0.18) / 0.6;
        r = Math.round(16 + factor * 5);
        g = Math.round(185 - factor * 70);
        b = Math.round(129 + factor * 50);

        // Flame / Wing liberation emblem in center
        const fcx = px - 0.5;
        const fcy = py - 0.48;
        const flameDist = Math.sqrt(fcx * fcx * 2.5 + fcy * fcy * 1.2);
        if (flameDist < 0.14) {
          // Gold / Amber flame
          r = 251; g = 191; b = 36;
        } else if (flameDist < 0.17) {
          // Orange fringe
          r = 245; g = 158; b = 11;
        }
      }
    }
  }

  // Outer border squircle for non-maskable icons
  if (!isMaskable) {
    const rx = Math.abs(nx - 0.5);
    const ry = Math.abs(ny - 0.5);
    if (rx > 0.46 || ry > 0.46) {
      if (rx < 0.49 && ry < 0.49) {
        // subtle border line
        r = 16; g = 185; b = 129; a = 120;
      }
    }
  }

  return [r, g, b, a];
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 192x192
console.log('Generating pwa-192x192.png...');
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPngBuffer(192, 192, (x, y, w, h) => drawIcon(x, y, w, h, false)));

// 512x512
console.log('Generating pwa-512x512.png...');
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPngBuffer(512, 512, (x, y, w, h) => drawIcon(x, y, w, h, false)));

// 512x512 maskable (with safe zone margin)
console.log('Generating pwa-maskable-512x512.png...');
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPngBuffer(512, 512, (x, y, w, h) => drawIcon(x, y, w, h, true)));

// 180x180 apple touch icon
console.log('Generating apple-touch-icon.png...');
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPngBuffer(180, 180, (x, y, w, h) => drawIcon(x, y, w, h, false)));

// favicon.ico (can be a 64x64 PNG buffer named favicon.ico or favicon.png)
console.log('Generating favicon.png & favicon.ico...');
const fav64 = createPngBuffer(64, 64, (x, y, w, h) => drawIcon(x, y, w, h, false));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), fav64);
fs.writeFileSync(path.join(publicDir, 'favicon.png'), fav64);

console.log('All PWA and App Store icons successfully generated in /public!');
