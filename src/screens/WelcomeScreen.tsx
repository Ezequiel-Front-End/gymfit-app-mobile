import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // High quality gym photo matching the athletic woman lunging in gym
  const gymPhotoUrl =
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1080&auto=format&fit=crop';

  return (
    <div className="relative w-full h-full min-h-screen sm:min-h-full flex-1 bg-[#070709] flex flex-col justify-end overflow-hidden select-none">
      {/* Background Photography with fallback */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={gymPhotoUrl}
          alt="Treino na academia"
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-[center_top] transition-opacity duration-700 ${
            imageLoaded ? 'opacity-90 scale-100' : 'opacity-40 scale-105'
          }`}
        />

        {/* Fallback gradient if offline or loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black opacity-80" />
        )}

        {/* Vignette and Dark Gradients for typography contrast */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none" />
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 w-full px-6 pb-10 pt-16 flex flex-col max-w-md mx-auto">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-2 sm:mb-3"
        >
          <h1 className="font-sans font-black italic text-4xl sm:text-[44px] leading-[1.05] tracking-tight text-white uppercase drop-shadow-md">
            Energize <br />
            sua vida
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="text-zinc-300 text-sm sm:text-base font-normal leading-relaxed max-w-[320px] mb-6 sm:mb-8"
        >
          Alcance seus objetivos com treinos guiados para força, resistência e bem-estar.
        </motion.p>

        {/* Floating CTA Pill Button */}
        <motion.button
          onClick={onStart}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-full bg-[var(--color-fit-bg)]/85 backdrop-blur-md border border-white/15 px-5 py-3 sm:py-3.5 flex items-center justify-between shadow-2xl transition hover:border-white/35 cursor-pointer group text-left"
        >
          <div className="flex flex-col">
            <span className="font-sans font-black italic text-white text-base sm:text-lg tracking-wide group-hover:text-zinc-100">
              Começar agora
            </span>
            <span className="font-sans italic text-xs text-[var(--color-fit-muted)] font-medium mt-0.5">
              Treinos guiados para evoluir
            </span>
          </div>

          {/* Lime Circle CTA Button */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[var(--color-fit-green)] flex items-center justify-center text-black shadow-lg shrink-0 transition-transform group-hover:scale-105 group-hover:bg-[#ddff22] group-active:scale-95">
            <ArrowRight className="w-5 h-5 stroke-[2.8]" />
          </div>
        </motion.button>
      </div>
    </div>
  );
};
