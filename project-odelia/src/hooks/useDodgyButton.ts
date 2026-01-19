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

    // Find the Yes button to avoid overlapping with it
    const yesButton = document.querySelector('[aria-label="Click to say YES to being my Valentine"]');
    const yesRect = yesButton?.getBoundingClientRect();

    // Helper to check if position overlaps with Yes button
    const overlapsYesButton = (x: number, y: number) => {
      if (!yesRect) return false;
      const buffer = 20; // Extra buffer space
      return !(
        x + rect.width + buffer < yesRect.left ||
        x > yesRect.right + buffer ||
        y + rect.height + buffer < yesRect.top ||
        y > yesRect.bottom + buffer
      );
    };

    // Try to find a non-overlapping position (max 10 attempts)
    let newX = 0;
    let newY = 0;
    let attempts = 0;
    do {
      newX = Math.random() * (maxX - padding) + padding;
      newY = Math.random() * (maxY - padding) + padding;
      attempts++;
    } while (overlapsYesButton(newX, newY) && attempts < 10);

    setPosition({ x: newX, y: newY });
    setDodgeCount((prev) => prev + 1);
  }, []);

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

      // Find the Yes button to avoid overlapping with it
      const yesButton = document.querySelector('[aria-label="Click to say YES to being my Valentine"]');
      const yesRect = yesButton?.getBoundingClientRect();

      // Helper to check if position overlaps with Yes button
      const overlapsYesButton = (x: number, y: number) => {
        if (!yesRect) return false;
        const buffer = 20;
        return !(
          x + rect.width + buffer < yesRect.left ||
          x > yesRect.right + buffer ||
          y + rect.height + buffer < yesRect.top ||
          y > yesRect.bottom + buffer
        );
      };

      // Calculate new position
      const escapeVector = calculateEscapeVector(
        docX,
        docY,
        buttonCenterX,
        buttonCenterY,
        escapeDistance + dodgeCount * 20
      );

      // Constrain to viewport
      let constrainedPosition = constrainToViewport(
        escapeVector.x - rect.width / 2,
        escapeVector.y - rect.height / 2,
        rect.width,
        rect.height
      );

      // If overlapping Yes button, try random position instead
      if (overlapsYesButton(constrainedPosition.x, constrainedPosition.y)) {
        const padding = 20;
        const maxX = window.innerWidth - rect.width - padding;
        const maxY = window.innerHeight - rect.height - padding;
        let attempts = 0;
        do {
          constrainedPosition = {
            x: Math.random() * (maxX - padding) + padding,
            y: Math.random() * (maxY - padding) + padding,
          };
          attempts++;
        } while (overlapsYesButton(constrainedPosition.x, constrainedPosition.y) && attempts < 10);
      }

      // Update position
      setPosition(constrainedPosition);

      // Update dodge count
      setDodgeCount((prev) => prev + 1);

      // Reset dodging flag after animation
      setTimeout(() => {
        isDodging.current = false;
      }, 400);
    }
  }, [docX, docY, dodgeCount, proximityThreshold, escapeDistance, isPositioned]);

  const resetButton = useCallback(() => {
    setDodgeCount(0);
  }, []);

  return {
    buttonRef,
    position,
    dodgeCount,
    isPositioned,
    moveToRandomPosition,
    resetButton,
  };
}
