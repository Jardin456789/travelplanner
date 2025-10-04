'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { DayItinerary, Destination } from '@/types/travel';
import { Button } from './ui/button';
import { useUpdateStep, useCreateDestination } from '@/hooks/useTravelQueries';
import { DEBOUNCE_TIMES } from '@/lib/query-config';

type PlaceSuggestion = {
  placeId: string;
  fullText: string;
  primaryText: string;
  secondaryText?: string;
  coordinates?: { lat: number; lng: number };
  types?: string[];
};

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const languageCode: 'fr' | 'en' = 'fr';

  // Utiliser les hooks de mutation React Query
  const updateStepMutation = useUpdateStep();
  const createDestinationMutation = useCreateDestination();

  const conflictingStep = useMemo(() => {
    if (!formDate) {
      return null;
    }

    return existingSteps.find((step) => step.date.slice(0, 10) === formDate) ?? null;
  }, [existingSteps, formDate]);

  useEffect(() => {
    if (isOpen) {
      const lastStep = existingSteps.at(-1);
      if (lastStep) {
        const lastDate = new Date(lastStep.date);
        lastDate.setDate(lastDate.getDate() + 1);
        const nextDate = lastDate.toISOString().split('T')[0];
        setFormDate(nextDate);
      } else {
        const today = new Date().toISOString().split('T')[0];
        setFormDate(today);
      }
      setSubmissionError(null);
    } else {
      setSearchQuery('');
      setSuggestions([]);
      setSelectedPlace(null);
      setNotes('');
      setIsSubmitting(false);
      setSubmissionError(null);
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
  }, []);

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
        setNotes(data.place.formattedAddress);
      }
    } catch (error) {
      console.error(error);
      setSubmissionError(
        error instanceof Error ? error.message : 'Impossible de récupérer les détails du lieu sélectionné.'
      );
    } finally {
      setIsLoadingPlaceDetails(false);
    }
  }, [languageCode]);

  const handleSubmit = useCallback(async () => {
    if (!selectedPlace) {
      setSubmissionError('Sélectionnez une destination pour ajouter une étape.');
      return;
    }

    if (!formDate) {
      setSubmissionError('Choisissez une date pour cette nouvelle étape.');
      return;
    }

    const maxOrder = existingSteps.reduce((max, step) => Math.max(max, step.order), 0);
    const nextOrder = maxOrder + 1;
    const targetOrder = conflictingStep ? conflictingStep.order : nextOrder;

    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const existingDestination = existingDestinations.find((destination) => {
        if (destination.name.toLowerCase() === selectedPlace.name.toLowerCase()) {
          return true;
        }
        const latDiff = Math.abs(destination.coordinates.lat - selectedPlace.coordinates.lat);
        const lngDiff = Math.abs(destination.coordinates.lng - selectedPlace.coordinates.lng);
        return latDiff < 0.0005 && lngDiff < 0.0005;
      });

      const destinationId = existingDestination
        ? existingDestination.id
        : (await createDestinationMutation.mutateAsync({
            name: selectedPlace.name || searchQuery,
            description: undefined,
            coordinates: selectedPlace.coordinates,
            address: selectedPlace.formattedAddress || undefined,
            category: selectedPlace.types?.[0] ?? undefined,
          })).id;

      // Utiliser la mutation React Query pour créer l'étape
      const result = await updateStepMutation.mutateAsync({
        itineraryId,
        date: formDate,
        destinationId,
        notes: notes.trim() ? notes.trim() : undefined,
        order: targetOrder,
        activities: [],
      });

      if (typeof result.id === 'number') {
        onStepCreated?.(result.id);
      }
      resetForm();
      onRequestClose();
    } catch (error) {
      console.error(error);
      setSubmissionError(
        error instanceof Error
          ? error.message
          : 'Une erreur est survenue lors de la création de la nouvelle étape.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [
    selectedPlace,
    formDate,
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
    conflictingStep,
  ]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">Ajouter une étape</h2>
            <p className="text-xs text-gray-500">Recherchez une destination via Mapbox et ajoutez-la à l&apos;itinéraire.</p>
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

        <div className="px-5 py-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Destination</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setSelectedPlace(null);
              }}
              placeholder="Par exemple : Almaty, Kazakhstan"
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
              <label className="block text-xs font-medium text-gray-600 mb-1">Informations complémentaires</label>
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
            <label className="block text-xs font-medium text-gray-600 mb-1">Notes (optionnel)</label>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
              placeholder="Infos logistiques, idées d&apos;activités, etc."
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {selectedPlace && (
            <div className="rounded border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-800">
              <div className="font-semibold">Coordonnées GPS</div>
              <p>Latitude : {selectedPlace.coordinates.lat.toFixed(6)}</p>
              <p>Longitude : {selectedPlace.coordinates.lng.toFixed(6)}</p>
            </div>
          )}

          {conflictingStep && (
            <div className="rounded border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
              <div className="font-semibold">Attention : une étape existe déjà ce jour-là.</div>
              <p>
                Jour {conflictingStep.order} – {conflictingStep.destination?.name ?? 'Destination inconnue'}
              </p>
              <p>Valider remplacera son contenu par cette nouvelle destination.</p>
            </div>
          )}

          {submissionError && (
            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
              {submissionError}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4">
          <div className="text-xs text-gray-400">
            Les lieux sont fournis par l&apos;API Mapbox Geocoding. Vérifiez toujours les coordonnées avant de valider.
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
              {isSubmitting
                ? 'Ajout…'
                : conflictingStep
                ? 'Remplacer l\'étape'
                : 'Ajouter l\'étape'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
