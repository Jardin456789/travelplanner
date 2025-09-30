'use client';

import { useMemo } from 'react';
import { useQuery } from 'convex/react';
import type { Destination, DayItinerary, Itinerary } from '@/types/travel';
import type { Doc } from '../../convex/_generated/dataModel';
import { api } from '../../convex/_generated/api';

interface UseTravelDataResult {
  loading: boolean;
  destinations: Destination[];
  dayItineraries: DayItinerary[];
  itinerary: Itinerary | null;
}

function mapDestination(doc: Doc<'destinations'>): Destination {
  return {
    id: doc._id,
    name: doc.name,
    description: doc.description ?? undefined,
    coordinates: doc.coordinates,
    address: doc.address ?? undefined,
    category: doc.category ?? undefined,
  };
}

export function useTravelData(): UseTravelDataResult {
  const destinationDocs = useQuery(api.destinations.list);
  const itineraryDocs = useQuery(api.itineraries.list);

  const selectedItinerary = itineraryDocs?.[0] ?? null;

  const stepDocs = useQuery(
    api.steps.listByItinerary,
    selectedItinerary ? { itineraryId: selectedItinerary._id } : undefined
  );

  return useMemo(() => {
    if (!destinationDocs || !selectedItinerary || !stepDocs) {
      return {
        loading: true,
        destinations: [],
        dayItineraries: [],
        itinerary: null,
      };
    }

    const destinations = destinationDocs.map(mapDestination);
    const destinationMap = new Map(destinations.map((destination) => [destination.id, destination]));

    const dayItineraries: DayItinerary[] = stepDocs
      .map((step) => {
        const destination = destinationMap.get(step.destinationId);
        if (!destination) {
          return null;
        }

        return {
          date: step.date,
          destination,
          activities: step.activities,
          notes: step.notes ?? undefined,
          order: step.order,
          transportToNext: step.transportToNext ?? undefined,
          bikeSegment: step.bikeSegment ?? undefined,
        } satisfies DayItinerary;
      })
      .filter((value): value is DayItinerary => value !== null)
      .sort((a, b) => a.order - b.order);

    const itinerary: Itinerary = {
      id: selectedItinerary._id,
      title: selectedItinerary.title,
      description: selectedItinerary.description ?? undefined,
      startDate: selectedItinerary.startDate,
      endDate: selectedItinerary.endDate,
      destinations,
      days: dayItineraries,
      totalBudget: selectedItinerary.totalBudget ?? undefined,
      currency: selectedItinerary.currency ?? undefined,
      createdAt: new Date(selectedItinerary._creationTime).toISOString(),
      updatedAt: new Date(selectedItinerary._creationTime).toISOString(),
    };

    return {
      loading: false,
      destinations,
      dayItineraries,
      itinerary,
    };
  }, [destinationDocs, selectedItinerary, stepDocs]);
}
