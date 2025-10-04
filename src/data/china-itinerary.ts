import { destinations } from './destinations';

const getDestination = (id: string) => {
  const destination = destinations.find((item) => item.id === id);
  if (!destination) {
    throw new Error(`Destination ${id} not found in destinations dataset`);
  }
  return destination;
};

export const chinaDayItineraries = [
  // === CHINE - 3 semaines du Xinjiang au Vietnam ===
  {
    date: '2025-10-29',
    destination: getDestination('17'), // Ürümqi
    activities: [
      {
        id: 'cn-01',
        title: 'Arrivée à Ürümqi',
        description: 'Installation dans la capitale du Xinjiang après Khorgos',
        destinationId: '17',
        startTime: '11:00',
        endTime: '13:00',
        category: 'arrival'
      },
      {
        id: 'cn-02',
        title: 'Bazar d’Erdaoqiao',
        description: 'Immersion dans les étals ouïghours et dégustation de brochettes',
        destinationId: '17',
        startTime: '16:00',
        endTime: '19:00',
        category: 'cultural'
      }
    ],
    notes: 'Premier pas en Chine continentale, acclimatation après la steppe kazakhe.',
    order: 37,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Découverte d’Ürümqi avant le train vers Chengdu'
    }
  },
  {
    date: '2025-10-30',
    destination: getDestination('17'), // Ürümqi
    activities: [
      {
        id: 'cn-03',
        title: 'Musée du Xinjiang',
        description: 'Collection sur les routes de la soie et les cultures ouïghoures',
        destinationId: '17',
        startTime: '10:00',
        endTime: '12:30',
        category: 'museum'
      },
      {
        id: 'cn-04',
        title: 'Préparation du train pour Chengdu',
        description: 'Courses de nourriture, sécurisation des vélos et billets couchettes',
        destinationId: '17',
        startTime: '15:00',
        endTime: '17:00',
        category: 'preparation'
      }
    ],
    notes: 'Journée logistique pour embarquer sur le train transchina vers le Sichuan.',
    order: 38,
    transportToNext: {
      type: 'train',
      duration: '36h',
      distance: '3000km',
      notes: 'Train couchette Ürümqi → Chengdu, vélos en wagon cargo'
    }
  },
  {
    date: '2025-10-31',
    destination: getDestination('17'), // Train Ürümqi → Chengdu (jour 1)
    activities: [
      {
        id: 'cn-05',
        title: 'Train transchina – désert du Gobi',
        description: 'Observation du Gobi et des contreforts du plateau tibétain depuis le train',
        destinationId: '17',
        startTime: '08:00',
        endTime: '22:00',
        category: 'travel'
      }
    ],
    notes: 'Premier jour de train : paysages désertiques et longues haltes ferroviaires.',
    order: 39,
    transportToNext: {
      type: 'train',
      duration: '18h',
      distance: '1500km',
      notes: 'Poursuite du train de nuit vers Chengdu'
    }
  },
  {
    date: '2025-11-01',
    destination: getDestination('18'), // Chengdu
    activities: [
      {
        id: 'cn-06',
        title: 'Arrivée à Chengdu',
        description: 'Installation dans le quartier de Kuanzhai Xiangzi',
        destinationId: '18',
        startTime: '14:00',
        endTime: '16:00',
        category: 'arrival'
      },
      {
        id: 'cn-07',
        title: 'Dégustation de hotpot',
        description: 'Première immersion dans la gastronomie sichuanaise',
        destinationId: '18',
        startTime: '19:00',
        endTime: '21:00',
        category: 'cultural'
      }
    ],
    notes: 'Fin du trajet ferroviaire, récupération des vélos et installation au Sichuan.',
    order: 40,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Découverte de Chengdu'
    }
  },
  {
    date: '2025-11-02',
    destination: getDestination('18'), // Chengdu
    activities: [
      {
        id: 'cn-08',
        title: 'Centre de recherche des pandas géants',
        description: 'Visite matinale du sanctuaire des pandas',
        destinationId: '18',
        startTime: '08:30',
        endTime: '11:00',
        category: 'nature'
      },
      {
        id: 'cn-09',
        title: 'Quartier moderne de Taikoo Li',
        description: 'Balade dans l’architecture contemporaine et salons de thé',
        destinationId: '18',
        startTime: '15:00',
        endTime: '17:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Journée culturelle avant de reprendre les vélos vers le sud.',
    order: 41,
    transportToNext: {
      type: 'bike',
      duration: '2j',
      distance: '170km',
      notes: 'Bikepacking Chengdu → Leshan (plaine du Sichuan)'
    }
  },
  {
    date: '2025-11-03',
    destination: getDestination('24'), // Leshan
    activities: [
      {
        id: 'cn-10',
        title: 'Bikepacking Chengdu → Leshan',
        description: 'Sortie de Chengdu par pistes de digue et rizières',
        destinationId: '24',
        startTime: '07:00',
        endTime: '16:00',
        category: 'nature'
      },
      {
        id: 'cn-11',
        title: 'Grand Bouddha de Leshan',
        description: 'Visite au crépuscule du colosse sculpté dans la falaise',
        destinationId: '24',
        startTime: '17:00',
        endTime: '19:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Première étape vélo dans la plaine du Sichuan, arrivée face au Bouddha géant.',
    order: 42,
    bikeSegment: {
      trajet: 'Chengdu → Leshan',
      distance_km: 170,
      route: 'route goudronnée + pistes de digue',
      difficulte: 'modéré',
      points_interet: ['Plaine du Sichuan', 'Villages Qionglai'],
      reseau_eau: 'Villes fréquentes, fontaines publiques',
      coordonnees: {
        depart_chengdu: [30.5728, 104.0668],
        arrivee_leshan: [29.5522, 103.7658]
      }
    },
    transportToNext: {
      type: 'bike',
      duration: '1j',
      distance: '160km',
      notes: 'Etape vers Yibin par la vallée du Min'
    }
  },
  {
    date: '2025-11-04',
    destination: getDestination('25'), // Yibin
    activities: [
      {
        id: 'cn-12',
        title: 'Bikepacking Leshan → Yibin',
        description: 'Suivi du fleuve Minjiang jusqu’à sa confluence avec le Yangtze',
        destinationId: '25',
        startTime: '07:30',
        endTime: '17:00',
        category: 'nature'
      },
      {
        id: 'cn-13',
        title: 'Dégustation de thé noir',
        description: 'Rencontre avec des producteurs de thé Gongfu',
        destinationId: '25',
        startTime: '18:00',
        endTime: '20:00',
        category: 'cultural'
      }
    ],
    notes: 'Longue étape roulante jusqu’à Yibin, berceau du Yangtze et du thé noir.',
    order: 43,
    bikeSegment: {
      trajet: 'Leshan → Yibin',
      distance_km: 160,
      route: 'route nationale + bandes cyclables',
      difficulte: 'modéré',
      points_interet: ['Confluence du Yangtze', 'Plantations de thé'],
      reseau_eau: 'Villes régulières, stations-service',
      coordonnees: {
        depart_leshan: [29.5522, 103.7658],
        arrivee_yibin: [28.7513, 104.624]
      }
    },
    transportToNext: {
      type: 'bike',
      duration: '1j',
      distance: '180km',
      notes: 'Changement de relief vers Xichang'
    }
  },
  {
    date: '2025-11-05',
    destination: getDestination('26'), // Xichang
    activities: [
      {
        id: 'cn-14',
        title: 'Bikepacking Yibin → Xichang',
        description: 'Montée progressive vers le plateau Liangshan',
        destinationId: '26',
        startTime: '07:00',
        endTime: '18:00',
        category: 'nature'
      },
      {
        id: 'cn-15',
        title: 'Promenade au bord du lac Qionghai',
        description: 'Étirements et dîner de nouilles liangshan',
        destinationId: '26',
        startTime: '19:00',
        endTime: '20:30',
        category: 'rest'
      }
    ],
    notes: 'Entrée dans les montagnes Yi, premier col sérieux du périple chinois.',
    order: 44,
    bikeSegment: {
      trajet: 'Yibin → Xichang',
      distance_km: 180,
      route: 'route de montagne goudronnée',
      difficulte: 'difficile',
      points_interet: ['Terraces Yi', 'Lac Qionghai'],
      reseau_eau: 'Ravitaillement dans les bourgs, prévoir filtres',
      coordonnees: {
        depart_yibin: [28.7513, 104.624],
        arrivee_xichang: [27.8816, 102.267]
      }
    },
    transportToNext: {
      type: 'bike',
      duration: '1j',
      distance: '150km',
      notes: 'Vers le lac Lugu et les villages Mosuo'
    }
  },
  {
    date: '2025-11-06',
    destination: getDestination('27'), // Lac Lugu
    activities: [
      {
        id: 'cn-16',
        title: 'Bikepacking Xichang → Lac Lugu',
        description: 'Cols boisés et descente finale turquoise sur le lac',
        destinationId: '27',
        startTime: '07:30',
        endTime: '18:30',
        category: 'nature'
      },
      {
        id: 'cn-17',
        title: 'Coucher de soleil Mosuo',
        description: 'Balade en pirogue sur le lac Lugu avec la communauté Mosuo',
        destinationId: '27',
        startTime: '19:00',
        endTime: '20:00',
        category: 'cultural'
      }
    ],
    notes: 'Grande étape alpine avec arrivée sur les eaux sacrées du lac Lugu.',
    order: 45,
    bikeSegment: {
      trajet: 'Xichang → Lac Lugu',
      distance_km: 150,
      route: 'cols de montagne, alternance bitume/pistes',
      difficulte: 'difficile',
      points_interet: ['Plateau Liangshan', 'Villages Mosuo'],
      reseau_eau: 'Sources et villages, prévoir pastilles',
      coordonnees: {
        depart_xichang: [27.8816, 102.267],
        arrivee_lugu: [27.701, 100.799]
      }
    },
    transportToNext: {
      type: 'bike',
      duration: '1j',
      distance: '140km',
      notes: 'Descente vers Lijiang'
    }
  },
  {
    date: '2025-11-07',
    destination: getDestination('28'), // Lijiang
    activities: [
      {
        id: 'cn-18',
        title: 'Bikepacking Lac Lugu → Lijiang',
        description: 'Étape panoramique vers la vieille ville Naxi',
        destinationId: '28',
        startTime: '08:00',
        endTime: '17:00',
        category: 'nature'
      },
      {
        id: 'cn-19',
        title: 'Vieille ville de Lijiang',
        description: 'Promenade nocturne sur les canaux UNESCO',
        destinationId: '28',
        startTime: '19:00',
        endTime: '21:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Derniers lacets avant la vieille ville classée de Lijiang.',
    order: 46,
    bikeSegment: {
      trajet: 'Lac Lugu → Lijiang',
      distance_km: 140,
      route: 'route de montagne rénovée',
      difficulte: 'modéré',
      points_interet: ['Montagne du Dragon de Jade', 'Villages Naxi'],
      reseau_eau: 'Ravitaillement fréquent le long de la route',
      coordonnees: {
        depart_lugu: [27.701, 100.799],
        arrivee_lijiang: [26.8721, 100.233]
      }
    },
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Journée découverte de Lijiang'
    }
  },
  {
    date: '2025-11-08',
    destination: getDestination('28'), // Lijiang
    activities: [
      {
        id: 'cn-20',
        title: 'Temple Fuguo & marché Naxi',
        description: 'Exploration de la culture Naxi et des ruelles pavées',
        destinationId: '28',
        startTime: '10:00',
        endTime: '13:00',
        category: 'cultural'
      },
      {
        id: 'cn-21',
        title: 'Atelier Dongba',
        description: 'Initiation à l’écriture pictographique traditionnelle',
        destinationId: '28',
        startTime: '15:00',
        endTime: '17:00',
        category: 'cultural'
      }
    ],
    notes: 'Pause culturelle avant de replonger dans la route du thé et des chevaux.',
    order: 47,
    transportToNext: {
      type: 'bike',
      duration: '1j',
      distance: '120km',
      notes: 'Traversée vers Dali et le lac Erhai'
    }
  },
  {
    date: '2025-11-09',
    destination: getDestination('29'), // Dali
    activities: [
      {
        id: 'cn-22',
        title: 'Bikepacking Lijiang → Dali',
        description: 'Étape le long de l’ancienne route du thé, villages Bai',
        destinationId: '29',
        startTime: '08:00',
        endTime: '17:00',
        category: 'nature'
      },
      {
        id: 'cn-23',
        title: 'Coucher de soleil sur le lac Erhai',
        description: 'Balade au bord de l’eau avec vue sur les monts Cangshan',
        destinationId: '29',
        startTime: '18:00',
        endTime: '19:30',
        category: 'nature'
      }
    ],
    notes: 'Descente vers le lac Erhai, ambiance Bai et maisons blanchies à la chaux.',
    order: 48,
    bikeSegment: {
      trajet: 'Lijiang → Dali',
      distance_km: 120,
      route: 'route secondaire et pistes agricoles',
      difficulte: 'modéré',
      points_interet: ['Villages Bai', 'Monts Cangshan'],
      reseau_eau: 'Fontaines et cafés dans chaque bourg',
      coordonnees: {
        depart_lijiang: [26.8721, 100.233],
        arrivee_dali: [25.693, 100.162]
      }
    },
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration de Dali et du lac Erhai'
    }
  },
  {
    date: '2025-11-10',
    destination: getDestination('29'), // Dali
    activities: [
      {
        id: 'cn-24',
        title: 'Vieille ville de Dali',
        description: 'Tour des remparts et marché local',
        destinationId: '29',
        startTime: '09:00',
        endTime: '11:30',
        category: 'cultural'
      },
      {
        id: 'cn-25',
        title: 'Pagodes des Trois Tours',
        description: 'Visite patrimoniale et préparation croisée pour la prochaine étape',
        destinationId: '29',
        startTime: '14:00',
        endTime: '16:00',
        category: 'sightseeing'
      }
    ],
    notes: 'Dernier jour autour du lac Erhai avant de pointer vers Kunming.',
    order: 49,
    transportToNext: {
      type: 'bike',
      duration: '1j',
      distance: '150km',
      notes: 'Dali → Chuxiong sur l’ancienne route du thé'
    }
  },
  {
    date: '2025-11-11',
    destination: getDestination('30'), // Chuxiong
    activities: [
      {
        id: 'cn-26',
        title: 'Bikepacking Dali → Chuxiong',
        description: 'Montées en douceur et villages Yi',
        destinationId: '30',
        startTime: '07:00',
        endTime: '17:00',
        category: 'nature'
      }
    ],
    notes: 'Etape de liaison vers la capitale du centre Yunnan.',
    order: 50,
    bikeSegment: {
      trajet: 'Dali → Chuxiong',
      distance_km: 150,
      route: 'route nationale avec bandes cyclables',
      difficulte: 'modéré',
      points_interet: ['Villages Yi', 'Plantations de thé'],
      reseau_eau: 'Stations-service régulières, villages tous les 20km',
      coordonnees: {
        depart_dali: [25.693, 100.162],
        arrivee_chuxiong: [25.045, 101.546]
      }
    },
    transportToNext: {
      type: 'bike',
      duration: '1j',
      distance: '170km',
      notes: 'Dernière grosse étape avant Kunming'
    }
  },
  {
    date: '2025-11-12',
    destination: getDestination('20'), // Kunming
    activities: [
      {
        id: 'cn-27',
        title: 'Bikepacking Chuxiong → Kunming',
        description: 'Arrivée dans la capitale printanière du Yunnan',
        destinationId: '20',
        startTime: '07:30',
        endTime: '17:30',
        category: 'nature'
      },
      {
        id: 'cn-28',
        title: 'Balade dans le quartier de Green Lake',
        description: 'Street food et ambiance universitaire',
        destinationId: '20',
        startTime: '19:00',
        endTime: '21:00',
        category: 'cultural'
      }
    ],
    notes: 'Fin de la traversée nord du Yunnan, retour à l’altitude modérée.',
    order: 51,
    bikeSegment: {
      trajet: 'Chuxiong → Kunming',
      distance_km: 170,
      route: 'autoroute secondaire avec bande cyclable',
      difficulte: 'modéré',
      points_interet: ['Plateau du Yunnan', 'Villages Hui'],
      reseau_eau: 'Nombreux services routiers',
      coordonnees: {
        depart_chuxiong: [25.045, 101.546],
        arrivee_kunming: [24.8801, 102.8329]
      }
    },
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Repos et intendance à Kunming'
    }
  },
  {
    date: '2025-11-13',
    destination: getDestination('20'), // Kunming
    activities: [
      {
        id: 'cn-29',
        title: 'Temple Yuantong',
        description: 'Pause spirituelle et récupération active',
        destinationId: '20',
        startTime: '09:00',
        endTime: '11:00',
        category: 'cultural'
      },
      {
        id: 'cn-30',
        title: 'Préparation bikepacking sud',
        description: 'Révision des vélos, cartes offline et filtres à eau',
        destinationId: '20',
        startTime: '14:00',
        endTime: '16:00',
        category: 'preparation'
      }
    ],
    notes: 'Dernière journée urbaine avant la descente vers la frontière vietnamienne.',
    order: 52,
    transportToNext: {
      type: 'bike',
      duration: '1j',
      distance: '190km',
      notes: 'Grande descente vers Jianshui'
    }
  },
  {
    date: '2025-11-14',
    destination: getDestination('31'), // Jianshui
    activities: [
      {
        id: 'cn-31',
        title: 'Bikepacking Kunming → Jianshui',
        description: 'Traversée des plaines agricoles et de villages Hani',
        destinationId: '31',
        startTime: '07:00',
        endTime: '18:00',
        category: 'nature'
      },
      {
        id: 'cn-32',
        title: 'Pont du Double Dragon',
        description: 'Visite rapide du pont Ming en soirée',
        destinationId: '31',
        startTime: '19:00',
        endTime: '20:30',
        category: 'sightseeing'
      }
    ],
    notes: 'Changement d’ambiance : rizières irriguées et architecture Hani.',
    order: 53,
    bikeSegment: {
      trajet: 'Kunming → Jianshui',
      distance_km: 190,
      route: 'route nationale + sections gravel',
      difficulte: 'difficile',
      points_interet: ['Pont Double Dragon', 'Villages Hani'],
      reseau_eau: 'Marchés locaux tous les 40km, prévoir électrolytes',
      coordonnees: {
        depart_kunming: [24.8801, 102.8329],
        arrivee_jianshui: [23.611, 102.827]
      }
    },
    transportToNext: {
      type: 'bike',
      duration: '1j',
      distance: '110km',
      notes: 'Montée vers les terrasses de Yuanyang'
    }
  },
  {
    date: '2025-11-15',
    destination: getDestination('61'), // Yuanyang
    activities: [
      {
        id: 'cn-33',
        title: 'Bikepacking Jianshui → Yuanyang',
        description: 'Montée sinueuse vers les rizières en terrasses',
        destinationId: '61',
        startTime: '08:00',
        endTime: '15:30',
        category: 'nature'
      },
      {
        id: 'cn-34',
        title: 'Coucher de soleil sur Duoyishu',
        description: 'Point de vue doré sur les terrasses Hani',
        destinationId: '61',
        startTime: '17:00',
        endTime: '18:30',
        category: 'sightseeing'
      }
    ],
    notes: 'Arrivée dans les rizières UNESCO, paysages sculptés par les Hani.',
    order: 54,
    bikeSegment: {
      trajet: 'Jianshui → Yuanyang',
      distance_km: 110,
      route: 'piste gravier + route de montagne',
      difficulte: 'difficile',
      points_interet: ['Terrasses Duoyishu', 'Villages Hani'],
      reseau_eau: 'Sources, prévoir réserve 3-4L',
      coordonnees: {
        depart_jianshui: [23.611, 102.827],
        arrivee_yuanyang: [23.102, 102.75]
      }
    },
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Exploration à pied des terrasses'
    }
  },
  {
    date: '2025-11-16',
    destination: getDestination('61'), // Yuanyang
    activities: [
      {
        id: 'cn-35',
        title: 'Randonnée Yuanyang terrasses',
        description: 'Boucle pédestre entre villages Qingkou et Bada',
        destinationId: '61',
        startTime: '09:00',
        endTime: '14:00',
        category: 'nature'
      },
      {
        id: 'cn-36',
        title: 'Marché Hani de Xinjie',
        description: 'Rencontre avec les artisans locaux et recharge vivres',
        destinationId: '61',
        startTime: '15:30',
        endTime: '17:30',
        category: 'cultural'
      }
    ],
    notes: 'Journée sans vélo pour profiter pleinement des terrasses et cultures Hani.',
    order: 55,
    transportToNext: {
      type: 'bike',
      duration: '1j',
      distance: '140km',
      notes: 'Descente vers la vallée de la rivière Rouge'
    }
  },
  {
    date: '2025-11-17',
    destination: getDestination('22'), // Vallée de la rivière Rouge
    activities: [
      {
        id: 'cn-37',
        title: 'Bikepacking Yuanyang → Vallée de Honghe',
        description: 'Grande descente vers la chaleur tropicale et plantations de bananes',
        destinationId: '22',
        startTime: '07:00',
        endTime: '14:00',
        category: 'nature'
      },
      {
        id: 'cn-38',
        title: 'Bain thermique de Mengzi',
        description: 'Relaxation dans les bains minéraux et dégustation de café Yunnan',
        destinationId: '22',
        startTime: '16:00',
        endTime: '18:00',
        category: 'rest'
      }
    ],
    notes: 'Passage des montagnes brumeuses aux vallées tropicales de Honghe.',
    order: 56,
    bikeSegment: {
      trajet: 'Yuanyang → Vallée de la rivière Rouge',
      distance_km: 140,
      route: 'descente asphaltée + segments gravel',
      difficulte: 'modéré',
      points_interet: ['Vallée de Honghe', 'Plantations de café'],
      reseau_eau: 'Villages fréquents, chaleur humide',
      coordonnees: {
        depart_yuanyang: [23.102, 102.75],
        arrivee_honghe: [22.5, 103.5]
      }
    },
    transportToNext: {
      type: 'bike',
      duration: '0.5j',
      distance: '45km',
      notes: 'Derniers kilomètres jusqu’au poste frontière de Hekou'
    }
  },
  {
    date: '2025-11-18',
    destination: getDestination('23'), // Frontière Chine-Vietnam
    activities: [
      {
        id: 'cn-39',
        title: 'Bikepacking Honghe → Hekou',
        description: 'Dernier tronçon le long de la rivière Rouge jusqu’au poste de Hekou',
        destinationId: '23',
        startTime: '08:00',
        endTime: '11:00',
        category: 'travel'
      },
      {
        id: 'cn-40',
        title: 'Formalités et logistique Vietnam',
        description: 'Passage en douane, change et organisation de l’étape vietnamienne',
        destinationId: '23',
        startTime: '13:00',
        endTime: '16:00',
        category: 'preparation'
      }
    ],
    notes: 'Fin de la traversée chinoise : formalités à Hekou avant l’entrée au Vietnam.',
    order: 57,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Repos côté vietnamien (Lào Cai)'
    }
  }
];
