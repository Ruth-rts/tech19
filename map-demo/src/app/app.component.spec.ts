import { describe, it, expect, beforeEach } from 'vitest';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app: AppComponent;

  beforeEach(() => {
    app = new AppComponent();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'map-demo' title`, () => {
    expect(app.title).toEqual('map-demo');
  });

  // Rendering tests are not supported in this plain class test.
  // If you want to test template rendering, use Angular's TestBed with a Vitest-compatible setup.
});
