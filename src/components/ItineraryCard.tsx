'use client';

import { useState } from 'react';
import { DayItinerary } from '@/types/travel';
import { ChevronDown, ChevronUp, Clock, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ItineraryCardProps {
  dayItinerary: DayItinerary;
  isSelected?: boolean;
  onSelect?: () => void;
}

export default function ItineraryCard({ dayItinerary, isSelected = false, onSelect }: ItineraryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedDate = new Date(dayItinerary.date).toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className={`border rounded-md overflow-hidden transition-colors ${
      isSelected
        ? 'bg-blue-50 border-blue-300'
        : 'bg-white border-gray-200'
    }`}>
      {/* En-tête compact - toujours visible */}
      <button
        onClick={() => {
          setIsExpanded(!isExpanded);
          onSelect?.();
        }}
        className={`w-full p-3 text-left transition-colors ${
          isSelected
            ? 'hover:bg-blue-100'
            : 'hover:bg-gray-50'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
              {dayItinerary.order}
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm">{dayItinerary.destination?.name || 'Destination inconnue'}</h4>
              <p className="text-xs text-gray-500">{formattedDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </div>
        </div>
      </button>

      {/* Contenu détaillé - visible seulement si expanded */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-white/30">
          {/* Notes du jour */}
          {dayItinerary.notes && (
            <div className="bg-blue-50/80 backdrop-blur-sm rounded-lg p-3 mt-3 border border-blue-100/50">
              <p className="text-sm text-blue-800">{dayItinerary.notes}</p>
            </div>
          )}

          {/* Activités */}
          <div className="space-y-2 mt-3">
            {dayItinerary.activities.map((activity) => (
              <div key={activity.id} className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-medium text-black text-sm">{activity.title}</h5>
                    <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{activity.startTime} - {activity.endTime}</span>
                      </div>
                      {activity.category && (
                        <Badge variant="secondary" className="text-xs">
                          {activity.category}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{dayItinerary.destination?.name || 'Destination inconnue'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
