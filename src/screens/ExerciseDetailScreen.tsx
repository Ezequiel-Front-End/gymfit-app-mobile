import React, { useState, useEffect } from 'react';
import { ChevronLeft, MoreHorizontal, Maximize, Play, Pause, Youtube, Share, Info, ZoomIn, ZoomOut } from 'lucide-react';
import { Exercise } from '../api/exercises';
import { motion, AnimatePresence } from 'motion/react';


interface Props {
  exercise: Exercise;
  onBack: () => void;
}

export const ExerciseDetailScreen: React.FC<Props> = ({ exercise, onBack }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState('Sobre');
  const [isPaused, setIsPaused] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [translatedInstructions, setTranslatedInstructions] = useState<string[] | null>(null);
  const tabs = ['Sobre', 'Histórico', 'Progresso', 'Recordes'];

  useEffect(() => {
    if (!exercise.instructions || exercise.instructions.length === 0) {
      setTranslatedInstructions([]);
      return;
    }
    const translate = async () => {
      try {
        const text = exercise.instructions!.join('\n');
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(text)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Translation failed');
        const data = await res.json();
        
        let translatedText = '';
        if (data && data[0]) {
          data[0].forEach((item: any) => {
            if (item[0]) translatedText += item[0];
          });
        }
        
        if (translatedText) {
          setTranslatedInstructions(translatedText.split('\n').filter(Boolean));
        } else {
          setTranslatedInstructions(exercise.instructions!);
        }
      } catch(e) {
        setTranslatedInstructions(exercise.instructions!);
      }
    };
    translate();
  }, [exercise.instructions]);

  return (
    <div className="relative w-full h-full min-h-screen sm:min-h-full flex-1 bg-black text-white flex flex-col overflow-hidden select-none z-50">
      {/* Header */}
      <div className="px-5 pt-16 pb-2 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-[#111] transition-colors">
          <ChevronLeft className="w-[22px] h-[22px] text-white" />
        </button>
        <h1 className="font-sans font-semibold text-[16px] truncate max-w-[200px]">{exercise.name}</h1>
        <button className="p-2 -mr-2">
          <MoreHorizontal className="w-[22px] h-[22px] text-[#3b82f6]" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-5 flex items-center gap-6 border-b border-[#222] shrink-0">
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

      {/* Fixed GIF Area at the top */}
      <div className="px-5 pt-5 pb-2 shrink-0">
        <div 
          onClick={() => { setIsFullscreen(true); setIsZoomed(false); setIsPaused(false); }}
          className="w-full aspect-[4/3] bg-white rounded-[16px] relative overflow-hidden flex items-center justify-center cursor-pointer"
        >
          <img 
            src={exercise.gifUrl} 
            alt={exercise.name} 
            className="w-[90%] h-[90%] object-contain"
            style={{ imageRendering: 'high-quality' }}
          />
          <div className="absolute top-3 right-3 w-[26px] h-[26px] rounded-full border border-black/80 flex items-center justify-center bg-white/50 backdrop-blur-sm">
            <Maximize className="w-3 h-3 text-black" strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-10 flex flex-col gap-5">
        
        {/* Instructions Section */}
        {translatedInstructions && translatedInstructions.length > 0 && (
          <div className="mt-6 flex flex-col gap-4">
            <h2 className="font-sans font-bold text-[16px] text-white">Como executar</h2>
            <div className="flex flex-col gap-3">
              {translatedInstructions.map((step, index) => (
                <div key={index} className="flex gap-4 bg-[#111] p-4 rounded-[16px] border border-[#222]">
                  <div className="w-6 h-6 rounded-full bg-[#1c1c1e] flex items-center justify-center shrink-0 border border-[#333]">
                    <span className="font-sans font-bold text-[12px] text-[#CFFF00]">{index + 1}</span>
                  </div>
                  <p className="font-sans text-[14px] text-[#e5e5e5] leading-relaxed mt-0.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {!translatedInstructions && exercise.instructions && exercise.instructions.length > 0 && (
          <div className="mt-6 flex flex-col gap-4">
             <h2 className="font-sans font-bold text-[16px] text-white">Como executar</h2>
             <div className="w-full h-[100px] flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[#333] border-t-[#CFFF00] rounded-full animate-spin" />
             </div>
          </div>
        )}

        {/* Muscles Section */}
        <div className="mt-6 flex flex-col gap-4">
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
            
            <div className="flex-1 w-full flex items-center justify-center relative overflow-hidden bg-white">
               <img 
                src={exercise.gifUrl} 
                alt={exercise.name} 
                className={`w-full h-full object-contain transition-transform duration-300 ease-out ${isZoomed ? 'scale-[1.8]' : 'scale-100'}`}
              />
            </div>
            
            {/* Bottom Controls */}
            <div className="w-full pb-10 pt-4 px-16 flex items-center justify-center gap-12 bg-white">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsPaused(!isPaused); }}
                className="w-[52px] h-[52px] bg-[#f4f4f5] hover:bg-[#e4e4e7] rounded-full flex items-center justify-center active:scale-95 transition-all shadow-sm"
              >
                 {isPaused ? <Play className="w-[22px] h-[22px] text-black ml-1" fill="currentColor" /> : <Pause className="w-[22px] h-[22px] text-black" fill="currentColor" />}
              </button>
              
              <button 
                onClick={(e) => { e.stopPropagation(); setIsZoomed(!isZoomed); }}
                className={`w-[52px] h-[52px] rounded-full flex items-center justify-center active:scale-95 transition-all shadow-sm ${isZoomed ? 'bg-black text-white' : 'bg-[#f4f4f5] hover:bg-[#e4e4e7] text-black'}`}
              >
                 {isZoomed ? <ZoomOut className="w-[22px] h-[22px]" /> : <ZoomIn className="w-[22px] h-[22px]" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
