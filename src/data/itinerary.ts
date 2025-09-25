import { Itinerary } from '@/types/travel';
import { destinations } from './destinations';
import { balkansDayItineraries } from './balkans-itinerary';
import { turkeyDayItineraries } from './turkey-itinerary';
import { kazakhstanDayItineraries } from './kazakhstan-itinerary';
import { chinaDayItineraries } from './china-itinerary';
import { vietnamDayItineraries } from './vietnam-itinerary';
import { koreaDayItineraries } from './korea-itinerary';

// Réexporter destinations pour la compatibilité
export { destinations };

// Combiner tous les itinéraires dans l'ordre
export const dayItineraries = [
  ...balkansDayItineraries,
  ...turkeyDayItineraries,
  ...kazakhstanDayItineraries,
  ...chinaDayItineraries,
  ...vietnamDayItineraries,
  ...koreaDayItineraries
].sort((a, b) => a.order - b.order);

export const itinerary: Itinerary = {
  id: '1',
  title: 'Eva & David Marseille à Tokyo à vélo',
  description: 'Voyage épique de Marseille à Tokyo à vélo : traversée de l\'Europe, Asie Centrale, Chine et Corée du Sud',
  startDate: '2025-09-18',
  endDate: '2026-03-05',
  destinations: destinations,
  days: dayItineraries,
  totalBudget: 5200,
  currency: 'EUR',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
