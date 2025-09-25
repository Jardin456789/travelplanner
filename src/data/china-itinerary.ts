import { DayItinerary } from '@/types/travel';
import { destinations } from './destinations';

export const chinaDayItineraries: DayItinerary[] = [
  // === CHINE ===
  {
    date: '2025-10-29',
    destination: destinations[16], // Ürümqi
    activities: [
      {
        id: '62',
        title: 'Arrivée à Ürümqi',
        description: 'Installation dans la capitale du Xinjiang',
        destinationId: '17',
        startTime: '10:00',
        endTime: '12:00',
        category: 'arrival'
      },
      {
        id: '63',
        title: 'Grand Bazar',
        description: 'Marché traditionnel ouïghour',
        destinationId: '17',
        startTime: '14:00',
        endTime: '16:00',
        category: 'cultural'
      }
    ],
    notes: 'Arrivée en Chine après traversée frontière, découverte d\'Ürümqi',
    order: 42,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration d\'Ürümqi'
    }
  },
  {
    date: '2025-10-30',
    destination: destinations[16], // Ürümqi - Jour 2
    activities: [
      {
        id: '66',
        title: 'Musée du Xinjiang',
        description: 'Histoire de la région ouïghoure',
        destinationId: '17',
        startTime: '10:00',
        endTime: '12:00',
        category: 'museum'
      },
      {
        id: '67',
        title: 'Préparation du train',
        description: 'Achats et préparatifs pour le trajet vers Chengdu',
        destinationId: '17',
        startTime: '14:00',
        endTime: '16:00',
        category: 'preparation'
      }
    ],
    notes: 'Dernière journée à Ürümqi, préparation du train vers Chengdu',
    order: 43,
    transportToNext: {
      type: 'train',
      duration: '30h',
      distance: '2400km',
      notes: 'Train longue distance Ürümqi-Chengdu'
    }
  },
  {
    date: '2025-10-31',
    destination: destinations[16], // Train jour 1
    activities: [
      {
        id: '68',
        title: 'Voyage en train',
        description: 'Traversée du désert de Gobi et des montagnes',
        destinationId: '17',
        startTime: '08:00',
        endTime: '22:00',
        category: 'travel'
      }
    ],
    notes: 'Première journée de train à travers le Xinjiang et le Gobi',
    order: 44,
    transportToNext: {
      type: 'train',
      duration: '24h',
      distance: '1600km',
      notes: 'Suite du train Ürümqi-Chengdu'
    }
  },
  {
    date: '2025-11-01',
    destination: destinations[16], // Train jour 2
    activities: [
      {
        id: '69',
        title: 'Traversée des montagnes',
        description: 'Paysages spectaculaires depuis le train',
        destinationId: '17',
        startTime: '08:00',
        endTime: '22:00',
        category: 'nature'
      }
    ],
    notes: 'Deuxième journée de train à travers les montagnes chinoises',
    order: 45,
    transportToNext: {
      type: 'train',
      duration: '6h',
      distance: '800km',
      notes: 'Fin du train Ürümqi-Chengdu'
    }
  },
  {
    date: '2025-11-01',
    destination: destinations[17], // Chengdu - Arrivée
    activities: [
      {
        id: '70',
        title: 'Arrivée à Chengdu',
        description: 'Installation dans la mégapole du Sichuan',
        destinationId: '18',
        startTime: '16:00',
        endTime: '18:00',
        category: 'arrival'
      },
      {
        id: '71',
        title: 'Centre-ville moderne',
        description: 'Première découverte de Chengdu',
        destinationId: '18',
        startTime: '18:00',
        endTime: '20:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Arrivée à Chengdu après 30h de train depuis Ürümqi',
    order: 46,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration de Chengdu'
    }
  },
  {
    date: '2025-11-02',
    destination: destinations[17], // Chengdu - Jour 2
    activities: [
      {
        id: '72',
        title: 'Parc du Peuple',
        description: 'Détente dans les espaces verts de Chengdu',
        destinationId: '18',
        startTime: '10:00',
        endTime: '12:00',
        category: 'cultural'
      },
      {
        id: '73',
        title: 'Cuisine sichuanaise',
        description: 'Découverte de la gastronomie épicée',
        destinationId: '18',
        startTime: '14:00',
        endTime: '16:00',
        category: 'cultural'
      }
    ],
    notes: 'Découverte culturelle de Chengdu',
    order: 47,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Dernière journée à Chengdu'
    }
  },
  {
    date: '2025-11-03',
    destination: destinations[17], // Chengdu - Préparation bikepacking
    activities: [
      {
        id: '74',
        title: 'Préparation bikepacking vers Chongqing',
        description: 'Préparatifs pour le départ en vélo',
        destinationId: '18',
        startTime: '09:00',
        endTime: '12:00',
        category: 'preparation'
      }
    ],
    notes: 'Préparation du départ en vélo vers Chongqing',
    order: 48,
    transportToNext: {
      type: 'bike',
      duration: '8h',
      distance: '150km',
      notes: 'Bikepacking Chengdu-Chongqing (étape 1/2)'
    }
  },
  {
    date: '2025-11-04',
    destination: destinations[17], // Bikepacking jour 1
    activities: [
      {
        id: '75',
        title: 'Bikepacking dans le Sichuan',
        description: 'Traversée des campagnes sichuanaises',
        destinationId: '18',
        startTime: '08:00',
        endTime: '16:00',
        category: 'nature'
      }
    ],
    notes: 'Jour de bikepacking vers Chongqing',
    order: 49,
    transportToNext: {
      type: 'bike',
      duration: '6h',
      distance: '150km',
      notes: 'Bikepacking Chengdu-Chongqing (étape 2/2)'
    }
  },
  {
    date: '2025-11-04',
    destination: destinations[18], // Chongqing - Arrivée
    activities: [
      {
        id: '76',
        title: 'Arrivée à Chongqing',
        description: 'Installation dans la mégapole sur le Yangtze',
        destinationId: '19',
        startTime: '15:00',
        endTime: '17:00',
        category: 'arrival'
      },
      {
        id: '77',
        title: 'Bund de Chongqing',
        description: 'Balade le long du fleuve Yangtze',
        destinationId: '19',
        startTime: '17:00',
        endTime: '19:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Arrivée à Chongqing après bikepacking depuis Chengdu',
    order: 50,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration de Chongqing'
    }
  },
  {
    date: '2025-11-05',
    destination: destinations[18], // Chongqing - Jour 2
    activities: [
      {
        id: '78',
        title: 'Musée des Trois Gorges',
        description: 'Histoire du Yangtze et des Trois Gorges',
        destinationId: '19',
        startTime: '10:00',
        endTime: '12:00',
        category: 'museum'
      },
      {
        id: '79',
        title: 'Quartiers anciens',
        description: 'Exploration des quartiers traditionnels',
        destinationId: '19',
        startTime: '14:00',
        endTime: '16:00',
        category: 'cultural'
      }
    ],
    notes: 'Découverte historique de Chongqing',
    order: 51,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Dernière journée à Chongqing'
    }
  },
  {
    date: '2025-11-06',
    destination: destinations[18], // Chongqing - Préparation bikepacking
    activities: [
      {
        id: '80',
        title: 'Préparation bikepacking vers Kunming',
        description: 'Préparatifs pour le long trajet vers le Yunnan',
        destinationId: '19',
        startTime: '09:00',
        endTime: '12:00',
        category: 'preparation'
      }
    ],
    notes: 'Préparation du départ en vélo vers Kunming',
    order: 52,
    transportToNext: {
      type: 'bike',
      duration: '10h',
      distance: '200km',
      notes: 'Bikepacking Chongqing-Kunming (étape 1/4)'
    }
  },
  {
    date: '2025-11-07',
    destination: destinations[18], // Bikepacking jour 1
    activities: [
      {
        id: '81',
        title: 'Bikepacking vers le Yunnan',
        description: 'Traversée des paysages variés de Chine centrale',
        destinationId: '19',
        startTime: '07:00',
        endTime: '17:00',
        category: 'nature'
      }
    ],
    notes: 'Premier jour de bikepacking vers Kunming',
    order: 53,
    transportToNext: {
      type: 'bike',
      duration: '10h',
      distance: '200km',
      notes: 'Bikepacking Chongqing-Kunming (étape 2/4)'
    }
  },
  {
    date: '2025-11-08',
    destination: destinations[18], // Bikepacking jour 2
    activities: [
      {
        id: '82',
        title: 'Traversée des montagnes',
        description: 'Montées et descentes dans les reliefs chinois',
        destinationId: '19',
        startTime: '07:00',
        endTime: '17:00',
        category: 'nature'
      }
    ],
    notes: 'Deuxième jour de bikepacking vers Kunming',
    order: 54,
    transportToNext: {
      type: 'bike',
      duration: '10h',
      distance: '200km',
      notes: 'Bikepacking Chongqing-Kunming (étape 3/4)'
    }
  },
  {
    date: '2025-11-09',
    destination: destinations[18], // Bikepacking jour 3
    activities: [
      {
        id: '83',
        title: 'Approche du Yunnan',
        description: 'Dernière étape avant les montagnes du Yunnan',
        destinationId: '19',
        startTime: '07:00',
        endTime: '17:00',
        category: 'nature'
      }
    ],
    notes: 'Troisième jour de bikepacking vers Kunming',
    order: 55,
    transportToNext: {
      type: 'bike',
      duration: '6h',
      distance: '200km',
      notes: 'Bikepacking Chongqing-Kunming (étape 4/4)'
    }
  },
  {
    date: '2025-11-09',
    destination: destinations[19], // Kunming - Arrivée
    activities: [
      {
        id: '84',
        title: 'Arrivée à Kunming',
        description: 'Installation dans la capitale du Yunnan',
        destinationId: '20',
        startTime: '15:00',
        endTime: '17:00',
        category: 'arrival'
      },
      {
        id: '85',
        title: 'Lac Dian',
        description: 'Balade autour du lac de Kunming',
        destinationId: '20',
        startTime: '17:00',
        endTime: '19:00',
        category: 'nature'
      }
    ],
    notes: 'Arrivée à Kunming après 4 jours de bikepacking depuis Chongqing',
    order: 56,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration de Kunming'
    }
  },
  {
    date: '2025-11-10',
    destination: destinations[19], // Kunming - Jour 2
    activities: [
      {
        id: '86',
        title: 'Temple Yuantong',
        description: 'Visite du temple bouddhiste historique',
        destinationId: '20',
        startTime: '10:00',
        endTime: '12:00',
        category: 'cultural'
      },
      {
        id: '87',
        title: 'Minorités ethniques',
        description: 'Découverte de la culture yi et autres minorités',
        destinationId: '20',
        startTime: '14:00',
        endTime: '16:00',
        category: 'cultural'
      }
    ],
    notes: 'Découverte culturelle de Kunming',
    order: 57,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Dernière journée à Kunming'
    }
  },
  {
    date: '2025-11-11',
    destination: destinations[19], // Kunming - Préparation bikepacking
    activities: [
      {
        id: '88',
        title: 'Préparation bikepacking vers frontière',
        description: 'Préparatifs pour le trajet vers le Vietnam',
        destinationId: '20',
        startTime: '09:00',
        endTime: '12:00',
        category: 'preparation'
      }
    ],
    notes: 'Préparation du départ en vélo vers la frontière vietnamienne',
    order: 58,
    transportToNext: {
      type: 'bike',
      duration: '8h',
      distance: '180km',
      notes: 'Bikepacking Kunming-frontière Vietnam (étape 1/2)'
    }
  },
  {
    date: '2025-11-12',
    destination: destinations[19], // Bikepacking jour 1
    activities: [
      {
        id: '89',
        title: 'Bikepacking dans le Yunnan',
        description: 'Traversée des paysages montagneux du Yunnan',
        destinationId: '20',
        startTime: '07:00',
        endTime: '15:00',
        category: 'nature'
      }
    ],
    notes: 'Jour de bikepacking vers la frontière vietnamienne',
    order: 59,
    transportToNext: {
      type: 'bike',
      duration: '6h',
      distance: '180km',
      notes: 'Bikepacking Kunming-frontière Vietnam (étape 2/2)'
    }
  },
  {
    date: '2025-11-12',
    destination: destinations[22], // Frontière Chine-Vietnam
    activities: [
      {
        id: '90',
        title: 'Arrivée à la frontière',
        description: 'Formalités douanières Chine-Vietnam',
        destinationId: '23',
        startTime: '14:00',
        endTime: '18:00',
        category: 'preparation'
      }
    ],
    notes: 'Traversée de la frontière Chine-Vietnam après bikepacking dans le Yunnan',
    order: 60,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Entrée au Vietnam'
    }
  }
];
