/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lm: {
          black: '#1d1d1f',
          gray: '#86868b',
          'light': '#f5f5f7',
          blue: '#0066cc',
          green: '#1a9e3f',
          amber: '#b86e00',
          red: '#c0392b',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
      },
    },
  },
  plugins: [],
}
