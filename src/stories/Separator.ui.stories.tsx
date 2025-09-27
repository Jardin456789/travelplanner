import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Separator } from '@/components/ui/separator';

const meta: Meta<typeof Separator> = {
  title: 'UI/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: "Séparateur horizontal/vertical basé sur Radix.",
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
    decorative: {
      control: 'boolean',
    },
  },
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Playground: Story = {
  render: (args) => (
    <div className="flex flex-col items-stretch gap-4 w-[320px]">
      <div>Au-dessus</div>
      <Separator {...args} />
      <div>En-dessous</div>
    </div>
  ),
};


