
export interface BaseFeature {
  id: number;
  name: string;
  type: FeatureType;
}

export interface Feature extends BaseFeature {
  coordinates: L.LatLng[];
  layer: L.Layer;
}

export interface FeatureData extends BaseFeature {
  coordinates: [number, number][];
}

export interface NewFeatureRequest {
  name: string;
  type: FeatureType;
}

export const FEATURE_TYPES = {
  marker: 'marker',
  polygon: 'polygon',
  line: 'line',
} as const;

export type FeatureType = (typeof FEATURE_TYPES)[keyof typeof FEATURE_TYPES];

export const FEATURE_COLORS: Record<FeatureType, string> = {
  marker: 'blue',
  polygon: '#1b9573',
  line: '#8d1471',
};

export type Mode = FeatureType | null;


