# Contributing

The unit of contribution here is a component **plus its examples file**. A component without examples has no story and no visual baseline, so it doesn't exist as far as the studio is concerned.

## Setup

```bash
pnpm install     # installs deps and git hooks; corepack picks up the pinned pnpm
pnpm preview     # web Storybook at http://localhost:6006 — your feedback loop
```

No Xcode or Android toolchain needed for component work. See the README's "Full native development" section only if you're changing the app shell.

## The authoring loop

1. **Component**: `packages/ui/src/native/common/<name>.tsx`. Presentational only — props in, UI out. Plain `StyleSheet`, no navigation/network/app-state imports.
2. **Examples**: `<name>.examples.tsx` next to it. `button.examples.tsx` is the reference shape:

```tsx
// <name>.examples.tsx — everything the studio knows about your component
export const storyMeta = {
  componentName: 'MyComponent', // must match the export in index.ts
  title: 'auto/MyComponent (native)', // Storybook sidebar title
  decorators: [
    /* optional wrapper, e.g. a padded dark View */
  ],
};

export const storyExamples: Record<string, { args: MyComponentProps }> = {
  Default: { args: { label: 'Hello' } },
  // one entry per state worth a visual baseline — keep args DETERMINISTIC:
  // no Math.random(), no new Date(), no network. Chromatic diffs pixels;
  // nondeterminism turns every build into a false positive.
};
```

3. **Export**: add the component to `packages/ui/src/native/index.ts` and the export-map entries in `packages/ui/package.json`.
4. **Commit**: the pre-commit hook regenerates stories into `apps/expo/.rnstorybook/stories/auto/` (never edit those by hand) and formats. Pre-push runs typecheck + lint.

Check your work in `pnpm preview` — the story should appear under `auto/` with one entry per example.

## Before you open a PR

```bash
pnpm typecheck && pnpm lint && pnpm test
```

CI runs the same three on every PR, plus a Chromatic visual diff. If your change intentionally alters a component's look, say so in the PR description so the new baseline gets accepted rather than treated as a regression.

## What gets merged

- Components that follow the loop above, examples included.
- Fixes with a story that demonstrates the fixed state.
- Docs that shorten the path from clone to running Storybook.

Placeholder files, speculative abstractions, and components without examples don't — an empty promise in the tree costs more than the missing feature.
