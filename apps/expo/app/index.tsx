import { useState } from 'react';

import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Badge, Button, Card, TextField, ToggleRow } from '@studio/ui/native';

const storybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED !== 'false';

const PIPELINE_STEPS = [
  {
    step: '1',
    title: 'Write a deterministic example',
    body: 'Every component in packages/ui ships a *.examples.tsx next to its source — fixed props, no randomness, no network.',
  },
  {
    step: '2',
    title: 'Stories generate themselves',
    body: 'pnpm preview turns each example into Storybook stories. Nobody hand-maintains story files.',
  },
  {
    step: '3',
    title: 'Chromatic guards every PR',
    body: 'CI publishes the Storybook and fails the pull request when a story renders differently from the accepted baseline.',
  },
];

export default function Home() {
  const [name, setName] = useState('Alex Designer');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <View style={styles.row}>
          <Badge label="Expo" tone="info" />
          <Badge label="React Native" tone="info" />
          <Badge label="Storybook + Chromatic" tone="info" />
        </View>
        <Text style={styles.title}>shad/expo studio</Text>
        <Text style={styles.subtitle}>
          A visual-regression workbench for Expo / React Native components. One
          component tree runs on iOS, Android, and web — every change is diffed
          against accepted baselines of the web render.
        </Text>
        <View style={styles.row}>
          {storybookEnabled && (
            <Link href="/storybook" asChild>
              <Button label="Browse components" size="lg" />
            </Link>
          )}
          <Link href="/tasks" asChild>
            <Button
              label="Task planner demo"
              size="lg"
              variant={storybookEnabled ? 'outline' : 'solid'}
            />
          </Link>
        </View>
      </View>

      <Card
        title="How it works"
        description="From example to guarded baseline in three steps."
        style={styles.card}
      >
        <View style={styles.steps}>
          {PIPELINE_STEPS.map(({ step, title, body }) => (
            <View key={step} style={styles.stepRow}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{step}</Text>
              </View>
              <View style={styles.stepBody}>
                <Text style={styles.stepTitle}>{title}</Text>
                <Text style={styles.stepText}>{body}</Text>
              </View>
            </View>
          ))}
        </View>
      </Card>

      <Card
        title="The components, live"
        description="The same primitives that are under regression, rendered right here."
        style={styles.card}
      >
        <View style={styles.row}>
          <Button label="Solid" onPress={() => {}} />
          <Button label="Outline" variant="outline" onPress={() => {}} />
          <Button label="Disabled" disabled />
        </View>
        <View style={styles.row}>
          <Badge label="Neutral" tone="neutral" />
          <Badge label="Info" tone="info" />
          <Badge label="Success" tone="success" />
          <Badge label="Warning" tone="warning" />
          <Badge label="Danger" tone="danger" />
        </View>
        <TextField
          label="Display name"
          value={name}
          onChangeText={setName}
          helperText="TextField with helper text"
          autoCapitalize="words"
        />
        <ToggleRow
          label="Notifications"
          description="ToggleRow with a description"
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
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
  hero: {
    gap: 14,
    paddingVertical: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#f8fafc',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#cbd5e1',
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
  steps: {
    gap: 16,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1d4ed8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 14,
  },
  stepBody: {
    flex: 1,
    gap: 4,
  },
  stepTitle: {
    color: '#e2e8f0',
    fontWeight: '700',
    fontSize: 15,
  },
  stepText: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 20,
  },
});
