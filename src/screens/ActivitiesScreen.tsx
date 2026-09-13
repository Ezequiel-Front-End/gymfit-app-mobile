import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Footprints, Trophy, Droplets, Smile } from 'lucide-react';
import { BottomNavigation } from '../components/BottomNavigation';
import { TabId } from '../types';

interface ActivitiesScreenProps {
  onBack: () => void;
  onNavigateTab: (tab: TabId) => void;
}

export const ActivitiesScreen: React.FC<ActivitiesScreenProps> = ({
  onBack,
  onNavigateTab,
}) => {
  const [activeSegment, setActiveSegment] = useState<'hoje' | 'semana'>('hoje');
  const [activeTab, setActiveTab] = useState<TabId>('atividades');

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    onNavigateTab(tab);
  };

  return (
    <div className="relative w-full h-full min-h-screen sm:min-h-full flex-1 bg-[var(--color-fit-bg)] text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Top Header */}
      <div className="px-6 pt-10 pb-2 flex items-center">
        <h1 className="font-sans font-black italic text-2xl tracking-tight text-white">
          Atividades
        </h1>
      </div>

      {/* Segments */}
      <div className="px-5 flex items-center gap-3 mt-2 mb-6">
        <button
          onClick={() => setActiveSegment('hoje')}
          className={`px-5 py-2 rounded-full text-[13px] font-bold transition-colors ${
            activeSegment === 'hoje'
              ? 'bg-[var(--color-fit-green)] text-black'
              : 'bg-[var(--color-fit-panel)] text-[var(--color-fit-muted)] hover:text-white'
          }`}
        >
          Hoje
        </button>
        <button
          onClick={() => setActiveSegment('semana')}
          className={`px-5 py-2 rounded-full text-[13px] font-bold transition-colors ${
            activeSegment === 'semana'
              ? 'bg-[var(--color-fit-green)] text-black'
              : 'bg-[var(--color-fit-panel)] text-[var(--color-fit-muted)] hover:text-white'
          }`}
        >
          Esta semana
        </button>
      </div>

      {/* Activities List */}
      <div className="flex-1 px-5 flex flex-col gap-4 overflow-y-auto no-scrollbar pb-24">
        {/* Item 1 */}
        <div className="bg-[var(--color-fit-panel)] rounded-3xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--color-fit-green)]/10 flex items-center justify-center shrink-0">
            <Footprints className="w-6 h-6 text-[var(--color-fit-green)]" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-sans font-black italic text-base uppercase text-white tracking-tight">
              Você correu 7 km
            </h3>
            <p className="text-[var(--color-fit-muted)] text-xs font-medium mt-0.5">
              Acompanhe seu progresso e continue evoluindo.
            </p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="bg-[var(--color-fit-panel)] rounded-3xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFD166]/10 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6 text-[#FFD166]" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-sans font-black italic text-base uppercase text-white tracking-tight">
              Parabéns!
            </h3>
            <p className="text-[var(--color-fit-muted)] text-xs font-medium mt-0.5">
              Acompanhe seu progresso e continue evoluindo.
            </p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="bg-[var(--color-fit-panel)] rounded-3xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center shrink-0">
            <Droplets className="w-6 h-6 text-[#3B82F6]" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-sans font-black italic text-base uppercase text-white tracking-tight">
              Lembrete de hidratação
            </h3>
            <p className="text-[var(--color-fit-muted)] text-xs font-medium mt-0.5">
              Acompanhe seu progresso e continue evoluindo.
            </p>
          </div>
        </div>

        {/* Item 4 */}
        <div className="bg-[var(--color-fit-panel)] rounded-3xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EF4444]/10 flex items-center justify-center shrink-0">
            <Smile className="w-6 h-6 text-[#EF4444]" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-sans font-black italic text-base uppercase text-white tracking-tight">
              Hora do yoga
            </h3>
            <p className="text-[var(--color-fit-muted)] text-xs font-medium mt-0.5">
              Acompanhe seu progresso e continue evoluindo.
            </p>
          </div>
        </div>
      </div>

      
      
    </div>
  );
};
