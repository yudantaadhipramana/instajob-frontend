"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Shield, TrendingUp, Check, ChevronDown, Star, Building2, Users, Briefcase, Globe } from 'lucide-react';

const companies = [
  'Stripe', 'Linear', 'Vercel', 'Shopify', 'Notion', 'Figma', 'OpenAI', 'Anthropic'
];

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Matching',
    description: 'Our AI analyzes your profile and matches you with jobs that fit your skills, experience, and career goals with 95%+ accuracy.',
    gradient: 'from-blue-500 to-purple-500'
  },
  {
    icon: Zap,
    title: 'One-Click Apply',
    description: 'Apply to hundreds of jobs with a single click. Our AI auto-fills applications and optimizes your resume for each role.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Shield,
    title: 'Track Everything',
    description: 'Visual pipeline tracking from application to offer. Never lose track of where you stand in the hiring process.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: TrendingUp,
    title: 'Career Insights',
    description: 'Get AI-powered feedback on your resume, salary benchmarks, and skill gap analysis to stay competitive.',
    gradient: 'from-cyan-500 to-blue-500'
  }
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Senior Frontend Engineer',
    company: 'Stripe',
    quote: 'InstaJob helped me land my dream job at Stripe in just 3 weeks. The AI matching was incredibly accurate - 98% match score!',
    rating: 5
  },
  {
    name: 'Marcus Johnson',
    role: 'Product Designer',
    company: 'Linear',
    quote: 'I went from 0 interviews to 5 offers in 2 weeks. The auto-apply feature saved me 40+ hours of manual applications.',
    rating: 5
  },
  {
    name: 'Yuki Tanaka',
    role: 'Fullstack Developer',
    company: 'Vercel',
    quote: 'The pipeline tracking is a game-changer. I could see exactly where each application stood and follow up at the right time.',
    rating: 5
  }
];

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: ['5 AI job matches/day', 'Basic resume analysis', 'Manual application tracking', 'Email support'],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For serious job seekers',
    features: ['Unlimited AI matches', 'Auto-apply to 100 jobs/day', 'Advanced resume optimizer', 'Priority support', 'Salary insights', 'Interview prep'],
    cta: 'Start Pro Trial',
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: 'per month',
    description: 'For teams & recruiters',
    features: ['Everything in Pro', 'Team collaboration', 'Custom integrations', 'Dedicated account manager', 'API access', 'White-label options'],
    cta: 'Contact Sales',
    popular: false
  }
];

