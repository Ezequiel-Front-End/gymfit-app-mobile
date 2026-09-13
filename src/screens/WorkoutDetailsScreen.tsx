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
      <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
        {/* Top Header */}
        <div className="px-5 pt-8 pb-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-1 -ml-1 rounded-full hover:bg-zinc-900 transition-colors"
          >
            <ChevronLeft className="w-[22px] h-[22px] text-white" />
          </button>
          <h1 className="font-sans font-black italic text-[16px]">
            Treinos
          </h1>
        </div>

        {/* Hero Image */}
        <div className="px-5">
          <div className="w-full h-[226px] rounded-[24px] overflow-hidden relative border border-white/5 bg-[var(--color-fit-panel)]">
            <img
              src="https://images.unsplash.com/photo-1586066626552-8aa966ca853c?auto=format&fit=crop&q=80&w=1080"
              alt="HIIT + treino corporal"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="px-5 mt-6 flex flex-col gap-[10px]">
          <h2 className="font-sans font-black italic text-[21px]">
            HIIT + treino corporal
          </h2>
          <p className="text-[var(--color-fit-muted)] text-[12px] font-medium leading-relaxed max-w-[95%]">
            Desenvolva força explosiva com uma sessão rápida guiada, feita para pouco tempo e alta intensidade.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="px-5 mt-6 flex gap-[14px]">
          {/* Metric 1 */}
          <div className="flex-1 h-[64px] bg-[var(--color-fit-panel)] rounded-[16px] px-[15px] flex flex-col justify-center gap-1">
            <span className="font-sans font-extrabold text-[13px] text-white">
              40 min
            </span>
            <span className="text-[var(--color-fit-muted)] text-[10px] font-semibold">
              Duração
            </span>
          </div>
          {/* Metric 2 */}
          <div className="flex-1 h-[64px] bg-[var(--color-fit-panel)] rounded-[16px] px-[15px] flex flex-col justify-center gap-1">
            <span className="font-sans font-extrabold text-[13px] text-white">
              12 exercícios
            </span>
            <span className="text-[var(--color-fit-muted)] text-[10px] font-semibold">
              Movimentos
            </span>
          </div>
          {/* Metric 3 */}
          <div className="flex-1 h-[64px] bg-[var(--color-fit-panel)] rounded-[16px] px-[15px] flex flex-col justify-center gap-1">
            <span className="font-sans font-extrabold text-[13px] text-white">
              320 kcal
            </span>
            <span className="text-[var(--color-fit-muted)] text-[10px] font-semibold">
              Gasto
            </span>
          </div>
        </div>

        {/* Location Section */}
        <div className="px-5 mt-[30px] flex flex-col gap-4">
          <h3 className="font-sans font-black italic text-[15px]">
            Localização
          </h3>
          <div className="w-full h-[82px] bg-[var(--color-fit-panel-2)] rounded-[18px] overflow-hidden relative flex items-center justify-center border border-white/5">
            <span className="text-[var(--color-fit-muted)] text-[11px] font-bold tracking-wide">
              Mapa
            </span>
            {/* If we had a map image, it would go here */}
          </div>
        </div>

        {/* Action Button */}
        <div className="px-5 mt-[36px] mb-6 flex justify-center">
          <button className="w-full max-w-[298px] h-[48px] bg-[var(--color-fit-green)] rounded-[12px] flex items-center justify-center cursor-pointer active:scale-95 transition-transform">
            <span className="text-[#07110B] font-sans font-black text-[13px]">
              Ver agenda
            </span>
          </button>
        </div>
      </div>

      
      
    </div>
  );
};
