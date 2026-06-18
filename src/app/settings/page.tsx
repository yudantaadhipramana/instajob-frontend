"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Bell, Mail, Zap, Lock, User, Globe, Palette, Database } from 'lucide-react';

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [autoApply, setAutoApply] = useState(false);
  const [matchThreshold, setMatchThreshold] = useState(85);

  const sections = [
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email Notifications', desc: 'Receive job matches and updates via email', value: emailNotif, onChange: setEmailNotif },
        { label: 'Push Notifications', desc: 'Get instant alerts for new opportunities', value: pushNotif, onChange: setPushNotif },
      ]
    },
    {
      title: 'Automation',
      icon: Zap,
      items: [
        { label: 'Auto-Apply', desc: 'Automatically apply to jobs above match threshold', value: autoApply, onChange: setAutoApply },
      ]
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', height: '100vh', overflow: 'hidden', background: '#FFFFFF' }}>
      <Sidebar />
      
      <main style={{ overflowY: 'auto', position: 'relative', padding: '48px' }}>
        <div style={{ marginBottom: '48px' }}>
          <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#64748B', marginBottom: '8px' }}>Configuration</p>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1E293B', margin: 0 }}>Preferences</h1>
          <p style={{ fontSize: '16px', color: '#64748B', marginTop: '8px', margin: '8px 0 0 0' }}>Customize your InstaJob experience</p>
        </div>

        <div style={{ maxWidth: '800px' }}>
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div key={idx} style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                  <Icon size={20} color="#0051FF" />
                  <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1E293B', margin: 0 }}>{section.title}</h2>
                </div>

                <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden' }}>
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} style={{ padding: '20px 24px', borderBottom: itemIdx < section.items.length - 1 ? '1px solid #E2E8F0' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontSize: '15px', fontWeight: 600, color: '#1E293B', marginBottom: '4px', margin: '0 0 4px 0' }}>{item.label}</p>
                        <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>{item.desc}</p>
                      </div>
                      <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '26px', cursor: 'pointer' }}>
                        <input type="checkbox" checked={item.value} onChange={(e) => item.onChange(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, background: item.value ? '#0051FF' : '#CBD5E1', transition: '0.3s', borderRadius: '26px' }}>
                          <span style={{ position: 'absolute', content: '""', height: '20px', width: '20px', left: item.value ? '25px' : '3px', bottom: '3px', background: '#FFFFFF', transition: '0.3s', borderRadius: '50%' }}></span>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Match Threshold Slider */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <Database size={20} color="#0051FF" />
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1E293B', margin: 0 }}>Job Matching</h2>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px' }}>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#1E293B', margin: 0 }}>Minimum Match Threshold</p>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#0051FF' }}>{matchThreshold}%</span>
                </div>
                <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px', margin: '0 0 16px 0' }}>Only show jobs with at least this match percentage</p>
                <input type="range" min="50" max="100" value={matchThreshold} onChange={(e) => setMatchThreshold(Number(e.target.value))} style={{ width: '100%', height: '6px', borderRadius: '5px', background: '#E2E8F0', outline: 'none', appearance: 'none' }} />
              </div>
            </div>
          </div>

          {/* Account Section */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <User size={20} color="#0051FF" />
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1E293B', margin: 0 }}>Account</h2>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#64748B', marginBottom: '8px' }}>Email Address</label>
                <input type="email" value="yudanta@instajob.ai" readOnly style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#F8FAFC', fontSize: '14px', color: '#64748B', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#64748B', marginBottom: '8px' }}>Full Name</label>
                <input type="text" value="Yudanta Adhipramana" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#FFFFFF', fontSize: '14px', color: '#1E293B', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <button style={{ background: '#0051FF', color: '#FFFFFF', fontWeight: 700, padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
