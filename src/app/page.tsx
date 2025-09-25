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
    name: 'Skopje',
    description: 'Capitale de la Macédoine du Nord',
    coordinates: { lat: 41.9981, lng: 21.4254 },
    address: 'Skopje, Macédoine du Nord',
    category: 'city'
  },
  {
    id: '2',
    name: 'Istanbul',
    description: 'Métropole entre Europe et Asie',
    coordinates: { lat: 41.0082, lng: 28.9784 },
    address: 'Istanbul, Turquie',
    category: 'city'
  },
  {
    id: '3',
    name: 'Ankara',
    description: 'Capitale de la Turquie',
    coordinates: { lat: 39.9334, lng: 32.8597 },
    address: 'Ankara, Turquie',
    category: 'city'
  }
];

const sampleDayItineraries: DayItinerary[] = [
  {
    date: '2024-07-15',
    destination: sampleDestinations[0], // Skopje
    activities: [
      {
        id: '1',
        title: 'Visite du Vieux Bazar',
        description: 'Découverte du marché traditionnel',
        destinationId: '1',
        startTime: '10:00',
        endTime: '12:00',
        category: 'sightseeing'
      },
      {
        id: '2',
        title: 'Musée de Macédoine',
        description: 'Histoire et culture macédonienne',
        destinationId: '1',
        startTime: '14:00',
        endTime: '16:00',
        category: 'museum'
      }
    ],
    notes: 'Arrivée en ville, installation à l\'hôtel',
    order: 1
  },
  {
    date: '2024-07-16',
    destination: sampleDestinations[1], // Istanbul
    activities: [
      {
        id: '3',
        title: 'Visite de Sainte-Sophie',
        description: 'Chef-d\'œuvre byzantin',
        destinationId: '2',
        startTime: '09:00',
        endTime: '11:00',
        category: 'sightseeing'
      },
      {
        id: '4',
        title: 'Bosphore en bateau',
        description: 'Croisière sur le détroit',
        destinationId: '2',
        startTime: '15:00',
        endTime: '17:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Voyage en bus depuis Skopje (environ 8h)',
    order: 2
  },
  {
    date: '2024-07-17',
    destination: sampleDestinations[2], // Ankara
    activities: [
      {
        id: '5',
        title: 'Musée des Civilisations Anatoliennes',
        description: 'Histoire ancienne de l\'Anatolie',
        destinationId: '3',
        startTime: '10:00',
        endTime: '13:00',
        category: 'museum'
      },
      {
        id: '6',
        title: 'Citadelle d\'Ankara',
        description: 'Vue panoramique sur la ville',
        destinationId: '3',
        startTime: '15:00',
        endTime: '17:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Voyage en train depuis Istanbul (environ 4h)',
    order: 3
  }
];

const sampleItineraries: Itinerary[] = [
  {
    id: '1',
    title: 'Balkans Express',
    description: 'Voyage découverte des Balkans et Turquie',
    startDate: '2024-07-15',
    endDate: '2024-07-17',
    destinations: sampleDestinations,
    days: sampleDayItineraries,
    totalBudget: 1800,
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
          {/* Titre de l'itinéraire */}
          <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-black mb-2">{sampleItineraries[0].title}</h3>
              <p className="text-sm text-gray-600 mb-3">{sampleItineraries[0].description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>📅 {new Date(sampleItineraries[0].startDate).toLocaleDateString('fr-FR')} - {new Date(sampleItineraries[0].endDate).toLocaleDateString('fr-FR')}</span>
                <span>💰 {sampleItineraries[0].totalBudget} {sampleItineraries[0].currency}</span>
              </div>
            </div>
          </Card>

          {/* Étapes de l'itinéraire */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black flex items-center gap-2">
              🗺️ Étapes ({sampleDayItineraries.length})
            </h3>
            {sampleDayItineraries.map((day, index) => (
              <Card key={day.date} className="bg-white/80 backdrop-blur-md border border-white/20 shadow-lg">
                <div className="p-4">
                  {/* En-tête du jour */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-black/10 rounded-full flex items-center justify-center text-sm font-semibold text-black">
                        {day.order}
                      </div>
                      <div>
                        <h4 className="font-medium text-black">{day.destination.name}</h4>
                        <p className="text-xs text-gray-600">
                          {new Date(day.date).toLocaleDateString('fr-FR', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long'
                          })}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Jour {day.order}
                    </Badge>
                  </div>

                  {/* Notes du jour */}
                  {day.notes && (
                    <div className="bg-blue-50/80 backdrop-blur-sm rounded-lg p-3 mb-3 border border-blue-100/50">
                      <p className="text-sm text-blue-800">{day.notes}</p>
                    </div>
                  )}

                  {/* Activités */}
                  <div className="space-y-2">
                    {day.activities.map((activity) => (
                      <div key={activity.id} className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-medium text-black text-sm">{activity.title}</h5>
                            <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-500">🕐 {activity.startTime} - {activity.endTime}</span>
                              {activity.category && (
                                <Badge variant="secondary" className="text-xs">
                                  {activity.category}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Boutons d'action en bas */}
          <div className="space-y-2">
            <Button className="w-full bg-black/10 hover:bg-black/20 text-black border border-black/20 backdrop-blur-sm transition-all duration-300 hover:scale-105">
              <Plus className="w-4 h-4 mr-2" />
              Modifier itinéraire
            </Button>
            <Button variant="outline" className="w-full bg-white/20 backdrop-blur-sm border border-black/20 text-black hover:bg-black/10 transition-all duration-300 hover:scale-105">
              Exporter PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Carte - Plein écran droite */}
      <div className="flex-1 relative">
        <TravelMap
          destinations={sampleDestinations}
          center={[41.0082, 28.9784]} // Istanbul coordinates (centre du voyage)
          zoom={6}
          className="h-full w-full"
          mapStyle={mapStyle}
          onStyleChange={setMapStyle}
        />

        {/* Bouton flottant pour le sélecteur de style */}
        <div className="absolute top-4 right-4 z-10">
          <MapStyleSelector
            currentStyle={mapStyle}
            onStyleChange={setMapStyle}
          />
        </div>
      </div>
    </div>
  );
}
