This file provides guidance to Claude Code when working with code in this repository.

## Core Technologies

## Monorepo Structure


## File Organization Patterns

### Route Structure

### Naming Conventions


## UI Components


## Verification Steps

After implementation:
1. **Run `pnpm --filter expo-app storybook:generate:auto && pnpm --filter expo-app storybook-generate`** - Regenerate stories and Storybook requires files
2. **Run `pnpm typecheck`** - Must pass without errors
3. **Run `pnpm lint:fix`** - Auto-fix issues
4. **Run `pnpm format:fix`** - Format code
5. **Run `pnpm test`** - Make sure tests pass