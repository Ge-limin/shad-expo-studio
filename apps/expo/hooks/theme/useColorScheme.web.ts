export type ColorScheme = 'light' | 'dark';

export function useColorScheme(): ColorScheme {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}
