/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#030305',
        surface: '#0A0A0E',
        surfaceHover: '#121218',
        neonGreen: '#39FF14',
        neonCyan: '#00F0FF',
        textMain: '#E2E8F0',
        textMuted: '#94A3B8',
        gridLine: 'rgba(255, 255, 255, 0.03)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}
