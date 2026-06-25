'use client';

export function HighlightText({ 
  children, 
  color = '#0051FF' 
}: { 
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span style={{ 
      fontWeight: '700',
      color: color,
    }}>
      {children}
    </span>
  );
}

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
      fontWeight: '800',
    }}>
      {children}
    </span>
  );
}
