/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy-dark': '#020617',
        'slate-card': 'rgba(15, 23, 42, 0.5)',
        'slate-border': 'rgb(30, 41, 59)',
        'nav-bg': 'rgba(2, 6, 23, 0.8)',
        'nav-border': 'rgba(30, 41, 59, 0.5)',
      },
      scrollMargin: {
        'nav': '5rem',
      },
      fontVariantNumeric: {
        'tabular': 'tabular-nums',
      },
      boxShadow: {
        'photo': '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(20, 184, 166, 0.1)',
      },
    },
  },
  plugins: [],
}
