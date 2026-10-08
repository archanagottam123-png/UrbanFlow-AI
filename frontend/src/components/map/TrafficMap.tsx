import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Junction } from '../../types';
import { getCongestionColor } from '../../utils/helpers';
import clsx from 'clsx';

interface TrafficMapProps {
  junctions: Junction[];
  center?: [number, number];
  zoom?: number;
  onJunctionClick?: (junction: Junction) => void;
  height?: string;
}

export default function TrafficMap({
  junctions,
  center = [12.9716, 77.5946],
  zoom = 12,
  onJunctionClick,
  height = '100%',
}: TrafficMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height, width: '100%', borderRadius: '12px' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {junctions.map((junction) => (
        <CircleMarker
          key={junction.id}
          center={[junction.lat, junction.lng]}
          radius={junction.congestionLevel === 'severe' ? 16 : junction.congestionLevel === 'high' ? 13 : 10}
          fillColor={getCongestionColor(junction.congestionLevel)}
          color={getCongestionColor(junction.congestionLevel)}
          weight={2}
          fillOpacity={0.7}
          opacity={1}
          eventHandlers={{
            click: () => onJunctionClick?.(junction),
          }}
        >
          <Popup>
            <div style={{ minWidth: '160px', fontFamily: 'Inter, sans-serif' }}>
              <strong>{junction.name}</strong><br />
              <span>City: {junction.city}</span><br />
              <span>Congestion: <strong style={{ color: getCongestionColor(junction.congestionLevel) }}>{junction.congestionLevel.toUpperCase()}</strong></span>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
