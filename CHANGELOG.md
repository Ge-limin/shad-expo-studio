# Changelog

Notable changes to this project. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.1.0] - 2026-07-02

First tagged release. The repo repositions from "shadcn-style components for Expo" to what it actually is: a visual-regression studio for Expo / React Native UI components.

### Added

- shadcn-compatible registry: `npx shadcn add` any component straight from GitHub (`public/r/*.json`, rebuilt and drift-checked in CI).
- Hosted Storybook published via Chromatic, linked as the repo homepage.
- `pnpm preview` — web Storybook in two commands from a fresh clone, no native toolchain.
- `CONTRIBUTING.md` documenting the component + examples authoring loop.
- Custom social-preview image (`.github/og-image.png`).

### Changed

- README restructured: value prop and live demo first, tiered getting-started (browse → run web → full native), honest per-component inventory table, philosophy moved to the bottom.
- `check-env.js` failures now print the exact fix instead of only the requirement.
- Story generator emits prettier-clean output, making regeneration idempotent.

### Removed

- 15 placeholder component stubs (`export {}` TODOs), the web-only shadcn button, the unused Tailwind/NativeWind scaffolding, the Next.js eslint layer, and ~25 unused dependencies. Every component that remains ships with a deterministic example, a generated Storybook story, and a Chromatic visual baseline — 6 of 6.

### Security

- `next` bumped to 15.5.9 (dependabot #10); Expo/React bumps from #8/#9 included since the last activity.

[0.1.0]: https://github.com/Ge-limin/shad-expo-studio/releases/tag/v0.1.0
