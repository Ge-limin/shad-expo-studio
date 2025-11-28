import type {
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Pressable, StyleSheet, Text } from 'react-native';

type Variant = 'solid' | 'outline';
type Size = 'sm' | 'md' | 'lg';

export type ButtonProps = Omit<PressableProps, 'style'> & {
  label: string;
  variant?: Variant;
  size?: Size;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const variantStyles: Record<
  Variant,
  { container: ViewStyle; text: TextStyle }
> = {
  solid: {
    container: {
      backgroundColor: '#6366f1',
      borderColor: '#4f46e5',
    },
    text: { color: '#f8fafc' },
  },
  outline: {
    container: {
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
      borderColor: '#94a3b8',
    },
    text: { color: '#e2e8f0' },
  },
};

const sizeStyles: Record<Size, { container: ViewStyle; text: TextStyle }> = {
  sm: {
    container: { paddingHorizontal: 12, paddingVertical: 10 },
    text: { fontSize: 14 },
  },
  md: {
    container: { paddingHorizontal: 14, paddingVertical: 12 },
    text: { fontSize: 15 },
  },
  lg: {
    container: { paddingHorizontal: 16, paddingVertical: 14 },
    text: { fontSize: 16 },
  },
};

export function Button({
  label,
  variant = 'solid',
  size = 'md',
  disabled,
  style,
  textStyle,
  ...pressableProps
}: ButtonProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variantStyle.container,
        sizeStyle.container,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      {...pressableProps}
    >
      <Text style={[styles.text, variantStyle.text, sizeStyle.text, textStyle]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    shadowColor: '#0f172a',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  text: {
    fontWeight: '600',
  },
  pressed: {
    transform: [{ translateY: 1 }],
    opacity: 0.9,
  },
  disabled: {
    opacity: 0.5,
  },
});
