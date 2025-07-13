import { TestBed } from '@angular/core/testing';
import { FeatureStorageService } from './feature-storage.service';

describe('FeatureStorage.Service', () => {
  let service: FeatureStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
