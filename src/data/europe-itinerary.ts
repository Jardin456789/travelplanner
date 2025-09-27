import { DayItinerary } from '@/types/travel';
import { destinations } from './destinations';

export const europeDayItineraries: DayItinerary[] = [
  {
    date: '2025-09-18',
    destination: destinations[0], // Koman
    activities: [
      {
        id: '1',
        title: 'Découverte du lac de Koman',
        description: 'Balade autour du barrage et du lac artificiel',
        destinationId: '1',
        startTime: '10:00',
        endTime: '12:00',
        category: 'nature'
      },
      {
        id: '2',
        title: 'Village alpin',
        description: 'Exploration du village traditionnel albanais',
        destinationId: '1',
        startTime: '14:00',
        endTime: '16:00',
        category: 'cultural'
      }
    ],
    notes: 'Début du voyage en Albanie, installation dans le village alpin',
    order: 1,
    transportToNext: {
      type: 'bike',
      duration: '5h',
      distance: '120km',
      notes: 'À vélo vers Pristina (Kosovo)'
    }
  },
  {
    date: '2025-09-19',
    destination: destinations[1], // Pristina
    activities: [
      {
        id: '3',
        title: 'Arrivée à Pristina',
        description: 'Installation dans la capitale du Kosovo',
        destinationId: '2',
        startTime: '14:00',
        endTime: '16:00',
        category: 'arrival'
      },
      {
        id: '4',
        title: 'Centre historique',
        description: 'Découverte du quartier historique de Pristina',
        destinationId: '2',
        startTime: '16:00',
        endTime: '18:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Première journée à Pristina, découverte de la capitale kosovare',
    order: 2,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration de Pristina'
    }
  },
  {
    date: '2025-09-20',
    destination: destinations[1], // Pristina
    activities: [
      {
        id: '5',
        title: 'Musée ethnographique',
        description: 'Culture et histoire kosovare',
        destinationId: '2',
        startTime: '10:00',
        endTime: '12:00',
        category: 'museum'
      },
      {
        id: '6',
        title: 'Marché central',
        description: 'Découverte des produits locaux et artisanat',
        destinationId: '2',
        startTime: '14:00',
        endTime: '16:00',
        category: 'cultural'
      }
    ],
    notes: 'Immersion culturelle à Pristina',
    order: 3,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Dernière journée à Pristina'
    }
  },
  {
    date: '2025-09-21',
    destination: destinations[1], // Pristina - départ vers Skopje
    activities: [
      {
        id: '7',
        title: 'Préparation départ',
        description: 'Préparatifs pour Skopje',
        destinationId: '2',
        startTime: '09:00',
        endTime: '12:00',
        category: 'preparation'
      }
    ],
    notes: 'Fin du séjour à Pristina, préparation du départ vers la Macédoine',
    order: 4,
    transportToNext: {
      type: 'bike',
      duration: '4h',
      distance: '90km',
      notes: 'À vélo vers Skopje'
    }
  },
  {
    date: '2025-09-21',
    destination: destinations[2], // Skopje - Jour 1
    activities: [
      {
        id: '8',
        title: 'Arrivée à Skopje',
        description: 'Installation dans la capitale macédonienne',
        destinationId: '3',
        startTime: '15:00',
        endTime: '17:00',
        category: 'arrival'
      },
      {
        id: '9',
        title: 'Première découverte',
        description: 'Balade dans le centre-ville',
        destinationId: '3',
        startTime: '17:00',
        endTime: '19:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Arrivée à Skopje depuis Pristina, début du séjour macédonien',
    order: 5,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration de Skopje'
    }
  },
  {
    date: '2025-09-22',
    destination: destinations[2], // Skopje - Jour 2
    activities: [
      {
        id: '10',
        title: 'Vieux Bazar',
        description: 'Découverte du marché traditionnel ottoman',
        destinationId: '3',
        startTime: '10:00',
        endTime: '12:00',
        category: 'sightseeing'
      },
      {
        id: '11',
        title: 'Musée de Macédoine',
        description: 'Histoire et culture macédonienne',
        destinationId: '3',
        startTime: '14:00',
        endTime: '16:00',
        category: 'museum'
      }
    ],
    notes: 'Exploration culturelle de Skopje',
    order: 6,
    transportToNext: {
      type: 'bus',
      duration: '8h',
      distance: '550km',
      notes: 'Bus vers Istanbul via Sofia et Plovdiv'
    }
  },
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
