import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: "Carte avec slots (Header/Content/Footer/Action) pour compositions complexes.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Itinéraire Balkans</CardTitle>
        <CardDescription>14 jours / 6 villes</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">Exporter</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Découvrez l&apos;itinéraire détaillé, les transports et les activités recommandées.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Voir les détails</Button>
      </CardFooter>
    </Card>
  ),
};


