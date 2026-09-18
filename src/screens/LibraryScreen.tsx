import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ArrowUpDown, Grid2X2, Bookmark, Users, UserPlus, History, X, Search } from 'lucide-react';
import { TabId } from '../types';

interface LibraryScreenProps {
  onBack: () => void;
  onNavigateTab: (tab: TabId) => void;
}

const FAKE_STUDENTS = [
  { id: 1, name: 'Lucas Silva', email: 'lucas.silva@gmail.com', color: '#FFB800' },
  { id: 2, name: 'Mariana Costa', email: 'mariana.costa@yahoo.com', color: '#00D1FF' },
  { id: 3, name: 'Pedro Alves', email: 'pedro.alves@hotmail.com', color: '#FF3B30' },
  { id: 4, name: 'Ana Beatriz', email: 'ana.b@gmail.com', color: '#34C759' },
  { id: 5, name: 'João Santos', email: 'joao.santos@outlook.com', color: '#AF52DE' },
  { id: 6, name: 'Julia Ferreira', email: 'julia.f@gmail.com', color: '#FF9500' },
  { id: 7, name: 'Rafael Souza', email: 'rafael.s@yahoo.com', color: '#5856D6' },
  { id: 8, name: 'Camila Lima', email: 'camila.lima@gmail.com', color: '#FF2D55' },
  { id: 9, name: 'Thiago Gomes', email: 'thiago.g@hotmail.com', color: '#5AC8FA' },
  { id: 10, name: 'Beatriz Rocha', email: 'beatriz.r@gmail.com', color: '#4CD964' },
];

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

const StudentListModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');

  const filtered = FAKE_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-[100] flex flex-col justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full bg-[#1C1C1E] text-white rounded-t-[24px] px-5 pt-3 pb-8 flex flex-col max-h-[85vh]"
          >
            {/* Drag Handle */}
            <div className="w-10 h-1.5 bg-[#3A3A3C] rounded-full mb-4 shrink-0 mx-auto" />
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#2C2C2E] shrink-0">
              <h2 className="text-white font-sans font-bold text-[18px]">Selecionar aluno</h2>
              <button onClick={onClose} className="p-1.5 bg-[#2C2C2E] rounded-full active:scale-95 transition-transform">
                <X size={18} color="#FFFFFF" />
              </button>
            </div>

            {/* Search */}
            <div className="py-4 shrink-0">
              <div className="w-full h-[44px] bg-[#2C2C2E] rounded-[12px] flex items-center px-3 gap-2 border border-[#3A3A3C] focus-within:border-[var(--color-fit-green)] transition-colors">
                <Search size={18} color="#8B8991" />
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Pesquisar aluno..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-[15px] placeholder-[#8B8991]"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-2">
              <div className="flex flex-col gap-2">
                {filtered.map(student => (
                  <button 
                    key={student.id}
                    className="w-full flex items-center gap-4 p-3 rounded-[12px] hover:bg-[#2C2C2E] active:bg-[#3A3A3C] transition-colors text-left"
                  >
                    <div 
                      className="w-[46px] h-[46px] rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: student.color + '25', border: `1px solid ${student.color}40` }}
                    >
                      <span className="font-bold text-[15px]" style={{ color: student.color }}>
                        {getInitials(student.name)}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col overflow-hidden">
                      <span className="text-[15px] font-bold text-white truncate">{student.name}</span>
                      <span className="text-[13px] font-medium text-[#8B8991] truncate">{student.email}</span>
                    </div>
                  </button>
                ))}
              </div>
              
              {filtered.length === 0 && (
                <div className="py-10 flex items-center justify-center">
                  <span className="text-[#8B8991] text-[14px]">Nenhum aluno encontrado</span>
                </div>
              )}
            </div>

            {/* Footer button */}
            <div className="pt-4 border-t border-[#2C2C2E] shrink-0 mt-2">
              <button className="w-full py-3 rounded-full bg-[#2C2C2E] text-white font-medium text-[15px] flex items-center justify-center gap-2 active:scale-95 transition-transform">
                <Plus size={18} />
                <span>Novo Aluno</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const LibraryScreen: React.FC<LibraryScreenProps> = ({ onBack, onNavigateTab }) => {
  const [activeTab, setActiveTab] = useState<'Programas' | 'Rotinas' | 'Exercícios'>('Programas');
  const [isStudentListOpen, setIsStudentListOpen] = useState(false);

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

          {/* Create Workout for Student */}
          <button type="button" className="flex items-center gap-4 w-full text-left group">
            <div className="w-[58px] h-[58px] bg-[#252229] rounded-[3px] flex items-center justify-center shrink-0 group-active:scale-95 transition-transform">
              <UserPlus size={24} color="#FFFFFF" />
            </div>
            <div className="flex-1">
              <span className="text-[14px] font-[500] text-white">Criar treino para aluno</span>
            </div>
          </button>

          {/* Student List */}
          <button 
            type="button" 
            onClick={() => setIsStudentListOpen(true)}
            className="flex items-center gap-4 w-full text-left group"
          >
            <div className="w-[58px] h-[58px] bg-[#252229] rounded-[3px] flex items-center justify-center shrink-0 group-active:scale-95 transition-transform">
              <Users size={24} color="#FFFFFF" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <span className="text-[14px] font-[500] text-white mb-0.5">Lista de alunos</span>
              <span className="text-[11px] font-normal text-[#8B8991]">Gerenciar seus alunos</span>
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

          {/* History Item */}
          <button type="button" className="flex items-center gap-4 w-full text-left group">
            <div className="w-[58px] h-[58px] bg-[#252229] rounded-[3px] flex items-center justify-center shrink-0 group-active:scale-95 transition-transform">
              <History size={24} color="#FFFFFF" strokeWidth={2} />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <span className="text-[14px] font-[500] text-white mb-0.5">Histórico</span>
              <span className="text-[11px] font-normal text-[#8B8991]">Ver treinos concluídos</span>
            </div>
          </button>
        </div>
      </div>

      <StudentListModal 
        isOpen={isStudentListOpen} 
        onClose={() => setIsStudentListOpen(false)} 
      />
    </div>
  );
};
