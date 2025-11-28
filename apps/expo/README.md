# Expo App (UI Shell)

Lightweight Expo shell for previewing shadcn-inspired components and Storybook stories.

## Quick start

```bash
pnpm install
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

## Storybook auto-generation

- Add `*.examples.tsx` next to a UI component/screen in `packages/ui/src/native/**`. Export:
  - `storyMeta`: `{ componentName: string; title?: string; decorators?: Decorator[]; parameters?: object }`
  - `storyExamples`: an object of stories (args/render/argTypes/etc.). Keep them deterministic and UI-only.
- Run `pnpm --filter expo-app storybook:generate:auto` to emit stories into `.rnstorybook/stories/auto/**`. The Storybook glob already picks them up. But this command is also auto triggered by husky hooks before commit.
- Do not edit generated files; change the example source and re-run the generator.

