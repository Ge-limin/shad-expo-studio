This file provides guidance to coding agent when working with code in this repository.

## Expectations for the agent
- Always read README.md (and relevant docs in this repo) before making changes; prefer existing patterns over inventing new ones.
- Follow established conventions in `packages/ui` and `apps/expo` (examples-driven stories, deterministic data, separation of UI vs. app logic).
- When adding or changing behavior that affects workflow, scripts, or usage, update docs (README/AGENTS/etc.) accordingly.

## Core Technologies
- Expo / React Native 0.81 (Expo Router) with TypeScript and React 19.
- Storybook 10 using `@storybook/react-native-web-vite` + React Native Web; Chromatic for visual regression.
- Monorepo tooling: pnpm + turbo + Husky; lint via ESLint, format via Prettier, tests via Jest.

## Monorepo Structure
- `apps/expo/` — Expo app, Storybook config (`.storybook`) and generated stories (`.rnstorybook/stories/auto`).
- `packages/ui/` — shared UI components and `*.examples.tsx` files that power Storybook.
- `tooling/` — shared lint/format/tsconfig packages.

## File Organization Patterns
- Presentational UI only in `packages/ui`; keep navigation/data/state in `apps/expo`.
- Storybook stories are generated from `packages/ui/src/native/**/**.examples.tsx` into `apps/expo/.rnstorybook/stories/auto/**` (do not edit generated files).

### Route Structure
- Expo Router under `apps/expo/app/` (`_layout.tsx`, `index.tsx`, `tasks.tsx`, `storybook.tsx`).
- Storybook route `/storybook`, enabled when `EXPO_PUBLIC_STORYBOOK_ENABLED=true`.

### Naming Conventions
- Components: PascalCase; examples named `*.examples.tsx` exporting `storyMeta` + `storyExamples`.
- Generated story titles follow `auto/<Component>`; keep deterministic data for visual diffs.

## UI Components
- Use via `@studio/ui/native` (Badge, Button, Card, TextField, ToggleRow, Tasks screen, etc.).
- Examples sit next to components in `packages/ui/src/native/...` and must be deterministic (no side effects).


## Verification Steps

After implementation:
1. **Run `pnpm --filter expo-app storybook:generate:auto && pnpm --filter expo-app storybook-generate`** - Regenerate stories and Storybook requires files
2. **Run `pnpm typecheck`** - Must pass without errors
3. **Run `pnpm lint:fix`** - Auto-fix issues
4. **Run `pnpm format:fix`** - Format code
5. **Run `pnpm test`** - Make sure tests pass (use `pnpm --filter expo-app test -- --watchman=false` if watchman is unavailable)
