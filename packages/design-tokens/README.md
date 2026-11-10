[![CI](https://github.com/Som-Energia/somenergia-design/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/Som-Energia/somenergia-design/actions/workflows/ci.yaml)
[![npm version](https://img.shields.io/npm/v/%40somenergia%2Fdesign-tokens)](https://www.npmjs.com/package/@somenergia/design-tokens)

# @somenergia/design-tokens

Som Energia design tokens: colors, typography, radii and spacing. They are the single source of truth for Som Energia styles and
are framework agnostic: any project can use them as CSS custom properties or
as a JavaScript object.

`@somenergia/somenergia-ui` (repository
[somenergia-mui](https://github.com/Som-Energia/somenergia-mui)) builds its MUI
theme from them.

It has no runtime dependencies, so projects without React or MUI can use it.

## Install

```bash
npm install --save @somenergia/design-tokens
```

## From CSS

```js
import "@somenergia/design-tokens/tokens.css"
```

```css
.card {
  color: var(--som-color-text);
  background: var(--som-color-surface);
  border-radius: var(--som-radius-lg);
  padding: var(--som-space-4);
  font-family: var(--som-font-family);
}
```

Dark colors apply with `<html data-theme="dark">`, or following the system
preference unless `data-theme="light"` is set. `GlobalTheming` from
`@somenergia/somenergia-ui` keeps `data-theme` in sync with its color mode.

## Font

`--som-font-family` starts with Outfit, but this package does not ship the
font files. Load them from `@somenergia/brand`:

```js
import "@somenergia/brand/fonts.css"
```

## From JavaScript

```js
import tokens from "@somenergia/design-tokens"

tokens.color.light.primary
tokens.color.dark.text
tokens.radius.xl
```

## Development

Requires Node 24 and npm 11.

```bash
npm install
npm test          # watch mode; npm run test:ci runs once
npm run build     # writes dist/tokens.css
npm run lint
npm run format
```

### Changing tokens

Edit `src/index.js` and run `npm run build`. Never edit `dist/`: it is generated
and not committed.

Renaming or removing a token, or changing its value visibly, is a breaking
change for every Som Energia project: bump the major version.

## Publishing

The package is published to npm by the `publish.yaml` workflow using npm
trusted publishing, so no npm token is needed.

1. Bump `version` in `package.json` and add the changes to `CHANGES.md`.
2. Commit, tag with the same version prefixed with `design-tokens-v` and
   push the tag:

   ```bash
   git tag design-tokens-vM.m.p
   git push origin main design-tokens-vM.m.p
   ```

The workflow fails if the tag and `package.json` version don't match.
`@somenergia/brand` uses its own `brand-vM.m.p` tags, so the two packages
are released independently.

To check what will be published before tagging:

```bash
npm pack --dry-run
```
