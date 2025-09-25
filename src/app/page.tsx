'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import ItineraryCard from '@/components/ItineraryCard';
import MapStyleSelector from '@/components/MapStyleSelector';
import { Itinerary, Destination } from '@/types/travel';
import { MAPBOX_STYLES } from '@/components/Map';

// Dynamically import TravelMap component to avoid SSR issues with Mapbox
const TravelMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="h-96 w-full bg-gray-200 rounded-lg animate-pulse" />
});

// Sample data for demonstration
const sampleDestinations: Destination[] = [
  {
    id: '1',
    name: 'Tour Eiffel',
    description: 'La célèbre tour de fer de Paris',
    coordinates: { lat: 48.8584, lng: 2.2945 },
    address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris',
    category: 'attraction'
  },
  {
    id: '2',
    name: 'Louvre Museum',
    description: 'Le plus grand musée du monde',
    coordinates: { lat: 48.8606, lng: 2.3376 },
    address: 'Rue de Rivoli, 75001 Paris',
    category: 'museum'
  },
  {
    id: '3',
    name: 'Notre-Dame de Paris',
    description: 'Cathédrale gothique historique',
    coordinates: { lat: 48.8530, lng: 2.3499 },
    address: '6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris',
    category: 'attraction'
  }
];

const sampleItineraries: Itinerary[] = [
  {
    id: '1',
    title: 'Voyage à Paris',
    description: 'Une semaine de découverte de la Ville Lumière',
    startDate: '2024-06-15',
    endDate: '2024-06-22',
    destinations: sampleDestinations,
    days: [],
    totalBudget: 2500,
    currency: 'EUR',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default function Home() {
  const [mapStyle, setMapStyle] = useState(MAPBOX_STYLES.streets);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Panel d'information - Gauche */}
      <div className="w-80 bg-white shadow-xl border-r border-gray-200 flex flex-col">
        {/* Header du panel */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">TravelPlanner</h1>
          <p className="text-sm text-gray-600 mt-1">Planifiez vos voyages</p>
        </div>

        {/* Contenu du panel */}
        <div className="flex-1 p-6 space-y-6">
          {/* Sélecteur de style */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🎨 Style de carte</h3>
            <MapStyleSelector
              currentStyle={mapStyle}
              onStyleChange={setMapStyle}
            />
          </div>

          {/* Informations sur les destinations */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📍 Destinations ({sampleDestinations.length})</h3>
            <div className="space-y-3">
              {sampleDestinations.map((destination) => (
                <div key={destination.id} className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-medium text-gray-900">{destination.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{destination.description}</p>
                  {destination.category && (
                    <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {destination.category}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">🚀 Actions</h3>
            <div className="space-y-2">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Nouveau voyage
              </button>
              <button className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                Importer itinéraire
              </button>
            </div>
          </div>

          {/* Statistiques */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">📊 Statistiques</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">1</div>
                <div className="text-sm text-blue-600">Voyage</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-sm text-green-600">Destinations</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carte - Plein écran droite */}
      <div className="flex-1 relative">
        <TravelMap
          destinations={sampleDestinations}
          center={[48.8566, 2.3522]} // Paris coordinates
          zoom={12}
          className="h-full w-full"
          mapStyle={mapStyle}
          onStyleChange={setMapStyle}
        />
      </div>
    </div>
  );
}
