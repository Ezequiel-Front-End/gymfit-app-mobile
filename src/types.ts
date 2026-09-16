export type ScreenId = 'splash' | 'welcome' | 'login' | 'signup' | 'home' | 'atividades' | 'treinos' | 'treino_detalhes' | 'novo_treino' | 'adicionar_exercicios' | 'exercise_detail' | 'perfil' | 'biblioteca';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type TabId = 'inicio' | 'atividades' | 'treino' | 'biblioteca' | 'perfil';
