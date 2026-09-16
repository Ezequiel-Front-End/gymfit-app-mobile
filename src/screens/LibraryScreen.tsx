import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, ArrowUpDown, Grid2X2, Bookmark } from 'lucide-react';
import { TabId } from '../types';

interface LibraryScreenProps {
  onBack: () => void;
  onNavigateTab: (tab: TabId) => void;
}

export const LibraryScreen: React.FC<LibraryScreenProps> = ({ onBack, onNavigateTab }) => {
  const [activeTab, setActiveTab] = useState<'Programas' | 'Rotinas' | 'Exercícios'>('Programas');

  return (
    <div className="w-full h-full bg-[#000000] flex flex-col relative overflow-hidden font-sans">
      {/* Header */}
      <header className="w-full px-6 pt-16 pb-4 flex items-center justify-between z-10 shrink-0">
        <h1 className="text-[20px] font-[800] text-white font-sans tracking-tight">
          Sua biblioteca
        </h1>
        <button type="button" className="p-1 -mr-1">
          <Plus size={22} color="#FFFFFF" strokeWidth={2.5} />
        </button>
      </header>

      {/* Tabs */}
      <div className="w-full px-6 flex items-center gap-2 mb-6 shrink-0 overflow-x-auto no-scrollbar">
        {['Programas', 'Rotinas', 'Exercícios'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab as any)}
            className={`h-[28px] px-4 rounded-[14px] flex items-center justify-center transition-colors shrink-0 ${
              activeTab === tab ? 'bg-white text-black' : 'bg-[#1F1E23] text-white'
            }`}
          >
            <span className="text-[12px] font-[700]">{tab}</span>
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-[#17171A] shrink-0" />

      {/* List Controls */}
      <div className="w-full px-6 py-4 flex items-center justify-between shrink-0">
        <button type="button" className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
          <ArrowUpDown size={14} color="#FFFFFF" />
          <span className="text-[11px] text-white font-normal">Recentes</span>
        </button>
        <button type="button" className="opacity-80 hover:opacity-100 transition-opacity">
          <Grid2X2 size={18} color="#FFFFFF" />
        </button>
      </div>

      {/* Content List */}
      <div className="flex-1 w-full px-6 overflow-y-auto no-scrollbar pb-32 z-10">
        <div className="flex flex-col gap-4">
          {/* Create New Program Item */}
          <button type="button" className="flex items-center gap-4 w-full text-left group">
            <div className="w-[58px] h-[58px] bg-[#252229] rounded-[3px] flex items-center justify-center shrink-0 group-active:scale-95 transition-transform">
              <Plus size={24} color="#FFFFFF" />
            </div>
            <div className="flex-1">
              <span className="text-[14px] font-[500] text-white">Criar novo programa</span>
            </div>
          </button>

          {/* Favorites Item */}
          <button type="button" className="flex items-center gap-4 w-full text-left group">
            <div className="w-[58px] h-[58px] bg-[#252229] rounded-[3px] flex items-center justify-center shrink-0 group-active:scale-95 transition-transform">
              <Bookmark size={24} color="#B7B7BE" strokeWidth={2} />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <span className="text-[14px] font-[500] text-white mb-0.5">Favoritos</span>
              <span className="text-[11px] font-normal text-[#8B8991]">0 rotina</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
