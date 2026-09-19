import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Timer, MoreHorizontal, Check, Volume2, Smartphone, Play, Pause } from 'lucide-react';
import { Exercise } from '../api/exercises';
import { motion, AnimatePresence } from 'motion/react';

interface NewWorkoutScreenProps {
  exercises?: Exercise[];
  onClose: () => void;
  onAddExercises: () => void;
  onFinish: (durationSeconds: number) => void;
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

const RestTimerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(120); // 2 mins
  const [isActive, setIsActive] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [vibrationOn, setVibrationOn] = useState(true);

  useEffect(() => {
    let interval: any = null;
    if (isOpen && isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (isOpen && isActive && timeLeft === 0) {
      setIsActive(false);
      
      // Play sound
      if (soundOn) {
        try {
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContext) {
            const ctx = new AudioContext();
            const playSingleBeep = (timeOffset: number) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(880, ctx.currentTime + timeOffset);
              gain.gain.setValueAtTime(0, ctx.currentTime + timeOffset);
              gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + timeOffset + 0.05);
              gain.gain.linearRampToValueAtTime(0, ctx.currentTime + timeOffset + 0.3);
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.start(ctx.currentTime + timeOffset);
              osc.stop(ctx.currentTime + timeOffset + 0.3);
            };
            playSingleBeep(0);
            playSingleBeep(0.4);
            playSingleBeep(0.8);
            playSingleBeep(1.2);
          }
        } catch (e) {
          console.error('Audio play failed', e);
        }
      }
      
      // Vibrate
      if (vibrationOn && 'vibrate' in navigator) {
        navigator.vibrate([300, 100, 300, 100, 300, 100, 300]);
      }
    }
    return () => clearInterval(interval);
  }, [isOpen, isActive, timeLeft, soundOn, vibrationOn]);

  useEffect(() => {
    if (isOpen) {
      setTimeLeft(120);
      setIsActive(false); // Start paused
    }
  }, [isOpen]);

  const addTime = (seconds: number) => {
    setTimeLeft(t => Math.max(0, t + seconds));
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  
  const totalTime = 120;
  const progress = timeLeft / totalTime;
  const strokeDasharray = 2 * Math.PI * 120;
  const strokeDashoffset = strokeDasharray * (1 - progress);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-[85%] max-w-[340px] bg-[#222222] rounded-[24px] flex flex-col items-center overflow-hidden"
          >
            <div className="w-full pt-10 pb-6 flex flex-col items-center">
              <div className="relative w-[260px] h-[260px] flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                  <circle cx="130" cy="130" r="120" stroke="#333333" strokeWidth="6" fill="none" />
                  <circle 
                    cx="130" cy="130" r="120" 
                    stroke="#00A3FF" strokeWidth="6" fill="none" 
                    strokeLinecap="round"
                    style={{ 
                      strokeDasharray, 
                      strokeDashoffset,
                      transition: 'stroke-dashoffset 1s linear'
                    }} 
                  />
                </svg>
                <span className="text-white text-[56px] font-sans font-medium tracking-tight">
                  {timeString}
                </span>
              </div>
              
              <div className="flex items-center gap-10 mt-8 mb-2">
                <button onClick={() => addTime(-10)} className="text-[#8B8991] flex flex-col items-center relative active:scale-90 transition-transform">
                  <Timer className="w-8 h-8" strokeWidth={1.5} />
                  <span className="text-[10px] font-bold absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1 bg-[#222222] px-0.5">-10</span>
                </button>
                
                <button 
                  onClick={toggleTimer} 
                  className={`w-[56px] h-[56px] rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-lg ${
                    isActive ? 'bg-[#333333] text-white' : 'bg-[var(--color-fit-green)] text-black'
                  }`}
                >
                  {isActive ? (
                    <Pause className="w-6 h-6" fill="currentColor" stroke="none" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" fill="currentColor" stroke="none" />
                  )}
                </button>

                <button onClick={() => addTime(10)} className="text-[#8B8991] flex flex-col items-center relative active:scale-90 transition-transform">
                  <Timer className="w-8 h-8" strokeWidth={1.5} />
                  <span className="text-[10px] font-bold absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1 bg-[#222222] px-0.5">+10</span>
                </button>
              </div>
            </div>

            <div className="w-full flex border-t border-[#333333] bg-[#2A2A2A]">
              <button 
                onClick={() => setSoundOn(!soundOn)}
                className="flex-1 flex flex-col items-center justify-center py-4 border-r border-[#333333] active:bg-[#333333] transition-colors"
              >
                <Volume2 className={`w-5 h-5 mb-1 ${soundOn ? 'text-[#00A3FF]' : 'text-[#8B8991]'}`} />
                <span className={`text-[12px] font-medium leading-tight text-center ${soundOn ? 'text-[#00A3FF]' : 'text-[#8B8991]'}`}>
                  Som<br/>{soundOn ? 'Ligado' : 'Desligado'}
                </span>
              </button>
              <button 
                onClick={() => setVibrationOn(!vibrationOn)}
                className="flex-1 flex flex-col items-center justify-center py-4 active:bg-[#333333] transition-colors"
              >
                <Smartphone className={`w-5 h-5 mb-1 ${vibrationOn ? 'text-[#00A3FF]' : 'text-[#8B8991]'}`} />
                <span className={`text-[12px] font-medium leading-tight text-center ${vibrationOn ? 'text-[#00A3FF]' : 'text-[#8B8991]'}`}>
                  Vibração<br/>{vibrationOn ? 'Ligada' : 'Desligada'}
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const WorkoutExerciseItem: React.FC<{
  exercise: Exercise;
  onImageClick: () => void;
  onRemove: () => void;
  onProgressChange: (completed: number, total: number, volume: number) => void;
}> = ({ exercise, onImageClick, onRemove, onProgressChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [sets, setSets] = useState([
    { id: 1, type: '1', weight: '', reps: '', completed: false },
    { id: 2, type: '2', weight: '', reps: '', completed: false },
    { id: 3, type: '3', weight: '', reps: '', completed: false }
  ]);

  const toggleSet = (id: number) => {
    setSets(sets.map(s => s.id === id ? { ...s, completed: !s.completed } : s));
  };

  const updateSet = (id: number, field: 'weight' | 'reps', value: string) => {
    setSets(sets.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addSet = () => {
    setSets([...sets, { id: Date.now(), type: String(sets.length + 1), weight: '', reps: '', completed: false }]);
  };

  const completedCount = sets.filter(s => s.completed).length;
  const exerciseVolume = sets
    .filter(s => s.completed)
    .reduce((acc, s) => acc + (parseFloat(s.weight) || 0) * (parseInt(s.reps) || 0), 0);

  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onProgressChange(completedCount, sets.length, exerciseVolume);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedCount, sets.length, exerciseVolume]);

  useEffect(() => {
    // Auto-collapse when all sets are completed
    if (completedCount === sets.length && sets.length > 0) {
      const timer = setTimeout(() => setIsExpanded(false), 400);
      return () => clearTimeout(timer);
    }
  }, [completedCount, sets.length]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isExpanded && itemRef.current && !itemRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <div ref={itemRef} className="flex flex-col gap-3 w-full border-b border-[#1C1C1E] pb-4">
      {/* Header row */}
      <div className="flex items-center gap-4 w-full cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div 
          className="relative w-16 h-20 bg-white rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            onImageClick();
          }}
        >
          <img 
            src={exercise.imageUrl || exercise.gifUrl} 
            alt={exercise.name} 
            className="w-[85%] h-[85%] object-contain"
            loading="lazy" 
          />
          <div className="absolute bottom-1 right-1 text-[#C4C4C4] font-sans font-bold text-[10px]">?</div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <span className="font-sans font-semibold text-[15px] text-white leading-tight">
            {exercise.name}
          </span>
          <span className={`font-sans font-medium text-[12px] mt-1 ${completedCount === sets.length && sets.length > 0 ? 'text-[var(--color-fit-green)]' : 'text-[#A1A1AA]'}`}>
            {completedCount}/{sets.length} Feito
          </span>
        </div>
        
        <button 
          className="p-2 -mr-2 active:bg-white/10 rounded-full transition-colors" 
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <MoreHorizontal className="w-5 h-5 text-[#3b82f6]" />
        </button>
      </div>

      {/* Expanded Sets section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-col overflow-hidden"
          >
            {/* Headers */}
            <div className="flex items-center text-[11px] font-semibold text-[#8B8991] uppercase mt-2 mb-2 px-1">
              <span className="w-10 text-center">Série</span>
              <span className="flex-1">Anterior</span>
              <span className="w-16 text-center">KG</span>
              <span className="w-16 text-center">Reps</span>
              <span className="w-10"></span>
            </div>
            
            {/* Sets list */}
            {sets.map((set, index) => (
              <div 
                key={set.id} 
                className={`flex items-center py-2 px-1 rounded-md mb-1 ${set.completed ? 'bg-[var(--color-fit-green)]/20' : ''}`}
              >
                <span className={`w-10 text-center font-bold text-[13px] ${set.type === 'F' || set.type === '1' ? 'text-[#FF9500]' : 'text-white'}`}>
                  {set.type}
                </span>
                <span className="flex-1 text-[#8B8991] text-[13px]">
                  -
                </span>
                <div className="w-16 px-1">
                  <input 
                    type="number" 
                    value={set.weight}
                    onChange={(e) => updateSet(set.id, 'weight', e.target.value)}
                    className="w-full h-8 bg-transparent border border-[#2C2C2E] text-white text-center text-[15px] rounded-md outline-none focus:border-[var(--color-fit-green)] transition-colors"
                    placeholder="-"
                  />
                </div>
                <div className="w-16 px-1">
                  <input 
                    type="number" 
                    value={set.reps}
                    onChange={(e) => updateSet(set.id, 'reps', e.target.value)}
                    className="w-full h-8 bg-transparent border border-[#2C2C2E] text-white text-center text-[15px] rounded-md outline-none focus:border-[var(--color-fit-green)] transition-colors"
                    placeholder="-"
                  />
                </div>
                <div className="w-10 flex justify-center">
                  <button 
                    onClick={() => toggleSet(set.id)}
                    className={`w-8 h-8 rounded-[10px] flex items-center justify-center transition-colors ${
                      set.completed ? 'bg-[var(--color-fit-green)] text-black' : 'bg-[#2C2C2E] text-white'
                    }`}
                  >
                    <Check className="w-4 h-4" strokeWidth={3} />
                  </button>
                </div>
              </div>
            ))}
            
            {/* Add Set Button */}
            <button 
              onClick={addSet}
              className="mt-3 w-full py-2.5 rounded-lg bg-[#2C2C2E] text-white font-medium text-[14px] hover:bg-[#3A3A3C] transition-colors"
            >
              + Adicionar série
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
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
  const [progress, setProgress] = useState<Record<string, { completed: number, total: number, volume: number }>>({});
  const [isRestTimerOpen, setIsRestTimerOpen] = useState(false);

  const handleProgressChange = (exerciseId: string, completed: number, total: number, volume: number) => {
    setProgress(prev => {
      if (prev[exerciseId]?.completed === completed && prev[exerciseId]?.total === total && prev[exerciseId]?.volume === volume) {
        return prev;
      }
      return { ...prev, [exerciseId]: { completed, total, volume } };
    });
  };

  const totalSets = Object.values(progress).reduce((acc, curr) => acc + curr.total, 0);
  const completedSets = Object.values(progress).reduce((acc, curr) => acc + curr.completed, 0);
  const totalVolume = Object.values(progress).reduce((acc, curr) => acc + curr.volume, 0);
  const progressPercentage = totalSets === 0 ? 0 : (completedSets / totalSets) * 100;
  const isAllCompleted = totalSets > 0 && completedSets === totalSets && exercises.length > 0;

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
          <button onClick={() => setIsRestTimerOpen(true)} className="p-2 -ml-2 rounded-full hover:bg-[var(--color-fit-panel)] transition-colors">
            <Timer className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <button
          onClick={() => onFinish(seconds)}
          className={`px-5 py-2 rounded-full font-sans font-black text-xs uppercase transition-colors active:scale-95 ${
            isAllCompleted 
              ? 'bg-[var(--color-fit-green)] text-black' 
              : 'bg-[#2A2A2A] text-[#8B8991]'
          }`}
        >
          Finalizar
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-[2px] bg-[#1C1C1E]">
        <div 
          className="h-full bg-[var(--color-fit-green)] transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
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
            <span className="text-white font-sans font-black text-base">{totalVolume.toLocaleString('pt-BR')} kg</span>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <span className="text-[var(--color-fit-muted)] font-sans font-bold text-[11px] uppercase mb-1">Séries</span>
            <span className="text-white font-sans font-black text-base">{completedSets}</span>
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
              <WorkoutExerciseItem
                key={exercise.id}
                exercise={exercise}
                onImageClick={() => onExerciseClick?.(exercise)}
                onRemove={() => setExerciseToDelete(exercise)}
                onProgressChange={(completed, total, volume) => handleProgressChange(exercise.id, completed, total, volume)}
              />
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
      
      {/* Rest Timer Modal */}
      <RestTimerModal 
        isOpen={isRestTimerOpen} 
        onClose={() => setIsRestTimerOpen(false)} 
      />
    </div>
  );
};
