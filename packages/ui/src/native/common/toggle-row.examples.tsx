import React, { useState } from 'react';

import { View } from 'react-native';

import { ToggleRow } from './toggle-row';

export const storyMeta = {
  componentName: 'ToggleRow',
  title: 'auto/ToggleRow (native)',
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ flex: 1, padding: 24, backgroundColor: '#0f172a' }}>
        <Story />
      </View>
    ),
  ],
};

export const storyExamples = {
  Default: {
    render: function Render() {
      const [value, setValue] = useState(true);
      return (
        <ToggleRow
          label="Notifications"
          description="Send me updates about component changes"
          value={value}
          onValueChange={setValue}
        />
      );
    },
  },
};
