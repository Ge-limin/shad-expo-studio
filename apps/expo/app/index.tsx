import { useMemo, useState } from 'react';

import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Badge, Button, Card, TextField, ToggleRow } from '@studio/ui/native';

export default function Home() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [betaEnabled, setBetaEnabled] = useState(false);
  const [name, setName] = useState('Alex Designer');
  const [note, setNote] = useState('Quick smoke test notes');

  const storybookEnabled = useMemo(
    () => process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true',
    [],
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Shad Expo Studio</Text>
          <Text style={styles.subtitle}>
            Organized smoke tests for native components. Logic stays here; UI
            comes from the shared package.
          </Text>
        </View>
        <Badge label="UI-only" tone="info" />
      </View>

      <Card
        title="Navigation"
        description="Jump to Storybook or feature demos."
        style={styles.card}
      >
        <View style={styles.row}>
          <Link href="/tasks" style={styles.link}>
            Open tasks screen (app logic + UI screen)
          </Link>
          <Badge label="Demo" tone="success" />
        </View>
        <View style={styles.row}>
          {storybookEnabled ? (
            <Link href="/storybook" asChild>
              <Button label="Open Storybook" />
            </Link>
          ) : (
            <Button label="Enable Storybook" variant="outline" disabled />
          )}
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
        title="Form primitives"
        description="Manual smoke: text, toggles, disabled states."
        style={styles.card}
      >
        <TextField
          label="Display name"
          value={name}
          onChangeText={setName}
          helperText="Shown in UI components"
          autoCapitalize="words"
        />
        <TextField
          label="Notes"
          value={note}
          onChangeText={setNote}
          multiline
          inputStyle={{ minHeight: 80, textAlignVertical: 'top' }}
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
        title="Buttons & badges"
        description="Quick visual pass on interactive states."
        style={styles.card}
      >
        <View style={styles.row}>
          <Button label="Solid button" onPress={() => {}} />
          <Button label="Outline button" variant="outline" onPress={() => {}} />
          <Button label="Disabled" disabled />
        </View>
        <View style={styles.row}>
          <Badge label="Neutral" tone="neutral" />
          <Badge label="Info" tone="info" />
          <Badge label="Warning" tone="warning" />
          <Badge label="Danger" tone="danger" />
        </View>
      </Card>

      <Card
        title="Regression checklist"
        description="Use these before shipping a change."
        style={styles.card}
      >
        <View style={styles.checklist}>
          <Text style={styles.checkItem}>
            • Tasks screen renders and filters
          </Text>
          <Text style={styles.checkItem}>
            • Text fields accept input and multiline typing
          </Text>
          <Text style={styles.checkItem}>
            • Toggles respond and reflect state changes
          </Text>
          <Text style={styles.checkItem}>
            • Buttons render solid/outline/disabled variants
          </Text>
          <Text style={styles.checkItem}>• Storybook opens via button</Text>
        </View>
      </Card>
      <StatusBar style="light" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#e2e8f0',
  },
  subtitle: {
    fontSize: 15,
    color: '#cbd5e1',
  },
  link: {
    color: '#a5b4fc',
    fontWeight: '700',
  },
  card: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  checklist: {
    gap: 8,
  },
  checkItem: {
    color: '#cbd5e1',
    fontSize: 14,
    lineHeight: 20,
  },
});
