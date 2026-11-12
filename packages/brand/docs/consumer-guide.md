# AI consumer guide: @somenergia/brand

## Scope

Use this guide when integrating brand resources into a consuming project. Follow
that project's development instructions and tooling. This is not a guide to
maintaining the brand package itself.

Inspect the installed package README and files before choosing asset paths. Use
the installed version as the authority; do not invent filenames or regenerate
logos when an official asset is available.

## Licensing comes first

Installing or downloading this package does not grant permission to use the
Som Energia name, logos, or favicons. Their use requires express authorization
from Som Energia. Do not assume authorization merely because files are public.

Different resources have different terms:

- Fonts: SIL Open Font License 1.1 (`LICENSE-OUTFIT`).
- Logos and favicons: restricted usage (`LICENSE-LOGO`).
- Package-authored CSS and documentation: AGPL-3.0-only (`LICENSE-AGPL`).

Read `LICENSE` and the relevant license before redistributing resources. Preserve
applicable license notices when copying assets.

## Public resources

```sh
npm install @somenergia/brand
```

Use the consuming project's package manager and dependency conventions.

The public paths are:

- `@somenergia/brand/fonts.css`
- `@somenergia/brand/fonts/*`
- `@somenergia/brand/logos/*`
- `@somenergia/brand/favicons/*`

There is no root JavaScript export, component library, or build step. Use the
application's asset tooling; do not assume an SVG import produces a component.

## Fonts

Import once from the application's global style entry point:

```js
import "@somenergia/brand/fonts.css"
```

```css
body {
  font-family: "Outfit", sans-serif;
}
```

The stylesheet loads bundled Outfit fonts through relative URLs, without an
external font service. If copying it into a public directory, preserve its
relative `fonts/` layout or update URLs through the project's build tooling.
Do not add a remote font service for fonts already bundled here.

## Logos

| Asset | Intended use |
| --- | --- |
| `logos/logo.svg` | Light backgrounds; fixed dark color |
| `logos/logo-dark.svg` | Dark backgrounds; fixed light color |
| `logos/logo-mono.svg` | Inline SVG using `currentColor` |

Resolve or copy assets using the consuming project's existing tooling. Package
import specifiers are not browser URLs: do not place a bare
`@somenergia/brand/logos/logo.svg` path in an HTML `src` attribute and expect the
browser to resolve it.

For system-driven themes, use `<picture>` with `prefers-color-scheme` sources.
For a manual application theme, choose the asset based on the application's
actual mode, or inline `logo-mono.svg` and control its CSS `color`.

An SVG loaded through `<img>` cannot inherit the page's `currentColor`;
`logo-mono.svg` renders black in that context. Component imports require explicit
SVG tooling, such as SVGR; do not assume that tooling is installed.

Preserve the official artwork and proportions. Provide meaningful alternative
text for informative logos, or empty alt text for decorative duplicates, according
to their context. Do not imply that technical recoloring capabilities authorize
changes outside the applicable brand guidelines.

## Favicons

Available files under `favicons/`:

- `favicon.ico`, `favicon.svg`
- `favicon-16x16.png`, `favicon-32x32.png`, `favicon-96x96.png`
- `apple-touch-icon.png`
- `android-chrome-192x192.png`, `android-chrome-512x512.png`

Copy or emit them to public URLs using existing project conventions, then update
HTML head entries or the application's manifest as appropriate. Do not assume
the package automatically registers favicons or provides a web app manifest.
Favicons have the same authorization requirements as logos.

## Using with design tokens

This package is independent of `@somenergia/design-tokens`. Install both only if
needed:

```js
import "@somenergia/design-tokens/tokens.css"
import "@somenergia/brand/fonts.css"
```

Tokens define typography values but do not load fonts. When tokens are available,
prefer `var(--som-font-family)` for typography and `var(--som-color-text)` for an
inline monochrome logo that should follow the application's color mode.

## Projects without npm

Use a version-pinned npm CDN URL or self-host copies of the required resources.
See the package README for examples. Third-party CDN availability is not
guaranteed; respect the project's privacy, CSP, and hosting requirements.
A public asset URL does not grant logo usage authorization.

## Verification and boundaries

- Run the consuming project's relevant build and tests.
- Verify emitted asset URLs, font loading, and favicon references in a browser,
  including deployments under a non-root base path if supported by the project.
- Check logo visibility in light and dark modes and with manual theme overrides.
- Do not edit `node_modules`, stretch or redraw official logos, or assume all
  resources share one license.
