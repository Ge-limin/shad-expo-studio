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
