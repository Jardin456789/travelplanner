'use client';

import { useCallback, useEffect, useRef, useState, type ChangeEvent } from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { Button } from './ui/button';
import { useUpdateStep, useCreateDestination, useReorderSteps } from '@/hooks/useTravelQueries';
import { DayItinerary, Destination } from '@/types/travel';
import { DEBOUNCE_TIMES } from '@/lib/query-config';

type PlaceSuggestion = {
  placeId: string;
  fullText: string;
  primaryText: string;
  secondaryText?: string;
  coordinates?: { lat: number; lng: number };
  types?: string[];
};

type LatLng = { lat: number; lng: number };

const COORDINATE_MATCH_THRESHOLD = 0.0003; // ~30m

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

type AddStepDialogProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  itineraryId: number;
  existingDestinations: Destination[];
  existingSteps: DayItinerary[];
  onStepCreated?: (stepId: number) => void;
};

export function AddStepDialog({
  isOpen,
  onRequestClose,
  itineraryId,
  existingDestinations,
  existingSteps,
  onStepCreated,
}: AddStepDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetails | null>(null);
  const [isLoadingPlaceDetails, setIsLoadingPlaceDetails] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [formDate, setFormDate] = useState('');
  const [notes, setNotes] = useState('');
  const [formEndDate, setFormEndDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMapSelectionOpen, setIsMapSelectionOpen] = useState(false);
  const [mapSelectedCoordinates, setMapSelectedCoordinates] = useState<LatLng | null>(null);
  const lastMapSelectionRef = useRef<LatLng | null>(null);
  const selectionSourceRef = useRef<'map' | 'search' | null>(null);

  const areCoordinatesClose = useCallback((a: LatLng, b: LatLng) => {
    const latDiff = Math.abs(a.lat - b.lat);
    const lngDiff = Math.abs(a.lng - b.lng);
    return latDiff <= COORDINATE_MATCH_THRESHOLD && lngDiff <= COORDINATE_MATCH_THRESHOLD;
  }, []);

  const buildFallbackName = useCallback((coordinates: LatLng) => {
    return `Point (${coordinates.lat.toFixed(3)}, ${coordinates.lng.toFixed(3)})`;
  }, []);
  const languageCode: 'fr' | 'en' = 'fr';

  // Utiliser les hooks de mutation React Query
  const updateStepMutation = useUpdateStep();
  const createDestinationMutation = useCreateDestination();
  const reorderStepsMutation = useReorderSteps();

  useEffect(() => {
    if (isOpen) {
      const lastStep = existingSteps.at(-1);
      if (lastStep) {
        const lastDate = new Date(lastStep.date);
        lastDate.setDate(lastDate.getDate() + 1);
        const nextDate = lastDate.toISOString().split('T')[0];
        setFormDate(nextDate);
        setFormEndDate(nextDate);
      } else {
        const today = new Date().toISOString().split('T')[0];
        setFormDate(today);
        setFormEndDate(today);
      }
      setSubmissionError(null);
    } else {
      setSearchQuery('');
      setSuggestions([]);
      setSelectedPlace(null);
      setNotes('');
      setIsSubmitting(false);
      setSubmissionError(null);
      setIsMapSelectionOpen(false);
      setMapSelectedCoordinates(null);
      setFormEndDate('');
    }
  }, [isOpen, existingSteps]);

  useEffect(() => {
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
  }, [searchQuery, languageCode]);

  const resetForm = useCallback(() => {
    setSearchQuery('');
    setSuggestions([]);
    setSelectedPlace(null);
    setNotes('');
    setIsSubmitting(false);
    setSubmissionError(null);
    setIsMapSelectionOpen(false);
    setMapSelectedCoordinates(null);
    setFormEndDate('');
    lastMapSelectionRef.current = null;
    selectionSourceRef.current = null;
  }, []);

  useEffect(() => {
    if (!mapSelectedCoordinates) {
      console.log('[AddStepDialog] mapSelectedCoordinates vides');
      return;
    }

    console.log('[AddStepDialog] mapSelectedCoordinates changées', mapSelectedCoordinates);

    if (selectionSourceRef.current === 'map' && lastMapSelectionRef.current) {
      if (!areCoordinatesClose(mapSelectedCoordinates, lastMapSelectionRef.current)) {
        console.warn('[AddStepDialog] ⚠️ La sélection carte a été écrasée', {
          attendu: lastMapSelectionRef.current,
          recu: mapSelectedCoordinates,
        });
        setMapSelectedCoordinates(lastMapSelectionRef.current);
      }
    }
  }, [mapSelectedCoordinates, areCoordinatesClose]);

  const handleDestinationInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
    setSubmissionError(null);
    console.log('[AddStepDialog] Saisie destination modifiée', { value });

    if (!value.trim()) {
      console.log('[AddStepDialog] Champ vidé -> on efface la sélection actuelle.');
      setSelectedPlace(null);
      setMapSelectedCoordinates(null);
      return;
    }

    console.log('[AddStepDialog] On garde le point existant mais on change juste le nom.');
    setSelectedPlace((previous) => (previous ? { ...previous, name: value } : previous));
  }, []);

  const handleSuggestionSelect = useCallback(
    async (suggestion: PlaceSuggestion) => {
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
          setNotes((previousNotes) =>
            previousNotes.trim() ? previousNotes : data.place.formattedAddress,
          );
        }
        selectionSourceRef.current = 'search';
        lastMapSelectionRef.current = null;
        setMapSelectedCoordinates(data.place.coordinates);
        console.log(
          '[AddStepDialog] Suggestion sélectionnée -> carte centrée',
          data.place.coordinates,
        );
      } catch (error) {
        console.error(error);
        setSubmissionError(
          error instanceof Error
            ? error.message
            : 'Impossible de récupérer les détails du lieu sélectionné.',
        );
      } finally {
        setIsLoadingPlaceDetails(false);
      }
    },
    [languageCode],
  );

  const handleMapPointSelect = useCallback(
    (coordinates: { lat: number; lng: number }) => {
      console.log('[AddStepDialog] Point cliqué sur la carte', coordinates);
      const normalizedCoordinates: LatLng = {
        lat: Number(coordinates.lat.toFixed(6)),
        lng: Number(coordinates.lng.toFixed(6)),
      };

      selectionSourceRef.current = 'map';
      lastMapSelectionRef.current = normalizedCoordinates;
      setMapSelectedCoordinates(normalizedCoordinates);
      setSubmissionError(null);
      setIsLoadingPlaceDetails(false);

      const customName = searchQuery.trim();
      const fallbackName = buildFallbackName(normalizedCoordinates);
      const nameToUse = customName || fallbackName;

      setSelectedPlace({
        id: `${normalizedCoordinates.lat.toFixed(5)},${normalizedCoordinates.lng.toFixed(5)}`,
        name: nameToUse,
        formattedAddress: '',
        coordinates: normalizedCoordinates,
        types: [],
      });

      if (!customName) {
        setSearchQuery(fallbackName);
      }

      console.log('[AddStepDialog] Point mémorisé sans auto-complétion', {
        coordinates: normalizedCoordinates,
        name: nameToUse,
      });
    },
    [buildFallbackName, searchQuery],
  );

  useEffect(() => {
    if (formEndDate && formDate && formEndDate < formDate) {
      setFormEndDate(formDate);
    }
  }, [formDate, formEndDate]);

  const handleSubmit = useCallback(async () => {
    if (!selectedPlace) {
      setSubmissionError('Sélectionnez une destination pour ajouter une étape.');
      return;
    }

    if (!formDate) {
      setSubmissionError('Choisissez une date pour cette nouvelle étape.');
      return;
    }

    const effectiveEndDate = formEndDate || formDate;
    const startDateObject = new Date(`${formDate}T00:00:00`);
    const endDateObject = new Date(`${effectiveEndDate}T00:00:00`);

    if (Number.isNaN(startDateObject.getTime()) || Number.isNaN(endDateObject.getTime())) {
      setSubmissionError('La plage de dates sélectionnée est invalide.');
      return;
    }

    if (endDateObject < startDateObject) {
      setSubmissionError('La date de fin doit être postérieure ou égale à la date de début.');
      return;
    }

    const datesToCreate: string[] = [];
    const cursorDate = new Date(startDateObject.getTime());
    while (cursorDate <= endDateObject) {
      datesToCreate.push(cursorDate.toISOString().split('T')[0]);
      cursorDate.setDate(cursorDate.getDate() + 1);
    }

    const newEntriesPlan = datesToCreate.map((date, index) => ({
      kind: 'new' as const,
      date,
      key: `${date}-${index}`,
      creationIndex: index,
    }));

    const existingPlanEntries = existingSteps.map((step) => ({
      kind: 'existing' as const,
      date: step.date,
      id: step.id,
      fallbackOrder: step.order,
    }));

    const combinedPlan = [...existingPlanEntries, ...newEntriesPlan].sort((first, second) => {
      const firstTime = new Date(first.date).getTime();
      const secondTime = new Date(second.date).getTime();

      if (firstTime !== secondTime) {
        return firstTime - secondTime;
      }

      if (first.kind === 'existing' && second.kind === 'existing') {
        return first.fallbackOrder - second.fallbackOrder;
      }

      if (first.kind === 'existing') {
        return -1;
      }

      if (second.kind === 'existing') {
        return 1;
      }

      return first.creationIndex - second.creationIndex;
    });

    const finalOrderPlan = combinedPlan.map((entry, index) => ({
      ...entry,
      targetOrder: index + 1,
    }));

    const missingExistingIds = finalOrderPlan.some(
      (entry) => entry.kind === 'existing' && typeof entry.id !== 'number',
    );

    if (missingExistingIds) {
      setSubmissionError(
        'Impossible d’ajouter une étape tant que toutes les étapes existantes ne sont pas synchronisées.',
      );
      return;
    }

    const maxOrder = existingSteps.reduce((max, step) => Math.max(max, step.order), 0);
    const baseOrder = maxOrder;

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const existingDestination = existingDestinations.find((destination) => {
        if (!destination.coordinates) {
          return false;
        }
        return areCoordinatesClose(destination.coordinates, selectedPlace.coordinates);
      });

      const destinationName =
        (selectedPlace.name || searchQuery).trim() || buildFallbackName(selectedPlace.coordinates);
      const destinationId = existingDestination
        ? existingDestination.id
        : (
            await createDestinationMutation.mutateAsync({
              name: destinationName,
              description: undefined,
              coordinates: selectedPlace.coordinates,
              address: selectedPlace.formattedAddress || undefined,
              category: selectedPlace.types?.[0] ?? undefined,
            })
          ).id;
      console.log(
        '[AddStepDialog] Destination utilisée',
        existingDestination
          ? { type: 'reuse', id: destinationId, coordinates: existingDestination.coordinates }
          : { type: 'create', id: destinationId, coordinates: selectedPlace.coordinates },
      );

      let lastCreatedStepId: number | undefined;
      const createdStepsRecords: Array<{ key: string; id: number; date: string }> = [];

      for (let index = 0; index < datesToCreate.length; index += 1) {
        const stepDate = datesToCreate[index];
        const result = await updateStepMutation.mutateAsync({
          itineraryId,
          date: stepDate,
          destinationId,
          notes: notes.trim() ? notes.trim() : undefined,
          order: baseOrder + index + 1,
          activities: [],
        });

        if (typeof result.id === 'number') {
          lastCreatedStepId = result.id;
          const planKey = newEntriesPlan[index]?.key ?? `${stepDate}-${index}`;
          createdStepsRecords.push({ key: planKey, id: result.id, date: stepDate });
        }
      }

      if (finalOrderPlan.length > 0) {
        const reorderEntries = finalOrderPlan
          .map((entry) => {
            if (entry.kind === 'existing') {
              return { id: entry.id as number, order: entry.targetOrder };
            }
            const created = createdStepsRecords.find((record) => record.key === entry.key);
            if (!created) {
              return null;
            }
            return { id: created.id, order: entry.targetOrder };
          })
          .filter((entry): entry is { id: number; order: number } => entry !== null);

        if (reorderEntries.length !== finalOrderPlan.length) {
          setSubmissionError(
            'La nouvelle étape a été ajoutée mais le tri chronologique automatique a échoué. Rafraîchissez l’itinéraire pour corriger l’affichage.',
          );
          return;
        }

        try {
          await reorderStepsMutation.mutateAsync({ steps: reorderEntries });
        } catch (reorderError) {
          console.error('Failed to reorder steps after creation', reorderError);
          setSubmissionError(
            reorderError instanceof Error
              ? reorderError.message
              : 'La nouvelle étape a été ajoutée mais la mise à jour de l’ordre a échoué.',
          );
          return;
        }
      }

      if (lastCreatedStepId) {
        onStepCreated?.(lastCreatedStepId);
      }
      resetForm();
      onRequestClose();
    } catch (error) {
      console.error(error);
      setSubmissionError(
        error instanceof Error
          ? error.message
          : 'Une erreur est survenue lors de la création de la nouvelle étape.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [
    selectedPlace,
    formDate,
    formEndDate,
    existingSteps,
    existingDestinations,
    notes,
    itineraryId,
    onStepCreated,
    resetForm,
    onRequestClose,
    searchQuery,
    createDestinationMutation,
    updateStepMutation,
    reorderStepsMutation,
    areCoordinatesClose,
    buildFallbackName,
  ]);

  const shouldShowMap = isMapSelectionOpen;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="flex w-full max-w-5xl max-h-[90vh] flex-col overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Ajouter une étape</h2>
            <p className="text-xs text-gray-500">
              Recherchez une destination via Mapbox et ajoutez-la à l&apos;itinéraire.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              resetForm();
              onRequestClose();
            }}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <div
            className={clsx(
              'flex h-full flex-col',
              shouldShowMap
                ? 'lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.5fr)] lg:divide-x lg:divide-gray-200'
                : '',
            )}
          >
            <div className="flex h-full flex-col">
              <div
                className={clsx('flex-1 overflow-y-auto px-5 py-4 space-y-4', {
                  'lg:pr-6': shouldShowMap,
                })}
              >
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <label className="block text-xs font-medium text-gray-600">Destination</label>
                    <button
                      type="button"
                      className="text-xs font-medium text-blue-600 hover:text-blue-700"
                      onClick={() => setIsMapSelectionOpen((current) => !current)}
                    >
                      {shouldShowMap ? 'Masquer la carte' : 'Sélectionner un point sur la carte'}
                    </button>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleDestinationInputChange}
                    placeholder="Par exemple : Almaty, Kazakhstan"
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                  {isLoadingSuggestions && <p className="mt-1 text-xs text-gray-400">Recherche…</p>}
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

                  {shouldShowMap && (
                    <div className="mt-4 space-y-3 text-xs text-gray-600 lg:hidden">
                      <div className="rounded-md border border-blue-100 bg-blue-50 px-3 py-2 text-blue-800">
                        Cliquez sur la carte pour positionner votre nouvelle étape. Vous pourrez
                        ajuster son nom ensuite si nécessaire.
                      </div>
                      <div className="overflow-hidden rounded-md border border-gray-200">
                        <MapPointSelector
                          selectedCoordinates={mapSelectedCoordinates}
                          onSelect={handleMapPointSelect}
                          className="h-64"
                        />
                      </div>
                      {mapSelectedCoordinates && (
                        <div className="rounded border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700">
                          <div className="font-semibold text-gray-800">Point sélectionné</div>
                          <p>Latitude : {mapSelectedCoordinates.lat.toFixed(6)}</p>
                          <p>Longitude : {mapSelectedCoordinates.lng.toFixed(6)}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {mapSelectedCoordinates && !shouldShowMap && (
                    <div className="mt-4 rounded border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-800">
                      <div className="font-semibold">Coordonnées GPS</div>
                      <p>Latitude : {mapSelectedCoordinates.lat.toFixed(6)}</p>
                      <p>Longitude : {mapSelectedCoordinates.lng.toFixed(6)}</p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Date de fin (optionnel)
                    </label>
                    <input
                      type="date"
                      value={formEndDate}
                      onChange={(event) => setFormEndDate(event.target.value)}
                      min={formDate || undefined}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                    />
                    <p className="mt-1 text-[11px] text-gray-400">
                      Laissez vide pour une seule journée ou indiquez la fin du séjour pour créer
                      plusieurs étapes.
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Informations complémentaires
                    </label>
                    <input
                      type="text"
                      value={selectedPlace?.formattedAddress ?? ''}
                      readOnly
                      placeholder="Adresse complète"
                      className="w-full rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Notes (optionnel)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    rows={3}
                    placeholder="Infos logistiques, idées d'activités, etc."
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {submissionError && (
                  <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                    {submissionError}
                  </div>
                )}
              </div>
            </div>

            {shouldShowMap && (
              <div className="hidden h-full flex-col overflow-hidden px-5 py-4 text-xs text-gray-600 lg:flex">
                <div className="rounded-md border border-blue-100 bg-blue-50 px-3 py-2 text-blue-800">
                  Cliquez sur la carte pour positionner votre nouvelle étape. Vous pourrez ajuster
                  son nom ensuite si nécessaire.
                </div>
                <div className="mt-3 flex-1 overflow-hidden rounded-md border border-gray-200">
                  <MapPointSelector
                    selectedCoordinates={mapSelectedCoordinates}
                    onSelect={handleMapPointSelect}
                    className="h-full"
                  />
                </div>
                {mapSelectedCoordinates && (
                  <div className="mt-3 rounded border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700">
                    <div className="font-semibold text-gray-800">Point sélectionné</div>
                    <p>Latitude : {mapSelectedCoordinates.lat.toFixed(6)}</p>
                    <p>Longitude : {mapSelectedCoordinates.lng.toFixed(6)}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4">
          <div className="text-xs text-gray-400">
            Les lieux sont fournis par l&apos;API Mapbox Geocoding. Vérifiez toujours les
            coordonnées avant de valider.
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-8 px-3 text-sm"
              onClick={() => {
                resetForm();
                onRequestClose();
              }}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              className="h-8 px-4 text-sm"
              onClick={handleSubmit}
              disabled={isSubmitting || isLoadingPlaceDetails}
            >
              {isSubmitting ? 'Ajout…' : "Ajouter l'étape"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
