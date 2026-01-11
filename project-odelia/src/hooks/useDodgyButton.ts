'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useMouse } from 'react-use';
import { calculateDistance, calculateEscapeVector, constrainToViewport } from '@/lib/utils';
import { Position } from '@/types';

interface UseDodgyButtonOptions {
  proximityThreshold?: number;
  escapeDistance?: number;
  initialPosition?: Position;
}

export function useDodgyButton({
  proximityThreshold = 100,
  escapeDistance = 150,
  initialPosition = { x: 0, y: 0 },
}: UseDodgyButtonOptions = {}) {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);
  const [isPositioned, setIsPositioned] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef(typeof document !== 'undefined' ? document.body : null);
  const { docX, docY } = useMouse(bodyRef as any);
  const lastDodgeTime = useRef(0);
  const isDodging = useRef(false);

  // Initialize button position on mount
  useEffect(() => {
    if (buttonRef.current && !isPositioned) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        x: rect.left,
        y: rect.top,
      });
      setIsPositioned(true);
    }
  }, [isPositioned]);

  // Move button to random position (for mobile or after proximity trigger)
  const moveToRandomPosition = useCallback(() => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const padding = 20;
    const maxX = window.innerWidth - rect.width - padding;
    const maxY = window.innerHeight - rect.height - padding;

    // Generate random position
    const newX = Math.random() * (maxX - padding) + padding;
    const newY = Math.random() * (maxY - padding) + padding;

    setPosition({ x: newX, y: newY });
    setDodgeCount((prev) => prev + 1);

    // Add rotation wobble
    setRotation((prev) => prev + (Math.random() > 0.5 ? 15 : -15));

    // Progressive difficulty: shrink and fade after multiple dodges
    const newCount = dodgeCount + 1;
    if (newCount >= 5) {
      setScale(Math.max(0.5, 1 - newCount * 0.05));
    }
    if (newCount >= 7) {
      setOpacity(Math.max(0.3, 1 - newCount * 0.08));
    }
  }, [dodgeCount]);

  // Track mouse proximity and update position (desktop only)
  useEffect(() => {
    if (!buttonRef.current || !isPositioned) return;

    // Check if it's a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return; // Skip mouse tracking on mobile

    // Cooldown to prevent infinite loop (500ms between dodges)
    const now = Date.now();
    if (isDodging.current || now - lastDodgeTime.current < 500) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    // Calculate distance from cursor to button center
    const distance = calculateDistance(docX, docY, buttonCenterX, buttonCenterY);

    // Adjust threshold based on dodge count (gets more sensitive)
    const adjustedThreshold = proximityThreshold + dodgeCount * 10;

    if (distance < adjustedThreshold) {
      isDodging.current = true;
      lastDodgeTime.current = now;

      // Calculate new position
      const escapeVector = calculateEscapeVector(
        docX,
        docY,
        buttonCenterX,
        buttonCenterY,
        escapeDistance + dodgeCount * 20
      );

      // Constrain to viewport
      const constrainedPosition = constrainToViewport(
        escapeVector.x - rect.width / 2,
        escapeVector.y - rect.height / 2,
        rect.width,
        rect.height
      );

      // Update position
      setPosition(constrainedPosition);

      // Update dodge count
      setDodgeCount((prev) => prev + 1);

      // Add rotation wobble
      setRotation((prev) => prev + (Math.random() > 0.5 ? 15 : -15));

      // Progressive difficulty: shrink and fade after multiple dodges
      const newCount = dodgeCount + 1;
      if (newCount >= 5) {
        setScale(Math.max(0.5, 1 - newCount * 0.05));
      }
      if (newCount >= 7) {
        setOpacity(Math.max(0.3, 1 - newCount * 0.08));
      }

      // Reset dodging flag after animation
      setTimeout(() => {
        isDodging.current = false;
      }, 400);
    }
  }, [docX, docY, dodgeCount, proximityThreshold, escapeDistance, isPositioned]);

  const resetButton = useCallback(() => {
    setDodgeCount(0);
    setRotation(0);
    setScale(1);
    setOpacity(1);
  }, []);

  return {
    buttonRef,
    position,
    dodgeCount,
    rotation,
    scale,
    opacity,
    isPositioned,
    moveToRandomPosition,
    resetButton,
  };
}
