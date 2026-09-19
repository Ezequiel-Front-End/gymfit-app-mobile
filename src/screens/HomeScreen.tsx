import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bell,
  Play,
  Flame,
  Zap,
  Leaf,
} from 'lucide-react';
import { UserProfile, TabId } from '../types';
import { BottomNavigation } from '../components/BottomNavigation';

interface HomeScreenProps {
  user?: UserProfile | null;
  onLogout?: () => void;
  onNavigateTab?: (tab: TabId) => void;
  onOpenNotifications?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ user, onNavigateTab, onOpenNotifications }) => {
  const [activeTab, setActiveTab] = useState<TabId>('inicio');
  const [hasNotification, setHasNotification] = useState(true);
  const [selectedTrainingType, setSelectedTrainingType] = useState<string>('Aquecimento');

  const displayName = user?.name ? user.name : 'Melissa';

  // Hero workout image with athletic woman in lime fitness top
  const heroImage =
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=900&auto=format&fit=crop';

  return (
    <div className="relative w-full h-full min-h-screen sm:min-h-full flex-1 bg-[var(--color-fit-bg)] text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Scrollable Main Content */}
      <div className="flex-1 px-5 pt-16 pb-28 flex flex-col gap-6 max-w-md mx-auto w-full overflow-y-auto no-scrollbar">
        {/* Top Header: Greeting & Notification Icon */}
        <header className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[var(--color-fit-muted)] text-xs sm:text-[13px] font-medium tracking-wide">
              Bem-vinda, {displayName}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <h1 className="font-sans font-black italic text-2xl sm:text-[26px] text-white tracking-tight uppercase">
                Treinos GYMFIT
              </h1>
              {/* Flame Icon matching exact image */}
              <Flame className="w-5 h-5 text-white fill-white shrink-0" />
            </div>
          </div>

          {/* Notification Bell Button */}
          <button
            type="button"
            onClick={() => {
              setHasNotification(false);
              if (onOpenNotifications) onOpenNotifications();
            }}
            aria-label="Notificações"
            className="relative p-2 rounded-full hover:bg-zinc-900 transition text-white cursor-pointer"
          >
            <Bell className="w-6 h-6 stroke-[1.8]" />
            {hasNotification && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--color-fit-green)] ring-2 ring-[#060608]" />
            )}
          </button>
        </header>

        {/* Hero Card: Treino Corpo Inteiro */}
        <div className="relative w-full h-56 sm:h-60 rounded-[28px] overflow-hidden bg-[#0d0d12] shadow-2xl group border border-white/5">
          {/* Background Workout Image */}
          <img
            src={heroImage}
            alt="Treino Corpo Inteiro"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />

          {/* Dark Cinematic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />

          {/* Content inside Hero Card */}
          <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-6 max-w-[260px]">
            <h2 className="font-sans font-black italic text-xl sm:text-2xl text-white uppercase leading-tight tracking-tight drop-shadow-md">
              Treino Corpo Inteiro
            </h2>
            <p className="text-zinc-300 text-xs sm:text-sm font-medium mt-1 mb-4 drop-shadow">
              40 min • 14 exercícios
            </p>

            {/* Iniciar Action Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-fit px-5 py-2.5 rounded-full bg-[var(--color-fit-green)] hover:bg-[#ddff22] text-black font-black italic text-xs sm:text-sm uppercase tracking-wide flex items-center gap-2 shadow-lg transition cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-black stroke-[2.5]" />
              <span>Iniciar</span>
            </motion.button>
          </div>
        </div>

        {/* Section: Tipos de treino */}
        <section className="flex flex-col gap-3">
          <h3 className="font-sans font-black italic text-lg sm:text-xl text-white uppercase tracking-tight">
            Tipos de treino
          </h3>

          <div className="grid grid-cols-3 gap-3">
            {/* Aquecimento */}
            <button
              type="button"
              onClick={() => setSelectedTrainingType('Aquecimento')}
              className={`flex flex-col items-center justify-center gap-3 py-5 px-2 rounded-2xl transition cursor-pointer ${
                selectedTrainingType === 'Aquecimento'
                  ? 'bg-[var(--color-fit-panel)] border border-[var(--color-fit-green)]/40'
                  : 'bg-[var(--color-fit-panel)] border border-zinc-850/80 hover:border-zinc-750'
              }`}
            >
              <Flame className="w-6 h-6 text-[var(--color-fit-green)] stroke-[2]" />
              <span className="text-white text-xs font-bold tracking-tight">
                Aquecimento
              </span>
            </button>

            {/* Cardio */}
            <button
              type="button"
              onClick={() => setSelectedTrainingType('Cardio')}
              className={`flex flex-col items-center justify-center gap-3 py-5 px-2 rounded-2xl transition cursor-pointer ${
                selectedTrainingType === 'Cardio'
                  ? 'bg-[var(--color-fit-panel)] border border-[var(--color-fit-green)]/40'
                  : 'bg-[var(--color-fit-panel)] border border-zinc-850/80 hover:border-zinc-750'
              }`}
            >
              {/* Cardio Heart with ECG wave matching the screenshot */}
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-zinc-300 stroke-current fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round"
              >
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                <path d="M9 12h1.5l1 -2.5l2 5l1.5 -3.5l1 1h1.5" />
              </svg>
              <span className="text-white text-xs font-bold tracking-tight">
                Cardio
              </span>
            </button>

            {/* Força */}
            <button
              type="button"
              onClick={() => setSelectedTrainingType('Força')}
              className={`flex flex-col items-center justify-center gap-3 py-5 px-2 rounded-2xl transition cursor-pointer ${
                selectedTrainingType === 'Força'
                  ? 'bg-[var(--color-fit-panel)] border border-[var(--color-fit-green)]/40'
                  : 'bg-[var(--color-fit-panel)] border border-zinc-850/80 hover:border-zinc-750'
              }`}
            >
              {/* Dumbbell Icon matching screenshot */}
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-zinc-300 stroke-current fill-none stroke-[2] stroke-linecap-round stroke-linejoin-round"
              >
                <path d="M4 10l2 -2m3 -3l2 -2m-5 7l7 -7m1 11l2 -2m3 -3l2 -2m-5 7l7 -7m-8 -2l5 -5m-9 9l5 -5" />
              </svg>
              <span className="text-white text-xs font-bold tracking-tight">
                Força
              </span>
            </button>
          </div>
        </section>

        {/* Section: Sessões rápidas */}
        <section className="flex flex-col gap-3">
          <h3 className="font-sans font-black italic text-lg sm:text-xl text-white uppercase tracking-tight">
            Sessões rápidas
          </h3>

          <div className="flex flex-col gap-3">
            {/* Item 1: Equilíbrio funcional */}
            <div className="flex items-center gap-4 bg-[var(--color-fit-panel)] border border-zinc-850/90 rounded-2xl p-4 transition hover:border-zinc-750 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-zinc-900/60 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-[var(--color-fit-green)] stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-black italic text-sm sm:text-base text-white tracking-tight uppercase">
                  Equilíbrio funcional
                </span>
                <span className="text-[var(--color-fit-muted)] text-xs font-medium mt-0.5">
                  Iniciante • 12 min
                </span>
              </div>
            </div>

            {/* Item 2: Yoga para lombar */}
            <div className="flex items-center gap-4 bg-[var(--color-fit-panel)] border border-zinc-850/90 rounded-2xl p-4 transition hover:border-zinc-750 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-zinc-900/60 flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5 text-[var(--color-fit-green)] stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans font-black italic text-sm sm:text-base text-white tracking-tight uppercase">
                  Yoga para lombar
                </span>
                <span className="text-[var(--color-fit-muted)] text-xs font-medium mt-0.5">
                  Iniciante • 12 min
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      
    </div>
  );
};
