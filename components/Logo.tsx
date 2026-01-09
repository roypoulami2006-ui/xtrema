
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  textSize?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-16 h-16", showText = true, textSize = "text-3xl" }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Blue Gradient: Bottom-Left (Light Cyan) to Top-Right (Deep Blue) */}
          <linearGradient id="xtremaBlueGrad" x1="20" y1="80" x2="80" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
          
          {/* Orange Gradient: Top-Left (Yellow) to Bottom-Right (Deep Orange) */}
          <linearGradient id="xtremaOrangeGrad" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="60%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>

          <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feOffset dx="0" dy="0.5" result="offsetBlur" />
            <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
          </filter>
        </defs>

        {/* Outer Hexagon Frame */}
        <path 
          d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" 
          stroke="#E2E8F0" 
          strokeWidth="1.2" 
          strokeLinejoin="round" 
        />
        
        {/* THE 'X' SIGN - Two crossed diagonal tools */}

        {/* 1. Blue Tool (Pen/Stylus) - Bottom-Left to Top-Right */}
        <g filter="url(#subtleShadow)">
          {/* Body */}
          <path 
            d="M22 78 L78 22" 
            stroke="url(#xtremaBlueGrad)" 
            strokeWidth="7" 
            strokeLinecap="round" 
          />
          {/* Top Right Tip Detail */}
          <path d="M75 25 L82 18 L78 22" fill="#0369A1" />
        </g>
        
        {/* 2. Orange Tool (Pencil) - Top-Left to Bottom-Right */}
        <g filter="url(#subtleShadow)">
          {/* Body */}
          <path 
            d="M22 22 L78 78" 
            stroke="url(#xtremaOrangeGrad)" 
            strokeWidth="7" 
            strokeLinecap="round" 
          />
          {/* Pencil Tip Detail (Bottom Right) */}
          <path d="M75 75 L82 82 L78 74 Z" fill="#334155" />
          {/* Eraser/Ferrule Detail (Top Left) */}
          <path d="M25 25 L18 18" stroke="#94A3B8" strokeWidth="8" strokeLinecap="round" />
        </g>

        {/* NE Accents / Arrows - Signature part of the logo */}
        <g transform="translate(68, 12) rotate(-45)">
           <path d="M0 0 L15 0 M15 0 L10 -4 M15 0 L10 4" stroke="#0891B2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
           <path d="M-6 8 L9 8 M9 8 L4 4 M9 8 L4 12" stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        </g>
        
      </svg>
      {showText && (
        <span className={`${textSize} font-bold text-[#84CC16] tracking-tight mt-2`} style={{ fontFamily: 'Inter, sans-serif' }}>
          Xtrema
        </span>
      )}
    </div>
  );
};

export default Logo;
