import type { ComponentProps } from 'react';
import React from 'react';

import { View } from 'react-native';

import type { Button } from './button';

type ButtonProps = ComponentProps<typeof Button>;

export const storyMeta = {
  componentName: 'Button',
  title: 'auto/Button (native)',
  decorators: [
    (Story: React.ComponentType) => (
      <View
        style={{
          flex: 1,
          padding: 24,
          backgroundColor: '#0f172a',
          gap: 12,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export const storyExamples: Record<string, { args: ButtonProps }> = {
  Solid: {
    args: { label: 'Solid button', variant: 'solid', size: 'md' },
  },
  Outline: {
    args: { label: 'Outline button', variant: 'outline', size: 'md' },
  },
  Small: {
    args: { label: 'Small button', size: 'sm' },
  },
  Large: {
    args: { label: 'Large button', size: 'lg' },
  },
  Disabled: {
    args: { label: 'Disabled', disabled: true },
  },
};
