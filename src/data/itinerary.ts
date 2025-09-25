import { Destination, DayItinerary, Itinerary } from '@/types/travel';

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Skopje',
    description: 'Capitale de la Macédoine du Nord',
    coordinates: { lat: 41.9981, lng: 21.4254 },
    address: 'Skopje, Macédoine du Nord',
    category: 'city'
  },
  {
    id: '2',
    name: 'Istanbul',
    description: 'Métropole entre Europe et Asie',
    coordinates: { lat: 41.0082, lng: 28.9784 },
    address: 'Istanbul, Turquie',
    category: 'city'
  },
  {
    id: '3',
    name: 'Ankara',
    description: 'Capitale de la Turquie',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    address: 'Ankara, Turquie',
    category: 'city'
  }
];

export const dayItineraries: DayItinerary[] = [
  {
    date: '2024-07-15',
    destination: destinations[0], // Skopje
    activities: [
      {
        id: '1',
        title: 'Visite du Vieux Bazar',
        description: 'Découverte du marché traditionnel',
        destinationId: '1',
        startTime: '10:00',
        endTime: '12:00',
        category: 'sightseeing'
      },
      {
        id: '2',
        title: 'Musée de Macédoine',
        description: 'Histoire et culture macédonienne',
        destinationId: '1',
        startTime: '14:00',
        endTime: '16:00',
        category: 'museum'
      }
    ],
    notes: 'Arrivée en ville, installation à l\'hôtel',
    order: 1
  },
  {
    date: '2024-07-16',
    destination: destinations[1], // Istanbul
    activities: [
      {
        id: '3',
        title: 'Visite de Sainte-Sophie',
        description: 'Chef-d\'œuvre byzantin',
        destinationId: '2',
        startTime: '09:00',
        endTime: '11:00',
        category: 'sightseeing'
      },
      {
        id: '4',
        title: 'Bosphore en bateau',
        description: 'Croisière sur le détroit',
        destinationId: '2',
        startTime: '15:00',
        endTime: '17:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Voyage en bus depuis Skopje (environ 8h)',
    order: 2
  },
  {
    date: '2024-07-17',
    destination: destinations[2], // Ankara
    activities: [
      {
        id: '5',
        title: 'Musée des Civilisations Anatoliennes',
        description: 'Histoire ancienne de l\'Anatolie',
        destinationId: '3',
        startTime: '10:00',
        endTime: '13:00',
        category: 'museum'
      },
      {
        id: '6',
        title: 'Citadelle d\'Ankara',
        description: 'Vue panoramique sur la ville',
        destinationId: '3',
        startTime: '15:00',
        endTime: '17:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Voyage en train depuis Istanbul (environ 4h)',
    order: 3
  }
];

export const itinerary: Itinerary = {
  id: '1',
  title: 'Balkans Express',
  description: 'Voyage découverte des Balkans et Turquie',
  startDate: '2024-07-15',
  endDate: '2024-07-17',
  destinations: destinations,
  days: dayItineraries,
  totalBudget: 1800,
  currency: 'EUR',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
