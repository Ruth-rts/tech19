import { describe, it, expect, beforeEach } from 'vitest';
import { FeatureService } from './feature.service';
import { FeatureType } from '../models/feature.model';

describe('FeatureService', () => {
  let service: FeatureService;

  beforeEach(() => {
    service = new FeatureService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a feature and return an id', () => {
    const feature = { name: 'Test', type: 'marker' as FeatureType, coordinates: [], layer: {} as any };
    const id = service.addFeature(feature);
    expect(typeof id).toBe('number');
    expect(service.features().some(f => f.id === id)).toBe(true);
  });
});