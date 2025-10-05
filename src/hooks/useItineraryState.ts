import { useState, useEffect, useRef, useCallback } from 'react';
import { useReorderSteps } from './useTravelQueries';
import type { DayItinerary } from '@/types/travel';

export function useItineraryState(
  currentStep: DayItinerary | null,
  sortedDayItineraries: DayItinerary[]
) {
  // États de base
  const [selectedStep, setSelectedStep] = useState<DayItinerary | null>(null);
  const [isAddStepOpen, setIsAddStepOpen] = useState(false);
  const [isReorderMode, setIsReorderMode] = useState(false);
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

  // Mutations
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
  }, [selectedStep]);

  const handleReorder = useCallback(async (updatedSteps: DayItinerary[]) => {
    const canReorder = sortedDayItineraries.length > 0 && sortedDayItineraries.every(step => Boolean(step.id));

    if (!canReorder) {
      setReorderError("Impossible de réordonner tant que toutes les étapes ne sont pas synchronisées.");
      throw new Error('Reorder not allowed');
    }

    const payload = updatedSteps.map((step) => {
      if (!step.id) {
        throw new Error('Étape manquante, impossible de mettre à jour son ordre.');
      }
      return {
        id: step.id as number,
        order: step.order,
      };
    });

    setIsSavingOrder(true);
    setReorderError(null);

    try {
      await reorderStepsMutation.mutateAsync({ steps: payload });
    } catch (error) {
      console.error('Failed to reorder steps', error);
      const message = error instanceof Error
        ? error.message
        : 'Une erreur est survenue lors de la mise à jour de l\'ordre.';
      setReorderError(message);
      throw error;
    } finally {
      setIsSavingOrder(false);
    }
  }, [sortedDayItineraries, reorderStepsMutation]);

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

  return {
    // États
    selectedStep,
    isAddStepOpen,
    isReorderMode,
    isSavingOrder,
    reorderError,
    expandedMonths,

    // Setters
    setSelectedStep,
    setIsAddStepOpen,
    setIsReorderMode,
    setReorderError,

    // Fonctions
    toggleMonth,
    openMonth,
    handleDeleteStep,
    handleReorder,
  };
}
