'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  LocateFixed,
  ListChecks,
  Map,
  MapPin,
  MessageSquarePlus,
  MousePointerClick,
  Smartphone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type TutorialDialogProps = {
  open: boolean;
  onClose: () => void;
};

type TutorialHighlight = {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
};

type TutorialStep = {
  title: string;
  description: string;
  highlights: TutorialHighlight[];
};

const tutorialSteps: TutorialStep[] = [
  {
    title: 'Bienvenue dans Travel Planner',
    description:
      'Un rapide tour d’horizon chaleureux pour comprendre comment votre itinéraire prend vie à l’écran.',
    highlights: [
      {
        icon: Map,
        text: 'La carte à droite met en scène vos destinations et vos trajets, pour visualiser chaque instant du voyage.',
      },
      {
        icon: ListChecks,
        text: 'La colonne à gauche liste chaque étape : cliquez sur une carte d’étape pour afficher les détails.',
      },
    ],
  },
  {
    title: 'Capturer vos notes et commentaires',
    description:
      'Chaque étape dispose d’un espace cosy pour garder vos idées, adresses et infos pratiques sous la main.',
    highlights: [
      {
        icon: MousePointerClick,
        text: 'Cliquez sur une étape pour afficher toutes ses infos utiles en un clin d’œil.',
      },
      {
        icon: MessageSquarePlus,
        text: 'Ajoutez vos commentaires en cliquant sur l’icône « commenter » dédiée.',
      },
    ],
  },
  {
    title: 'Se repérer rapidement',
    description:
      'Gardez toujours un œil sur l’étape où vous vous trouvez et naviguez facilement sur la carte.',
    highlights: [
      {
        icon: LocateFixed,
        text: 'Le bouton circulaire en haut à gauche de la carte vous recentre sur l’étape du moment, pile là où vous êtes !',
      },
      {
        icon: MapPin,
        text: 'Cliquez sur un point de la carte pour ouvrir l’étape correspondante et accéder à ses détails.',
      },
    ],
  },
  {
    title: 'Construire votre voyage pas à pas',
    description: 'Ajoutez, réorganisez ou explorez vos étapes depuis n’importe quel appareil.',
    highlights: [
      {
        icon: Smartphone,
        text: 'Sur mobile, faites glisser horizontalement pour passer d’une étape à l’autre sans quitter la carte.',
      },
    ],
  },
];

export function TutorialDialog({ open, onClose }: TutorialDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (open) {
      setCurrentStep(0);
    }
  }, [open]);

  const isLastStep = currentStep === tutorialSteps.length - 1;
  const visibleStep = useMemo(() => tutorialSteps[currentStep], [currentStep]);

  const handlePrevious = () => {
    setCurrentStep((step) => (step === 0 ? step : step - 1));
  };

  const handleNext = () => {
    if (isLastStep) {
      onClose();
      return;
    }
    setCurrentStep((step) => Math.min(step + 1, tutorialSteps.length - 1));
  };

  const handleSkip = () => {
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorial-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-500">Tutoriel</p>
            <h2 id="tutorial-title" className="mt-1 text-xl font-semibold text-gray-900">
              {visibleStep.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">{visibleStep.description}</p>
          </div>
          <button
            type="button"
            onClick={handleSkip}
            className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
            aria-label="Fermer le tutoriel"
          >
            <span aria-hidden>✕</span>
          </button>
        </div>

        <div className="px-6 py-6">
          <ul className="space-y-4">
            {visibleStep.highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <li
                  key={index}
                  className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3"
                >
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="text-sm leading-relaxed text-gray-700">{highlight.text}</p>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col gap-4 border-t border-gray-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5" aria-hidden>
              {tutorialSteps.map((_, stepIndex) => (
                <span
                  key={stepIndex}
                  className={
                    stepIndex === currentStep
                      ? 'h-2.5 w-6 rounded-full bg-blue-500'
                      : 'h-2.5 w-2.5 rounded-full bg-gray-200'
                  }
                />
              ))}
            </div>
            <span className="text-xs font-medium text-gray-500">
              Étape {currentStep + 1}/{tutorialSteps.length}
            </span>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              Passer
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Précédent
            </Button>
            <Button variant="default" size="sm" onClick={handleNext}>
              {isLastStep ? 'Terminer' : 'Suivant'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
