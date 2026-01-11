import { type ClassValue, clsx } from "clsx";

// Helper function to merge classnames (install clsx if needed)
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Generate unique session ID
export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// Calculate distance between two points
export function calculateDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Calculate escape vector (opposite direction from cursor)
export function calculateEscapeVector(
  cursorX: number,
  cursorY: number,
  buttonX: number,
  buttonY: number,
  escapeDistance: number = 150
): { x: number; y: number } {
  // Calculate direction from cursor to button
  const dx = buttonX - cursorX;
  const dy = buttonY - cursorY;

  // Normalize the direction
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance === 0) return { x: buttonX, y: buttonY };

  const normalizedX = dx / distance;
  const normalizedY = dy / distance;

  // Calculate new position in the escape direction
  return {
    x: buttonX + normalizedX * escapeDistance,
    y: buttonY + normalizedY * escapeDistance,
  };
}

// Keep position within viewport bounds
export function constrainToViewport(
  x: number,
  y: number,
  elementWidth: number,
  elementHeight: number,
  padding: number = 20
): { x: number; y: number } {
  const maxX = window.innerWidth - elementWidth - padding;
  const maxY = window.innerHeight - elementHeight - padding;

  return {
    x: Math.max(padding, Math.min(x, maxX)),
    y: Math.max(padding, Math.min(y, maxY)),
  };
}
