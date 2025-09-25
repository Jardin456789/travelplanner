export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Destination {
  id: string;
  name: string;
  description?: string;
  coordinates: Coordinates;
  address?: string;
  imageUrl?: string;
  category?: string; // hotel, restaurant, attraction, etc.
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
}

export interface DayItinerary {
  date: string; // ISO date string
  destination: Destination; // Destination principale du jour
  activities: Activity[];
  notes?: string;
  order: number; // Ordre dans l'itinéraire
  transportToNext?: TransportSegment; // Transport vers l'étape suivante
}

export interface Itinerary {
  id: string;
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
