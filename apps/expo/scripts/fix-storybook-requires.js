/* eslint-disable @typescript-eslint/no-require-imports */
// Auto-fix Storybook's generated storybook.requires.ts when it emits undefined previewAnnotations.
// Idempotent: safe to run after storybook-generate.

const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', '.rnstorybook', 'storybook.requires.ts');

try {
  const content = fs.readFileSync(target, 'utf8');

  const fixed = content.replace(
    /const annotations = \[previewAnnotations,\s*reactNativePreview\];?/m,
    `const annotations = [
  require('./preview'),
  require('@storybook/react-native/preview'),
];`,
  );

  if (fixed !== content) {
    fs.writeFileSync(target, fixed, 'utf8');
    console.log('Patched storybook.requires.ts to use static requires.');
  } else {
    console.log('No changes made; storybook.requires.ts already fixed.');
  }
} catch (err) {
  console.error('Failed to patch storybook.requires.ts', err);
  process.exitCode = 1;
}
