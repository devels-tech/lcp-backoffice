const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Josefin Sans', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      colors: {
        'lcp-primary': '#1e478d'
      },
      height: {
        'screen-80': '80vh',
        'screen-70': '70vh'
      },
      screens: {
        ml: '425px', // la pantalla mas grande de un telefono segun los breakpoints de chrome
        xs: '480px'
      },
      zIndex: {
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        100: 100
      },
      spacing: {
        100: '26rem',
        112: '28rem',
        116: '29rem',
        128: '32rem',
        140: '35rem'
      },
      lineHeight: {
        'line-normal': 'normal'
      }
    }
  },
  variants: {},
  plugins: [require('flowbite/plugin'), require('@tailwindcss/typography')]
}
