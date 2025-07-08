import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';
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
  selectedFeature = signal<Feature | null>(null);

  selectFeature(feature: Feature) {
    this.selectedFeature.set({ ...feature });
  }
}
