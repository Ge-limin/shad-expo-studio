import { type ColorScheme, useColorScheme } from './useColorScheme';

export type ThemeColors = {
  light: string;
  dark: string;
};

export function useThemeColor(
  colors: ThemeColors,
  override?: ColorScheme,
): string {
  const systemTheme = useColorScheme();
  const theme = override ?? systemTheme;

  return theme === 'dark' ? colors.dark : colors.light;
}
