'use client';

import { useState } from 'react';
import { DayItinerary } from '@/types/travel';
import { useDeleteStep } from '@/hooks/useTravelQueries';
import { 
  ChevronDown, 
  Calendar, 
  MapPin, 
  Check, 
  Trash2, 
  Plane, 
  Bus, 
  Bike,
  Clock,
  StickyNote
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/date-utils';
import { Button } from '@/components/ui/button';

interface ItineraryCardProps {
  dayItinerary: DayItinerary;
  itineraryId: number;
  isSelected?: boolean;
  isPast?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
}

export default function ItineraryCard({ dayItinerary, isSelected = false, isPast = false, onSelect, onDelete }: ItineraryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const deleteStepMutation = useDeleteStep();
  const formattedDate = formatDate(dayItinerary.date);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêche la propagation pour ne pas déclencher onSelect
    if (dayItinerary.id && window.confirm('Êtes-vous sûr de vouloir supprimer cette étape ?')) {
      try {
        await deleteStepMutation.mutateAsync(dayItinerary.id);
        onDelete?.();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de l\'étape');
      }
    }
  };

  return (
    <div 
      className={`group relative rounded-lg border transition-all duration-200 ${
        isSelected
          ? 'bg-blue-50/30 border-blue-200/50 shadow-sm shadow-blue-100/20'
          : isPast
          ? 'bg-green-50/20 border-green-200/40'
          : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
      }`}
    >
      {/* Indicateur de statut */}
      {isPast && (
        <div className="absolute -left-1 top-4 h-8 w-1 rounded-r-full bg-emerald-400/60" />
      )}

      {/* En-tête */}
      <button
        onClick={() => {
          setIsExpanded(!isExpanded);
          onSelect?.();
        }}
        className="w-full p-4 text-left"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Badge numéro */}
            <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors ${
              isPast
                ? 'bg-emerald-100/60 text-emerald-700 ring-1 ring-emerald-200/50'
                : isSelected
                ? 'bg-blue-100/60 text-blue-700 ring-1 ring-blue-200/50'
                : 'bg-gray-50 text-gray-600 ring-1 ring-gray-200/50'
            }`}>
              {isPast ? <Check className="h-3.5 w-3.5" /> : dayItinerary.order}
            </div>

            {/* Contenu principal */}
            <div className="flex-1 min-w-0 space-y-1">
              <h4 className="font-semibold text-sm leading-none tracking-tight truncate text-gray-800">
                {dayItinerary.destination?.name || 'Destination inconnue'}
              </h4>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="h-3 w-3" />
                <time>{formattedDate}</time>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            {dayItinerary.id && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-gray-400 hover:text-red-500 hover:bg-red-50/50"
                onClick={handleDelete}
                title="Supprimer"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
            <ChevronDown 
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`} 
            />
          </div>
        </div>
      </button>

      {/* Contenu détaillé */}
      {isExpanded && (
        <div className="border-t border-gray-100 px-4 pt-4 pb-4 space-y-4 bg-gray-50/30">
          {/* Notes */}
          {dayItinerary.notes && (
            <div className="flex gap-3 p-3 rounded-lg bg-white border border-gray-100">
              <StickyNote className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600 leading-relaxed">
                {dayItinerary.notes}
              </p>
            </div>
          )}

          {/* Transport */}
          {dayItinerary.transportToNext?.type && (
            <div className="rounded-lg border border-gray-100 bg-white p-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 border border-gray-200">
                  {dayItinerary.transportToNext.type === 'plane' && <Plane className="h-4 w-4 text-gray-600" />}
                  {dayItinerary.transportToNext.type === 'bus' && <Bus className="h-4 w-4 text-gray-600" />}
                  {dayItinerary.transportToNext.type === 'bike' && <Bike className="h-4 w-4 text-gray-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium capitalize text-gray-700">
                    {dayItinerary.transportToNext.type === 'plane' ? 'Avion' :
                     dayItinerary.transportToNext.type === 'bus' ? 'Bus' : 'Vélo'}
                  </p>
                  {dayItinerary.transportToNext.duration && (
                    <p className="text-xs text-gray-500">
                      {dayItinerary.transportToNext.duration}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Activités */}
          {dayItinerary.activities.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-xs font-medium uppercase tracking-wider text-gray-400 px-1">
                Activités
              </h5>
              <div className="space-y-2">
                {dayItinerary.activities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="rounded-lg border border-gray-100 bg-white p-3 space-y-2 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h6 className="text-sm font-medium leading-tight flex-1 text-gray-800">
                        {activity.title}
                      </h6>
                      {activity.category && (
                        <Badge variant="secondary" className="text-xs shrink-0 bg-gray-100 text-gray-600 border-gray-200">
                          {activity.category}
                        </Badge>
                      )}
                    </div>

                    {activity.description && (
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {activity.description}
                      </p>
                    )}

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      {(activity.startTime || activity.endTime) && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {activity.startTime && activity.endTime 
                              ? `${activity.startTime} - ${activity.endTime}`
                              : activity.startTime || activity.endTime}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{dayItinerary.destination?.name || 'Destination inconnue'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
