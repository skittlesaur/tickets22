/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      arabic: ['Tajawal', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: {
          300: '#d73f73',
          DEFAULT: '#83113A',
          800: '#590925',
        },
        secondary: {
          DEFAULT: '#EEEEE4',
          700: '#7c7c6e',
        },
        valid: '#00BFA6',
        invalid: '#ce3131',
        loading: '#d59918',
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          980: '#111111'
        }
      },
      screens: {
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
}
