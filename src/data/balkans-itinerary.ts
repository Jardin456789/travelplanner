import { DayItinerary } from '@/types/travel';
import { destinations } from './destinations';

export const balkansDayItineraries: DayItinerary[] = [
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
  }
];
