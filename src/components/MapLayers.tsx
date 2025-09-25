import React from 'react';
import { Source, Layer } from 'react-map-gl';

interface MapLayersProps {
  routeData: GeoJSON.Feature | null;
  destinationsGeoJson: GeoJSON.FeatureCollection;
}

export const MapLayers: React.FC<MapLayersProps> = ({ routeData, destinationsGeoJson }) => {
  return (
    <>
      {/* Ligne reliant les destinations - style discret blanc */}
      {routeData && (
        <Source id="route" type="geojson" data={{ type: 'FeatureCollection', features: [routeData] }}>
          <Layer
            id="route-line"
            type="line"
            paint={{
              'line-color': '#ffffff',
              'line-width': 2,
              'line-opacity': 0.6,
            }}
          />
        </Source>
      )}

      {/* Source GeoJSON pour les destinations avec clustering */}
      <Source
        id="destinations"
        type="geojson"
        data={destinationsGeoJson}
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        {/* Clusters */}
        <Layer
          id="clusters"
          type="circle"
          source="destinations"
          filter={['has', 'point_count']}
          paint={{
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#ffffff', // 1 point
              10,
              '#e5e7eb', // 10+ points
              25,
              '#d1d5db', // 25+ points
              50,
              '#9ca3af'  // 50+ points
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20, // 1 point
              10,
              25, // 10+ points
              25,
              30, // 25+ points
              50,
              35  // 50+ points
            ],
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff',
            'circle-opacity': 0.8
          }}
        />

        {/* Nombre de points dans les clusters */}
        <Layer
          id="cluster-count"
          type="symbol"
          source="destinations"
          filter={['has', 'point_count']}
          layout={{
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
          }}
          paint={{
            'text-color': '#374151'
          }}
        />

        {/* Points individuels (non clusterisés) */}
        <Layer
          id="unclustered-point"
          type="circle"
          source="destinations"
          filter={['!', ['has', 'point_count']]}
          paint={{
            'circle-color': [
              'case',
              ['get', 'isSelectedStep'], '#000000',
              ['get', 'isCurrentStep'], '#ffffff',
              ['get', 'isPastStep'], '#10b981',
              '#ffffff'
            ],
            'circle-radius': 8,
            'circle-stroke-width': 2,
            'circle-stroke-color': [
              'case',
              ['get', 'isSelectedStep'], '#000000',
              ['get', 'isCurrentStep'], '#ffffff',
              ['get', 'isPastStep'], '#059669',
              '#ffffff'
            ],
            'circle-opacity': [
              'case',
              ['get', 'isSelectedStep'], 0.9,
              ['get', 'isCurrentStep'], 0.9,
              0.8
            ]
          }}
        />
      </Source>
    </>
  );
};
