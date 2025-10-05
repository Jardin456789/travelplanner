// Exemples d'utilisation du store Zustand dans l'app

import { useItineraryStore } from '@/stores/itineraryStore';
import type { DayItinerary } from '@/types/travel';
import { useReorderSteps } from '@/hooks/useTravelQueries';
import { toast } from '@/components/ui/toaster';

// === UTILISATION DANS LES COMPOSANTS ===

// 1. Gestion de l'itinéraire sélectionné
export function useCurrentItineraryState() {
  const { currentItinerary, setCurrentItinerary } = useItineraryStore();

  const selectItinerary = () => {
    // Ici on pourrait fetch l'itinéraire depuis TanStack Query
    // puis mettre à jour le store
    setCurrentItinerary(null);
  };

  return { currentItinerary, selectItinerary };
}

// 2. Gestion des étapes sélectionnées
export function useStepSelection() {
  const { selectedStep, setSelectedStep } = useItineraryStore();

  const selectStep = (step: DayItinerary) => {
    setSelectedStep(step);
    // Ici on pourrait également mettre à jour la carte, etc.
  };

  return { selectedStep, selectStep };
}

// 3. Gestion des filtres de recherche
export function useSearchFilters() {
  const {
    searchQuery,
    selectedTags,
    dateRange,
    setSearchQuery,
    toggleTag,
    setDateRange,
    resetFilters
  } = useItineraryStore();

  const applyFilters = (steps: DayItinerary[]) => {
    return steps.filter(step => {
      // Logique de filtrage basée sur les critères
      const matchesQuery = !searchQuery ||
        step.destination.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTags = selectedTags.length === 0 ||
        step.activities.some(activity =>
          selectedTags.some(tag => activity.category?.includes(tag))
        );

      const matchesDate = !dateRange.start || !dateRange.end ||
        (new Date(step.date) >= dateRange.start && new Date(step.date) <= dateRange.end);

      return matchesQuery && matchesTags && matchesDate;
    });
  };

  return {
    searchQuery,
    selectedTags,
    dateRange,
    setSearchQuery,
    toggleTag,
    setDateRange,
    resetFilters,
    applyFilters
  };
}

// 4. Gestion des mois expandus (UI state)
export function useMonthExpansion() {
  const { expandedMonths, toggleMonthExpansion, expandMonth } = useItineraryStore();

  const isMonthExpanded = (monthKey: string) => expandedMonths.has(monthKey);

  const toggleMonth = (monthKey: string) => {
    toggleMonthExpansion(monthKey);
    // Ici on pourrait scroller vers le mois, etc.
  };

  return { expandedMonths, isMonthExpanded, toggleMonth, expandMonth };
}

// === EXEMPLE D'ACTION COMPLEXE ===

export function useReorderItinerary() {
  const { reorderSteps, currentItinerary } = useItineraryStore();
  const reorderStepsMutation = useReorderSteps();

  const handleReorder = async (draggedSteps: DayItinerary[]) => {
    try {
      // 1. Mettre à jour l'ordre localement (optimistic update)
      reorderSteps(draggedSteps);

      // 2. Sauvegarder sur le serveur via TanStack Query
      await reorderStepsMutation.mutateAsync({
        steps: draggedSteps.map(step => ({
          id: step.id!,
          order: step.order
        }))
      });

      // 3. Notification de succès
      toast.success('Ordre des étapes mis à jour');

    } catch {
      // 4. Rollback en cas d'erreur
      if (currentItinerary) {
        reorderSteps(currentItinerary.days);
      }
      toast.error('Erreur lors de la réorganisation');
    }
  };

  return { handleReorder };
}

// === SELECTORS OPTIMISÉS ===

export const useItineraryStats = () =>
  useItineraryStore((state) => ({
    totalSteps: state.currentItinerary?.days.length || 0,
    completedSteps: state.currentItinerary?.days.filter(step =>
      new Date(step.date) < new Date()
    ).length || 0,
    upcomingSteps: state.currentItinerary?.days.filter(step =>
      new Date(step.date) >= new Date()
    ).length || 0,
  }));

export const useTransportStats = () =>
  useItineraryStore((state) => {
    const transports = state.currentItinerary?.days
      .map(step => step.transportToNext?.type)
      .filter(Boolean) || [];

    return {
      totalTransports: transports.length,
      transportTypes: transports.reduce((acc, type) => {
        acc[type!] = (acc[type!] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
  });
