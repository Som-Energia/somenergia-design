# Som Energia Brand

Shared logos and typography assets for authorized Som Energia projects.

## Installation

```bash
npm install @somenergia/brand
```

Installing this package does not grant permission to use the Som Energia
name or logos. Logo use requires express authorization from Som Energia.

## Package contents

```text
fonts/          Outfit font files
fonts.css       CSS declarations for loading Outfit
logos/          Som Energia logos
favicons/       Som Energia favicons (ICO, PNG and SVG)
LICENSE         Licensing overview
LICENSE-AGPL    License for package-authored CSS and documentation
LICENSE-LOGO    Restricted logo usage terms
LICENSE-OUTFIT  Original Outfit font license
```

## Typography

Import the stylesheet using your project's build tooling:

```js
import "@somenergia/brand/fonts.css";
```

Then use the font in your CSS:

```css
body {
  font-family: "Outfit", sans-serif;
}
```

The stylesheet loads the bundled font files without depending on
an external font service.

## Logos

Logo assets are available through:

```text
@somenergia/brand/logos/logo.svg
```

Resolve or copy these assets using your project's build tooling, or
load them from a public CDN as described in
[Using without npm](#using-without-npm).

Use logos only within the scope authorized by Som Energia and follow
the applicable brand guidelines.

## Favicons

Favicons are available in `@somenergia/brand/favicons/`:
`favicon.ico`, `favicon.svg`, `favicon-16x16.png`, `favicon-32x32.png`,
`favicon-96x96.png`, `apple-touch-icon.png`,
`android-chrome-192x192.png` and `android-chrome-512x512.png`.

They are subject to the same usage terms as the logos.

## Using without npm

Projects without npm or a build step can load the package files from
a public npm CDN such as [jsDelivr](https://www.jsdelivr.com/) or
[unpkg](https://unpkg.com/). Always pin an exact version so assets
do not change unexpectedly.

Fonts:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@somenergia/brand@1.0.0/fonts.css"
/>
```

The font files are resolved relative to the stylesheet, so no extra
configuration is needed.

Logo:

```html
<img
  src="https://cdn.jsdelivr.net/npm/@somenergia/brand@1.0.0/logos/logo.svg"
  alt="Som Energia"
/>
```

The same paths work on unpkg, for example
`https://unpkg.com/@somenergia/brand@1.0.0/logos/logo.svg`.

These CDNs are third-party services, not official Som Energia
infrastructure, and their availability is not guaranteed. For
production sites, consider copying the files into your project.

Loading the logo from a public URL does not grant permission to use
it. Logo use still requires express authorization from Som Energia.

## Using design tokens

This package and `@somenergia/design-tokens` are independent.
Projects that need both can import:

```js
import "@somenergia/design-tokens/tokens.css";
import "@somenergia/brand/fonts.css";
```

## Licensing

Different resources have different licensing terms:

- **Outfit fonts:** SIL Open Font License 1.1.
  See [LICENSE-OUTFIT](./LICENSE-OUTFIT).
- **Som Energia logos and favicons:** restricted to expressly authorized projects.
  See [LICENSE-LOGO](./LICENSE-LOGO).
- **Package-authored CSS and documentation:** AGPL-3.0-only.
  See [LICENSE-AGPL](./LICENSE-AGPL).

Copyright 2021 The Outfit Project Authors
(https://github.com/Outfitio/Outfit-Fonts).

See [LICENSE](./LICENSE) for the licensing overview.

Downloading or installing this package does not authorize use of
the Som Energia name or logos.
