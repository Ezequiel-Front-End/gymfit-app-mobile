import React from 'react';
import { ChevronLeft, Phone, Mail, MapPin, ChevronRight, FileText, CreditCard, Building2, Pencil } from 'lucide-react';
import { UserProfile } from '../types';

interface MyProfileScreenProps {
  user?: UserProfile | null;
  onBack: () => void;
}

interface InfoRowProps {
  icon: React.ElementType;
  label: string;
  value: string;
  isLast?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon: Icon, label, value, isLast }) => (
  <div className="flex flex-col">
    <button className="flex items-center justify-between py-4 px-4 w-full active:bg-[#222] transition-colors rounded-xl">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-2xl bg-[#222] flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-[var(--color-fit-muted)]" strokeWidth={1.5} />
        </div>
        <div className="flex flex-col items-start text-left">
          <span className="text-[10px] font-bold text-[#888] uppercase tracking-wider mb-0.5">
            {label}
          </span>
          <span className="text-[14px] font-extrabold text-white">
            {value}
          </span>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-[#444]" />
    </button>
    {!isLast && <div className="w-full h-[1px] bg-[#222] ml-[72px]" />}
  </div>
);

interface DocCardProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
}

const DocCard: React.FC<DocCardProps> = ({ icon: Icon, title, subtitle }) => (
  <button className="flex flex-col shrink-0 w-[110px] bg-[var(--color-fit-panel)] border border-[#222] rounded-[20px] p-4 active:scale-95 transition-transform text-left">
    <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center mb-3">
      <Icon className="w-4 h-4 text-white" strokeWidth={2} />
    </div>
    <span className="text-[13px] font-extrabold text-white mb-1 truncate w-full">
      {title}
    </span>
    <span className="text-[10px] font-bold text-[#666] truncate w-full">
      {subtitle}
    </span>
  </button>
);

export const MyProfileScreen: React.FC<MyProfileScreenProps> = ({ user, onBack }) => {
  const userName = user?.name || 'Melissa Stone';
  const userEmail = user?.email || 'melissa@exemplo.com';
  
  // Fake Avatar
  const avatarUrl = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop';

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
          Perfil
        </h1>
        
        <div className="w-10 h-10 -mr-2" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-12">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mt-6 px-5">
          <div className="relative">
            <div className="w-[110px] h-[110px] rounded-full overflow-hidden border-4 border-[#111] shadow-2xl">
              <img 
                src={avatarUrl} 
                alt={userName} 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Edit Button overlay */}
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg active:scale-95 transition-transform border-2 border-[#111]">
              <Pencil className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
            </button>
          </div>
          
          <h2 className="font-sans font-black italic text-[24px] text-white mt-5 tracking-tight">
            {userName}
          </h2>
        </div>

        {/* Contact Info Card */}
        <div className="px-5 mt-8">
          <div className="w-full bg-[var(--color-fit-panel)] border border-[#222] rounded-[28px] p-2 shadow-lg">
            <InfoRow icon={Phone} label="Telefone" value="+55 11 99999-9999" />
            <InfoRow icon={Mail} label="Email" value={userEmail} />
            <InfoRow icon={MapPin} label="Endereço" value="São Paulo, SP" isLast={true} />
          </div>
        </div>

        {/* Documents Section */}
        <div className="mt-10 mb-8">
          <button className="w-full px-5 flex items-center justify-between active:opacity-70 transition-opacity mb-4">
            <h3 className="font-sans font-black italic text-[18px] text-white tracking-tight">
              Meus documentos
            </h3>
            <ChevronRight className="w-[22px] h-[22px] text-[#666]" />
          </button>
          
          {/* Horizontal Scroll for Cards */}
          <div className="flex items-center gap-3 px-5 overflow-x-auto no-scrollbar pb-2">
            <DocCard icon={FileText} title="Passaporte" subtitle="7844 882XX482" />
            <DocCard icon={CreditCard} title="CPF / RG" subtitle="222.XXX.131-88" />
            <DocCard icon={Building2} title="TIN" subtitle="319481XXX1929" />
          </div>
        </div>
      </div>
    </div>
  );
};
