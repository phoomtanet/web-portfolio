import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sarabun)', 'Sarabun', 'sans-serif'],
      },
      colors: {
        'blue-500': '#3b82f6',
        'purple-500': '#6366f1',
        'blue-400': '#60a5fa',
        'purple-400': '#818cf8',
        'blue-300': '#93c5fd',
        'purple-300': '#a5b4fc',
        'dark-blue': '#1e3a8a',
        'dark-purple': '#312e81',
      },
    },
  },
  plugins: [],
};

export default config;
