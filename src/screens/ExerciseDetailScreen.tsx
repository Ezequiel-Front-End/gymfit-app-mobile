import React, { useState, useEffect } from 'react';
import { ChevronLeft, MoreHorizontal, Maximize, Play, Pause, Youtube, Share, Info, ZoomIn, ZoomOut } from 'lucide-react';
import { Exercise, fetchExerciseDetail, MUSCLE_TRANSLATIONS, EQUIPMENT_TRANSLATIONS, translateTerm } from '../api/exercises';
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
  const [muscleGender, setMuscleGender] = useState<'male' | 'female'>('male');
  const [detailedExercise, setDetailedExercise] = useState<any>(null);
  
  // Translated states
  const [translatedInstructions, setTranslatedInstructions] = useState<string[] | null>(null);
  const [translatedOverview, setTranslatedOverview] = useState<string | null>(null);
  const [translatedTips, setTranslatedTips] = useState<string[] | null>(null);
  const [translatedVariations, setTranslatedVariations] = useState<string[] | null>(null);
  
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const fullVideoRef = React.useRef<HTMLVideoElement>(null);
  const tabs = ['Sobre', 'Histórico', 'Progresso', 'Recordes'];

  useEffect(() => {
    const loadDetails = async () => {
      const details = await fetchExerciseDetail(exercise.id);
      if (details) setDetailedExercise(details);
    };
    loadDetails();
  }, [exercise.id]);

  useEffect(() => {
    const translateAll = async () => {
      try {
        const textsToTranslate: string[] = [];
        const DELIMITER = "\n\n---DELIMITER---\n\n";
        
        const instructions = detailedExercise?.instructions || exercise.instructions;
        if (instructions && instructions.length > 0) {
          textsToTranslate.push(instructions.join('\n'));
        } else {
          textsToTranslate.push('');
        }
        
        if (detailedExercise?.overview) textsToTranslate.push(detailedExercise.overview);
        else textsToTranslate.push('');
        
        if (detailedExercise?.exerciseTips) textsToTranslate.push(detailedExercise.exerciseTips.join('\n'));
        else textsToTranslate.push('');
        
        if (detailedExercise?.variations) textsToTranslate.push(detailedExercise.variations.join('\n'));
        else textsToTranslate.push('');
        
        const combinedText = textsToTranslate.join(DELIMITER);
        if (!combinedText.trim()) return;

        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(combinedText)}`);
        if (!res.ok) throw new Error('Translation failed');
        const data = await res.json();
        
        const translatedText = data[0].map((item: any) => item[0]).join('');
        const parts = translatedText.split('---DELIMITER---').map((p: string) => p.trim());
        
        if (parts[0]) setTranslatedInstructions(parts[0].split('\n').map((s: string) => s.trim()).filter(Boolean));
        if (parts[1]) setTranslatedOverview(parts[1]);
        if (parts[2]) setTranslatedTips(parts[2].split('\n').map((s: string) => s.trim()).filter(Boolean));
        if (parts[3]) setTranslatedVariations(parts[3].split('\n').map((s: string) => s.trim()).filter(Boolean));
        
      } catch (error) {
        console.error("Erro na tradução dinâmica:", error);
        const instructions = detailedExercise?.instructions || exercise.instructions;
        if (instructions) setTranslatedInstructions(instructions);
        if (detailedExercise?.overview) setTranslatedOverview(detailedExercise.overview);
        if (detailedExercise?.exerciseTips) setTranslatedTips(detailedExercise.exerciseTips);
        if (detailedExercise?.variations) setTranslatedVariations(detailedExercise.variations);
      }
    };
    translateAll();
  }, [detailedExercise, exercise.instructions]);

  const displayVideoUrl = detailedExercise?.videoUrl || exercise.videoUrl;
  const displayImageUrl = detailedExercise?.imageUrl || exercise.imageUrl || exercise.gifUrl;

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

      {/* Overview Section */}
      {translatedOverview && (
        <div className="px-5 mt-4">
          <div className="bg-[#1a181c] p-4 rounded-[12px] flex flex-col gap-2">
             <div className="flex items-center gap-2 mb-1">
               <Info className="w-[18px] h-[18px] text-[var(--color-fit-green)]" />
               <span className="font-sans font-bold text-[14px] text-white">Visão Geral</span>
             </div>
             <p className="font-sans text-[13.5px] text-[#ccc] leading-relaxed">
               {translatedOverview}
             </p>
          </div>
        </div>
      )}

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
          {displayVideoUrl ? (
            <video
              ref={videoRef}
              src={displayVideoUrl}
              className="w-[90%] h-[90%] object-contain"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img 
              src={displayImageUrl} 
              alt={exercise.name} 
              className="w-[90%] h-[90%] object-contain"
              style={{ imageRendering: 'high-quality' }}
            />
          )}
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
        
        {!translatedInstructions && (detailedExercise?.instructions || exercise.instructions) && (detailedExercise?.instructions?.length > 0 || exercise.instructions?.length > 0) && (
          <div className="mt-6 flex flex-col gap-4">
             <h2 className="font-sans font-bold text-[16px] text-white">Como executar</h2>
             <div className="w-full h-[100px] flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[#333] border-t-[#CFFF00] rounded-full animate-spin" />
             </div>
          </div>
        )}

        {/* Muscles Section */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-center gap-6 border-b border-[#222]">
            <h2 className="font-sans font-bold text-[16px] text-white pb-2 shrink-0">Músculos trabalhados</h2>
            <div className="flex items-center gap-4 ml-auto">
              <button 
                onClick={() => setMuscleGender('male')}
                className={`pb-2 font-sans text-[14px] transition-colors relative ${muscleGender === 'male' ? 'text-[var(--color-fit-green)] font-bold' : 'text-[#888] font-medium'}`}
              >
                Homem
                {muscleGender === 'male' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-fit-green)] rounded-t-full" />}
              </button>
              <button 
                onClick={() => setMuscleGender('female')}
                className={`pb-2 font-sans text-[14px] transition-colors relative ${muscleGender === 'female' ? 'text-[var(--color-fit-green)] font-bold' : 'text-[#888] font-medium'}`}
              >
                Mulher
                {muscleGender === 'female' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-fit-green)] rounded-t-full" />}
              </button>
            </div>
          </div>

          <div className="w-full bg-white p-4 rounded-[16px] flex flex-col items-center justify-center relative overflow-hidden min-h-[200px] border border-[#222]">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <img 
              src={muscleGender === 'male' 
                ? (detailedExercise?.maleMuscleActivationUrl || 'https://cdn.exercisedb.dev/exercisedb/workout-map.png') 
                : (detailedExercise?.femaleMuscleActivationUrl || 'https://cdn.exercisedb.dev/exercisedb/workout-f-2.png')}
              alt={`Músculos trabalhados (${muscleGender})`}
              className="w-full max-w-[280px] h-auto object-contain relative z-10 mix-blend-multiply"
              loading="lazy"
            />
          </div>

          <div className="w-full bg-[#111] p-4 rounded-[16px] flex flex-col gap-3 border border-[#222]">
            <div className="flex flex-col">
              <span className="font-sans text-[12px] text-[#888] uppercase tracking-wider mb-1">Alvo Principal</span>
              <div className="flex flex-wrap gap-2">
                 {(detailedExercise?.targetMuscles || [exercise.targetMuscle]).map((m: string) => (
                    <span key={m} className="px-3 py-1.5 bg-[var(--color-fit-green)] text-black rounded-full font-sans font-bold text-[13px] capitalize">{translateTerm(m, MUSCLE_TRANSLATIONS)}</span>
                 ))}
              </div>
            </div>
            
            {detailedExercise?.secondaryMuscles && detailedExercise.secondaryMuscles.length > 0 && (
              <div className="flex flex-col mt-2">
                <span className="font-sans text-[12px] text-[#888] uppercase tracking-wider mb-1">Músculos Secundários</span>
                <div className="flex flex-wrap gap-2">
                   {detailedExercise.secondaryMuscles.map((m: string) => (
                      <span key={m} className="px-3 py-1.5 bg-[#222] text-white rounded-full font-sans font-medium text-[13px] capitalize border border-[#333]">{translateTerm(m, MUSCLE_TRANSLATIONS)}</span>
                   ))}
                </div>
              </div>
            )}
            
            {detailedExercise?.equipments && detailedExercise.equipments.length > 0 && (
              <div className="flex flex-col mt-2">
                <span className="font-sans text-[12px] text-[#888] uppercase tracking-wider mb-1">Equipamento Necessário</span>
                <div className="flex flex-wrap gap-2">
                   {detailedExercise.equipments.map((eq: string) => (
                      <span key={eq} className="px-3 py-1.5 bg-[#222] text-white rounded-full font-sans font-medium text-[13px] capitalize border border-[#333]">{translateTerm(eq, EQUIPMENT_TRANSLATIONS)}</span>
                   ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Tips Section */}
        {translatedTips && translatedTips.length > 0 && (
          <div className="mt-6 flex flex-col gap-4">
             <h2 className="font-sans font-bold text-[16px] text-white">Dicas de Execução</h2>
             <ul className="flex flex-col gap-3 pl-4">
                {translatedTips.map((tip: string, index: number) => (
                  <li key={index} className="font-sans text-[14px] text-[#ccc] leading-relaxed list-disc marker:text-[var(--color-fit-green)]">
                    {tip.replace(/^Dica \d+:\s*/i, '')}
                  </li>
                ))}
             </ul>
          </div>
        )}
        
        {/* Variations Section */}
        {translatedVariations && translatedVariations.length > 0 && (
          <div className="mt-6 flex flex-col gap-4">
             <h2 className="font-sans font-bold text-[16px] text-white">Variações</h2>
             <div className="flex flex-col gap-3">
                {translatedVariations.map((v: string, index: number) => (
                  <div key={index} className="bg-[#111] p-3.5 rounded-[12px] border border-[#222]">
                    <p className="font-sans text-[13.5px] text-[#ccc] leading-relaxed">
                      {v.replace(/^Variação \d+:\s*/i, '')}
                    </p>
                  </div>
                ))}
             </div>
          </div>
        )}

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
               {displayVideoUrl ? (
                 <video
                   ref={fullVideoRef}
                   src={displayVideoUrl}
                   className={`w-full h-full object-contain transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                   autoPlay
                   loop
                   playsInline
                 />
               ) : (
                 <img 
                  src={displayImageUrl} 
                  alt={exercise.name} 
                  className={`w-full h-full object-contain transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                  style={{ imageRendering: 'high-quality' }}
                />
               )}
            </div>
            
            {/* Bottom Controls */}
            <div className="w-full pb-10 pt-4 px-16 flex items-center justify-center gap-12 bg-white">
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setIsPaused(!isPaused);
                  if (fullVideoRef.current) {
                    if (isPaused) fullVideoRef.current.play();
                    else fullVideoRef.current.pause();
                  }
                }}
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