const faqs = [
  {
    question: 'How does the AI matching work?',
    answer: 'Our AI analyzes your resume, skills, experience, and preferences, then compares them against millions of job postings to find the best matches with 95%+ accuracy.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use bank-level encryption and never share your personal data with employers without your explicit consent. You control what information is shared.'
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your Pro or Enterprise subscription at any time. You will continue to have access until the end of your billing period.'
  },
  {
    question: 'How many jobs can I apply to?',
    answer: 'Free users get 5 AI matches per day. Pro users can auto-apply to up to 100 jobs per day with optimized resumes for each application.'
  }
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', color: '#f8fafc' }}>
      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
              <defs>
                <linearGradient id="navGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0051FF" />
                  <stop offset="100%" stopColor="#0051FF" />
                </linearGradient>
              </defs>
              <circle cx="35" cy="25" r="6" fill="url(#navGradient)" />
              <path d="M35 40 L35 60 C35 75, 45 85, 60 85 L70 85" stroke="url(#navGradient)" strokeWidth="8" strokeLinecap="round" fill="none" />
              <path d="M60 85 L75 70 M75 70 L90 85 M75 70 L75 95" stroke="url(#navGradient)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span style={{ fontSize: '20px', fontWeight: 700, background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>InstaJob</span>
          </div>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <a href="#features" style={{ fontSize: '14px', color: '#334155', textDecoration: 'none', transition: 'color 0.2s' }}>Features</a>
            <a href="#testimonials" style={{ fontSize: '14px', color: '#334155', textDecoration: 'none', transition: 'color 0.2s' }}>Testimonials</a>
            <a href="#pricing" style={{ fontSize: '14px', color: '#334155', textDecoration: 'none', transition: 'color 0.2s' }}>Pricing</a>
            <Link href="/" style={{ padding: '10px 20px', background: 'linear-gradient(135deg, #0051FF, #0051FF)', color: '#1E293B', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 8px 32px rgba(0, 81, 255, 0.3)' }}>
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ position: 'relative', padding: '160px 24px 120px', overflow: 'hidden' }}>
        {/* Background Glow */}
        <div style={{ position: 'absolute', width: '800px', height: '800px', borderRadius: '50%', top: '-200px', right: '-100px', background: 'radial-gradient(circle, rgba(0, 81, 255, 0.15) 0%, transparent 70%)', filter: 'blur(120px)', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', width: '800px', height: '800px', borderRadius: '50%', bottom: '-200px', left: '-100px', background: 'radial-gradient(circle, rgba(0, 81, 255, 0.15) 0%, transparent 70%)', filter: 'blur(120px)', pointerEvents: 'none' }}></div>

        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(0, 81, 255, 0.1)', border: '1px solid rgba(0, 81, 255, 0.2)', borderRadius: '99px', marginBottom: '32px' }}>
            <Sparkles size={14} color="#0051FF" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#0051FF' }}>AI-Powered Job Hunting</span>
          </div>

          <h1 style={{ fontSize: '64px', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.03em' }}>
            <span style={{ background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Apply Once.</span>
            <br />
            <span style={{ background: 'linear-gradient(135deg, #0051FF, #0051FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Get Hired Faster.</span>
          </h1>

          <p style={{ fontSize: '20px', color: '#475569', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 48px' }}>
            Stop spending hours on applications. Our AI finds your perfect matches, auto-applies for you, and tracks everything until you get the offer.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '80px' }}>
            <button style={{ padding: '16px 32px', background: 'linear-gradient(135deg, #0051FF, #0051FF)', color: '#1E293B', borderRadius: '12px', fontSize: '16px', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 32px rgba(0, 81, 255, 0.4)', transition: 'transform 0.2s' }}>
              Start Free Trial
              <ArrowRight size={18} />
            </button>
            <button style={{ padding: '16px 32px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#1E293B', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer' }}>
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px', maxWidth: '700px', margin: '0 auto' }}>
            <div>
              <p style={{ fontSize: '40px', fontWeight: 800, background: 'linear-gradient(135deg, #0051FF, #0051FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>50K+</p>
              <p style={{ fontSize: '14px', color: '#64748B' }}>Jobs Matched</p>
            </div>
            <div>
              <p style={{ fontSize: '40px', fontWeight: 800, background: 'linear-gradient(135deg, #0051FF, #0051FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>95%</p>
              <p style={{ fontSize: '14px', color: '#64748B' }}>Match Accuracy</p>
            </div>
            <div>
              <p style={{ fontSize: '40px', fontWeight: 800, background: 'linear-gradient(135deg, #0051FF, #0051FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>14d</p>
              <p style={{ fontSize: '14px', color: '#64748B' }}>Avg. Time to Offer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '48px' }}>Trusted by engineers at</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap', alignItems: 'center' }}>
            {companies.map((company) => (
              <span key={company} style={{ fontSize: '24px', fontWeight: 700, color: 'rgba(255,255,255,0.15)', letterSpacing: '-0.02em' }}>
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{ fontSize: '14px', fontWeight: 800, color: '#0051FF', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>Features</p>
            <h2 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em' }}>
              <span style={{ background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Everything you need to</span>
              <br />
              <span style={{ background: 'linear-gradient(135deg, #0051FF, #0051FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>land your dream job</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} style={{ padding: '40px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', transition: 'all 0.3s', cursor: 'pointer' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `linear-gradient(135deg, ${feature.gradient.includes('blue') ? '#0051FF' : '#0051FF'}, ${feature.gradient.includes('purple') ? '#0051FF' : '#0051FF'})`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                    <Icon size={24} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#1E293B', marginBottom: '12px' }}>{feature.title}</h3>
                  <p style={{ fontSize: '16px', color: '#64748B', lineHeight: 1.6 }}>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" style={{ padding: '120px 24px', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{ fontSize: '14px', fontWeight: 800, color: '#0051FF', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>Testimonials</p>
            <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-0.02em' }}>
              <span style={{ background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Loved by job seekers</span>
              <br />
              <span style={{ background: 'linear-gradient(135deg, #0051FF, #0051FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>worldwide</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} style={{ padding: '40px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} color="#F59E0B" fill="#F59E0B" />
                  ))}
                </div>
                <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '24px', fontStyle: 'italic' }}>"{testimonial.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #0051FF, #0051FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#1E293B' }}>
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#1E293B' }}>{testimonial.name}</p>
                    <p style={{ fontSize: '12px', color: '#64748B' }}>{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{ fontSize: '14px', fontWeight: 800, color: '#0051FF', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>Pricing</p>
            <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-0.02em' }}>
              <span style={{ background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Simple, transparent</span>
              <br />
              <span style={{ background: 'linear-gradient(135deg, #0051FF, #0051FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>pricing</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {plans.map((plan) => (
              <div key={plan.name} style={{ padding: '40px', background: plan.popular ? 'rgba(0, 81, 255, 0.05)' : 'rgba(255,255,255,0.02)', border: `1px solid ${plan.popular ? 'rgba(0, 81, 255, 0.2)' : 'rgba(255,255,255,0.05)'}`, borderRadius: '20px', position: 'relative', transition: 'transform 0.3s' }}>
                {plan.popular && (
                  <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', padding: '6px 16px', background: 'linear-gradient(135deg, #0051FF, #0051FF)', borderRadius: '99px', fontSize: '12px', fontWeight: 700, color: '#1E293B' }}>
                    MOST POPULAR
                  </div>
                )}
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#64748B', marginBottom: '8px' }}>{plan.name}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '48px', fontWeight: 800, color: '#1E293B' }}>{plan.price}</span>
                  <span style={{ fontSize: '14px', color: '#64748B' }}>/{plan.period}</span>
                </div>
                <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '32px' }}>{plan.description}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  {plan.features.map((feature) => (
                    <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={16} color={plan.popular ? '#0051FF' : 'rgba(255,255,255,0.4)'} />
                      <span style={{ fontSize: '14px', color: '#334155' }}>{feature}</span>
                    </div>
                  ))}
                </div>
                <button style={{ width: '100%', padding: '14px', background: plan.popular ? 'linear-gradient(135deg, #0051FF, #0051FF)' : 'rgba(255,255,255,0.03)', border: plan.popular ? 'none' : '1px solid rgba(255,255,255,0.1)', color: '#1E293B', borderRadius: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', boxShadow: plan.popular ? '0 8px 32px rgba(0, 81, 255, 0.3)' : 'none' }}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '120px 24px', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <p style={{ fontSize: '14px', fontWeight: 800, color: '#0051FF', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>FAQ</p>
            <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-0.02em' }}>
              <span style={{ background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Common questions</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', overflow: 'hidden' }}>
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  style={{ width: '100%', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', border: 'none', color: '#1E293B', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span style={{ fontSize: '16px', fontWeight: 600 }}>{faq.question}</span>
                  <ChevronDown size={18} color="rgba(255,255,255,0.4)" style={{ transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                </button>
                {openFaq === index && (
                  <div style={{ padding: '0 24px 20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6, marginTop: '16px' }}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section style={{ padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '1000px', height: '1000px', borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'radial-gradient(circle, rgba(0, 81, 255, 0.1) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none' }}></div>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em' }}>
            <span style={{ background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Ready to get hired?</span>
            <br />
            <span style={{ background: 'linear-gradient(135deg, #0051FF, #0051FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Start today.</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#475569', marginBottom: '40px' }}>
            Join 10,000+ job seekers who found their dream role with InstaJob.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button style={{ padding: '16px 32px', background: 'linear-gradient(135deg, #0051FF, #0051FF)', color: '#1E293B', borderRadius: '12px', fontSize: '16px', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 32px rgba(0, 81, 255, 0.4)' }}>
              Get Started Free
              <ArrowRight size={18} />
            </button>
            <Link href="/" style={{ padding: '16px 32px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', color: '#1E293B', borderRadius: '12px', fontSize: '16px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} />
              Go to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '48px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
              <defs>
                <linearGradient id="footGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0051FF" />
                  <stop offset="100%" stopColor="#0051FF" />
                </linearGradient>
              </defs>
              <circle cx="35" cy="25" r="6" fill="url(#footGradient)" />
              <path d="M35 40 L35 60 C35 75, 45 85, 60 85 L70 85" stroke="url(#footGradient)" strokeWidth="8" strokeLinecap="round" fill="none" />
              <path d="M60 85 L75 70 M75 70 L90 85 M75 70 L75 95" stroke="url(#footGradient)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#64748B' }}>InstaJob</span>
          </div>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.2)' }}>© 2024 InstaJob. Apply Once. Get Hired Faster.</p>
        </div>
      </footer>
    </div>
  );
}
