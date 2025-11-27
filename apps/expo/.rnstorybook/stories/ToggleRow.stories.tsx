import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { ToggleRow } from '@studio/ui/native';

const meta = {
  title: 'shad/ToggleRow (native)',
  component: ToggleRow,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, padding: 24, backgroundColor: '#0f172a' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof ToggleRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(true);
    return (
      <ToggleRow
        {...args}
        value={value}
        onValueChange={setValue}
        label="Toggle"
        description="Enable something useful"
      />
    );
  },
};
