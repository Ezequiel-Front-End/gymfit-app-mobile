import React, { useState, useEffect, useMemo } from 'react';
import { X, Search, SlidersHorizontal, Plus, Bookmark, Dumbbell, UserRound, UsersRound, Shirt, List, Check } from 'lucide-react';
import { Exercise, fetchExercises } from '../api/exercises';

interface AddExercisesScreenProps {
  onClose: () => void;
  onAddSelected: (exercises: Exercise[]) => void;
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

const formatExerciseName = (name: string) => {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

export const AddExercisesScreen: React.FC<AddExercisesScreenProps> = ({ onClose, onAddSelected }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const categories = useMemo(() => {
    const uniqueCategories = new Set(exercises.map(ex => ex.targetMuscle));
    const sortedCategories = Array.from(uniqueCategories).sort();
    return ['Todos', ...sortedCategories];
  }, [exercises]);
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchExercises();
      setExercises(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredExercises = exercises.filter(ex => {
    if (showFavoritesOnly && !favorites.includes(ex.id)) return false;
    if (activeCategory !== 'Todos' && ex.targetMuscle !== activeCategory) return false;
    if (searchQuery.trim().length > 0) {
      const formattedName = formatExerciseName(ex.name);
      if (!formattedName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    }
    return true;
  });

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const toggleSelection = (exercise: Exercise) => {
    setSelectedExercises(prev => {
      const isSelected = prev.some(e => e.id === exercise.id);
      if (isSelected) {
        return prev.filter(e => e.id !== exercise.id);
      }
      return [...prev, exercise];
    });
  };

  const handleAddSelected = () => {
    if (selectedExercises.length > 0) {
      onAddSelected(selectedExercises);
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen sm:min-h-full flex-1 bg-black text-white flex flex-col overflow-hidden select-none z-50">
      {/* Header */}
      <div className="px-[22px] pt-16 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1 -ml-1 rounded-full hover:bg-[#111] transition-colors">
            <X className="w-[22px] h-[22px] text-white" />
          </button>
          <h1 className="font-sans font-extrabold text-[15px] sm:text-[17px]">Adicionar exercícios</h1>
        </div>
        <div className="flex items-center gap-[18px] flex-1 justify-end ml-4 transition-all">
          {isSearching ? (
            <div className="flex-1 flex items-center bg-[#18181B] rounded-full px-3 py-1.5 border border-[#333] max-w-[200px]">
              <Search className="w-[16px] h-[16px] text-[#A1A1AA] mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar..."
                className="flex-1 bg-transparent outline-none text-[14px] text-white placeholder:text-[#A1A1AA] min-w-0"
                autoFocus
              />
              <button onClick={() => { setIsSearching(false); setSearchQuery(''); }} className="ml-2 shrink-0">
                <X className="w-[16px] h-[16px] text-[#A1A1AA]" />
              </button>
            </div>
          ) : (
            <>
              <button onClick={() => setIsSearching(true)} className="active:scale-95 transition-transform">
                <Search className="w-[22px] h-[22px] text-white" />
              </button>
              <SlidersHorizontal className="w-[24px] h-[24px] text-white" />
              <Plus className="w-[22px] h-[22px] text-white" />
            </>
          )}
        </div>
      </div>

      {/* Categories Horizontal Scroll */}
      <div className="px-[22px] mt-2 flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
        <button 
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`flex items-center justify-center w-10 h-10 rounded-[12px] flex-shrink-0 transition-colors mr-2 ${
            showFavoritesOnly ? 'bg-[var(--color-fit-green)]' : 'bg-[#18181B] hover:bg-[#27272A]'
          }`}
        >
          <Bookmark className={`w-[20px] h-[20px] ${showFavoritesOnly ? 'text-black fill-black' : 'text-white'}`} />
        </button>
        
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-[12px] font-sans font-bold text-[12px] sm:text-[13px] whitespace-nowrap transition-colors flex-shrink-0 ${
              activeCategory === cat
                ? 'bg-[var(--color-fit-green)] text-black'
                : 'bg-[#18181B] text-white hover:bg-[#27272A]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List Header */}
      <div className="px-[22px] mt-4 flex items-center justify-between">
        <h2 className="font-sans font-extrabold text-[13px] sm:text-[14px] text-white">
          {showFavoritesOnly 
            ? activeCategory === 'Todos' ? 'Seus Favoritos' : `Favoritos: ${activeCategory}`
            : activeCategory === 'Todos' ? 'Todos os exercícios' : `Exercícios para ${activeCategory}`
          }
        </h2>
        <List className="w-[20px] h-[20px] text-[#A1A1AA]" />
      </div>

      {/* Exercises Grid */}
      <div className="flex-1 px-[22px] mt-4 overflow-y-auto no-scrollbar pb-28">
        {loading ? (
          <div className="w-full flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#2A2A2A] border-t-[var(--color-fit-green)] rounded-full animate-spin" />
          </div>
        ) : filteredExercises.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-center opacity-80 pt-20">
            <Bookmark className="w-12 h-12 text-[#333] mb-4" strokeWidth={1.5} />
            <h3 className="font-sans font-bold text-[18px] text-white">
              {showFavoritesOnly ? "Nenhum exercício favoritado" : "Nenhum exercício encontrado"}
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-[14px]">
            {filteredExercises.map((exercise) => {
              const isSelected = selectedExercises.some(e => e.id === exercise.id);
              const isFavorite = favorites.includes(exercise.id);
              
              return (
                <div
                  key={exercise.id}
                  onClick={() => toggleSelection(exercise)}
                  className={`w-full h-full bg-[#262428] rounded-[10px] overflow-hidden flex flex-col relative cursor-pointer transition-all ${
                    isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''
                  }`}
                >
                  {/* Top Icons */}
                  <div className="absolute top-0 w-full px-3.5 py-3.5 flex justify-between z-10 pointer-events-none">
                    <button 
                      className="pointer-events-auto"
                      onClick={(e) => toggleFavorite(e, exercise.id)}
                    >
                      <Bookmark 
                        className={`w-[18px] h-[18px] stroke-[2] transition-colors ${isFavorite ? 'text-[var(--color-fit-green)] fill-[var(--color-fit-green)]' : 'text-[#B8B8BE]'}`} 
                      />
                    </button>
                    <button className="pointer-events-auto text-white font-sans font-bold text-[14px] sm:text-[16px] leading-none">
                      {isSelected ? <Check className="w-5 h-5 text-white" strokeWidth={3} /> : null}
                    </button>
                  </div>

                  {/* Image container */}
                  <div className="w-full aspect-[4/5] shrink-0 bg-[#262428] relative flex items-center justify-center p-4">
                    <img
                      src={exercise.imageUrl || exercise.gifUrl}
                      alt={exercise.name}
                      className="w-[90%] h-[90%] object-contain rounded-md"
                      style={{ filter: 'invert(1) hue-rotate(180deg) contrast(1.2)', mixBlendMode: 'screen' }}
                      loading="lazy"
                    />
                  </div>

                  {/* Info Bar */}
                  <div className="w-full flex-1 bg-[#302E33] px-3.5 py-3.5 flex flex-col justify-start">
                    <span className="font-sans font-extrabold text-[12px] sm:text-[14px] leading-tight text-white mb-1.5">
                      {formatExerciseName(exercise.name)}
                    </span>
                    <span className="font-sans font-semibold text-[10px] sm:text-[11.5px] text-[#B8B8BE] capitalize mt-auto">
                      {exercise.targetMuscle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      {selectedExercises.length > 0 && (
        <div className="absolute bottom-8 left-0 right-0 px-[22px] flex justify-center z-20">
          <button
            onClick={handleAddSelected}
            className="w-full max-w-sm h-[56px] bg-white text-black font-sans font-bold text-[15px] rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform"
          >
            Adicionar {selectedExercises.length} {selectedExercises.length === 1 ? 'exercício' : 'exercícios'}
          </button>
        </div>
      )}
    </div>
  );
};
