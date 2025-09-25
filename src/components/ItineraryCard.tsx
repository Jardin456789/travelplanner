import { Itinerary } from '@/types/travel';
import { Calendar, MapPin, DollarSign } from 'lucide-react';

interface ItineraryCardProps {
  itinerary: Itinerary;
  onClick?: () => void;
}

export default function ItineraryCard({ itinerary, onClick }: ItineraryCardProps) {
  const startDate = new Date(itinerary.startDate).toLocaleDateString();
  const endDate = new Date(itinerary.endDate).toLocaleDateString();

  const totalDays = Math.ceil(
    (new Date(itinerary.endDate).getTime() - new Date(itinerary.startDate).getTime()) /
    (1000 * 60 * 60 * 24)
  ) + 1;

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{itinerary.title}</h3>
        <span className="text-sm text-gray-500">
          {totalDays} jour{totalDays > 1 ? 's' : ''}
        </span>
      </div>

      {itinerary.description && (
        <p className="text-gray-600 mb-4 line-clamp-2">{itinerary.description}</p>
      )}

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{startDate} - {endDate}</span>
        </div>

        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{itinerary.destinations.length} destination{itinerary.destinations.length > 1 ? 's' : ''}</span>
        </div>

        {itinerary.totalBudget && (
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{itinerary.totalBudget} {itinerary.currency || 'EUR'}</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1">
        {itinerary.destinations.slice(0, 3).map((destination) => (
          <span
            key={destination.id}
            className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
          >
            {destination.name}
          </span>
        ))}
        {itinerary.destinations.length > 3 && (
          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            +{itinerary.destinations.length - 3} autres
          </span>
        )}
      </div>
    </div>
  );
}
