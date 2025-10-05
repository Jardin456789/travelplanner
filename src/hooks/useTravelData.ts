'use client';

import { useMemo } from 'react';
import { useItineraries, useDestinations, useSteps } from './useTravelQueries';
import type { Destination, DayItinerary, Itinerary } from '@/types/travel';

interface UseTravelDataResult {
  loading: boolean;
  destinations: Destination[];
  dayItineraries: DayItinerary[];
  itinerary: Itinerary | null;
}

function mapDestination(doc: Destination): Destination {
  return {
    id: doc.id,
    name: doc.name,
    description: doc.description,
    coordinates: doc.coordinates,
    address: doc.address,
    category: doc.category,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export function useTravelData(): UseTravelDataResult {
  const destinationsQuery = useDestinations();
  const itinerariesQuery = useItineraries();

  const selectedItinerary = itinerariesQuery.data?.[0] ?? null;

  const stepsQuery = useSteps(selectedItinerary?.id);

  return useMemo(() => {
    if (!destinationsQuery.data || !selectedItinerary || !stepsQuery.data) {
      return {
        loading: destinationsQuery.isLoading || itinerariesQuery.isLoading || stepsQuery.isLoading,
        destinations: [],
        dayItineraries: [],
        itinerary: null,
      };
    }

    const destinations = destinationsQuery.data.map(mapDestination);
    const destinationMap = new Map(destinations.map((destination) => [destination.id, destination]));

    const dayItineraries = stepsQuery.data
      .reduce<DayItinerary[]>((acc, step) => {
        if (typeof step.destinationId !== 'number') {
          return acc;
        }

        const destination = destinationMap.get(step.destinationId);
        if (!destination) {
          return acc;
        }

        acc.push({
          id: step.id,
          itineraryId: step.itineraryId,
          date: step.date,
          destinationId: step.destinationId,
          destination,
          activities: step.activities,
          notes: step.notes,
          order: step.order,
          transportToNext: step.transportToNext,
          bikeSegment: step.bikeSegment,
          createdAt: step.createdAt,
          updatedAt: step.updatedAt,
        });

        return acc;
      }, [])
      .sort((a, b) => a.order - b.order);

    const itinerary: Itinerary = {
      id: selectedItinerary.id,
      title: selectedItinerary.title,
      description: selectedItinerary.description,
      startDate: selectedItinerary.startDate,
      endDate: selectedItinerary.endDate,
      destinations,
      days: dayItineraries,
      totalBudget: selectedItinerary.totalBudget,
      currency: selectedItinerary.currency,
      createdAt: selectedItinerary.createdAt,
      updatedAt: selectedItinerary.updatedAt,
    };

    return {
      loading: false,
      destinations,
      dayItineraries,
      itinerary,
    };
  }, [destinationsQuery.data, selectedItinerary, stepsQuery.data, destinationsQuery.isLoading, itinerariesQuery.isLoading, stepsQuery.isLoading]);
}
