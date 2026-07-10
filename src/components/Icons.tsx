'use client';

// ============================================
// PROFESSIONAL SVG ICONS FOR INSTAJOB
// ============================================

export const Icons = {
  // Logo Mark
  logo: (size = 24, color = '#0051FF') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill={color} />
      <path d="M7 17V7h3v10H7zm7-10h3l-5 10h-3l5-10z" fill="white" />
    </svg>
  ),

  // Job Matching (Professional Radar/Network)
  jobMatch: (size = 24, color = 'var(--color-primary)') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray="2 4" />
      <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      <circle cx="12" cy="12" r="3" fill={color} />
      <circle cx="18" cy="8" r="1.5" fill={color} opacity="0.6" />
      <circle cx="6" cy="16" r="1.5" fill={color} opacity="0.6" />
      <path d="M12 12L18 8M12 12L6 16" stroke={color} strokeWidth="1.5" opacity="0.4" />
    </svg>
  ),

  // Profile Setup
  profile: (size = 24, color = '#0051FF') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // AI Analysis
  analysis: (size = 24, color = '#0051FF') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2" />
      <rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2" />
      <path d="M6.5 6.5h0M17.5 6.5h0M6.5 17.5h0M17.5 17.5h0" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),

  // Auto Apply (Rocket/Send Professional)
  autoApply: (size = 24, color = 'var(--color-primary)') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 2L11 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" fill={color} />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Cover Letter / AI Email
  coverLetter: (size = 24, color = 'var(--color-primary)') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.3" fill={color} />
      <rect x="3" y="5" width="18" height="14" rx="2" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M3 7L12 13L21 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Job Tracking (Kanban/Progress)
  tracking: (size = 24, color = 'var(--color-primary)') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" opacity="0.3" fill={color} />
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" />
      <path d="M8 7V17M12 7V13M16 7V15" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // Telegram Bot (Professional Shield/Bot)
  telegram: (size = 24, color = 'var(--color-primary)') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.2" fill={color} />
      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12L11 14L15 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // LinkedIn
  linkedin: (size = 24, color = 'var(--color-primary)') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="4" stroke={color} strokeWidth="2" opacity="0.2" fill={color} />
      <rect x="2" y="2" width="20" height="20" rx="4" stroke={color} strokeWidth="2" />
      <path d="M8 11V16M8 8H8.01M12 16V11C12 11 12 11 13 11C14 11 16 11 16 13V16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Analytics
  analytics: (size = 24, color = '#0051FF') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 20V10" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 20V4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M6 20v-6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // Briefcase (Jobs)
  briefcase: (size = 24, color = '#0051FF') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="7" width="20" height="14" rx="2" stroke={color} strokeWidth="2" />
      <path d="M16 7V5c0-1.1-.9-2-2-2H10c-1.1 0-2 .9-2 2v2" stroke={color} strokeWidth="2" />
      <path d="M12 12v1" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // Target (Interview)
  target: (size = 24, color = '#0051FF') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2" />
      <circle cx="12" cy="12" r="2" stroke={color} strokeWidth="2" />
    </svg>
  ),

  // Chart (Stats)
  chart: (size = 24, color = '#0051FF') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 21H3V3" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M18 9l-5 5-4-4-4 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // City (Location)
  city: (size = 24, color = '#0051FF') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="2" width="16" height="20" rx="1" stroke={color} strokeWidth="2" />
      <path d="M9 22V12h6v10" stroke={color} strokeWidth="2" />
      <path d="M9 6h1M14 6h1M9 9h1M14 9h1" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // Check Circle
  checkCircle: (size = 24, color = '#22C55E') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <path d="M8 12l3 3 5-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Arrow Right
  arrowRight: (size = 24, color = '#0051FF') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12h14M12 5l7 7-7 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Star
  star: (size = 24, color = '#FFB800') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15 9L22 9.5L17 14L18.5 22L12 18L5.5 22L7 14L2 9.5L9 9L12 2Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),

  // Rocket
  rocket: (size = 24, color = '#0051FF') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.5 2 2 6.5 2 12c0 3 1.5 5.5 4 7v3l4-2c.6.2 1.3.2 2 .2 5.5 0 10-4.5 10-10S17.5 2 12 2z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2" />
    </svg>
  ),

  // Clock
  clock: (size = 24, color = '#0051FF') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
      <path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // Users
  users: (size = 24, color = '#0051FF') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2" />
      <path d="M2 21v-2c0-2.2 2.7-4 6-4s6 1.8 6 4v2" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="17" cy="7" r="3" stroke={color} strokeWidth="2" />
      <path d="M21 21v-1.5c0-1.8-2-3.2-4.5-3.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // Lightning
  lightning: (size = 24, color = '#FFB800') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Shield
  shield: (size = 24, color = '#22C55E') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Settings/Gear
  gear: (size = 24, color = '#0051FF') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // Check
  check: (size = 24, color = '#22C55E') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // How It Works Icons (Geometric Rounded)
  setup: (size = 24, color = 'var(--color-primary)') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="4" fill={color} opacity="0.15" />
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" fill="none" />
      <path d="M12 6v1.5M12 16.5V18M6 12h1.5M16.5 12H18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  search: (size = 24, color = 'var(--color-primary)') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="4" fill={color} opacity="0.15" />
      <circle cx="11" cy="11" r="4" stroke={color} strokeWidth="2" fill="none" />
      <path d="M14 14l3 3" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  envelope: (size = 24, color = 'var(--color-primary)') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="4" fill={color} opacity="0.15" />
      <rect x="5" y="7" width="14" height="10" rx="2" stroke={color} strokeWidth="2" fill="none" />
      <path d="M5 9l7 4 7-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Chart/Stats (Bar style - geometric rounded for HowItWorks)
  chartBars: (size = 24, color = 'var(--color-primary)') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="4" fill={color} opacity="0.15" />
      <path d="M7 14v3M12 10v7M17 7v10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // Affiliate Icons (Geometric Rounded)
  money: (size = 24, color = '#fff') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="4" fill={color} opacity="0.2" />
      <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="2" fill="none" />
      <path d="M12 8v8M10 10h4M10 14h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  dashboard: (size = 24, color = '#fff') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="4" fill={color} opacity="0.2" />
      <rect x="6" y="6" width="5" height="5" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="13" y="6" width="5" height="5" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="6" y="13" width="5" height="5" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
      <rect x="13" y="13" width="5" height="5" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  ),

  payment: (size = 24, color = '#fff') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="4" fill={color} opacity="0.2" />
      <rect x="5" y="8" width="14" height="9" rx="2" stroke={color} strokeWidth="2" fill="none" />
      <path d="M5 11h14" stroke={color} strokeWidth="2" />
      <circle cx="8" cy="14" r="0.5" fill={color} />
    </svg>
  ),

  support: (size = 24, color = '#fff') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="4" fill={color} opacity="0.2" />
      <circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2" fill="none" />
      <path d="M6 19c0-3.5 2.5-6 6-6s6 2.5 6 6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // Social Icons (Footer)
  twitterX: (size = 18, color = '#94A3B8') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.9 2H22l-7.1 8.1L23 22h-6.9l-5.4-7-6.2 7H2l7.6-8.7L1 2h7l4.9 6.4L18.9 2z" fill={color} />
    </svg>
  ),

  linkedinBrand: (size = 18, color = '#94A3B8') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.98 3.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM3 8.98h4v12H3v-12zM9 8.98h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v6.25h-4v-5.55c0-1.32-.02-3.02-1.85-3.02-1.85 0-2.13 1.44-2.13 2.93v5.64H9v-12z" fill={color} />
    </svg>
  ),

  instagramBrand: (size = 18, color = '#94A3B8') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="17.5" cy="6.5" r="1.2" fill={color} />
    </svg>
  ),

  whatsapp: (size = 18, color = '#94A3B8') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.43 1.27 4.87L2 22l5.27-1.24A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" fill="none" />
      <path d="M8.5 9c0-.28.22-.5.5-.5h.5c.28 0 .5.22.5.5l.75 2-.5.5s.75 1.5 2.25 2.25l.5-.5 2 .75c.28 0 .5.22.5.5v.5c0 .28-.22.5-.5.5C11 16 8 13 8.5 9z" fill={color} />
    </svg>
  ),

  threads: (size = 18, color = '#94A3B8') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C7 2 4 5.5 4 9c0 2 .8 3.7 2.1 4.9.3.3.2.7-.1.9C4.7 15.6 4 17.2 4 19c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3 0-1.8-.7-3.4-2-4.2-.3-.2-.4-.6-.1-.9C19.2 12.7 20 11 20 9c0-3.5-3-7-8-7z" stroke={color} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
      <path d="M9 10c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3z" stroke={color} strokeWidth="1.8" fill="none" />
    </svg>
  ),

  tiktok: (size = 18, color = '#94A3B8') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),

  // CTA section icons (non-AI, geometric clean)
  sparkle: (size = 20, color = '#fff') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  zap: (size = 20, color = '#fff') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default Icons;
