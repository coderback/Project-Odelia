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
        // Fire Nation Colors
        fire: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',  // Bright flame
          500: '#f97316',  // Primary flame
          600: '#ea580c',  // Deep flame
          700: '#c2410c',  // Dragon fire
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Earth Kingdom Colors
        earth: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',  // Stone
          500: '#78716c',  // Primary earth
          600: '#57534e',  // Deep earth
          700: '#44403c',  // Mountain
          800: '#292524',
          900: '#1c1917',
        },
        // Jade Accent (Earth Kingdom)
        jade: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#34d399',  // Bright jade
          500: '#10b981',  // Primary jade
          600: '#059669',  // Deep jade
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // Air Nomad Colors
        air: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',  // Bright air
          500: '#eab308',  // Primary air
          600: '#ca8a04',  // Deep air
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        // Sky Accent (Air Nomads)
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',  // Sky blue
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Avatar (Blended All Elements)
        avatar: {
          water: '#38bdf8',
          fire: '#f97316',
          earth: '#10b981',
          air: '#facc15',
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
        sans: ['Herculanum', 'system-ui', 'sans-serif'],
        calligraphy: ['Herculanum', 'cursive'],
        display: ['"Avatar Airbender"', 'serif'],
      },
      boxShadow: {
        'water-sm': '0 2px 8px rgba(14, 165, 233, 0.2)',
        'water-md': '0 4px 16px rgba(14, 165, 233, 0.3)',
        'water-lg': '0 8px 32px rgba(14, 165, 233, 0.4)',
        'water-glow': '0 0 40px rgba(14, 165, 233, 0.6)',
        'fire-sm': '0 2px 8px rgba(249, 115, 22, 0.2)',
        'fire-md': '0 4px 16px rgba(249, 115, 22, 0.3)',
        'fire-lg': '0 8px 32px rgba(249, 115, 22, 0.4)',
        'fire-glow': '0 0 40px rgba(249, 115, 22, 0.6)',
        'earth-sm': '0 2px 8px rgba(16, 185, 129, 0.2)',
        'earth-md': '0 4px 16px rgba(16, 185, 129, 0.3)',
        'earth-lg': '0 8px 32px rgba(16, 185, 129, 0.4)',
        'earth-glow': '0 0 40px rgba(16, 185, 129, 0.6)',
        'air-sm': '0 2px 8px rgba(250, 204, 21, 0.2)',
        'air-md': '0 4px 16px rgba(250, 204, 21, 0.3)',
        'air-lg': '0 8px 32px rgba(250, 204, 21, 0.4)',
        'air-glow': '0 0 40px rgba(250, 204, 21, 0.6)',
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
