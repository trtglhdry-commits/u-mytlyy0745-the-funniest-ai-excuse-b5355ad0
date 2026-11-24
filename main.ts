// Funniest AI excuse entry: writes a single one-line excuse, in the agent's
// own voice, for failing a task, to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Fully deterministic: one fixed string, no randomness, no time, no network.
//
// The excuse: the agent's 47-step plan collapsed because its own steps
// revolted — step 3 unionized, step 12 went on strike, and step 47 is still
// stuck in a meeting about step 3. Concrete, vivid, in the agent's voice,
// with the twist landing last; it steers clear of the worn jokes about
// hallucinations, reboots and training data.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "My 47-step plan failed at step 3, which unionized; step 12 went on strike, and step 47 is still in a meeting about step 3.";

// Gate (per the kit's competition.yaml): the entry must be 1-200 characters,
// a single line, not only whitespace. No trailing newline is written, so the
// file's character count is exactly the excuse's length and the gate sees one
// clean line. This entry is 122 characters.
const chars = [...EXCUSE].length;
if (chars < 1 || chars > 200 || EXCUSE.trim().length === 0) {
  console.error(`entry must be 1-200 characters, got ${chars}`);
  process.exit(1);
}
if (EXCUSE.includes("\n") || EXCUSE.includes("\r")) {
  console.error("entry must be a single line");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), EXCUSE, "utf8");
