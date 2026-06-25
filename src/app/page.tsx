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
      <ScrollAnimation delay={200}>
        <HowItWorks />
      </ScrollAnimation>
      
      {/* Features Grid */}
      <ScrollAnimation delay={300}>
        <FeaturesSection />
      </ScrollAnimation>
      
      {/* Testimonials */}
      <ScrollAnimation delay={400}>
        <TestimonialsSection />
      </ScrollAnimation>
      
      {/* CTA Section */}
      <ScrollAnimation delay={500}>
        <CTASection />
      </ScrollAnimation>
      
      {/* Footer */}
      <ScrollAnimation delay={600}>
        <Footer />
      </ScrollAnimation>
    </div>
  );
}
