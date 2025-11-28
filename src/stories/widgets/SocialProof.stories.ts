import type { Meta, StoryObj } from '@storybook/react';

import Component from '~/components/widgets/SocialProof';
import { socialProofHome as mockData } from '~/shared/data/pages/home.data';

const meta: Meta<typeof Component> = {
  title: 'Widgets/SocialProof',
  component: Component,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    ...mockData,
  },
};

export const WithBackground: Story = {
  args: {
    ...mockData,
    hasBackground: true,
  },
};

export const Mobile: Story = {
  args: {
    ...mockData,
  },
  parameters: {
    viewport: {
      defaultViewport: 'SMALL',
    },
  },
};
