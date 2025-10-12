'use client';

import { motion } from 'framer-motion';
import { useLazyImage } from '@/hooks/useIntersectionObserver';
import ItineraryCard from './ItineraryCard';
import type { DayItinerary } from '@/types/travel';

interface LazyItineraryCardProps {
  dayItinerary: DayItinerary;
  itineraryId: number;
  isSelected?: boolean;
  isPast?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  index?: number;
}

// Animation variants pour les cartes lazy-loaded
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function LazyItineraryCard({
  dayItinerary,
  itineraryId,
  isSelected = false,
  isPast = false,
  onSelect,
  onEdit,
}: LazyItineraryCardProps) {
  const { elementRef, isVisible } = useLazyImage();

  return (
    <motion.div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      layout
    >
      {isVisible ? (
        <ItineraryCard
          dayItinerary={dayItinerary}
          itineraryId={itineraryId}
          isSelected={isSelected}
          isPast={isPast}
          onSelect={onSelect}
          onEdit={onEdit}
          disableDrag
        />
      ) : (
        // Placeholder pendant le chargement
        <div className="border rounded-md overflow-hidden bg-gray-50 border-gray-200 h-24 animate-pulse">
          <div className="p-3">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
