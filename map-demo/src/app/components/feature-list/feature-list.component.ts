import { Component, inject, computed, output } from '@angular/core';
import { FeatureService } from '../../services/feature.service';
import { Feature } from '../../models/feature.model';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-feature-list',
  imports: [CommonModule, MatListModule],
  templateUrl: './feature-list.component.html',
  styleUrl: './feature-list.component.scss',
})
export class FeatureListComponent {
  featureService = inject(FeatureService);

  features = this.featureService.features;
  onSelect = output<Feature>();

  featureClick(feature: Feature): void {
    this.onSelect.emit(feature);
  }

  clearAllFeatures(): void {
    this.featureService.clearAll(); // implement this method in the service
  }
}
