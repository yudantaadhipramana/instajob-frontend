'use client';

import { useState } from 'react';
import { ScrollAnimation } from '@/components/Animations';
import Icons from '@/components/Icons';
import { useI18n } from '@/context/I18nContext';

export default function TestimonialsSection() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, label: t('testimonials.tabs.marketing') },
    { id: 1, label: t('testimonials.tabs.analytics') },
    { id: 2, label: t('testimonials.tabs.engineering') },
  ];

  const testimonials = {
    0: [
      {
        name: 'Rini Santoso',
        role: 'Fresh Graduate → SEO Specialist',
        company: 'Google',
        quote: t('quote1.text'),
        avatar: 'RS',
      },
      {
        name: 'Budi Hartono',
        role: 'Sales → Digital Marketing Manager',
        company: 'Shopee',
        quote: t('quote2.text'),
        avatar: 'BH',
      },
      {
        name: 'Maya Wijaya',
        role: 'Fresh Graduate → Data Analyst',
        company: 'GoTo',
        quote: t('quote3.text'),
        avatar: 'MW',
      },
      {
        name: 'Dian Permata',
        role: 'Admin → Product Designer',
        company: 'Tokopedia',
        quote: t('quote4.text'),
        avatar: 'DP',
      },
    ],
    1: [
      {
        name: 'Agus Pratama',
        role: 'Customer Service → Data Analyst',
        company: 'BCA',
        quote: t('quote5.text'),
        avatar: 'AP',
      },
      {
        name: 'Sari Dewi',
        role: 'Fresh Graduate → Junior Data Analyst',
        company: 'Telkom',
        quote: t('quote6.text'),
        avatar: 'SD',
      },
    ],
    2: [
      {
        name: 'Dimas Ardianto',
        role: 'Junior Dev → Software Engineer',
        company: 'Microsoft',
        quote: t('quote7.text'),
        avatar: 'DA',
      },
      {
        name: 'Ratna Kusuma',
        role: 'UI Designer → Full Stack Developer',
        company: 'Gojek',
        quote: t('quote8.text'),
        avatar: 'RK',
      },
    ],
  };

  const currentTestimonials = testimonials[activeTab as keyof typeof testimonials] || testimonials[0];

  return (
    <section
      style={{
        padding: '100px 48px',
        background: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <ScrollAnimation delay={0}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p
              style={{
                fontSize: '14px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#0051FF',
                margin: '0 0 16px 0',
              }}
            >
              {t('testimonials.badge')}
            </p>
            <h2
              style={{
                fontSize: '40px',
                fontWeight: '800',
                color: '#1E293B',
                margin: '0 0 16px 0',
              }}
            >
              {t('testimonials.title')}
            </h2>
            <p
              style={{
                fontSize: '18px',
                color: '#64748B',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              {t('testimonials.subtitle')}
            </p>
          </div>
        </ScrollAnimation>

        {/* Category Tabs */}
        <ScrollAnimation delay={100}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '48px',
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  background: activeTab === tab.id ? '#0051FF' : '#F1F5F9',
                  color: activeTab === tab.id ? '#fff' : '#64748B',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.label} (4)
              </button>
            ))}
          </div>
        </ScrollAnimation>

        {/* Testimonials Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '24px',
          }}
        >
          {currentTestimonials.map((item, i) => (
            <ScrollAnimation key={i} delay={i * 100}>
              <div
                style={{
                  padding: '32px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,81,255,0.1)';
                  e.currentTarget.style.borderColor = '#0051FF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#E2E8F0';
                }}
              >
                {/* Stars */}
                <div
                  style={{
                    fontSize: '20px',
                    marginBottom: '16px',
                  }}
                >
                  ⭐⭐⭐⭐⭐
                </div>

                {/* Quote */}
                <p
                  style={{
                    fontSize: '16px',
                    fontStyle: 'italic',
                    color: '#4B5563',
                    lineHeight: '1.7',
                    margin: '0 0 24px 0',
                  }}
                >
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Author */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #0051FF, #7C3AED)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: '16px',
                    }}
                  >
                    {item.avatar}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: '15px',
                        fontWeight: '700',
                        color: '#1E293B',
                        margin: '0 0 4px 0',
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      style={{
                        fontSize: '13px',
                        color: '#64748B',
                        margin: 0,
                      }}
                    >
                      {item.role} →{' '}
                      <span style={{ color: '#0051FF', fontWeight: '600' }}>
                        {item.company}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Pagination */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '48px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                border: '2px solid',
                borderColor: activeTab === i ? '#0051FF' : '#E2E8F0',
                background: activeTab === i ? '#0051FF' : 'transparent',
                color: activeTab === i ? '#fff' : '#64748B',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '14px',
                transition: 'all 0.2s ease',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
