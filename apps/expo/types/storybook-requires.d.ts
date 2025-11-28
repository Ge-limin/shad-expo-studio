declare module '../.rnstorybook' {
  import type { ComponentType } from 'react';
  const StorybookUIRoot: ComponentType<unknown>;
  export default StorybookUIRoot;
}

declare module './storybook.requires' {
  import type { View } from '@storybook/react-native';
  // Storybook generates this at runtime; this stub keeps typecheck happy in CI.
  export const view: View;
}
