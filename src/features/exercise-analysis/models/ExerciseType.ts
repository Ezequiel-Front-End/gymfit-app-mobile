export enum ExerciseType {
  SQUAT = 'squat',
  BENCH_PRESS = 'bench_press',
  DEADLIFT = 'deadlift',
  BICEPS_CURL = 'biceps_curl',
  OVERHEAD_PRESS = 'overhead_press',
  LUNGE = 'lunge',
  PUSH_UP = 'push_up',
  LATERAL_RAISE = 'lateral_raise',
  UNKNOWN = 'unknown',
}

export const EXERCISE_TYPE_LABELS: Record<ExerciseType, string> = {
  [ExerciseType.SQUAT]: 'Agachamento',
  [ExerciseType.BENCH_PRESS]: 'Supino',
  [ExerciseType.DEADLIFT]: 'Levantamento Terra',
  [ExerciseType.BICEPS_CURL]: 'Rosca Direta',
  [ExerciseType.OVERHEAD_PRESS]: 'Desenvolvimento de Ombros',
  [ExerciseType.LUNGE]: 'Afundo',
  [ExerciseType.PUSH_UP]: 'Flexão',
  [ExerciseType.LATERAL_RAISE]: 'Elevação Lateral',
  [ExerciseType.UNKNOWN]: 'Desconhecido',
};
