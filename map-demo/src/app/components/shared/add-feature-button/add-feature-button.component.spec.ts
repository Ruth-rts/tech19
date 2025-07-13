import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFeatureButtonComponent } from './add-feature-button.component';

describe('AddFeatureButton.Component', () => {
  let component: AddFeatureButtonComponent;
  let fixture: ComponentFixture<AddFeatureButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFeatureButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFeatureButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
