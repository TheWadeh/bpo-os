/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-blue': {
          DEFAULT: '#0B0E1B',
          light: '#121629',
        },
        'neon-green': {
          DEFAULT: '#A2FF45',
        },
        'soft-cyan': {
          DEFAULT: '#48B5FF',
          dark: '#2C95FF',
        },
        'text-white': '#FFFFFF',
        'text-light-gray': '#A0A0B2',
      },
      boxShadow: {
        'subtle-glow-green': '0 0 10px rgba(162, 255, 69, 0.5)',
        'subtle-glow-cyan': '0 0 10px rgba(72, 181, 255, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
