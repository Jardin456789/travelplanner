'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import ItineraryCard from '@/components/ItineraryCard';
import MapStyleSelector from '@/components/MapStyleSelector';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Itinerary, Destination } from '@/types/travel';
import { MAPBOX_STYLES } from '@/components/Map';
import { Plus, MapPin, BarChart3 } from 'lucide-react';

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
    <div className="h-screen flex">
      {/* Panel d'information - Gauche */}
      <div className="w-80 bg-white/80 backdrop-blur-md border-r border-white/20 flex flex-col shadow-xl">
        {/* Header du panel */}
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-bold text-black">TravelPlanner</h1>
          <p className="text-sm text-gray-600 mt-1">Planifiez vos voyages</p>
        </div>

        {/* Contenu du panel */}
        <div className="flex-1 p-6 space-y-6">
          {/* Sélecteur de style */}
          <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-black mb-3 flex items-center gap-2">
                🎨 Style de carte
              </h3>
              <MapStyleSelector
                currentStyle={mapStyle}
                onStyleChange={setMapStyle}
              />
            </div>
          </Card>

          {/* Informations sur les destinations */}
          <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-black mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Destinations ({sampleDestinations.length})
              </h3>
              <div className="space-y-3">
                {sampleDestinations.map((destination) => (
                  <div key={destination.id} className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <h4 className="font-medium text-black">{destination.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{destination.description}</p>
                    {destination.category && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {destination.category}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Actions */}
          <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-black mb-3">🚀 Actions</h3>
              <div className="space-y-2">
                <Button className="w-full bg-black/10 hover:bg-black/20 text-black border border-black/20 backdrop-blur-sm transition-all duration-300 hover:scale-105">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau voyage
                </Button>
                <Button variant="outline" className="w-full bg-white/20 backdrop-blur-sm border border-black/20 text-black hover:bg-black/10 transition-all duration-300 hover:scale-105">
                  Importer itinéraire
                </Button>
              </div>
            </div>
          </Card>

          {/* Statistiques */}
          <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-black mb-3 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Statistiques
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20">
                  <div className="text-2xl font-bold text-black">1</div>
                  <div className="text-sm text-gray-600">Voyage</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 text-center border border-white/20">
                  <div className="text-2xl font-bold text-black">3</div>
                  <div className="text-sm text-gray-600">Destinations</div>
                </div>
              </div>
            </div>
          </Card>
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
