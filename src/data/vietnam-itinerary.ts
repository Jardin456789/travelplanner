import { DayItinerary } from '@/types/travel';
import { destinations } from './destinations';

export const vietnamDayItineraries: DayItinerary[] = [
  // === VIETNAM ===
  {
    date: '2025-11-15',
    destination: destinations[23], // Hanoi
    activities: [
      {
        id: '64',
        title: 'Arrivée à Hanoi',
        description: 'Installation dans la capitale vietnamienne',
        destinationId: '24',
        startTime: '10:00',
        endTime: '12:00',
        category: 'arrival'
      }
    ],
    notes: 'Arrivée au Vietnam',
    order: 46,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration de Hanoi'
    }
  }
  // ... autres étapes vietnamiennes à ajouter plus tard
];
