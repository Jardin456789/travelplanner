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
    <div className="bg-white/90 backdrop-blur-md rounded-lg p-3 shadow-lg border border-white/30 min-w-[200px]">
      <div className="text-sm font-medium text-black mb-2">🎨 Style de carte</div>
      <div className="space-y-1">
        {STYLE_OPTIONS.map((style) => (
          <button
            key={style.value}
            onClick={() => onStyleChange(style.value)}
            className={`w-full text-left px-2 py-1 rounded transition-all duration-200 hover:bg-black/10 ${
              currentStyle === style.value
                ? 'bg-black/20 text-black font-medium'
                : 'text-gray-700 hover:text-black'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{style.emoji}</span>
              <span className="text-xs">{style.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
