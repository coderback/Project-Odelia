import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Water Theme Colors
        water: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',  // Bright water (buttons)
          500: '#0ea5e9',  // Primary water (base)
          600: '#0284c7',  // Deep water (hover)
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Teal Accent (Water Tribe)
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',  // Accent glow
          500: '#14b8a6',  // Accent primary
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        // Parchment Background
        parchment: {
          50: '#fefdfb',
          100: '#fef9f3',
          200: '#fdf4e7',  // Base parchment
          300: '#faecd1',
          400: '#f5deb3',
        },
        // Romantic Accent Colors
        romantic: {
          pink: '#fda4af',
          gold: '#fbbf24',
          warmWhite: '#fffbeb',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        calligraphy: ['"Tangerine"', '"Dancing Script"', 'cursive'],
        display: ['"Cinzel"', 'serif'],
      },
      boxShadow: {
        'water-sm': '0 2px 8px rgba(14, 165, 233, 0.2)',
        'water-md': '0 4px 16px rgba(14, 165, 233, 0.3)',
        'water-lg': '0 8px 32px rgba(14, 165, 233, 0.4)',
        'water-glow': '0 0 40px rgba(14, 165, 233, 0.6)',
        'parchment': '0 10px 40px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'wave': 'wave 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'ripple': 'ripple 2s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '33%': { transform: 'translateY(-20px) translateX(10px)' },
          '66%': { transform: 'translateY(-10px) translateX(-10px)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.8' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(14, 165, 233, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
