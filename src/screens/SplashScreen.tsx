import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { GymLogo } from '../components/GymLogo';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    // Automatically transition to Welcome screen after 2.8 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  // Generate 12 dots for the circular spinner
  const dots = Array.from({ length: 12 });

  return (
    <div
      onClick={onFinish}
      className="relative w-full h-full min-h-full flex-1 bg-[#070709] flex flex-col items-center justify-between py-10 px-6 overflow-hidden select-none cursor-pointer"
      style={{
        background: 'radial-gradient(circle at 50% 45%, #18181c 0%, #08080a 70%, #030304 100%)',
      }}
    >
      {/* Subtle background ambient glow */}
      <div className="absolute inset-0 bg-radial from-[#d4ff00]/5 via-transparent to-transparent pointer-events-none" />

      {/* Top spacer */}
      <div className="w-full h-4 sm:h-8" />

      {/* Center Brand Logo: Dumbbell + GYMFIT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center justify-center my-auto"
      >
        <GymLogo size="md" showText={true} />
      </motion.div>

      {/* Bottom Loading Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex flex-col items-center justify-center gap-4 pb-6 sm:pb-8"
      >
        {/* Custom 12-dot circular loader with rotating lime accent */}
        <div className="relative w-8 h-8 flex items-center justify-center">
          {dots.map((_, index) => {
            const angle = (index * 360) / 12;
            const rad = (angle * Math.PI) / 180;
            const radius = 12; // radius in px
            const x = Math.sin(rad) * radius;
            const y = -Math.cos(rad) * radius;

            return (
              <motion.div
                key={index}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                animate={{
                  backgroundColor: [
                    '#3f3f46',
                    '#71717a',
                    '#D4FF00',
                    '#a1a1aa',
                    '#3f3f46',
                  ],
                  scale: [0.85, 1, 1.35, 1, 0.85],
                  opacity: [0.35, 0.6, 1, 0.5, 0.35],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: (index * 1.2) / 12,
                  ease: 'easeInOut',
                }}
              />
            );
          })}
        </div>

        {/* Status Text */}
        <span className="text-[13px] text-zinc-400 font-medium tracking-wide">
          Preparando sua evolução...
        </span>
      </motion.div>
    </div>
  );
};
