# UI - @studio/ui

Shared UI components and styles used across the studio.

This package defines two sets of components:

- `Shadcn UI`: reusable primitives for designers to compose screens
- `Studio-specific`: helper components we curate for demos and Storybook scenarios

## Installing a Shadcn UI component

Install dependencies with `pnpm i`, then import from `@studio/ui/<component>` inside Expo or Storybook examples.

## Storybook examples

- Place `*.examples.tsx` beside the component/screen and export `storyMeta` (with `componentName`) plus `storyExamples` (args/render/argTypes). Keep them presentational and deterministic for visual regression.
- Local flow: run `pnpm start:storybook` (from repo root) to regenerate stories/require files and start Expo with Storybook enabled. pre-commit will also auto-run the story generator + format.
- CI/manual: generators are available if you only need artifacts:
  - `pnpm --filter expo-app storybook:generate:auto`
  - `pnpm --filter expo-app storybook-generate`
