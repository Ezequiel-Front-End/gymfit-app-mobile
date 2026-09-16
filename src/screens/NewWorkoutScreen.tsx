import React, { useState, useEffect } from 'react';
import { ChevronDown, Timer, MoreHorizontal } from 'lucide-react';
import { Exercise } from '../api/exercises';
import { motion, AnimatePresence } from 'motion/react';

interface NewWorkoutScreenProps {
  exercises?: Exercise[];
  onClose: () => void;
  onAddExercises: () => void;
  onFinish: () => void;
  onExerciseClick?: (exercise: Exercise) => void;
  onRemoveExercise?: (exercise: Exercise) => void;
}

const StaticGif: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const img = new Image();
    img.onload = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        canvasRef.current.width = img.width;
        canvasRef.current.height = img.height;
        ctx?.drawImage(img, 0, 0);
      }
    };
    img.src = src;
  }, [src]);

  return <canvas ref={canvasRef} className={className} aria-label={alt} />;
};

export const NewWorkoutScreen: React.FC<NewWorkoutScreenProps> = ({
  exercises = [],
  onClose,
  onAddExercises,
  onFinish,
  onExerciseClick,
  onRemoveExercise,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [exerciseToDelete, setExerciseToDelete] = useState<Exercise | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full h-full min-h-screen sm:min-h-full flex-1 bg-[var(--color-fit-bg)] text-[var(--color-fit-text)] flex flex-col overflow-hidden select-none z-50">
      {/* Top Header */}
      <div className="px-5 pt-16 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-[var(--color-fit-panel)] transition-colors">
            <ChevronDown className="w-6 h-6 text-white" />
          </button>
          <Timer className="w-5 h-5 text-white" />
        </div>
        
        <button
          onClick={onFinish}
          className="px-5 py-2 rounded-full bg-[var(--color-fit-green)] text-black font-sans font-black text-xs uppercase transition-transform active:scale-95"
        >
          Finalizar
        </button>
      </div>

      {/* Summary Stats */}
      <div className="px-5 mt-4">
        <div className="w-full bg-[var(--color-fit-bg)] border border-[var(--color-fit-green)] rounded-xl py-4 px-2 flex justify-between">
          <div className="flex-1 flex flex-col items-center border-r border-[#2A2A2A]">
            <span className="text-[var(--color-fit-muted)] font-sans font-bold text-[11px] uppercase mb-1">Duração</span>
            <span className="text-[var(--color-fit-green)] font-sans font-black text-base">{formatTime(seconds)}</span>
          </div>
          <div className="flex-1 flex flex-col items-center border-r border-[#2A2A2A]">
            <span className="text-[var(--color-fit-muted)] font-sans font-bold text-[11px] uppercase mb-1">Volume</span>
            <span className="text-white font-sans font-black text-base">0 kg</span>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <span className="text-[var(--color-fit-muted)] font-sans font-bold text-[11px] uppercase mb-1">Séries</span>
            <span className="text-white font-sans font-black text-base">{exercises.length}</span>
          </div>
        </div>
      </div>

      {/* Exercises List or Empty State */}
      <div className="flex-1 overflow-y-auto no-scrollbar mt-4">
        {exercises.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-8 text-center h-full pb-20">
            <h2 className="font-sans font-black italic text-base uppercase text-white mb-2">
              Nenhum exercício adicionado
            </h2>
            <p className="text-[#E8E8E8] font-sans font-semibold text-sm leading-relaxed max-w-[280px]">
              Toque no botão abaixo para adicionar exercícios ao seu treino.
            </p>
          </div>
        ) : (
          <div className="px-5 pb-8 flex flex-col gap-5">
            {exercises.map(exercise => (
              <div 
                key={exercise.id} 
                className="flex items-center gap-4 w-full cursor-pointer"
                onClick={() => onExerciseClick?.(exercise)}
              >
                <div className="relative w-16 h-20 bg-white rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                  <StaticGif
                    src={exercise.gifUrl}
                    alt={exercise.name}
                    className="w-[85%] h-[85%] object-contain"
                  />
                  <div className="absolute bottom-1 right-1 text-[#C4C4C4] font-sans font-bold text-[10px]">
                    ?
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <span className="font-sans font-semibold text-[15px] text-white leading-tight">
                    {exercise.name}
                  </span>
                  <span className="font-sans font-medium text-[12px] text-[#A1A1AA] mt-1">
                    0/3 Feito
                  </span>
                </div>
                
                <button 
                  className="p-2 -mr-2 active:bg-white/10 rounded-full transition-colors" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setExerciseToDelete(exercise);
                  }}
                >
                  <MoreHorizontal className="w-5 h-5 text-[#3b82f6]" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="px-5 pb-8 flex flex-col gap-3 pt-2">
        <button
          onClick={onAddExercises}
          className="w-full h-[52px] rounded-full bg-white flex items-center justify-center text-black font-sans font-medium text-[16px] transition-transform active:scale-95"
        >
          Adicionar exercícios
        </button>
        <button
          className="w-full h-[52px] rounded-full bg-[#27272A] flex items-center justify-center text-white font-sans font-medium text-[16px] transition-transform active:scale-95"
        >
          Mais
        </button>
      </div>

      {/* Delete Confirmation Modal (Bottom Sheet) */}
      <AnimatePresence>
        {exerciseToDelete && (
          <div className="absolute inset-0 z-[100] flex flex-col justify-end">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setExerciseToDelete(null)}
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full bg-[#1C1C1E] text-white rounded-t-[24px] px-5 pt-3 pb-8 flex flex-col items-center"
            >
              {/* Drag Handle */}
              <div className="w-10 h-1.5 bg-[#3A3A3C] rounded-full mb-4" />
              
              <div className="w-full flex flex-col mt-2">
                <button 
                  className="w-full py-4 bg-[#2C2C2E] rounded-t-[14px] font-sans font-medium text-[16px] text-[#FF453A] border-b border-[#3A3A3C] active:bg-[#3A3A3C] transition-colors"
                  onClick={() => {
                    onRemoveExercise?.(exerciseToDelete);
                    setExerciseToDelete(null);
                  }}
                >
                  Remover exercício
                </button>
                <button 
                  className="w-full py-4 bg-[#2C2C2E] rounded-b-[14px] font-sans font-medium text-[16px] text-white active:bg-[#3A3A3C] transition-colors"
                  onClick={() => setExerciseToDelete(null)}
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
