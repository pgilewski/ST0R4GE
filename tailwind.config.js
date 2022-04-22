/* eslint-disable global-require */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  important: true,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  content: ['./src/**/*.{html,js,jsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
        teal: colors.teal,
        stone: colors.stone,
        neutral: colors.neutral,
        gray: colors.gray,
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
  future: {
    purgeLayersByDefault: true,
  },
};
