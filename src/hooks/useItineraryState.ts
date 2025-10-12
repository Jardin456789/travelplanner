import { useState, useEffect, useRef, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { DayItinerary } from '@/types/travel';
import { queryKeys, useReorderSteps } from './useTravelQueries';

export function useItineraryState(
  currentStep: DayItinerary | null,
  sortedDayItineraries: DayItinerary[],
  itineraryId: number
) {
  // États de base
  const [selectedStep, setSelectedStep] = useState<DayItinerary | null>(null);
  const [isAddStepOpen, setIsAddStepOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<DayItinerary | null>(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [reorderError, setReorderError] = useState<string | null>(null);
  const [hasInitializedCurrentStep, setHasInitializedCurrentStep] = useState(false);

  // États pour les mois
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(() => {
    const expandedMonths = new Set<string>();
    if (currentStep) {
      const currentDate = new Date(currentStep.date);
      const currentMonthKey = currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }).toLowerCase().replace(' ', '-');
      expandedMonths.add(currentMonthKey);
    }
    return expandedMonths;
  });

  // Refs
  const previousStepCountRef = useRef<number>(sortedDayItineraries.length);
  const hasInitializedNewStepRef = useRef(false);

  const queryClient = useQueryClient();
  const reorderStepsMutation = useReorderSteps();

  // Fonctions utilitaires
  const toggleMonth = useCallback((monthKey: string) => {
    setExpandedMonths(prev => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(monthKey)) {
        newExpanded.delete(monthKey);
      } else {
        newExpanded.add(monthKey);
      }
      return newExpanded;
    });
  }, []);

  const openMonth = useCallback((monthKey: string) => {
    setExpandedMonths(prev => new Set([...prev, monthKey]));
  }, []);

  const handleDeleteStep = useCallback((deletedStep: DayItinerary) => {
    if (selectedStep?.id === deletedStep.id) {
      setSelectedStep(null);
    }
    if (editingStep?.id === deletedStep.id) {
      setEditingStep(null);
    }
  }, [selectedStep, editingStep]);

  const handleReorder = useCallback(async (updatedSteps: DayItinerary[]) => {
    if (!itineraryId) {
      return;
    }
    if (updatedSteps.length === 0) {
      return;
    }

    const stepsWithIds = updatedSteps.filter((step) => Boolean(step.id));
    if (stepsWithIds.length !== updatedSteps.length) {
      setReorderError('Impossible de réordonner des étapes non synchronisées.');
      return;
    }

    const mappedSteps = stepsWithIds.map((step, index) => ({
      ...step,
      order: index + 1,
    }));

    const payload = mappedSteps.map((step) => ({
      id: step.id as number,
      order: step.order,
    }));

    const queryKey = queryKeys.steps(itineraryId.toString());
    const previousData = queryClient.getQueryData<DayItinerary[]>(queryKey);

    // Mise à jour optimiste
    queryClient.setQueryData(queryKey, mappedSteps);

    setIsSavingOrder(true);
    setReorderError(null);

    try {
      await reorderStepsMutation.mutateAsync({ steps: payload });
      setSelectedStep((current) => {
        if (!current) return current;
        const updated = mappedSteps.find((step) => step.id === current.id);
        return updated ?? current;
      });
    } catch (error) {
      console.error('Failed to reorder steps', error);
      if (previousData) {
        queryClient.setQueryData(queryKey, previousData);
      }
      const message = error instanceof Error
        ? error.message
        : 'Une erreur est survenue lors de la réorganisation.';
      setReorderError(message);
      throw error;
    } finally {
      setIsSavingOrder(false);
    }
  }, [itineraryId, queryClient, reorderStepsMutation]);

  // Effets
  
  // Effet pour initialiser la sélection sur l'étape actuelle
  useEffect(() => {
    if (!hasInitializedCurrentStep && currentStep && sortedDayItineraries.length > 0) {
      console.log('🎯 Initialisation: sélection de l\'étape actuelle', currentStep.destination?.name);
      setSelectedStep(currentStep);
      setHasInitializedCurrentStep(true);
      
      // Ouvrir le mois de l'étape actuelle
      const currentDate = new Date(currentStep.date);
      const currentMonthKey = currentDate
        .toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
        .toLowerCase()
        .replace(' ', '-');
      
      setExpandedMonths(prev => new Set([...prev, currentMonthKey]));
    }
  }, [currentStep, sortedDayItineraries, hasInitializedCurrentStep]);

  // Effet pour gérer l'ajout de nouvelles étapes
  useEffect(() => {
    if (!hasInitializedNewStepRef.current) {
      hasInitializedNewStepRef.current = true;
      previousStepCountRef.current = sortedDayItineraries.length;
      return;
    }

    if (sortedDayItineraries.length > previousStepCountRef.current && sortedDayItineraries.length > 0) {
      const latestStep = sortedDayItineraries[sortedDayItineraries.length - 1];
      console.log('✨ Nouvelle étape ajoutée:', latestStep.destination?.name);
      setSelectedStep(latestStep);

      const newStepDate = new Date(latestStep.date);
      const newMonthKey = newStepDate
        .toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
        .toLowerCase()
        .replace(' ', '-');

      setExpandedMonths(prev => new Set([...prev, newMonthKey]));
    }

    previousStepCountRef.current = sortedDayItineraries.length;
  }, [sortedDayItineraries]);

  // Effet pour s'assurer que le mois de l'étape actuelle est toujours ouvert
  useEffect(() => {
    if (!currentStep) return;
    const currentDate = new Date(currentStep.date);
    const currentMonthKey = currentDate
      .toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
      .toLowerCase()
      .replace(' ', '-');

    setExpandedMonths(prev => {
      if (prev.has(currentMonthKey)) {
        return prev;
      }
      return new Set([...prev, currentMonthKey]);
    });
  }, [currentStep]);

  const startEditingStep = useCallback((step: DayItinerary) => {
    setEditingStep(step);
    setSelectedStep(step);
  }, []);

  const cancelEditingStep = useCallback(() => {
    setEditingStep(null);
  }, []);

  return {
    // États
    selectedStep,
    isAddStepOpen,
    isSavingOrder,
    reorderError,
    expandedMonths,
    editingStep,

    // Setters
    setSelectedStep,
    setIsAddStepOpen,
    setEditingStep,

    // Fonctions
    toggleMonth,
    openMonth,
    handleDeleteStep,
    handleReorder,
    startEditingStep,
    cancelEditingStep,
  };
}
