import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Destination, DayItinerary, Itinerary } from '@/types/travel';
import { CACHE_TIMES } from '@/lib/query-config';

// Query Keys
export const queryKeys = {
  itineraries: ['itineraries'] as const,
  itinerary: (id: string) => ['itineraries', id] as const,
  destinations: ['destinations'] as const,
  steps: (itineraryId: string) => ['steps', itineraryId] as const,
  step: (id: string) => ['step', id] as const,
};

// Hooks pour les requêtes de données
export function useItineraries() {
  return useQuery({
    queryKey: queryKeys.itineraries,
    queryFn: async (): Promise<Itinerary[]> => {
      const response = await fetch('/api/itineraries');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des itinéraires');
      }
      return response.json();
    },
    staleTime: CACHE_TIMES.DYNAMIC,
  });
}

export function useItinerary(id: number) {
  return useQuery({
    queryKey: queryKeys.itinerary(id.toString()),
    queryFn: async (): Promise<Itinerary> => {
      const response = await fetch(`/api/itineraries/${id}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de l\'itinéraire');
      }
      return response.json();
    },
    enabled: !!id,
    staleTime: CACHE_TIMES.DYNAMIC,
  });
}

export function useDestinations() {
  return useQuery({
    queryKey: queryKeys.destinations,
    queryFn: async (): Promise<Destination[]> => {
      const response = await fetch('/api/destinations');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des destinations');
      }
      return response.json();
    },
    staleTime: CACHE_TIMES.STATIC,
  });
}

export function useSteps(itineraryId?: number) {
  return useQuery({
    queryKey: itineraryId ? queryKeys.steps(itineraryId.toString()) : ['steps'],
    queryFn: async (): Promise<DayItinerary[]> => {
      if (!itineraryId) return [];
      const response = await fetch(`/api/steps?itineraryId=${itineraryId}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des étapes');
      }
      return response.json();
    },
    enabled: !!itineraryId,
    staleTime: CACHE_TIMES.DYNAMIC,
  });
}

export function useStep(id: number) {
  return useQuery({
    queryKey: queryKeys.step(id.toString()),
    queryFn: async (): Promise<DayItinerary> => {
      const response = await fetch(`/api/steps/${id}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de l\'étape');
      }
      return response.json();
    },
    enabled: !!id,
    staleTime: CACHE_TIMES.REALTIME,
  });
}

// Mutations avec invalidation automatique
export function useCreateItinerary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      description?: string;
      startDate: string;
      endDate: string;
      totalBudget?: number;
      currency?: string;
    }): Promise<Itinerary> => {
      const response = await fetch('/api/itineraries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'itinéraire');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.itineraries });
    },
  });
}

export function useCreateDestination() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      description?: string;
      coordinates: { lat: number; lng: number };
      address?: string;
      category?: string;
    }): Promise<Destination> => {
      const response = await fetch('/api/destinations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la destination');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.destinations });
    },
  });
}

export function useUpdateStep() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id?: number;
      itineraryId: number;
      date: string;
      destinationId: number;
      notes?: string;
      order: number;
      activities: Array<{
        id: string;
        title: string;
        description?: string;
        destinationId: string;
        startTime?: string;
        endTime?: string;
        category?: string;
      }>;
      bikeSegment?: {
        trajet: string;
        distance_km: number;
        route: string;
        difficulte: string;
        points_interet: string[];
        reseau_eau: string;
        coordonnees?: Record<string, number[] | undefined>;
      };
      transportToNext?: {
        type: string;
        duration?: string;
        distance?: string;
        notes?: string;
        routeType?: string;
        difficulty?: string;
        pointsOfInterest?: string;
        networkAndWater?: string;
      };
    }): Promise<DayItinerary> => {
      const method = data.id ? 'PUT' : 'POST';
      const url = data.id ? `/api/steps/${data.id}` : '/api/steps';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de l\'étape');
      }

      return response.json();
    },
    onSuccess: (result, variables) => {
      // Invalider les queries liées
      queryClient.invalidateQueries({
        queryKey: queryKeys.steps(variables.itineraryId.toString())
      });
      if (variables.id) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.step(variables.id.toString())
        });
      }
    },
  });
}

export function useDeleteStep() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<{ success: boolean }> => {
      const response = await fetch(`/api/steps/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'étape');
      }

      return response.json();
    },
    onSuccess: (_, deletedId) => {
      // Invalider et supprimer du cache
      queryClient.removeQueries({ queryKey: queryKeys.step(deletedId.toString()) });
      // Les autres queries seront invalidées automatiquement
    },
  });
}

export function useReorderSteps() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      steps: Array<{
        id: number;
        order: number;
      }>;
    }): Promise<{ success: boolean }> => {
      const response = await fetch('/api/steps', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Erreur lors du réordonnancement des étapes');
      }

      return { success: true };
    },
    onSuccess: () => {
      // Invalider toutes les queries de steps (on ne sait pas quel itinéraire)
      queryClient.invalidateQueries({ queryKey: ['steps'] });
    },
  });
}

// Hook personnalisé pour les données combinées
export function useTravelData(itineraryId?: number) {
  const destinationsQuery = useDestinations();
  const stepsQuery = useSteps(itineraryId);

  return {
    destinations: destinationsQuery.data || [],
    dayItineraries: stepsQuery.data || [],
    loading: destinationsQuery.isLoading || stepsQuery.isLoading,
    error: destinationsQuery.error || stepsQuery.error,
  };
}
