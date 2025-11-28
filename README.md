# shad-expo-studio
A studio that allows designers to build shadcn-style Expo components, and use Storybook for regression testing.

## Getting started

### Setting up the repo
```bash
corepack enable                       # let Corepack manage the pnpm shim
corepack install                      # install the pinned pnpm version from package.json
pnpm install                          # install all workspace deps (preinstall will verify Node/pnpm versions)
pnpm dlx husky                        # install git hooks (pre-commit runs pnpm format:fix; pre-push runs pnpm typecheck && pnpm lint:fix)
```

### Setting up Expo
1. Follow the instrcution in [expo doc](https://docs.expo.dev/get-started/set-up-your-environment) of:  
- choose android emulator and ios simulator respectively 
- choose development build
- choose to not using Expo Application Services (EAS)
- Do not run the local commands in the webpage


2. Follow [this doc](https://github.com/expo/fyi/blob/main/setup-xcode-signing.md) to setup ios


3. Execute these commands
```bash
cd apps/expo
pnpm web                              # start the web dev server to confirm the toolchain
npx expo install expo-dev-client      # install native dev client deps for iOS/Android
pnpm android                          # build and launch the Android dev client in the emulator
pnpm ios                              # build and launch the iOS dev client in the simulator
```

## Daily commands

### common scripts 
```bash
pnpm dev                            # run turbo dev across packages in parallel
pnpm ios                            # run expo-app iOS dev build from the repo root
pnpm android                        # run expo-app Android dev build from the repo root
pnpm web                            # run expo-app web dev server from the repo root
pnpm --filter expo-app start        # start Expo bundler and choose ios/android/web in the prompt
pnpm format:fix                     # auto-format sources via Prettier across packages
pnpm lint:fix                       # auto-fix lint issues across packages
pnpm lint && pnpm typecheck         # run eslint + typescript checks
pnpm test                           # run Jest (set WATCHMAN_DISABLE=1 if watchman is unavailable)
```

### Storybook
- Native/on-device (Expo bundler): `pnpm start:storybook`, then open the `/storybook` route in the app (Expo Router). Use `pnpm web:pure` to run a pure app web bundle, or `pnpm web:storybook` to include Storybook in the web bundle.
- Web (browser UI via Vite/React Native Web): `pnpm storybook` from the repo root (opens on port 6006).

## Development flow (recommended)
- Build presentational UI in `packages/ui` only (no router/hooks/network/state there). Keep business logic, data, navigation, and side-effects in `apps/expo` route wrappers.
- For each component/screen, add a `*.examples.tsx` next to it exporting `storyMeta` + `storyExamples` (deterministic data, no side-effects).
- Run `pnpm start:storybook` (root). It regenerates stories and Storybook requires files automatically, then starts Expo with Storybook enabled. Inspect `/storybook` on device/web for quick visual checks.
- Husky hooks already help:
  - pre-commit: runs `pnpm --filter expo-app storybook:generate:auto` + `pnpm format:fix`
  - pre-push: runs `pnpm typecheck` + `pnpm lint:fix`
- Manual: run `pnpm lint && pnpm typecheck` if you skip hooks or want to check early; `pnpm format:fix` cleans up formatting.

## Design philosophy & tooling
- Separation of concerns: `packages/ui` = presentational React Native UI only; `apps/expo/app/*` = Expo Router shells that own state, data fetching, navigation, analytics, and pass props down.
- UI-first: prioritize stable, deterministic examples for visual regression. Avoid backend SDKs or product-specific logic in the UI package.
- Storybook auto-gen: examples drive generated stories under `apps/expo/.rnstorybook/stories/auto/**`. Do not edit generated files; change examples and rerun `pnpm start:storybook`.
- Chromatic (planned): we’ll publish the web Storybook (`pnpm --filter expo-app build-storybook`) to Chromatic for CI visual diffs; keep examples deterministic to make snapshots reliable.
