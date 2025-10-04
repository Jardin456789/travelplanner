'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Map, { Popup, NavigationControl, ScaleControl, MapRef, Marker } from 'react-map-gl';
import type { MapMouseEvent } from 'mapbox-gl';
import Image from 'next/image';
import { Destination, DayItinerary } from '@/types/travel';
import { calculateOptimalView } from '@/lib/map-utils';
import { useDestinationGroups } from '@/hooks/useDestinationGroups';
import { useTransportSegments } from '@/hooks/useTransportSegments';
import { TransportMarkers } from './TransportMarkers';
import { MapLayers } from './MapLayers';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  destinations: Destination[];
  dayItineraries?: DayItinerary[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  mapStyle?: string;
  onStyleChange?: (style: string) => void;
  selectedStep?: DayItinerary | null;
  onStepSelect?: (step: DayItinerary) => void;
  onMonthOpen?: (monthKey: string) => void;
}

// Styles de carte disponibles (Mapbox + alternatives gratuites)
export const MAPBOX_STYLES = {
  // Styles Mapbox (nécessitent un token valide)
  streets: 'mapbox://styles/mapbox/streets-v12',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v12',
  outdoors: 'mapbox://styles/mapbox/outdoors-v12',
  light: 'mapbox://styles/mapbox/light-v11',
  dark: 'mapbox://styles/mapbox/dark-v11',
  navigationDay: 'mapbox://styles/mapbox/navigation-day-v1',
  navigationNight: 'mapbox://styles/mapbox/navigation-night-v1',
} as const;

// Styles alternatifs gratuits (pas de token requis)
export const FREE_STYLES = {
  osm: {
    version: 8,
    sources: {
      'osm-tiles': {
        type: 'raster',
        tiles: [
          'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
          'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
          'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
        ],
        tileSize: 256,
        attribution: '© OpenStreetMap contributors'
      }
    },
    layers: [{
      id: 'osm-tiles',
      type: 'raster',
      source: 'osm-tiles',
      minzoom: 0,
      maxzoom: 19
    }]
  }
};



