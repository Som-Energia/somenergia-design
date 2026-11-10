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

## Continuous integration

GitHub Actions workflows live in the root `.github/workflows/` directory.

CI prepares the runtime environment and runs the same commands used locally:

```bash
make install
make check
```

## Adding a package

1. Create a directory under `packages/`.
2. Add its source files and package-specific documentation.
3. If it uses npm, add its own `package.json` and commit its lockfile.
4. Add package-specific targets to the root Makefile.
5. Connect those targets to the relevant repository-wide commands.
6. Update CI setup and cache paths if needed.
7. Document the package in this README.
