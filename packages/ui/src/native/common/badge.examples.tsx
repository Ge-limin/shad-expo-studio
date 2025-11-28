import type { ComponentProps } from 'react';
import React from 'react';

import { View } from 'react-native';

import type { Badge } from './badge';

type BadgeProps = ComponentProps<typeof Badge>;

export const storyMeta = {
  componentName: 'Badge',
  title: 'auto/Badge (native)',
  decorators: [
    (Story: React.ComponentType) => (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          backgroundColor: '#0f172a',
          gap: 12,
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export const storyExamples: Record<string, { args: BadgeProps }> = {
  Neutral: { args: { label: 'Neutral', tone: 'neutral' } },
  Info: { args: { label: 'Info', tone: 'info' } },
  Success: { args: { label: 'Success', tone: 'success' } },
  Warning: { args: { label: 'Warning', tone: 'warning' } },
  Danger: { args: { label: 'Danger', tone: 'danger' } },
};
