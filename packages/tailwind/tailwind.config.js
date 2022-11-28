const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
      'primary-transparent-dark': 'rgba(154, 106, 255, 0.15)',
      'primary-transparent-light': 'rgba(116, 47, 246, 0.11)',
      'secondary-dark': '#5474FE',
      'text-light': '#232323',
      'text-dark': '#FAFAFA',
      'text-secondary-dark': 'rgba(242, 242, 242, 0.7)',
      'profit-dark': '#39E940',
      'profit-light': '#39E940',
      'loss-light': '#C62828',
      'loss-dark': '#E05555',
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
