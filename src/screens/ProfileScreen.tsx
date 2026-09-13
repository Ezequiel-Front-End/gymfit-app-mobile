import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, User, Settings, Bell, ReceiptText, Info, LogOut } from 'lucide-react';
import { BottomNavigation } from '../components/BottomNavigation';
import { TabId, UserProfile } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileScreenProps {
  user?: UserProfile | null;
  onBack: () => void;
  onNavigateTab: (tab: TabId) => void;
  onLogout: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onBack,
  onNavigateTab,
  onLogout,
  onModalStateChange,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>('perfil');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    onNavigateTab(tab);
  };

  const userName = user?.name || 'Melissa Stone';
  const userEmail = user?.email || 'melissa@exemplo.com';
  const initials = userName.charAt(0).toUpperCase();

  const options = [
    { id: 'meu_perfil', icon: User, label: 'Meu perfil', iconColor: 'text-[var(--color-fit-green)]', textColor: 'text-[var(--color-fit-text)]' },
    { id: 'configuracoes', icon: Settings, label: 'Configurações', iconColor: 'text-[var(--color-fit-text)]', textColor: 'text-[var(--color-fit-text)]' },
    { id: 'notificacoes', icon: Bell, label: 'Notificações', iconColor: 'text-[var(--color-fit-text)]', textColor: 'text-[var(--color-fit-text)]' },
    { id: 'historico', icon: ReceiptText, label: 'Histórico de transações', iconColor: 'text-[var(--color-fit-text)]', textColor: 'text-[var(--color-fit-text)]' },
    { id: 'faq', icon: Info, label: 'FAQ', iconColor: 'text-[var(--color-fit-text)]', textColor: 'text-[var(--color-fit-text)]' },
    { id: 'sobre', icon: Info, label: 'Sobre o app', iconColor: 'text-[var(--color-fit-text)]', textColor: 'text-[var(--color-fit-text)]' },
  ];

  return (
    <div className="relative w-full h-full min-h-screen sm:min-h-full flex-1 bg-[var(--color-fit-bg)] text-[var(--color-fit-text)] flex flex-col justify-between overflow-hidden select-none z-0">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        {/* Top Header */}
        <div className="px-6 pt-10 pb-2 flex items-center">
          <h1 className="font-sans font-black italic text-2xl tracking-tight text-white">
            Perfil
          </h1>
        </div>

        {/* Profile Info */}
        <div className="px-5 mt-6 flex flex-col items-start gap-4">
          <div className="w-[66px] h-[66px] rounded-full border-2 border-[var(--color-fit-green)] bg-gradient-to-br from-[var(--color-fit-green)] to-[#2A2A2A] flex items-center justify-center shadow-lg">
            <span className="text-[var(--color-fit-bg)] font-sans font-black italic text-[30px] leading-none translate-y-[-2px]">
              {initials}
            </span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-sans font-black italic text-[19px] leading-none">
              {userName}
            </h2>
            <p className="text-[var(--color-fit-muted)] font-bold text-[12px] mt-1.5">
              {userEmail}
            </p>
          </div>
        </div>

        {/* Options List */}
        <div className="px-5 mt-10 flex flex-col gap-3">
          {options.map((opt) => (
            <button
              key={opt.id}
              className="w-full h-[50px] bg-[var(--color-fit-panel)] border border-[#242424] rounded-2xl flex items-center justify-between px-4 active:scale-95 transition-transform"
            >
              <div className="flex items-center gap-4">
                <opt.icon className={`w-5 h-5 ${opt.iconColor}`} />
                <span className={`font-sans font-extrabold text-[14px] ${opt.textColor}`}>
                  {opt.label}
                </span>
              </div>
              <ChevronRight className="w-[18px] h-[18px] text-[var(--color-fit-muted)]" />
            </button>
          ))}

          {/* Logout Option */}
          <button
            onClick={() => {
              setShowLogoutModal(true);
              onModalStateChange?.(true);
            }}
            className="w-full h-[50px] bg-[var(--color-fit-panel)] border border-[#242424] rounded-2xl flex items-center justify-between px-4 active:scale-95 transition-transform mt-3"
          >
            <div className="flex items-center gap-4">
              <LogOut className="w-5 h-5 text-[var(--color-fit-red)]" />
              <span className="font-sans font-extrabold text-[14px] text-[var(--color-fit-red)]">
                Sair
              </span>
            </div>
            <ChevronRight className="w-[18px] h-[18px] text-[var(--color-fit-red)]" />
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal (Bottom Sheet) */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="absolute inset-0 z-[100] flex flex-col justify-end">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setShowLogoutModal(false);
                onModalStateChange?.(false);
              }}
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
              <div className="w-10 h-1.5 bg-[#3A3A3C] rounded-full mb-6" />
              
              <h2 className="font-sans font-bold text-[20px] text-white mb-2 text-center">
                Sair do aplicativo
              </h2>
              <p className="font-sans text-[14px] text-[#8E8E93] mb-6 text-center max-w-[280px]">
                Tem certeza que deseja sair da sua conta? Você precisará fazer login novamente.
              </p>
              
              <div className="w-full flex flex-col mt-2">
                <button 
                  className="w-full py-4 bg-[#2C2C2E] rounded-t-[14px] font-sans font-medium text-[16px] text-[#FF453A] border-b border-[#3A3A3C] active:bg-[#3A3A3C] transition-colors"
                  onClick={() => {
                    setShowLogoutModal(false);
                    onModalStateChange?.(false);
                    onLogout();
                  }}
                >
                  Sair do aplicativo
                </button>
                <button 
                  className="w-full py-4 bg-[#2C2C2E] rounded-b-[14px] font-sans font-medium text-[16px] text-white active:bg-[#3A3A3C] transition-colors"
                  onClick={() => {
                    setShowLogoutModal(false);
                    onModalStateChange?.(false);
                  }}
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
