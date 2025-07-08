import { Injectable } from '@angular/core';
import { Feature, FeatureData } from '../models/feature.model';

@Injectable({
  providedIn: 'root',
})
export class FeatureStorageService {
  constructor() {}

  /**
   * Saves the given features array to local storage.
   * Only serializes id, name, type, and coordinates (as [lat, lng] pairs).
   * @param features The array of features to save
   */
  saveToStorage(features: Feature[]): void {
    const data: FeatureData[] = features.map((f) => ({
      id: f.id,
      name: f.name,
      type: f.type,
      coordinates: f.coordinates.map((c) => [c.lat, c.lng]),
    }));

    localStorage.setItem('features', JSON.stringify(data));
  }

  /**
   * Loads features from local storage and returns them as FeatureData[].
   * If nothing is stored, returns an empty array.
   */
  loadFromStorage(): FeatureData[] {
    const raw = localStorage.getItem('features');
    return raw ? JSON.parse(raw) : [];
  }
}
