import { describe, it, expect, beforeEach } from 'vitest';
import { HomeComponent } from './home.component';
import { Feature } from '../../models/feature.model';

describe('HomeComponent', () => {
  let component: HomeComponent;

  beforeEach(() => {
    component = new HomeComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedFeature when selectFeature is called', () => {
    const feature: Feature = {
      id: 1,
      name: 'Test',
      type: 'marker',
      coordinates: [],
      layer: {} as any
    };
    component.selectFeature(feature);
    expect(component.selectedFeature()).toEqual(feature);
  });
});
