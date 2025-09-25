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
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">🎨 Style de carte</h3>
      <div className="grid grid-cols-2 gap-2">
        {STYLE_OPTIONS.map((style) => (
          <button
            key={style.value}
            onClick={() => onStyleChange(style.value)}
            className={`p-3 rounded-lg border-2 text-left transition-all ${
              currentStyle === style.value
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{style.emoji}</span>
              <span className="font-medium text-sm">{style.label}</span>
            </div>
            <p className="text-xs text-gray-500">{style.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-2">
          💡 Pour des styles personnalisés, utilisez{' '}
          <a
            href="https://studio.mapbox.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Mapbox Studio
          </a>
        </p>
      </div>
    </div>
  );
}
