import { Destination, DayItinerary, TransportType } from '@/types/travel';
import { MapPin, Plane, Bus, Train, Car, Bike, Ship, Footprints } from 'lucide-react';

// Fonction pour obtenir l'icône de transport
export const getTransportIcon = (type: TransportType) => {
  switch (type) {
    case 'plane': return Plane;
    case 'bus': return Bus;
    case 'train': return Train;
    case 'car': return Car;
    case 'bike': return Bike;
    case 'boat': return Ship;
    case 'walk': return Footprints;
    default: return MapPin;
  }
};

// Fonction pour calculer le point milieu entre deux coordonnées
export const getMidpoint = (coord1: [number, number], coord2: [number, number]): [number, number] => {
  return [
    (coord1[0] + coord2[0]) / 2,
    (coord1[1] + coord2[1]) / 2
  ];
};

// Fonction pour calculer la distance approximative entre deux points (en km)
export const calculateDistance = (coord1: [number, number], coord2: [number, number]): number => {
  const [lng1, lat1] = coord1;
  const [lng2, lat2] = coord2;

  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Fonction pour calculer les limites géographiques et le zoom optimal
export const calculateMapBounds = (destinations: Destination[]) => {
  if (destinations.length === 0) {
    return { center: [48.8566, 2.3522] as [number, number], zoom: 12 };
  }

  if (destinations.length === 1) {
    const dest = destinations[0];
    return { center: [dest.coordinates.lat, dest.coordinates.lng] as [number, number], zoom: 12 };
  }

  // Calculer les limites
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;

  destinations.forEach(dest => {
    minLat = Math.min(minLat, dest.coordinates.lat);
    maxLat = Math.max(maxLat, dest.coordinates.lat);
    minLng = Math.min(minLng, dest.coordinates.lng);
    maxLng = Math.max(maxLng, dest.coordinates.lng);
  });

  // Calculer le centre
  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;

  // Calculer la distance maximale pour déterminer le zoom
  const latDiff = maxLat - minLat;
  const lngDiff = maxLng - minLng;

  // Formule approximative pour le zoom basé sur la distance
  // Plus la distance est grande, plus le zoom est petit
  const maxDiff = Math.max(latDiff, lngDiff);
  let zoom = 12;

  if (maxDiff > 10) zoom = 4;      // Très grande distance (continents)
  else if (maxDiff > 5) zoom = 5;  // Grande distance (pays)
  else if (maxDiff > 2) zoom = 6;  // Distance moyenne (régions)
  else if (maxDiff > 1) zoom = 7;  // Petite distance
  else if (maxDiff > 0.5) zoom = 8; // Très petite distance
  else if (maxDiff > 0.2) zoom = 9; // Distance locale
  else zoom = 10;                  // Distance très locale

  return {
    center: [centerLat, centerLng] as [number, number],
    zoom: Math.max(3, Math.min(15, zoom)) // Limiter entre 3 et 15
  };
};

// Fonction pour déterminer le centre et zoom optimal en privilégiant l'étape actuelle
export const calculateOptimalView = (destinations: Destination[], dayItineraries: DayItinerary[], currentStep?: DayItinerary | null) => {
  // Si on a une étape actuelle, centrer dessus avec un zoom confortable
  if (currentStep) {
    const { coordinates } = currentStep.destination;
    return {
      center: [coordinates.lat, coordinates.lng] as [number, number],
      zoom: 6 // Zoom plus large pour voir la région autour de l'étape actuelle
    };
  }

  // Sinon, utiliser le calcul par défaut
  return calculateMapBounds(destinations);
};
