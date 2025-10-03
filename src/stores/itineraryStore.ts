import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { DayItinerary, Destination, Itinerary, TransportType } from '@/types/travel';

interface ItineraryState {
  // État principal
  currentItinerary: Itinerary | null;
  selectedStep: DayItinerary | null;
  selectedDestination: Destination | null;

  // États UI
  isMapView: boolean;
  isReorderMode: boolean;
  expandedMonths: Set<string>;
  showTransportSelector: boolean;

  // Filtres et recherche
  searchQuery: string;
  selectedTags: string[];
  dateRange: { start?: Date; end?: Date };

  // Actions
  setCurrentItinerary: (itinerary: Itinerary | null) => void;
  setSelectedStep: (step: DayItinerary | null) => void;
  setSelectedDestination: (destination: Destination | null) => void;

  toggleMapView: () => void;
  setReorderMode: (mode: boolean) => void;
  toggleMonthExpansion: (monthKey: string) => void;
  expandMonth: (monthKey: string) => void;

  setSearchQuery: (query: string) => void;
  toggleTag: (tag: string) => void;
  clearTags: () => void;
  setDateRange: (range: { start?: Date; end?: Date }) => void;

  // Actions complexes
  updateStepTransport: (stepId: number, transportType: TransportType) => void;
  reorderSteps: (steps: DayItinerary[]) => void;
  resetFilters: () => void;
}

export const useItineraryStore = create<ItineraryState>()(
  devtools(
    persist(
      (set, get) => ({
        // État initial
        currentItinerary: null,
        selectedStep: null,
        selectedDestination: null,

        isMapView: false,
        isReorderMode: false,
        expandedMonths: new Set(),
        showTransportSelector: false,

        searchQuery: '',
        selectedTags: [],
        dateRange: {},

        // Actions de base
        setCurrentItinerary: (itinerary) => set({ currentItinerary: itinerary }),
        setSelectedStep: (step) => set({ selectedStep: step }),
        setSelectedDestination: (destination) => set({ selectedDestination: destination }),

        toggleMapView: () => set((state) => ({ isMapView: !state.isMapView })),
        setReorderMode: (mode) => set({ isReorderMode: mode }),
        toggleMonthExpansion: (monthKey) =>
          set((state) => {
            const newExpanded = new Set(state.expandedMonths);
            if (newExpanded.has(monthKey)) {
              newExpanded.delete(monthKey);
            } else {
              newExpanded.add(monthKey);
            }
            return { expandedMonths: newExpanded };
          }),
        expandMonth: (monthKey) =>
          set((state) => ({
            expandedMonths: new Set([...state.expandedMonths, monthKey])
          })),

        setSearchQuery: (query) => set({ searchQuery: query }),
        toggleTag: (tag) =>
          set((state) => {
            const newTags = state.selectedTags.includes(tag)
              ? state.selectedTags.filter(t => t !== tag)
              : [...state.selectedTags, tag];
            return { selectedTags: newTags };
          }),
        clearTags: () => set({ selectedTags: [] }),
        setDateRange: (range) => set({ dateRange: range }),

        // Actions complexes
        updateStepTransport: (stepId, transportType) =>
          set((state) => {
            if (!state.currentItinerary) return state;

            const updatedDays = state.currentItinerary.days.map(day =>
              day.id === stepId
                ? {
                    ...day,
                    transportToNext: {
                      ...day.transportToNext,
                      type: transportType
                    }
                  }
                : day
            );

            return {
              currentItinerary: {
                ...state.currentItinerary,
                days: updatedDays
              }
            };
          }),

        reorderSteps: (steps) =>
          set((state) => {
            if (!state.currentItinerary) return state;

            const reorderedDays = steps.map((step, index) => ({
              ...step,
              order: index + 1
            }));

            return {
              currentItinerary: {
                ...state.currentItinerary,
                days: reorderedDays
              }
            };
          }),

        resetFilters: () =>
          set({
            searchQuery: '',
            selectedTags: [],
            dateRange: {}
          }),
      }),
      {
        name: 'itinerary-store',
        partialize: (state) => ({
          isMapView: state.isMapView,
          expandedMonths: Array.from(state.expandedMonths),
          selectedTags: state.selectedTags,
          dateRange: state.dateRange,
        }),
      }
    ),
    {
      name: 'itinerary-store',
    }
  )
);

// Selectors pour optimiser les performances
export const useCurrentItinerary = () => useItineraryStore((state) => state.currentItinerary);
export const useSelectedStep = () => useItineraryStore((state) => state.selectedStep);
export const useExpandedMonths = () => useItineraryStore((state) => state.expandedMonths);
export const useSearchFilters = () => useItineraryStore((state) => ({
  searchQuery: state.searchQuery,
  selectedTags: state.selectedTags,
  dateRange: state.dateRange,
}));
