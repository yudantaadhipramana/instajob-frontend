"use client";

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Sparkles, Filter, Search } from 'lucide-react';

const jobBoardData = [
  { id: 1, title: 'Senior Frontend Engineer', company: 'Stripe', match: 98, status: 'Applied', time: '2h ago', logo: 'S', location: 'Remote', salary: '$150k - $200k' },
  { id: 2, title: 'Product Designer', company: 'Linear', match: 95, status: 'Scouted', time: '5h ago', logo: 'L', location: 'Remote', salary: '$120k - $160k' },
  { id: 3, title: 'Fullstack Developer', company: 'Vercel', match: 92, status: 'Interviewing', time: '1d ago', logo: 'V', location: 'Remote', salary: '$130k - $180k' },
  { id: 4, title: 'Data Scientist', company: 'OpenAI', match: 88, status: 'Scouted', time: '2d ago', logo: 'O', location: 'SF, CA', salary: '$180k - $250k' },
];

export default function JobBoard() {
  return (
    <div className="app-layout">
      <Sidebar />
      
      <main className="app-main">
        <div className="glow-blue" style={{ top: '-200px', right: '-200px' }}></div>
        <div className="glow-purple" style={{ bottom: '-200px', left: '-200px' }}></div>

        <header className="app-header">
          <div>
            <h2 className="text-xl font-bold text-white">Job Board</h2>
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">AI-Scouted Opportunities</p>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="btn-ghost p-2.5 rounded-xl">
              <Filter size={20} className="text-white/60" />
            </button>
            <button className="btn-gradient">
              <Sparkles size={18} className="fill-current" />
              <span>AI Refresh</span>
            </button>
          </div>
        </header>

        <div className="app-content">
          {/* Filter Bar */}
          <div className="glass-card p-6 mb-10 flex items-center gap-4">
            <div className="flex items-center gap-2 flex-1 px-4 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Search size={18} className="text-white/40" />
              <input type="text" placeholder="Search jobs..." className="bg-transparent border-none outline-none text-sm w-full text-white" />
            </div>
            <button className="btn-ghost text-xs font-bold uppercase tracking-widest">Remote Only</button>
            <button className="btn-ghost text-xs font-bold uppercase tracking-widest">Top Match</button>
            <button className="btn-ghost text-xs font-bold uppercase tracking-widest">High Salary</button>
          </div>

          {/* Job Grid */}
          <div className="jobs-grid">
            {jobBoardData.map((job) => (
              <div key={job.id} className="job-card">
                <div className="flex items-center gap-5 mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.2)' }}>
                    {job.logo}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{job.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-white/40">{job.company}</span>
                      <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                      <span className="text-xs text-white/30">{job.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="text-right">
                    <div className="match-score">{job.match}%</div>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Match</p>
                  </div>
                  <div className={job.status === 'Applied' ? 'status-applied' : job.status === 'Interviewing' ? 'status-interviewing' : 'status-scouted'}>
                    {job.status}
                  </div>
                </div>

                {/* AI Match Breakdown */}
                <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="flex items-center justify-between text-white/40 text-sm font-medium cursor-pointer mb-3">
                    <span>Why AI matched you</span>
                    <Sparkles size={16} className="text-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                      <span className="text-xs text-white/60">Skills match: 95%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                      <span className="text-xs text-white/60">Experience aligned</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                      <span className="text-xs text-white/60">Salary range: {job.salary}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}