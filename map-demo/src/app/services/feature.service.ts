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

  setNewFeature(name: string, type: FeatureType): void {
    this._pendingFeature.set({ name: name, type: type });
  }

  addFeature(feature: Omit<Feature, 'id'>): number {
    const id = Date.now();
    //push new feature
    this._features.update((current) => [...current, { ...feature, id }]);
    this.saveToStorage();
    return id;
  }

  updateFeature(id: number, coordinates: L.LatLng[], layer: L.Layer): void {
    this._features.update((current) =>
      current.map((feature) =>
        feature.id === id ? { ...feature, coordinates, layer } : feature
      )
    );
    this.saveToStorage();
  }

  triggerResetDrawing(): void {
    this._resetDrawing.set(Date.now());
  }

  saveToStorage(): void {
    this.featureStorageService.saveToStorage(this._features());
  }

  getSavedFeatures(): FeatureData[] {
    this.clearFeatures();
    return this.featureStorageService.loadFromStorage();
  }

  clearFeatures(): void {
    this._features.set([]);
  }
}
