# @studio/ui

The presentational component layer of the studio. React Native components styled with plain `StyleSheet` — no NativeWind, no Tailwind, no navigation/network/app-state imports.

Every component lives next to a `*.examples.tsx` file that exports `storyMeta` + `storyExamples` with deterministic data. Those examples drive everything downstream: the story generator in `apps/expo/.rnstorybook/` turns them into Storybook stories, and Chromatic locks the rendered output as visual baselines.

## Layout

```
src/native/common/    Badge, Button, Card, TextField, ToggleRow (+ their examples)
src/native/screen/    Tasks screen (+ examples)
src/native/index.ts   the public surface, imported as @studio/ui/native
```

## Adding a component

1. Create `src/native/common/<name>.tsx` — presentational only, props in, UI out.
2. Create `src/native/common/<name>.examples.tsx` next to it. Copy an existing one (`button.examples.tsx` is the reference shape): export `storyMeta` (with `componentName` matching your export) and `storyExamples` (deterministic args — no random data, no clock reads).
3. Export the component from `src/native/index.ts` and add the export-map entries in `package.json`.
4. Commit. The pre-commit hook regenerates the Storybook story; CI typechecks, lints, and diffs the visuals on Chromatic.

See [CONTRIBUTING.md](../../CONTRIBUTING.md) at the repo root for the full loop.
