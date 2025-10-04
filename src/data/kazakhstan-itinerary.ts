import { destinations } from './destinations';

const getDestination = (id: string) => {
  const destination = destinations.find((item) => item.id === id);
  if (!destination) {
    throw new Error(`Destination ${id} not found in destinations dataset`);
  }
  return destination;
};

export const kazakhstanDayItineraries = [
  // === KAZAKHSTAN - SEGMENTS VÉLO DÉTAILLÉS ===
  {
    date: '2025-10-10',
    destination: getDestination('44'), // Camp Mangystau J1
    activities: [
      {
        id: 'kz-01',
        title: 'Bikepacking Aktau → Shetpe (partie 1)',
        description: 'Étape de mise en jambe sur la route goudronnée longeant la Caspienne.',
        destinationId: '44',
        startTime: '07:30',
        endTime: '15:00',
        category: 'bike'
      },
      {
        id: 'kz-01-camp',
        title: 'Installation du camp Mangystau',
        description: 'Montage du bivouac et hydratation près des falaises du plateau.',
        destinationId: '44',
        startTime: '15:30',
        endTime: '17:30',
        category: 'rest'
      }
    ],
    notes: 'Première portion depuis Aktau, roulage fluide avant d\'attaquer les pistes du Mangystau.',
    order: 16,
    bikeSegment: {
      trajet: 'Aktau → Shetpe (partie 1)',
      distance_km: 75,
      route: 'goudronnée',
      difficulte: 'facile',
      points_interet: ['Plages Caspienne'],
      reseau_eau: 'réseau bon, villages',
      coordonnees: {
        depart_aktau: [43.64806, 51.17222],
        arrivee_etape: [44.0, 51.6]
      }
    }
  },
  {
    date: '2025-10-11',
    destination: getDestination('45'), // Shetpe
    activities: [
      {
        id: 'kz-02',
        title: 'Bikepacking Aktau → Shetpe (partie 2)',
        description: 'Montée progressive vers Shetpe avec passage près de Shakpak Ata.',
        destinationId: '45',
        startTime: '07:30',
        endTime: '15:30',
        category: 'bike'
      },
      {
        id: 'kz-02-recup',
        title: 'Ravitaillement à Shetpe',
        description: 'Courses et check mécanique avant les boucles locales.',
        destinationId: '45',
        startTime: '16:00',
        endTime: '18:00',
        category: 'preparation'
      }
    ],
    notes: 'Fin du transfert depuis Aktau, arrivée à Shetpe et ravitaillement.',
    order: 17,
    bikeSegment: {
      trajet: 'Aktau → Shetpe (partie 2)',
      distance_km: 75,
      route: 'goudronnée',
      difficulte: 'modéré',
      points_interet: ['Falaises Shakpak Ata'],
      reseau_eau: 'réseau presque partout, villages',
      coordonnees: {
        depart_camp: [44.0, 51.6],
        arrivee_shetpe: [44.16667, 52.11667]
      }
    }
  },
  {
    date: '2025-10-12',
    destination: getDestination('46'), // Shakpak Ata
    activities: [
      {
        id: 'kz-03',
        title: 'Boucle Shakpak Ata',
        description: 'Exploration des mosquées troglodytes et falaises calcaires.',
        destinationId: '46',
        startTime: '08:00',
        endTime: '14:00',
        category: 'bike'
      }
    ],
    notes: 'Journée en étoile autour de Shetpe pour découvrir Shakpak Ata.',
    order: 18,
    bikeSegment: {
      trajet: 'Boucle Shakpak Ata',
      distance_km: 25,
      route: 'pistes gravier/sable',
      difficulte: 'modéré',
      points_interet: ['Mosquée Shakpak Ata'],
      reseau_eau: 'prévoir eau',
      coordonnees: {
        shakpak_ata: [44.221, 52.145]
      }
    }
  },
  {
    date: '2025-10-13',
    destination: getDestination('47'), // Torysh - Vallée des boules
    activities: [
      {
        id: 'kz-04',
        title: 'Boucle Torysh (Vallée des boules)',
        description: 'Boucle sableuse parmi les sphères rocheuses de Torysh.',
        destinationId: '47',
        startTime: '08:00',
        endTime: '15:00',
        category: 'bike'
      }
    ],
    notes: 'Immersion dans les formations géologiques de Torysh.',
    order: 19,
    bikeSegment: {
      trajet: 'Boucle Torysh (Vallée des boules)',
      distance_km: 30,
      route: 'pistes sable',
      difficulte: 'modéré',
      points_interet: ['Vallée des boules (Torysh)'],
      reseau_eau: 'réseau intermittent',
      coordonnees: {
        torysh: [44.3236, 51.5986]
      }
    }
  },
  {
    date: '2025-10-14',
    destination: getDestination('48'), // Camp Mangystau J2
    activities: [
      {
        id: 'kz-05',
        title: 'Shetpe → Zhanaozen (partie 1)',
        description: 'Transfert sud sur route lisse vers le désert pétrolier.',
        destinationId: '48',
        startTime: '07:30',
        endTime: '15:30',
        category: 'bike'
      }
    ],
    notes: 'Départ plein sud vers Zhanaozen avec un bivouac intermédiaire.',
    order: 20,
    bikeSegment: {
      trajet: 'Shetpe → Zhanaozen (partie 1)',
      distance_km: 70,
      route: 'goudronnée',
      difficulte: 'facile',
      points_interet: [],
      reseau_eau: 'villages épars',
      coordonnees: {
        depart_shetpe: [44.16667, 52.11667],
        etape: [43.8, 52.5]
      }
    }
  },
  {
    date: '2025-10-15',
    destination: getDestination('49'), // Zhanaozen
    activities: [
      {
        id: 'kz-06',
        title: 'Shetpe → Zhanaozen (partie 2)',
        description: 'Derniers kilomètres jusqu\'à Zhanaozen via Beket Ata.',
        destinationId: '49',
        startTime: '07:30',
        endTime: '14:30',
        category: 'bike'
      },
      {
        id: 'kz-06-decouverte',
        title: 'Balade urbaine à Zhanaozen',
        description: 'Rencontre avec les locaux et logistique de la suite.',
        destinationId: '49',
        startTime: '16:00',
        endTime: '18:00',
        category: 'cultural'
      }
    ],
    notes: 'Arrivée à Zhanaozen après une journée marqué par Beket Ata.',
    order: 21,
    bikeSegment: {
      trajet: 'Shetpe → Zhanaozen (partie 2)',
      distance_km: 70,
      route: 'goudronnée',
      difficulte: 'modéré',
      points_interet: ['Mosquée souterraine Beket Ata'],
      reseau_eau: 'réseau présent',
      coordonnees: {
        beket_ata: [43.59694, 54.07],
        arrivee_zhanaozen: [43.34116, 52.86192]
      }
    }
  },
  {
    date: '2025-10-16',
    destination: getDestination('50'), // Karagiye Depression
    activities: [
      {
        id: 'kz-07',
        title: 'Excursion Karagiye Depression',
        description: 'Aller-retour exigeant sur pistes sable/cailloux au cœur de Karagiye.',
        destinationId: '50',
        startTime: '08:00',
        endTime: '16:00',
        category: 'bike'
      }
    ],
    notes: 'Immersion dans la dépression salée avec vigilance sur l\'hydratation.',
    order: 22,
    bikeSegment: {
      trajet: 'Excursion Karagiye Depression',
      distance_km: 50,
      route: 'pistes sable/cailloux',
      difficulte: 'difficile',
      points_interet: ['Karagiye Depression'],
      reseau_eau: 'prévoir 5–8 L',
      coordonnees: {
        karagiye: [43.4, 51.79]
      }
    }
  },
  {
    date: '2025-10-17',
    destination: getDestination('9'), // Almaty
    activities: [
      {
        id: 'kz-08',
        title: 'Train Mangystau → Almaty',
        description: 'Long trajet ferroviaire pour rejoindre le sud-est kazakh.',
        destinationId: '9',
        startTime: '09:00',
        endTime: '21:00',
        category: 'transport'
      },
      {
        id: 'kz-08-repos',
        title: 'Repos et acclimatation',
        description: 'Installation dans le quartier central d\'Almaty.',
        destinationId: '9',
        startTime: '21:00',
        endTime: '23:00',
        category: 'rest'
      }
    ],
    notes: 'Traversée ferroviaire Mangystau → Almaty pour lancer la deuxième semaine.',
    order: 23,
    transportToNext: {
      type: 'train',
      duration: '36h',
      distance: '2100km',
      notes: 'Train Mangystau → Almaty (repos, wagon-couchettes)',
      pointsOfInterest: 'Beyneu, Shalkar, Aral, Kyzylorda, Turkistan, Shymkent, Taraz, Shu'
    }
  },
  {
    date: '2025-10-18',
    destination: getDestination('51'), // Approche Charyn Canyon
    activities: [
      {
        id: 'kz-09',
        title: 'Almaty → Charyn Canyon (approche)',
        description: 'Route secondaire vers les gorges du Charyn.',
        destinationId: '51',
        startTime: '07:30',
        endTime: '15:00',
        category: 'bike'
      }
    ],
    notes: 'Première étape dans la région d\'Almaty, progression vers le canyon.',
    order: 24,
    bikeSegment: {
      trajet: 'Almaty → Charyn Canyon (approche)',
      distance_km: 60,
      route: 'route secondaire',
      difficulte: 'modéré',
      points_interet: [],
      reseau_eau: 'réseau continu',
      coordonnees: {
        depart_almaty: [43.25667, 76.92861],
        etape: [43.3, 78.6]
      }
    }
  },
  {
    date: '2025-10-19',
    destination: getDestination('52'), // Charyn Canyon
    activities: [
      {
        id: 'kz-10',
        title: 'Charyn Canyon boucle',
        description: 'Boucle mixte route/piste dans le canyon et le long de la rivière.',
        destinationId: '52',
        startTime: '08:00',
        endTime: '16:00',
        category: 'bike'
      }
    ],
    notes: 'Découverte approfondie des gorges et formations du canyon de Charyn.',
    order: 25,
    bikeSegment: {
      trajet: 'Charyn Canyon boucle',
      distance_km: 70,
      route: 'route + piste',
      difficulte: 'modéré',
      points_interet: ['Charyn Canyon', 'formations rocheuses'],
      reseau_eau: 'prévoir eau sur site',
      coordonnees: {
        charyn_viewpoint: [43.3547892, 79.0619113],
        charyn_river: [43.303663, 79.011236]
      }
    }
  },
  {
    date: '2025-10-20',
    destination: getDestination('53'), // Plateau retour Charyn
    activities: [
      {
        id: 'kz-11',
        title: 'Route retour Charyn',
        description: 'Retour vers le plateau avant de filer vers la vallée de l\'Ili.',
        destinationId: '53',
        startTime: '07:30',
        endTime: '15:00',
        category: 'bike'
      }
    ],
    notes: 'Transition vers la vallée de l\'Ili avec un profil plus roulant.',
    order: 26,
    bikeSegment: {
      trajet: 'Route retour Charyn',
      distance_km: 50,
      route: 'goudronnée',
      difficulte: 'facile',
      points_interet: [],
      reseau_eau: 'réseau présent',
      coordonnees: {
        depart_canyon: [43.3547892, 79.0619113],
        retour_charyn: [43.35, 78.8]
      }
    }
  },
  {
    date: '2025-10-21',
    destination: getDestination('54'), // Vallée de l'Ili - Village 1
    activities: [
      {
        id: 'kz-12',
        title: 'Vallée de l’Ili (partie 1)',
        description: 'Immersion dans les villages de la vallée de l\'Ili.',
        destinationId: '54',
        startTime: '08:00',
        endTime: '15:30',
        category: 'bike'
      }
    ],
    notes: 'Découverte des villages et cultures de la vallée de l\'Ili.',
    order: 27,
    bikeSegment: {
      trajet: 'Vallée de l’Ili (partie 1)',
      distance_km: 60,
      route: 'goudronnée',
      difficulte: 'facile',
      points_interet: ['Villages traditionnels'],
      reseau_eau: 'villages réguliers',
      coordonnees: {
        ili_vallee_1: [44.0, 77.2]
      }
    }
  },
  {
    date: '2025-10-22',
    destination: getDestination('55'), // Vallée de l'Ili - Village 2
    activities: [
      {
        id: 'kz-13',
        title: 'Vallée de l’Ili (partie 2)',
        description: 'Poursuite de la vallée avec panoramas sur la rivière.',
        destinationId: '55',
        startTime: '08:00',
        endTime: '15:00',
        category: 'bike'
      }
    ],
    notes: 'Panoramas sur la rivière Ili et rencontres villageoises.',
    order: 28,
    bikeSegment: {
      trajet: 'Vallée de l’Ili (partie 2)',
      distance_km: 60,
      route: 'goudronnée',
      difficulte: 'facile',
      points_interet: ['Panoramas', 'Rivière Ili'],
      reseau_eau: 'réseau quasi partout',
      coordonnees: {
        ili_vallee_2: [44.3, 77.0]
      }
    }
  },
  {
    date: '2025-10-23',
    destination: getDestination('56'), // Altyn-Emel - Entrée
    activities: [
      {
        id: 'kz-14',
        title: 'Altyn-Emel NP (approche)',
        description: 'Approche du parc national Altyn-Emel.',
        destinationId: '56',
        startTime: '07:30',
        endTime: '14:30',
        category: 'bike'
      }
    ],
    notes: 'Entrée dans le parc d\'Altyn-Emel par les pistes roulantes.',
    order: 29,
    bikeSegment: {
      trajet: 'Altyn-Emel NP (approche)',
      distance_km: 50,
      route: 'route',
      difficulte: 'modéré',
      points_interet: [],
      reseau_eau: 'prévoir réserve',
      coordonnees: {
        altyn_emel_entree: [44.2, 78.26]
      }
    }
  },
  {
    date: '2025-10-24',
    destination: getDestination('57'), // Altyn-Emel - Dunes chantantes
    activities: [
      {
        id: 'kz-15',
        title: 'Altyn-Emel mini-boucle',
        description: 'Tour des dunes chantantes et montagnes colorées.',
        destinationId: '57',
        startTime: '08:00',
        endTime: '15:30',
        category: 'bike'
      }
    ],
    notes: 'Journée découverte des dunes chantantes d\'Altyn-Emel.',
    order: 30,
    bikeSegment: {
      trajet: 'Altyn-Emel mini-boucle',
      distance_km: 45,
      route: 'pistes sable/gravier',
      difficulte: 'modéré',
      points_interet: ['Dunes chantantes', 'Montagnes colorées'],
      reseau_eau: 'prévoir eau',
      coordonnees: {
        dunes_chantantes: [44.18, 78.36]
      }
    }
  },
  {
    date: '2025-10-25',
    destination: getDestination('58'), // Altyn-Emel - Camp retour
    activities: [
      {
        id: 'kz-16',
        title: 'Altyn-Emel retour',
        description: 'Sortie du parc par pistes roulantes vers le nord.',
        destinationId: '58',
        startTime: '07:30',
        endTime: '14:30',
        category: 'bike'
      }
    ],
    notes: 'Fin de la boucle Altyn-Emel, retour aux routes principales.',
    order: 31,
    bikeSegment: {
      trajet: 'Altyn-Emel retour',
      distance_km: 50,
      route: 'route',
      difficulte: 'facile',
      points_interet: [],
      reseau_eau: 'villages possibles',
      coordonnees: {
        retour_altyn_emel: [44.05, 78.1]
      }
    }
  },
  {
    date: '2025-10-26',
    destination: getDestination('9'), // Almaty
    activities: [
      {
        id: 'kz-17',
        title: 'Repos à Almaty',
        description: 'Journée off pour récupérer et profiter de la ville.',
        destinationId: '9',
        startTime: '10:00',
        endTime: '22:00',
        category: 'rest'
      }
    ],
    notes: 'Repos complet avant la traversée vers la frontière chinoise.',
    order: 32,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Récupération et intendance à Almaty'
    }
  },
  {
    date: '2025-10-27',
    destination: getDestination('9'), // Almaty
    activities: [
      {
        id: 'kz-18',
        title: 'Préparation bikepacking vers Khorgos',
        description: 'Révision vélo, logistique eau et nourriture pour deux jours.',
        destinationId: '9',
        startTime: '09:00',
        endTime: '13:00',
        category: 'preparation'
      },
      {
        id: 'kz-18-balade',
        title: 'Balade légère dans Almaty',
        description: 'Derniers achats et visite du bazar vert.',
        destinationId: '9',
        startTime: '15:00',
        endTime: '18:00',
        category: 'cultural'
      }
    ],
    notes: 'Préparation logistique pour la traversée vers Khorgos.',
    order: 33
  },
  {
    date: '2025-10-28',
    destination: getDestination('59'), // Camp Steppe vers Khorgos
    activities: [
      {
        id: 'kz-19',
        title: 'Almaty → Camp steppe Khorgos (partie 1)',
        description: 'Longue étape gravel à travers les steppes vers l\'est.',
        destinationId: '59',
        startTime: '07:00',
        endTime: '17:00',
        category: 'bike'
      }
    ],
    notes: 'Première journée vers Khorgos avec passages dans les dunes et collines.',
    order: 34,
    bikeSegment: {
      trajet: 'Almaty → Camp steppe Khorgos (partie 1)',
      distance_km: 160,
      route: 'piste gravier/sable',
      difficulte: 'modéré',
      points_interet: ['Altyn-Emel NP', 'dunes chantantes', 'montagnes colorées'],
      reseau_eau: 'Réseau intermittent, prévoir eau',
      coordonnees: {
        depart_almaty: [43.25667, 76.92861],
        camp_steppe: [44.6, 80.0]
      }
    }
  },
  {
    date: '2025-10-29',
    destination: getDestination('60'), // Poste frontalier de Khorgos
    activities: [
      {
        id: 'kz-20',
        title: 'Camp steppe → Khorgos (partie 2)',
        description: 'Derniers kilomètres kazakhs jusqu\'au poste frontalier.',
        destinationId: '60',
        startTime: '07:30',
        endTime: '15:30',
        category: 'bike'
      }
    ],
    notes: 'Arrivée au poste frontalier de Khorgos, fin de la traversée kazakhe.',
    order: 35,
    bikeSegment: {
      trajet: 'Camp steppe → Khorgos (partie 2)',
      distance_km: 160,
      route: 'piste gravier/sable',
      difficulte: 'modéré',
      points_interet: ['Frontière sino-kazakhe', 'derniers panoramas'],
      reseau_eau: 'Réseau intermittent, prévoir eau',
      coordonnees: {
        camp_steppe: [44.6, 80.0],
        frontiere_khorgos: [44.2, 80.0]
      }
    }
  },
  {
    date: '2025-10-29',
    destination: getDestination('60'), // Poste frontalier de Khorgos
    activities: [
      {
        id: 'kz-21',
        title: 'Formalités frontière Khorgos',
        description: 'Démarches administratives avant l\'entrée en Chine.',
        destinationId: '60',
        startTime: '16:00',
        endTime: '19:00',
        category: 'preparation'
      }
    ],
    notes: 'Formalités et repos au poste de Khorgos avant l\'entrée en Chine.',
    order: 36,
    transportToNext: {
      type: 'rest',
      duration: '1j',
      distance: '0km',
      notes: 'Repos à Khorgos avant passage en Chine'
    }
  }
];
