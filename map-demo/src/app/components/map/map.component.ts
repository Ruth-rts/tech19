import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-shadow.png';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FeatureService } from '../../services/feature.service';
import {
  Feature,
  FeatureType,
  FEATURE_TYPES,
} from '../../models/feature.model';
import { signal, computed, inject, effect } from '@angular/core';
import { FEATURE_COLORS, Mode } from '../../models/feature.model';
import { registerDefaultLeafletIcon } from '../../utils/leaflet-icon';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent {
  featureService = inject(FeatureService);
  pendingFeature = this.featureService.pendingFeature;
  selectedFeature = input<Feature | null>(null);

  private map!: L.Map;
  mode: Mode = null;
  private livePolygon: L.Polygon | null = null;
  private livePolyline: L.Polyline | null = null;
  public points: L.LatLng[] = [];
  private liveFeatureId: number | null = null;

  /**
   * Sets up effects for new feature creation, feature selection, and drawing reset.
   */
  constructor() {
    // Register default Leaflet icons for markers
    registerDefaultLeafletIcon();
    // Effect: When a new feature is created, enable drawing mode and set the feature name.
    effect(() => {
      const feature = this.pendingFeature();

      if (feature) {
        this.enableMode(feature.type);
      }
    });

    // Effect: When a feature is selected, zoom to it on the map.
    effect(() => {
      const selected = this.selectedFeature();
      if (selected) {
        this.zoomFeature(selected);
      }
    });

    // Effect: When drawing is reset, clear the drawing state.
    effect(() => {
      this.featureService.resetDrawing();
      this.resetDrawingState();
    });
  }

  featureName = computed(() => {
    const feature = this.pendingFeature();
    return feature ? feature.name : '';
  });

  // mode = computed(() => {
  //   const feature = this.pendingFeature();
  //   return feature ? feature.type : null;
  // });

  /* Initializes the map and loads saved features after the view is initialized.*/
  ngAfterViewInit(): void {
    this.initMap();
  }

  /*
   * Enables drawing mode for the given feature type.
   * @param featureType The type of feature to draw (marker, polygon, line)
   */
  enableMode(featureType: FeatureType): void {
    this.resetDrawingState();
    this.mode = featureType;
  }

  /* Initializes the Leaflet map and sets up click handlers for drawing features.*/
  private initMap(): void {
    try {
      // Create the map and set the initial view to Tel Aviv
      this.map = L.map('map').setView([32.08, 34.78], 10);

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);
    } catch (err) {
      console.error('Error initializing the map:', err);
    }

    this.initMapWithSavedFeatures();

    // Handle map clicks for drawing features
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const latlng = e.latlng;

      switch (this.mode) {
        case FEATURE_TYPES.marker:
          // Add a marker at the clicked location
          const marker = L.marker(latlng).addTo(this.map);
          this.createFeature(marker, FEATURE_TYPES.marker, [latlng]);
          this.resetDrawingState();
          return;

        case FEATURE_TYPES.polygon:
          // Add a point to the polygon and show a small circle marker
          this.points.push(latlng);
          L.circleMarker(latlng, {
            radius: 5,
            color: FEATURE_COLORS.polygon,
          }).addTo(this.map);

          if (!this.livePolygon) {
            // First point: create the polygon layer
            this.livePolygon = L.polygon(this.points, {
              color: FEATURE_COLORS.polygon,
            }).addTo(this.map);

            // Register the new polygon feature
            this.createFeature(
              this.livePolygon,
              FEATURE_TYPES.polygon,
              this.points
            );
          } else {
            // Add more points: update the polygon shape
            this.livePolygon.setLatLngs(this.points);
            this.updateFeature(this.livePolygon);
          }
          return;

        case FEATURE_TYPES.line:
          // Add a point to the line and show a small circle marker
          this.points.push(latlng);
          L.circleMarker(latlng, {
            radius: 5,
            color: FEATURE_COLORS.line,
          }).addTo(this.map);

          if (!this.livePolyline) {
            // First point: create the polyline layer
            this.livePolyline = L.polyline(this.points, {
              color: FEATURE_COLORS.line,
            }).addTo(this.map);

            // Register the new line feature
            this.createFeature(
              this.livePolyline,
              FEATURE_TYPES.line,
              this.points
            );
          } else {
            // Add more points: update the polyline shape
            this.livePolyline.setLatLngs(this.points);
            this.updateFeature(this.livePolyline);
          }

          return;

        default:
          // No drawing mode selected or unknown mode
          console.warn('Unknown feature type:', this.mode);
          return;
      }
    });
  }

  /**
   * Creates a new feature and adds it to the feature service.
   * @param layer The Leaflet layer representing the feature
   * @param type The type of feature (marker, polygon, line)
   * @param coordinates The coordinates of the feature
   */
  createFeature(
    layer: L.Layer,
    type: FeatureType,
    coordinates: L.LatLng[]
  ): void {
    layer.bindTooltip(this.featureName()).openTooltip();

    let id = this.featureService.addFeature({
      name: this.featureName(),
      type: type,
      coordinates: coordinates,
      layer: layer,
    });
    this.liveFeatureId = id; // Store the ID for updates
  }

  /* Updates the coordinates of the currently drawn feature.*/
  updateFeature(layer: L.Layer): void {
    if (this.liveFeatureId !== null) {
      this.featureService.updateFeature(this.liveFeatureId, this.points, layer);
    }
  }

  /* Resets the drawing state and clears any in-progress drawing.*/
  private resetDrawingState(): void {
    this.mode = null;
    this.points = [];
    this.livePolygon = null;
    this.livePolyline = null;
    this.liveFeatureId = null;
  }

  /* Zooms the map to the selected feature. */
  zoomFeature(feature: Feature): void {
    const layer = feature.layer;

    if (feature.type === FEATURE_TYPES.marker) {
      this.map.setView(feature.coordinates[0], 16);
    } else if (
      feature.type === FEATURE_TYPES.polygon ||
      feature.type === FEATURE_TYPES.line
    ) {
      if ('getBounds' in layer) {
        this.map.fitBounds((layer as any).getBounds());
      }
    }
  }

  /* Loads features from storage and adds them to the map and feature service.*/
  initMapWithSavedFeatures(): void {

    const saved = this.featureService.getSavedFeatures();

    for (const f of saved) {
      const latlngs = f.coordinates.map(([lat, lng]) => L.latLng(lat, lng));
      let layer: L.Layer;

      switch (f.type) {
        case FEATURE_TYPES.marker:
          layer = L.marker(latlngs[0]).addTo(this.map);
          break;
        case FEATURE_TYPES.polygon:
          layer = L.polygon(latlngs, {
            color: FEATURE_COLORS.polygon,
          }).addTo(this.map);
          break;
        case FEATURE_TYPES.line:
          layer = L.polyline(latlngs, {
            color: FEATURE_COLORS.line,
          }).addTo(this.map);
          break;
        default:
          console.warn('Unknown feature type:', f.type);
          continue;
      }

      layer.bindTooltip(f.name);

      this.featureService.addFeature({
        ...f,
        coordinates: latlngs,
        layer,
      });
    }
  }
}
