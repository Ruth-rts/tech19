import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/angular';
import { HomeComponent } from './home.component';
import { FeatureListComponent } from '../feature-list/feature-list.component';
import { AddFeatureComponent } from '../add-feature/add-feature.component';
import { Feature } from '../../models/feature.model';
import { Component } from '@angular/core';
import * as L from 'leaflet';

// יצירת קומפוננטת map מדומה
@Component({
  selector: 'app-map',
  standalone: true,
  template: '',
})
class MockMapComponent {
  zoomFeature = vi.fn();
}

describe('HomeComponent', () => {
  let mapComponentInstance: MockMapComponent;

  beforeEach(async () => {
    const renderResult = await render(HomeComponent, {
      imports: [
        FeatureListComponent,
        AddFeatureComponent,
        MockMapComponent, // mock במקום map האמיתית
      ],
      declarations: [],
    });

    // אחזור אינסטנס של הקומפוננטה המדומה דרך DOM
    const mapElement = renderResult.fixture.debugElement.query(
      (el: any) => el.componentInstance instanceof MockMapComponent
    );
    mapComponentInstance = mapElement.componentInstance as MockMapComponent;

    // קישור אינסטנס mapComponent ל־HomeComponent (כמו ViewChild)
    renderResult.fixture.componentInstance.mapComponent = mapComponentInstance;
  });

  it('should call zoomFeature on mapComponent when selectFeature is called', () => {
    const mockFeature: Feature = {
      id: 1,
      name: 'Test Feature',
      type: 'marker',
      coordinates: [L.latLng(32.0, 34.0)],
      layer: {} as any,
    };

    const home = new HomeComponent();
    home.mapComponent = mapComponentInstance as unknown as any;
    home.selectFeature(mockFeature);

    expect(mapComponentInstance.zoomFeature).toHaveBeenCalledWith(mockFeature);
  });
});
