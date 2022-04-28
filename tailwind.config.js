const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  important: true,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
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

  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      inset: ['checked'],
      zIndex: ['hover', 'active'],
    },
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true,
  },
}
