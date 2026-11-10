.DEFAULT_GOAL := help

TOKENS_DIR := packages/design-tokens

.PHONY: help install lint format-check test build check \
        tokens-install tokens-lint tokens-format-check \
        tokens-test tokens-build

help:
	@echo "make install       Install package dependencies"
	@echo "make lint          Run linters"
	@echo "make format-check  Check formatting"
	@echo "make test          Run tests once"
	@echo "make build         Build packages"
	@echo "make check         Run all checks and builds"

install: tokens-install

lint: tokens-lint

format-check: tokens-format-check

test: tokens-test

build: tokens-build

check: lint format-check test build

tokens-install:
	cd "$(TOKENS_DIR)" && npm ci

tokens-lint:
	cd "$(TOKENS_DIR)" && npm run lint

tokens-format-check:
	cd "$(TOKENS_DIR)" && npm run format:check

tokens-test:
	cd "$(TOKENS_DIR)" && npm run test:ci

tokens-build:
	cd "$(TOKENS_DIR)" && npm run build
