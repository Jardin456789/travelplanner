'use client';

import { useMemo } from 'react';
import { useCurrentDate } from '@/lib/date-utils';
import { parseISO, isBefore, isEqual } from 'date-fns';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { useTravelData } from '@/hooks/useTravelData';
import { AddStepDialog } from '@/components/AddStepDialog';
import { EditStepDialog } from '@/components/EditStepDialog';
import { useItineraryState } from '@/hooks/useItineraryState';
import { TutorialDialog } from '@/components/TutorialDialog';
import { useMobileNavigation } from '@/hooks/useMobileNavigation';
import { useOnboardingTutorial } from '@/hooks/useOnboardingTutorial';
import SidebarPanel from '@/components/SidebarPanel';
import MobilePanel from '@/components/MobilePanel';
import { Plus } from 'lucide-react';

// Dynamically import TravelMap component to avoid SSR issues with Mapbox
const TravelMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="h-96 w-full bg-gray-200 rounded-lg animate-pulse" />
});

// Import des données depuis le fichier dédié

export default function Home() {
  const { loading, destinations, dayItineraries, itinerary } = useTravelData();

  // États de base
  // Utiliser la date actuelle côté client
  const clientCurrentDate = useCurrentDate();
  const onboardingTutorial = useOnboardingTutorial();

  // Trier les étapes
  const sortedDayItineraries = useMemo(() => {
    return [...dayItineraries].sort((a, b) => a.order - b.order);
  }, [dayItineraries]);

  // Déterminer l'étape actuelle
  const currentStep = useMemo(() => {
    const step = [...sortedDayItineraries]
      .reverse()
      .find(day => {
        const dayDate = parseISO(day.date);
        dayDate.setHours(0, 0, 0, 0);
        return isEqual(dayDate, clientCurrentDate) || isBefore(dayDate, clientCurrentDate);
      });
    
    if (step) {
      console.log('📍 Étape actuelle détectée:', {
        destination: step.destination?.name,
        date: step.date,
        dateAujourdhui: clientCurrentDate.toLocaleDateString('fr-FR')
      });
    }
    
    return step;
  }, [clientCurrentDate, sortedDayItineraries]);

  // Hooks personnalisés
  const itineraryId = itinerary?.id ?? 0;
  const itineraryState = useItineraryState(currentStep || null, sortedDayItineraries, itineraryId);
  const mobileNav = useMobileNavigation({
    allSteps: sortedDayItineraries,
    selectedStep: itineraryState.selectedStep,
    onStepSelect: itineraryState.setSelectedStep,
  });

  if (loading || !itinerary || sortedDayItineraries.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white text-gray-600">
        Chargement de l’itinéraire en cours...
      </div>
    );
  }

  return (
    <>
      <AddStepDialog
        isOpen={itineraryState.isAddStepOpen}
        onRequestClose={() => itineraryState.setIsAddStepOpen(false)}
        itineraryId={itinerary.id}
        existingDestinations={destinations}
        existingSteps={sortedDayItineraries}
      />
      <EditStepDialog
        isOpen={Boolean(itineraryState.editingStep)}
        step={itineraryState.editingStep}
        onRequestClose={itineraryState.cancelEditingStep}
        itineraryId={itinerary.id}
        existingDestinations={destinations}
        existingSteps={sortedDayItineraries}
        onStepDeleted={itineraryState.handleDeleteStep}
      />
      <TutorialDialog
        open={onboardingTutorial.isOpen}
        onClose={onboardingTutorial.closeTutorial}
      />
      <div className="h-screen flex flex-col lg:flex-row">
      {/* Carte - Plein écran sur mobile, droite sur desktop */}
      <div className="flex-1 relative order-1 lg:order-2">
        <TravelMap
          destinations={destinations}
          dayItineraries={sortedDayItineraries}
          className="h-full w-full"
          currentStep={currentStep ?? null}
          selectedStep={itineraryState.selectedStep}
          onStepSelect={itineraryState.setSelectedStep}
          onMonthOpen={itineraryState.openMonth}
        />

        {/* Bouton flottant d'ajout en bas à droite */}
        <div className="absolute bottom-6 right-6 z-10">
          <Button
            size="icon"
            variant="default"
            aria-label="Ajouter une étape"
            className="rounded-full shadow-lg h-12 w-12"
            onClick={() => itineraryState.setIsAddStepOpen(true)}
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {/* Panel mobile */}
        <MobilePanel
          currentMobileStep={mobileNav.currentMobileStep}
          selectedStep={itineraryState.selectedStep}
          mobileFilteredSteps={mobileNav.mobileFilteredSteps}
          currentMobileStepIndex={mobileNav.currentMobileStepIndex}
          selectedMobileMonth={mobileNav.selectedMobileMonth}
          monthOptions={mobileNav.monthOptions}
          currentDateStepIndex={mobileNav.currentDateStepIndex}
          itineraryId={itinerary.id}
          onSelectStep={itineraryState.setSelectedStep}
          onEditStep={itineraryState.startEditingStep}
          onMobileMonthChange={mobileNav.handleMobileMonthChange}
          onTouchStart={mobileNav.onTouchStart}
          onTouchMove={mobileNav.onTouchMove}
          onTouchEnd={mobileNav.onTouchEnd}
          goToNextStep={mobileNav.goToNextStep}
          goToPreviousStep={mobileNav.goToPreviousStep}
        />
      </div>

        {/* Panel latéral desktop */}
        <SidebarPanel
          itinerary={itinerary}
          steps={sortedDayItineraries}
          expandedMonths={itineraryState.expandedMonths}
          selectedStep={itineraryState.selectedStep}
          isSavingOrder={itineraryState.isSavingOrder}
          reorderError={itineraryState.reorderError}
          onToggleMonth={itineraryState.toggleMonth}
          onSelectStep={itineraryState.setSelectedStep}
          onEditStep={itineraryState.startEditingStep}
          onReorder={itineraryState.handleReorder}
          onOpenAddStep={() => itineraryState.setIsAddStepOpen(true)}
        />

      </div>
    </>
  );
}
