// src/app/utils/leaflet-icon.ts
import * as L from 'leaflet';

export function registerDefaultLeafletIcon(): void {
  const icon = L.icon({
    iconUrl: 'assets/leaflet/marker-icon.png',
    shadowUrl: 'assets/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  L.Marker.prototype.options.icon = icon;
}
