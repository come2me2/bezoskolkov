import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standalone = join(root, ".next/standalone");

if (!existsSync(standalone)) {
  console.warn("prepare-standalone: .next/standalone not found, skip");
  process.exit(0);
}

const staticSrc = join(root, ".next/static");
const staticDest = join(standalone, ".next/static");
const publicSrc = join(root, "public");
const publicDest = join(standalone, "public");

mkdirSync(join(standalone, ".next"), { recursive: true });

if (existsSync(staticSrc)) {
  cpSync(staticSrc, staticDest, { recursive: true });
  console.log("Copied .next/static → .next/standalone/.next/static");
}

if (existsSync(publicSrc)) {
  cpSync(publicSrc, publicDest, { recursive: true });
  console.log("Copied public → .next/standalone/public");
}
