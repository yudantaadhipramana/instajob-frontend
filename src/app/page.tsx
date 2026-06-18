"use client";

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Bell, Briefcase, CheckCircle2, Search, TrendingUp, Sparkles, Zap, ArrowUpRight } from 'lucide-react';

const stats = [
  { label: 'Scouted Jobs', value: '1,248', icon: Search, trend: '+12%' },
  { label: 'Applications', value: '86', icon: Briefcase, trend: '+5%' },
  { label: 'Interviews', value: '12', icon: CheckCircle2, trend: 'Hot' },
  { label: 'Match Rate', value: '94%', icon: TrendingUp, trend: 'Top 1%' },
];

const matches = [
  { id: 1, title: 'Senior Frontend Engineer', company: 'Stripe', match: 98, status: 'Applied', time: '2h ago' },
  { id: 2, title: 'Product Designer', company: 'Linear', match: 95, status: 'Scouted', time: '5h ago' },
  { id: 3, title: 'Fullstack Developer', company: 'Vercel', match: 92, status: 'Interview', time: '1d ago' },
];

export default function Dashboard() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', height: '100vh', overflow: 'hidden', background: '#FFFFFF' }}>
      {/* Background Glow Effects */}
      <div style={{ 
        position: 'fixed', 
        width: '800px', 
        height: '800px', 
        borderRadius: '50%', 
        top: '-200px', 
        right: '-100px', 
        background: 'radial-gradient(circle, rgba(0, 81, 255, 0.15) 0%, transparent 70%)', 
        filter: 'blur(120px)', 
        pointerEvents: 'none', 
        zIndex: 0 
      }}></div>
      <div style={{ 
        position: 'fixed', 
        width: '800px', 
        height: '800px', 
        borderRadius: '50%', 
        bottom: '-200px', 
        left: '-100px', 
        background: 'radial-gradient(circle, rgba(0, 81, 255, 0.15) 0%, transparent 70%)', 
        filter: 'blur(120px)', 
        pointerEvents: 'none', 
        zIndex: 0 
      }}></div>
      
      <Sidebar />
      
      <main style={{ overflowY: 'auto', position: 'relative', padding: '48px', zIndex: 1 }}>
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '64px' }}>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#64748B', marginBottom: '8px' }}>Intelligence Overview</p>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1E293B' }}>System Status</h2>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#F1F5F9', border: '1px solid #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
              <Bell size={18} color="#64748B" />
            </div>
            <button style={{
              background: 'linear-gradient(135deg, #0051FF, #0051FF)',
              color: '#FFFFFF',
              fontWeight: 700,
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              transition: 'all 0.2s',
              boxShadow: '0 8px 32px rgba(0, 81, 255, 0.3)'
            }}>
              <Zap size={16} fill="white" />
              Boost AI Search
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div style={{ maxWidth: '900px', marginBottom: '80px' }}>
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 800, 
            letterSpacing: '-0.04em', 
            lineHeight: 1.1, 
            color: '#1E293B',
            marginBottom: '24px' 
          }}>
            Everything is working for <br /> your next big move.
          </h1>
          <p style={{ fontSize: '18px', color: '#64748B', lineHeight: 1.6 }}>
            Your AI agent analyzed <span style={{ color: '#1E293B', fontWeight: 600 }}>2,400 listings</span> today. <br />
            24 high-priority roles match your profile with over <span style={{ color: '#0051FF', fontWeight: 700 }}>90% accuracy</span>.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '48px' }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{ 
              background: '#F8FAFC', 
              border: '1px solid #E2E8F0', 
              backdropFilter: 'blur(24px)', 
              borderRadius: '16px', 
              padding: '32px',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(0, 81, 255, 0.15)', border: '1px solid rgba(0, 81, 255, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <stat.icon size={20} color="#0051FF" />
                </div>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#0051FF', background: 'rgba(0, 81, 255, 0.1)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(0, 81, 255, 0.2)' }}>{stat.trend}</span>
              </div>
              <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#64748B', marginBottom: '8px' }}>{stat.label}</p>
              <p style={{ fontSize: '28px', fontWeight: 700, color: '#1E293B' }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Content Split */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '48px' }}>
          {/* Matches Column */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: 600, color: '#1E293B' }}>
                <Sparkles size={18} color="#0051FF" />
                Priority Matches
              </h3>
              <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#64748B', cursor: 'pointer', margin: 0 }}>View All Board</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {matches.map((job) => (
                <div key={job.id} style={{ 
                  padding: '24px', 
                  borderRadius: '12px', 
                  background: '#F8FAFC', 
                  border: '1px solid #E2E8F0', 
                  marginBottom: '12px',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F1F5F9', border: '1px solid #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 800, color: '#94A3B8' }}>
                        {job.company.charAt(0)}
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, fontSize: '16px', color: '#1E293B' }}>{job.title}</p>
                        <p style={{ fontSize: '13px', color: '#64748B' }}>{job.company} • {job.time}</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '20px', fontWeight: 800, color: '#0051FF', fontStyle: 'italic' }}>{job.match}%</p>
                        <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#64748B', margin: 0 }}>Match</p>
                      </div>
                      <span style={{ 
                        fontSize: '10px', 
                        fontWeight: 800, 
                        padding: '4px 12px', 
                        borderRadius: '99px', 
                        background: job.status === 'Applied' ? 'rgba(0, 81, 255, 0.1)' : '#F1F5F9',
                        color: job.status === 'Applied' ? '#7C3AED' : '#64748B',
                        border: job.status === 'Applied' ? '1px solid rgba(0, 81, 255, 0.2)' : '1px solid #CBD5E1'
                      }}>
                        {job.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Sidebar Column */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px', color: '#1E293B' }}>
              <Zap size={18} color="#0051FF" />
              AI Insight
            </h3>

            <div style={{ 
              background: 'linear-gradient(135deg, rgba(0, 81, 255, 0.1), rgba(0, 81, 255, 0.1))', 
              border: '1px solid rgba(0, 81, 255, 0.2)', 
              backdropFilter: 'blur(24px)', 
              borderRadius: '16px', 
              padding: '32px' 
            }}>
              <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#0051FF', marginBottom: '8px' }}>Skill Optimization</p>
              <h4 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', lineHeight: 1.3, color: '#1E293B' }}>Your "React" proficiency is a major hook.</h4>
              <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6, marginBottom: '32px' }}>
                80% of jobs in your target area require <span style={{ color: '#1E293B' }}>TypeScript</span> and <span style={{ color: '#1E293B' }}>Tailwind CSS</span>. Adding these could boost your match rate to 98%.
              </p>
              <button style={{ 
                background: '#0051FF', 
                color: '#FFFFFF', 
                fontWeight: 700, 
                padding: '12px 24px', 
                borderRadius: '12px', 
                border: 'none', 
                cursor: 'pointer', 
                width: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}>
                Improve Profile
              </button>
            </div>

            <div style={{ marginTop: '48px' }}>
              <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#64748B', marginBottom: '24px' }}>Activity Feed</p>
              <div style={{ paddingLeft: '16px', borderLeft: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-20.5px', top: '6px', width: '8px', height: '8px', borderRadius: '50%', background: '#0051FF', boxShadow: '0 0 10px #0051FF' }}></div>
                  <p style={{ fontSize: '10px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '4px' }}>12m ago</p>
                  <p style={{ fontSize: '14px', color: '#475569' }}>Found 3 new roles at <span style={{ color: '#1E293B', fontWeight: 600 }}>Microsoft</span></p>
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-20.5px', top: '6px', width: '8px', height: '8px', borderRadius: '50%', background: '#0051FF', boxShadow: '0 0 10px #0051FF' }}></div>
                  <p style={{ fontSize: '10px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '4px' }}>1h ago</p>
                  <p style={{ fontSize: '14px', color: '#475569' }}>CV optimized for <span style={{ color: '#1E293B', fontWeight: 600 }}>Stripe</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
