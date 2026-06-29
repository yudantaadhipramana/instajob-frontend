'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Hero3DAnimation from './Hero3DAnimation';

export const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <section style={{
      width: '100%',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F8FF 50%, #EEF2FF 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 40px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated Background Gradient */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 20% 50%, rgba(0, 81, 255, 0.08) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(0, 81, 255, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(120px)',
        pointerEvents: 'none',
      }} />

      {/* Main Container */}
      <div style={{
        maxWidth: '1400px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: '60px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* LEFT SIDE: Text Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '24px',
        }}>
          {/* Tagline */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px',
          }}>
            <div style={{
              width: '40px',
              height: '2px',
              background: '#0051FF',
            }} />
            <span style={{
              fontSize: '13px',
              fontWeight: '700',
              color: '#0051FF',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              AUTOMATE & WIN
            </span>
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            lineHeight: '1.2',
            margin: '0 0 16px 0',
            color: '#1E293B',
            maxWidth: '600px',
          }}>
            Land Your Dream Job,
            <span style={{
              color: '#0051FF',
              display: 'block',
            }}>
              Automatically.
            </span>
          </h1>

          {/* Subheadline */}
          <p style={{
            fontSize: '16px',
            fontWeight: '500',
            color: '#64748B',
            maxWidth: '550px',
            lineHeight: '1.6',
            margin: '0 0 12px 0',
          }}>
            InstaJob helps you apply to hundreds of jobs automatically while you focus on what matters. Smart matching. Perfect timing. Zero effort.
          </p>

          {/* Secondary Description */}
          <p style={{
            fontSize: '14px',
            color: '#94A3B8',
            maxWidth: '550px',
            lineHeight: '1.5',
            margin: 0,
          }}>
            Join thousands of professionals landing better jobs in half the time.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '16px',
            marginTop: '24px',
            flexWrap: 'wrap',
          }}>
            {/* Primary Button */}
            <Link href="/register" style={{
              padding: '14px 32px',
              fontSize: '15px',
              fontWeight: '700',
              color: '#FFFFFF',
              background: 'linear-gradient(135deg, #0051FF 0%, #0041CC 100%)',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 16px rgba(0, 81, 255, 0.3)',
            }}>
              Get Started Free
              <span style={{ fontSize: '16px' }}>→</span>
            </Link>

            {/* Secondary Button */}
            <Link href="#demo" style={{
              padding: '14px 32px',
              fontSize: '15px',
              fontWeight: '700',
              color: '#0051FF',
              background: '#FFFFFF',
              border: '2px solid #0051FF',
              borderRadius: '8px',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
            }}>
              Watch Demo
              <span style={{ fontSize: '16px' }}>▶</span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(0, 81, 255, 0.1)',
          }}>
            <div>
              <div style={{
                fontSize: '13px',
                fontWeight: '700',
                color: '#1E293B',
              }}>
                ✓ Join 2,000+ Users
              </div>
              <div style={{
                fontSize: '12px',
                color: '#94A3B8',
              }}>
                Trusted by professionals
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: 3D Animation */}
        <div style={{
          width: '100%',
          height: '500px',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0, 81, 255, 0.2)',
        }}>
          <Hero3DAnimation isVisible={isVisible} autoPlay={true} />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        animation: 'bounce 2s infinite',
      }}>
        <span style={{
          fontSize: '12px',
          color: '#94A3B8',
          fontWeight: '600',
        }}>
          SCROLL
        </span>
        <div style={{
          width: '24px',
          height: '32px',
          border: '2px solid #0051FF',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '6px 0',
        }}>
          <div style={{
            width: '2px',
            height: '8px',
            background: '#0051FF',
            borderRadius: '1px',
            animation: 'scroll-down 1.5s infinite',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
        
        @keyframes scroll-down {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }

        @media (max-width: 768px) {
          section {
            padding: 40px 24px;
            min-height: auto;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
