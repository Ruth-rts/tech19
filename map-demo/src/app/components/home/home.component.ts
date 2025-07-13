import { Component, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';

import { FeatureListComponent } from '../feature-list/feature-list.component';
import { AddFeatureComponent } from '../add-feature/add-feature.component';
import { Feature } from '../../models/feature.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MapComponent,
    FeatureListComponent,
    AddFeatureComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @ViewChild(MapComponent) mapComponent!: MapComponent;

  selectFeature(feature: Feature) {
    this.mapComponent.zoomFeature(feature);
  }
}
