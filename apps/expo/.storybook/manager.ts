import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'shad/expo studio',
    brandUrl: 'https://github.com/Ge-limin/shad-expo-studio',
  }),
});
