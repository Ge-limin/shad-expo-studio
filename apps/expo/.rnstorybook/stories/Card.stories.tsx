import type { Meta, StoryObj } from '@storybook/react-native';
import { Text, View } from 'react-native';

import { Button, Card } from '../../components/ui';

const meta = {
  title: 'shad/Card (native)',
  component: Card,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, padding: 24, backgroundColor: '#0f172a' }}>
        <Story />
      </View>
    ),
  ],
  args: {
    title: 'Card title',
    description: 'Supporting copy that fits the shad style',
    children: <Text style={{ color: '#e2e8f0' }}>Body content goes here.</Text>,
    footer: <Button label="Call to action" onPress={() => {}} />,
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoFooter: Story = {
  args: {
    footer: undefined,
  },
};
