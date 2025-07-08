import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FeatureService } from '../../services/feature.service';
import { FeatureType, FEATURE_TYPES } from '../../models/feature.model';
import { AddFeatureButtonComponent } from '../shared/add-feature-button/add-feature-button.component';

@Component({
  selector: 'app-add-feature',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    AddFeatureButtonComponent,
  ],
  templateUrl: './add-feature.component.html',
  styleUrl: './add-feature.component.scss',
})
export class AddFeatureComponent {
  featureService = inject(FeatureService);

  featureName = signal('');
  isFeatureNameValid = computed(() => this.featureName().trim().length > 0);
  FEATURE_TYPES = FEATURE_TYPES;

  //Adds a new feature of the given type
  addFeature(featureType: FeatureType): void {
    if (!this.isFeatureNameValid()) {
      console.warn('Feature name is invalid');
      return;
    }
    this.featureService.setNewFeature(this.featureName(), featureType);

    // Reset the feature name after adding
    this.featureName.set('');
  }

  /* Handles input changes for the feature name.
  Updates the signal and triggers drawing reset. */
  onInputChange(event: Event) {
    this.featureName.set((event.target as HTMLInputElement).value);
    this.featureService.triggerResetDrawing();
  }
}
