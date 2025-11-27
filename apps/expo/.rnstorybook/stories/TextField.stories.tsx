import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { TextField } from '@studio/ui/native';

const meta = {
  title: 'shad/TextField (native)',
  component: TextField,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, padding: 24, backgroundColor: '#0f172a' }}>
        <Story />
      </View>
    ),
  ],
  args: {
    label: 'Label',
    placeholder: 'Type here',
    helperText: 'Helper copy',
    value: 'Sample',
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    helperText: undefined,
    errorText: 'This field is required',
  },
};
