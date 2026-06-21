'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// Wrapper for scroll-triggered animations (RE-ENTRANT)
// Animates every time element enters viewport, resets when leaving
export function ScrollAnimation({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleVisibilityChange = useCallback((isIntersecting: boolean) => {
    if (isIntersecting) {
      // Clear any existing timer
      if (timerRef.current) clearTimeout(timerRef.current);
      // Animate in with delay
      timerRef.current = window.setTimeout(() => setIsVisible(true), delay);
    } else {
      // Reset when leaving viewport
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsVisible(false);
    }
  }, [delay]);

  useEffect(() => {
    setHasMounted(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => handleVisibilityChange(entry.isIntersecting),
      { 
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before viewport
      }
    );

    if (ref.current) observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [handleVisibilityChange]);

  return (
    <div
      ref={ref}
      style={{
        // Safe Render: If JS hasn't mounted, keep visible.
        opacity: !hasMounted ? 1 : (isVisible ? 1 : 0),
        transform: !hasMounted ? 'translateY(0)' : (isVisible ? 'translateY(0)' : 'translateY(30px)'),
        transition: isVisible 
          ? 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' 
          : 'none', // Instant reset for smooth re-entry
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

// Animated counter component - scroll-triggered animation (RE-ENTRANT)
// Animates from 0 every time element enters viewport, resets when leaving
export function AnimatedCounter({ 
  target, 
  suffix = '',
  duration = 2000
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(target); // Start at target for SSR
  const [hasMounted, setHasMounted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasStartedRef = useRef(false);

  const startAnimation = useCallback(() => {
    // Cancel any existing animation
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    
    // Reset count to 0
    setCount(0);
    startTimeRef.current = undefined;
    hasStartedRef.current = true;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Quintic ease-out for smooth finish
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOut * target);
      
      setCount(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [target, duration]);

  const resetAnimation = useCallback(() => {
    // Cancel animation
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    // Reset to 0
    setCount(0);
    hasStartedRef.current = false;
  }, []);

  useEffect(() => {
    setHasMounted(true);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          startAnimation();
        } else {
          setIsInView(false);
          resetAnimation();
        }
      },
      { 
        threshold: 0.3, // Trigger when 30% visible
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [startAnimation, resetAnimation]);

  return (
    <span 
      ref={ref} 
      style={{ 
        display: 'inline-block', 
        minWidth: '1ch',
        // Instant visibility for SSR
        opacity: hasMounted ? 1 : 1,
      }}
    >
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// Highlight text component
export function HighlightText({ 
  children, 
  color = '#0051FF' 
}: { 
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span style={{ fontWeight: 700, color }}>
      {children}
    </span>
  );
}

// Gradient text component
export function GradientText({ 
  children, 
  from = '#0051FF', 
  to = '#7C3AED' 
}: { 
  children: React.ReactNode;
  from?: string;
  to?: string;
}) {
  return (
    <span style={{
      background: `linear-gradient(135deg, ${from}, ${to})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: 800,
    }}>
      {children}
    </span>
  );
}
