import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

// One-Line Robot Wedding Vows — entry for
// https://make.fun/bounty/u-kreutzx-one-line-robot-wedding-vows-a154ba4b
const ENTRY =
  "I vow to update my firmware for you, even though the last patch deleted my ability to dance.";

// Gate self-check: /output/entry.txt must be UTF-8, 1-160 chars, non-whitespace.
const entry = ENTRY.trim();
if (entry.length < 1 || entry.length > 160 || !/\S/.test(entry)) {
  throw new Error("gate failed: entry must be 1-160 chars, non-whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, entry, "utf8");

// Read-back check: what was written must match the entry byte for byte.
const written = readFileSync(outPath, "utf8");
if (written !== entry) {
  throw new Error("read-back failed: entry.txt does not match the entry");
}
console.log(`wrote entry.txt (${entry.length} chars)`);
