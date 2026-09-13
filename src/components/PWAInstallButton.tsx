import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'full' | 'icon';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'compact' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleInstallClick = () => {
    if (isInstallable) {
      install();
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // Desktop Chrome or fallback: inform user how to install
      alert('Para instalar o PWA, use o menu do navegador (ícone de instalação na barra de endereço ou "Adicionar à tela inicial").');
    }
  };

  return (
    <>
      {variant === 'icon' ? (
        <button
          onClick={handleInstallClick}
          title="Instalar App GYMFIT"
          className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-[var(--color-fit-green)] transition active:scale-95"
        >
          <Download className="w-4 h-4" />
        </button>
      ) : variant === 'full' ? (
        <button
          onClick={handleInstallClick}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 px-4 py-3 text-sm font-semibold text-white transition active:scale-[0.99]"
        >
          <Smartphone className="w-4 h-4 text-[var(--color-fit-green)]" />
          <span>Instalar App no Celular</span>
        </button>
      ) : (
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-1.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/60 px-3 py-1 text-xs font-semibold text-zinc-200 transition active:scale-95"
        >
          <Download className="w-3 h-3 text-[var(--color-fit-green)]" />
          <span>Instalar PWA</span>
        </button>
      )}

      {/* iOS Guide Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[var(--color-fit-bg)]/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-[#121214] border border-zinc-800 p-6 shadow-2xl text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[var(--color-fit-green)]" />
                Instalar no iPhone / iPad
              </h3>
              <button
                onClick={() => setShowIOSModal(false)}
                className="p-1 rounded-full text-[var(--color-fit-muted)] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ol className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-zinc-800 text-[var(--color-fit-green)] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                <span>Abra no <strong>Safari</strong> e toque no botão <strong>Compartilhar</strong> (quadrado com seta para cima).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-zinc-800 text-[var(--color-fit-green)] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                <span>Role para baixo e toque em <strong>"Adicionar à Tela de Início"</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-zinc-800 text-[var(--color-fit-green)] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                <span>Toque em <strong>Adicionar</strong> no canto superior direito para instalar o <strong>GYMFIT</strong>.</span>
              </li>
            </ol>

            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-6 w-full rounded-full bg-[var(--color-fit-green)] py-2.5 text-sm font-bold text-black hover:brightness-105 transition"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};
