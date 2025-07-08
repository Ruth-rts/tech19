import { Component, inject, computed, output } from '@angular/core';
import { FeatureService } from '../../services/feature.service';
import { Feature } from '../../models/feature.model';
import { NgFor, CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-feature-list',
  imports: [NgFor, CommonModule, MatListModule],
  templateUrl: './feature-list.component.html',
  styleUrl: './feature-list.component.scss'
})
export class FeatureListComponent {
  featureService = inject(FeatureService);
  
  features = this.featureService.features;
  onSelect = output<Feature>();

  //Emits the selected feature when a feature is clicked.
  featureClick(feature: Feature): void {
    this.onSelect.emit(feature);
  }

}
