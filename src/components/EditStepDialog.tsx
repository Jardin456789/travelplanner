'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { DayItinerary, Destination } from '@/types/travel';
import { useUpdateStep, useCreateDestination, useDeleteStep } from '@/hooks/useTravelQueries';
import { Button } from '@/components/ui/button';
import { DEBOUNCE_TIMES } from '@/lib/query-config';
import { Trash2, Loader2 } from 'lucide-react';

type PlaceSuggestion = {
  placeId: string;
  fullText: string;
  primaryText: string;
  secondaryText?: string;
  coordinates?: { lat: number; lng: number };
  types?: string[];
};

const MapPointSelector = dynamic(() => import('./MapPointSelector'), {
  ssr: false,
  loading: () => <div className="h-56 w-full animate-pulse rounded-lg bg-gray-100" />,
});

type PlaceDetails = {
  id: string;
  name: string;
  formattedAddress: string;
  coordinates: { lat: number; lng: number };
  types: string[];
  mapboxProperties?: Record<string, unknown>;
};

type EditStepDialogProps = {
  isOpen: boolean;
  step: DayItinerary | null;
  itineraryId: number;
  existingDestinations: Destination[];
  onRequestClose: () => void;
  onStepUpdated?: (stepId: number) => void;
  onStepDeleted?: (step: DayItinerary) => void;
};

