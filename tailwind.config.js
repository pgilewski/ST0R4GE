module.exports = {
  important: true,
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  purge: {
    content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
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
