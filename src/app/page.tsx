'use client';

// Landing Page Sections
import Navigation from '@/components/landing/Navigation';
import SocialProofBar from '@/components/landing/SocialProofBar';
import StatsCounter from '@/components/landing/StatsCounter';
import HowItWorks from '@/components/landing/HowItWorks';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import { ScrollAnimation } from '@/components/Animations';
import { ScrollAnimationOnce } from '@/components/Animations';

export default function Home() {
  return (
    <div style={{ background: '#FFFFFF', overflowX: 'hidden' }}>
      {/* Main Navigation & Hero */}
      <Navigation />
      
      {/* Social Proof - Company Logos */}
      <ScrollAnimation delay={0}>
        <SocialProofBar />
      </ScrollAnimation>
      
      {/* Stats Counter - Animated Numbers */}
      <ScrollAnimation delay={100}>
        <StatsCounter />
      </ScrollAnimation>
      
      {/* How It Works - Step by Step */}
      <ScrollAnimationOnce delay={200}>
        <HowItWorks />
      </ScrollAnimationOnce>
      
      {/* Features Grid */}
      <ScrollAnimationOnce delay={300}>
        <FeaturesSection />
      </ScrollAnimationOnce>
      
      {/* Testimonials */}
      <ScrollAnimationOnce delay={400}>
        <TestimonialsSection />
      </ScrollAnimationOnce>
      
      {/* CTA Section */}
      <ScrollAnimationOnce delay={500}>
        <CTASection />
      </ScrollAnimationOnce>
      
      {/* Footer */}
      <ScrollAnimationOnce delay={600}>
        <Footer />
      </ScrollAnimationOnce>
    </div>
  );
}
