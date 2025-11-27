import { useMemo, useState } from 'react';

import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Badge, Button, Card, TextField, ToggleRow } from '@studio/ui/native';

export default function Home() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [betaEnabled, setBetaEnabled] = useState(false);
  const [name, setName] = useState('Alex');

  const storybookEnabled = useMemo(
    () => process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true',
    [],
  );

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
      <Card
        title="Actions"
        description="Primary actions and quick links."
        style={styles.card}
        footer={
          <View style={styles.row}>
            <Badge label="New" tone="info" />
            <Badge label="Stable" tone="success" />
          </View>
        }
      >
        <View style={styles.row}>
          <Button label="Solid button" onPress={() => {}} />
          <Button label="Outline button" variant="outline" onPress={() => {}} />
        </View>
        <View style={styles.row}>
          <Button
            label={storybookEnabled ? 'Open Storybook' : 'Enable Storybook'}
            onPress={() => {
              if (storybookEnabled) {
                // Navigate to Storybook route; Expo Router link behaves like a push.
                try {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (Link as any).push?.('/storybook');
                } catch {
                  // Link.push may not exist; silently ignore.
                }
              }
            }}
            variant={storybookEnabled ? 'solid' : 'outline'}
            disabled={!storybookEnabled}
          />
          <Badge
            label={
              storybookEnabled
                ? 'Storybook enabled'
                : 'Set EXPO_PUBLIC_STORYBOOK_ENABLED=true'
            }
            tone={storybookEnabled ? 'success' : 'warning'}
          />
        </View>
      </Card>

      <Card
        title="Profile"
        description="Inline form controls."
        style={styles.card}
      >
        <TextField
          label="Display name"
          value={name}
          onChangeText={setName}
          helperText="Shown in your components"
          autoCapitalize="words"
        />
        <ToggleRow
          label="Notifications"
          description="Send me component review updates"
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
        <ToggleRow
          label="Beta features"
          description="Try experimental shad components"
          value={betaEnabled}
          onValueChange={setBetaEnabled}
        />
      </Card>

      <Card
        title="Pages"
        description="See a full screen built from the UI package with logic in the app."
        style={styles.card}
      >
        <Link href="/tasks" style={styles.link}>
          Open the tasks demo page
        </Link>
      </Card>
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
  card: {
    width: '100%',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
});
