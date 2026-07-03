import type { Preview } from '@storybook/react-native-web-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    // Components ship dark-surface styles; match the canvas so stories render
    // on the surface they are designed for.
    backgrounds: {
      options: {
        slate: { name: 'Slate', value: '#0f172a' },
        light: { name: 'Light', value: '#f8fafc' },
      },
    },
    layout: 'fullscreen',

    options: {
      storySort: {
        order: ['Welcome', 'Components', 'Screens'],
      },
    },
  },

  initialGlobals: {
    backgrounds: { value: 'slate' },
  },
};

export default preview;
