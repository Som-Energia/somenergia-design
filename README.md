# Som Energia Design

Design resources and independently managed packages for Som Energia.

## Requirements

- GNU Make
- Node.js 24
- npm 11

## Getting started

Run from the repository root:

```bash
make install
make check
```

`make install` installs dependencies from each package's lockfile.
`make check` runs linting, formatting checks, tests and builds.

## Repository structure

```text
.github/workflows/       GitHub Actions workflows
packages/
  brand/                 Brand resources
  design-tokens/         Design tokens, generated CSS and fonts
Makefile                 Repository-wide commands
```

## Commands

Run these commands from the repository root:

| Command             | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `make help`         | Show available commands                  |
| `make install`      | Install package dependencies             |
| `make lint`         | Run linters                              |
| `make format-check` | Check formatting without modifying files |
| `make test`         | Run tests once                           |
| `make build`        | Build packages                           |
| `make check`        | Run all checks and builds                |

### Design tokens

| Command                    | Purpose                              |
| -------------------------- | ------------------------------------ |
| `make tokens-install`      | Install design token dependencies    |
| `make tokens-lint`         | Lint design token source and scripts |
| `make tokens-format-check` | Check design token formatting        |
| `make tokens-test`         | Run design token tests once          |
| `make tokens-build`        | Build design token outputs           |

## Package management

This repository does not use npm workspaces.

Each npm package maintains its own:

- `package.json` and scripts.
- `package-lock.json`.
- Dependencies and build configuration.

Package scripts define how each package works. The root Makefile
coordinates those scripts without duplicating their implementation.

Directories containing only static resources do not need a `package.json`.

## Testing packages locally

npm cannot install a package from a subdirectory of a git repository, so
use one of these options to try unpublished changes in a consuming project.

### From a tarball

This installs exactly what would be published to npm, including generated
files such as `dist/`:

```bash
make install
cd packages/design-tokens
npm pack    # writes somenergia-design-tokens-<version>.tgz
```

Then, in the consuming project:

```bash
npm install /path/to/somenergia-design/packages/design-tokens/somenergia-design-tokens-<version>.tgz
```

Run `npm pack` and install the tarball again after every change.

### From the package directory

For quicker iteration, install the package directory directly. npm links
it, so changes are visible straight away:

```bash
npm install /path/to/somenergia-design/packages/design-tokens
```

Run `npm run build` in the package after changing anything that generates
`dist/`. This option ignores the `files` field in `package.json`, so check
the package with a tarball before releasing.

Do not commit local paths or release asset URLs in a consuming project's
`package.json`. Switch back to a published version before merging.

## AI agent guidance

`AGENTS.md` contains instructions for developing this repository. Consumer
instructions are separate and included in each published npm package:

- [Design tokens consumer guide](./packages/design-tokens/docs/consumer-guide.md)
- [Brand consumer guide](./packages/brand/docs/consumer-guide.md)

Agents do not necessarily discover guides inside dependencies automatically.
Add the following to a consuming project's `AGENTS.md`, keeping only entries
for installed packages and adjusting paths if its package manager requires it:

```markdown
## Som Energia design resources

Before changing styles or brand assets, read the relevant installed guides:
- `node_modules/@somenergia/design-tokens/docs/consumer-guide.md`
- `node_modules/@somenergia/brand/docs/consumer-guide.md`

Follow these guides for package usage and this project's instructions for
local development and validation.
```

These are documentation files to read from disk, not JavaScript import paths.

## Continuous integration

GitHub Actions workflows live in the root `.github/workflows/` directory.

CI prepares the runtime environment and runs the same commands used locally:

```bash
make install
make check
```

## Dependency updates

Dependabot checks npm dependencies in `packages/design-tokens/` and GitHub
Actions weekly. Configuration lives in `.github/dependabot.yml`.

Minor and patch updates are grouped by ecosystem; major updates get separate
pull requests. Updates require review and are not automatically merged. This
configuration does not update packages in consuming repositories or publish
releases.

## Adding a package

1. Create a directory under `packages/`.
2. Add its source files and package-specific documentation.
3. If it uses npm, add its own `package.json` and commit its lockfile.
4. Add package-specific targets to the root Makefile.
5. Connect those targets to the relevant repository-wide commands.
6. Update CI setup and cache paths if needed.
7. Document the package in this README.
