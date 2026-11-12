# Instructions for AI agents

## Scope

These instructions apply to development and maintenance of this repository and
all its packages. They are not instructions for projects consuming the published
packages. Keep consumer guidance in package READMEs or dedicated consumer guides;
do not mix consumer-specific instructions into development `AGENTS.md` files.

Read the relevant package README and configuration before making changes. Use
actual source files and package exports as the authority for available APIs and
assets; do not invent token names, asset paths, or commands.

## Design methodology

This project aims to follow the Design Tokens methodology: represent shared
visual design decisions as named, reusable tokens that serve as a single source
of truth across projects and technologies.

Prefer maintaining shared design decisions in the token source rather than
introducing duplicated, hard-coded values in generated outputs or integrations.
Use meaningful, consistent token names and preserve the distinction between
reusable design decisions and framework-specific implementation details.

This is an architectural goal, not a claim of compliance with a particular
Design Tokens specification. Do not assume a standard format or introduce a
format migration without an explicit requirement.

## Repository structure

- `packages/design-tokens/`: `@somenergia/design-tokens`, framework-agnostic
  JavaScript tokens, generated CSS custom properties, and TypeScript declarations.
- `packages/brand/`: `@somenergia/brand`, static fonts, logos, favicons, and font CSS.
- `Makefile`: repository-wide commands delegating to package scripts.
- `.github/workflows/`: CI and independent package publishing workflows.

This repository does not use npm workspaces and has no root `package.json`.
Each npm package owns its manifest, lockfile, dependencies, and scripts. Run npm
commands inside the relevant package directory. Do not introduce a root npm
project or shared dependency management unless explicitly requested.

## Commands and validation

Use Node.js 24, npm 11, and GNU Make. Run from the repository root:

```sh
make install       # Install dependencies from package lockfiles
make lint          # Run linters
make format-check  # Check formatting without modifying files
make test          # Run tests once, including type tests
make build         # Generate package outputs
make check         # Run lint, formatting checks, tests, and builds
```

The current Make targets operate on `design-tokens`; the brand package has no
build or test scripts. Do not assume the root checks validate brand assets.

For token-only work, use `make tokens-lint`, `make tokens-format-check`,
`make tokens-test`, and `make tokens-build`. `npm test` inside that package runs
in watch mode; use `npm run test:ci` for non-interactive checks.

Run the relevant checks after changes, and preferably `make check` before
handing off code changes. Report what ran and any checks that failed or could
not run. For documentation-only changes, review paths, commands, and examples;
code builds are not required.

## Design token development

- Edit token definitions in `packages/design-tokens/src/index.js`.
- CSS serialization lives in `src/css.js`; `scripts/build-css.js` writes
  `dist/tokens.css`. TypeScript generates `dist/index.d.ts` from the source.
- Never hand-edit or commit generated `dist/` outputs.
- Update `src/tokens.test.js` and `types-test/` when changing the corresponding
  behavior or public types. Rebuild generated outputs before inspecting them.
- Keep tokens framework-agnostic and free of runtime dependencies. Framework
  integrations belong in consuming projects or separate packages.
- Preserve CSS/JavaScript consistency and existing light/dark theme behavior.
- Treat token removals, renames, and visibly changed values as breaking changes,
  as documented in the package README. Flag compatibility impact explicitly;
  do not silently change public styling contracts.

## Brand resource development

- This package ships static assets directly; there is no generation step.
- Preserve font-relative URLs in `fonts.css` and verify referenced files exist.
- Preserve documented logo variants and asset paths unless intentionally making
  a compatibility-breaking change.
- Respect the separate licenses: Outfit fonts use OFL-1.1, logos and favicons
  require express authorization, and package-authored CSS and documentation use
  AGPL-3.0-only. Do not imply that installation grants logo usage rights.

## Public API, packaging, and documentation

- Check both `exports` and `files` in each package's `package.json` when adding
  public resources. A file existing in the repository does not mean it is
  exported or included in the published package.
- Run `npm pack --dry-run` in an affected package when changing package contents
  or exports. For design tokens, this invokes the prepack build.
- Keep package READMEs aligned with public APIs and update the relevant
  `CHANGES.md` for user-facing changes. Keep development documentation in English.
- Keep packages independently consumable; do not add a dependency between them
  merely because projects often use both.
- Do not commit local installation paths, tarballs, or generated build outputs.
- If adding a package, follow the root README: give it its own configuration and
  lockfile where applicable, connect checks to Make, and update CI as needed.

## Releases

Packages are versioned and published independently. Release tags must match the
package version: `design-tokens-vM.m.p` or `brand-vM.m.p`.

Do not bump versions, create or push tags, or publish packages unless explicitly
requested. When changing dependency versions or a package version, keep its
`package-lock.json` consistent with `package.json`.
