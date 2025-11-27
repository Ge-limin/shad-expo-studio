import { StyleSheet, Text, View } from 'react-native';

import StorybookUI from '../.rnstorybook';

const enabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true';

export default function StorybookRoute() {
  if (enabled) {
    return <StorybookUI />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Storybook disabled</Text>
      <Text style={styles.subtitle}>
        Set EXPO_PUBLIC_STORYBOOK_ENABLED=true and restart the bundler to load
        Storybook.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#0f172a',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#e2e8f0',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#cbd5e1',
    textAlign: 'center',
  },
});
