'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { format, parseISO, isAfter, isBefore, isEqual } from 'date-fns';
import Map, { Marker, Popup, NavigationControl, ScaleControl, MapboxStyle, Source, Layer } from 'react-map-gl';
import { MapPin, Plane, Bus, Train, Car, Bike, Ship, Footprints } from 'lucide-react';
import { Destination, DayItinerary, TransportType } from '@/types/travel';
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

type MapboxStyleKey = keyof typeof MAPBOX_STYLES;

// Fonction pour obtenir l'icône de transport
const getTransportIcon = (type: TransportType) => {
  switch (type) {
    case 'plane': return Plane;
    case 'bus': return Bus;
    case 'train': return Train;
    case 'car': return Car;
    case 'bike': return Bike;
    case 'boat': return Ship;
    case 'walk': return Footprints;
    default: return MapPin;
  }
};

// Fonction pour calculer le point milieu entre deux coordonnées
const getMidpoint = (coord1: [number, number], coord2: [number, number]): [number, number] => {
  return [
    (coord1[0] + coord2[0]) / 2,
    (coord1[1] + coord2[1]) / 2
  ];
};

// Fonction pour calculer la distance approximative entre deux points (en km)
const calculateDistance = (coord1: [number, number], coord2: [number, number]): number => {
  const [lng1, lat1] = coord1;
  const [lng2, lat2] = coord2;

  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Fonction pour calculer les limites géographiques et le zoom optimal
const calculateMapBounds = (destinations: Destination[]) => {
  if (destinations.length === 0) {
    return { center: [48.8566, 2.3522] as [number, number], zoom: 12 };
  }

  if (destinations.length === 1) {
    const dest = destinations[0];
    return { center: [dest.coordinates.lat, dest.coordinates.lng] as [number, number], zoom: 12 };
  }

  // Calculer les limites
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;

  destinations.forEach(dest => {
    minLat = Math.min(minLat, dest.coordinates.lat);
    maxLat = Math.max(maxLat, dest.coordinates.lat);
    minLng = Math.min(minLng, dest.coordinates.lng);
    maxLng = Math.max(maxLng, dest.coordinates.lng);
  });

  // Calculer le centre
  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;

  // Calculer la distance maximale pour déterminer le zoom
  const latDiff = maxLat - minLat;
  const lngDiff = maxLng - minLng;

  // Formule approximative pour le zoom basé sur la distance
  // Plus la distance est grande, plus le zoom est petit
  const maxDiff = Math.max(latDiff, lngDiff);
  let zoom = 12;

  if (maxDiff > 10) zoom = 4;      // Très grande distance (continents)
  else if (maxDiff > 5) zoom = 5;  // Grande distance (pays)
  else if (maxDiff > 2) zoom = 6;  // Distance moyenne (régions)
  else if (maxDiff > 1) zoom = 7;  // Petite distance
  else if (maxDiff > 0.5) zoom = 8; // Très petite distance
  else if (maxDiff > 0.2) zoom = 9; // Distance locale
  else zoom = 10;                  // Distance très locale

  return {
    center: [centerLat, centerLng] as [number, number],
    zoom: Math.max(3, Math.min(15, zoom)) // Limiter entre 3 et 15
  };
};

// Fonction pour déterminer le centre et zoom optimal en privilégiant l'étape actuelle
const calculateOptimalView = (destinations: Destination[], dayItineraries: DayItinerary[], currentStep?: DayItinerary | null) => {
  // Si on a une étape actuelle, centrer dessus avec un zoom confortable
  if (currentStep) {
    const { coordinates } = currentStep.destination;
    return {
      center: [coordinates.lat, coordinates.lng] as [number, number],
      zoom: 6 // Zoom plus large pour voir la région autour de l'étape actuelle
    };
  }

  // Sinon, utiliser le calcul par défaut
  return calculateMapBounds(destinations);
};

export default function TravelMap({
  destinations,
  dayItineraries = [],
  center: providedCenter,
  zoom: providedZoom,
  className = "h-96 w-full rounded-lg",
  mapStyle = MAPBOX_STYLES.satelliteStreets,
  onStyleChange,
  selectedStep,
  onStepSelect,
  onMonthOpen
}: MapProps) {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number] | undefined>(providedCenter);
  const [mapZoom, setMapZoom] = useState<number | undefined>(providedZoom);
  const [currentZoomLevel, setCurrentZoomLevel] = useState<number>(providedZoom || 6); // Niveau de zoom actuel
  const mapRef = useRef<any>(null);

  // Déterminer l'étape actuelle basée sur la date
  const currentStep = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day

    return dayItineraries
      .sort((a, b) => a.order - b.order)
      .find(day => {
        const dayDate = parseISO(day.date);
        dayDate.setHours(0, 0, 0, 0);
        return isEqual(dayDate, today) || isBefore(dayDate, today);
      });
  }, [dayItineraries]);

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
    if (mapCenter && mapZoom !== undefined) {
      return { center: mapCenter, zoom: mapZoom };
    }

    // Si des valeurs sont fournies explicitement, les utiliser
    if (providedCenter && providedZoom !== undefined) {
      return { center: providedCenter, zoom: providedZoom };
    }

    // Sinon, calculer automatiquement en privilégiant l'étape actuelle
    return calculateOptimalView(destinations, dayItineraries, currentStep);
  }, [destinations, dayItineraries, currentStep, providedCenter, providedZoom, mapCenter, mapZoom]);

  // Synchroniser le niveau de zoom actuel avec les changements calculés
  useEffect(() => {
    if (zoom && zoom !== currentZoomLevel) {
      setCurrentZoomLevel(zoom);
    }
  }, [zoom, currentZoomLevel]);

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

  // Créer les données GeoJSON pour le clustering des destinations
  const destinationsGeoJson = useMemo(() => {
    const features = dayItineraries.map((day, index) => {
      const isCurrentStep = currentStep && currentStep.order === day.order;
      const isPastStep = currentStep && day.order < currentStep.order;
      const isSelectedStep = selectedStep && selectedStep.order === day.order;

      return {
        type: 'Feature' as const,
        properties: {
          id: day.destination.id,
          order: day.order,
          name: day.destination.name,
          isCurrentStep,
          isPastStep,
          isSelectedStep,
          dayIndex: index // Index pour retrouver l'étape
        },
        geometry: {
          type: 'Point' as const,
          coordinates: [day.destination.coordinates.lng, day.destination.coordinates.lat] as [number, number]
        }
      };
    });

    return {
      type: 'FeatureCollection' as const,
      features
    };
  }, [dayItineraries, currentStep, selectedStep]);

  // Créer les segments de transport entre les étapes
  const transportSegments = useMemo(() => {
    // Ne montrer les icônes de transport que si le zoom est suffisamment élevé
    if (currentZoomLevel < 8) return [];

    return dayItineraries
      .sort((a, b) => a.order - b.order)
      .filter(day => day.transportToNext)
      .map((day, index) => {
        const nextDay = dayItineraries.find(d => d.order === day.order + 1);
        if (!nextDay || !day.transportToNext) return null;

        const startCoord: [number, number] = [day.destination.coordinates.lng, day.destination.coordinates.lat];
        const endCoord: [number, number] = [nextDay.destination.coordinates.lng, nextDay.destination.coordinates.lat];

        // Vérifier si c'est la même destination (séjour prolongé dans une ville)
        const sameDestination = day.destination.id === nextDay.destination.id;
        if (sameDestination) return null; // Pas d'icône pour les séjours dans la même ville

        // Calculer la distance et filtrer les transports trop courts (< 10km)
        const distance = calculateDistance(startCoord, endCoord);
        if (distance < 10) return null; // Ne pas afficher les icônes pour les déplacements très courts

        const midpoint = getMidpoint(startCoord, endCoord);

        return {
          id: `transport-${day.order}`,
          type: day.transportToNext.type,
          position: midpoint,
          transport: day.transportToNext
        };
      })
      .filter(Boolean);
  }, [dayItineraries, currentZoomLevel]);

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
  const handleMapClick = (event: any) => {
    const features = event.target.queryRenderedFeatures(event.point, {
      layers: ['clusters', 'unclustered-point']
    });

    if (features.length > 0) {
      const feature = features[0];

      if (feature.layer.id === 'clusters') {
        // Zoomer sur le cluster
        const clusterId = feature.properties.cluster_id;
        const mapboxSource = event.target.getSource('destinations');
        mapboxSource.getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
          if (err) return;
          event.target.easeTo({
            center: feature.geometry.coordinates,
            zoom: zoom
          });
        });

        // Ouvrir le mois correspondant dans le menu latéral
        if (onMonthOpen) {
          // Trouver les étapes proches du centre du cluster
          const clusterCenter = feature.geometry.coordinates;
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
        // Sélectionner l'étape
        const dayIndex = feature.properties.dayIndex;
        const dayItinerary = dayItineraries[dayIndex];
        if (dayItinerary) {
          setSelectedDestination(dayItinerary.destination);
          onStepSelect?.(dayItinerary);
        }
      }
    } else {
      // Clic sur un espace vide
      setSelectedDestination(null);
    }
  };

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

        {/* Ligne reliant les destinations - style discret blanc */}
        {routeData && (
          <Source id="route" type="geojson" data={routeData}>
            <Layer
              id="route-line"
              type="line"
              paint={{
                'line-color': '#ffffff',
                'line-width': 2,
                'line-opacity': 0.6,
              }}
            />
          </Source>
        )}

        {/* Icônes de transport entre les étapes - style discret blanc */}
        {transportSegments.map((segment) => {
          if (!segment) return null;
          const IconComponent = getTransportIcon(segment.type);

          return (
            <Marker
              key={segment.id}
              longitude={segment.position[0]}
              latitude={segment.position[1]}
              onClick={(e) => {
                e.originalEvent.stopPropagation(); // Empêcher la propagation du clic
              }}
            >
              <div className="bg-white/30 backdrop-blur-md rounded-full p-1.5 shadow-lg border border-white/40 transform hover:scale-110 transition-all duration-200 cursor-default">
                <IconComponent className="w-3 h-3 text-gray-800" />
              </div>
            </Marker>
          );
        })}

        {/* Source GeoJSON pour les destinations avec clustering */}
        <Source
          id="destinations"
          type="geojson"
          data={destinationsGeoJson}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          {/* Clusters */}
          <Layer
            id="clusters"
            type="circle"
            source="destinations"
            filter={['has', 'point_count']}
            paint={{
              'circle-color': [
                'step',
                ['get', 'point_count'],
                '#ffffff', // 1 point
                10,
                '#e5e7eb', // 10+ points
                25,
                '#d1d5db', // 25+ points
                50,
                '#9ca3af'  // 50+ points
              ],
              'circle-radius': [
                'step',
                ['get', 'point_count'],
                20, // 1 point
                10,
                25, // 10+ points
                25,
                30, // 25+ points
                50,
                35  // 50+ points
              ],
              'circle-stroke-width': 2,
              'circle-stroke-color': '#ffffff',
              'circle-opacity': 0.8
            }}
          />

          {/* Nombre de points dans les clusters */}
          <Layer
            id="cluster-count"
            type="symbol"
            source="destinations"
            filter={['has', 'point_count']}
            layout={{
              'text-field': '{point_count_abbreviated}',
              'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
              'text-size': 12,
            }}
            paint={{
              'text-color': '#374151'
            }}
          />

          {/* Points individuels (non clusterisés) */}
          <Layer
            id="unclustered-point"
            type="circle"
            source="destinations"
            filter={['!', ['has', 'point_count']]}
            paint={{
              'circle-color': [
                'case',
                ['get', 'isSelectedStep'], '#000000',
                ['get', 'isCurrentStep'], '#ffffff',
                ['get', 'isPastStep'], '#6b7280',
                '#ffffff'
              ],
              'circle-radius': 8,
              'circle-stroke-width': 2,
              'circle-stroke-color': [
                'case',
                ['get', 'isSelectedStep'], '#000000',
                ['get', 'isCurrentStep'], '#ffffff',
                ['get', 'isPastStep'], '#6b7280',
                '#ffffff'
              ],
              'circle-opacity': [
                'case',
                ['get', 'isSelectedStep'], 0.9,
                ['get', 'isCurrentStep'], 0.9,
                0.6
              ]
            }}
          />

        </Source>

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
