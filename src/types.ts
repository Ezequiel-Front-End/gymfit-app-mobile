export type ScreenId = 'splash' | 'welcome' | 'login' | 'signup' | 'home';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type TabId = 'inicio' | 'atividades' | 'treino' | 'biblioteca' | 'perfil';
