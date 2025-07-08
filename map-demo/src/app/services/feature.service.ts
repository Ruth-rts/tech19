import { Injectable, Signal, signal, inject } from '@angular/core';
import * as L from 'leaflet';
import { FeatureStorageService } from './feature-storage.service';
import {
  Feature,
  FeatureData,
  NewFeatureRequest,
  FeatureType,
} from '../models/feature.model';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  private _features = signal<Feature[]>([]);
  public features: Signal<Feature[]> = this._features.asReadonly();
  private _pendingFeature = signal<NewFeatureRequest | null>(null);
  public pendingFeature: Signal<NewFeatureRequest | null> =
    this._pendingFeature.asReadonly();
  private _resetDrawing = signal(0);
  public resetDrawing = this._resetDrawing.asReadonly();

  private featureStorageService = inject(FeatureStorageService);

  /*Sets a new feature request with the given name and type. */
  setNewFeature(name: string, type: FeatureType): void {
    this._pendingFeature.set({ name: name, type: type });
  }

  /* Adds a new feature to the features list and saves to storage.*/
  addFeature(feature: Omit<Feature, 'id'>): number {
    const id = Date.now();
    //push new feature
    this._features.update((current) => [...current, { ...feature, id }]);
    this.saveToStorage();
    return id;
  }

  /* Updates an existing feature's coordinates and layer, then saves to storage */
  updateFeature(id: number, coordinates: L.LatLng[], layer: L.Layer): void {
    this._features.update((current) =>
      current.map((feature) =>
        feature.id === id ? { ...feature, coordinates, layer } : feature
      )
    );
    this.saveToStorage();
  }

  /* Triggers a signal to reset the drawing state */
  triggerResetDrawing(): void {
    this._resetDrawing.set(Date.now());
  }

  /* Saves the current features list to local storage */
  saveToStorage(): void {
    this.featureStorageService.saveToStorage(this._features());
  }
 
  /* Loads features from local storage and clears the current features list */
  getSavedFeatures(): FeatureData[] {
    this.clearFeatures();
    return this.featureStorageService.loadFromStorage();
  }

  /* Clears all features from the in-memory features list */
  clearFeatures(): void {
    this._features.set([]);
  }
}
