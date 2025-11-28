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
};
