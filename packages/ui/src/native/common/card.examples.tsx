import React from 'react';

import { Text, View } from 'react-native';

import { Badge } from './badge';
import { Button } from './button';
import { Card } from './card';

export const storyMeta = {
  componentName: 'Card',
  title: 'auto/Card (native)',
  decorators: [
    (Story: React.ComponentType) => (
      <View
        style={{
          flex: 1,
          padding: 24,
          gap: 12,
          backgroundColor: '#0f172a',
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export const storyExamples = {
  Basic: {
    render: () => (
      <Card title="Card title" description="Optional description.">
        <Text style={{ color: '#cbd5e1', fontSize: 14 }}>
          Card children are rendered here. Keep this presentational-only.
        </Text>
      </Card>
    ),
  },
  WithFooter: {
    render: () => (
      <Card
        title="Actions"
        description="Footer slot shows buttons/badges."
        footer={
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button label="Primary" />
            <Badge label="Beta" tone="info" />
          </View>
        }
      >
        <Text style={{ color: '#cbd5e1', fontSize: 14 }}>
          Compose card content with other UI primitives.
        </Text>
      </Card>
    ),
  },
  NoHeader: {
    render: () => (
      <Card>
        <Text style={{ color: '#cbd5e1', fontSize: 14 }}>
          Card without title/description to verify spacing stays consistent.
        </Text>
      </Card>
    ),
  },
  LongContent: {
    render: () => (
      <Card title="Long form content">
        <View style={{ gap: 10 }}>
          <Text style={{ color: '#cbd5e1', fontSize: 14 }}>
            Multi-paragraph content to test spacing and wrapping. Keep styles in
            the UI package and business logic outside.
          </Text>
          <Text style={{ color: '#cbd5e1', fontSize: 14 }}>
            Second paragraph with slightly longer text to validate line-height
            and padding within the card body.
          </Text>
        </View>
      </Card>
    ),
  },
};
