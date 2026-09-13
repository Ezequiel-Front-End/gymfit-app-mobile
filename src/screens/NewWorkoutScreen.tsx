import React, { useState, useEffect } from 'react';
import { ChevronDown, Timer } from 'lucide-react';

interface NewWorkoutScreenProps {
  onClose: () => void;
  onAddExercises: () => void;
  onFinish: () => void;
}

export const NewWorkoutScreen: React.FC<NewWorkoutScreenProps> = ({
  onClose,
  onAddExercises,
  onFinish,
}) => {
  const [seconds, setSeconds] = useState(0);

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
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
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
            <span className="text-white font-sans font-black text-base">0</span>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center mt-8">
        <h2 className="font-sans font-black italic text-base uppercase text-white mb-2">
          Nenhum exercício adicionado
        </h2>
        <p className="text-[#E8E8E8] font-sans font-semibold text-sm leading-relaxed max-w-[280px]">
          Toque no botão abaixo para adicionar exercícios ao seu treino.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="px-5 pb-10 flex flex-col gap-3">
        <button
          onClick={onAddExercises}
          className="w-full h-[50px] rounded-full bg-[var(--color-fit-green)] flex items-center justify-center text-black font-sans font-black text-[15px] transition-transform active:scale-95"
        >
          Adicionar exercícios
        </button>
        <button
          className="w-full h-[50px] rounded-full bg-[var(--color-fit-panel)] border border-[#242424] flex items-center justify-center text-white font-sans font-black text-[15px] transition-transform active:scale-95"
        >
          Mais
        </button>
      </div>
    </div>
  );
};
