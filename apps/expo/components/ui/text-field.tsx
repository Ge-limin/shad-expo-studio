import type {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export type TextFieldProps = {
  label?: string;
  helperText?: string;
  errorText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  helperStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
} & Omit<TextInputProps, 'style'> & {
    inputStyle?: StyleProp<TextStyle>;
  };

export function TextField({
  label,
  helperText,
  errorText,
  containerStyle,
  labelStyle,
  helperStyle,
  errorStyle,
  inputStyle,
  ...inputProps
}: TextFieldProps) {
  const hasError = Boolean(errorText);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
      <TextInput
        placeholderTextColor="#94a3b8"
        style={[styles.input, hasError && styles.inputError, inputStyle]}
        {...inputProps}
      />
      {helperText && !hasError ? (
        <Text style={[styles.helper, helperStyle]}>{helperText}</Text>
      ) : null}
      {hasError ? (
        <Text style={[styles.error, errorStyle]}>{errorText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e8f0',
  },
  input: {
    backgroundColor: '#0b1222',
    borderColor: '#1f2937',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#e2e8f0',
    fontSize: 15,
  },
  inputError: {
    borderColor: '#f87171',
  },
  helper: {
    fontSize: 13,
    color: '#94a3b8',
  },
  error: {
    fontSize: 13,
    color: '#f87171',
    fontWeight: '600',
  },
});
