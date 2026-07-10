'use client';

import NavigationBar from '@/components/landing/NavigationBar';
import HeroSection from '@/components/landing/HeroSection';
import SocialProofBar from '@/components/landing/SocialProofBar';
import StatsCounter from '@/components/landing/StatsCounter';
import HowItWorks from '@/components/landing/HowItWorks';
import FeaturesSection from '@/components/landing/FeaturesSection';
import PricingSection from '@/components/landing/PricingSection';
import AffiliateSection from '@/components/landing/AffiliateSection';
import FAQSection from '@/components/landing/FAQSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';
import { ScrollAnimation } from '@/components/Animations';

export default function Home() {
  return (
    <div style={{ background: '#FFFFFF', overflowX: 'hidden' }}>
      <NavigationBar />
      <HeroSection />
      <ScrollAnimation delay={0}>
        <SocialProofBar />
      </ScrollAnimation>
      <ScrollAnimation delay={100}>
        <StatsCounter />
      </ScrollAnimation>
      <HowItWorks />
      <FeaturesSection />
      <PricingSection />
      <AffiliateSection />
      <FAQSection />
      <ScrollAnimation delay={400}>
        <TestimonialsSection />
      </ScrollAnimation>
      <ScrollAnimation delay={500}>
        <CTASection />
      </ScrollAnimation>
      <Footer />
    </div>
  );
}
