import { TestBed } from '@angular/core/testing';
import { FeatureService } from './feature.service';
import * as L from 'leaflet';
import { FeatureType } from '../models/feature.model';

describe('FeatureService', () => {
  let service: FeatureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a feature to the features list', () => {
    const mockFeature = {
      id: 1,
      name: 'Test Feature',
      type: 'marker' as FeatureType,
      coordinates: [L.latLng(0, 0)],
      layer: {} as L.Layer,
    };

    expect(service.features()).toEqual([]);

    service.addFeature(mockFeature);

    const features = service.features();
    expect(features.length).toBe(1);
    expect(features[0].name).toBe('Test Feature');
    expect(features[0].id).toBeGreaterThan(0);
  });
});
