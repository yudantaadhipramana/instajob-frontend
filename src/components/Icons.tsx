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

  // Job Matching
  jobMatch: (size = 24, color = '#0051FF') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="9" r="3" stroke={color} strokeWidth="2" />
      <circle cx="15" cy="15" r="3" stroke={color} strokeWidth="2" />
      <path d="M9 12a5 5 0 0 1 5 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M15 12a5 5 0 0 1-5 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
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

  // Auto Apply
  autoApply: (size = 24, color = '#0051FF') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7l10 5 10-5-10-5z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M2 17l10 5 10-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12l10 5 10-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Cover Letter
  coverLetter: (size = 24, color = '#0051FF') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth="2" />
      <path d="M22 6l-10 7L2 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Job Tracking
  tracking: (size = 24, color = '#0051FF') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 20V4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M5 11l7-7 7 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Telegram Bot
  telegram: (size = 24, color = '#0051FF') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 2L11 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

  // LinkedIn
  linkedin: (size = 24, color = '#0077B5') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="3" stroke={color} strokeWidth="2" />
      <path d="M8 11v5M8 8v.01M12 16v-5c0-1 1-2 2-2s2 1 2 2v5" stroke={color} strokeWidth="2" strokeLinecap="round" />
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
};

export default Icons;
