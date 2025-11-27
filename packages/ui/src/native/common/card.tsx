import type { ReactNode } from 'react';

import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

export type CardProps = {
  title?: string;
  description?: string;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  footer?: ReactNode;
};

export function Card({
  title,
  description,
  children,
  style,
  titleStyle,
  descriptionStyle,
  footer,
}: CardProps) {
  return (
    <View style={[styles.container, style]}>
      {(title || description) && (
        <View style={styles.header}>
          {title ? (
            <Text style={[styles.title, titleStyle]}>{title}</Text>
          ) : null}
          {description ? (
            <Text style={[styles.description, descriptionStyle]}>
              {description}
            </Text>
          ) : null}
        </View>
      )}
      <View style={styles.body}>{children}</View>
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0b1222',
    borderColor: '#1f2937',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: '#0f172a',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  header: {
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e2e8f0',
  },
  description: {
    fontSize: 14,
    color: '#cbd5e1',
  },
  body: {
    gap: 10,
  },
  footer: {
    marginTop: 8,
  },
});
