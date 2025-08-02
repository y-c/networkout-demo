/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fcd34d',
          300: '#f59e0b',
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
        'pulse-fast': 'pulse 1s linear infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}