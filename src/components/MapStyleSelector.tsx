import { MAPBOX_STYLES } from './Map';

interface MapStyleSelectorProps {
  currentStyle: string;
  onStyleChange: (style: string) => void;
}

const STYLE_OPTIONS = [
  { value: MAPBOX_STYLES.streets, label: 'Streets', emoji: '🗺️', description: 'Carte routière classique' },
  { value: MAPBOX_STYLES.satellite, label: 'Satellite', emoji: '🛰️', description: 'Vue satellite pure' },
  { value: MAPBOX_STYLES.satelliteStreets, label: 'Satellite+Streets', emoji: '🛰️', description: 'Satellite avec rues' },
  { value: MAPBOX_STYLES.outdoors, label: 'Outdoors', emoji: '🏔️', description: 'Activités extérieures' },
  { value: MAPBOX_STYLES.light, label: 'Light', emoji: '☀️', description: 'Thème clair' },
  { value: MAPBOX_STYLES.dark, label: 'Dark', emoji: '🌙', description: 'Thème sombre' },
  { value: MAPBOX_STYLES.navigationDay, label: 'Navigation Jour', emoji: '🚗', description: 'Conduite jour' },
  { value: MAPBOX_STYLES.navigationNight, label: 'Navigation Nuit', emoji: '🚗', description: 'Conduite nuit' },
];

export default function MapStyleSelector({ currentStyle, onStyleChange }: MapStyleSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {STYLE_OPTIONS.map((style) => (
        <button
          key={style.value}
          onClick={() => onStyleChange(style.value)}
          className={`glass-button rounded-lg p-3 text-left transition-all duration-300 hover:scale-105 ${
            currentStyle === style.value
              ? 'bg-black/20 border-black/40 text-black'
              : 'border-white/30 text-gray-700 hover:bg-white/20'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{style.emoji}</span>
            <span className="font-medium text-sm">{style.label}</span>
          </div>
          <p className="text-xs text-gray-500">{style.description}</p>
        </button>
      ))}

      <div className="col-span-2 mt-3 pt-3 border-t border-white/20">
        <p className="text-xs text-gray-500 text-center">
          💡 Pour des styles personnalisés, utilisez{' '}
          <a
            href="https://studio.mapbox.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:underline font-medium"
          >
            Mapbox Studio
          </a>
        </p>
      </div>
    </div>
  );
}
