import { Injectable } from '@angular/core';
import { Feature, FeatureData } from '../models/feature.model';

@Injectable({
  providedIn: 'root',
})
export class FeatureStorageService {
  constructor() {}

  saveToStorage(features: Feature[]): void {
    const data: FeatureData[] = features.map((f) => ({
      id: f.id,
      name: f.name,
      type: f.type,
      coordinates: f.coordinates.map((c) => [c.lat, c.lng]),
    }));

    localStorage.setItem('features', JSON.stringify(data));
  }

  loadFromStorage(): FeatureData[] {
    const raw = localStorage.getItem('features');
    return raw ? JSON.parse(raw) : [];
  }
}
