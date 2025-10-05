import type { DayItinerary, Itinerary } from '@/types/travel';
import { destinations } from './destinations';
import { balkansDayItineraries } from './balkans-itinerary';
import { turkeyDayItineraries } from './turkey-itinerary';
import { kazakhstanDayItineraries } from './kazakhstan-itinerary';
import { chinaDayItineraries } from './china-itinerary';
import { vietnamDayItineraries } from './vietnam-itinerary';
import { koreaDayItineraries } from './korea-itinerary';

// Compatibilité avec l'ancien export "destinations"
export { destinations };

// Les données d'itinéraire sont désormais chargées via Neon.
// On conserve des tableaux vides pour ne pas exposer d'informations sensibles
// et éviter les erreurs sur les imports historiques.
export const dayItineraries: DayItinerary[] = [
  ...balkansDayItineraries,
  ...turkeyDayItineraries,
  ...kazakhstanDayItineraries,
  ...chinaDayItineraries,
  ...vietnamDayItineraries,
  ...koreaDayItineraries,
];

export const itinerary: Itinerary = {
  id: 0,
  title: 'Itinéraire fourni par la base de données',
  description: 'Ce placeholder évite de publier des données sensibles dans le dépôt public.',
  startDate: '1970-01-01',
  endDate: '1970-01-01',
  destinations,
  days: dayItineraries,
  createdAt: new Date(0).toISOString(),
  updatedAt: new Date(0).toISOString(),
};
