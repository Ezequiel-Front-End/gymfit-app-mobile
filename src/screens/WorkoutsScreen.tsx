import React, { useState } from 'react';
import { ChevronLeft, Search, Play } from 'lucide-react';
import { TabId } from '../types';

interface WorkoutsScreenProps {
  onBack: () => void;
  onNavigateTab: (tab: TabId) => void;
  onSelectWorkout: (id: string) => void;
  onNewWorkout: () => void;
}

export const WorkoutsScreen: React.FC<WorkoutsScreenProps> = ({
  onBack,
  onNavigateTab,
  onSelectWorkout,
  onNewWorkout,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const workouts = [
    {
      id: 'chest_back',
      title: 'Peito + Costas',
      details: '20 min • 4 exercícios',
      image: 'https://images.unsplash.com/photo-1582910184841-2135ce4421bb?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'hiit_core',
      title: 'HIIT Core',
      details: '25 min • 5 exercícios',
      image: 'https://images.unsplash.com/photo-1744551154623-4b5336e95c28?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'arms',
      title: 'Super série braços',
      details: '30 min • 6 exercícios',
      image: 'https://images.unsplash.com/photo-1591027480007-a42f6ef886c3?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'jump_rope',
      title: 'Corda diária',
      details: '35 min • 7 exercícios',
      image: 'https://images.unsplash.com/photo-1750698544726-8bc312ac1ffd?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'legs',
      title: 'Treino pernas',
      details: '40 min • 8 exercícios',
      image: 'https://images.unsplash.com/photo-1544021601-3e5723f9d333?auto=format&fit=crop&q=80&w=600',
    },
  ];

  const filteredWorkouts = workouts.filter(workout =>
    workout.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full h-full min-h-screen sm:min-h-full flex-1 bg-[var(--color-fit-bg)] text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Top Header */}
      <div className="px-[18px] pt-16 pb-4 flex items-center gap-4">
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

      {/* Search and Title */}
      <div className="px-6 flex flex-col gap-[20px] mt-2 mb-[14px]">
        <div className="flex items-center gap-3 bg-[var(--color-fit-panel-2)] rounded-xl px-3.5 h-[42px]">
          <Search className="w-5 h-5 text-[var(--color-fit-muted)]" />
          <input
            type="text"
            placeholder="Buscar treinos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent flex-1 outline-none text-[12px] font-medium text-white placeholder:text-[var(--color-fit-muted)]"
          />
        </div>
        <h2 className="font-sans font-black italic text-[15px]">
          Escolha seu treino
        </h2>
      </div>

      {/* Workouts List */}
      <div className="flex-1 px-6 flex flex-col gap-3 overflow-y-auto no-scrollbar pb-32">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => (
            <button
              key={workout.id}
              onClick={() => onSelectWorkout(workout.id)}
              className="relative w-full h-[96px] rounded-[22px] overflow-hidden group bg-[var(--color-fit-panel)] cursor-pointer"
            >
              <img
                src={workout.image}
                alt={workout.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient Overlay specific to design */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#050B14F2] via-[#050B14CC] to-[#050B140D]" />
              
              <div className="absolute inset-0 p-[22px] flex flex-col justify-center items-start text-left">
                <h3 className="font-sans font-black italic text-[16px] text-white">
                  {workout.title}
                </h3>
                <p className="text-[#D8E0EA] text-[12px] font-bold mt-1">
                  {workout.details}
                </p>
              </div>
            </button>
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center opacity-60 mt-10">
            <Search className="w-10 h-10 text-[var(--color-fit-muted)] mb-3" />
            <span className="font-sans font-bold text-[14px] text-center px-4">
              Nenhum treino encontrado com esse nome.
            </span>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-8 right-6 z-50">
        <button
          onClick={onNewWorkout}
          className="flex items-center justify-center gap-2 bg-white rounded-full w-[200px] h-[48px] shadow-[0_8px_18px_rgba(0,0,0,0.4)] border border-[var(--color-fit-green)] active:scale-95 transition-transform"
        >
          <Play className="w-5 h-5 fill-[#050505] text-[#050505]" />
          <span className="text-[#050505] font-sans font-black text-[13px]">
            Iniciar novo treino
          </span>
        </button>
      </div>
    </div>
  );
};
