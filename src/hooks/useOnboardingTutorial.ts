'use client';

import { useCallback, useEffect, useState } from 'react';
import { useOnboardingStore } from '@/stores/onboardingStore';

export function useOnboardingTutorial() {
  const hasSeenTutorial = useOnboardingStore((state) => state.hasSeenTutorial);
  const markTutorialAsSeen = useOnboardingStore((state) => state.markTutorialAsSeen);
  const resetTutorialProgress = useOnboardingStore((state) => state.resetTutorialProgress);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!hasSeenTutorial) {
      setIsOpen(true);
    }
  }, [hasSeenTutorial]);

  const closeTutorial = useCallback(() => {
    markTutorialAsSeen();
    setIsOpen(false);
  }, [markTutorialAsSeen]);

  const reopenTutorial = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    isOpen,
    hasSeenTutorial,
    closeTutorial,
    reopenTutorial,
    resetTutorial: resetTutorialProgress,
  };
}
