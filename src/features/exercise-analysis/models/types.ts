import { NormalizedLandmark } from '@mediapipe/tasks-vision';
import { ExerciseType } from './ExerciseType';

export interface ExerciseAnalysis {
  exercise: ExerciseType;
  repetitions: number;
  score: number;
  metrics: {
    technique: number;
    rangeOfMotion: number;
    stability: number;
    symmetry: number;
  };
  issues: Issue[];
  goodPoints: string[];
}

export interface Issue {
  type: string;
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  repetitions: number[];
  message: string;
}

export interface AnalysisContext {
  fps: number;
  videoWidth: number;
  videoHeight: number;
}

export interface ExerciseValidationResult {
  isValid: boolean;
  confidence: number;
  detectedExercise?: ExerciseType;
  message?: string;
}
