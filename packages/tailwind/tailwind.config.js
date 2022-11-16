const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'Montserrat',
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
    colors: {
      'background-light': '#FAFAFA',
      'background-dark': '#1E2023',
      'paper-light': '#FFFFFF',
      'paper-dark': '#2F3236',
      'primary-light': '#742FF6',
      'secondary-light': '#2461F7',
      'primary-dark': '#9A6AFF',
      'secondary-dark': '#5474FE',
      'text-light': '#232323',
      'text-dark': '#FAFAFA',
    },
  },
  plugins: [],
};
