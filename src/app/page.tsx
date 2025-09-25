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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">TravelPlanner</h1>
            <nav className="flex space-x-4">
              <a href="/itineraries" className="text-gray-600 hover:text-gray-900">Itinéraires</a>
              <a href="/map" className="text-gray-600 hover:text-gray-900">Carte</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Planifiez vos voyages facilement
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Créez des itinéraires personnalisés, visualisez vos destinations sur la carte,
            et organisez vos voyages de rêve.
          </p>
        </div>

        {/* Map Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Carte Interactive</h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <TravelMap
                destinations={sampleDestinations}
                center={[48.8566, 2.3522]} // Paris coordinates
                zoom={12}
                className="h-96 w-full rounded-lg shadow-lg"
                mapStyle={mapStyle}
                onStyleChange={setMapStyle}
              />
            </div>
            <div className="lg:col-span-1">
              <MapStyleSelector
                currentStyle={mapStyle}
                onStyleChange={setMapStyle}
              />
            </div>
          </div>
        </div>

        {/* Itineraries Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-900">Mes Itinéraires</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Nouveau voyage
            </button>
          </div>

          {sampleItineraries.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {sampleItineraries.map((itinerary) => (
                <ItineraryCard
                  key={itinerary.id}
                  itinerary={itinerary}
                  onClick={() => console.log('Itinerary clicked:', itinerary.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">Aucun itinéraire pour le moment</p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Créer votre premier voyage
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
