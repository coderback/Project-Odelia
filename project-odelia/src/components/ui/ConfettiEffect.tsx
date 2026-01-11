'use client';

import { useEffect } from 'react';
import { useConfetti } from '@/hooks/useConfetti';

interface ConfettiEffectProps {
  trigger: boolean;
}

export default function ConfettiEffect({ trigger }: ConfettiEffectProps) {
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    if (trigger) {
      triggerConfetti();
    }
  }, [trigger, triggerConfetti]);

  return null; // This component doesn't render anything itself
}
