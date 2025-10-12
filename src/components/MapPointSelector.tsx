'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Map, { MapRef, Marker } from 'react-map-gl';
import type { MapLayerMouseEvent, ViewState } from 'react-map-gl';
import type { Style } from 'mapbox-gl';
import clsx from 'clsx';
import { FREE_STYLES, MAPBOX_STYLES } from './Map';

type Coordinates = { lat: number; lng: number };

type MapPointSelectorProps = {
  selectedCoordinates: Coordinates | null;
  onSelect: (coordinates: Coordinates) => void;
  className?: string;
};

const DEFAULT_VIEW: ViewState = {
  latitude: 46.2276, // Centre approximatif de la France métropolitaine
  longitude: 2.2137,
  zoom: 4.2,
  bearing: 0,
  pitch: 0,
};

export default function MapPointSelector({
  selectedCoordinates,
  onSelect,
  className,
}: MapPointSelectorProps) {
  const mapRef = useRef<MapRef>(null);
  const [viewState, setViewState] = useState<ViewState>(DEFAULT_VIEW);

  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const hasMapboxToken = Boolean(mapboxAccessToken);
  const finalMapStyle: string | Style = hasMapboxToken ? MAPBOX_STYLES.streets : FREE_STYLES.osm;

  useEffect(() => {
    if (!selectedCoordinates) {
      return;
    }

    const { lat, lng } = selectedCoordinates;

    setViewState((previous) => ({
      ...previous,
      latitude: lat,
      longitude: lng,
      zoom: Math.max(previous.zoom, 9),
    }));

    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [lng, lat],
        zoom: Math.max(mapRef.current.getZoom(), 9),
        duration: 600,
        essential: true,
      });
    }
  }, [selectedCoordinates]);

  const marker = useMemo(() => {
    if (!selectedCoordinates) {
      return null;
    }

    return (
      <Marker longitude={selectedCoordinates.lng} latitude={selectedCoordinates.lat} anchor="bottom">
        <div className="pointer-events-none flex -translate-y-1 flex-col items-center gap-1">
          <span className="rounded-full bg-blue-600/80 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
            Point sélectionné
          </span>
          <span className="h-3 w-3 rounded-full border border-white bg-blue-600 shadow-md" />
        </div>
      </Marker>
    );
  }, [selectedCoordinates]);

  const handleClick = (event: MapLayerMouseEvent) => {
    const { lat, lng } = event.lngLat;
    onSelect({ lat, lng });
  };

  return (
    <div className={clsx('relative overflow-hidden rounded-lg border border-gray-200', className)}>
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxAccessToken}
        style={{ width: '100%', height: '100%' }}
        mapStyle={finalMapStyle}
        {...viewState}
        onMove={(event) => setViewState(event.viewState)}
        onClick={handleClick}
        scrollZoom
        doubleClickZoom
      >
        {marker}
      </Map>

      <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
        Cliquez pour placer votre étape
      </div>
    </div>
  );
}
