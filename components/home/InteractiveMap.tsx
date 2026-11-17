"use client";

import { useEffect } from 'react';
import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip, useMap } from 'react-leaflet';
import type { Coordinate } from '../../data/data';

type InteractiveMapProps = {
  origin: Coordinate;
  destination: Coordinate;
  originLabel: string;
  destinationLabel: string;
};

function FitRoute({ origin, destination }: Pick<InteractiveMapProps, 'origin' | 'destination'>) {
  const map = useMap();

  useEffect(() => {
    map.fitBounds([origin, destination], { padding: [36, 36], maxZoom: 5 });
  }, [destination, map, origin]);

  return null;
}

export default function InteractiveMap({
  origin,
  destination,
  originLabel,
  destinationLabel
}: InteractiveMapProps) {
  return (
    <MapContainer
      center={[(origin[0] + destination[0]) / 2, (origin[1] + destination[1]) / 2]}
      zoom={3}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitRoute origin={origin} destination={destination} />
      <Polyline positions={[origin, destination]} pathOptions={{ color: '#b23a56', weight: 3, dashArray: '8 8' }} />
      <CircleMarker center={origin} radius={7} pathOptions={{ color: '#fffaf2', weight: 2, fillColor: '#b23a56', fillOpacity: 1 }}>
        <Tooltip direction="top" offset={[0, -8]}>{originLabel}</Tooltip>
      </CircleMarker>
      <CircleMarker center={destination} radius={7} pathOptions={{ color: '#fffaf2', weight: 2, fillColor: '#b23a56', fillOpacity: 1 }}>
        <Tooltip direction="top" offset={[0, -8]}>{destinationLabel}</Tooltip>
      </CircleMarker>
    </MapContainer>
  );
}
