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
  Disabled: {
    render: function Render() {
      return (
        <ToggleRow
          label="Disabled control"
          description="Used for regression when toggles are locked."
          value={false}
          onValueChange={() => {}}
          style={{ opacity: 0.5 }}
        />
      );
    },
  },
  LongCopy: {
    render: function Render() {
      const [value, setValue] = useState(false);
      return (
        <ToggleRow
          label="Very long label to test wrapping and spacing in the row component"
          description="Long description that spans multiple lines to ensure layout remains aligned between text and switch."
          value={value}
          onValueChange={setValue}
        />
      );
    },
  },
  OffByDefault: {
    render: function Render() {
      const [value, setValue] = useState(false);
      return (
        <ToggleRow
          label="Off by default"
          description="Start off and toggle to on."
          value={value}
          onValueChange={setValue}
        />
      );
    },
  },
};
