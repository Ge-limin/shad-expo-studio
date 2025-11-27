import { useMemo } from 'react';

import { useThemeColor } from './useThemeColor';

export function useTheme() {
  const background = useThemeColor({
    light: '#ffffff',
    dark: '#0f172a',
  });
  const text = useThemeColor({ light: '#0f172a', dark: '#e2e8f0' });

  return useMemo(
    () => ({
      background,
      text,
    }),
    [background, text],
  );
}
