import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
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
  const [isOpen, setIsOpen] = useState(false);

  const currentStyleOption = STYLE_OPTIONS.find(style => style.value === currentStyle) || STYLE_OPTIONS[0];

  const handleStyleSelect = (styleValue: string) => {
    onStyleChange(styleValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Bouton principal compact */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/90 backdrop-blur-md rounded-lg px-3 py-2 shadow-lg border border-white/30 flex items-center gap-2 hover:bg-white/95 transition-all duration-200 min-w-[160px]"
      >
        <span className="text-sm">{currentStyleOption.emoji}</span>
        <span className="text-sm font-medium text-black flex-1 text-left">
          {currentStyleOption.label}
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Menu déroulant */}
      {isOpen && (
        <>
          {/* Overlay pour fermer en cliquant ailleurs */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Liste des options */}
          <div className="absolute top-full mt-1 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/30 min-w-[200px] z-20">
            <div className="p-2">
              <div className="text-xs font-medium text-gray-600 mb-2 px-1">🎨 Choisir un style</div>
              <div className="space-y-1">
                {STYLE_OPTIONS.map((style) => (
                  <button
                    key={style.value}
                    onClick={() => handleStyleSelect(style.value)}
                    className={`w-full text-left px-2 py-2 rounded transition-all duration-200 hover:bg-black/10 ${
                      currentStyle === style.value
                        ? 'bg-black/20 text-black font-medium'
                        : 'text-gray-700 hover:text-black'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{style.emoji}</span>
                      <div className="flex-1">
                        <span className="text-sm">{style.label}</span>
                        <div className="text-xs text-gray-500">{style.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