export default function TravelMap({
  destinations,
  dayItineraries = [],
  center: providedCenter,
  zoom: providedZoom,
  className = "h-96 w-full rounded-lg",
  mapStyle = MAPBOX_STYLES.satelliteStreets,
  selectedStep,
  onStepSelect,
  onMonthOpen
}: MapProps) {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number] | undefined>(providedCenter);
  const [currentZoomLevel, setCurrentZoomLevel] = useState<number>(providedZoom || 6);
  const mapRef = useRef<MapRef>(null);

  // L'étape actuelle est déterminée par le parent (selectedStep)

  // Centrage automatique sur l'étape sélectionnée (sans changer le zoom)
  useEffect(() => {
    if (selectedStep && mapRef.current) {
      const { coordinates } = selectedStep.destination;
      const newCenter: [number, number] = [coordinates.lat, coordinates.lng];

      setMapCenter(newCenter);

      // Animer le déplacement de la carte en gardant le zoom actuel
      const currentZoom = mapRef.current.getZoom();
      mapRef.current.flyTo({
        center: [coordinates.lng, coordinates.lat],
        zoom: currentZoom, // Garder le zoom actuel
        duration: 1500,
        essential: true
      });
    }
  }, [selectedStep]);

  // Calculer automatiquement le centre et zoom optimaux pour l'itinéraire
  const { center, zoom } = useMemo(() => {
    // Si on a un état local (zoom sur une étape sélectionnée), l'utiliser
    if (mapCenter && currentZoomLevel !== undefined) {
      return { center: mapCenter, zoom: currentZoomLevel };
    }

    // Si des valeurs sont fournies explicitement, les utiliser
    if (providedCenter && providedZoom !== undefined) {
      return { center: providedCenter, zoom: providedZoom };
    }

    // Sinon, calculer automatiquement en privilégiant l'étape actuelle
    return calculateOptimalView(destinations, dayItineraries, selectedStep);
  }, [destinations, dayItineraries, selectedStep, providedCenter, providedZoom, mapCenter, currentZoomLevel]);

  // Utiliser les hooks pour les données
  const destinationGroups = useDestinationGroups(dayItineraries);
  const transportSegments = useTransportSegments(dayItineraries);

  // Créer les données pour les lignes reliant les destinations
  const routeData = useMemo(() => {
    if (dayItineraries.length < 2) return null;

    const coordinates = dayItineraries
      .sort((a, b) => a.order - b.order)
      .map(day => [day.destination.coordinates.lng, day.destination.coordinates.lat] as [number, number]);

    return {
      type: 'Feature' as const,
      properties: {},
      geometry: {
        type: 'LineString' as const,
        coordinates
      }
    };
  }, [dayItineraries]);

  // Créer les données GeoJSON pour le clustering des destinations (utilise useDestinationGroups)
  const destinationsGeoJson = useMemo(() => {
    const features = destinationGroups.map((group, index) => {
      // Déterminer le statut du groupe
      const isCurrentGroup = selectedStep &&
        selectedStep.order >= group.startOrder &&
        selectedStep.order <= group.endOrder;

      const isPastGroup = selectedStep && group.endOrder < selectedStep.order;

      const isSelectedGroup = selectedStep &&
        selectedStep.order >= group.startOrder &&
        selectedStep.order <= group.endOrder;

      return {
        type: 'Feature' as const,
        properties: {
          id: group.destination.id,
          order: group.startOrder,
          name: group.destination.name,
          isCurrentStep: isCurrentGroup,
          isPastStep: isPastGroup,
          isSelectedStep: isSelectedGroup,
          dayIndex: index, // Index du groupe pour retrouver les étapes
          dayCount: group.days.length, // Nombre de jours dans ce lieu
          days: group.days // Toutes les étapes du groupe
        },
        geometry: {
          type: 'Point' as const,
          coordinates: [group.destination.coordinates.lng, group.destination.coordinates.lat] as [number, number]
        }
      };
    });

    return {
      type: 'FeatureCollection' as const,
      features
    };
  }, [destinationGroups, selectedStep]);

  // Synchroniser le niveau de zoom actuel avec les changements calculés
  useEffect(() => {
    if (zoom && zoom !== currentZoomLevel) {
      setCurrentZoomLevel(zoom);
    }
  }, [zoom, currentZoomLevel]);

  // Utiliser uniquement la variable d'environnement
  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  // Token de fallback temporaire pour le développement
  const FALLBACK_TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNsN3R5NzB6YjBhenozZG8xbzVvcW1xaWsifQ.8Kv3X8zv9yN0QX9YxF5ZGQ';

  // Utiliser le token de l'environnement ou le fallback
  const finalToken = mapboxAccessToken || FALLBACK_TOKEN;

  // Déterminer si on utilise Mapbox ou OpenStreetMap
  const useMapbox = finalToken && finalToken !== FALLBACK_TOKEN;
  const finalMapStyle = useMapbox ? mapStyle : FREE_STYLES.osm;

  // Gestionnaire de clic pour les clusters et points
  const handleMapClick = useCallback((event: MapMouseEvent) => {
    const features = event.target.queryRenderedFeatures(event.point, {
      layers: ['clusters', 'unclustered-point']
    });

    if (features.length > 0) {
      const feature = features[0];

      if (feature.layer.id === 'clusters') {
        // Zoomer sur le cluster
        const clusterId = feature.properties?.cluster_id;
        if (!clusterId) return;

        const mapboxSource = event.target.getSource('destinations');
        (mapboxSource as { getClusterExpansionZoom: (id: number, callback: (err: Error | null, zoom: number) => void) => void }).getClusterExpansionZoom(clusterId, (err: Error | null, zoom: number) => {
          if (err) return;
          event.target.easeTo({
            center: (feature.geometry as GeoJSON.Point).coordinates as [number, number],
            zoom: zoom
          });
        });

        // Ouvrir le mois correspondant dans le menu latéral
        if (onMonthOpen) {
          // Trouver les étapes proches du centre du cluster
          const clusterCenter = (feature.geometry as GeoJSON.Point).coordinates as [number, number];
          const [clusterLng, clusterLat] = clusterCenter;

          // Chercher l'étape la plus proche du centre du cluster
          let closestStep: DayItinerary | null = null;
          let minDistance = Infinity;

          dayItineraries.forEach((step) => {
            const distance = Math.sqrt(
              Math.pow(step.destination.coordinates.lng - clusterLng, 2) +
              Math.pow(step.destination.coordinates.lat - clusterLat, 2)
            );

            if (distance < minDistance) {
              minDistance = distance;
              closestStep = step;
            }
          });

          if (closestStep && onMonthOpen) {
            // Ouvrir le mois de cette étape
            const stepDate = new Date((closestStep as DayItinerary).date);
            const monthKey = stepDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }).toLowerCase().replace(' ', '-');
            onMonthOpen(monthKey);
          }
        }
      } else if (feature.layer.id === 'unclustered-point') {
        // Sélectionner le groupe d'étapes (première étape du groupe)
        const groupIndex = feature.properties?.dayIndex;

        if (groupIndex >= 0 && groupIndex < destinationGroups.length) {
          const group = destinationGroups[groupIndex];
          // Sélectionner la première étape du groupe
          const firstDay = group.days[0];
          if (firstDay) {
            setSelectedDestination(firstDay.destination);
            onStepSelect?.(firstDay);
          }
        }
      }
    } else {
      // Clic sur un espace vide
      setSelectedDestination(null);
    }
  }, [destinationGroups, dayItineraries, onMonthOpen, onStepSelect, setSelectedDestination]);

  return (
    <div className={className}>
      <Map
        ref={mapRef}
        mapboxAccessToken={finalToken}
        initialViewState={{
          longitude: center[1],
          latitude: center[0],
          zoom: zoom,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={typeof finalMapStyle === 'string' ? finalMapStyle : MAPBOX_STYLES.streets}
        onClick={handleMapClick}
        onZoomEnd={(e) => setCurrentZoomLevel(e.target.getZoom())}
        interactiveLayerIds={['clusters', 'unclustered-point']}
      >
        <NavigationControl position="top-right" />
        <ScaleControl position="bottom-left" />

        <MapLayers routeData={routeData} destinationsGeoJson={destinationsGeoJson} />
        <TransportMarkers segments={transportSegments} />

        {/* GIF au-dessus de l'étape actuelle sur la carte */}
        {selectedStep && (
          <Marker
            longitude={selectedStep.destination.coordinates.lng}
            latitude={selectedStep.destination.coordinates.lat}
            offset={[0, -32]}
            style={{ zIndex: 10 }}
          >
            <div className="w-16 h-16 rounded-full bg-white border-4 border-gray-300 flex items-center justify-center shadow-lg pointer-events-none">
              <Image
                src="/current-step.gif"
                alt="Étape actuelle"
                width={56}
                height={56}
                className="w-14 h-14 object-cover rounded-full"
              />
            </div>
          </Marker>
        )}

        {selectedDestination && (
          <Popup
            longitude={selectedDestination.coordinates.lng}
            latitude={selectedDestination.coordinates.lat}
            onClose={() => setSelectedDestination(null)}
            closeButton={true}
            closeOnClick={false}
            offset={[0, -10]}
            className="rounded-lg"
          >
            <div className="bg-white/95 backdrop-blur-md border border-white/30 p-3 max-w-xs rounded-lg shadow-xl">
              <h3 className="font-semibold text-lg mb-2 text-gray-900">{selectedDestination.name}</h3>
              {selectedDestination.description && (
                <p className="text-sm text-gray-700 mb-2">{selectedDestination.description}</p>
              )}
              {selectedDestination.address && (
                <p className="text-sm text-gray-600 mb-2">{selectedDestination.address}</p>
              )}
              {selectedDestination.category && (
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-medium border border-gray-200">
                  {selectedDestination.category}
                </span>
              )}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
