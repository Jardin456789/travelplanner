'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { formatDate, useCurrentDate } from '@/lib/date-utils';
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { parseISO, isBefore, isEqual } from 'date-fns';
import dynamic from 'next/dynamic';
import ItineraryCard from '@/components/ItineraryCard';
import MapStyleSelector from '@/components/MapStyleSelector';
import { Button } from '@/components/ui/button';
import { Destination, DayItinerary } from '@/types/travel';
import { MAPBOX_STYLES } from '@/components/Map';
import { itinerary, destinations, dayItineraries } from '@/data/itinerary';
import { Plus } from 'lucide-react';

// Type pour représenter une étape ou un groupe d'étapes consécutives
type StepGroup = {
  type: 'single';
  day: DayItinerary;
} | {
  type: 'range';
  days: DayItinerary[];
  startDate: Date;
  endDate: Date;
  destination: Destination;
};

// Dynamically import TravelMap component to avoid SSR issues with Mapbox
const TravelMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="h-96 w-full bg-gray-200 rounded-lg animate-pulse" />
});

// Import des données depuis le fichier dédié

export default function Home() {
  const [mapStyle, setMapStyle] = useState<string>(MAPBOX_STYLES.satelliteStreets);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  // Utiliser la date actuelle côté client
  const clientCurrentDate = useCurrentDate();

  // Déterminer l'étape actuelle basée sur la date côté client
  const currentStep = useMemo(() => {
    // Trier par ordre et prendre la plus récente qui est aujourd'hui ou avant
    return dayItineraries
      .sort((a, b) => b.order - a.order) // Inverser pour avoir la plus récente en premier
      .find(day => {
        const dayDate = parseISO(day.date);
        dayDate.setHours(0, 0, 0, 0);
        return isEqual(dayDate, clientCurrentDate) || isBefore(dayDate, clientCurrentDate);
      });
  }, [clientCurrentDate, dayItineraries]);

  // Fonction pour grouper les étapes consécutives dans la même destination
  const groupConsecutiveSteps = (days: DayItinerary[]): StepGroup[] => {
    const groups: StepGroup[] = [];
    let currentGroup: DayItinerary[] = [];

    for (let i = 0; i < days.length; i++) {
      const day = days[i];

      if (currentGroup.length === 0) {
        // Démarrer un nouveau groupe
        currentGroup = [day];
      } else {
        const lastDay = currentGroup[currentGroup.length - 1];

        // Vérifier si cette étape est consécutive et dans la même destination
        if (lastDay.destination.id === day.destination.id &&
            lastDay.order + 1 === day.order) {
          // Ajouter au groupe existant
          currentGroup.push(day);
        } else {
          // Fermer le groupe actuel et en démarrer un nouveau
          if (currentGroup.length === 1) {
            groups.push({ type: 'single', day: currentGroup[0] });
          } else {
            groups.push({
              type: 'range',
              days: currentGroup,
              startDate: new Date(currentGroup[0].date),
              endDate: new Date(currentGroup[currentGroup.length - 1].date),
              destination: currentGroup[0].destination
            });
          }
          currentGroup = [day];
        }
      }
    }

    // Fermer le dernier groupe
    if (currentGroup.length === 1) {
      groups.push({ type: 'single', day: currentGroup[0] });
    } else if (currentGroup.length > 1) {
      groups.push({
        type: 'range',
        days: currentGroup,
        startDate: new Date(currentGroup[0].date),
        endDate: new Date(currentGroup[currentGroup.length - 1].date),
        destination: currentGroup[0].destination
      });
    }

    return groups;
  };

  // Grouper les étapes par mois avec regroupement des séjours consécutifs
  const groupedByMonth = (() => {
    // D'abord grouper par mois les étapes individuelles
    const monthGroups = dayItineraries.reduce((acc, day) => {
      const date = new Date(day.date);
      const monthKey = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }).toLowerCase().replace(' ', '-');
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(day);
      return acc;
    }, {} as Record<string, DayItinerary[]>);

    // Ensuite regrouper les étapes consécutives dans chaque mois
    const finalGroups: Record<string, StepGroup[]> = {};
    Object.entries(monthGroups).forEach(([monthKey, days]) => {
      // Trier les jours par ordre
      days.sort((a, b) => a.order - b.order);
      finalGroups[monthKey] = groupConsecutiveSteps(days);
    });

    return finalGroups;
  })();

  // Initialiser les mois ouverts avec seulement le mois actuel
  const getInitialExpandedMonths = () => {
    const expandedMonths = new Set<string>();
    if (currentStep) {
      const currentDate = new Date(currentStep.date);
      const currentMonthKey = currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }).toLowerCase().replace(' ', '-');
      expandedMonths.add(currentMonthKey);
    }
    return expandedMonths;
  };

  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(getInitialExpandedMonths());
  const [selectedStep, setSelectedStep] = useState<DayItinerary | null>(currentStep || null);

  // État pour la navigation mobile par étapes
  const [currentMobileStepIndex, setCurrentMobileStepIndex] = useState<number>(0);
  const [selectedMobileMonth, setSelectedMobileMonth] = useState<string>('all');

  // État pour le swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // État pour contrôler la source de la mise à jour
  const [updateSource, setUpdateSource] = useState<'mobile' | 'map' | null>(null);

  // Liste aplatie de toutes les étapes pour la navigation mobile
  const allSteps = useMemo(() => {
    return dayItineraries.sort((a, b) => a.order - b.order);
  }, [dayItineraries]);

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
    if (!currentStep) return -1;
    return mobileFilteredSteps.findIndex(step => step.order === currentStep.order);
  }, [currentStep, mobileFilteredSteps]);

  // Fonctions de navigation mobile
  const goToNextStep = () => {
    if (currentMobileStepIndex < mobileFilteredSteps.length - 1) {
      setUpdateSource('mobile');
      setCurrentMobileStepIndex(prev => prev + 1);
      // Mettre à jour selectedStep pour que la carte suive
      const nextStep = mobileFilteredSteps[currentMobileStepIndex + 1];
      if (nextStep) {
        setSelectedStep(nextStep);
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentMobileStepIndex > 0) {
      setUpdateSource('mobile');
      setCurrentMobileStepIndex(prev => prev - 1);
      // Mettre à jour selectedStep pour que la carte suive
      const prevStep = mobileFilteredSteps[currentMobileStepIndex - 1];
      if (prevStep) {
        setSelectedStep(prevStep);
      }
    }
  };

  // Fonctions pour le swipe
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

  // Options pour le sélecteur de mois
  const monthOptions = useMemo(() => {
    const options = [{ value: 'all', label: 'Tous les mois' }];
    Object.keys(groupedByMonth).forEach(monthKey => {
      const monthName = monthKey.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      options.push({ value: monthKey, label: monthName });
    });
    return options;
  }, [groupedByMonth]);

  // Fonction pour basculer l'expansion d'un mois
  const toggleMonth = (monthKey: string) => {
    const newExpanded = new Set(expandedMonths);
    if (newExpanded.has(monthKey)) {
      newExpanded.delete(monthKey);
    } else {
      newExpanded.add(monthKey);
    }
    setExpandedMonths(newExpanded);
  };

  // Fonction pour ouvrir un mois spécifique (utilisée par la carte)
  const openMonth = (monthKey: string) => {
    setExpandedMonths(prev => new Set([...prev, monthKey]));
  };

  // Synchroniser seulement quand on vient de la carte (clic sur marker)
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

  // Scroll automatique vers l'étape sélectionnée quand on clique sur la carte
  useEffect(() => {
    if (selectedStep && stepsContainerRef.current) {
      const stepElement = stepsContainerRef.current.querySelector(
        `[data-step-order="${selectedStep.order}"]`
      ) as HTMLElement;

      if (stepElement) {
        stepElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [selectedStep]);

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Carte - Plein écran sur mobile, droite sur desktop */}
      <div className="flex-1 relative order-1 lg:order-2">
        <TravelMap
          destinations={destinations}
          dayItineraries={dayItineraries}
          className="h-full w-full"
          mapStyle={mapStyle}
          onStyleChange={(style) => setMapStyle(style)}
          selectedStep={selectedStep}
          onStepSelect={setSelectedStep}
          onMonthOpen={openMonth}
        />

        {/* Bouton flottant pour le sélecteur de style */}
        <div className="absolute top-4 right-4 z-10">
          <MapStyleSelector
            currentStyle={mapStyle}
            onStyleChange={(style) => setMapStyle(style)}
          />
        </div>

        {/* Panel mobile pour navigation par étapes */}
        <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 max-h-[40vh] overflow-hidden">
          {/* Header avec sélecteur de mois */}
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <select
                value={selectedMobileMonth}
                onChange={(e) => {
                  setSelectedMobileMonth(e.target.value);
                  setUpdateSource('mobile');
                  setCurrentMobileStepIndex(0); // Reset à la première étape du mois sélectionné
                }}
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
                      isSelected={selectedStep?.order === currentMobileStep.order}
                      isPast={isBefore(parseISO(currentMobileStep.date), clientCurrentDate)}
                      onSelect={() => setSelectedStep(currentMobileStep)}
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
                              <img
                                src="/current-step.gif"
                                alt="Étape actuelle"
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
      </div>

      {/* Panel d'information - En bas sur mobile, gauche sur desktop */}
      <div className="hidden lg:flex lg:w-80 bg-white lg:border-r border-gray-200 flex-col order-2 lg:order-1 lg:h-full">

        {/* Contenu du panel */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {/* Titre de l'itinéraire */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <h3 className="text-base font-semibold text-gray-900 mb-1">{itinerary.title}</h3>
            <p className="text-xs text-gray-600 mb-2">{itinerary.description}</p>
            <div className="text-xs text-gray-500">
              📅 {formatDate(itinerary.startDate)} - {formatDate(itinerary.endDate)}
            </div>
          </div>

          {/* Étapes de l'itinéraire */}
          <div ref={stepsContainerRef} className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              🗺️ Étapes ({Object.values(groupedByMonth).flat().length})
            </h3>

            {/* Grouper par mois */}
            {Object.entries(groupedByMonth).map(([monthKey, monthDays]) => {
              const isExpanded = expandedMonths.has(monthKey);
              const monthName = monthKey.split('-').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ');

              return (
                <div key={monthKey} className="space-y-2">
                  {/* Header du mois cliquable */}
                  <button
                    onClick={() => toggleMonth(monthKey)}
                    className="w-full flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="font-medium text-gray-900 text-sm">{monthName}</span>
                      <span className="text-xs text-gray-600 bg-white px-1.5 py-0.5 rounded border">
                        {monthDays.length}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
                    )}
                  </button>

                  {/* Étapes du mois */}
                  {isExpanded && (
                    <div className="space-y-2 ml-3 border-l border-gray-300 pl-3">
                      {monthDays.map((stepGroup) => {
                        if (stepGroup.type === 'single') {
                          // Étape unique
                          const day = stepGroup.day;
                          const dayDate = parseISO(day.date);
                          dayDate.setHours(0, 0, 0, 0);
                          const isPastStep = isBefore(dayDate, clientCurrentDate);
                          return (
                            <div key={day.date} data-step-order={day.order}>
                              <ItineraryCard
                                dayItinerary={day}
                                isSelected={selectedStep?.order === day.order}
                                isPast={isPastStep}
                                onSelect={() => setSelectedStep(day)}
                              />
                            </div>
                          );
                        } else {
                          // Plage d'étapes consécutives
                          const { days, startDate, endDate, destination } = stepGroup;
                          const isRangeSelected = selectedStep && days.some(day => day.order === selectedStep.order);
                          const isRangeCurrent = currentStep && days.some(day => day.order === currentStep.order);

                          return (
                            <div key={`range-${days[0].order}-${days[days.length - 1].order}`}>
                              <div className={`border rounded-md overflow-hidden transition-colors ${
                                isRangeSelected
                                  ? 'bg-blue-50 border-blue-300'
                                  : 'bg-white border-gray-200'
                              }`}>
                                {/* En-tête de la plage */}
                                <button
                                  onClick={() => {
                                    // Sélectionner la première étape de la plage
                                    setSelectedStep(days[0]);
                                  }}
                                  className={`w-full p-3 text-left transition-colors ${
                                    isRangeSelected
                                      ? 'hover:bg-blue-100'
                                      : 'hover:bg-gray-50'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
                                        {days.length}
                                      </div>
                                      <div>
                                        <h4 className="font-medium text-gray-900 text-sm">{destination.name}</h4>
                                        <p className="text-xs text-gray-500">
                                          {formatDate(startDate)}
                                          {startDate.getTime() !== endDate.getTime() &&
                                            ` - ${formatDate(endDate)}`
                                          }
                                          {isRangeCurrent && (
                                            <span className="ml-2 inline-block px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] rounded font-medium">
                                              ACTUEL
                                            </span>
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <ChevronDown className="w-4 h-4 text-gray-500" />
                                    </div>
                                  </div>
                                </button>

                                {/* Détails des étapes individuelles */}
                                <div className="border-t border-white/30">
                                  {days.map((day) => (
                                    <div key={day.date} className="px-3 py-2 border-b border-gray-100 last:border-b-0">
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <div className={`w-2 h-2 rounded-full ${
                                            currentStep && currentStep.order === day.order ? 'bg-green-500' :
                                            selectedStep && selectedStep.order === day.order ? 'bg-blue-500' : 'bg-gray-300'
                                          }`}></div>
                                          <span className="text-xs text-gray-600">
                                            Jour {day.order}
                                          </span>
                                          <span className="text-xs text-gray-500">
                                                {formatDate(day.date)}
                                          </span>
                                          {currentStep && currentStep.order === day.order && (
                                            <span className="text-[10px] px-1 py-0.5 bg-green-100 text-green-800 rounded font-medium">
                                              Today
                                            </span>
                                          )}
                                        </div>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedStep(day);
                                          }}
                                          className="text-xs text-blue-600 hover:text-blue-800 underline"
                                        >
                                          Voir détails
                                        </button>
                                      </div>
                                      {selectedStep && selectedStep.order === day.order && (
                                        <div className="mt-2 pt-2 border-t border-gray-100">
                                          <ItineraryCard
                                            dayItinerary={day}
                                            isSelected={true}
                                            isPast={isBefore(parseISO(day.date), clientCurrentDate)}
                                            onSelect={() => {}}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Boutons d'action en bas */}
          <div className="space-y-2 pt-2">
            <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white border-0 h-8 text-sm">
              <Plus className="w-3 h-3 mr-2" />
              Modifier
            </Button>
            <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 h-8 text-sm">
              Exporter PDF
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}
