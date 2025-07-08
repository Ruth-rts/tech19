import { describe, it, expect, beforeEach, vi } from 'vitest';
import { FeatureListComponent } from './feature-list.component';
import { Feature } from '../../models/feature.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FeatureService } from '../../services/feature.service';


describe('FeatureListComponent', () => {
  let component: FeatureListComponent;
  let fixture: ComponentFixture<FeatureListComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [FeatureListComponent, CommonModule],
      providers: [
        FeatureService, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selected feature when featureClick is called', () => {
    const feature: Feature = { id: 1, name: 'Test', type: 'marker', coordinates: [], layer: {} as any };
    const emitSpy = vi.spyOn(component.onSelect, 'emit');
    component.featureClick(feature);
    expect(emitSpy).toHaveBeenCalledWith(feature);
    expect(component).toBeTruthy();
  });

});
