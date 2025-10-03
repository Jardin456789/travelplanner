'use client';

import { useState, useRef, useMemo } from 'react';
import { useCurrentDate } from '@/lib/date-utils';
import { parseISO, isBefore, isEqual } from 'date-fns';
import dynamic from 'next/dynamic';
import MapStyleSelector from '@/components/MapStyleSelector';
import { Button } from '@/components/ui/button';
import { useTravelData } from '@/hooks/useTravelData';
import { AddStepDialog } from '@/components/AddStepDialog';
import { useItineraryState } from '@/hooks/useItineraryState';
import { useMobileNavigation } from '@/hooks/useMobileNavigation';
import { useMonthGrouping } from '@/hooks/useMonthGrouping';
import SidebarPanel from '@/components/SidebarPanel';
import MobilePanel from '@/components/MobilePanel';
import { MAPBOX_STYLES } from '@/components/Map';
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
  const [mapStyle, setMapStyle] = useState<string>(MAPBOX_STYLES.satelliteStreets);

  // Utiliser la date actuelle côté client
  const clientCurrentDate = useCurrentDate();

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
  const { groupedByMonth } = useMonthGrouping({ dayItineraries: sortedDayItineraries, clientCurrentDate });
  const itineraryState = useItineraryState(currentStep || null, sortedDayItineraries);
  const mobileNav = useMobileNavigation({
    allSteps: sortedDayItineraries,
    selectedStep: itineraryState.selectedStep,
    onStepSelect: itineraryState.setSelectedStep,
  });

  const canReorder = useMemo(
    () => sortedDayItineraries.length > 0 && sortedDayItineraries.every(step => Boolean(step.id)),
    [sortedDayItineraries]
  );


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
      <div className="h-screen flex flex-col lg:flex-row">
      {/* Carte - Plein écran sur mobile, droite sur desktop */}
      <div className="flex-1 relative order-1 lg:order-2">
        <TravelMap
          destinations={destinations}
          dayItineraries={sortedDayItineraries}
          className="h-full w-full"
          mapStyle={mapStyle}
          onStyleChange={(style) => setMapStyle(style)}
          selectedStep={itineraryState.selectedStep}
          onStepSelect={itineraryState.setSelectedStep}
          onMonthOpen={itineraryState.openMonth}
        />

        {/* Boutons flottants */}
        <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
          <MapStyleSelector
            currentStyle={mapStyle}
            onStyleChange={(style) => setMapStyle(style)}
          />
          <Button
            size="icon"
            variant="default"
            aria-label="Ajouter une étape"
            className="rounded-full shadow-lg"
            onClick={() => itineraryState.setIsAddStepOpen(true)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Bouton desktop */}
        <div className="hidden lg:flex absolute bottom-6 right-6 z-10">
          <Button
            size="lg"
            className="shadow-xl"
            onClick={() => itineraryState.setIsAddStepOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter une étape
          </Button>
        </div>

        {/* Bouton mobile */}
        <div className="lg:hidden absolute bottom-5 right-4 z-10">
          <Button
            size="sm"
            className="shadow-lg"
            onClick={() => itineraryState.setIsAddStepOpen(true)}
          >
            <Plus className="w-3 h-3 mr-2" />
            Ajouter une étape
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
          onDeleteStep={itineraryState.handleDeleteStep}
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
          groupedByMonth={groupedByMonth}
          expandedMonths={itineraryState.expandedMonths}
          selectedStep={itineraryState.selectedStep}
          isReorderMode={itineraryState.isReorderMode}
          canReorder={canReorder}
          reorderError={itineraryState.reorderError}
          isSavingOrder={itineraryState.isSavingOrder}
          onToggleMonth={itineraryState.toggleMonth}
          onSelectStep={itineraryState.setSelectedStep}
          onDeleteStep={itineraryState.handleDeleteStep}
          onToggleReorderMode={() => itineraryState.setIsReorderMode(!itineraryState.isReorderMode)}
          onReorder={itineraryState.handleReorder}
          onOpenAddStep={() => itineraryState.setIsAddStepOpen(true)}
        />

      </div>
    </>
  );
}
