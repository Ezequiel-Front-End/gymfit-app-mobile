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

interface HomeScreenProps {
  user?: UserProfile | null;
  onLogout?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<TabId>('inicio');
  const [hasNotification, setHasNotification] = useState(true);
  const [selectedTrainingType, setSelectedTrainingType] = useState<string>('Aquecimento');

  const displayName = user?.name ? user.name : 'Melissa';

  // Hero workout image with athletic woman in lime fitness top
  const heroImage =
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=900&auto=format&fit=crop';

  return (
    <div className="relative w-full h-full min-h-screen sm:min-h-full flex-1 bg-black text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Scrollable Main Content */}
      <div className="flex-1 px-5 pt-6 pb-28 flex flex-col gap-6 max-w-md mx-auto w-full overflow-y-auto no-scrollbar">
        {/* Top Header: Greeting & Notification Icon */}
        <header className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-zinc-400 text-xs sm:text-[13px] font-medium tracking-wide">
              Bem-vinda, {displayName}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <h1 className="font-display font-black italic text-2xl sm:text-[26px] text-white tracking-tight uppercase">
                Treinos GYMFIT
              </h1>
              {/* Flame Icon matching exact image */}
              <Flame className="w-5 h-5 text-white fill-white shrink-0" />
            </div>
          </div>

          {/* Notification Bell Button */}
          <button
            type="button"
            onClick={() => setHasNotification(false)}
            aria-label="Notificações"
            className="relative p-2 rounded-full hover:bg-zinc-900 transition text-white cursor-pointer"
          >
            <Bell className="w-6 h-6 stroke-[1.8]" />
            {hasNotification && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#D4FF00] ring-2 ring-[#060608]" />
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
            <h2 className="font-display font-black italic text-xl sm:text-2xl text-white uppercase leading-tight tracking-tight drop-shadow-md">
              Treino Corpo Inteiro
            </h2>
            <p className="text-zinc-300 text-xs sm:text-sm font-medium mt-1 mb-4 drop-shadow">
              40 min • 14 exercícios
            </p>

            {/* Iniciar Action Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-fit px-5 py-2.5 rounded-full bg-[#D4FF00] hover:bg-[#ddff22] text-black font-black italic text-xs sm:text-sm uppercase tracking-wide flex items-center gap-2 shadow-lg transition cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-black stroke-[2.5]" />
              <span>Iniciar</span>
            </motion.button>
          </div>
        </div>

        {/* Section: Tipos de treino */}
        <section className="flex flex-col gap-3">
          <h3 className="font-display font-black italic text-lg sm:text-xl text-white uppercase tracking-tight">
            Tipos de treino
          </h3>

          <div className="grid grid-cols-3 gap-3">
            {/* Aquecimento */}
            <button
              type="button"
              onClick={() => setSelectedTrainingType('Aquecimento')}
              className={`flex flex-col items-center justify-center gap-3 py-5 px-2 rounded-2xl transition cursor-pointer ${
                selectedTrainingType === 'Aquecimento'
                  ? 'bg-[#121217] border border-[#D4FF00]/40'
                  : 'bg-[#121217] border border-zinc-850/80 hover:border-zinc-750'
              }`}
            >
              <Flame className="w-6 h-6 text-[#D4FF00] stroke-[2]" />
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
                  ? 'bg-[#121217] border border-[#D4FF00]/40'
                  : 'bg-[#121217] border border-zinc-850/80 hover:border-zinc-750'
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
                  ? 'bg-[#121217] border border-[#D4FF00]/40'
                  : 'bg-[#121217] border border-zinc-850/80 hover:border-zinc-750'
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
          <h3 className="font-display font-black italic text-lg sm:text-xl text-white uppercase tracking-tight">
            Sessões rápidas
          </h3>

          <div className="flex flex-col gap-3">
            {/* Item 1: Equilíbrio funcional */}
            <div className="flex items-center gap-4 bg-[#121217] border border-zinc-850/90 rounded-2xl p-4 transition hover:border-zinc-750 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-zinc-900/60 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-[#D4FF00] stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black italic text-sm sm:text-base text-white tracking-tight uppercase">
                  Equilíbrio funcional
                </span>
                <span className="text-zinc-400 text-xs font-medium mt-0.5">
                  Iniciante • 12 min
                </span>
              </div>
            </div>

            {/* Item 2: Yoga para lombar */}
            <div className="flex items-center gap-4 bg-[#121217] border border-zinc-850/90 rounded-2xl p-4 transition hover:border-zinc-750 cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-zinc-900/60 flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5 text-[#D4FF00] stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black italic text-sm sm:text-base text-white tracking-tight uppercase">
                  Yoga para lombar
                </span>
                <span className="text-zinc-400 text-xs font-medium mt-0.5">
                  Iniciante • 12 min
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 
        Bottom Navigation Bar
        Matches exact screenshot:
        - Outer container rounded with rounded-[36px] / rounded-[32px] bottom corners and arched top corners
        - High-contrast lime green border (#D4FF00) along top edge
        - Deep solid black background
        - Custom icons: Home (rounded outline house), Pulse/ECG line (Atividades), Book open outline (Biblioteca), Person avatar outline (Perfil)
        - Floating lime circle button (#D4FF00) with soft dark-yellow/lime radial glow, containing the slanted dumbbell icon
      */}
      <div className="w-full max-w-md mx-auto relative z-40 px-3 pb-3 pt-4 pointer-events-auto shrink-0">
        <div className="relative w-full bg-black rounded-[36px] border-t-2 border-[#D4FF00] px-5 pt-3.5 pb-4 flex items-center justify-between shadow-[0_-12px_32px_rgba(0,0,0,0.95)]">
          {/* Left Wing Border highlight */}
          <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-[#D4FF00] -translate-y-[2px]" />

          {/* 1. Tab: Início */}
          <button
            type="button"
            onClick={() => setActiveTab('inicio')}
            className="flex flex-col items-center justify-center gap-1 cursor-pointer transition select-none group w-14"
          >
            {/* Custom Outline House Icon matching image */}
            <svg
              viewBox="0 0 24 24"
              className="w-[23px] h-[23px] stroke-white fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round transition-transform group-hover:scale-105"
            >
              <path d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 20v-9.5z" />
              <path d="M9 21.5V12h6v9.5" />
            </svg>
            <span className="text-[11px] font-black italic tracking-wide text-white font-display uppercase leading-tight">
              Início
            </span>
          </button>

          {/* 2. Tab: Atividades */}
          <button
            type="button"
            onClick={() => setActiveTab('atividades')}
            className="flex flex-col items-center justify-center gap-1 cursor-pointer transition select-none group w-16 mr-3"
          >
            {/* Custom Pulse / ECG line icon matching image */}
            <svg
              viewBox="0 0 24 24"
              className="w-[23px] h-[23px] stroke-white fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round transition-transform group-hover:scale-105"
            >
              <path d="M2.5 12h5l2.8-7 4.4 14 2.8-7h4" />
            </svg>
            <span className="text-[11px] font-black italic tracking-wide text-white font-display uppercase leading-tight">
              Atividades
            </span>
          </button>

          {/* 3. Floating Center Dumbbell Action Button with Radial Glow */}
          <div className="absolute left-1/2 -top-6 -translate-x-1/2 flex items-center justify-center">
            {/* Soft Ambient Lime Glow underneath */}
            <div className="absolute -inset-2.5 rounded-full bg-[#D4FF00] opacity-35 blur-md pointer-events-none" />

            <motion.button
              type="button"
              whileTap={{ scale: 0.93 }}
              whileHover={{ scale: 1.04 }}
              onClick={() => setActiveTab('treino')}
              className="relative w-[60px] h-[60px] rounded-full bg-[#D4FF00] text-black flex items-center justify-center shadow-[0_4px_24px_rgba(212,255,0,0.55)] border-[3.5px] border-black cursor-pointer hover:bg-[#ddff22] transition-all"
              aria-label="Iniciar Treino"
            >
              {/* Slanted Dumbbell Icon exactly matching the circle button in user's image */}
              <svg
                viewBox="0 0 26 26"
                className="w-7 h-7 stroke-black fill-none stroke-[2.4] stroke-linecap-round stroke-linejoin-round -rotate-45"
              >
                {/* Center Bar */}
                <line x1="7" y1="13" x2="19" y2="13" />
                {/* Left Inner Collar */}
                <line x1="8" y1="9" x2="8" y2="17" />
                {/* Left Outer Weight Plate */}
                <line x1="5" y1="10.5" x2="5" y2="15.5" />
                {/* Right Inner Collar */}
                <line x1="18" y1="9" x2="18" y2="17" />
                {/* Right Outer Weight Plate */}
                <line x1="21" y1="10.5" x2="21" y2="15.5" />
              </svg>
            </motion.button>
          </div>

          {/* 4. Tab: Biblioteca */}
          <button
            type="button"
            onClick={() => setActiveTab('biblioteca')}
            className="flex flex-col items-center justify-center gap-1 cursor-pointer transition select-none group w-16 ml-3"
          >
            {/* Custom Open Book Icon matching image */}
            <svg
              viewBox="0 0 24 24"
              className="w-[23px] h-[23px] stroke-white fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round transition-transform group-hover:scale-105"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              <path d="M12 2v18" />
            </svg>
            <span className="text-[11px] font-black italic tracking-wide text-white font-display uppercase leading-tight">
              Biblioteca
            </span>
          </button>

          {/* 5. Tab: Perfil */}
          <button
            type="button"
            onClick={() => setActiveTab('perfil')}
            className="flex flex-col items-center justify-center gap-1 cursor-pointer transition select-none group w-14"
          >
            {/* Custom User Avatar Icon matching image */}
            <svg
              viewBox="0 0 24 24"
              className="w-[23px] h-[23px] stroke-white fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round transition-transform group-hover:scale-105"
            >
              <circle cx="12" cy="8" r="4.2" />
              <path d="M4 20.5c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
            </svg>
            <span className="text-[11px] font-black italic tracking-wide text-white font-display uppercase leading-tight">
              Perfil
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
