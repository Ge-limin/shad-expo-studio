import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/ui';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shad Expo Studio</Text>
      <Text style={styles.subtitle}>
        This shell is intentionally minimal so designers can focus on components
        and Storybook flows.
      </Text>
      <Link href="/" style={styles.link}>
        Update this screen with your first component.
      </Link>
      <View style={styles.buttonRow}>
        <Button label="Solid button" onPress={() => {}} />
        <Button label="Outline button" variant="outline" onPress={() => {}} />
      </View>
      <StatusBar style="auto" />
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
    fontSize: 28,
    fontWeight: '800',
    color: '#e2e8f0',
  },
  subtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    marginTop: 12,
  },
  link: {
    marginTop: 20,
    color: '#a5b4fc',
    fontWeight: '600',
  },
  buttonRow: {
    marginTop: 32,
    gap: 12,
    width: '100%',
  },
});
