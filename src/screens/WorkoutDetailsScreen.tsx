import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { BottomNavigation } from '../components/BottomNavigation';
import { TabId } from '../types';

interface WorkoutDetailsScreenProps {
  onBack: () => void;
  onNavigateTab: (tab: TabId) => void;
  workoutId?: string;
}

export const WorkoutDetailsScreen: React.FC<WorkoutDetailsScreenProps> = ({
  onBack,
  onNavigateTab,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>('treino');

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    onNavigateTab(tab);
  };

  return (
    <div className="relative w-full h-full min-h-screen sm:min-h-full flex-1 bg-[var(--color-fit-bg)] text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Top Header */}
        <div className="px-5 pt-8 pb-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-zinc-900 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="font-sans font-black italic text-xl uppercase tracking-tight absolute left-1/2 -translate-x-1/2">
            Treinos
          </h1>
          <div className="w-10"></div>
        </div>

        {/* Hero Image */}
        <div className="px-5">
          <div className="w-full h-56 rounded-3xl overflow-hidden relative border border-white/5 bg-[var(--color-fit-panel)]">
            <img
              src="https://images.unsplash.com/photo-1586066626552-8aa966ca853c?auto=format&fit=crop&q=80&w=1080"
              alt="HIIT + treino corporal"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="px-5 mt-6 flex flex-col gap-3">
          <h2 className="font-sans font-black italic text-[22px] uppercase tracking-tight">
            HIIT + treino corporal
          </h2>
          <p className="text-[var(--color-fit-muted)] text-[13px] font-medium leading-relaxed max-w-[95%]">
            Desenvolva força explosiva com uma sessão rápida guiada, feita para pouco tempo e alta intensidade.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="px-5 mt-6 flex gap-3">
          {/* Metric 1 */}
          <div className="flex-1 bg-[var(--color-fit-panel)] rounded-[20px] p-4 flex flex-col justify-center">
            <span className="font-sans font-black text-sm text-white">
              40 min
            </span>
            <span className="text-[var(--color-fit-muted)] text-[11px] font-bold uppercase mt-1">
              Duração
            </span>
          </div>
          {/* Metric 2 */}
          <div className="flex-1 bg-[var(--color-fit-panel)] rounded-[20px] p-4 flex flex-col justify-center">
            <span className="font-sans font-black text-sm text-white">
              12 ex.
            </span>
            <span className="text-[var(--color-fit-muted)] text-[11px] font-bold uppercase mt-1">
              Movimentos
            </span>
          </div>
          {/* Metric 3 */}
          <div className="flex-1 bg-[var(--color-fit-panel)] rounded-[20px] p-4 flex flex-col justify-center">
            <span className="font-sans font-black text-sm text-white">
              320 kcal
            </span>
            <span className="text-[var(--color-fit-muted)] text-[11px] font-bold uppercase mt-1">
              Gasto
            </span>
          </div>
        </div>

        {/* Location Section */}
        <div className="px-5 mt-8 flex flex-col gap-4">
          <h3 className="font-sans font-black italic text-base uppercase tracking-tight">
            Localização
          </h3>
          <div className="w-full h-24 bg-[var(--color-fit-panel-2)] rounded-3xl overflow-hidden relative flex items-center justify-center opacity-80 border border-white/5">
            <span className="text-[var(--color-fit-muted)] text-xs font-bold uppercase tracking-widest">
              Mapa
            </span>
            {/* If we had a map image, it would go here */}
          </div>
        </div>

        {/* Action Button */}
        <div className="px-5 mt-8 mb-4 flex justify-center">
          <button className="w-full max-w-[300px] h-14 bg-[var(--color-fit-green)] rounded-xl flex items-center justify-center cursor-pointer active:scale-95 transition-transform">
            <span className="text-black font-sans font-black italic text-[15px] uppercase tracking-wide">
              Ver agenda
            </span>
          </button>
        </div>
      </div>

      
      
    </div>
  );
};
