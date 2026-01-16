'use client';

import { motion } from 'framer-motion';
import { ElementType, getElementPrimaryColor, getElementSecondaryColor } from '@/lib/elements';

interface ElementBackgroundProps {
  element: ElementType;
}

export default function ElementBackground({ element }: ElementBackgroundProps) {
  // Get element-specific colors
  const getGradientColors = () => {
    switch (element) {
      case 'water':
        return {
          gradient: [
            'linear-gradient(135deg, rgba(56,189,248,0.2) 0%, rgba(45,212,191,0.3) 50%, rgba(2,132,199,0.2) 100%)',
            'linear-gradient(135deg, rgba(2,132,199,0.2) 0%, rgba(56,189,248,0.3) 50%, rgba(45,212,191,0.2) 100%)',
            'linear-gradient(135deg, rgba(56,189,248,0.2) 0%, rgba(45,212,191,0.3) 50%, rgba(2,132,199,0.2) 100%)',
          ],
          svgFill: '#000000',
          particleClass: 'bg-water-400/20',
        };
      case 'fire':
        return {
          gradient: [
            'linear-gradient(135deg, rgba(251,146,60,0.2) 0%, rgba(249,115,22,0.3) 50%, rgba(234,88,12,0.2) 100%)',
            'linear-gradient(135deg, rgba(234,88,12,0.2) 0%, rgba(251,146,60,0.3) 50%, rgba(249,115,22,0.2) 100%)',
            'linear-gradient(135deg, rgba(251,146,60,0.2) 0%, rgba(249,115,22,0.3) 50%, rgba(234,88,12,0.2) 100%)',
          ],
          svgFill: '#f97316',
          particleClass: 'bg-fire-400/20',
        };
      case 'earth':
        return {
          gradient: [
            'linear-gradient(135deg, rgba(52,211,153,0.2) 0%, rgba(120,113,108,0.3) 50%, rgba(5,150,105,0.2) 100%)',
            'linear-gradient(135deg, rgba(5,150,105,0.2) 0%, rgba(52,211,153,0.3) 50%, rgba(120,113,108,0.2) 100%)',
            'linear-gradient(135deg, rgba(52,211,153,0.2) 0%, rgba(120,113,108,0.3) 50%, rgba(5,150,105,0.2) 100%)',
          ],
          svgFill: '#10b981',
          particleClass: 'bg-jade-400/20',
        };
      case 'air':
        return {
          gradient: [
            'linear-gradient(135deg, rgba(250,204,21,0.2) 0%, rgba(56,189,248,0.3) 50%, rgba(202,138,4,0.2) 100%)',
            'linear-gradient(135deg, rgba(202,138,4,0.2) 0%, rgba(250,204,21,0.3) 50%, rgba(56,189,248,0.2) 100%)',
            'linear-gradient(135deg, rgba(250,204,21,0.2) 0%, rgba(56,189,248,0.3) 50%, rgba(202,138,4,0.2) 100%)',
          ],
          svgFill: '#facc15',
          particleClass: 'bg-air-400/20',
        };
      case 'all':
        return {
          gradient: [
            'linear-gradient(135deg, rgba(56,189,248,0.15) 0%, rgba(249,115,22,0.15) 25%, rgba(16,185,129,0.15) 50%, rgba(250,204,21,0.15) 100%)',
            'linear-gradient(135deg, rgba(250,204,21,0.15) 0%, rgba(56,189,248,0.15) 25%, rgba(249,115,22,0.15) 50%, rgba(16,185,129,0.15) 100%)',
            'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(250,204,21,0.15) 25%, rgba(56,189,248,0.15) 50%, rgba(249,115,22,0.15) 100%)',
          ],
          svgFill: '#38bdf8',
          particleClass: 'bg-gradient-to-r from-water-400/20 via-fire-400/20 to-jade-400/20',
        };
    }
  };

  const colors = getGradientColors();
  const particleCount = element === 'all' ? 20 : element === 'fire' ? 20 : element === 'air' ? 18 : 15;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        key={`gradient-${element}`}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          background: colors.gradient,
        }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: { duration: 0.8 },
          background: {
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      />

      {/* Animated SVG at bottom */}
      <div className="absolute bottom-0 left-0 right-0 opacity-20">
        <svg
          viewBox="0 0 1440 320"
          className="w-full"
          preserveAspectRatio="none"
        >
          <motion.path
            key={`svg-${element}`}
            fill={colors.svgFill}
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              d: [
                "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,128C672,128,768,160,864,165.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              ],
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.8 },
              d: {
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          />
        </svg>
      </div>

      {/* Floating particles */}
      {[...Array(particleCount)].map((_, i) => {
        // Different particle behaviors per element
        const getParticleBehavior = () => {
          switch (element) {
            case 'fire':
              // Fire particles rise faster and flicker
              return {
                y: [0, -150, 0],
                opacity: [0.2, 0.6, 0.1],
                scale: [1, 1.2, 0.8],
              };
            case 'earth':
              // Earth particles move slower and rotate
              return {
                y: [0, -50, 0],
                opacity: [0.3, 0.5, 0.3],
                rotate: [0, 360],
              };
            case 'air':
              // Air particles move in spirals
              return {
                y: [0, -120, 0],
                x: [0, Math.random() * 80 - 40, 0],
                opacity: [0.2, 0.6, 0.2],
                rotate: [0, 180],
              };
            case 'all':
              // Blended - mix of behaviors
              return {
                y: [0, -100, 0],
                x: [0, Math.random() * 60 - 30, 0],
                opacity: [0.2, 0.5, 0.2],
                rotate: [0, 180],
              };
            default: // water
              return {
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0.2, 0.5, 0.2],
              };
          }
        };

        const behavior = getParticleBehavior();
        const size = Math.random() * 30 + 10;

        return (
          <motion.div
            key={`${element}-particle-${i}`}
            className={`absolute rounded-full ${colors.particleClass}`}
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: behavior.opacity,
              y: behavior.y,
              x: behavior.x,
              rotate: behavior.rotate,
              scale: behavior.scale,
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
}
