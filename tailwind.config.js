/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      spacing: {
        0.25: '1px',
        0.5: '2px',
        1: '4px',
        1.5: '6px',
        2: '8px',
        2.5: '10px',
        3: '12px',
        3.5: '14px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        11: '44px',
        12: '48px',
        14: '56px',
        16: '64px',
        20: '80px',
        24: '96px',
        28: '112px',
        32: '128px',
      },
      colors: {
        brand: {
          dark: '#171717',
          light: '#525252',
        },
      },
      fontSize: {
        hero: ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        page: ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        section: ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        subsection: ['1.125rem', { lineHeight: '1.3' }],
        giant: ['6rem', { lineHeight: '1' }],

      },
      fontFamily: {
        comfortaa: ['Comfortaa', 'sans-serif'],
        sans: ['Comfortaa', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
