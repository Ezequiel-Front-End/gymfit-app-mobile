import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-zinc-900/90 border border-yellow-500/50 px-3.5 py-1 text-xs font-semibold text-yellow-400 shadow-xl backdrop-blur-md">
      <WifiOff className="w-3.5 h-3.5" />
      <span>Modo Offline — Treinos em cache</span>
    </div>
  );
};
