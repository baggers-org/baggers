const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
        '4xl': '2100px',
      },
      fontFamily: {
        sans: [
          'Inter',
          'Montserrat',
          ...defaultTheme.fontFamily.sans,
        ],
        heading: ['Montserrat'],
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
      'secondary-dark': '#5474FE',
      'text-light': '#232323',
      'text-dark': '#FAFAFA',
      'text-secondary-dark': 'rgba(242, 242, 242, 0.7)',
      'text-secondary-light': ' #585858',
      'profit-dark': '#1CD456',
      'profit-light': '#7AC74F',
      'loss-light': '#FF8E72',
      'loss-dark': '#F2545B',

      // Starting with grays now instead
      'dark-grey-900': '#1E2023',
      'dark-grey-800': '#2F3236',
      'dark-grey-700': '#393D41',
      'dark-grey-600': '#414549',

      'dark-purple-600': '#9A6AFF',
      'dark-purple-700': '#7433FF',

      'light-grey-100': '#FFFFFF',
      'light-grey-200': '#FAFAFA',
      'light-grey-300': '#F1F4F9',

      'light-purple-900': '#251641',
      'light-purple-800': '#370792',
      'light-purple-700': '#5020AC',
      'light-purple-600': '#713FCF',
      'light-purple-500': '#742FF6',
      'light-purple-400': '#AC80FF',
      'light-purple-300': '#C09EFF',
      'light-purple-200': '#EEE5FF',
      'light-purple-100': '#FCF5FF',
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-hero-patterns'),
  ],
};
