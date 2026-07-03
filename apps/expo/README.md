# Expo App (UI Shell)

Lightweight Expo shell for previewing shadcn-inspired components and Storybook stories.

## Quick start

Note: you must finish the commands in root

```bash
pnpm --filter expo-app start   # choose ios/android/web

# Quality checks
pnpm --filter expo-app lint
pnpm --filter expo-app typecheck
pnpm --filter expo-app test
```

## Environment

- Copy `app.json.example` to `app.json` and adjust identifiers if you want custom bundles.
- Copy `eas.json.example` to `eas.json` when preparing cloud builds.
- `.env` is intentionally empty; add `EXPO_PUBLIC_*` variables as needed for design demos.

## Notes

- This repo is UI-first: avoid adding backend SDKs or product-specific logic.
- Keep dependencies minimal so designers can iterate quickly in Expo and Storybook.

## Storybook (simplified)

- Add `*.examples.tsx` next to a UI component/screen in `packages/ui/src/native/**`, exporting `storyMeta` + `storyExamples` (deterministic, UI-only).
- Run `pnpm preview` from repo root for the web Storybook, or `pnpm ios` / `pnpm android` for the on-device /storybook route (always enabled).
- Hooks run some steps for you:
  - pre-commit: `pnpm --filter expo-app stories:generate` + `pnpm format:fix`
  - pre-push: `pnpm typecheck` + `pnpm lint:fix`
- To regenerate artifacts without starting anything: `pnpm --filter expo-app stories:generate` (writes `.rnstorybook/stories/auto/**` and `.rnstorybook/storybook.requires.ts`)
- Do not edit generated files; change the example source and re-run the generator.
