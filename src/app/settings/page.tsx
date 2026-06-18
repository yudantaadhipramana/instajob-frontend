"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { User, Bell, Shield, Sliders, ChevronRight, Check, Globe, Moon, Volume2, Mail, Smartphone, Zap, Brain, Lock, Eye, EyeOff } from 'lucide-react';

const sections = [
  { id: 'profile', label: 'Profile Settings', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'ai', label: 'AI Configuration', icon: Brain },
  { id: 'security', label: 'Security & Privacy', icon: Shield },
  { id: 'preferences', label: 'Preferences', icon: Sliders },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  });
  const [aiSettings, setAiSettings] = useState({
    autoApply: true,
    aggressive: false,
    matchThreshold: 85,
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', height: '100vh', overflow: 'hidden', background: '#FFFFFF' }}>
      {/* Background Glow */}
      <div style={{ position: 'fixed', width: '800px', height: '800px', borderRadius: '50%', top: '-200px', right: '-100px', background: 'radial-gradient(circle, rgba(0, 81, 255, 0.15) 0%, transparent 70%)', filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0 }}></div>
      <div style={{ position: 'fixed', width: '800px', height: '800px', borderRadius: '50%', bottom: '-200px', left: '-100px', background: 'radial-gradient(circle, rgba(0, 81, 255, 0.15) 0%, transparent 70%)', filter: 'blur(120px)', pointerEvents: 'none', zIndex: 0 }}></div>

      <Sidebar />

      <main style={{ overflowY: 'auto', position: 'relative', padding: '48px', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <p style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#64748B', marginBottom: '8px' }}>Configuration</p>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1E293B', letterSpacing: '-0.02em' }}>Settings</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '48px' }}>
          {/* Settings Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                    border: isActive ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontSize: '14px',
                    fontWeight: 600,
                    textAlign: 'left',
                  }}
                >
                  <Icon size={18} color={isActive ? '#0051FF' : 'currentColor'} />
                  {section.label}
                  {isActive && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
                </button>
              );
            })}
          </div>

          {/* Settings Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Profile Section */}
            {activeSection === 'profile' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'linear-gradient(135deg, #0051FF, #0051FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 800, color: '#1E293B' }}>
                    YA
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1E293B', marginBottom: '4px' }}>Yudanta Adhipramana</h3>
                    <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '8px' }}>yudanta@instajob.ai</p>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#0051FF', background: 'rgba(0, 81, 255, 0.1)', padding: '4px 12px', borderRadius: '99px', border: '1px solid rgba(0, 81, 255, 0.2)' }}>PRO PLAN</span>
                  </div>
                </div>

                <div style={{ padding: '32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1E293B', marginBottom: '24px' }}>Personal Information</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', marginBottom: '8px', display: 'block' }}>First Name</label>
                      <input type="text" defaultValue="Yudanta" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#1E293B', fontSize: '14px', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', marginBottom: '8px', display: 'block' }}>Last Name</label>
                      <input type="text" defaultValue="Adhipramana" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#1E293B', fontSize: '14px', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', marginBottom: '8px', display: 'block' }}>Email</label>
                      <input type="email" defaultValue="yudanta@instajob.ai" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#1E293B', fontSize: '14px', outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', marginBottom: '8px', display: 'block' }}>Phone</label>
                      <input type="tel" defaultValue="+62 812 3456 7890" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#1E293B', fontSize: '14px', outline: 'none' }} />
                    </div>
                  </div>
                </div>

                <div style={{ padding: '32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1E293B', marginBottom: '24px' }}>Professional Summary</h4>
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', marginBottom: '8px', display: 'block' }}>Bio</label>
                    <textarea defaultValue="Senior Frontend Engineer with 5+ years of experience in React, TypeScript, and modern web technologies. Passionate about building scalable UI systems and AI-driven applications." style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#1E293B', fontSize: '14px', outline: 'none', minHeight: '100px', resize: 'vertical' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ padding: '32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1E293B', marginBottom: '8px' }}>Notification Channels</h4>
                  <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>Choose how you want to be notified about job matches and updates.</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <ToggleItem 
                      icon={Mail} 
                      label="Email Notifications" 
                      description="Receive daily summaries and important alerts" 
                      enabled={notifications.email} 
                      onToggle={() => setNotifications(prev => ({ ...prev, email: !prev.email }))} 
                    />
                    <ToggleItem 
                      icon={Smartphone} 
                      label="Push Notifications" 
                      description="Real-time alerts on your device" 
                      enabled={notifications.push} 
                      onToggle={() => setNotifications(prev => ({ ...prev, push: !prev.push }))} 
                    />
                    <ToggleItem 
                      icon={Volume2} 
                      label="SMS Notifications" 
                      description="Text messages for urgent updates" 
                      enabled={notifications.sms} 
                      onToggle={() => setNotifications(prev => ({ ...prev, sms: !prev.sms }))} 
                    />
                    <ToggleItem 
                      icon={Zap} 
                      label="Marketing & Tips" 
                      description="Weekly career tips and platform updates" 
                      enabled={notifications.marketing} 
                      onToggle={() => setNotifications(prev => ({ ...prev, marketing: !prev.marketing }))} 
                    />
                  </div>
                </div>
              </div>
            )}

            {/* AI Configuration Section */}
            {activeSection === 'ai' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ padding: '32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1E293B', marginBottom: '8px' }}>AI Agent Behavior</h4>
                  <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>Configure how your AI agent searches and applies for jobs.</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <ToggleItem 
                      icon={Zap} 
                      label="Auto-Apply Mode" 
                      description="Automatically apply to jobs with >90% match" 
                      enabled={aiSettings.autoApply} 
                      onToggle={() => setAiSettings(prev => ({ ...prev, autoApply: !prev.autoApply }))} 
                    />
                    <ToggleItem 
                      icon={Brain} 
                      label="Aggressive Search" 
                      description="Expand search beyond your target criteria" 
                      enabled={aiSettings.aggressive} 
                      onToggle={() => setAiSettings(prev => ({ ...prev, aggressive: !prev.aggressive }))} 
                    />
                  </div>
                </div>

                <div style={{ padding: '32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1E293B', marginBottom: '24px' }}>Match Threshold</h4>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', color: '#334155' }}>Minimum Match Score</span>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#0051FF' }}>{aiSettings.matchThreshold}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="100" 
                      value={aiSettings.matchThreshold} 
                      onChange={(e) => setAiSettings(prev => ({ ...prev, matchThreshold: parseInt(e.target.value) }))}
                      style={{ width: '100%', accentColor: '#0051FF' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                      <span style={{ fontSize: '11px', color: '#64748B' }}>50%</span>
                      <span style={{ fontSize: '11px', color: '#64748B' }}>100%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Section */}
            {activeSection === 'security' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ padding: '32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1E293B', marginBottom: '8px' }}>Password</h4>
                  <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>Update your password to keep your account secure.</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', marginBottom: '8px', display: 'block' }}>Current Password</label>
                      <div style={{ position: 'relative' }}>
                        <input type={showPassword ? "text" : "password"} defaultValue="password123" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#1E293B', fontSize: '14px', outline: 'none', paddingRight: '44px' }} />
                        <button onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', marginBottom: '8px', display: 'block' }}>New Password</label>
                      <input type="password" placeholder="Enter new password" style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#1E293B', fontSize: '14px', outline: 'none' }} />
                    </div>
                  </div>
                </div>

                <div style={{ padding: '32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1E293B', marginBottom: '24px' }}>Two-Factor Authentication</h4>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'rgba(0, 81, 255, 0.05)', border: '1px solid rgba(0, 81, 255, 0.1)', borderRadius: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0, 81, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Lock size={20} color="#0051FF" />
                      </div>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>2FA Enabled</p>
                        <p style={{ fontSize: '12px', color: '#64748B' }}>Your account is protected with an authenticator app</p>
                      </div>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#10B981', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 12px', borderRadius: '99px' }}>ACTIVE</span>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Section */}
            {activeSection === 'preferences' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ padding: '32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#1E293B', marginBottom: '8px' }}>Appearance</h4>
                  <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>Customize how InstaJob looks on your device.</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Moon size={18} color="rgba(255,255,255,0.4)" />
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>Dark Mode</p>
                          <p style={{ fontSize: '12px', color: '#64748B' }}>Always use dark theme</p>
                        </div>
                      </div>
                      <div style={{ width: '44px', height: '24px', borderRadius: '99px', background: 'linear-gradient(135deg, #0051FF, #0051FF)', position: 'relative', cursor: 'pointer' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', right: '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Globe size={18} color="rgba(255,255,255,0.4)" />
                        <div>
                          <p style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>Language</p>
                          <p style={{ fontSize: '12px', color: '#64748B' }}>English (US)</p>
                        </div>
                      </div>
                      <ChevronRight size={16} color="rgba(255,255,255,0.2)" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function ToggleItem({ icon: Icon, label, description, enabled, onToggle }: any) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={18} color="rgba(255,255,255,0.4)" />
        </div>
        <div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>{label}</p>
          <p style={{ fontSize: '12px', color: '#64748B' }}>{description}</p>
        </div>
      </div>
      <button 
        onClick={onToggle}
        style={{
          width: '44px',
          height: '24px',
          borderRadius: '99px',
          background: enabled ? 'linear-gradient(135deg, #0051FF, #0051FF)' : 'rgba(255,255,255,0.1)',
          position: 'relative',
          cursor: 'pointer',
          border: 'none',
          transition: 'all 0.3s'
        }}
      >
        <div style={{ 
          width: '20px', 
          height: '20px', 
          borderRadius: '50%', 
          background: '#fff', 
          position: 'absolute', 
          top: '2px', 
          left: enabled ? '22px' : '2px',
          transition: 'all 0.3s',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}></div>
      </button>
    </div>
  );
}
