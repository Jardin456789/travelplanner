import { Destination } from '@/types/travel';

export const destinations: Destination[] = [
  // === EUROPE ===
  {
    id: '1',
    name: 'Koman',
    description: 'Village alpin albanais célèbre pour son lac et barrage',
    coordinates: { lat: 42.1039, lng: 19.8344 },
    address: 'Koman, Albanie',
    category: 'nature'
  },
  {
    id: '2',
    name: 'Pristina',
    description: 'Capitale du Kosovo',
    coordinates: { lat: 42.6629, lng: 21.1655 },
    address: 'Pristina, Kosovo',
    category: 'city'
  },
  {
    id: '3',
    name: 'Skopje',
    description: 'Capitale de la Macédoine du Nord',
    coordinates: { lat: 41.9981, lng: 21.4254 },
    address: 'Skopje, Macédoine du Nord',
    category: 'city'
  },
  {
    id: '4',
    name: 'Istanbul',
    description: 'Métropole entre Europe et Asie',
    coordinates: { lat: 41.0082, lng: 28.9784 },
    address: 'Istanbul, Turquie',
    category: 'city'
  },
  // === KAZAKHSTAN ===
  {
    id: '5',
    name: 'Aktau',
    description: 'Ville portuaire sur la mer Caspienne',
    coordinates: { lat: 43.65, lng: 51.16 },
    address: 'Aktau, Kazakhstan',
    category: 'city'
  },
  {
    id: '6',
    name: 'Atyrau',
    description: 'Ville pétrolière sur la Caspienne',
    coordinates: { lat: 47.0945, lng: 51.9236 },
    address: 'Atyrau, Kazakhstan',
    category: 'city'
  },
  {
    id: '7',
    name: 'Aktobe',
    description: 'Ville industrielle au centre du Kazakhstan',
    coordinates: { lat: 50.2839, lng: 57.1669 },
    address: 'Aktobe, Kazakhstan',
    category: 'city'
  },
  {
    id: '8',
    name: 'Kyzylorda',
    description: 'Ville du désert sur le Syr-Daria',
    coordinates: { lat: 44.8488, lng: 65.4823 },
    address: 'Kyzylorda, Kazakhstan',
    category: 'city'
  },
  {
    id: '9',
    name: 'Almaty',
    description: 'Plus grande ville du Kazakhstan',
    coordinates: { lat: 43.2220, lng: 76.8512 },
    address: 'Almaty, Kazakhstan',
    category: 'city'
  },
  {
    id: '10',
    name: 'Steppes du Kazakhstan',
    description: 'Région de bikepacking dans les plaines kazakhes',
    coordinates: { lat: 44.5, lng: 72.0 },
    address: 'Région de Balkhash, Kazakhstan',
    category: 'nature'
  },
  {
    id: '11',
    name: 'Lac Balkhash',
    description: 'Grand lac d\'Asie centrale',
    coordinates: { lat: 46.0, lng: 74.0 },
    address: 'Lac Balkhash, Kazakhstan',
    category: 'nature'
  },
  {
    id: '12',
    name: 'Frontière Kazakhstan-Chine',
    description: 'Passage vers le Xinjiang chinois',
    coordinates: { lat: 46.5, lng: 81.0 },
    address: 'Frontière Kazakhstan-Chine',
    category: 'border'
  },
  {
    id: '13',
    name: 'Shymkent',
    description: 'Troisième plus grande ville du Kazakhstan, centre moderne',
    coordinates: { lat: 42.3417, lng: 69.5901 },
    address: 'Shymkent, Kazakhstan',
    category: 'city'
  },
  {
    id: '14',
    name: 'Turkistan',
    description: 'Ville historique avec mausolée d\'Ahmed Yasawi (UNESCO)',
    coordinates: { lat: 43.2973, lng: 68.2744 },
    address: 'Turkistan, Kazakhstan',
    category: 'city'
  },
  {
    id: '15',
    name: 'Taraz',
    description: 'Ancienne ville sur la Route de la Soie, centre historique',
    coordinates: { lat: 42.9011, lng: 71.3773 },
    address: 'Taraz, Kazakhstan',
    category: 'city'
  },
  {
    id: '16',
    name: 'Vallée de Chu',
    description: 'Belle vallée avec rivières et steppes, région de bikepacking',
    coordinates: { lat: 43.2, lng: 74.5 },
    address: 'Vallée de Chu, Kazakhstan',
    category: 'nature'
  },
  // === CHINE ===
  {
    id: '17',
    name: 'Ürümqi',
    description: 'Capitale du Xinjiang, première ville chinoise',
    coordinates: { lat: 43.8256, lng: 87.6168 },
    address: 'Ürümqi, Xinjiang, Chine',
    category: 'city'
  },
  {
    id: '18',
    name: 'Chengdu',
    description: 'Capitale du Sichuan, ville moderne avec temples anciens',
    coordinates: { lat: 30.5728, lng: 104.0668 },
    address: 'Chengdu, Sichuan, Chine',
    category: 'city'
  },
  {
    id: '19',
    name: 'Chongqing',
    description: 'Municipalité de Chongqing, mégapole sur le Yangtze',
    coordinates: { lat: 29.5630, lng: 106.5516 },
    address: 'Chongqing, Chine',
    category: 'city'
  },
  {
    id: '20',
    name: 'Kunming',
    description: 'Capitale du Yunnan, porte d\'entrée des minorités ethniques',
    coordinates: { lat: 24.8801, lng: 102.8329 },
    address: 'Kunming, Yunnan, Chine',
    category: 'city'
  },
  {
    id: '21',
    name: 'Montagnes du Yunnan',
    description: 'Région de bikepacking dans les montagnes du Yunnan',
    coordinates: { lat: 25.5, lng: 101.0 },
    address: 'Région de Dali-Lijiang, Yunnan, Chine',
    category: 'nature'
  },
  {
    id: '22',
    name: 'Vallée de la rivière Rouge',
    description: 'Traversée de la frontière Vietnam via la rivière Rouge',
    coordinates: { lat: 22.5, lng: 103.5 },
    address: 'Région frontalière Vietnam-Chine',
    category: 'nature'
  },
  {
    id: '23',
    name: 'Frontière Chine-Vietnam',
    description: 'Poste frontière vers le Vietnam',
    coordinates: { lat: 22.3, lng: 103.8 },
    address: 'Frontière Chine-Vietnam',
    category: 'border'
  },
  // === CHINE CÔTIÈRE - RETOUR ===
  {
    id: '32',
    name: 'Shenzhen',
    description: 'Ville high-tech frontalière de Hong Kong',
    coordinates: { lat: 22.5429, lng: 114.0596 },
    address: 'Shenzhen, Guangdong, Chine',
    category: 'city'
  },
  {
    id: '33',
    name: 'Guangzhou',
    description: 'Capitale économique du Guangdong',
    coordinates: { lat: 23.1291, lng: 113.2644 },
    address: 'Guangzhou, Guangdong, Chine',
    category: 'city'
  },
  {
    id: '34',
    name: 'Xiamen',
    description: 'Port historique sur la côte sud-est',
    coordinates: { lat: 24.4798, lng: 118.0894 },
    address: 'Xiamen, Fujian, Chine',
    category: 'city'
  },
  {
    id: '35',
    name: 'Hangzhou',
    description: 'Capitale du Zhejiang, célèbre pour son lac Ouest',
    coordinates: { lat: 30.2741, lng: 120.1551 },
    address: 'Hangzhou, Zhejiang, Chine',
    category: 'city'
  },
  {
    id: '36',
    name: 'Shanghai',
    description: 'Mégapole moderne, centre financier de la Chine',
    coordinates: { lat: 31.2304, lng: 121.4737 },
    address: 'Shanghai, Chine',
    category: 'city'
  },
  {
    id: '37',
    name: 'Nanjing',
    description: 'Capitale historique de la Chine impériale',
    coordinates: { lat: 32.0603, lng: 118.7969 },
    address: 'Nanjing, Jiangsu, Chine',
    category: 'city'
  },
  {
    id: '38',
    name: 'Qingdao',
    description: 'Ville portuaire avec architecture allemande',
    coordinates: { lat: 36.0671, lng: 120.3826 },
    address: 'Qingdao, Shandong, Chine',
    category: 'city'
  },
  {
    id: '39',
    name: 'Tianjin',
    description: 'Port majeur près de Pékin',
    coordinates: { lat: 39.0842, lng: 117.2009 },
    address: 'Tianjin, Chine',
    category: 'city'
  },
  {
    id: '40',
    name: 'Dalian',
    description: 'Port moderne sur la mer Jaune',
    coordinates: { lat: 38.9140, lng: 121.6147 },
    address: 'Dalian, Liaoning, Chine',
    category: 'city'
  },
  {
    id: '41',
    name: 'Port Tianjin',
    description: 'Port international pour ferry vers Corée',
    coordinates: { lat: 39.0842, lng: 117.2009 },
    address: 'Port de Tianjin, Chine',
    category: 'transport'
  },
  // === CORÉE DU SUD ===
  {
    id: '42',
    name: 'Incheon',
    description: 'Port d\'arrivée en Corée du Sud',
    coordinates: { lat: 37.4563, lng: 126.7052 },
    address: 'Incheon, Corée du Sud',
    category: 'city'
  },
  {
    id: '43',
    name: 'Séoul',
    description: 'Capitale de la Corée du Sud',
    coordinates: { lat: 37.5665, lng: 126.9780 },
    address: 'Séoul, Corée du Sud',
    category: 'city'
  }
];
