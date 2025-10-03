'use client';

import Image from 'next/image';
import { parseISO, isBefore } from 'date-fns';
import { formatDate, useCurrentDate } from '@/lib/date-utils';
import { Button } from '@/components/ui/button';
import ItineraryCard from '@/components/ItineraryCard';
import type { DayItinerary } from '@/types/travel';

interface MobilePanelProps {
  currentMobileStep: DayItinerary | null;
  selectedStep: DayItinerary | null;
  mobileFilteredSteps: DayItinerary[];
  currentMobileStepIndex: number;
  selectedMobileMonth: string;
  monthOptions: { value: string; label: string }[];
  currentDateStepIndex: number;
  itineraryId: number;
  onSelectStep: (step: DayItinerary) => void;
  onDeleteStep: (step: DayItinerary) => void;
  onMobileMonthChange: (month: string) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export default function MobilePanel({
  currentMobileStep,
  selectedStep,
  mobileFilteredSteps,
  currentMobileStepIndex,
  selectedMobileMonth,
  monthOptions,
  currentDateStepIndex,
  itineraryId,
  onSelectStep,
  onDeleteStep,
  onMobileMonthChange,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  goToNextStep,
  goToPreviousStep,
}: MobilePanelProps) {
  const clientCurrentDate = useCurrentDate();

  return (
    <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 max-h-[40vh] overflow-hidden">
      {/* Header avec sélecteur de mois */}
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <select
            value={selectedMobileMonth}
            onChange={(e) => onMobileMonthChange(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
          >
            {monthOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="text-xs text-gray-500">
            {currentMobileStepIndex + 1} / {mobileFilteredSteps.length}
          </div>
        </div>
      </div>

      {/* Navigation et contenu de l'étape */}
      <div className="relative">
        {/* Boutons de navigation */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPreviousStep}
            disabled={currentMobileStepIndex === 0}
            className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm disabled:opacity-50"
          >
            ‹
          </Button>
        </div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToNextStep}
            disabled={currentMobileStepIndex >= mobileFilteredSteps.length - 1}
            className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm disabled:opacity-50"
          >
            ›
          </Button>
        </div>

        {/* Contenu de l'étape */}
        <div
          className="px-4 py-3 overflow-y-auto max-h-[25vh]"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {currentMobileStep && (
            <div className="space-y-3">
              {/* Étape actuelle */}
              <div className="transition-opacity duration-300 ease-in-out">
                <ItineraryCard
                  dayItinerary={currentMobileStep}
                  itineraryId={itineraryId}
                  isSelected={selectedStep?.order === currentMobileStep.order}
                  isPast={isBefore(parseISO(currentMobileStep.date), clientCurrentDate)}
                  onSelect={() => onSelectStep(currentMobileStep)}
                  onDelete={() => onDeleteStep(currentMobileStep)}
                />
              </div>

              {/* Indicateur de progression et instructions */}
              <div className="flex flex-col items-center space-y-2">
                {/* Petit rond avec GIF au-dessus de l'étape actuelle (date) */}
                <div className="flex justify-center">
                  {mobileFilteredSteps.slice(0, Math.min(10, mobileFilteredSteps.length)).map((_, index) => (
                    <div key={`gif-${index}`} className="flex flex-col items-center mx-0.5">
                      {index === currentDateStepIndex && currentDateStepIndex !== -1 && (
                        <div className="w-3 h-3 rounded-full bg-white border border-gray-300 flex items-center justify-center mb-1">
                          <Image
                            src="/current-step.gif"
                            alt="Étape actuelle"
                            width={8}
                            height={8}
                            className="w-2 h-2 object-contain"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Indicateurs de progression */}
                <div className="flex space-x-1">
                  {mobileFilteredSteps.slice(0, Math.min(10, mobileFilteredSteps.length)).map((_, index) => (
                    index === currentMobileStepIndex ? (
                      <div
                        key={index}
                        className="w-2 h-2 rounded-full bg-black"
                      />
                    ) : (
                      <div
                        key={index}
                        className="w-2 h-2 rounded-full bg-gray-300"
                      />
                    )
                  ))}
                  {mobileFilteredSteps.length > 10 && (
                    <div className="text-xs text-gray-500 ml-2">
                      +{mobileFilteredSteps.length - 10} autres
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-400 text-center space-y-1">
                  <div>👆 Glissez pour naviguer entre les étapes</div>
                  <div className="text-[10px] opacity-75">
                    📅 Aujourd&apos;hui : {formatDate(clientCurrentDate)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
