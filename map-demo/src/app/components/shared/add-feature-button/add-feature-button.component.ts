import {
  Component,
  EventEmitter,
  Output,
  input,
  signal,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FeatureType } from '../../../models/feature.model';

@Component({
  selector: 'app-add-feature-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <button
      mat-raised-button
      [color]="color()"
      [disabled]="disabled()"
      (click)="clicked.emit(type())"
    >
      {{ label() }}
    </button>
  `,
  styleUrl: './add-feature-button.component.scss',
})
export class AddFeatureButtonComponent {
  label = input<string>();
  type = input<FeatureType>();
  color = input<string>('basic');
  disabled = input<boolean>(false);

  @Output() clicked = new EventEmitter<FeatureType>();
}
