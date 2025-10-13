import { useMemo } from 'react';
import { DayItinerary, Destination } from '@/types/travel';
import { sortStepsChronologically } from '@/lib/map-utils';

export interface DestinationGroup {
  destination: Destination;
  days: DayItinerary[];
  startOrder: number;
  endOrder: number;
}

export const useDestinationGroups = (dayItineraries: DayItinerary[]): DestinationGroup[] => {
  return useMemo(() => {
    const orderedSteps = sortStepsChronologically(dayItineraries);
    const groups: DestinationGroup[] = [];
    let currentGroup: DayItinerary[] = [];

    for (let i = 0; i < orderedSteps.length; i++) {
      const day = orderedSteps[i];

      if (currentGroup.length === 0) {
        // Démarrer un nouveau groupe
        currentGroup = [day];
      } else {
        const lastDay = currentGroup[currentGroup.length - 1];

        // Vérifier si cette étape est consécutive et dans la même destination
        if (lastDay.destination.id === day.destination.id && lastDay.order + 1 === day.order) {
          // Ajouter au groupe existant
          currentGroup.push(day);
        } else {
          // Fermer le groupe actuel et en démarrer un nouveau
          groups.push({
            destination: lastDay.destination,
            days: [...currentGroup],
            startOrder: currentGroup[0].order,
            endOrder: currentGroup[currentGroup.length - 1].order,
          });
          currentGroup = [day];
        }
      }
    }

    // Fermer le dernier groupe
    if (currentGroup.length > 0) {
      groups.push({
        destination: currentGroup[0].destination,
        days: [...currentGroup],
        startOrder: currentGroup[0].order,
        endOrder: currentGroup[currentGroup.length - 1].order,
      });
    }

    return groups;
  }, [dayItineraries]);
};
