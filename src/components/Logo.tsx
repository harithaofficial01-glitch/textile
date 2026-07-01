import React from "react";

interface LogoProps {
  variant?: "full" | "emblem" | "text-only";
  className?: string;
  size?: number; // width in pixels
}

export const Logo: React.FC<LogoProps> = ({
  variant = "full",
  className = "",
  size = 200,
}) => {
  const scale = size / 200;

  // Render text only
  if (variant === "text-only") {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        <h1 
          className="font-serif tracking-[0.25em] font-bold text-primary dark:text-foreground leading-none"
          style={{ fontSize: `${28 * scale}px` }}
        >
          DIVYAPRIYA
        </h1>
        <div className="flex items-center justify-center w-full my-1">
          <div className="h-[1px] bg-accent/40 flex-grow max-w-[40px]"></div>
          <span 
            className="mx-2 text-accent font-serif tracking-[0.4em] uppercase text-xs font-semibold"
            style={{ fontSize: `${11 * scale}px` }}
          >
            Textiles
          </span>
          <div className="h-[1px] bg-accent/40 flex-grow max-w-[40px]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Emblem Section */}
      <svg
          width={size}
          height={size}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-300"
        >
          {/* Dynamic gradients for luxury feel */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFBA73" />
              <stop offset="50%" stopColor="#C5A880" />
              <stop offset="100%" stopColor="#9E7E4D" />
            </linearGradient>
            <linearGradient id="navyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
          </defs>

          {/* BACKGROUND DECORATIONS (Subtle Circular Frame) */}
          <circle cx="100" cy="100" r="85" stroke="url(#goldGradient)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />

          {/* COTTON BRANCH (Left side of letter D) */}
          {/* Stem */}
          <path
            d="M 68 120 C 50 105 50 75 62 60"
            stroke="url(#goldGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Cotton Branch Leaves */}
          <path d="M 50 102 C 45 101 45 95 52 94 C 55 96 55 100 50 102 Z" fill="url(#goldGradient)" />
          <path d="M 48 78 C 42 75 45 70 50 71 C 52 74 51 77 48 78 Z" fill="url(#goldGradient)" />
          <path d="M 58 64 C 55 60 60 55 63 58 C 63 61 61 63 58 64 Z" fill="url(#goldGradient)" />

          {/* Cotton Flower 1 (Lower) */}
          <g transform="translate(56, 92)">
            {/* Cotton fiber puffs */}
            <circle cx="-5" cy="0" r="6" fill="#F8F9FA" stroke="#1E293B" strokeWidth="0.5" />
            <circle cx="5" cy="-2" r="6" fill="#F8F9FA" stroke="#1E293B" strokeWidth="0.5" />
            <circle cx="0" cy="-6" r="6" fill="#F8F9FA" stroke="#1E293B" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="5" fill="#E9ECEF" />
            {/* Calyx (bracts) in gold/navy */}
            <path d="M -8 2 C -3 5 0 2 0 2 C 0 2 3 5 8 2 C 5 -3 0 -5 0 -5 C 0 -5 -5 -3 -8 2 Z" fill="#1E293B" opacity="0.8" />
            <path d="M -4 4 L 0 0 L 4 4 L 0 9 Z" fill="url(#goldGradient)" />
          </g>

          {/* Cotton Flower 2 (Upper) */}
          <g transform="translate(62, 70) scale(0.85)">
            <circle cx="-5" cy="0" r="6" fill="#F8F9FA" stroke="#1E293B" strokeWidth="0.5" />
            <circle cx="5" cy="-2" r="6" fill="#F8F9FA" stroke="#1E293B" strokeWidth="0.5" />
            <circle cx="0" cy="-6" r="6" fill="#F8F9FA" stroke="#1E293B" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="5" fill="#E9ECEF" />
            <path d="M -8 2 C -3 5 0 2 0 2 C 0 2 3 5 8 2 C 5 -3 0 -5 0 -5 C 0 -5 -5 -3 -8 2 Z" fill="#1E293B" opacity="0.8" />
            <path d="M -4 4 L 0 0 L 4 4 L 0 9 Z" fill="url(#goldGradient)" />
          </g>

          {/* LETTER D (Navy, Elegant Serif) */}
          <path
            d="M 85 45 L 85 130 M 85 45 C 130 40 135 85 125 105 C 115 120 100 128 85 128"
            stroke="url(#navyGradient)"
            strokeWidth="14"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            fill="none"
            className="dark:stroke-slate-100"
          />
          {/* Serif Top of D */}
          <path d="M 72 45 L 98 45" stroke="url(#navyGradient)" strokeWidth="4" strokeLinecap="square" className="dark:stroke-slate-100" />
          {/* Serif Bottom of D */}
          <path d="M 72 130 L 98 130" stroke="url(#navyGradient)" strokeWidth="4" strokeLinecap="square" className="dark:stroke-slate-100" />

          {/* LETTER T (Gold, overlapping D) */}
          <g>
            {/* Vertical Bar */}
            <path
              d="M 112 60 L 112 125"
              stroke="url(#goldGradient)"
              strokeWidth="6"
              strokeLinecap="butt"
              fill="none"
            />
            {/* Horizontal Bar (Wavy Calligraphy) */}
            <path
              d="M 98 62 C 110 52 118 64 135 56 C 142 52 144 55 146 58"
              stroke="url(#goldGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Serif Bottom of T */}
            <path d="M 104 125 L 120 125" stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="square" />
          </g>

          {/* SAREE DRAPE (Flowing below/around letters) */}
          {/* Navy Base Saree Wave */}
          <path
            d="M 68 120 C 80 135 110 145 135 125 C 150 112 150 90 162 90 C 168 90 172 105 174 120 C 176 130 172 135 150 135 C 120 135 90 130 68 120 Z"
            fill="url(#navyGradient)"
            className="dark:fill-slate-900"
          />
          {/* Saree Border Zari Work (Intricate gold lines) */}
          <path
            d="M 68 120 C 80 135 110 145 135 125 C 150 112 150 90 162 90"
            stroke="url(#goldGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Saree Shading/Folds */}
          <path
            d="M 90 132 C 110 138 130 132 142 122"
            stroke="url(#goldGradient)"
            strokeWidth="0.75"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M 115 138 C 130 136 142 128 149 116"
            stroke="url(#goldGradient)"
            strokeWidth="0.75"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
          {/* Saree Pallu fringe details */}
          <path
            d="M 162 90 C 165 95 168 115 170 122"
            stroke="url(#goldGradient)"
            strokeWidth="1"
            strokeDasharray="1 1"
            fill="none"
          />
        </svg>

      {/* Brand Text Section (Only rendered if variant is full) */}
      {variant === "full" && (
        <div className="flex flex-col items-center justify-center mt-3 text-center">
          <h2 className="font-serif font-bold text-primary dark:text-foreground tracking-[0.25em] text-xl md:text-2xl uppercase transition-colors leading-none">
            DIVYAPRIYA
          </h2>
          
          {/* Gold flourish divider */}
          <div className="flex items-center justify-center w-full my-2">
            <div className="h-[1px] bg-accent/40 w-12"></div>
            <svg width="24" height="8" viewBox="0 0 24 8" className="mx-1 text-accent fill-current">
              <path d="M 0 4 C 6 4 8 0 12 4 C 16 8 18 4 24 4 C 18 4 16 0 12 4 C 8 8 6 4 0 4 Z" />
            </svg>
            <div className="h-[1px] bg-accent/40 w-12"></div>
          </div>
          
          <span className="text-accent font-serif tracking-[0.4em] uppercase text-sm font-semibold">
            TEXTILES
          </span>
        </div>
      )}
    </div>
  );
};
