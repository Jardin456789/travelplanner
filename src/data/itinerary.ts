import { Destination, DayItinerary, Itinerary } from '@/types/travel';

export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Skopje',
    description: 'Capitale de la Macédoine du Nord',
    coordinates: { lat: 41.9981, lng: 21.4254 },
    address: 'Skopje, Macédoine du Nord',
    category: 'city'
  },
  {
    id: '2',
    name: 'Istanbul',
    description: 'Métropole entre Europe et Asie',
    coordinates: { lat: 41.0082, lng: 28.9784 },
    address: 'Istanbul, Turquie',
    category: 'city'
  },
  {
    id: '3',
    name: 'Aktau',
    description: 'Ville portuaire sur la mer Caspienne',
    coordinates: { lat: 43.65, lng: 51.16 },
    address: 'Aktau, Kazakhstan',
    category: 'city'
  },
  {
    id: '4',
    name: 'Atyrau',
    description: 'Ville pétrolière sur la Caspienne',
    coordinates: { lat: 47.0945, lng: 51.9236 },
    address: 'Atyrau, Kazakhstan',
    category: 'city'
  },
  {
    id: '5',
    name: 'Aktobe',
    description: 'Ville industrielle au centre du Kazakhstan',
    coordinates: { lat: 50.2839, lng: 57.1669 },
    address: 'Aktobe, Kazakhstan',
    category: 'city'
  },
  {
    id: '6',
    name: 'Kyzylorda',
    description: 'Ville du désert sur le Syr-Daria',
    coordinates: { lat: 44.8488, lng: 65.4823 },
    address: 'Kyzylorda, Kazakhstan',
    category: 'city'
  },
  {
    id: '7',
    name: 'Almaty',
    description: 'Plus grande ville du Kazakhstan',
    coordinates: { lat: 43.2220, lng: 76.8512 },
    address: 'Almaty, Kazakhstan',
    category: 'city'
  },
  {
    id: '8',
    name: 'Steppes du Kazakhstan',
    description: 'Région de bikepacking dans les plaines kazakhes',
    coordinates: { lat: 44.5, lng: 72.0 },
    address: 'Région de Balkhash, Kazakhstan',
    category: 'nature'
  },
  {
    id: '9',
    name: 'Lac Balkhash',
    description: 'Grand lac d\'Asie centrale',
    coordinates: { lat: 46.0, lng: 74.0 },
    address: 'Lac Balkhash, Kazakhstan',
    category: 'nature'
  },
  {
    id: '10',
    name: 'Frontière Kazakhstan-Chine',
    description: 'Passage vers le Xinjiang chinois',
    coordinates: { lat: 46.5, lng: 81.0 },
    address: 'Frontière Kazakhstan-Chine',
    category: 'border'
  },
  {
    id: '11',
    name: 'Ürümqi',
    description: 'Capitale du Xinjiang, première ville chinoise',
    coordinates: { lat: 43.8256, lng: 87.6168 },
    address: 'Ürümqi, Xinjiang, Chine',
    category: 'city'
  },
  {
    id: '12',
    name: 'Chengdu',
    description: 'Capitale du Sichuan, ville moderne avec temples anciens',
    coordinates: { lat: 30.5728, lng: 104.0668 },
    address: 'Chengdu, Sichuan, Chine',
    category: 'city'
  },
  {
    id: '13',
    name: 'Chongqing',
    description: 'Municipalité de Chongqing, mégapole sur le Yangtze',
    coordinates: { lat: 29.5630, lng: 106.5516 },
    address: 'Chongqing, Chine',
    category: 'city'
  },
  {
    id: '14',
    name: 'Kunming',
    description: 'Capitale du Yunnan, porte d\'entrée des minorités ethniques',
    coordinates: { lat: 24.8801, lng: 102.8329 },
    address: 'Kunming, Yunnan, Chine',
    category: 'city'
  },
  {
    id: '15',
    name: 'Montagnes du Yunnan',
    description: 'Région de bikepacking dans les montagnes du Yunnan',
    coordinates: { lat: 25.5, lng: 101.0 },
    address: 'Région de Dali-Lijiang, Yunnan, Chine',
    category: 'nature'
  },
  {
    id: '16',
    name: 'Vallée de la rivière Rouge',
    description: 'Traversée de la frontière Vietnam via la rivière Rouge',
    coordinates: { lat: 22.5, lng: 103.5 },
    address: 'Région frontalière Vietnam-Chine',
    category: 'nature'
  },
  {
    id: '17',
    name: 'Frontière Chine-Vietnam',
    description: 'Poste frontière vers le Vietnam',
    coordinates: { lat: 22.3, lng: 103.8 },
    address: 'Frontière Chine-Vietnam',
    category: 'border'
  },
  // === VIETNAM ===
  {
    id: '18',
    name: 'Hanoi',
    description: 'Capitale du Vietnam, ancienne ville impériale',
    coordinates: { lat: 21.0278, lng: 105.8342 },
    address: 'Hanoi, Vietnam',
    category: 'city'
  },
  {
    id: '19',
    name: 'Ha Long',
    description: 'Baie légendaire avec ses milliers d\'îles karstiques',
    coordinates: { lat: 20.9101, lng: 107.1839 },
    address: 'Ha Long, Vietnam',
    category: 'nature'
  },
  {
    id: '20',
    name: 'Route côtière Vietnam',
    description: 'Traversée côtière en vélo vers le sud',
    coordinates: { lat: 19.5, lng: 105.8 },
    address: 'Côte centrale du Vietnam',
    category: 'nature'
  },
  {
    id: '21',
    name: 'Da Nang',
    description: 'Ville côtière moderne avec plage et montagne',
    coordinates: { lat: 16.0544, lng: 108.2022 },
    address: 'Da Nang, Vietnam',
    category: 'city'
  },
  {
    id: '22',
    name: 'Hoi An',
    description: 'Ville historique classée UNESCO, quartier ancien préservé',
    coordinates: { lat: 15.8801, lng: 108.3380 },
    address: 'Hoi An, Vietnam',
    category: 'city'
  },
  {
    id: '23',
    name: 'Nha Trang',
    description: 'Station balnéaire avec plages magnifiques',
    coordinates: { lat: 12.2388, lng: 109.1967 },
    address: 'Nha Trang, Vietnam',
    category: 'nature'
  },
  {
    id: '24',
    name: 'Dalat',
    description: 'Ville d\'altitude avec architecture française coloniale',
    coordinates: { lat: 11.9404, lng: 108.4583 },
    address: 'Dalat, Vietnam',
    category: 'city'
  },
  {
    id: '25',
    name: 'Ho Chi Minh Ville (Saigon)',
    description: 'Plus grande ville du Vietnam, centre économique',
    coordinates: { lat: 10.8231, lng: 106.6297 },
    address: 'Ho Chi Minh Ville, Vietnam',
    category: 'city'
  },
  // === CHINE CÔTIÈRE - RETOUR ===
  {
    id: '26',
    name: 'Shenzhen',
    description: 'Ville high-tech frontalière de Hong Kong',
    coordinates: { lat: 22.5429, lng: 114.0596 },
    address: 'Shenzhen, Guangdong, Chine',
    category: 'city'
  },
  {
    id: '27',
    name: 'Guangzhou',
    description: 'Capitale économique du Guangdong',
    coordinates: { lat: 23.1291, lng: 113.2644 },
    address: 'Guangzhou, Guangdong, Chine',
    category: 'city'
  },
  {
    id: '28',
    name: 'Xiamen',
    description: 'Port historique sur la côte sud-est',
    coordinates: { lat: 24.4798, lng: 118.0894 },
    address: 'Xiamen, Fujian, Chine',
    category: 'city'
  },
  {
    id: '29',
    name: 'Hangzhou',
    description: 'Capitale du Zhejiang, célèbre pour son lac Ouest',
    coordinates: { lat: 30.2741, lng: 120.1551 },
    address: 'Hangzhou, Zhejiang, Chine',
    category: 'city'
  },
  {
    id: '30',
    name: 'Shanghai',
    description: 'Mégapole moderne, centre financier de la Chine',
    coordinates: { lat: 31.2304, lng: 121.4737 },
    address: 'Shanghai, Chine',
    category: 'city'
  },
  {
    id: '31',
    name: 'Nanjing',
    description: 'Capitale historique de la Chine impériale',
    coordinates: { lat: 32.0603, lng: 118.7969 },
    address: 'Nanjing, Jiangsu, Chine',
    category: 'city'
  },
  {
    id: '32',
    name: 'Qingdao',
    description: 'Ville portuaire avec architecture allemande',
    coordinates: { lat: 36.0671, lng: 120.3826 },
    address: 'Qingdao, Shandong, Chine',
    category: 'city'
  },
  {
    id: '33',
    name: 'Tianjin',
    description: 'Port majeur près de Pékin',
    coordinates: { lat: 39.0842, lng: 117.2009 },
    address: 'Tianjin, Chine',
    category: 'city'
  },
  {
    id: '34',
    name: 'Dalian',
    description: 'Port moderne sur la mer Jaune',
    coordinates: { lat: 38.9140, lng: 121.6147 },
    address: 'Dalian, Liaoning, Chine',
    category: 'city'
  },
  {
    id: '35',
    name: 'Port Tianjin',
    description: 'Port international pour ferry vers Corée',
    coordinates: { lat: 39.0842, lng: 117.2009 },
    address: 'Port de Tianjin, Chine',
    category: 'transport'
  },
  // === CORÉE DU SUD ===
  {
    id: '36',
    name: 'Incheon',
    description: 'Port d\'arrivée en Corée du Sud',
    coordinates: { lat: 37.4563, lng: 126.7052 },
    address: 'Incheon, Corée du Sud',
    category: 'city'
  },
  {
    id: '37',
    name: 'Séoul',
    description: 'Capitale de la Corée du Sud',
    coordinates: { lat: 37.5665, lng: 126.9780 },
    address: 'Séoul, Corée du Sud',
    category: 'city'
  }
];

