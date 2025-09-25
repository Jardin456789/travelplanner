import { DayItinerary } from '@/types/travel';
import { destinations } from './destinations';

export const turkeyDayItineraries: DayItinerary[] = [
  {
    date: '2025-09-23',
    destination: destinations[2], // Skopje - Jour de départ
    activities: [
      {
        id: '26',
        title: 'Préparation du départ',
        description: 'Préparatifs pour le trajet en bus vers Istanbul',
        destinationId: '3',
        startTime: '09:00',
        endTime: '12:00',
        category: 'preparation'
      }
    ],
    notes: 'Dernière journée à Skopje, préparation du départ en bus',
    order: 7,
    transportToNext: {
      type: 'bus',
      duration: '8h',
      distance: '550km',
      notes: 'Bus longue distance vers Istanbul'
    }
  },
  {
    date: '2025-10-04',
    destination: destinations[3], // Istanbul - Jour 1
    activities: [
      {
        id: '12',
        title: 'Arrivée à Istanbul',
        description: 'Installation dans la mégapole turque',
        destinationId: '4',
        startTime: '10:00',
        endTime: '12:00',
        category: 'arrival'
      },
      {
        id: '13',
        title: 'Visite de Sainte-Sophie',
        description: 'Chef-d\'oeuvre byzantin',
        destinationId: '4',
        startTime: '14:00',
        endTime: '16:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Arrivée à Istanbul depuis Skopje',
    order: 8,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration d\'Istanbul'
    }
  },
  {
    date: '2025-10-05',
    destination: destinations[3], // Istanbul - Jour 2
    activities: [
      {
        id: '14',
        title: 'Bosphore en bateau',
        description: 'Croisière sur le détroit',
        destinationId: '4',
        startTime: '10:00',
        endTime: '12:00',
        category: 'sightseeing'
      },
      {
        id: '15',
        title: 'Grand Bazar',
        description: 'Marché traditionnel couvert',
        destinationId: '4',
        startTime: '14:00',
        endTime: '16:00',
        category: 'shopping'
      }
    ],
    notes: 'Exploration d\'Istanbul',
    order: 9,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Suite exploration Istanbul'
    }
  },
  {
    date: '2025-10-06',
    destination: destinations[3], // Istanbul - Jour 3
    activities: [
      {
        id: '16',
        title: 'Palais de Topkapi',
        description: 'Ancien palais ottoman',
        destinationId: '4',
        startTime: '09:00',
        endTime: '12:00',
        category: 'sightseeing'
      },
      {
        id: '17',
        title: 'Cuisine turque',
        description: 'Découverte gastronomique',
        destinationId: '4',
        startTime: '14:00',
        endTime: '16:00',
        category: 'cultural'
      }
    ],
    notes: 'Culture et gastronomie à Istanbul',
    order: 10,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Suite exploration'
    }
  },
  {
    date: '2025-10-07',
    destination: destinations[3], // Istanbul - Jour 4
    activities: [
      {
        id: '18',
        title: 'Musée archéologique',
        description: 'Collections antiques',
        destinationId: '4',
        startTime: '10:00',
        endTime: '12:00',
        category: 'museum'
      },
      {
        id: '19',
        title: 'Quartier européen',
        description: 'Balade dans Pera',
        destinationId: '4',
        startTime: '14:00',
        endTime: '16:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Histoire et architecture',
    order: 11,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Dernière journée Istanbul'
    }
  },
  {
    date: '2025-10-08',
    destination: destinations[3], // Istanbul - Jour 5 - départ vers Aktou
    activities: [
      {
        id: '20',
        title: 'Préparation départ',
        description: 'Préparatifs pour le Kazakhstan',
        destinationId: '4',
        startTime: '09:00',
        endTime: '12:00',
        category: 'preparation'
      }
    ],
    notes: 'Fin du séjour à Istanbul, préparation du vol vers Aktou',
    order: 12,
    transportToNext: {
      type: 'plane',
      duration: '3h 30m',
      distance: '2400km',
      notes: 'Vol direct Istanbul-Aktau'
    }
  },
  {
    date: '2025-10-08',
    destination: destinations[4], // Aktou - Jour 1/3
    activities: [
      {
        id: '21',
        title: 'Arrivée à Aktou',
        description: 'Installation dans la ville portuaire kazakh',
        destinationId: '5',
        startTime: '16:00',
        endTime: '18:00',
        category: 'arrival'
      },
      {
        id: '22',
        title: 'Promenade sur le front de mer',
        description: 'Découverte du bord de mer Caspienne',
        destinationId: '5',
        startTime: '18:00',
        endTime: '20:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Arrivée à Aktou depuis Istanbul, début du séjour kazakh',
    order: 13,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration Aktou'
    }
  },
  {
    date: '2025-10-09',
    destination: destinations[4], // Aktou - Jour 2/3
    activities: [
      {
        id: '23',
        title: 'Musée régional d\'Aktou',
        description: 'Histoire et culture du Kazakhstan',
        destinationId: '5',
        startTime: '10:00',
        endTime: '12:00',
        category: 'museum'
      },
      {
        id: '24',
        title: 'Préparation bikepacking',
        description: 'Vérification vélo et équipement',
        destinationId: '5',
        startTime: '14:00',
        endTime: '16:00',
        category: 'preparation'
      }
    ],
    notes: 'Préparation du départ en bikepacking',
    order: 14,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Dernière journée Aktou'
    }
  },
  {
    date: '2025-10-10',
    destination: destinations[4], // Aktou - Jour 3/3 - départ
    activities: [
      {
        id: '25',
        title: 'Derniers préparatifs',
        description: 'Achats finaux et vérifications',
        destinationId: '5',
        startTime: '09:00',
        endTime: '12:00',
        category: 'preparation'
      }
    ],
    notes: 'Fin du séjour à Aktou, départ en bikepacking',
    order: 15,
    transportToNext: {
      type: 'bike',
      duration: '5h',
      distance: '120km',
      notes: 'Début du bikepacking vers Atyrau'
    }
  }
];
