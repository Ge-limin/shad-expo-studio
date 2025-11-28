import type { ComponentProps } from 'react';
import React from 'react';

import { View } from 'react-native';

import type { TextField } from './text-field';

type TextFieldProps = ComponentProps<typeof TextField>;

export const storyMeta = {
  componentName: 'TextField',
  title: 'auto/TextField (native)',
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ flex: 1, padding: 24, backgroundColor: '#0f172a' }}>
        <Story />
      </View>
    ),
  ],
};

export const storyExamples: Record<string, { args: TextFieldProps }> = {
  Default: {
    args: {
      label: 'Label',
      placeholder: 'Type here',
      helperText: 'Helper copy',
      value: 'Sample',
    },
  },
  Error: {
    args: {
      label: 'Label',
      placeholder: 'Type here',
      errorText: 'This field is required',
      value: '',
    },
  },
};
