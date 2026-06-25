'use client';

import { Logo as BaseLogo } from '@/components/Logo';

export function Logo({ size, showText }: { size?: number; showText?: boolean }) {
  return <BaseLogo size={size} showText={showText} />;
}
