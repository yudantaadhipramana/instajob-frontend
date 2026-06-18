"use client";

import React from 'react';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Lightning Bolt Logo - Blue */}
      <svg width="64" height="64" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 16L80 120H112L96 240L176 96H144L128 16Z" fill="#0051FF" stroke="#0051FF" strokeWidth="0" strokeLinejoin="round" strokeLinecap="round"/>
      </svg>
      
      {/* Wordmark */}
      <div className="flex items-baseline mt-2">
        <span className="text-2xl font-bold tracking-tight" style={{ color: '#1E293B' }}>Insta</span>
        <span className="text-2xl font-bold tracking-tight" style={{ color: '#0051FF' }}>Job</span>
      </div>
      
      {/* Tagline */}
      <div className="flex items-center gap-2 mt-1">
        <span className="h-px w-4" style={{ background: '#0051FF' }}></span>
        <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: '#1E293B' }}>Apply Once.</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: '#0051FF' }}>Get Hired Faster.</span>
        <span className="h-px w-4" style={{ background: '#0051FF' }}></span>
      </div>
    </div>
  );
}