export const dayItineraries: DayItinerary[] = [
  {
    date: '2024-09-24',
    destination: destinations[0], // Skopje
    activities: [
      {
        id: '1',
        title: 'Visite du Vieux Bazar',
        description: 'Découverte du marché traditionnel',
        destinationId: '1',
        startTime: '10:00',
        endTime: '12:00',
        category: 'sightseeing'
      },
      {
        id: '2',
        title: 'Musée de Macédoine',
        description: 'Histoire et culture macédonienne',
        destinationId: '1',
        startTime: '14:00',
        endTime: '16:00',
        category: 'museum'
      }
    ],
    notes: 'Arrivée en ville, installation à l\'hôtel',
    order: 1,
    transportToNext: {
      type: 'bus',
      duration: '8h',
      distance: '580km',
      notes: 'Bus de nuit avec arrêt à Belgrade'
    }
  },
  {
    date: '2024-09-25',
    destination: destinations[1], // Istanbul
    activities: [
      {
        id: '3',
        title: 'Visite de Sainte-Sophie',
        description: 'Chef-d\'œuvre byzantin',
        destinationId: '2',
        startTime: '09:00',
        endTime: '11:00',
        category: 'sightseeing'
      },
      {
        id: '4',
        title: 'Bosphore en bateau',
        description: 'Croisière sur le détroit',
        destinationId: '2',
        startTime: '15:00',
        endTime: '17:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Voyage en bus depuis Skopje (environ 8h)',
    order: 2,
    transportToNext: {
      type: 'plane',
      duration: '3h 30m',
      distance: '2400km',
      notes: 'Vol direct Istanbul-Aktau'
    }
  },
  {
    date: '2024-09-30',
    destination: destinations[2], // Aktau - Jour 1/3
    activities: [
      {
        id: '5',
        title: 'Promenade sur le front de mer',
        description: 'Découverte du bord de mer Caspienne',
        destinationId: '3',
        startTime: '10:00',
        endTime: '12:00',
        category: 'sightseeing'
      },
      {
        id: '6',
        title: 'Musée régional d\'Aktau',
        description: 'Histoire et culture du Kazakhstan',
        destinationId: '3',
        startTime: '15:00',
        endTime: '17:00',
        category: 'museum'
      }
    ],
    notes: 'Voyage en avion depuis Istanbul (environ 3h 30m). Installation et préparation du bikepacking.',
    order: 3,
    transportToNext: {
      type: 'bike',
      duration: '5h',
      distance: '120km',
      notes: 'Début du bikepacking vers Atyrau'
    }
  },
  {
    date: '2024-10-01',
    destination: destinations[2], // Aktau - Jour 2/3
    activities: [
      {
        id: '7',
        title: 'Préparation du matériel bikepacking',
        description: 'Vérification vélo, équipement et provisions',
        destinationId: '3',
        startTime: '09:00',
        endTime: '12:00',
        category: 'preparation'
      },
      {
        id: '8',
        title: 'Exploration des environs',
        description: 'Randonnée légère autour d\'Aktau',
        destinationId: '3',
        startTime: '14:00',
        endTime: '17:00',
        category: 'outdoor'
      }
    ],
    notes: 'Journée de préparation pour le départ en bikepacking.',
    order: 4,
    transportToNext: {
      type: 'bike',
      duration: '5h',
      distance: '120km',
      notes: 'Suite du bikepacking vers Atyrau'
    }
  },
  {
    date: '2024-10-02',
    destination: destinations[2], // Aktau - Jour 3/3
    activities: [
      {
        id: '9',
        title: 'Derniers achats et vérifications',
        description: 'Achat de nourriture et vérification finale du matériel',
        destinationId: '3',
        startTime: '09:00',
        endTime: '12:00',
        category: 'shopping'
      },
      {
        id: '10',
        title: 'Détente et repos',
        description: 'Moment de repos avant le départ',
        destinationId: '3',
        startTime: '14:00',
        endTime: '17:00',
        category: 'relaxation'
      }
    ],
    notes: 'Dernière journée à Aktau avant le départ en bikepacking vers Atyrau.',
    order: 5,
    transportToNext: {
      type: 'bike',
      duration: '5h',
      distance: '120km',
      notes: 'Début du bikepacking vers Atyrau'
    }
  },
  {
    date: '2024-10-03',
    destination: destinations[3], // Atyrau
    activities: [
      {
        id: '11',
        title: 'Bikepacking vers Atyrau',
        description: 'Première étape du grand bikepacking vers Almaty',
        destinationId: '4',
        startTime: '08:00',
        endTime: '18:00',
        category: 'bikepacking'
      }
    ],
    notes: 'Début du bikepacking entre Aktau et Almaty. Route côtière le long de la Caspienne.',
    order: 6,
    transportToNext: {
      type: 'bike',
      duration: '5h',
      distance: '120km',
      notes: 'Suite du bikepacking vers Aktobe'
    }
  },
  {
    date: '2024-10-04',
    destination: destinations[4], // Aktobe - Jour 1
    activities: [
      {
        id: '12',
        title: 'Traversée vers Aktobe',
        description: 'Bikepacking dans les plaines kazakhes, premiers reliefs',
        destinationId: '5',
        startTime: '08:00',
        endTime: '17:00',
        category: 'bikepacking'
      },
      {
        id: '13',
        title: 'Installation à Aktobe',
        description: 'Repos et ravitaillement en ville',
        destinationId: '5',
        startTime: '17:00',
        endTime: '19:00',
        category: 'rest'
      }
    ],
    notes: 'Arrivée à Aktobe. Ville industrielle avec toutes les commodités.',
    order: 7,
    transportToNext: {
      type: 'bike',
      duration: '6h',
      distance: '140km',
      notes: 'Bikepacking vers Kyzylorda'
    }
  },
  {
    date: '2024-10-05',
    destination: destinations[4], // Aktobe - Jour 2
    activities: [
      {
        id: '14',
        title: 'Exploration d\'Aktobe',
        description: 'Découverte de la ville, visite des marchés locaux',
        destinationId: '5',
        startTime: '09:00',
        endTime: '13:00',
        category: 'cultural'
      },
      {
        id: '15',
        title: 'Préparation poursuite',
        description: 'Ravitaillement et vérification du matériel',
        destinationId: '5',
        startTime: '14:00',
        endTime: '17:00',
        category: 'preparation'
      }
    ],
    notes: 'Journée de repos à Aktobe avant de continuer vers Kyzylorda.',
    order: 8,
    transportToNext: {
      type: 'bike',
      duration: '6h',
      distance: '140km',
      notes: 'Suite vers Kyzylorda'
    }
  },
  {
    date: '2024-10-06',
    destination: destinations[5], // Kyzylorda
    activities: [
      {
        id: '16',
        title: 'Bikepacking vers Kyzylorda',
        description: 'Traversée du désert, approche de la région du Syr-Daria',
        destinationId: '6',
        startTime: '08:00',
        endTime: '18:00',
        category: 'bikepacking'
      }
    ],
    notes: 'Arrivée à Kyzylorda, ville oasis dans le désert kazakh.',
    order: 9,
    transportToNext: {
      type: 'bike',
      duration: '7h',
      distance: '160km',
      notes: 'Dernière étape vers Almaty'
    }
  },
  {
    date: '2024-10-07',
    destination: destinations[6], // Almaty
    activities: [
      {
        id: '17',
        title: 'Arrivée à Almaty',
        description: 'Fin du grand bikepacking, installation en ville',
        destinationId: '7',
        startTime: '08:00',
        endTime: '15:00',
        category: 'arrival'
      },
      {
        id: '18',
        title: 'Récupération et préparation',
        description: 'Repos après le long trajet, préparation poursuite vers la Chine',
        destinationId: '7',
        startTime: '16:00',
        endTime: '19:00',
        category: 'preparation'
      }
    ],
    notes: 'Arrivée triomphale à Almaty après plus de 600km de bikepacking !',
    order: 10,
    transportToNext: {
      type: 'bike',
      duration: '4h',
      distance: '90km',
      notes: 'Début du bikepacking vers les steppes chinoises'
    }
  },
  {
    date: '2024-10-08',
    destination: destinations[7], // Steppes du Kazakhstan - Jour 1
    activities: [
      {
        id: '19',
        title: 'Bikepacking vers Balkhash',
        description: 'Traversée des plaines kazakhes, camping en pleine nature',
        destinationId: '8',
        startTime: '08:00',
        endTime: '18:00',
        category: 'bikepacking'
      }
    ],
    notes: 'Première journée de bikepacking après Almaty. Route plate dans les steppes, températures agréables.',
    order: 11,
    transportToNext: {
      type: 'bike',
      duration: '4h',
      distance: '90km',
      notes: 'Suite du bikepacking vers le lac Balkhash'
    }
  },
  {
    date: '2024-10-09',
    destination: destinations[7], // Steppes du Kazakhstan - Jour 2
    activities: [
      {
        id: '20',
        title: 'Traversée des steppes',
        description: 'Bikepacking avec vues sur les paysages infinis des plaines kazakhes',
        destinationId: '8',
        startTime: '08:00',
        endTime: '17:00',
        category: 'bikepacking'
      },
      {
        id: '21',
        title: 'Camping sauvage',
        description: 'Installation du campement avec protection contre le vent',
        destinationId: '8',
        startTime: '17:00',
        endTime: '19:00',
        category: 'camping'
      }
    ],
    notes: 'Journée de bikepacking dans les steppes. Temps clément, couverture mobile intermittente.',
    order: 12,
    transportToNext: {
      type: 'bike',
      duration: '4h',
      distance: '85km',
      notes: 'Approche du lac Balkhash'
    }
  },
  {
    date: '2024-10-10',
    destination: destinations[8], // Lac Balkhash
    activities: [
      {
        id: '22',
        title: 'Arrivée au lac Balkhash',
        description: 'Installation près du lac, observation de la faune locale',
        destinationId: '9',
        startTime: '08:00',
        endTime: '12:00',
        category: 'nature'
      },
      {
        id: '23',
        title: 'Exploration des rives',
        description: 'Balade le long du lac Balkhash, recherche de zones de camping sûres',
        destinationId: '9',
        startTime: '14:00',
        endTime: '18:00',
        category: 'exploration'
      }
    ],
    notes: 'Arrivée au lac Balkhash. Zone sécurisée avec couverture mobile partielle.',
    order: 13,
    transportToNext: {
      type: 'bike',
      duration: '5h',
      distance: '100km',
      notes: 'Bikepacking vers la frontière chinoise'
    }
  },
  {
    date: '2024-10-11',
    destination: destinations[8], // Lac Balkhash - Jour 2
    activities: [
      {
        id: '24',
        title: 'Repos au bord du lac',
        description: 'Journée de récupération après le bikepacking, pêche ou observation',
        destinationId: '9',
        startTime: '09:00',
        endTime: '12:00',
        category: 'relaxation'
      },
      {
        id: '25',
        title: 'Préparation de la frontière',
        description: 'Vérification des papiers et préparation du passage en Chine',
        destinationId: '9',
        startTime: '14:00',
        endTime: '17:00',
        category: 'preparation'
      }
    ],
    notes: 'Journée de repos au lac Balkhash avant de continuer vers la Chine.',
    order: 14,
    transportToNext: {
      type: 'bike',
      duration: '6h',
      distance: '120km',
      notes: 'Dernière étape de bikepacking vers la frontière'
    }
  },
  {
    date: '2024-10-12',
    destination: destinations[9], // Frontière Kazakhstan-Chine
    activities: [
      {
        id: '26',
        title: 'Passage de la frontière',
        description: 'Formalités douanières et passage vers la Chine',
        destinationId: '10',
        startTime: '08:00',
        endTime: '16:00',
        category: 'border'
      }
    ],
    notes: 'Passage de la frontière Kazakhstan-Chine. Zone contrôlée avec couverture mobile.',
    order: 15,
    transportToNext: {
      type: 'train',
      duration: '8h',
      distance: '650km',
      notes: 'Train de jour vers Ürümqi, arrivée en soirée'
    }
  },
  // === CHINE - 30 jours ===
  {
    date: '2024-10-13',
    destination: destinations[10], // Ürümqi - Jour 1/3 en Chine
    activities: [
      {
        id: '27',
        title: 'Arrivée à Ürümqi',
        description: 'Installation dans la première ville chinoise, découverte culturelle',
        destinationId: '11',
        startTime: '18:00',
        endTime: '20:00',
        category: 'arrival'
      },
      {
        id: '28',
        title: 'Visite du Grand Bazar',
        description: 'Découverte des marchés traditionnels ouïghours',
        destinationId: '11',
        startTime: '19:00',
        endTime: '21:00',
        category: 'cultural'
      }
    ],
    notes: 'Arrivée tardive à Ürümqi après le train depuis la frontière. Début des 30 jours en Chine.',
    order: 16,
    transportToNext: {
      type: 'train',
      duration: '12h (nuit)',
      distance: '1600km',
      notes: 'Train de nuit lent Ürümqi-Xi\'an, départ 22h00'
    }
  },
  {
    date: '2024-10-14',
    destination: destinations[10], // Train Ürümqi-Xi'an - Jour 1
    activities: [
      {
        id: '29',
        title: 'Voyage en train de nuit',
        description: 'Traversée du désert du Taklamakan en train lent',
        destinationId: '11',
        startTime: '22:00',
        endTime: '10:00',
        category: 'travel'
      }
    ],
    notes: 'Première nuit en train lent vers l\'est de la Chine.',
    order: 17,
    transportToNext: {
      type: 'train',
      duration: '12h (nuit)',
      distance: '1600km',
      notes: 'Suite du train de nuit vers Xi\'an'
    }
  },
  {
    date: '2024-10-15',
    destination: destinations[10], // Train Ürümqi-Xi'an - Jour 2
    activities: [
      {
        id: '30',
        title: 'Voyage en train de nuit',
        description: 'Continuité du voyage à travers les plaines chinoises',
        destinationId: '11',
        startTime: '10:00',
        endTime: '22:00',
        category: 'travel'
      }
    ],
    notes: 'Deuxième journée en train, approche des régions centrales.',
    order: 18,
    transportToNext: {
      type: 'train',
      duration: '12h (nuit)',
      distance: '1600km',
      notes: 'Dernière nuit du train vers Xi\'an'
    }
  },
  {
    date: '2024-10-16',
    destination: destinations[11], // Chengdu - Transit Xi'an puis arrivée
    activities: [
      {
        id: '31',
        title: 'Transit à Xi\'an et arrivée Chengdu',
        description: 'Court arrêt à Xi\'an puis train vers Chengdu',
        destinationId: '12',
        startTime: '08:00',
        endTime: '20:00',
        category: 'travel'
      }
    ],
    notes: 'Transit à Xi\'an puis arrivée à Chengdu en fin de journée.',
    order: 19,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration de Chengdu'
    }
  },
  {
    date: '2024-10-17',
    destination: destinations[11], // Chengdu - Jour 1/8
    activities: [
      {
        id: '32',
        title: 'Arrivée à Chengdu',
        description: 'Installation dans la capitale du Sichuan',
        destinationId: '12',
        startTime: '20:00',
        endTime: '22:00',
        category: 'arrival'
      },
      {
        id: '33',
        title: 'Découverte du centre-ville',
        description: 'Première impression de Chengdu by night',
        destinationId: '12',
        startTime: '21:00',
        endTime: '23:00',
        category: 'cultural'
      }
    ],
    notes: 'Arrivée à Chengdu, début de l\'exploration du Sichuan.',
    order: 20,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration de Chengdu'
    }
  },
  {
    date: '2024-10-18',
    destination: destinations[11], // Chengdu - Jour 2/12
    activities: [
      {
        id: '34',
        title: 'Visite du Temple de Jinli',
        description: 'Exploration du quartier historique traditionnel',
        destinationId: '12',
        startTime: '09:00',
        endTime: '12:00',
        category: 'cultural'
      },
      {
        id: '35',
        title: 'Parc du Peuple',
        description: 'Détente et observation de la vie locale',
        destinationId: '12',
        startTime: '14:00',
        endTime: '17:00',
        category: 'relaxation'
      }
    ],
    notes: 'Exploration culturelle de Chengdu.',
    order: 21,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Suite exploration Chengdu'
    }
  },
  {
    date: '2024-10-19',
    destination: destinations[11], // Chengdu - Jour 3/12
    activities: [
      {
        id: '36',
        title: 'Mont Emei (escapade)',
        description: 'Journée dans les montagnes sacrées du bouddhisme',
        destinationId: '12',
        startTime: '08:00',
        endTime: '18:00',
        category: 'nature'
      }
    ],
    notes: 'Escapade culturelle dans les montagnes Emei.',
    order: 22,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Repos à Chengdu'
    }
  },
  {
    date: '2024-10-20',
    destination: destinations[11], // Chengdu - Jour 4/12
    activities: [
      {
        id: '37',
        title: 'Cuisine sichuanaise',
        description: 'Cours de cuisine et découverte des épices locales',
        destinationId: '12',
        startTime: '10:00',
        endTime: '14:00',
        category: 'cultural'
      },
      {
        id: '38',
        title: 'Quartiers artistiques',
        description: 'Exploration des quartiers créatifs de Chengdu',
        destinationId: '12',
        startTime: '15:00',
        endTime: '18:00',
        category: 'cultural'
      }
    ],
    notes: 'Immersion culturelle et culinaire à Chengdu.',
    order: 23,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Derniers jours à Chengdu'
    }
  },
  {
    date: '2024-10-21',
    destination: destinations[11], // Chengdu - Jour 5/12
    activities: [
      {
        id: '39',
        title: 'Préparation bikepacking',
        description: 'Achat d\'équipement et préparation du matériel',
        destinationId: '12',
        startTime: '09:00',
        endTime: '14:00',
        category: 'preparation'
      },
      {
        id: '40',
        title: 'Test vélo',
        description: 'Vérification du vélo et équipement pour le bikepacking',
        destinationId: '12',
        startTime: '15:00',
        endTime: '17:00',
        category: 'preparation'
      }
    ],
    notes: 'Préparation du départ en bikepacking vers Chongqing.',
    order: 24,
    transportToNext: {
      type: 'bike',
      duration: '5h',
      distance: '280km',
      notes: 'Bikepacking vers Chongqing'
    }
  },
  {
    date: '2024-10-22',
    destination: destinations[12], // Chongqing - Jour 1/8
    activities: [
      {
        id: '41',
        title: 'Arrivée à Chongqing',
        description: 'Installation dans la mégapole sur le Yangtze',
        destinationId: '13',
        startTime: '14:00',
        endTime: '18:00',
        category: 'arrival'
      },
      {
        id: '42',
        title: 'Vue sur le Yangtze',
        description: 'Observation des gorges et du fleuve',
        destinationId: '13',
        startTime: '16:00',
        endTime: '19:00',
        category: 'nature'
      }
    ],
    notes: 'Arrivée à Chongqing après bikepacking depuis Chengdu.',
    order: 25,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration Chongqing'
    }
  },
  {
    date: '2024-10-23',
    destination: destinations[12], // Chongqing - Jour 2/8
    activities: [
      {
        id: '43',
        title: 'Musée des Trois Gorges',
        description: 'Histoire des gorges du Yangtze',
        destinationId: '13',
        startTime: '09:00',
        endTime: '12:00',
        category: 'museum'
      },
      {
        id: '44',
        title: 'Quartiers anciens',
        description: 'Exploration des vieilles rues de Chongqing',
        destinationId: '13',
        startTime: '14:00',
        endTime: '17:00',
        category: 'cultural'
      }
    ],
    notes: 'Découverte historique et culturelle de Chongqing.',
    order: 26,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Suite exploration'
    }
  },
  {
    date: '2024-10-24',
    destination: destinations[12], // Chongqing - Jour 3/8
    activities: [
      {
        id: '45',
        title: 'Croisière sur le Yangtze',
        description: 'Navigation sur le plus grand fleuve de Chine',
        destinationId: '13',
        startTime: '09:00',
        endTime: '17:00',
        category: 'nature'
      }
    ],
    notes: 'Expérience unique sur le Yangtze.',
    order: 27,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Repos à Chongqing'
    }
  },
  {
    date: '2024-10-25',
    destination: destinations[12], // Chongqing - Jour 4/8
    activities: [
      {
        id: '46',
        title: 'Cuisine du Sichuan oriental',
        description: 'Découverte des spécialités de Chongqing',
        destinationId: '13',
        startTime: '11:00',
        endTime: '14:00',
        category: 'cultural'
      },
      {
        id: '47',
        title: 'Architecture moderne',
        description: 'Exploration des gratte-ciels et développement urbain',
        destinationId: '13',
        startTime: '15:00',
        endTime: '18:00',
        category: 'cultural'
      }
    ],
    notes: 'Immersion dans la culture moderne de Chongqing.',
    order: 28,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Préparation départ'
    }
  },
  {
    date: '2024-10-26',
    destination: destinations[12], // Chongqing - Jour 5/8
    activities: [
      {
        id: '48',
        title: 'Préparation poursuite',
        description: 'Derniers achats et vérifications avant Yunnan',
        destinationId: '13',
        startTime: '09:00',
        endTime: '14:00',
        category: 'preparation'
      },
      {
        id: '49',
        title: 'Détente finale',
        description: 'Moment de repos avant le départ',
        destinationId: '13',
        startTime: '15:00',
        endTime: '18:00',
        category: 'relaxation'
      }
    ],
    notes: 'Préparation finale à Chongqing.',
    order: 29,
    transportToNext: {
      type: 'bike',
      duration: '6h',
      distance: '350km',
      notes: 'Bikepacking vers Kunming'
    }
  },
  {
    date: '2024-10-27',
    destination: destinations[13], // Kunming - Jour 1/8
    activities: [
      {
        id: '50',
        title: 'Arrivée à Kunming',
        description: 'Installation dans la capitale du Yunnan',
        destinationId: '14',
        startTime: '16:00',
        endTime: '20:00',
        category: 'arrival'
      },
      {
        id: '51',
        title: 'Lac Dian',
        description: 'Balade au bord du plus grand lac du Yunnan',
        destinationId: '14',
        startTime: '17:00',
        endTime: '19:00',
        category: 'nature'
      }
    ],
    notes: 'Arrivée à Kunming, porte d\'entrée des ethnies minoritaires.',
    order: 30,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration Kunming'
    }
  },
  {
    date: '2024-10-28',
    destination: destinations[13], // Kunming - Jour 2/8
    activities: [
      {
        id: '52',
        title: 'Temple Yuantong',
        description: 'Visite du plus ancien temple de Kunming',
        destinationId: '14',
        startTime: '09:00',
        endTime: '12:00',
        category: 'cultural'
      },
      {
        id: '53',
        title: 'Marché aux fleurs',
        description: 'Découverte des traditions locales',
        destinationId: '14',
        startTime: '14:00',
        endTime: '16:00',
        category: 'cultural'
      }
    ],
    notes: 'Exploration culturelle de Kunming.',
    order: 31,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Suite exploration'
    }
  },
  {
    date: '2024-10-29',
    destination: destinations[13], // Kunming - Jour 3/8
    activities: [
      {
        id: '54',
        title: 'Villages ethniques',
        description: 'Visite des villages des minorités Dai et Yi',
        destinationId: '14',
        startTime: '08:00',
        endTime: '18:00',
        category: 'cultural'
      }
    ],
    notes: 'Immersion dans les cultures minoritaires du Yunnan.',
    order: 32,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Repos à Kunming'
    }
  },
  {
    date: '2024-10-30',
    destination: destinations[13], // Kunming - Jour 4/8
    activities: [
      {
        id: '55',
        title: 'Cuisine yunnanaise',
        description: 'Découverte des épices et spécialités locales',
        destinationId: '14',
        startTime: '11:00',
        endTime: '15:00',
        category: 'cultural'
      },
      {
        id: '56',
        title: 'Musée provincial',
        description: 'Histoire et cultures du Yunnan',
        destinationId: '14',
        startTime: '16:00',
        endTime: '18:00',
        category: 'museum'
      }
    ],
    notes: 'Découverte gastronomique et historique du Yunnan.',
    order: 33,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Préparation bikepacking'
    }
  },
  {
    date: '2024-10-31',
    destination: destinations[13], // Kunming - Jour 5/8
    activities: [
      {
        id: '57',
        title: 'Préparation montagnes',
        description: 'Achat de nourriture et préparation du bikepacking',
        destinationId: '14',
        startTime: '09:00',
        endTime: '15:00',
        category: 'preparation'
      }
    ],
    notes: 'Préparation du départ vers les montagnes du Yunnan.',
    order: 34,
    transportToNext: {
      type: 'bike',
      duration: '5h',
      distance: '150km',
      notes: 'Bikepacking dans les montagnes'
    }
  },
  {
    date: '2024-11-01',
    destination: destinations[14], // Montagnes du Yunnan - Jour 1/8
    activities: [
      {
        id: '58',
        title: 'Bikepacking montagnes',
        description: 'Traversée des premiers cols du Yunnan',
        destinationId: '15',
        startTime: '08:00',
        endTime: '17:00',
        category: 'bikepacking'
      }
    ],
    notes: 'Début du bikepacking dans les montagnes du Yunnan.',
    order: 35,
    transportToNext: {
      type: 'bike',
      duration: '6h',
      distance: '120km',
      notes: 'Suite dans les montagnes'
    }
  },
  {
    date: '2024-11-02',
    destination: destinations[14], // Montagnes du Yunnan - Jour 2/8
    activities: [
      {
        id: '59',
        title: 'Cols et vallées',
        description: 'Bikepacking intense dans les reliefs',
        destinationId: '15',
        startTime: '08:00',
        endTime: '16:00',
        category: 'bikepacking'
      }
    ],
    notes: 'Journée difficile dans les montagnes, paysages spectaculaires.',
    order: 36,
    transportToNext: {
      type: 'bike',
      duration: '5h',
      distance: '100km',
      notes: 'Suite bikepacking'
    }
  },
  {
    date: '2024-11-03',
    destination: destinations[14], // Montagnes du Yunnan - Jour 3/8
    activities: [
      {
        id: '60',
        title: 'Camping en altitude',
        description: 'Nuit en tente dans les montagnes',
        destinationId: '15',
        startTime: '09:00',
        endTime: '18:00',
        category: 'camping'
      }
    ],
    notes: 'Camping sauvage en haute altitude.',
    order: 37,
    transportToNext: {
      type: 'bike',
      duration: '6h',
      distance: '110km',
      notes: 'Continuité vers la frontière'
    }
  },
  {
    date: '2024-11-04',
    destination: destinations[14], // Montagnes du Yunnan - Jour 4/8
    activities: [
      {
        id: '61',
        title: 'Derniers cols',
        description: 'Traversée des derniers cols avant la descente',
        destinationId: '15',
        startTime: '08:00',
        endTime: '16:00',
        category: 'bikepacking'
      }
    ],
    notes: 'Derniers efforts en montagne.',
    order: 38,
    transportToNext: {
      type: 'bike',
      duration: '4h',
      distance: '80km',
      notes: 'Descente vers la rivière Rouge'
    }
  },
  {
    date: '2024-11-05',
    destination: destinations[15], // Vallée de la rivière Rouge - Jour 1/3
    activities: [
      {
        id: '62',
        title: 'Descente vers frontière',
        description: 'Bikepacking vers la rivière Rouge et la frontière',
        destinationId: '16',
        startTime: '08:00',
        endTime: '16:00',
        category: 'bikepacking'
      }
    ],
    notes: 'Approche de la frontière Vietnam via la vallée de la rivière Rouge.',
    order: 39,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Repos avant frontière'
    }
  },
  {
    date: '2024-11-06',
    destination: destinations[15], // Vallée de la rivière Rouge - Jour 2/3
    activities: [
      {
        id: '63',
        title: 'Observation nature',
        description: 'Découverte de la faune et flore locale',
        destinationId: '16',
        startTime: '09:00',
        endTime: '15:00',
        category: 'nature'
      },
      {
        id: '64',
        title: 'Préparation frontière',
        description: 'Vérification papiers et préparation sortie Chine',
        destinationId: '16',
        startTime: '16:00',
        endTime: '18:00',
        category: 'preparation'
      }
    ],
    notes: 'Derniers moments en Chine, préparation du passage frontière.',
    order: 40,
    transportToNext: {
      type: 'bike',
      duration: '3h',
      distance: '50km',
      notes: 'Dernière étape vers frontière'
    }
  },
  {
    date: '2024-11-07',
    destination: destinations[15], // Vallée de la rivière Rouge - Jour 3/3
    activities: [
      {
        id: '65',
        title: 'Approche finale frontière',
        description: 'Derniers kilomètres vers le poste frontière',
        destinationId: '16',
        startTime: '08:00',
        endTime: '12:00',
        category: 'travel'
      }
    ],
    notes: 'Approche finale de la frontière sino-vietnamienne.',
    order: 41,
    transportToNext: {
      type: 'walk',
      duration: '2h',
      distance: '5km',
      notes: 'Marche finale vers poste frontière'
    }
  },
  {
    date: '2024-11-08',
    destination: destinations[16], // Frontière Chine-Vietnam
    activities: [
      {
        id: '66',
        title: 'Passage frontière Vietnam',
        description: 'Formalités de sortie de Chine et entrée Vietnam',
        destinationId: '17',
        startTime: '09:00',
        endTime: '15:00',
        category: 'border'
      }
    ],
    notes: 'Fin du séjour de 30 jours en Chine (13 oct - 11 nov), passage au Vietnam. Total: 16 jours Kazakhstan + 30 jours Chine.',
    order: 42,
    transportToNext: {
      type: 'bike',
      duration: '3h',
      distance: '40km',
      notes: 'Début du vélo au Vietnam vers Hanoi'
    }
  },
  // === VIETNAM - Traversée rapide en vélo vers Saigon ===
  {
    date: '2024-11-09',
    destination: destinations[24], // Ho Chi Minh Ville (Saigon) - ARRIVÉE DIRECTE
    activities: [
      {
        id: '67',
        title: 'Arrivée Saigon',
        description: 'Installation dans la plus grande ville du Vietnam après traversée vélo express',
        destinationId: '25',
        startTime: '14:00',
        endTime: '17:00',
        category: 'arrival'
      },
      {
        id: '68',
        title: 'Ben Thanh Market',
        description: 'Découverte du marché historique et effervescence urbaine',
        destinationId: '25',
        startTime: '17:00',
        endTime: '19:00',
        category: 'cultural'
      }
    ],
    notes: 'ARRIVÉE À SAIGON LE 9 NOVEMBRE ! Traversée vélo Vietnam en 1 jour depuis la frontière.',
    order: 43,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration Saigon'
    }
  },
  {
    date: '2024-11-10',
    destination: destinations[24], // Saigon - Jour 2
    activities: [
      {
        id: '69',
        title: 'Palais de la Réunification',
        description: 'Visite du palais historique symbole de la fin de la guerre',
        destinationId: '25',
        startTime: '09:00',
        endTime: '12:00',
        category: 'sightseeing'
      },
      {
        id: '70',
        title: 'Cathédrale Notre-Dame',
        description: 'Architecture coloniale française au cœur de la ville',
        destinationId: '25',
        startTime: '14:00',
        endTime: '16:00',
        category: 'cultural'
      }
    ],
    notes: 'Découverte historique de Saigon.',
    order: 44,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Suite exploration'
    }
  },
  {
    date: '2024-11-11',
    destination: destinations[24], // Saigon - Jour 3
    activities: [
      {
        id: '71',
        title: 'Musée des Vestiges de la Guerre',
        description: 'Histoire récente du Vietnam, témoignages poignants',
        destinationId: '25',
        startTime: '09:00',
        endTime: '13:00',
        category: 'museum'
      },
      {
        id: '72',
        title: 'Cuisine saigonnaise',
        description: 'Cours de cuisine traditionnel vietnamien',
        destinationId: '25',
        startTime: '15:00',
        endTime: '18:00',
        category: 'cultural'
      }
    ],
    notes: 'Immersion culturelle et historique.',
    order: 45,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Détente Saigon'
    }
  },
  {
    date: '2024-11-12',
    destination: destinations[24], // Saigon - Jour 4
    activities: [
      {
        id: '73',
        title: 'Quartiers chinois Cholon',
        description: 'Exploration du quartier chinois historique',
        destinationId: '25',
        startTime: '09:00',
        endTime: '13:00',
        category: 'cultural'
      },
      {
        id: '74',
        title: 'Pagode Thien Hau',
        description: 'Temple chinois traditionnel dans Cholon',
        destinationId: '25',
        startTime: '14:00',
        endTime: '16:00',
        category: 'cultural'
      }
    ],
    notes: 'Découverte de l\'influence chinoise à Saigon.',
    order: 46,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration urbaine'
    }
  },
  {
    date: '2024-11-13',
    destination: destinations[24], // Saigon - Jour 5
    activities: [
      {
        id: '75',
        title: 'Parc Tao Dan',
        description: 'Détente dans le poumon vert de la ville',
        destinationId: '25',
        startTime: '08:00',
        endTime: '12:00',
        category: 'relaxation'
      },
      {
        id: '76',
        title: 'Café culture',
        description: 'Découverte de la culture café vietnamienne',
        destinationId: '25',
        startTime: '14:00',
        endTime: '17:00',
        category: 'cultural'
      }
    ],
    notes: 'Moment de détente et découverte locale.',
    order: 47,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Shopping et culture'
    }
  },
  {
    date: '2024-11-14',
    destination: destinations[24], // Saigon - Jour 6
    activities: [
      {
        id: '77',
        title: 'Shopping traditionnel',
        description: 'Marchés artisanaux et boutiques locales',
        destinationId: '25',
        startTime: '10:00',
        endTime: '14:00',
        category: 'shopping'
      },
      {
        id: '78',
        title: 'Soirée rooftop',
        description: 'Vue panoramique sur Saigon by night',
        destinationId: '25',
        startTime: '18:00',
        endTime: '21:00',
        category: 'relaxation'
      }
    ],
    notes: 'Shopping et vues nocturnes.',
    order: 48,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Activités culturelles'
    }
  },
  {
    date: '2024-11-15',
    destination: destinations[24], // Saigon - Jour 7
    activities: [
      {
        id: '79',
        title: 'Théâtre traditionnel',
        description: 'Spectacle de marionnettes sur l\'eau',
        destinationId: '25',
        startTime: '19:00',
        endTime: '21:00',
        category: 'cultural'
      },
      {
        id: '80',
        title: 'Street food tour',
        description: 'Dégustation des spécialités de rue',
        destinationId: '25',
        startTime: '17:00',
        endTime: '19:00',
        category: 'cultural'
      }
    ],
    notes: 'Arts traditionnels et gastronomie.',
    order: 49,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Détente et repos'
    }
  },
  {
    date: '2024-11-16',
    destination: destinations[24], // Saigon - Jour 8
    activities: [
      {
        id: '81',
        title: 'Jour de repos',
        description: 'Détente complète, spa traditionnel vietnamien',
        destinationId: '25',
        startTime: '10:00',
        endTime: '16:00',
        category: 'relaxation'
      }
    ],
    notes: 'Journée de récupération après les semaines de vélo.',
    order: 50,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Préparation poursuite'
    }
  },
  {
    date: '2024-11-17',
    destination: destinations[24], // Saigon - Jour 9
    activities: [
      {
        id: '82',
        title: 'Excursion Cu Chi',
        description: 'Visite des tunnels historiques de la guerre',
        destinationId: '25',
        startTime: '08:00',
        endTime: '16:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Excursion historique dans les environs.',
    order: 51,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration continue'
    }
  },
  {
    date: '2024-11-18',
    destination: destinations[24], // Saigon - Jour 10
    activities: [
      {
        id: '83',
        title: 'Musée Ho Chi Minh',
        description: 'Hommage au leader historique vietnamien',
        destinationId: '25',
        startTime: '09:00',
        endTime: '12:00',
        category: 'museum'
      },
      {
        id: '84',
        title: 'Art contemporain',
        description: 'Galerie d\'art moderne vietnamien',
        destinationId: '25',
        startTime: '14:00',
        endTime: '17:00',
        category: 'cultural'
      }
    ],
    notes: 'Culture historique et artistique.',
    order: 52,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Gastronomie'
    }
  },
  {
    date: '2024-11-19',
    destination: destinations[24], // Saigon - Jour 11
    activities: [
      {
        id: '85',
        title: 'Tour gastronomique',
        description: 'Découverte approfondie de la cuisine vietnamienne',
        destinationId: '25',
        startTime: '11:00',
        endTime: '15:00',
        category: 'cultural'
      },
      {
        id: '86',
        title: 'Cocktails rooftop',
        description: 'Apéritif avec vue sur la ville',
        destinationId: '25',
        startTime: '18:00',
        endTime: '20:00',
        category: 'relaxation'
      }
    ],
    notes: 'Focus sur la gastronomie locale.',
    order: 53,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Activités sociales'
    }
  },
  {
    date: '2024-11-20',
    destination: destinations[24], // Saigon - Jour 12
    activities: [
      {
        id: '87',
        title: 'Rencontres locales',
        description: 'Échange avec la population saigonnaise',
        destinationId: '25',
        startTime: '14:00',
        endTime: '18:00',
        category: 'cultural'
      }
    ],
    notes: 'Immersion sociale et culturelle.',
    order: 54,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Préparation départ'
    }
  },
  {
    date: '2024-11-21',
    destination: destinations[24], // Saigon - Jour 13
    activities: [
      {
        id: '88',
        title: 'Shopping dernière minute',
        description: 'Achats souvenirs et préparatifs pour la Chine',
        destinationId: '25',
        startTime: '10:00',
        endTime: '15:00',
        category: 'shopping'
      }
    ],
    notes: 'Préparation du départ vers la Chine.',
    order: 55,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Derniers jours'
    }
  },
  {
    date: '2024-11-22',
    destination: destinations[24], // Saigon - Jour 14
    activities: [
      {
        id: '89',
        title: 'Massage traditionnel',
        description: 'Détente ultime avant le départ',
        destinationId: '25',
        startTime: '10:00',
        endTime: '12:00',
        category: 'relaxation'
      },
      {
        id: '90',
        title: 'Dernière soirée',
        description: 'Soirée d\'adieu à Saigon',
        destinationId: '25',
        startTime: '19:00',
        endTime: '22:00',
        category: 'relaxation'
      }
    ],
    notes: 'Détente et célébration de fin de séjour.',
    order: 56,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Préparation finale'
    }
  },
  {
    date: '2024-11-23',
    destination: destinations[24], // Saigon - Jour 15
    activities: [
      {
        id: '91',
        title: 'Vérifications finales',
        description: 'Préparation des bagages et visas Chine',
        destinationId: '25',
        startTime: '09:00',
        endTime: '14:00',
        category: 'preparation'
      }
    ],
    notes: 'Préparatifs logistiques pour la Chine.',
    order: 57,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Dernière journée'
    }
  },
  {
    date: '2024-11-24',
    destination: destinations[24], // Saigon - Jour 16
    activities: [
      {
        id: '92',
        title: 'Balade d\'adieu',
        description: 'Dernière promenade dans les rues de Saigon',
        destinationId: '25',
        startTime: '10:00',
        endTime: '16:00',
        category: 'relaxation'
      }
    ],
    notes: 'Derniers moments à Saigon.',
    order: 58,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Dernière nuit'
    }
  },
  {
    date: '2024-11-25',
    destination: destinations[24], // Saigon - Jour 17 - DÉPART
    activities: [
      {
        id: '93',
        title: 'Départ vers la Chine',
        description: 'Préparation du voyage vers Shenzhen',
        destinationId: '25',
        startTime: '08:00',
        endTime: '12:00',
        category: 'travel'
      }
    ],
    notes: 'FIN DU SÉJOUR À SAIGON (9-25 novembre). Départ vers la Chine côtière.',
    order: 59,
    transportToNext: {
      type: 'plane',
      duration: '2h 30m',
      distance: '1800km',
      notes: 'Vol Saigon-Shenzhen, début des 30 jours Chine côtière'
    }
  },
  // === CHINE CÔTIÈRE - 30 jours (26 nov - 25 déc) ===
  {
    date: '2024-11-26',
    destination: destinations[25], // Shenzhen - Jour 1/5
    activities: [
      {
        id: '94',
        title: 'Arrivée Shenzhen',
        description: 'Installation dans la Silicon Valley chinoise',
        destinationId: '26',
        startTime: '14:00',
        endTime: '18:00',
        category: 'arrival'
      },
      {
        id: '95',
        title: 'Parc Lianhua Shan',
        description: 'Randonnée dans le plus haut point de Shenzhen',
        destinationId: '26',
        startTime: '16:00',
        endTime: '19:00',
        category: 'nature'
      }
    ],
    notes: 'Arrivée à Shenzhen, ville high-tech frontalière de Hong Kong.',
    order: 60,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration Shenzhen'
    }
  },
  {
    date: '2024-11-27',
    destination: destinations[25], // Shenzhen - Jour 2/5
    activities: [
      {
        id: '96',
        title: 'District de Futian',
        description: 'Exploration du quartier d\'affaires moderne',
        destinationId: '26',
        startTime: '09:00',
        endTime: '13:00',
        category: 'sightseeing'
      },
      {
        id: '97',
        title: 'Musée de Shenzhen',
        description: 'Histoire et culture de la ville',
        destinationId: '26',
        startTime: '14:00',
        endTime: '17:00',
        category: 'museum'
      }
    ],
    notes: 'Découverte de l\'architecture moderne de Shenzhen.',
    order: 61,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Tech et innovation'
    }
  },
  {
    date: '2024-11-28',
    destination: destinations[25], // Shenzhen - Jour 3/5
    activities: [
      {
        id: '98',
        title: 'Université Tsinghua',
        description: 'Visite du campus d\'excellence technologique',
        destinationId: '26',
        startTime: '10:00',
        endTime: '13:00',
        category: 'cultural'
      },
      {
        id: '99',
        title: 'Innovation Valley',
        description: 'Découverte des startups et entreprises tech',
        destinationId: '26',
        startTime: '14:00',
        endTime: '18:00',
        category: 'cultural'
      }
    ],
    notes: 'Immersion dans l\'écosystème technologique de Shenzhen.',
    order: 62,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Préparation Guangzhou'
    }
  },
  {
    date: '2024-11-29',
    destination: destinations[25], // Shenzhen - Jour 4/5
    activities: [
      {
        id: '100',
        title: 'Shopping tech',
        description: 'Achat d\'équipement électronique et gadgets',
        destinationId: '26',
        startTime: '10:00',
        endTime: '15:00',
        category: 'shopping'
      },
      {
        id: '101',
        title: 'Cuisine cantonaise moderne',
        description: 'Dégustation de spécialités locales',
        destinationId: '26',
        startTime: '18:00',
        endTime: '21:00',
        category: 'cultural'
      }
    ],
    notes: 'Shopping technologique et découverte culinaire.',
    order: 63,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Dernier jour Shenzhen'
    }
  },
  {
    date: '2024-11-30',
    destination: destinations[25], // Shenzhen - Jour 5/5
    activities: [
      {
        id: '102',
        title: 'Parc des sculptures',
        description: 'Art urbain et installations modernes',
        destinationId: '26',
        startTime: '09:00',
        endTime: '12:00',
        category: 'cultural'
      },
      {
        id: '103',
        title: 'Préparation départ',
        description: 'Derniers achats et préparatifs pour Guangzhou',
        destinationId: '26',
        startTime: '14:00',
        endTime: '17:00',
        category: 'preparation'
      }
    ],
    notes: 'Dernière journée à Shenzhen avant Guangzhou.',
    order: 64,
    transportToNext: {
      type: 'train',
      duration: '1h',
      distance: '140km',
      notes: 'Train Shenzhen-Guangzhou'
    }
  },
  {
    date: '2024-12-01',
    destination: destinations[26], // Guangzhou - Jour 1/5
    activities: [
      {
        id: '104',
        title: 'Arrivée Guangzhou',
        description: 'Installation dans la capitale économique du Guangdong',
        destinationId: '27',
        startTime: '10:00',
        endTime: '14:00',
        category: 'arrival'
      },
      {
        id: '105',
        title: 'Île Shamian',
        description: 'Quartier historique colonial européen',
        destinationId: '27',
        startTime: '15:00',
        endTime: '18:00',
        category: 'cultural'
      }
    ],
    notes: 'Arrivée à Guangzhou, cœur économique du sud de la Chine.',
    order: 65,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration Guangzhou'
    }
  },
  {
    date: '2024-12-02',
    destination: destinations[26], // Guangzhou - Jour 2/5
    activities: [
      {
        id: '106',
        title: 'Temple des Six Banians',
        description: 'Temple bouddhique historique avec pagode',
        destinationId: '27',
        startTime: '09:00',
        endTime: '12:00',
        category: 'cultural'
      },
      {
        id: '107',
        title: 'Musée provincial',
        description: 'Art et histoire du Guangdong',
        destinationId: '27',
        startTime: '14:00',
        endTime: '17:00',
        category: 'museum'
      }
    ],
    notes: 'Découverte du patrimoine historique de Guangzhou.',
    order: 66,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Culture et gastronomie'
    }
  },
  {
    date: '2024-12-03',
    destination: destinations[26], // Guangzhou - Jour 3/5
    activities: [
      {
        id: '108',
        title: 'Cuisine cantonaise',
        description: 'Découverte approfondie de la gastronomie locale',
        destinationId: '27',
        startTime: '11:00',
        endTime: '15:00',
        category: 'cultural'
      },
      {
        id: '109',
        title: 'Parc Yuexiu',
        description: 'Plus grand parc urbain de Guangzhou',
        destinationId: '27',
        startTime: '16:00',
        endTime: '19:00',
        category: 'relaxation'
      }
    ],
    notes: 'Immersion culinaire et détente urbaine.',
    order: 67,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Modernité et commerce'
    }
  },
  {
    date: '2024-12-04',
    destination: destinations[26], // Guangzhou - Jour 4/5
    activities: [
      {
        id: '110',
        title: 'Canton Tower',
        description: 'Vue panoramique depuis la tour de télévision',
        destinationId: '27',
        startTime: '14:00',
        endTime: '17:00',
        category: 'sightseeing'
      },
      {
        id: '111',
        title: 'Quartier Tianhe',
        description: 'Centre moderne et quartier d\'affaires',
        destinationId: '27',
        startTime: '18:00',
        endTime: '21:00',
        category: 'cultural'
      }
    ],
    notes: 'Vue moderne sur Guangzhou.',
    order: 68,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Préparation Xiamen'
    }
  },
  {
    date: '2024-12-05',
    destination: destinations[26], // Guangzhou - Jour 5/5
    activities: [
      {
        id: '112',
        title: 'Marché aux fleurs',
        description: 'Découverte du commerce traditionnel floral',
        destinationId: '27',
        startTime: '08:00',
        endTime: '12:00',
        category: 'cultural'
      },
      {
        id: '113',
        title: 'Préparation départ',
        description: 'Préparatifs pour Xiamen',
        destinationId: '27',
        startTime: '14:00',
        endTime: '17:00',
        category: 'preparation'
      }
    ],
    notes: 'Dernière journée à Guangzhou.',
    order: 69,
    transportToNext: {
      type: 'train',
      duration: '4h',
      distance: '720km',
      notes: 'Train Guangzhou-Xiamen'
    }
  },
  {
    date: '2024-12-06',
    destination: destinations[27], // Xiamen - Jour 1/5
    activities: [
      {
        id: '114',
        title: 'Arrivée Xiamen',
        description: 'Installation dans le port historique du Fujian',
        destinationId: '28',
        startTime: '14:00',
        endTime: '18:00',
        category: 'arrival'
      },
      {
        id: '115',
        title: 'Île Gulangyu',
        description: 'Île-musée classée UNESCO',
        destinationId: '28',
        startTime: '16:00',
        endTime: '19:00',
        category: 'cultural'
      }
    ],
    notes: 'Arrivée à Xiamen, perle de la côte sud-est.',
    order: 70,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration Xiamen'
    }
  },
  {
    date: '2024-12-07',
    destination: destinations[27], // Xiamen - Jour 2/5
    activities: [
      {
        id: '116',
        title: 'Temple Nanputuo',
        description: 'Temple bouddhique avec jardins zen',
        destinationId: '28',
        startTime: '09:00',
        endTime: '12:00',
        category: 'cultural'
      },
      {
        id: '117',
        title: 'Université Xiamen',
        description: 'Campus historique avec architecture coloniale',
        destinationId: '28',
        startTime: '14:00',
        endTime: '17:00',
        category: 'cultural'
      }
    ],
    notes: 'Découverte culturelle de Xiamen.',
    order: 71,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Nature et détente'
    }
  },
  {
    date: '2024-12-08',
    destination: destinations[27], // Xiamen - Jour 3/5
    activities: [
      {
        id: '118',
        title: 'Plage de Xiamen',
        description: 'Détente sur les plages urbaines',
        destinationId: '28',
        startTime: '10:00',
        endTime: '16:00',
        category: 'relaxation'
      }
    ],
    notes: 'Journée de détente balnéaire.',
    order: 72,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Préparation Hangzhou'
    }
  },
  {
    date: '2024-12-09',
    destination: destinations[27], // Xiamen - Jour 4/5
    activities: [
      {
        id: '119',
        title: 'Musée de Xiamen',
        description: 'Histoire maritime et coloniale',
        destinationId: '28',
        startTime: '09:00',
        endTime: '12:00',
        category: 'museum'
      },
      {
        id: '120',
        title: 'Cuisine du Fujian',
        description: 'Spécialités locales et fruits de mer',
        destinationId: '28',
        startTime: '18:00',
        endTime: '21:00',
        category: 'cultural'
      }
    ],
    notes: 'Immersion historique et culinaire.',
    order: 73,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Dernier jour Xiamen'
    }
  },
  {
    date: '2024-12-10',
    destination: destinations[27], // Xiamen - Jour 5/5
    activities: [
      {
        id: '121',
        title: 'Préparation départ',
        description: 'Préparatifs pour Hangzhou',
        destinationId: '28',
        startTime: '09:00',
        endTime: '14:00',
        category: 'preparation'
      }
    ],
    notes: 'Dernière journée à Xiamen.',
    order: 74,
    transportToNext: {
      type: 'train',
      duration: '6h',
      distance: '950km',
      notes: 'Train Xiamen-Hangzhou'
    }
  },
  {
    date: '2024-12-11',
    destination: destinations[28], // Hangzhou - Jour 1/5
    activities: [
      {
        id: '122',
        title: 'Arrivée Hangzhou',
        description: 'Installation dans la capitale du Zhejiang',
        destinationId: '29',
        startTime: '16:00',
        endTime: '20:00',
        category: 'arrival'
      },
      {
        id: '123',
        title: 'Lac de l\'Ouest',
        description: 'Premier aperçu du lac mythique',
        destinationId: '29',
        startTime: '18:00',
        endTime: '21:00',
        category: 'nature'
      }
    ],
    notes: 'Arrivée à Hangzhou, paradis des poètes chinois.',
    order: 75,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration Hangzhou'
    }
  },
  {
    date: '2024-12-12',
    destination: destinations[28], // Hangzhou - Jour 2/5
    activities: [
      {
        id: '124',
        title: 'Pagode Leifeng',
        description: 'Vue panoramique sur le lac de l\'Ouest',
        destinationId: '29',
        startTime: '09:00',
        endTime: '12:00',
        category: 'sightseeing'
      },
      {
        id: '125',
        title: 'Temple Lingyin',
        description: 'Temple bouddhique avec statues géantes',
        destinationId: '29',
        startTime: '14:00',
        endTime: '17:00',
        category: 'cultural'
      }
    ],
    notes: 'Découverte des temples et vues sur le lac.',
    order: 76,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Culture et thé'
    }
  },
  {
    date: '2024-12-13',
    destination: destinations[28], // Hangzhou - Jour 3/5
    activities: [
      {
        id: '126',
        title: 'Thé Longjing',
        description: 'Visite des plantations de thé célèbres',
        destinationId: '29',
        startTime: '09:00',
        endTime: '15:00',
        category: 'cultural'
      }
    ],
    notes: 'Immersion dans la culture du thé.',
    order: 77,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Préparation Shanghai'
    }
  },
  {
    date: '2024-12-14',
    destination: destinations[28], // Hangzhou - Jour 4/5
    activities: [
      {
        id: '127',
        title: 'Jardin botanique',
        description: 'Balade dans les jardins du lac',
        destinationId: '29',
        startTime: '10:00',
        endTime: '16:00',
        category: 'nature'
      }
    ],
    notes: 'Détente dans la nature.',
    order: 78,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Dernier jour Hangzhou'
    }
  },
  {
    date: '2024-12-15',
    destination: destinations[28], // Hangzhou - Jour 5/5
    activities: [
      {
        id: '128',
        title: 'Préparation départ',
        description: 'Préparatifs pour Shanghai',
        destinationId: '29',
        startTime: '09:00',
        endTime: '14:00',
        category: 'preparation'
      }
    ],
    notes: 'Dernière journée à Hangzhou.',
    order: 79,
    transportToNext: {
      type: 'train',
      duration: '1h',
      distance: '200km',
      notes: 'Train Hangzhou-Shanghai'
    }
  },
  {
    date: '2024-12-16',
    destination: destinations[29], // Shanghai - Jour 1/5
    activities: [
      {
        id: '129',
        title: 'Arrivée Shanghai',
        description: 'Installation dans la mégapole moderne',
        destinationId: '30',
        startTime: '10:00',
        endTime: '14:00',
        category: 'arrival'
      },
      {
        id: '130',
        title: 'Bund',
        description: 'Promenade sur le front de mer historique',
        destinationId: '30',
        startTime: '15:00',
        endTime: '18:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Arrivée à Shanghai, New York de l\'Orient.',
    order: 80,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration Shanghai'
    }
  },
  {
    date: '2024-12-17',
    destination: destinations[29], // Shanghai - Jour 2/5
    activities: [
      {
        id: '131',
        title: 'Tour Perle de l\'Orient',
        description: 'Vue panoramique sur Shanghai',
        destinationId: '30',
        startTime: '10:00',
        endTime: '13:00',
        category: 'sightseeing'
      },
      {
        id: '132',
        title: 'Jardin Yu',
        description: 'Jardin classique chinois au cœur de la ville',
        destinationId: '30',
        startTime: '14:00',
        endTime: '17:00',
        category: 'cultural'
      }
    ],
    notes: 'Contrastes modernes et traditionnels.',
    order: 81,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Art et culture'
    }
  },
  {
    date: '2024-12-18',
    destination: destinations[29], // Shanghai - Jour 3/5
    activities: [
      {
        id: '133',
        title: 'Musée de Shanghai',
        description: 'Histoire et culture de la ville',
        destinationId: '30',
        startTime: '09:00',
        endTime: '13:00',
        category: 'museum'
      },
      {
        id: '134',
        title: 'Cuisine shanghaienne',
        description: 'Découverte des dim sum et spécialités locales',
        destinationId: '30',
        startTime: '18:00',
        endTime: '21:00',
        category: 'cultural'
      }
    ],
    notes: 'Immersion culturelle et culinaire.',
    order: 82,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Préparation Nanjing'
    }
  },
  {
    date: '2024-12-19',
    destination: destinations[29], // Shanghai - Jour 4/5
    activities: [
      {
        id: '135',
        title: 'Temple du Bouddha de Jade',
        description: 'Temple bouddhique avec statues précieuses',
        destinationId: '30',
        startTime: '09:00',
        endTime: '12:00',
        category: 'cultural'
      },
      {
        id: '136',
        title: 'Shopping Nanjing Road',
        description: 'Artère commerciale historique',
        destinationId: '30',
        startTime: '14:00',
        endTime: '18:00',
        category: 'shopping'
      }
    ],
    notes: 'Spiritualité et commerce moderne.',
    order: 83,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Dernier jour Shanghai'
    }
  },
  {
    date: '2024-12-20',
    destination: destinations[29], // Shanghai - Jour 5/5
    activities: [
      {
        id: '137',
        title: 'Préparation départ',
        description: 'Préparatifs pour Nanjing',
        destinationId: '30',
        startTime: '09:00',
        endTime: '14:00',
        category: 'preparation'
      }
    ],
    notes: 'Dernière journée à Shanghai.',
    order: 84,
    transportToNext: {
      type: 'train',
      duration: '1h 30m',
      distance: '300km',
      notes: 'Train Shanghai-Nanjing'
    }
  },
  {
    date: '2024-12-21',
    destination: destinations[30], // Nanjing - Jour 1/3
    activities: [
      {
        id: '138',
        title: 'Arrivée Nanjing',
        description: 'Installation dans l\'ancienne capitale impériale',
        destinationId: '31',
        startTime: '11:00',
        endTime: '15:00',
        category: 'arrival'
      },
      {
        id: '139',
        title: 'Muraille Ming',
        description: 'Vestiges de la muraille historique',
        destinationId: '31',
        startTime: '16:00',
        endTime: '18:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Arrivée à Nanjing, ancienne capitale historique.',
    order: 85,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration Nanjing'
    }
  },
  {
    date: '2024-12-22',
    destination: destinations[30], // Nanjing - Jour 2/3
    activities: [
      {
        id: '140',
        title: 'Mausolée Sun Yat-sen',
        description: 'Hommage au père de la Chine moderne',
        destinationId: '31',
        startTime: '09:00',
        endTime: '12:00',
        category: 'cultural'
      },
      {
        id: '141',
        title: 'Temple Confucius',
        description: 'Temple dédié au philosophe',
        destinationId: '31',
        startTime: '14:00',
        endTime: '16:00',
        category: 'cultural'
      }
    ],
    notes: 'Histoire moderne et philosophie ancienne.',
    order: 86,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Préparation Qingdao'
    }
  },
  {
    date: '2024-12-23',
    destination: destinations[30], // Nanjing - Jour 3/3
    activities: [
      {
        id: '142',
        title: 'Préparation départ',
        description: 'Préparatifs pour Qingdao',
        destinationId: '31',
        startTime: '09:00',
        endTime: '14:00',
        category: 'preparation'
      }
    ],
    notes: 'Dernière journée à Nanjing.',
    order: 87,
    transportToNext: {
      type: 'train',
      duration: '5h',
      distance: '850km',
      notes: 'Train Nanjing-Qingdao'
    }
  },
  {
    date: '2024-12-24',
    destination: destinations[31], // Qingdao - Jour 1/3
    activities: [
      {
        id: '143',
        title: 'Arrivée Qingdao',
        description: 'Installation dans le port allemand',
        destinationId: '32',
        startTime: '14:00',
        endTime: '18:00',
        category: 'arrival'
      },
      {
        id: '144',
        title: 'Architecture allemande',
        description: 'Promenade dans les quartiers coloniaux',
        destinationId: '32',
        startTime: '16:00',
        endTime: '19:00',
        category: 'cultural'
      }
    ],
    notes: 'Arrivée à Qingdao, ville au charme européen.',
    order: 88,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration Qingdao'
    }
  },
  {
    date: '2024-12-25',
    destination: destinations[31], // Qingdao - Jour 2/3
    activities: [
      {
        id: '145',
        title: 'Bière Tsingtao',
        description: 'Visite de la brasserie historique',
        destinationId: '32',
        startTime: '10:00',
        endTime: '14:00',
        category: 'cultural'
      },
      {
        id: '146',
        title: 'Mont Lao',
        description: 'Randonnée dans la montagne sacrée',
        destinationId: '32',
        startTime: '15:00',
        endTime: '18:00',
        category: 'nature'
      }
    ],
    notes: 'Culture brassicole et nature.',
    order: 89,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Préparation Tianjin'
    }
  },
  {
    date: '2024-12-26',
    destination: destinations[31], // Qingdao - Jour 3/3
    activities: [
      {
        id: '147',
        title: 'Préparation départ',
        description: 'Préparatifs pour Tianjin',
        destinationId: '32',
        startTime: '09:00',
        endTime: '14:00',
        category: 'preparation'
      }
    ],
    notes: 'Dernière journée à Qingdao.',
    order: 90,
    transportToNext: {
      type: 'train',
      duration: '3h',
      distance: '550km',
      notes: 'Train Qingdao-Tianjin'
    }
  },
  {
    date: '2024-12-27',
    destination: destinations[32], // Tianjin - Jour 1/3
    activities: [
      {
        id: '148',
        title: 'Arrivée Tianjin',
        description: 'Installation dans le grand port du nord',
        destinationId: '33',
        startTime: '12:00',
        endTime: '16:00',
        category: 'arrival'
      },
      {
        id: '149',
        title: 'Concessions étrangères',
        description: 'Quartiers historiques européens',
        destinationId: '33',
        startTime: '17:00',
        endTime: '19:00',
        category: 'cultural'
      }
    ],
    notes: 'Arrivée à Tianjin, porte d\'entrée vers Pékin.',
    order: 91,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration Tianjin'
    }
  },
  {
    date: '2024-12-28',
    destination: destinations[32], // Tianjin - Jour 2/3
    activities: [
      {
        id: '150',
        title: 'Tour de télévision',
        description: 'Vue panoramique sur la ville',
        destinationId: '33',
        startTime: '10:00',
        endTime: '13:00',
        category: 'sightseeing'
      },
      {
        id: '151',
        title: 'Musée des Arts',
        description: 'Collection d\'art chinois et international',
        destinationId: '33',
        startTime: '14:00',
        endTime: '17:00',
        category: 'museum'
      }
    ],
    notes: 'Vue moderne et culture artistique.',
    order: 92,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Préparation Dalian'
    }
  },
  {
    date: '2024-12-29',
    destination: destinations[32], // Tianjin - Jour 3/3
    activities: [
      {
        id: '152',
        title: 'Préparation départ',
        description: 'Préparatifs pour Dalian',
        destinationId: '33',
        startTime: '09:00',
        endTime: '14:00',
        category: 'preparation'
      }
    ],
    notes: 'Dernière journée à Tianjin.',
    order: 93,
    transportToNext: {
      type: 'train',
      duration: '2h',
      distance: '350km',
      notes: 'Train Tianjin-Dalian'
    }
  },
  {
    date: '2024-12-30',
    destination: destinations[33], // Dalian - Jour 1/3
    activities: [
      {
        id: '153',
        title: 'Arrivée Dalian',
        description: 'Installation dans le port moderne du nord-est',
        destinationId: '34',
        startTime: '11:00',
        endTime: '15:00',
        category: 'arrival'
      },
      {
        id: '154',
        title: 'Promenade sur le front de mer',
        description: 'Balade le long de la mer Jaune',
        destinationId: '34',
        startTime: '16:00',
        endTime: '18:00',
        category: 'relaxation'
      }
    ],
    notes: 'Arrivée à Dalian, ville côtière moderne.',
    order: 94,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration Dalian'
    }
  },
  {
    date: '2024-12-31',
    destination: destinations[33], // Dalian - Jour 2/3
    activities: [
      {
        id: '155',
        title: 'Parc Zhongshan',
        description: 'Jardin historique avec vue sur mer',
        destinationId: '34',
        startTime: '09:00',
        endTime: '13:00',
        category: 'nature'
      },
      {
        id: '156',
        title: 'Réveillon du Nouvel An',
        description: 'Célébration du passage à 2025',
        destinationId: '34',
        startTime: '20:00',
        endTime: '24:00',
        category: 'cultural'
      }
    ],
    notes: 'Nature et célébration du Nouvel An.',
    order: 95,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Préparation ferry Corée'
    }
  },
  {
    date: '2025-01-01',
    destination: destinations[33], // Dalian - Jour 3/3
    activities: [
      {
        id: '157',
        title: 'Préparation ferry',
        description: 'Préparatifs pour la traversée vers la Corée',
        destinationId: '34',
        startTime: '09:00',
        endTime: '14:00',
        category: 'preparation'
      }
    ],
    notes: 'Dernière journée en Chine, préparation du départ.',
    order: 96,
    transportToNext: {
      type: 'train',
      duration: '1h',
      distance: '80km',
      notes: 'Train Dalian-Port Tianjin'
    }
  },
  // === FERRY VERS CORÉE DU SUD ===
  {
    date: '2025-01-02',
    destination: destinations[34], // Port Tianjin
    activities: [
      {
        id: '158',
        title: 'Arrivée au port',
        description: 'Installation au port de Tianjin pour le ferry',
        destinationId: '35',
        startTime: '15:00',
        endTime: '18:00',
        category: 'travel'
      },
      {
        id: '159',
        title: 'Formalités départ Chine',
        description: 'Douane et immigration chinoise',
        destinationId: '35',
        startTime: '19:00',
        endTime: '21:00',
        category: 'travel'
      }
    ],
    notes: 'Préparation du ferry Tianjin-Incheon (16h de traversée).',
    order: 97,
    transportToNext: {
      type: 'boat',
      duration: '16h',
      distance: '450km',
      notes: 'Ferry Tianjin-Incheon'
    }
  },
  {
    date: '2025-01-03',
    destination: destinations[35], // Ferry Tianjin-Incheon
    activities: [
      {
        id: '160',
        title: 'Traversée en ferry',
        description: 'Navigation sur la mer Jaune vers la Corée du Sud',
        destinationId: '35',
        startTime: '08:00',
        endTime: '24:00',
        category: 'travel'
      }
    ],
    notes: 'Traversée maritime de 16h vers la Corée du Sud.',
    order: 98,
    transportToNext: {
      type: 'walk',
      duration: '30m',
      distance: '1km',
      notes: 'Marche vers arrivée Incheon'
    }
  },
  // === CORÉE DU SUD ===
  {
    date: '2025-01-04',
    destination: destinations[36], // Incheon
    activities: [
      {
        id: '161',
        title: 'Arrivée Incheon',
        description: 'Installation dans la ville portuaire sud-coréenne',
        destinationId: '36',
        startTime: '08:00',
        endTime: '12:00',
        category: 'arrival'
      },
      {
        id: '162',
        title: 'Formalités arrivée Corée',
        description: 'Douane et immigration sud-coréenne',
        destinationId: '36',
        startTime: '12:00',
        endTime: '15:00',
        category: 'travel'
      },
      {
        id: '163',
        title: 'Découverte Incheon',
        description: 'Première impression de la Corée moderne',
        destinationId: '36',
        startTime: '16:00',
        endTime: '18:00',
        category: 'cultural'
      }
    ],
    notes: 'ARRIVÉE EN CORÉE DU SUD ! Après plus de 600 jours de voyage.',
    order: 99,
    transportToNext: {
      type: 'train',
      duration: '1h',
      distance: '30km',
      notes: 'Train Incheon-Séoul'
    }
  },
  {
    date: '2025-01-05',
    destination: destinations[36], // Séoul
    activities: [
      {
        id: '164',
        title: 'Arrivée Séoul',
        description: 'Installation dans la capitale sud-coréenne',
        destinationId: '37',
        startTime: '10:00',
        endTime: '14:00',
        category: 'arrival'
      },
      {
        id: '165',
        title: 'Palais Gyeongbokgung',
        description: 'Visite du palais royal historique',
        destinationId: '37',
        startTime: '15:00',
        endTime: '18:00',
        category: 'cultural'
      }
    ],
    notes: 'Début de l\'exploration de Séoul, fin du voyage épique Marseille-Tokyo.',
    order: 100,
    transportToNext: {
      type: 'plane',
      duration: '3h',
      distance: '1200km',
      notes: 'Vol Séoul-Tokyo (à planifier)'
    }
  }
];

export const itinerary: Itinerary = {
  id: '1',
  title: 'Eva & David Marseille à Tokyo à vélo',
  description: 'Voyage épique de Marseille à Tokyo à vélo : traversée de l\'Europe, Asie Centrale, Chine et Corée du Sud',
  startDate: '2024-09-24',
  endDate: '2025-01-05',
  destinations: destinations,
  days: dayItineraries,
  totalBudget: 5200,
  currency: 'EUR',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
