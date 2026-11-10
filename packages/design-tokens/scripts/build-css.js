// Generates CSS custom properties from the design tokens.

import { mkdirSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import tokensToCss from "../src/css.js"
import tokens from "../src/index.js"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const dist = resolve(root, "dist")

mkdirSync(dist, { recursive: true })
writeFileSync(resolve(dist, "tokens.css"), tokensToCss(tokens))

console.log(`Generated tokens.css in ${dist}`)
