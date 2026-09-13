import React from 'react';

interface GymLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const GymLogo: React.FC<GymLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const dimensions = {
    sm: { w: 140, h: 40, barW: 56, barH: 8, text: 'text-xl' },
    md: { w: 220, h: 64, barW: 88, barH: 12, text: 'text-2xl' },
    lg: { w: 300, h: 84, barW: 110, barH: 16, text: 'text-3xl' },
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Dumbbell Icon matching exact design */}
      <svg
        viewBox="0 0 260 70"
        className="w-auto"
        style={{ height: dimensions.h }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left Outer Plate (Shortest) */}
        <rect x="20" y="24" width="10" height="22" rx="5" fill="#ECECE5" />
        {/* Left Middle Plate */}
        <rect x="36" y="14" width="11" height="42" rx="5.5" fill="#ECECE5" />
        {/* Left Inner Plate (Tallest) */}
        <rect x="53" y="4" width="13" height="62" rx="6.5" fill="#ECECE5" />

        {/* Center Bar */}
        <rect x="73" y="30" width="114" height="11" rx="5.5" fill="#ECECE5" />

        {/* Right Inner Plate (Tallest) */}
        <rect x="194" y="4" width="13" height="62" rx="6.5" fill="#ECECE5" />
        {/* Right Middle Plate */}
        <rect x="213" y="14" width="11" height="42" rx="5.5" fill="#ECECE5" />
        {/* Right Outer Plate (Shortest) */}
        <rect x="230" y="24" width="10" height="22" rx="5" fill="#ECECE5" />
      </svg>

      {/* GYMFIT Brand Text */}
      {showText && (
        <span
          className={`font-display font-black italic tracking-[0.18em] text-white uppercase mt-4 ${dimensions.text}`}
          style={{ letterSpacing: '0.15em' }}
        >
          GYMFIT
        </span>
      )}
    </div>
  );
};
