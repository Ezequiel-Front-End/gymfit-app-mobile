import React, { useState } from 'react';
import { ChevronLeft, Smartphone, Mail, MessageSquare, FileText } from 'lucide-react';

interface NotificationSettingsScreenProps {
  onBack: () => void;
}

interface ToggleRowProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onToggle: () => void;
  isLast?: boolean;
}

const ToggleRow: React.FC<ToggleRowProps> = ({ icon: Icon, label, isActive, onToggle, isLast }) => (
  <div className="flex flex-col">
    <div className="flex items-center justify-between py-5">
      <div className="flex items-center gap-4">
        <Icon className="w-[22px] h-[22px] text-[var(--color-fit-muted)]" strokeWidth={1.5} />
        <span className="font-sans font-bold text-[15px] text-white">
          {label}
        </span>
      </div>
      
      {/* Custom Toggle Switch */}
      <button 
        onClick={onToggle}
        className={`w-12 h-[28px] rounded-full relative transition-colors duration-300 ease-in-out ${isActive ? 'bg-[var(--color-fit-green)]' : 'bg-[#333]'}`}
      >
        <div 
          className={`w-[22px] h-[22px] rounded-full bg-white absolute top-[3px] transition-transform duration-300 shadow-sm ${isActive ? 'translate-x-[22px]' : 'translate-x-[3px]'}`}
        />
      </button>
    </div>
    {!isLast && <div className="w-full h-[1px] bg-[#222]" />}
  </div>
);

export const NotificationSettingsScreen: React.FC<NotificationSettingsScreenProps> = ({ onBack }) => {
  const [settings, setSettings] = useState({
    push: true,
    email: false,
    sms: false,
    newsletter: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-full h-full min-h-screen bg-[var(--color-fit-bg)] flex flex-col font-sans select-none z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4 shrink-0 bg-[var(--color-fit-bg)] sticky top-0 z-10">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full active:bg-[#222] transition-colors -ml-2"
        >
          <ChevronLeft className="w-[26px] h-[26px] text-white" />
        </button>
        
        <h1 className="text-[17px] font-bold text-white tracking-tight absolute left-1/2 -translate-x-1/2">
          Notificações
        </h1>
        
        <div className="w-10 h-10" /> {/* Spacer for centering */}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-8 pt-4">
        <h2 className="text-[15px] font-extrabold text-white mb-4 tracking-tight">
          Configurações de Notificações
        </h2>

        {/* Settings Card */}
        <div className="w-full bg-[var(--color-fit-panel)] border border-[#222] rounded-[24px] px-5 py-2">
          <ToggleRow 
            icon={Smartphone} 
            label="Notificações Push" 
            isActive={settings.push} 
            onToggle={() => toggleSetting('push')} 
          />
          <ToggleRow 
            icon={Mail} 
            label="Notificações por Email" 
            isActive={settings.email} 
            onToggle={() => toggleSetting('email')} 
          />
          <ToggleRow 
            icon={MessageSquare} 
            label="Notificações por SMS" 
            isActive={settings.sms} 
            onToggle={() => toggleSetting('sms')} 
          />
          <ToggleRow 
            icon={FileText} 
            label="Newsletter Semanal" 
            isActive={settings.newsletter} 
            onToggle={() => toggleSetting('newsletter')} 
            isLast={true}
          />
        </div>
      </div>
    </div>
  );
};
