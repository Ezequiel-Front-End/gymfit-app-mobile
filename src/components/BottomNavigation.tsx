import React from 'react';
import { motion } from 'motion/react';
import { TabId } from '../types';

interface BottomNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="w-full mx-auto relative z-40 px-0 pb-0 pt-6 pointer-events-auto shrink-0">
      <div className="relative w-full bg-[#0A0A0A] rounded-t-[32px] rounded-b-none border-t-[2px] border-[var(--color-fit-green)] px-6 pt-4 pb-6 flex items-center justify-between shadow-2xl">
        
        {/* 1. Tab: Início */}
        <button
          type="button"
          onClick={() => onTabChange('inicio')}
          className={`flex flex-col items-center justify-center gap-1.5 cursor-pointer transition select-none group w-14 ${
            activeTab === 'inicio' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className={`w-[22px] h-[22px] fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round transition-transform group-hover:scale-105 ${
              activeTab === 'inicio' ? 'stroke-[var(--color-fit-green)]' : 'stroke-white'
            }`}
          >
            <path d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 20v-9.5z" />
            <path d="M9 21.5V12h6v9.5" />
          </svg>
          <span
            className={`text-[12px] font-extrabold font-sans leading-tight ${
              activeTab === 'inicio' ? 'text-[var(--color-fit-green)]' : 'text-white'
            }`}
          >
            Início
          </span>
        </button>

        {/* 2. Tab: Atividades */}
        <button
          type="button"
          onClick={() => onTabChange('atividades')}
          className={`flex flex-col items-center justify-center gap-1.5 cursor-pointer transition select-none group w-16 mr-6 ${
            activeTab === 'atividades' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className={`w-[22px] h-[22px] fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round transition-transform group-hover:scale-105 ${
              activeTab === 'atividades' ? 'stroke-[var(--color-fit-green)]' : 'stroke-white'
            }`}
          >
            <path d="M2.5 12h5l2.8-7 4.4 14 2.8-7h4" />
          </svg>
          <span
            className={`text-[12px] font-extrabold font-sans leading-tight ${
              activeTab === 'atividades' ? 'text-[var(--color-fit-green)]' : 'text-white'
            }`}
          >
            Atividades
          </span>
        </button>

        {/* 3. Floating Center Dumbbell Action Button */}
        <div className="absolute left-1/2 -top-7 -translate-x-1/2 flex items-center justify-center z-50">
          <motion.button
            type="button"
            whileTap={{ scale: 0.93 }}
            whileHover={{ scale: 1.04 }}
            onClick={() => onTabChange('treino')}
            className={`relative w-[68px] h-[68px] rounded-full text-black flex items-center justify-center border-[6px] border-[#0A0A0A] cursor-pointer transition-all ${
              activeTab === 'treino'
                ? 'bg-[var(--color-fit-green)] scale-105'
                : 'bg-[var(--color-fit-green)] hover:bg-[#ddff22]'
            }`}
            style={{
              boxShadow: '0 0 35px 5px rgba(207, 255, 0, 0.4)'
            }}
            aria-label="Iniciar Treino"
          >
            {/* Slanted Dumbbell Icon */}
            <svg
              viewBox="0 0 26 26"
              className="w-[28px] h-[28px] stroke-black fill-none stroke-[2.5] stroke-linecap-round stroke-linejoin-round -rotate-45"
            >
              <line x1="7" y1="13" x2="19" y2="13" />
              <line x1="8" y1="9" x2="8" y2="17" />
              <line x1="5" y1="10.5" x2="5" y2="15.5" />
              <line x1="18" y1="9" x2="18" y2="17" />
              <line x1="21" y1="10.5" x2="21" y2="15.5" />
            </svg>
          </motion.button>
        </div>

        {/* 4. Tab: Biblioteca */}
        <button
          type="button"
          onClick={() => onTabChange('biblioteca')}
          className={`flex flex-col items-center justify-center gap-1.5 cursor-pointer transition select-none group w-16 ml-6 ${
            activeTab === 'biblioteca' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className={`w-[22px] h-[22px] fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round transition-transform group-hover:scale-105 ${
              activeTab === 'biblioteca' ? 'stroke-[var(--color-fit-green)]' : 'stroke-white'
            }`}
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <path d="M12 2v18" />
          </svg>
          <span
            className={`text-[12px] font-extrabold font-sans leading-tight ${
              activeTab === 'biblioteca' ? 'text-[var(--color-fit-green)]' : 'text-white'
            }`}
          >
            Biblioteca
          </span>
        </button>

        {/* 5. Tab: Perfil */}
        <button
          type="button"
          onClick={() => onTabChange('perfil')}
          className={`flex flex-col items-center justify-center gap-1.5 cursor-pointer transition select-none group w-14 ${
            activeTab === 'perfil' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className={`w-[22px] h-[22px] fill-none stroke-[2.2] stroke-linecap-round stroke-linejoin-round transition-transform group-hover:scale-105 ${
              activeTab === 'perfil' ? 'stroke-[var(--color-fit-green)]' : 'stroke-white'
            }`}
          >
            <circle cx="12" cy="8" r="4.2" />
            <path d="M4 20.5c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
          </svg>
          <span
            className={`text-[12px] font-extrabold font-sans leading-tight ${
              activeTab === 'perfil' ? 'text-[var(--color-fit-green)]' : 'text-white'
            }`}
          >
            Perfil
          </span>
        </button>
      </div>
    </div>
  );
};
