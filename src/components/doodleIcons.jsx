import { useEffect, useState } from 'react';

// Hand-drawn monoline doodle set (Forest Ink stroke, no fill) — same language as the hero.
export function SwapArrowsIcon() {
  return (
    <svg viewBox="0 0 120 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="100%" height="100%">
      <path d="M12 21 h71" />
      <path d="M73 9 l14 12 -14 12" />
      <path d="M108 40 h-71" />
      <path d="M47 28 l-14 12 14 12" />
    </svg>
  );
}

export function StarOutlineIcon() {
  return (
    <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M30 7 l6.8 15.4 16.8 1.6 -12.7 11.2 4 16.8 -14.9 -9.2 -14.9 9.2 4 -16.8 -12.7 -11.2 16.8 -1.6 z" />
    </svg>
  );
}

export function LightbulbIcon() {
  return (
    <svg viewBox="0 0 70 90" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="100%" height="100%">
      <path d="M35 8 c-14 0 -23 10 -23 21 0 9 6 14 9 20 2 4 2 7 2 10 h24 c0 -3 0 -6 2 -10 3 -6 9 -11 9 -20 0 -11 -9 -21 -23 -21 z" />
      <path d="M26 68 c2 3 6 4 9 4 s7 -1 9 -4" />
      <path d="M28 77 c2 2 5 3 7 3 s5 -1 7 -3" />
    </svg>
  );
}

export function BookIcon() {
  return (
    <svg viewBox="0 0 90 70" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
      <path d="M45 16 c-8 -6 -20 -8 -32 -6 v44 c12 -2 24 0 32 6" />
      <path d="M45 16 c8 -6 20 -8 32 -6 v44 c-12 -2 -24 0 -32 6" />
      <path d="M20 22 c6 -1 12 0 17 2" />
      <path d="M20 32 c6 -1 12 0 17 2" />
      <path d="M70 22 c-6 -1 -12 0 -17 2" />
    </svg>
  );
}

export function SquiggleIcon() {
  return (
    <svg viewBox="0 0 90 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="100%" height="100%">
      <path d="M5 10 c6 -8 10 6 16 -2 s10 6 16 -2 10 6 16 -2 10 6 16 -2 10 4 16 1" />
    </svg>
  );
}

export function LoopIcon() {
  return (
    <svg viewBox="0 0 70 70" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="100%" height="100%">
      <path d="M35 10 c16 -2 27 10 26 24 -1 15 -13 26 -27 25 -14 -1 -24 -12 -23 -25 1 -12 10 -22 24 -24 6 -1 12 1 16 4" />
    </svg>
  );
}
