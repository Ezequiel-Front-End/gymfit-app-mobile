import { NormalizedLandmark } from '@mediapipe/tasks-vision';
import { ExerciseType } from '../models/ExerciseType';
import { ExerciseValidationResult } from '../models/types';

export interface ExerciseValidator {
  /**
   * Validates if the sequence of pose landmarks matches the expected exercise.
   * @param frames Array of frames, where each frame is an array of landmarks.
   * @param selectedExercise The exercise the user intends to perform.
   * @returns Validation result indicating if the exercise is valid and confidence.
   */
  validate(frames: NormalizedLandmark[][], selectedExercise: ExerciseType): ExerciseValidationResult;
}
