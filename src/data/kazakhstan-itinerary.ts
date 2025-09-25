import { DayItinerary } from '@/types/travel';
import { destinations } from './destinations';

export const kazakhstanDayItineraries: DayItinerary[] = [
  // === KAZAKHSTAN - 20 jours vers la frontière chinoise ===
  {
    date: '2025-10-10',
    destination: destinations[5], // Atyrau - Arrivée
    activities: [
      {
        id: '27',
        title: 'Arrivée à Atyrau',
        description: 'Installation dans la ville pétrolière sur la Caspienne',
        destinationId: '6',
        startTime: '15:00',
        endTime: '17:00',
        category: 'arrival'
      },
      {
        id: '28',
        title: 'Balade sur le front de mer',
        description: 'Découverte du bord de Caspienne',
        destinationId: '6',
        startTime: '17:00',
        endTime: '19:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Arrivée à Atyrau après le bikepacking depuis Aktau',
    order: 16,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration d\'Atyrau'
    }
  },
  {
    date: '2025-10-11',
    destination: destinations[5], // Atyrau - Jour 2
    activities: [
      {
        id: '29',
        title: 'Musée régional d\'Atyrau',
        description: 'Histoire et culture de la région caspienne',
        destinationId: '6',
        startTime: '10:00',
        endTime: '12:00',
        category: 'museum'
      },
      {
        id: '30',
        title: 'Centre-ville moderne',
        description: 'Architecture soviétique et pétrolière',
        destinationId: '6',
        startTime: '14:00',
        endTime: '16:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Découverte culturelle d\'Atyrau',
    order: 17,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Dernière journée à Atyrau'
    }
  },
  {
    date: '2025-10-12',
    destination: destinations[5], // Atyrau - Préparation départ
    activities: [
      {
        id: '31',
        title: 'Préparation du train vers Aktobe',
        description: 'Achats et préparatifs pour le trajet en train',
        destinationId: '6',
        startTime: '09:00',
        endTime: '12:00',
        category: 'preparation'
      }
    ],
    notes: 'Préparation du départ en train vers Aktobe',
    order: 18,
    transportToNext: {
      type: 'train',
      duration: '12h',
      distance: '850km',
      notes: 'Train de nuit Atyrau-Aktobe'
    }
  },
  {
    date: '2025-10-12',
    destination: destinations[6], // Aktobe - Arrivée
    activities: [
      {
        id: '32',
        title: 'Arrivée à Aktobe',
        description: 'Installation dans la ville industrielle',
        destinationId: '7',
        startTime: '15:00',
        endTime: '17:00',
        category: 'arrival'
      },
      {
        id: '33',
        title: 'Centre-ville',
        description: 'Balade dans la ville industrielle moderne',
        destinationId: '7',
        startTime: '17:00',
        endTime: '19:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Arrivée à Aktobe depuis Atyrau en train',
    order: 19,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration d\'Aktobe'
    }
  },
  {
    date: '2025-10-13',
    destination: destinations[6], // Aktobe - Jour 2
    activities: [
      {
        id: '34',
        title: 'Musée d\'histoire régionale',
        description: 'Culture et histoire d\'Aktobe',
        destinationId: '7',
        startTime: '10:00',
        endTime: '12:00',
        category: 'museum'
      },
      {
        id: '35',
        title: 'Parc central',
        description: 'Détente dans les espaces verts',
        destinationId: '7',
        startTime: '14:00',
        endTime: '16:00',
        category: 'cultural'
      }
    ],
    notes: 'Découverte culturelle d\'Aktobe',
    order: 20,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Dernière journée à Aktobe'
    }
  },
  {
    date: '2025-10-14',
    destination: destinations[6], // Aktobe - Préparation
    activities: [
      {
        id: '36',
        title: 'Préparation du train vers Kyzylorda',
        description: 'Préparatifs pour le trajet vers le sud',
        destinationId: '7',
        startTime: '09:00',
        endTime: '12:00',
        category: 'preparation'
      }
    ],
    notes: 'Préparation du départ en train vers Kyzylorda',
    order: 21,
    transportToNext: {
      type: 'train',
      duration: '14h',
      distance: '950km',
      notes: 'Train de jour Aktobe-Kyzylorda'
    }
  },
  {
    date: '2025-10-14',
    destination: destinations[7], // Kyzylorda - Arrivée
    activities: [
      {
        id: '37',
        title: 'Arrivée à Kyzylorda',
        description: 'Installation dans la ville historique du désert',
        destinationId: '8',
        startTime: '16:00',
        endTime: '18:00',
        category: 'arrival'
      },
      {
        id: '38',
        title: 'Balade en centre-ville',
        description: 'Découverte de l\'architecture soviétique',
        destinationId: '8',
        startTime: '18:00',
        endTime: '20:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Arrivée à Kyzylorda depuis Aktobe',
    order: 22,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration de Kyzylorda'
    }
  },
  {
    date: '2025-10-15',
    destination: destinations[7], // Kyzylorda - Jour 2
    activities: [
      {
        id: '39',
        title: 'Musée archéologique',
        description: 'Histoire ancienne de la région du Syr-Daria',
        destinationId: '8',
        startTime: '10:00',
        endTime: '12:00',
        category: 'museum'
      },
      {
        id: '40',
        title: 'Rive du Syr-Daria',
        description: 'Promenade le long du fleuve historique',
        destinationId: '8',
        startTime: '14:00',
        endTime: '16:00',
        category: 'nature'
      }
    ],
    notes: 'Découverte historique de Kyzylorda',
    order: 23,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Dernière journée à Kyzylorda'
    }
  },
  {
    date: '2025-10-16',
    destination: destinations[7], // Kyzylorda - Préparation départ
    activities: [
      {
        id: '41',
        title: 'Préparation bikepacking vers Shymkent',
        description: 'Préparatifs pour le bikepacking vers le sud-est',
        destinationId: '8',
        startTime: '09:00',
        endTime: '12:00',
        category: 'preparation'
      }
    ],
    notes: 'Préparation du départ en vélo vers Shymkent',
    order: 24,
    transportToNext: {
      type: 'bike',
      duration: '8h',
      distance: '180km',
      notes: 'Bikepacking Kyzylorda-Shymkent (étape 1/2)'
    }
  },
  {
    date: '2025-10-17',
    destination: destinations[7], // Bikepacking jour 1
    activities: [
      {
        id: '61',
        title: 'Bikepacking dans le désert',
        description: 'Traversée du désert kazakh vers Shymkent',
        destinationId: '8',
        startTime: '08:00',
        endTime: '16:00',
        category: 'nature'
      }
    ],
    notes: 'Jour de bikepacking dans le désert kazakh',
    order: 25,
    transportToNext: {
      type: 'bike',
      duration: '6h',
      distance: '200km',
      notes: 'Bikepacking Kyzylorda-Shymkent (étape 2/2)'
    }
  },
  {
    date: '2025-10-17',
    destination: destinations[12], // Shymkent - Arrivée
    activities: [
      {
        id: '42',
        title: 'Arrivée à Shymkent',
        description: 'Installation dans la troisième ville du Kazakhstan',
        destinationId: '13',
        startTime: '15:00',
        endTime: '17:00',
        category: 'arrival'
      },
      {
        id: '43',
        title: 'Centre-ville moderne',
        description: 'Balade dans les quartiers modernes et commerçants',
        destinationId: '13',
        startTime: '17:00',
        endTime: '19:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Arrivée à Shymkent après bikepacking depuis Kyzylorda',
    order: 26,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration de Shymkent'
    }
  },
  {
    date: '2025-10-18',
    destination: destinations[12], // Shymkent - Jour 2
    activities: [
      {
        id: '44',
        title: 'Parc central et fontaines',
        description: 'Détente dans les espaces verts modernes',
        destinationId: '13',
        startTime: '10:00',
        endTime: '12:00',
        category: 'cultural'
      },
      {
        id: '45',
        title: 'Marché traditionnel',
        description: 'Découverte des produits locaux et artisanat',
        destinationId: '13',
        startTime: '14:00',
        endTime: '16:00',
        category: 'shopping'
      }
    ],
    notes: 'Découverte moderne de Shymkent',
    order: 27,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Dernière journée à Shymkent'
    }
  },
  {
    date: '2025-10-19',
    destination: destinations[12], // Shymkent - Préparation bikepacking
    activities: [
      {
        id: '46',
        title: 'Préparation bikepacking vers Turkistan',
        description: 'Préparatifs pour le bikepacking historique',
        destinationId: '13',
        startTime: '09:00',
        endTime: '12:00',
        category: 'preparation'
      }
    ],
    notes: 'Préparation du départ en vélo vers Turkistan (site UNESCO)',
    order: 28,
    transportToNext: {
      type: 'bike',
      duration: '8h',
      distance: '160km',
      notes: 'Bikepacking Shymkent-Turkistan'
    }
  },
  {
    date: '2025-10-19',
    destination: destinations[13], // Turkistan - Arrivée
    activities: [
      {
        id: '47',
        title: 'Arrivée à Turkistan',
        description: 'Installation près du mausolée historique',
        destinationId: '14',
        startTime: '15:00',
        endTime: '17:00',
        category: 'arrival'
      },
      {
        id: '48',
        title: 'Mausolée d\'Ahmed Yasawi',
        description: 'Visite du site UNESCO classé',
        destinationId: '14',
        startTime: '17:00',
        endTime: '19:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Arrivée à Turkistan après bikepacking, site historique UNESCO',
    order: 29,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration de Turkistan'
    }
  },
  {
    date: '2025-10-20',
    destination: destinations[13], // Turkistan - Jour 2
    activities: [
      {
        id: '49',
        title: 'Complexe historique',
        description: 'Exploration complète du site médiéval',
        destinationId: '14',
        startTime: '09:00',
        endTime: '12:00',
        category: 'museum'
      },
      {
        id: '50',
        title: 'Musée local',
        description: 'Histoire de la Route de la Soie',
        destinationId: '14',
        startTime: '14:00',
        endTime: '16:00',
        category: 'cultural'
      }
    ],
    notes: 'Immersion historique à Turkistan',
    order: 30,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Dernière journée à Turkistan'
    }
  },
  {
    date: '2025-10-21',
    destination: destinations[13], // Turkistan - Préparation bikepacking
    activities: [
      {
        id: '51',
        title: 'Préparation bikepacking vers Taraz',
        description: 'Préparatifs pour le bikepacking vers les montagnes',
        destinationId: '14',
        startTime: '09:00',
        endTime: '12:00',
        category: 'preparation'
      }
    ],
    notes: 'Préparation du départ en vélo vers Taraz et les montagnes',
    order: 31,
    transportToNext: {
      type: 'bike',
      duration: '10h',
      distance: '140km',
      notes: 'Bikepacking Turkistan-Taraz (étape 1/2)'
    }
  },
  {
    date: '2025-10-22',
    destination: destinations[13], // Bikepacking jour 1
    activities: [
      {
        id: '62',
        title: 'Bikepacking vers les montagnes',
        description: 'Traversée des steppes kazakhes vers Taraz',
        destinationId: '14',
        startTime: '08:00',
        endTime: '18:00',
        category: 'nature'
      }
    ],
    notes: 'Jour de bikepacking dans les steppes kazakhes',
    order: 32,
    transportToNext: {
      type: 'bike',
      duration: '8h',
      distance: '140km',
      notes: 'Bikepacking Turkistan-Taraz (étape 2/2)'
    }
  },
  {
    date: '2025-10-22',
    destination: destinations[14], // Taraz - Arrivée
    activities: [
      {
        id: '52',
        title: 'Arrivée à Taraz',
        description: 'Installation dans l\'ancienne ville de la Route de la Soie',
        destinationId: '15',
        startTime: '15:00',
        endTime: '17:00',
        category: 'arrival'
      },
      {
        id: '53',
        title: 'Centre historique',
        description: 'Balade dans les quartiers anciens',
        destinationId: '15',
        startTime: '17:00',
        endTime: '19:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Arrivée à Taraz après bikepacking, ancienne capitale historique',
    order: 33,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration de Taraz'
    }
  },
  {
    date: '2025-10-23',
    destination: destinations[14], // Taraz - Jour 2
    activities: [
      {
        id: '54',
        title: 'Monuments historiques',
        description: 'Visite des mausolées et fortifications anciennes',
        destinationId: '15',
        startTime: '09:00',
        endTime: '12:00',
        category: 'sightseeing'
      },
      {
        id: '55',
        title: 'Musée archéologique',
        description: 'Collections de la période sogdienne',
        destinationId: '15',
        startTime: '14:00',
        endTime: '16:00',
        category: 'museum'
      }
    ],
    notes: 'Découverte archéologique de Taraz',
    order: 34,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Dernière journée à Taraz'
    }
  },
  {
    date: '2025-10-24',
    destination: destinations[14], // Taraz - Préparation bikepacking
    activities: [
      {
        id: '56',
        title: 'Préparation bikepacking vers Almaty',
        description: 'Préparatifs pour le bikepacking vers la mégapole',
        destinationId: '15',
        startTime: '09:00',
        endTime: '12:00',
        category: 'preparation'
      }
    ],
    notes: 'Préparation du départ en vélo vers Almaty',
    order: 35,
    transportToNext: {
      type: 'bike',
      duration: '10h',
      distance: '225km',
      notes: 'Bikepacking Taraz-Almaty (étape 1/2)'
    }
  },
  {
    date: '2025-10-25',
    destination: destinations[14], // Bikepacking jour 1
    activities: [
      {
        id: '63',
        title: 'Bikepacking vers Almaty',
        description: 'Traversée des montagnes et vallées kazakhes',
        destinationId: '15',
        startTime: '08:00',
        endTime: '18:00',
        category: 'nature'
      }
    ],
    notes: 'Jour de bikepacking intense vers Almaty',
    order: 36,
    transportToNext: {
      type: 'bike',
      duration: '8h',
      distance: '225km',
      notes: 'Bikepacking Taraz-Almaty (étape 2/2)'
    }
  },
  {
    date: '2025-10-25',
    destination: destinations[8], // Almaty - Arrivée
    activities: [
      {
        id: '57',
        title: 'Arrivée à Almaty',
        description: 'Installation dans la plus grande ville du Kazakhstan',
        destinationId: '9',
        startTime: '17:00',
        endTime: '19:00',
        category: 'arrival'
      },
      {
        id: '58',
        title: 'Balade dans le centre',
        description: 'Première découverte du centre-ville',
        destinationId: '9',
        startTime: '19:00',
        endTime: '21:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Arrivée à Almaty après bikepacking intense',
    order: 37,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration d\'Almaty'
    }
  },
  {
    date: '2025-10-26',
    destination: destinations[8], // Almaty - Jour 2
    activities: [
      {
        id: '59',
        title: 'Montagnes Zailiysky',
        description: 'Randonnée dans les montagnes environnantes',
        destinationId: '9',
        startTime: '09:00',
        endTime: '12:00',
        category: 'nature'
      },
      {
        id: '60',
        title: 'Musée central d\'État',
        description: 'Histoire et culture kazakhes',
        destinationId: '9',
        startTime: '14:00',
        endTime: '16:00',
        category: 'museum'
      }
    ],
    notes: 'Découverte naturelle et culturelle d\'Almaty',
    order: 38,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Dernière journée à Almaty'
    }
  },
  {
    date: '2025-10-27',
    destination: destinations[8], // Almaty - Préparation bikepacking
    activities: [
      {
        id: '64',
        title: 'Préparation bikepacking vers frontière',
        description: 'Préparatifs pour la dernière étape vers la Chine',
        destinationId: '9',
        startTime: '09:00',
        endTime: '12:00',
        category: 'preparation'
      }
    ],
    notes: 'Préparation du départ en vélo vers la frontière chinoise',
    order: 39,
    transportToNext: {
      type: 'bike',
      duration: '10h',
      distance: '160km',
      notes: 'Bikepacking Almaty-frontière chinoise (étape 1/2)'
    }
  },
  {
    date: '2025-10-28',
    destination: destinations[8], // Bikepacking jour 1
    activities: [
      {
        id: '65',
        title: 'Bikepacking vers la frontière',
        description: 'Dernière traversée kazakhe vers la Chine',
        destinationId: '9',
        startTime: '08:00',
        endTime: '18:00',
        category: 'nature'
      }
    ],
    notes: 'Jour de bikepacking vers la frontière sino-kazakhe',
    order: 40,
    transportToNext: {
      type: 'bike',
      duration: '6h',
      distance: '160km',
      notes: 'Bikepacking Almaty-frontière chinoise (étape 2/2)'
    }
  },
  {
    date: '2025-10-28',
    destination: destinations[11], // Frontière Kazakhstan-Chine
    activities: [
      {
        id: '61',
        title: 'Arrivée à la frontière',
        description: 'Formalités douanières Kazakhstan-Chine',
        destinationId: '12',
        startTime: '14:00',
        endTime: '18:00',
        category: 'preparation'
      }
    ],
    notes: 'Traversée de la frontière Kazakhstan-Chine après 25 jours de bikepacking',
    order: 41,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Entrée en Chine'
    }
  }
];
