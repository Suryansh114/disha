import React from 'react';

/**
 * Disha brand logo — a stylized compass needle forming an abstract "D",
 * paired with the wordmark "Disha". Modern, minimal, student-resonant.
 *
 * @param {{ size?: number, showText?: boolean, className?: string }} props
 */
function DishaLogo({ size = 32, showText = true, className = '' }) {
  return (
    <span className={`disha-logo-wrapper ${className}`} aria-label="Disha">
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="disha-logo-svg"
      >
        {/* Outer circle ring */}
        <circle
          cx="18"
          cy="18"
          r="16"
          stroke="url(#logoRingGrad)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />

        {/* Compass needle – north (primary accent) */}
        <polygon
          points="18,4 21.5,18 18,16 14.5,18"
          fill="url(#logoNorthGrad)"
        />

        {/* Compass needle – south (muted) */}
        <polygon
          points="18,32 21.5,18 18,20 14.5,18"
          fill="rgba(99,102,241,0.25)"
        />

        {/* Centre dot */}
        <circle cx="18" cy="18" r="2.5" fill="#ffffff" opacity="0.9" />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="logoNorthGrad" x1="18" y1="4" x2="18" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a5b4fc" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="logoRingGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <span className="disha-logo-text">Disha</span>
      )}
    </span>
  );
}

export default DishaLogo;
