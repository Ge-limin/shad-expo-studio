import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Switch, Text, View } from 'react-native';

export type ToggleRowProps = {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (next: boolean) => void;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
};

export function ToggleRow({
  label,
  description,
  value,
  onValueChange,
  style,
  labelStyle,
  descriptionStyle,
}: ToggleRowProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.textCol}>
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        {description ? (
          <Text style={[styles.description, descriptionStyle]}>
            {description}
          </Text>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#1f2937', true: '#10b981' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    gap: 12,
  },
  textCol: {
    flex: 1,
    gap: 2,
  },
  label: {
    color: '#e2e8f0',
    fontSize: 15,
    fontWeight: '600',
  },
  description: {
    color: '#94a3b8',
    fontSize: 13,
  },
});
