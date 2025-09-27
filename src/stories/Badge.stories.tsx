import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from '@/components/ui/badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Badge pour affichage d\u2019états ou de labels. Basé sur Tailwind et class-variance-authority.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'success',
        'warning',
        'info',
        'outline',
        'ghost',
      ],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg'],
    },
    shape: {
      control: 'inline-radio',
      options: ['pill', 'square'],
    },
    asChild: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'default',
    shape: 'pill',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      <Badge {...args} variant="default">Default</Badge>
      <Badge {...args} variant="secondary">Secondary</Badge>
      <Badge {...args} variant="destructive">Destructive</Badge>
      <Badge {...args} variant="success">Success</Badge>
      <Badge {...args} variant="warning">Warning</Badge>
      <Badge {...args} variant="info">Info</Badge>
      <Badge {...args} variant="outline">Outline</Badge>
      <Badge {...args} variant="ghost">Ghost</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Badge {...args} size="xs">XS</Badge>
      <Badge {...args} size="sm">SM</Badge>
      <Badge {...args} size="default">Default</Badge>
      <Badge {...args} size="lg">LG</Badge>
    </div>
  ),
};

export const Shapes: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Badge {...args} shape="pill">Pill</Badge>
      <Badge {...args} shape="square">Square</Badge>
    </div>
  ),
};


