/**
 * Post-processing script run after orval codegen.
 *
 * orval (zod mode + schemas option) generates a barrel index that re-exports
 * from both "./generated/api" (zod schemas) and "./generated/types"
 * (TypeScript interfaces). When a request-body schema shares its name with an
 * operation-derived zod schema, TypeScript raises TS2308 "already exported".
 *
 * Fix: keep only the "./generated/api" re-export in the barrel so consumers
 * use the zod schemas directly; TypeScript types can be derived via z.infer<>.
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = resolve(__dirname, "../api-zod/src/index.ts");

const content = readFileSync(indexPath, "utf8");

const fixed = content
  .split("\n")
  .filter(
    (line) =>
      !line.includes('./generated/types"') &&
      !line.includes('./generated/api.schemas"'),
  )
  .join("\n");

writeFileSync(indexPath, fixed, "utf8");
console.log("✅ Fixed lib/api-zod/src/index.ts");
