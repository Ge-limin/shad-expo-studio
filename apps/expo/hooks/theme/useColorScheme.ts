import { useColorScheme as useNativeColorScheme } from 'react-native';

export type ColorScheme = 'light' | 'dark';

export function useColorScheme(): ColorScheme {
  const value = useNativeColorScheme();
  return value === 'dark' ? 'dark' : 'light';
}
