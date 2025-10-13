export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Destination {
  id: number;
  name: string;
  description?: string;
  coordinates: Coordinates;
  address?: string;
  imageUrl?: string;
  category?: string; // hotel, restaurant, attraction, etc.
  createdAt?: string;
  updatedAt?: string;
}

export interface Activity {
  id: string;
  title: string;
  description?: string;
  destinationId: string;
  startTime?: string;
  endTime?: string;
  duration?: number; // in minutes
  cost?: number;
  notes?: string;
  category?: string; // sightseeing, dining, shopping, etc.
}

export type TransportType = 'plane' | 'bus' | 'train' | 'car' | 'bike' | 'boat' | 'walk' | 'rest';

export interface TransportSegment {
  type: TransportType;
  duration?: string; // e.g. "8h", "2h 30m"
  distance?: string; // e.g. "500km"
  notes?: string;
  routeType?: string; // Type de route/piste pour le vélo
  difficulty?: string; // Difficulté du trajet
  pointsOfInterest?: string; // Points d'intérêt sur le trajet
  networkAndWater?: string; // Informations sur réseau et eau
}

export interface BikeSegmentDetails {
  trajet: string;
  distance_km: number;
  route: string;
  difficulte: string;
  points_interet: string[];
  reseau_eau: string;
  coordonnees: Record<string, number[] | undefined>;
}

export interface DayItinerary {
  id?: number;
  itineraryId?: number;
  date: string; // ISO date string
  destinationId?: number;
  destination: Destination; // Destination principale du jour
  activities: Activity[];
  notes?: string;
  order: number; // Ordre dans l'itinéraire
  transportToNext?: TransportSegment; // Transport vers l'étape suivante
  bikeSegment?: BikeSegmentDetails; // Détails spécifiques aux étapes vélo
  createdAt?: string;
  updatedAt?: string;
}

export interface StepComment {
  id: number;
  stepId: number;
  parentId?: number | null;
  author?: string | null;
  content: string;
  createdAt: string;
}

export interface StepCommentThread extends StepComment {
  replies: StepCommentThread[];
}

export interface Itinerary {
  id: number;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  destinations: Destination[];
  days: DayItinerary[];
  totalBudget?: number;
  currency?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TravelPreferences {
  budget: 'low' | 'medium' | 'high';
  interests: string[];
  travelStyle: 'relaxed' | 'active' | 'cultural' | 'adventure';
  groupSize: number;
  accommodationType: 'hotel' | 'hostel' | 'apartment' | 'resort';
}
