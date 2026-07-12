'use client';

// Real Image-Based Logo for InstaJob - No border

export function Logo({ size = 32, showText = true }: { size?: number; showText?: boolean }) {
  const textSize = size * 0.625;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <img
        src="/logo.png"
        alt="InstaJob Logo"
        width={size}
        height={size}
        style={{ borderRadius: '20%', border: 'none' }}
      />
      {showText && (
        <span style={{
          fontSize: textSize,
          fontWeight: 800,
          color: '#1E293B',
          letterSpacing: '-0.02em',
          fontFamily: 'var(--font-plus-jakarta, "Plus Jakarta Sans", sans-serif)',
        }}>
          InstaJob
        </span>
      )}
    </div>
  );
}

export function LogoFavicon() {
  return (
    <img
      src="/logo.png"
      alt="InstaJob"
      width="32"
      height="32"
      style={{ borderRadius: '20%', border: 'none' }}
    />
  );
}

export function LogoSmall({ size = 20 }: { size?: number }) {
  return (
    <img
      src="/logo.png"
      alt="InstaJob Logo"
      width={size}
      height={size}
      style={{ borderRadius: '20%', border: 'none' }}
    />
  );
}
