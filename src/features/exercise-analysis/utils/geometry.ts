import { NormalizedLandmark } from '@mediapipe/tasks-vision';

/**
 * Calculates the 2D angle (in degrees) between three points (a, b, c) where b is the vertex.
 */
export const calculateAngle = (a: NormalizedLandmark, b: NormalizedLandmark, c: NormalizedLandmark): number => {
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180.0) / Math.PI);
  
  if (angle > 180.0) {
    angle = 360.0 - angle;
  }
  
  return angle;
};

/**
 * Calculates the 2D Euclidean distance between two landmarks.
 */
export const calculateDistance = (p1: NormalizedLandmark, p2: NormalizedLandmark): number => {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Calculates the 3D Euclidean distance between two landmarks.
 */
export const calculateDistance3D = (p1: NormalizedLandmark, p2: NormalizedLandmark): number => {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const dz = p1.z - p2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

/**
 * Checks if a landmark has good visibility.
 * MediaPipe visibility ranges from 0.0 (not visible) to 1.0 (highly visible).
 */
export const isVisible = (landmark: NormalizedLandmark, threshold = 0.5): boolean => {
  return (landmark.visibility ?? 1.0) > threshold;
};

/**
 * Calculates the average of multiple points.
 */
export const getMidpoint = (p1: NormalizedLandmark, p2: NormalizedLandmark): NormalizedLandmark => {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
    z: (p1.z + p2.z) / 2,
    visibility: Math.min(p1.visibility ?? 1, p2.visibility ?? 1)
  };
};

/**
 * Calculates vertical alignment deviation (e.g. for checking if a joint is directly above another).
 * Returns the horizontal difference (0 means perfectly vertically aligned).
 */
export const getHorizontalDeviation = (upper: NormalizedLandmark, lower: NormalizedLandmark): number => {
  return Math.abs(upper.x - lower.x);
};

/**
 * Smoothing function (Exponential Moving Average) to reduce jitter in landmark tracking over frames.
 */
export const smoothValue = (currentValue: number, previousValue: number | null, alpha = 0.2): number => {
  if (previousValue === null) return currentValue;
  return (alpha * currentValue) + ((1 - alpha) * previousValue);
};
