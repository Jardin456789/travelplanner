import { useState, useEffect, useCallback, useMemo } from 'react';
import type { DayItinerary } from '@/types/travel';

interface UseMobileNavigationProps {
  allSteps: DayItinerary[];
  selectedStep: DayItinerary | null;
  onStepSelect: (step: DayItinerary) => void;
}

export function useMobileNavigation({
  allSteps,
  selectedStep,
  onStepSelect
}: UseMobileNavigationProps) {
  // États mobile
  const [currentMobileStepIndex, setCurrentMobileStepIndex] = useState<number>(0);
  const [selectedMobileMonth, setSelectedMobileMonth] = useState<string>('all');

  // États pour les gestes tactiles
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Source de mise à jour (mobile/map)
  const [updateSource, setUpdateSource] = useState<'mobile' | 'map' | null>(null);

  // Étapes filtrées par mois pour mobile
  const mobileFilteredSteps = useMemo(() => {
    if (selectedMobileMonth === 'all') {
      return allSteps;
    }
    const monthDate = new Date(selectedMobileMonth);
    return allSteps.filter(step => {
      const stepDate = new Date(step.date);
      return stepDate.getMonth() === monthDate.getMonth() && stepDate.getFullYear() === monthDate.getFullYear();
    });
  }, [allSteps, selectedMobileMonth]);

  // Étape actuelle affichée sur mobile
  const currentMobileStep = mobileFilteredSteps[currentMobileStepIndex] || null;

  // Index de l'étape actuelle basée sur la date (pour le GIF)
  const currentDateStepIndex = useMemo(() => {
    if (!selectedStep) return -1;
    return mobileFilteredSteps.findIndex(step => step.order === selectedStep.order);
  }, [selectedStep, mobileFilteredSteps]);

  // Options pour le sélecteur de mois
  const monthOptions = useMemo(() => {
    const options = [{ value: 'all', label: 'Tous les mois' }];
    const monthGroups = allSteps.reduce((acc, step) => {
      const date = new Date(step.date);
      const monthKey = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }).toLowerCase().replace(' ', '-');
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(step);
      return acc;
    }, {} as Record<string, DayItinerary[]>);

    Object.entries(monthGroups).forEach(([monthKey, steps]) => {
      const monthName = monthKey.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      options.push({ value: monthKey, label: `${monthName} (${steps.length})` });
    });
    return options;
  }, [allSteps]);

  // Fonctions de navigation mobile
  const goToNextStep = useCallback(() => {
    if (currentMobileStepIndex < mobileFilteredSteps.length - 1) {
      setUpdateSource('mobile');
      setCurrentMobileStepIndex(prev => prev + 1);
      const nextStep = mobileFilteredSteps[currentMobileStepIndex + 1];
      if (nextStep) {
        onStepSelect(nextStep);
      }
    }
  }, [currentMobileStepIndex, mobileFilteredSteps, onStepSelect]);

  const goToPreviousStep = useCallback(() => {
    if (currentMobileStepIndex > 0) {
      setUpdateSource('mobile');
      setCurrentMobileStepIndex(prev => prev - 1);
      const prevStep = mobileFilteredSteps[currentMobileStepIndex - 1];
      if (prevStep) {
        onStepSelect(prevStep);
      }
    }
  }, [currentMobileStepIndex, mobileFilteredSteps, onStepSelect]);

  // Gestionnaire de changement de mois mobile
  const handleMobileMonthChange = useCallback((monthValue: string) => {
    setSelectedMobileMonth(monthValue);
    setUpdateSource('mobile');
    setCurrentMobileStepIndex(0); // Reset à la première étape du mois sélectionné

    // Sélectionner la première étape du mois
    const filteredSteps = monthValue === 'all'
      ? allSteps
      : allSteps.filter(step => {
          const stepDate = new Date(step.date);
          const monthDate = new Date(monthValue);
          return stepDate.getMonth() === monthDate.getMonth() && stepDate.getFullYear() === monthDate.getFullYear();
        });

    if (filteredSteps.length > 0) {
      onStepSelect(filteredSteps[0]);
    }
  }, [allSteps, onStepSelect]);

  // Gestion des gestes tactiles
  const minSwipeDistance = 50;

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextStep();
    }
    if (isRightSwipe) {
      goToPreviousStep();
    }
  }, [touchStart, touchEnd, goToNextStep, goToPreviousStep]);

  // Synchronisation avec la sélection depuis la carte
  useEffect(() => {
    if (selectedStep && updateSource === 'map') {
      const stepIndex = mobileFilteredSteps.findIndex(step => step.order === selectedStep.order);
      if (stepIndex !== -1 && stepIndex !== currentMobileStepIndex) {
        setCurrentMobileStepIndex(stepIndex);
      }
    }
  }, [selectedStep, mobileFilteredSteps, currentMobileStepIndex, updateSource]);

  // Reset updateSource après chaque mise à jour
  useEffect(() => {
    if (updateSource) {
      const timer = setTimeout(() => setUpdateSource(null), 100);
      return () => clearTimeout(timer);
    }
  }, [updateSource]);

  return {
    // États
    currentMobileStepIndex,
    selectedMobileMonth,
    touchStart,
    touchEnd,
    updateSource,

    // Données calculées
    mobileFilteredSteps,
    currentMobileStep,
    currentDateStepIndex,
    monthOptions,

    // Fonctions
    goToNextStep,
    goToPreviousStep,
    handleMobileMonthChange,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
}
