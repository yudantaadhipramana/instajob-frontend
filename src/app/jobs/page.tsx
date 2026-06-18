"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Search, SlidersHorizontal, MapPin, Building2, Clock, Zap, Bookmark } from 'lucide-react';

const jobData = [
  { id: 1, title: 'Senior Frontend Engineer', company: 'Stripe', location: 'San Francisco, CA', type: 'Full-time', salary: '$150k - $200k', match: 98, posted: '2h ago', description: 'Build the next generation of payment infrastructure...', tags: ['React', 'TypeScript', 'Next.js'] },
  { id: 2, title: 'Product Designer', company: 'Linear', location: 'Remote', type: 'Full-time', salary: '$130k - $170k', match: 95, posted: '5h ago', description: 'Design beautiful and functional interfaces...', tags: ['Figma', 'UI/UX', 'Design Systems'] },
  { id: 3, title: 'Fullstack Developer', company: 'Vercel', location: 'Remote', type: 'Full-time', salary: '$140k - $190k', match: 92, posted: '1d ago', description: 'Help build the platform for frontend developers...', tags: ['Next.js', 'Node.js', 'PostgreSQL'] },
  { id: 4, title: 'Backend Engineer', company: 'Supabase', location: 'Singapore', type: 'Full-time', salary: '$120k - $160k', match: 89, posted: '2d ago', description: 'Build scalable backend services...', tags: ['PostgreSQL', 'Go', 'Rust'] },
  { id: 5, title: 'DevOps Engineer', company: 'Cloudflare', location: 'Austin, TX', type: 'Full-time', salary: '$135k - $180k', match: 87, posted: '3d ago', description: 'Manage infrastructure for global edge network...', tags: ['Kubernetes', 'AWS', 'Terraform'] },
  { id: 6, title: 'Mobile Developer', company: 'Notion', location: 'New York, NY', type: 'Full-time', salary: '$140k - $185k', match: 85, posted: '4d ago', description: 'Build native mobile apps...', tags: ['React Native', 'Swift', 'Kotlin'] },
];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', height: '100vh', overflow: 'hidden', background: '#FFFFFF' }}>
      <Sidebar />
      
      <main style={{ overflowY: 'auto', position: 'relative', padding: '48px' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#64748B', marginBottom: '8px' }}>Job Discovery</p>
              <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1E293B', margin: 0 }}>Opportunity Feed</h1>
            </div>
            <button style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', color: '#1E293B', fontWeight: 600, padding: '12px 20px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>
          <p style={{ fontSize: '16px', color: '#64748B', margin: 0 }}>{jobData.length} opportunities matching your profile</p>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '32px', position: 'relative', maxWidth: '600px' }}>
          <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input type="text" placeholder="Search jobs, companies, keywords..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '14px 16px 14px 48px', borderRadius: '12px', border: '1px solid #E2E8F0', background: '#FFFFFF', fontSize: '14px', color: '#1E293B', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {['all', 'high-match', 'remote', 'new'].map((filter) => (
            <button key={filter} onClick={() => setSelectedFilter(filter)} style={{ padding: '8px 16px', borderRadius: '8px', border: selectedFilter === filter ? '1px solid #0051FF' : '1px solid #E2E8F0', background: selectedFilter === filter ? 'rgba(0, 81, 255, 0.1)' : '#FFFFFF', color: selectedFilter === filter ? '#0051FF' : '#64748B', fontSize: '13px', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
              {filter.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Job Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {jobData.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </main>
    </div>
  );
}

function JobCard({ job }: any) {
  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px', cursor: 'pointer', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '24px', right: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <div style={{ fontSize: '24px', fontWeight: 800, color: '#0051FF', fontStyle: 'italic', lineHeight: 1 }}>{job.match}%</div>
        <div style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B' }}>Match</div>
      </div>

      <div style={{ display: 'flex', gap: '20px', paddingRight: '80px' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#F1F5F9', border: '1px solid #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 800, color: '#94A3B8', flexShrink: 0 }}>
          {job.company.charAt(0)}
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1E293B', marginBottom: '8px', margin: 0 }}>{job.title}</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Building2 size={14} color="#64748B" />
              <span style={{ fontSize: '14px', color: '#64748B', fontWeight: 600 }}>{job.company}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={14} color="#64748B" />
              <span style={{ fontSize: '14px', color: '#64748B' }}>{job.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} color="#64748B" />
              <span style={{ fontSize: '14px', color: '#64748B' }}>{job.posted}</span>
            </div>
          </div>

          <p style={{ fontSize: '14px', color: '#475569', marginBottom: '16px', lineHeight: 1.6, margin: '0 0 16px 0' }}>{job.description}</p>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {job.tags.map((tag: string, idx: number) => (
              <span key={idx} style={{ fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px', background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0' }}>{tag}</span>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B' }}>{job.salary}</div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{ background: 'transparent', border: '1px solid #E2E8F0', color: '#64748B', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
                <Bookmark size={14} />
                Save
              </button>
              <button style={{ background: '#0051FF', color: '#FFFFFF', fontWeight: 700, padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                <Zap size={14} fill="white" />
                Quick Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
