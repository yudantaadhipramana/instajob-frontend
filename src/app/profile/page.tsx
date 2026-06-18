"use client";

import React from 'react';
import Sidebar from '@/components/Sidebar';
import { FileText, Plus, CheckCircle2, Target, Award } from 'lucide-react';

const stats = [
  { label: 'Skills Matching', value: '12/15', desc: '80% coverage', color: '#10B981' },
  { label: 'CV Scans', value: '48', desc: 'Viewed this week', color: '#0051FF' },
  { label: 'Profile Strength', value: '92%', desc: 'Strong', color: '#0051FF' },
  { label: 'Endorsements', value: '24', desc: 'From recruiters', color: '#8B5CF6' },
];

const skills = [
  { name: 'React', level: 95, verified: true },
  { name: 'TypeScript', level: 90, verified: true },
  { name: 'Next.js', level: 88, verified: true },
  { name: 'Node.js', level: 82, verified: false },
  { name: 'PostgreSQL', level: 75, verified: false },
  { name: 'Tailwind CSS', level: 92, verified: true },
  { name: 'GraphQL', level: 70, verified: false },
  { name: 'Docker', level: 65, verified: false },
];

const experiences = [
  { title: 'Senior Frontend Developer', company: 'Tech Corp', period: '2022 - Present', description: 'Built scalable web applications serving 100k+ users' },
  { title: 'Fullstack Developer', company: 'StartupXYZ', period: '2020 - 2022', description: 'Developed microservices architecture' },
  { title: 'Junior Developer', company: 'WebStudio', period: '2018 - 2020', description: 'Frontend development with React' },
];

export default function ProfilePage() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', height: '100vh', overflow: 'hidden', background: '#FFFFFF' }}>
      <Sidebar />
      
      <main style={{ overflowY: 'auto', position: 'relative', padding: '48px' }}>
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#64748B', marginBottom: '8px' }}>Profile & Resume</p>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1E293B', margin: 0 }}>My Profile</h1>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', margin: '0 0 8px 0' }}>{s.label}</p>
              <p style={{ fontSize: '28px', fontWeight: 800, color: s.color, margin: '0 0 4px 0' }}>{s.value}</p>
              <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {/* Skills Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Target size={20} color="#0051FF" />
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1E293B', margin: 0 }}>Skills</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {skills.map((skill, i) => (
                <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>{skill.name}</span>
                      {skill.verified && <CheckCircle2 size={14} color="#10B981" />}
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#0051FF' }}>{skill.level}%</span>
                  </div>
                  <div style={{ height: '6px', background: '#F1F5F9', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ width: `${skill.level}%`, height: '100%', background: `linear-gradient(90deg, #0051FF, #0051FF)`, borderRadius: '99px' }}></div>
                  </div>
                </div>
              ))}
            </div>
            <button style={{ marginTop: '16px', padding: '10px 16px', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '8px', color: '#64748B', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Plus size={14} />
              Add Skill
            </button>
          </div>

          {/* Experience Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Award size={20} color="#0051FF" />
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1E293B', margin: 0 }}>Experience</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {experiences.map((exp, i) => (
                <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1E293B', margin: '0 0 4px 0' }}>{exp.title}</h3>
                  <p style={{ fontSize: '13px', color: '#0051FF', fontWeight: 600, margin: '0 0 4px 0' }}>{exp.company} • {exp.period}</p>
                  <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>{exp.description}</p>
                </div>
              ))}
            </div>
            <button style={{ marginTop: '16px', padding: '10px 16px', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '8px', color: '#64748B', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Plus size={14} />
              Add Experience
            </button>
          </div>
        </div>

        {/* CV Upload */}
        <div style={{ marginTop: '40px' }}>
          <div style={{ background: '#F8FAFC', border: '2px dashed #CBD5E1', borderRadius: '16px', padding: '48px', textAlign: 'center' }}>
            <FileText size={40} color="#0051FF" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1E293B', margin: '0 0 8px 0' }}>Upload Your CV</h3>
            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '20px', margin: '0 0 20px 0' }}>PDF, DOCX or TXT files. Max 10MB.</p>
            <button style={{ background: '#0051FF', color: '#FFFFFF', fontWeight: 700, padding: '12px 32px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
              Choose File
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
