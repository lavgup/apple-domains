const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      screens: {
        'xs': '475px',
        ...defaultTheme.screens,
      },
      spacing: {
        '0.75': '0.1875rem',
        '0.8': '0.225rem',
        '2.15': '0.5375rem',
        '2.2': '0.535rem'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
