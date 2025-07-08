// src/app/utils/leaflet-icon.ts
import * as L from 'leaflet';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';

export function registerDefaultLeafletIcon(): void {
  const icon = L.icon({
    iconUrl: 'marker-icon.png',
    shadowUrl: 'marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  L.Marker.prototype.options.icon = icon;
}
