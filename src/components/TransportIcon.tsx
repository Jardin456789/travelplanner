'use client';

import { useState, useEffect } from 'react';
import { DayItinerary, TransportType } from '@/types/travel';
import { Plane, Bus, Bike, Car } from 'lucide-react';
import { toast } from '@/components/ui/toaster';
import { useUpdateStep } from '@/hooks/useTravelQueries';

interface TransportIconProps {
  fromStep: DayItinerary;
  itineraryId: number;
}

const transportOptions = [
  { type: 'plane', icon: Plane, label: 'Avion', color: 'text-gray-800' },
  { type: 'bus', icon: Bus, label: 'Bus', color: 'text-gray-800' },
  { type: 'bike', icon: Bike, label: 'Vélo', color: 'text-gray-800' },
  { type: 'car', icon: Car, label: 'Voiture', color: 'text-gray-800' },
] as const;

export default function TransportIcon({ fromStep, itineraryId }: TransportIconProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const updateTransportMutation = useUpdateStep();

  const currentTransport = fromStep.transportToNext?.type;
  const currentOption = transportOptions.find(opt => opt.type === currentTransport);

  const handleTransportSelect = async (transportType: TransportType) => {
    if (!fromStep.id) return;

    const destinationId = fromStep.destinationId ?? fromStep.destination?.id;
    if (!destinationId) {
      console.warn('Impossible de mettre à jour le transport : destination sans identifiant.');
      return;
    }

    try {
      await updateTransportMutation.mutateAsync({
        id: fromStep.id,
        itineraryId: itineraryId,
        date: fromStep.date,
        destinationId,
        notes: fromStep.notes,
        order: fromStep.order,
        activities: fromStep.activities,
        transportToNext: {
          type: transportType,
          ...fromStep.transportToNext // Préserve les autres propriétés existantes
        },
        bikeSegment: fromStep.bikeSegment
      });

      const transportLabels: Record<TransportType, string> = {
        plane: '✈️ Avion',
        bus: '🚌 Bus',
        train: '🚂 Train',
        car: '🚗 Voiture',
        bike: '🚲 Vélo',
        boat: '🚢 Bateau',
        walk: '🚶 Marche',
        rest: '🏠 Repos'
      };

      toast.success(`Transport mis à jour : ${transportLabels[transportType]}`);
      setShowOptions(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du transport:', error);
      toast.error('Erreur lors de la mise à jour du moyen de transport');
    }
  };

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setShowOptions(true);
    }, 1000); // 1 seconde
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    // Délai pour permettre de cliquer sur les options
    setTimeout(() => {
      setShowOptions(false);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  if (showOptions) {
    return (
      <div
        className="flex items-center gap-2 py-2 opacity-100 animate-in fade-in-0 zoom-in-95 duration-200"
        onMouseLeave={handleMouseLeave}
      >
        {transportOptions.map((option) => {
          const IconComponent = option.icon;
          const isSelected = currentTransport === option.type;
          return (
            <button
              key={option.type}
              onClick={() => handleTransportSelect(option.type)}
              className={`bg-white/30 backdrop-blur-md rounded-full p-2 shadow-sm border border-white/40 hover:bg-white/40 transition-colors duration-200 flex items-center justify-center ${
                isSelected ? 'ring-2 ring-blue-400 bg-white/40' : ''
              }`}
              title={option.label}
            >
              <IconComponent className={`w-3.5 h-3.5 ${option.color}`} />
            </button>
          );
        })}
      </div>
    );
  }

  const IconComponent = currentOption?.icon || Car;
  const iconColor = currentOption?.color || 'text-gray-800';

  return (
    <div
      className="flex items-center justify-center py-4 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setShowOptions(true)}
    >
      <div className="bg-white/30 backdrop-blur-md rounded-full p-2 shadow-sm border border-white/40 hover:bg-white/40 transition-colors duration-200 flex items-center justify-center">
        <IconComponent className={`w-3.5 h-3.5 ${iconColor}`} />
      </div>
    </div>
  );
}
