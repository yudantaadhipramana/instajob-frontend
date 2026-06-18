"use client";

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { Calendar, MessageSquare, FileText, ExternalLink, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const applicationData = [
  {
    id: 1,
    jobTitle: 'Senior Frontend Engineer',
    company: 'Stripe',
    appliedDate: '2 days ago',
    status: 'interview',
    stage: 'Technical Interview',
    nextStep: 'System Design Round',
    nextDate: 'Tomorrow, 10:00 AM',
    progress: 60,
    notes: 'Completed phone screen with hiring manager',
  },
  {
    id: 2,
    jobTitle: 'Product Designer',
    company: 'Linear',
    appliedDate: '5 days ago',
    status: 'applied',
    stage: 'Application Submitted',
    nextStep: 'Waiting for response',
    nextDate: null,
    progress: 20,
    notes: 'Resume reviewed by recruiter',
  },
  {
    id: 3,
    jobTitle: 'Fullstack Developer',
    company: 'Vercel',
    appliedDate: '1 week ago',
    status: 'offer',
    stage: 'Offer Received',
    nextStep: 'Decision deadline',
    nextDate: 'June 25, 2026',
    progress: 100,
    notes: '$185k base + equity',
  },
  {
    id: 4,
    jobTitle: 'Backend Engineer',
    company: 'Supabase',
    appliedDate: '2 weeks ago',
    status: 'rejected',
    stage: 'Not Selected',
    nextStep: null,
    nextDate: null,
    progress: 40,
    notes: 'Position filled internally',
  },
];

const statusConfig = {
  applied: { color: '#64748B', bg: '#F1F5F9', icon: Clock, label: 'Applied' },
  interview: { color: '#0051FF', bg: 'rgba(0, 81, 255, 0.1)', icon: MessageSquare, label: 'Interview' },
  offer: { color: '#10B981', bg: '#ECFDF5', icon: CheckCircle2, label: 'Offer' },
  rejected: { color: '#EF4444', bg: '#FEF2F2', icon: XCircle, label: 'Rejected' },
};

export default function ApplicationsPage() {
  const stats = [
    { label: 'Total Applications', value: '86', change: '+8 this week' },
    { label: 'Active Interviews', value: '12', change: '3 scheduled' },
    { label: 'Pending Response', value: '45', change: 'Avg 3 days' },
    { label: 'Offer Received', value: '3', change: '2 pending decision' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', height: '100vh', overflow: 'hidden', background: '#FFFFFF' }}>
      <Sidebar />
      
      <main style={{ overflowY: 'auto', position: 'relative', padding: '48px' }}>
        <div style={{ marginBottom: '48px' }}>
          <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#64748B', marginBottom: '8px' }}>Application Tracking</p>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1E293B', margin: 0 }}>Live Status</h1>
          <p style={{ fontSize: '16px', color: '#64748B', marginTop: '8px', margin: '8px 0 0 0' }}>Track your job applications in real-time</p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', marginBottom: '8px', margin: '0 0 8px 0' }}>{stat.label}</p>
              <p style={{ fontSize: '28px', fontWeight: 800, color: '#1E293B', marginBottom: '4px', margin: '0 0 4px 0' }}>{stat.value}</p>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Applications List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {applicationData.map((app) => {
            const config = statusConfig[app.status as keyof typeof statusConfig];
            const StatusIcon = config.icon;
            
            return (
              <div key={app.id} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1E293B', margin: 0 }}>{app.jobTitle}</h3>
                      <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', background: config.bg, color: config.color, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <StatusIcon size={12} />
                        {config.label}
                      </span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#64748B', margin: 0 }}>{app.company} • Applied {app.appliedDate}</p>
                  </div>
                  <button style={{ background: 'transparent', border: '1px solid #E2E8F0', color: '#64748B', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600 }}>
                    <ExternalLink size={14} />
                    View Job
                  </button>
                </div>

                {/* Progress Bar */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>Current Stage: {app.stage}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#0051FF' }}>{app.progress}%</span>
                  </div>
                  <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ width: `${app.progress}%`, height: '100%', background: 'linear-gradient(90deg, #0051FF, #0051FF)', transition: 'width 0.3s' }}></div>
                  </div>
                </div>

                {/* Next Step & Notes */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                      <AlertCircle size={14} color="#0051FF" />
                      <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B' }}>Next Step</span>
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B', margin: '0 0 2px 0' }}>{app.nextStep || 'N/A'}</p>
                    {app.nextDate && <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>{app.nextDate}</p>}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                      <FileText size={14} color="#0051FF" />
                      <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#64748B' }}>Notes</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>{app.notes}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
