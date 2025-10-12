'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type OnboardingState = {
  hasSeenTutorial: boolean;
  markTutorialAsSeen: () => void;
  resetTutorialProgress: () => void;
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      hasSeenTutorial: false,
      markTutorialAsSeen: () => set({ hasSeenTutorial: true }),
      resetTutorialProgress: () => set({ hasSeenTutorial: false }),
    }),
    {
      name: 'travelplanner-onboarding',
    }
  )
);
