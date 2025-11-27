import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export type BadgeProps = {
  label: string;
  tone?: Tone;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const toneStyles: Record<Tone, { container: ViewStyle; text: TextStyle }> = {
  neutral: {
    container: { backgroundColor: '#e2e8f0', borderColor: '#cbd5e1' },
    text: { color: '#0f172a' },
  },
  info: {
    container: { backgroundColor: '#e0f2fe', borderColor: '#7dd3fc' },
    text: { color: '#075985' },
  },
  success: {
    container: { backgroundColor: '#dcfce7', borderColor: '#86efac' },
    text: { color: '#166534' },
  },
  warning: {
    container: { backgroundColor: '#fef3c7', borderColor: '#fbbf24' },
    text: { color: '#92400e' },
  },
  danger: {
    container: { backgroundColor: '#fee2e2', borderColor: '#f87171' },
    text: { color: '#991b1b' },
  },
};

export function Badge({
  label,
  tone = 'neutral',
  style,
  textStyle,
}: BadgeProps) {
  const toneStyle = toneStyles[tone];
  return (
    <View style={[styles.container, toneStyle.container, style]}>
      <Text style={[styles.text, toneStyle.text, textStyle]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
    fontSize: 13,
  },
});
