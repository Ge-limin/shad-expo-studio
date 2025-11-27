import AsyncStorage from '@react-native-async-storage/async-storage';

import { view } from './storybook.requires';

const isWeb = typeof window !== 'undefined';

const storage = isWeb
  ? {
      // Provide a no-op storage on web to avoid window/AsyncStorage errors.
      getItem: async () => null,
      setItem: async () => {},
    }
  : {
      getItem: AsyncStorage.getItem,
      setItem: AsyncStorage.setItem,
    };

const StorybookUIRoot = view.getStorybookUI({ storage });

export default StorybookUIRoot;
