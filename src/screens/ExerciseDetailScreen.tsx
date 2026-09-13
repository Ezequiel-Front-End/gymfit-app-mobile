import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Maximize, Play, Pause, Youtube, Share, Info, Search } from 'lucide-react';
import { Exercise } from '../api/exercises';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  exercise: Exercise;
  onBack: () => void;
}

export const ExerciseDetailScreen: React.FC<Props> = ({ exercise, onBack }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('Sobre');
  const tabs = ['Sobre', 'Histórico', 'Progresso', 'Recordes'];

  return (
    <div className="relative w-full h-full min-h-screen sm:min-h-full flex-1 bg-black text-white flex flex-col overflow-hidden select-none z-50">
      {/* Header */}
      <div className="px-5 pt-12 pb-2 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-[#111] transition-colors">
          <ChevronLeft className="w-[22px] h-[22px] text-white" />
        </button>
        <h1 className="font-sans font-semibold text-[16px] truncate max-w-[200px]">{exercise.name}</h1>
        <button className="p-2 -mr-2">
          <MoreHorizontal className="w-[22px] h-[22px] text-[#3b82f6]" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-5 flex items-center gap-6 border-b border-[#222]">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 font-sans text-[14px] transition-colors relative ${activeTab === tab ? 'text-white font-semibold' : 'text-[#888] font-medium'}`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pt-5 pb-10 px-5 flex flex-col gap-5">
        
        {/* GIF Area */}
        <div 
          onClick={() => setIsFullscreen(true)}
          className="w-full aspect-[4/3] bg-white rounded-[16px] relative overflow-hidden flex items-center justify-center cursor-pointer"
        >
          <img 
            src={exercise.gifUrl} 
            alt={exercise.name} 
            className="w-[90%] h-[90%] object-contain mix-blend-multiply filter hue-rotate-180"
          />
          <div className="absolute top-3 right-3 w-[26px] h-[26px] rounded-full border border-black/80 flex items-center justify-center bg-white/50 backdrop-blur-sm">
            <Pause className="w-3 h-3 text-black" fill="currentColor" />
          </div>
          <div className="absolute bottom-3 right-3">
            <Maximize className="w-5 h-5 text-black" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button className="h-[36px] px-4 rounded-[12px] bg-[#18181b] flex items-center gap-2 flex-shrink-0">
            <Youtube className="w-4 h-4 text-white" />
            <span className="font-sans font-semibold text-[12px]">YouTube</span>
          </button>
          <button className="h-[36px] px-4 rounded-[12px] bg-[#18181b] flex items-center gap-2 flex-shrink-0">
            <Share className="w-4 h-4 text-[#a1a1aa]" />
            <span className="font-sans font-semibold text-[12px] text-[#a1a1aa]">Compartilhar</span>
          </button>
          <button className="h-[36px] px-4 rounded-[12px] bg-[#18181b] flex items-center gap-2 flex-shrink-0">
            <Info className="w-4 h-4 text-[#a1a1aa]" />
            <span className="font-sans font-semibold text-[12px] text-[#a1a1aa]">Como registrar?</span>
          </button>
        </div>

        {/* Muscles Section */}
        <div className="mt-4 flex flex-col gap-4">
          <h2 className="font-sans font-bold text-[16px] text-white">Músculos trabalhados</h2>
          <div className="w-full aspect-[4/3] bg-[#111] rounded-[16px] flex flex-col items-center justify-center border border-[#222]">
            {/* Minimal anatomical placeholder text, as we don't have SVG map */}
            <span className="text-[32px]">💪</span>
            <span className="text-[#888] font-sans text-xs mt-2 uppercase font-bold tracking-widest">{exercise.targetMuscle}</span>
          </div>
        </div>

      </div>

      {/* Fullscreen GIF Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 w-full h-full bg-white z-[60] flex flex-col"
          >
            {/* Top Close Button */}
            <button 
              onClick={() => setIsFullscreen(false)}
              className="absolute top-12 left-5 z-10 p-2 bg-black/5 rounded-full active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>
            
            <div className="flex-1 w-full flex items-center justify-center relative overflow-hidden" onClick={() => setIsFullscreen(false)}>
               <img 
                src={exercise.gifUrl} 
                alt={exercise.name} 
                className="w-full h-full object-contain filter hue-rotate-180 scale-125 origin-center"
              />
            </div>
            
            {/* Bottom Controls */}
            <div className="w-full pb-10 pt-4 px-10 flex items-center justify-between bg-white">
              <button className="w-[42px] h-[42px] bg-[#e5e5e5] rounded-full flex items-center justify-center active:scale-95 transition-transform">
                 <Pause className="w-[18px] h-[18px] text-black" fill="currentColor" />
              </button>
              <button className="w-[42px] h-[42px] bg-[#e5e5e5] rounded-full flex items-center justify-center active:scale-95 transition-transform">
                 <span className="font-sans font-bold text-black text-[13px]">1.0x</span>
              </button>
              <button className="w-[42px] h-[42px] bg-[#e5e5e5] rounded-full flex items-center justify-center active:scale-95 transition-transform">
                 <Search className="w-[20px] h-[20px] text-black" />
              </button>
              <button className="w-[42px] h-[42px] bg-[#e5e5e5] rounded-full flex items-center justify-center active:scale-95 transition-transform">
                 <Share className="w-[20px] h-[20px] text-black" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
