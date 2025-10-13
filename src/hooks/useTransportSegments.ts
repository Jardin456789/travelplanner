import { useMemo } from 'react';
import { DayItinerary } from '@/types/travel';
import { calculateDistance, getMidpoint, sortStepsChronologically } from '@/lib/map-utils';

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

export const useTransportSegments = (dayItineraries: DayItinerary[]): TransportSegment[] => {
  return useMemo(() => {
    const orderedSteps = sortStepsChronologically(dayItineraries);
    const segments: TransportSegment[] = [];

    for (let index = 0; index < orderedSteps.length - 1; index += 1) {
      const currentStep = orderedSteps[index];
      const nextStep = orderedSteps[index + 1];

      if (!currentStep.transportToNext) {
        continue;
      }

      const startCoordinates = currentStep.destination?.coordinates;
      const endCoordinates = nextStep.destination?.coordinates;

      if (!startCoordinates || !endCoordinates) {
        continue;
      }

      const sameDestination = currentStep.destination.id === nextStep.destination.id;
      if (sameDestination) {
        continue;
      }

      const startCoord: [number, number] = [startCoordinates.lng, startCoordinates.lat];
      const endCoord: [number, number] = [endCoordinates.lng, endCoordinates.lat];
      const distance = calculateDistance(startCoord, endCoord);
      if (distance < 5) {
        continue;
      }

      const midpoint = getMidpoint(startCoord, endCoord);

      segments.push({
        id: `transport-${currentStep.order}`,
        type: currentStep.transportToNext.type,
        position: midpoint,
        transport: currentStep.transportToNext,
      });
    }

    return segments;
  }, [dayItineraries]);
};
