import { useMemo } from 'react';
import { DayItinerary } from '@/types/travel';
import { calculateDistance, getMidpoint } from '@/lib/map-utils';

export interface TransportSegment {
  id: string;
  type: string;
  position: [number, number];
  transport: {
    type: string;
    duration?: string;
    distance?: string;
    notes?: string;
  };
}

export const useTransportSegments = (
  dayItineraries: DayItinerary[]
): TransportSegment[] => {
  return useMemo(() => {
    // Toujours retourner les segments, l'affichage sera géré par le composant TransportMarkers

    return dayItineraries
      .sort((a, b) => a.order - b.order)
      .filter(day => day.transportToNext)
      .map((day) => {
        const nextDay = dayItineraries.find(d => d.order === day.order + 1);
        if (!nextDay || !day.transportToNext) return null;

        const startCoord: [number, number] = [day.destination.coordinates.lng, day.destination.coordinates.lat];
        const endCoord: [number, number] = [nextDay.destination.coordinates.lng, nextDay.destination.coordinates.lat];

        // Vérifier si c'est la même destination (séjour prolongé dans une ville)
        const sameDestination = day.destination.id === nextDay.destination.id;
        if (sameDestination) return null; // Pas d'icône pour les séjours dans la même ville

        // Calculer la distance et filtrer les transports trop courts (< 5km)
        const distance = calculateDistance(startCoord, endCoord);
        if (distance < 5) return null; // Ne pas afficher les icônes pour les déplacements très courts

        const midpoint = getMidpoint(startCoord, endCoord);

        return {
          id: `transport-${day.order}`,
          type: day.transportToNext.type,
          position: midpoint,
          transport: day.transportToNext
        };
      })
      .filter(Boolean) as TransportSegment[];
  }, [dayItineraries]);
};
