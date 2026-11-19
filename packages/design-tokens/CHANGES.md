# Changelog

## 1.0.1 19-11-2026

- Check CI package publication

## 1.0.0 09-11-2026

- First release from its own repository (previously the `packages/tokens`
  workspace of `somenergia-ui`, never published).
- Colors and typography follow somenergia.coop: Outfit font, `#0b2e34`, `#cdff80`,
  `#e2e8de`, `#ced5d0`.
- Light and dark color schemes as `--som-*` CSS custom properties in `tokens.css`.
- `--som-font-family` uses Outfit; the font files live in `@somenergia/brand`.
- Type scale from Figma: `font.size` (`xs`–`5xl`), `font.weight`
  (`regular`, `medium`, `bold`) and `text` styles (`display1`, `display2`,
  `h1`–`h4`, `bodyM`, `bodyS`, `bodyXs`, `label`, `buttonM`, `buttonS`,
  `placeholder`, `formHelper`) as `--som-font-*` and `--som-text-*`.
- `warning`, `success` and `info` status colors, each with `*Surface` and
  `*Text` variants in light and dark schemes. Text variants meet WCAG AA on
  their surface.
- TypeScript declarations (`dist/index.d.ts`), generated from `src/index.js`
  and exposed through `exports`.
- Include an AI consumer guide with integration and validation instructions.
