"use client";

import React, { useState } from 'react';
import { ArrowRight, Check, ChevronDown, Sparkles, Zap, BarChart3, Target } from 'lucide-react';

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', color: '#1E293B' }}>
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

      {/* Navigation Bar */}
      <nav style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 50, 
        background: 'rgba(255, 255, 255, 0.8)', 
        backdropFilter: 'blur(12px)', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)' 
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '20px 24px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div style={{ fontSize: '24px', fontWeight: 800, color: '#1E293B' }}>InstaJob</div>
          <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
            <a href="#pricing" style={{ color: '#334155', fontSize: '15px', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>Pricing</a>
            <a href="#features" style={{ color: '#334155', fontSize: '15px', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>Resources</a>
            <a href="#about" style={{ color: '#334155', fontSize: '15px', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}>About Us</a>
            <button style={{ 
              background: 'linear-gradient(135deg, #0051FF, #0051FF)', 
              color: '#1E293B', 
              fontWeight: 700, 
              padding: '12px 28px', 
              borderRadius: '12px', 
              border: 'none', 
              cursor: 'pointer', 
              fontSize: '15px',
              transition: 'all 0.2s',
              boxShadow: '0 4px 16px rgba(0, 81, 255, 0.3)'
            }}>
              Sign up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ position: 'relative', zIndex: 1, padding: '120px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Badge */}
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'rgba(255, 255, 255, 0.05)', 
            border: '1px solid rgba(255, 255, 255, 0.1)', 
            borderRadius: '99px', 
            padding: '8px 20px', 
            marginBottom: '32px',
            backdropFilter: 'blur(12px)'
          }}>
            <Check size={16} color="#10b981" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>#1 AI Job Matcher</span>
          </div>

          {/* Main Headline */}
          <h1 style={{ 
            fontSize: '72px', 
            fontWeight: 900, 
            letterSpacing: '-0.03em', 
            lineHeight: 1.1, 
            marginBottom: '24px' 
          }}>
            <div style={{ color: '#1E293B' }}>Apply Once.</div>
            <div style={{ 
              background: 'linear-gradient(135deg, #0051FF 0%, #0051FF 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>
              Get Hired Faster.
            </div>
          </h1>

          {/* Subheadline */}
          <p style={{ 
            fontSize: '20px', 
            color: '#475569', 
            lineHeight: 1.6, 
            maxWidth: '700px', 
            margin: '0 auto 48px' 
          }}>
            Stop wasting time on bad applications. Our AI finds you the perfect matches, auto-applies, and handles everything else.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '80px' }}>
            <button style={{ 
              background: 'linear-gradient(135deg, #0051FF, #0051FF)', 
              color: '#1E293B', 
              fontWeight: 700, 
              padding: '18px 40px', 
              borderRadius: '12px', 
              border: 'none', 
              cursor: 'pointer', 
              fontSize: '16px',
              transition: 'all 0.2s',
              boxShadow: '0 8px 32px rgba(0, 81, 255, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Start Free Trial <ArrowRight size={20} />
            </button>
            <button style={{ 
              background: 'rgba(255, 255, 255, 0.03)', 
              color: '#1E293B', 
              fontWeight: 700, 
              padding: '18px 40px', 
              borderRadius: '12px', 
              border: '1px solid rgba(255, 255, 255, 0.1)', 
              cursor: 'pointer', 
              fontSize: '16px',
              transition: 'all 0.2s',
              backdropFilter: 'blur(12px)'
            }}>
              Watch Demo
            </button>
          </div>

          {/* Stats Row */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '48px', 
            maxWidth: '800px', 
            margin: '0 auto',
            padding: '48px 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 900, color: '#1E293B', marginBottom: '8px' }}>50K+</div>
              <div style={{ fontSize: '14px', color: '#64748B', fontWeight: 500 }}>Job Matches</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 900, color: '#1E293B', marginBottom: '8px' }}>95%</div>
              <div style={{ fontSize: '14px', color: '#64748B', fontWeight: 500 }}>Match Rate</div>
            </div>
            <div>
              <div style={{ fontSize: '48px', fontWeight: 900, color: '#1E293B', marginBottom: '8px' }}>14d</div>
              <div style={{ fontSize: '14px', color: '#64748B', fontWeight: 500 }}>Time to Hire</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section style={{ position: 'relative', zIndex: 1, padding: '80px 24px', background: 'rgba(255, 255, 255, 0.01)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ 
            fontSize: '11px', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em', 
            color: '#64748B', 
            marginBottom: '48px' 
          }}>
            TRUSTED BY ENGINEERS AT
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '64px', 
            flexWrap: 'wrap',
            opacity: 0.4
          }}>
            {['Stripe', 'Linear', 'Vercel', 'Shopify', 'Discord', 'Figma', 'Notion'].map((company) => (
              <div key={company} style={{ fontSize: '20px', fontWeight: 700, color: '#334155' }}>
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ position: 'relative', zIndex: 1, padding: '120px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{ 
              fontSize: '11px', 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              letterSpacing: '0.15em', 
              color: '#64748B', 
              marginBottom: '16px' 
            }}>
              FEATURES
            </p>
            <h2 style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              <span style={{ color: '#1E293B' }}>Everything you need to</span>
              <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #0051FF 0%, #0051FF 100%)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}>
                land your dream job
              </span>
            </h2>
          </div>

          {/* Feature Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {[
              {
                icon: Sparkles,
                title: 'AI-Powered Matching',
                description: 'Our AI analyzes your resume, skills, and preferences to find roles that fit you perfectly.',
                color: '#0051FF'
              },
              {
                icon: Zap,
                title: 'One-Click Apply',
                description: 'Apply to your perfect roles with a single click. Our AI handles all applications.',
                color: '#0051FF'
              },
              {
                icon: BarChart3,
                title: 'Track Everything',
                description: 'Follow your applications, interview status, and progress in one place.',
                color: '#0051FF'
              },
              {
                icon: Target,
                title: 'Career Insights',
                description: 'Get personalized data on salaries, market trends, and skill gaps to stay ahead.',
                color: '#0051FF'
              }
            ].map((feature, index) => (
              <div key={index} style={{ 
                background: 'rgba(255, 255, 255, 0.02)', 
                border: '1px solid rgba(255, 255, 255, 0.05)', 
                borderRadius: '20px', 
                padding: '48px',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}>
                <div style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '16px', 
                  background: `${feature.color}20`, 
                  border: `1px solid ${feature.color}40`,
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  <feature.icon size={28} color={feature.color} />
                </div>
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#1E293B', marginBottom: '16px' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.6 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
