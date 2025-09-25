import React from 'react';
import { Marker } from 'react-map-gl';
import { getTransportIcon } from '@/lib/map-utils';
import { TransportSegment } from '@/hooks/useTransportSegments';
import { TransportType } from '@/types/travel';

interface TransportMarkersProps {
  segments: TransportSegment[];
}

export const TransportMarkers: React.FC<TransportMarkersProps> = ({ segments }) => {
  return (
    <>
      {segments.map((segment) => {
        if (!segment) return null;
        const IconComponent = getTransportIcon(segment.type as TransportType);

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
    </>
  );
};
