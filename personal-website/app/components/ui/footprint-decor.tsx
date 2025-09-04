import React from "react";

// A vertical SVG with repeated stylized human shoe footprints
export default function FootprintDecor({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="32"
      height="240"
      viewBox="0 0 32 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Repeat shoe footprints vertically */}
      {[0, 48, 96, 144, 192].map((y, i) => (
        <g key={i} transform={`translate(4,${y})`}>
          {/* Shoe sole outline */}
          <path
            d="M8 2 Q4 12 8 28 Q12 44 20 36 Q28 28 20 8 Q12 -4 8 2 Z"
            fill="#444"
            stroke="#222"
            strokeWidth="1.5"
          />
          {/* Tread dots */}
          <circle cx="10" cy="8" r="1.2" fill="#888" />
          <circle cx="14" cy="14" r="1.2" fill="#888" />
          <circle cx="16" cy="22" r="1.2" fill="#888" />
          <circle cx="12" cy="28" r="1.2" fill="#888" />
          <circle cx="18" cy="12" r="1.2" fill="#888" />
        </g>
      ))}
    </svg>
  );
}
