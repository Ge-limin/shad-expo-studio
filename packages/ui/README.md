# UI - @studio/ui

Shared UI components and styles used across the studio.

This package defines two sets of components:

- `Shadcn UI`: reusable primitives for designers to compose screens
- `Studio-specific`: helper components we curate for demos and Storybook scenarios

## Installing a Shadcn UI component

Install dependencies with `pnpm i`, then import from `@studio/ui/<component>` inside Expo or Storybook examples.

## Storybook examples

- Place `*.examples.tsx` beside the component/screen and export `storyMeta` (with `componentName`) plus `storyExamples` (args/render/argTypes).
- Run `pnpm --filter expo-app storybook:generate:auto` to regenerate Storybook stories; generated files live under `apps/expo/.rnstorybook/stories/auto`.
- Keep examples presentational and deterministic so they work for visual regression runs.
