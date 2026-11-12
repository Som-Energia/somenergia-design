# AI consumer guide: @somenergia/design-tokens

## Scope

Use this guide when integrating this package into a consuming project. Follow
that project's development instructions and tooling. This is not a guide to
maintaining the design-tokens package itself.

## Design approach

Apply the Design Tokens methodology: reuse named design decisions as the shared
source of truth rather than duplicating raw colors, spacing, radii, and typography.
Prefer semantic tokens such as `text`, `surface`, and `border` for their intended
roles. Do not assume compliance with a particular Design Tokens specification.

Before changing styles, inspect the installed package README and token definitions
(`src/index.js`) or generated declarations to confirm available names. The installed
version is authoritative; do not invent tokens or assume every numeric spacing
step exists. Missing shared design decisions should be proposed upstream rather
than patched into the installed dependency.

## Public entry points

```sh
npm install @somenergia/design-tokens
```

Use the consuming project's package manager and dependency conventions.

- `@somenergia/design-tokens`: default JavaScript export, with TypeScript types.
- `@somenergia/design-tokens/tokens.css`: generated CSS custom properties.

Do not import internal `src/` or `dist/` paths. Inspecting those files to discover
available tokens is fine; they are not public import paths.

The package has no runtime dependencies and does not require React or MUI.
Do not add a framework just to use it.

## CSS integration

Import the stylesheet once at the application's global style entry point using
its existing tooling:

```js
import "@somenergia/design-tokens/tokens.css"
```

```css
.card {
  color: var(--som-color-text);
  background: var(--som-color-surface);
  padding: var(--som-space-4);
  border-radius: var(--som-radius-lg);
  font-family: var(--som-font-family);
}

h1 {
  font-size: var(--som-text-h1-font-size);
  font-weight: var(--som-text-h1-font-weight);
  line-height: var(--som-text-h1-line-height);
  letter-spacing: var(--som-text-h1-letter-spacing);
}
```

CSS names use the `--som-` prefix and kebab-case, for example `text.bodyM.fontSize`
becomes `--som-text-body-m-font-size`. Color properties omit the mode segment:
use `--som-color-text`, not `--som-color-light-text`.

Tokens provide values, not component styles or a CSS reset. Apply the relevant
properties explicitly; importing the stylesheet does not style the entire UI.

## Theme behavior

Set `data-theme` on the root `<html>` element:

- `data-theme="light"`: force light colors.
- `data-theme="dark"`: force dark colors.
- No attribute: follow `prefers-color-scheme`, with light as the default.

Integrate with the application's existing theme controller; do not introduce a
second competing controller. The stylesheet also sets `color-scheme`. Its theme
selectors target the document root, not arbitrary nested theme containers.

## JavaScript and TypeScript

```js
import tokens from "@somenergia/design-tokens"

const colors = tokens.color[mode] // mode must be "light" or "dark"
const cardStyles = {
  color: colors.text,
  backgroundColor: colors.surface,
  borderRadius: tokens.radius.lg,
  padding: tokens.space[4],
}
```

JavaScript values are literals, not reactive CSS variables. Select the current
mode and update derived styles when it changes. Use CSS variables when automatic
CSS theme switching is appropriate. The package does not export a ready-made MUI
theme; `@somenergia/somenergia-ui` is a separate integration.

## Fonts and accessibility

The token font stack starts with Outfit, but font files are not included here.
If Outfit is required, install `@somenergia/brand` separately and import:

```js
import "@somenergia/brand/fonts.css"
```

For `danger`, `warning`, `success`, and `info`, use `*Text` on `*Surface` for
status text. Base status colors are for icons, borders, and fills, not text:

```css
.alert {
  color: var(--som-color-warning-text);
  background: var(--som-color-warning-surface);
  border-left: 4px solid var(--som-color-warning);
}
```

Do not assume every token combination is accessible. Check contrast, focus
visibility, and readability in the actual component and both themes.

## Verification and boundaries

- Run the consuming project's relevant build, type checks, and tests.
- Check light, dark, and system-preference modes, including a manual override
  opposite to the system preference.
- Confirm the global stylesheet and any required fonts are actually loaded.
- Do not edit `node_modules`, copy the full token palette into application code,
  or redefine shared tokens globally to fix a local component issue. Keep any
  necessary application-specific values scoped and distinct from shared tokens.
- Before upgrading, review release notes and account for renamed, removed, or
  visibly changed tokens. Do not silently upgrade unrelated dependencies.