export function EditStepDialog({
  isOpen,
  step,
  itineraryId,
  existingDestinations,
  onRequestClose,
  onStepUpdated,
  onStepDeleted,
}: EditStepDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetails | null>(null);
  const [isLoadingPlaceDetails, setIsLoadingPlaceDetails] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [formDate, setFormDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMapSelectionOpen, setIsMapSelectionOpen] = useState(false);
  const [mapSelectedCoordinates, setMapSelectedCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const languageCode: 'fr' | 'en' = 'fr';

  const updateStepMutation = useUpdateStep();
  const createDestinationMutation = useCreateDestination();
  const deleteStepMutation = useDeleteStep();

  useEffect(() => {
    if (isOpen && step) {
      setSearchQuery(step.destination?.name ?? '');
      setNotes(step.notes ?? '');
      setFormDate(step.date.slice(0, 10));
      if (step.destination?.coordinates) {
        setSelectedPlace({
          id: step.destination.id ? step.destination.id.toString() : `dest-${step.order}`,
          name: step.destination.name ?? '',
          formattedAddress: step.destination.address ?? '',
          coordinates: step.destination.coordinates,
          types: step.destination.category ? [step.destination.category] : [],
        });
        setMapSelectedCoordinates(step.destination.coordinates);
      } else {
        setSelectedPlace(null);
        setMapSelectedCoordinates(null);
      }
      setSubmissionError(null);
      setIsMapSelectionOpen(false);
    }
    if (!isOpen) {
      setSuggestions([]);
      setSearchQuery('');
      setSelectedPlace(null);
      setNotes('');
      setIsSubmitting(false);
      setSubmissionError(null);
      setIsMapSelectionOpen(false);
      setMapSelectedCoordinates(null);
      setIsLoadingPlaceDetails(false);
    }
  }, [isOpen, step]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const timeout = window.setTimeout(async () => {
      try {
        setIsLoadingSuggestions(true);
        const response = await fetch('/api/places/autocomplete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: searchQuery.trim(),
            languageCode,
          }),
        });

        if (!response.ok) {
          console.error('Failed to fetch suggestions', await response.text());
          setSuggestions([]);
          return;
        }

        const data = (await response.json()) as { suggestions?: PlaceSuggestion[] };
        setSuggestions(data.suggestions ?? []);
      } catch (error) {
        console.error('Autocomplete error', error);
        setSuggestions([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    }, DEBOUNCE_TIMES.AUTOCOMPLETE);

    return () => window.clearTimeout(timeout);
  }, [searchQuery, languageCode, isOpen]);

  useEffect(() => {
    if (selectedPlace) {
      setMapSelectedCoordinates(selectedPlace.coordinates);
    }
  }, [selectedPlace]);

  const closeDialog = useCallback(() => {
    onRequestClose();
  }, [onRequestClose]);

  const handleSuggestionSelect = useCallback(async (suggestion: PlaceSuggestion) => {
    try {
      setIsLoadingPlaceDetails(true);
      setSubmissionError(null);
      const response = await fetch('/api/places/details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          placeId: suggestion.placeId,
          languageCode,
        }),
      });

      if (!response.ok) {
        const details = await response.text();
        throw new Error(details || 'Failed to fetch place details');
      }

      const data = (await response.json()) as { place: PlaceDetails };
      setSelectedPlace(data.place);
      setSearchQuery(suggestion.primaryText);
      setSuggestions([]);
      if (data.place.formattedAddress) {
        setNotes((previousNotes) => (previousNotes.trim() ? previousNotes : data.place.formattedAddress));
      }
      setMapSelectedCoordinates(data.place.coordinates);
    } catch (error) {
      console.error(error);
      setSubmissionError(
        error instanceof Error ? error.message : 'Impossible de récupérer les détails du lieu sélectionné.'
      );
    } finally {
      setIsLoadingPlaceDetails(false);
    }
  }, [languageCode]);

  const handleMapPointSelect = useCallback(async (coordinates: { lat: number; lng: number }) => {
    setMapSelectedCoordinates(coordinates);
    setSubmissionError(null);
    setIsLoadingPlaceDetails(true);

    try {
      const response = await fetch('/api/places/reverse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          coordinates,
          languageCode,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Impossible de récupérer les informations du lieu sélectionné.');
      }

      const data = (await response.json()) as { place: PlaceDetails };
      setSelectedPlace(data.place);
      setSearchQuery(data.place.name || 'Point sélectionné');
      if (data.place.formattedAddress) {
        setNotes((previousNotes) => (previousNotes.trim() ? previousNotes : data.place.formattedAddress));
      }
    } catch (error) {
      console.error('Reverse geocoding error', error);
      setSelectedPlace({
        id: `${coordinates.lat.toFixed(5)},${coordinates.lng.toFixed(5)}`,
        name: 'Point sélectionné',
        formattedAddress: '',
        coordinates,
        types: [],
      });
      setSearchQuery('Point sélectionné');
      setSubmissionError(
        'Informations précises indisponibles pour ce point. Vous pouvez ajuster le nom et les notes manuellement.'
      );
    } finally {
      setIsLoadingPlaceDetails(false);
    }
  }, [languageCode]);

  const handleSubmit = useCallback(async () => {
    if (!step) {
      return;
    }

    if (!formDate) {
      setSubmissionError('Choisissez une date pour cette étape.');
      return;
    }

    const referenceName = (selectedPlace?.name ?? searchQuery ?? '').trim() || step.destination?.name ?? '';
    const referenceCoordinates = selectedPlace?.coordinates ?? step.destination?.coordinates ?? null;
    const referenceAddress = selectedPlace?.formattedAddress ?? step.destination?.address ?? '';
    const referenceTypes = selectedPlace?.types ?? (step.destination?.category ? [step.destination.category] : []);
    const referenceId = selectedPlace?.id ?? (step.destination?.id ? step.destination.id.toString() : undefined);

    if (!referenceName) {
      setSubmissionError('Indiquez un nom pour cette destination.');
      return;
    }

    if (!referenceCoordinates) {
      setSubmissionError('Sélectionnez une destination pour cette étape.');
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      let destinationId: number | undefined = step.destination?.id;

      const matchedDestination = existingDestinations.find((destination) => {
        if (destination.id && referenceId && destination.id.toString() === referenceId) {
          return true;
        }

        if (destination.name.toLowerCase() === referenceName.toLowerCase()) {
          return true;
        }

        if (destination.coordinates) {
          const latDiff = Math.abs(destination.coordinates.lat - referenceCoordinates.lat);
          const lngDiff = Math.abs(destination.coordinates.lng - referenceCoordinates.lng);
          return latDiff < 0.0005 && lngDiff < 0.0005;
        }

        return false;
      });

      if (matchedDestination) {
        destinationId = matchedDestination.id;
      } else if (!destinationId) {
        const newDestination = await createDestinationMutation.mutateAsync({
          name: referenceName || searchQuery,
          description: undefined,
          coordinates: referenceCoordinates,
          address: referenceAddress || undefined,
          category: referenceTypes?.[0] ?? undefined,
        });
        destinationId = newDestination.id;
      } else if (step.destination?.id && referenceName !== step.destination.name) {
        const newDestination = await createDestinationMutation.mutateAsync({
          name: referenceName || searchQuery,
          description: undefined,
          coordinates: referenceCoordinates,
          address: referenceAddress || undefined,
          category: referenceTypes?.[0] ?? undefined,
        });
        destinationId = newDestination.id;
      }

      if (!destinationId) {
        throw new Error('Impossible de déterminer la destination à associer.');
      }

      const result = await updateStepMutation.mutateAsync({
        id: step.id,
        itineraryId,
        date: formDate,
        destinationId,
        notes: notes.trim() ? notes.trim() : undefined,
        order: step.order,
        activities: step.activities.map((activity) => ({
          id: activity.id,
          title: activity.title,
          description: activity.description,
          destinationId: activity.destinationId,
          startTime: activity.startTime,
          endTime: activity.endTime,
          category: activity.category,
        })),
        bikeSegment: step.bikeSegment,
        transportToNext: step.transportToNext,
      });

      if (typeof result.id === 'number') {
        onStepUpdated?.(result.id);
      }
      closeDialog();
    } catch (error) {
      console.error(error);
      setSubmissionError(
        error instanceof Error
          ? error.message
          : 'Une erreur est survenue lors de la mise à jour de cette étape.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [
    closeDialog,
    createDestinationMutation,
    existingDestinations,
    formDate,
    itineraryId,
    notes,
    searchQuery,
    selectedPlace,
    step,
    updateStepMutation,
    onStepUpdated,
  ]);

  const handleDeleteStep = useCallback(async () => {
    if (!step?.id) {
      return;
    }

    const userConfirmed = window.confirm('Voulez-vous vraiment supprimer cette étape ? Cette action est définitive.');
    if (!userConfirmed) {
      return;
    }

    try {
      setIsDeleting(true);
      setSubmissionError(null);
      await deleteStepMutation.mutateAsync(step.id);
      onStepDeleted?.(step);
      closeDialog();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      setSubmissionError('Impossible de supprimer cette étape pour le moment. Réessayez plus tard.');
    } finally {
      setIsDeleting(false);
    }
  }, [closeDialog, deleteStepMutation, onStepDeleted, step]);

  if (!isOpen || !step) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Modifier l&apos;étape</h2>
            <p className="text-xs text-gray-500">Actualisez la destination, la date ou vos notes en conservant les activités existantes.</p>
          </div>
          <div className="flex items-center gap-1.5">
            {step.id && (
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 focus-visible:ring-red-500/60"
                onClick={handleDeleteStep}
                disabled={isSubmitting || isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                <span className="sr-only">Supprimer l&apos;étape</span>
              </Button>
            )}
            <button
              type="button"
              onClick={closeDialog}
              className="text-sm text-gray-400 hover:text-gray-600"
              disabled={isSubmitting || isDeleting}
            >
              ✕
            </button>
          </div>
        </div>

        <div className="px-5 py-4 space-y-4">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="block text-xs font-medium text-gray-600">Destination</label>
              <button
                type="button"
                className="text-xs font-medium text-blue-600 hover:text-blue-700"
                onClick={() => setIsMapSelectionOpen((current) => !current)}
              >
                {isMapSelectionOpen ? 'Fermer la carte' : 'Sélectionner sur la carte'}
              </button>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => {
                const { value } = event.target;
                setSearchQuery(value);
                setSubmissionError(null);
                if (!value.trim()) {
                  setSelectedPlace(null);
                  setMapSelectedCoordinates(null);
                } else {
                  setSelectedPlace((previous) =>
                    previous
                      ? {
                          ...previous,
                          name: value,
                        }
                      : step.destination?.coordinates
                      ? {
                          id: step.destination.id ? step.destination.id.toString() : `dest-${step.order}`,
                          name: value,
                          formattedAddress: step.destination.address ?? '',
                          coordinates: step.destination.coordinates,
                          types: step.destination.category ? [step.destination.category] : [],
                        }
                      : null
                  );
                  if (!mapSelectedCoordinates && step.destination?.coordinates) {
                    setMapSelectedCoordinates(step.destination.coordinates);
                  }
                }
              }}
              placeholder="Modifier le lieu de l'étape"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
            />
            {isLoadingSuggestions && (
              <p className="mt-1 text-xs text-gray-400">Recherche…</p>
            )}
            {!isLoadingSuggestions && suggestions.length > 0 && (
              <ul className="mt-2 max-h-48 overflow-y-auto rounded border border-gray-200 bg-white text-sm shadow-sm">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.placeId}
                    className="cursor-pointer px-3 py-2 hover:bg-blue-50"
                    onClick={() => handleSuggestionSelect(suggestion)}
                  >
                    <div className="font-medium text-gray-800">{suggestion.primaryText}</div>
                    {suggestion.secondaryText && (
                      <div className="text-xs text-gray-500">{suggestion.secondaryText}</div>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {isMapSelectionOpen && (
              <div className="mt-4 space-y-3 text-xs text-gray-600">
                <div className="rounded-md border border-blue-100 bg-blue-50 px-3 py-2 text-blue-800">
                  Cliquez sur la carte pour repositionner cette étape. Vous pourrez ajuster son nom ensuite si nécessaire.
                </div>
                <MapPointSelector
                  selectedCoordinates={mapSelectedCoordinates}
                  onSelect={handleMapPointSelect}
                  className="h-56"
                />
                {mapSelectedCoordinates && (
                  <div className="rounded border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700">
                    <div className="font-semibold text-gray-800">Point sélectionné</div>
                    <p>Latitude : {mapSelectedCoordinates.lat.toFixed(6)}</p>
                    <p>Longitude : {mapSelectedCoordinates.lng.toFixed(6)}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Date</label>
              <input
                type="date"
                value={formDate}
                onChange={(event) => setFormDate(event.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Adresse</label>
              <input
                type="text"
                value={selectedPlace?.formattedAddress ?? step.destination?.address ?? ''}
                readOnly
                placeholder="Adresse complète"
                className="w-full rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
              placeholder="Mettez à jour les informations pratiques"
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {submissionError && (
            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
              {submissionError}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-400">
              Les modifications sont synchronisées avec votre itinéraire. Vérifiez les informations avant de valider.
            </p>
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                className="h-8 px-3 text-sm"
                onClick={closeDialog}
                disabled={isSubmitting || isDeleting}
              >
                Annuler
              </Button>
              <Button
                className="h-8 px-4 text-sm"
                onClick={handleSubmit}
                disabled={isSubmitting || isLoadingPlaceDetails || isDeleting}
              >
                {isSubmitting ? 'Enregistrement…' : 'Enregistrer'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
