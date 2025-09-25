'use client';

import { useState } from 'react';
import Map, { Marker, Popup, NavigationControl, ScaleControl, MapboxStyle } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import { Destination } from '@/types/travel';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  destinations: Destination[];
  center?: [number, number];
  zoom?: number;
  className?: string;
  mapStyle?: string;
  onStyleChange?: (style: string) => void;
}

// Styles de carte Mapbox prédéfinis disponibles gratuitement
export const MAPBOX_STYLES = {
  streets: 'mapbox://styles/mapbox/streets-v12',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v12',
  outdoors: 'mapbox://styles/mapbox/outdoors-v12',
  light: 'mapbox://styles/mapbox/light-v11',
  dark: 'mapbox://styles/mapbox/dark-v11',
  navigationDay: 'mapbox://styles/mapbox/navigation-day-v1',
  navigationNight: 'mapbox://styles/mapbox/navigation-night-v1',
} as const;

type MapboxStyleKey = keyof typeof MAPBOX_STYLES;

export default function TravelMap({
  destinations,
  center = [48.8566, 2.3522], // Default to Paris
  zoom = 12,
  className = "h-96 w-full rounded-lg",
  mapStyle = MAPBOX_STYLES.streets,
  onStyleChange
}: MapProps) {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  // Vous devez créer un compte sur https://account.mapbox.com/
  // et remplacer cette clé par la vôtre dans .env.local
  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';

  // Si pas de clé valide, afficher un message d'erreur
  if (!mapboxAccessToken || mapboxAccessToken.includes('example')) {
    return (
      <div className={`${className} bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center`}>
        <div className="text-center p-6">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Carte Mapbox</h3>
          <p className="text-gray-500 mb-4">
            Pour afficher la carte, vous devez configurer votre clé API Mapbox.
          </p>
          <div className="text-sm text-gray-400">
            <p>1. Créez un compte sur <a href="https://account.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">mapbox.com</a></p>
            <p>2. Générez une clé API dans "Access tokens"</p>
            <p>3. Ajoutez-la dans un fichier <code className="bg-gray-200 px-1 rounded">.env.local</code> :</p>
            <code className="block bg-gray-200 p-2 mt-2 rounded text-xs">
              NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=votre_clé_api_ici
            </code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <Map
        mapboxAccessToken={mapboxAccessToken}
        initialViewState={{
          longitude: center[1],
          latitude: center[0],
          zoom: zoom,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapStyle}
        onClick={() => setSelectedDestination(null)}
      >
        <NavigationControl position="top-right" />
        <ScaleControl position="bottom-left" />

        {destinations.map((destination) => (
          <Marker
            key={destination.id}
            longitude={destination.coordinates.lng}
            latitude={destination.coordinates.lat}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedDestination(destination);
            }}
          >
            <div className="cursor-pointer transform hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6 text-red-500 fill-current" />
            </div>
          </Marker>
        ))}

        {selectedDestination && (
          <Popup
            longitude={selectedDestination.coordinates.lng}
            latitude={selectedDestination.coordinates.lat}
            onClose={() => setSelectedDestination(null)}
            closeButton={true}
            closeOnClick={false}
            offsetTop={-10}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-semibold text-lg mb-2">{selectedDestination.name}</h3>
              {selectedDestination.description && (
                <p className="text-sm text-gray-600 mb-2">{selectedDestination.description}</p>
              )}
              {selectedDestination.address && (
                <p className="text-sm text-gray-500 mb-2">{selectedDestination.address}</p>
              )}
              {selectedDestination.category && (
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
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
