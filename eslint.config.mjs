import { FlatCompat } from "./node_modules/.pnpm/@eslint+eslintrc@3.3.1/node_modules/@eslint/eslintrc/dist/eslintrc.cjs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { globalIgnores } from "eslint/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "tailwind.config.js",
    "postcss.config.js",
    "postcss.config.mjs",
  ]),
];

export default eslintConfig;
