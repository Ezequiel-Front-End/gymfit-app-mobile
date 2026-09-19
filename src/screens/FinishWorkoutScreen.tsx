import React, { useState } from 'react';
import { ChevronLeft, Camera, Calendar, Clock, Dumbbell, Gauge, Lock, ChevronDown, X, Heart, Flame, RefreshCcw, Zap, TrendingUp, Activity, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface FinishWorkoutScreenProps {
  durationSeconds: number;
  onBack: () => void;
  onSave: () => void;
  onDiscard: () => void;
}

export const FinishWorkoutScreen: React.FC<FinishWorkoutScreenProps> = ({
  durationSeconds,
  onBack,
  onSave,
  onDiscard
}) => {
  const [workoutName, setWorkoutName] = useState('Sessão da manhã');
  const [notes, setNotes] = useState('');
  const [privateNotes, setPrivateNotes] = useState('');
  
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isRPEModalOpen, setIsRPEModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [category, setCategory] = useState('Musculação');
  const [rpe, setRPE] = useState<number | null>(null);

  const categories = [
    { name: 'Musculação', icon: Dumbbell },
    { name: 'Cardio', icon: Heart },
    { name: 'HIIT', icon: Flame },
    { name: 'Híbrido', icon: RefreshCcw },
    { name: 'CrossFit', icon: Zap },
    { name: 'Remo', icon: TrendingUp },
    { name: 'Yoga', icon: Activity },
  ];

  const CurrentCategoryIcon = categories.find(c => c.name === category)?.icon || Dumbbell;

  const formatDuration = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    if (hrs > 0) return `${hrs}h ${mins}m`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  const getTodayTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const mins = now.getMinutes().toString().padStart(2, '0');
    return `Hoje às ${hours}:${mins}`;
  };

  return (
    <div className="w-full h-full min-h-screen bg-[#000000] flex flex-col font-sans overflow-hidden">
      {/* Header */}
      <header className="px-5 pt-16 pb-4 flex items-center justify-between shrink-0">
        <button onClick={onBack} className="flex items-center gap-1 text-white hover:opacity-80 transition-opacity">
          <ChevronLeft size={24} />
          <span className="text-[16px] font-medium">Retomar</span>
        </button>
        <h1 className="text-[17px] font-bold text-white absolute left-1/2 -translate-x-1/2">
          Finalizar treino
        </h1>
        <div className="w-20" /> {/* Spacer for centering */}
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-8 flex flex-col gap-4">
        
        {/* Name Input */}
        <div className="w-full bg-[#000000] border border-[#2C2C2E] rounded-[12px] px-4 py-4 focus-within:border-[#8B8991] transition-colors">
          <input
            type="text"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            placeholder="Nome do treino"
            className="w-full bg-transparent text-white text-[16px] outline-none placeholder-[#8B8991]"
          />
        </div>

        {/* Public Notes Textarea */}
        <div className="w-full bg-[#000000] border border-[#2C2C2E] rounded-[12px] px-4 py-4 focus-within:border-[#8B8991] transition-colors">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Como foi? Conta mais sobre o seu treino."
            rows={3}
            className="w-full bg-transparent text-white text-[15px] outline-none resize-none placeholder-[#8B8991]"
          />
        </div>

        {/* Photo/Video upload area */}
        <button className="w-full h-[140px] rounded-[12px] border border-dashed border-[#8B8991] bg-[#000000] flex flex-col items-center justify-center gap-2 hover:bg-[#1C1C1E] transition-colors active:scale-[0.98]">
          <Camera size={24} className="text-white" strokeWidth={1.5} />
          <span className="text-white text-[15px] font-medium">Adicionar fotos/vídeos</span>
        </button>

        {/* Detalhes Section */}
        <div className="mt-4 flex flex-col gap-3">
          <h2 className="text-white font-bold text-[16px] mb-1">Detalhes</h2>

          {/* Date */}
          <button className="w-full bg-[#000000] border border-[#2C2C2E] rounded-[12px] px-4 py-4 flex items-center justify-between active:scale-[0.98] transition-all">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-[#8B8991]" strokeWidth={1.5} />
              <span className="text-white text-[15px]">{getTodayTime()}</span>
            </div>
            <ChevronDown size={20} className="text-[#8B8991]" />
          </button>

          {/* Duration */}
          <button className="w-full bg-[#000000] border border-[#2C2C2E] rounded-[12px] px-4 py-4 flex items-center justify-between active:scale-[0.98] transition-all">
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-[#8B8991]" strokeWidth={1.5} />
              <span className="text-white text-[15px]">{formatDuration(durationSeconds)}</span>
            </div>
            <ChevronDown size={20} className="text-[#8B8991]" />
          </button>

          {/* Category */}
          <button 
            onClick={() => setIsCategoryModalOpen(true)}
            className="w-full bg-[#000000] border border-[#2C2C2E] rounded-[12px] px-4 py-4 flex items-center justify-between active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3">
              <CurrentCategoryIcon size={20} className="text-[#8B8991]" strokeWidth={1.5} />
              <span className="text-white text-[15px]">{category}</span>
            </div>
            <ChevronDown size={20} className="text-[#8B8991]" />
          </button>

          {/* Difficulty */}
          <button 
            onClick={() => setIsRPEModalOpen(true)}
            className="w-full bg-[#000000] border border-[#2C2C2E] rounded-[12px] px-4 py-4 flex items-center justify-between active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-3">
              <Gauge size={20} className="text-[#8B8991]" strokeWidth={1.5} />
              <span className={rpe !== null ? "text-white text-[15px]" : "text-[#8B8991] text-[15px]"}>
                {rpe !== null ? `RPE: ${rpe.toFixed(1)}` : 'Quão puxado foi esse treino?'}
              </span>
            </div>
            <ChevronDown size={20} className="text-[#8B8991]" />
          </button>

          {/* Private Notes */}
          <div className="w-full bg-[#000000] border border-[#2C2C2E] rounded-[12px] px-4 py-4 focus-within:border-[#8B8991] transition-colors flex gap-3">
            <Lock size={20} className="text-[#8B8991] shrink-0 mt-0.5" strokeWidth={1.5} />
            <textarea
              value={privateNotes}
              onChange={(e) => setPrivateNotes(e.target.value)}
              placeholder="Notas particulares..."
              rows={3}
              className="w-full bg-transparent text-white text-[15px] outline-none resize-none placeholder-[#8B8991]"
            />
          </div>
        </div>

        {/* Discard Button */}
        <button 
          onClick={onDiscard}
          className="mt-6 w-full py-4 text-[#FF3B30] font-bold text-[15px] flex items-center justify-center hover:bg-[#1C1C1E] rounded-[12px] transition-colors"
        >
          Descartar treino
        </button>

      </div>

      {/* Footer Save Button */}
      <div className="px-5 pb-8 pt-4 bg-[#000000] shrink-0 border-t border-[#1C1C1E]">
        <button 
          onClick={() => setIsSuccessModalOpen(true)}
          className="w-full h-[56px] bg-white text-black rounded-full font-bold text-[16px] flex items-center justify-center active:scale-[0.98] transition-transform"
        >
          Salvar
        </button>
      </div>

      {/* Category Modal */}
      <AnimatePresence>
        {isCategoryModalOpen && (
          <div className="absolute inset-0 z-[100] flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCategoryModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full bg-[#1C1C1E] rounded-t-[20px] flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-center p-4 relative border-b border-[#2C2C2E]">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-[#3A3A3C] rounded-full" />
                <h3 className="text-white font-bold text-[16px] mt-2">Tipo de treino</h3>
                <button onClick={() => setIsCategoryModalOpen(false)} className="absolute right-4 top-4">
                  <X size={20} className="text-[#8B8991]" />
                </button>
              </div>
              <div className="p-5 overflow-y-auto no-scrollbar">
                <h4 className="text-white font-bold mb-3">Academia</h4>
                <div className="flex flex-col gap-3">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = category === cat.name;
                    return (
                      <button
                        key={cat.name}
                        onClick={() => {
                          setCategory(cat.name);
                          setIsCategoryModalOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-4 rounded-[12px] border transition-colors ${
                          isSelected ? 'bg-[#2C2C2E] border-white' : 'bg-transparent border-[#2C2C2E] hover:border-[#3A3A3C]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={20} className="text-white" />
                          <span className="text-white text-[15px]">{cat.name}</span>
                        </div>
                        {isSelected && <Check size={20} className="text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RPE Modal */}
      <AnimatePresence>
        {isRPEModalOpen && (
          <div className="absolute inset-0 z-[100] flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRPEModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full bg-[#1C1C1E] rounded-t-[20px] flex flex-col pb-8"
            >
              <div className="flex items-center justify-center p-4 relative border-b border-[#2C2C2E]">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-[#3A3A3C] rounded-full" />
                <h3 className="text-white font-bold text-[16px] mt-2">Esforço da sessão (RPE)</h3>
                <button onClick={() => setIsRPEModalOpen(false)} className="absolute right-4 top-4">
                  <X size={20} className="text-[#8B8991]" />
                </button>
              </div>
              <div className="p-8 flex flex-col items-center relative">
                <span className="text-[64px] font-black text-white leading-none">
                  {rpe !== null ? rpe.toFixed(1) : '-'}
                </span>
                <span className="text-white text-[18px] font-bold mt-4 mb-10">
                  {rpe === null ? 'Sem registro' : rpe < 3 ? 'Fácil' : rpe < 7 ? 'Moderado' : rpe < 9 ? 'Difícil' : 'Esforço máximo'}
                </span>
                
                {/* Slider Container */}
                <div className="w-full relative h-[48px] bg-[#2C2C2E] rounded-full flex items-center px-4 overflow-visible">
                  <span className="text-[#8B8991] text-[12px] absolute left-6 z-0 pointer-events-none">Fácil</span>
                  <span className="text-[#8B8991] text-[12px] absolute right-6 z-0 pointer-events-none">Esforço máximo</span>
                  
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={rpe || 0}
                    onChange={(e) => setRPE(parseFloat(e.target.value))}
                    className="w-full absolute inset-0 opacity-0 cursor-pointer z-20"
                  />
                  
                  {/* Thumb */}
                  {rpe !== null && (
                    <div 
                      className="absolute h-[56px] w-[56px] bg-white rounded-full flex items-center justify-center shadow-lg z-10 top-1/2 -translate-y-1/2 pointer-events-none"
                      style={{ left: `calc(${rpe * 10}% - 28px)` }}
                    >
                      <span className="text-black font-bold text-[15px]">{rpe.toFixed(1)}</span>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => setRPE(null)}
                  className="mt-8 text-[#8B8991] text-[15px] font-medium"
                >
                  Limpar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="absolute inset-0 z-[200] bg-black flex flex-col items-center justify-center px-6"
          >
            <div className="w-full max-w-[300px] aspect-square rounded-2xl overflow-hidden mb-8 shadow-2xl relative">
              <img 
                src="/workout_success.png" 
                alt="Treino Concluído" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white text-[28px] font-black uppercase text-center tracking-wide mb-2"
            >
              Treino Concluído!
            </motion.h2>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[#8B8991] text-[16px] text-center mb-12"
            >
              Excelente trabalho. Seu progresso foi salvo.
            </motion.p>
            
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={onSave}
              className="w-full h-[56px] bg-[var(--color-fit-green)] text-black rounded-full font-bold text-[16px] flex items-center justify-center active:scale-[0.98] transition-transform"
            >
              Continuar
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
