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
      'background-dark': '#171F2A',
      'background-light': '#F4F7FA',
      'paper-light': '#FBFCFD',
      'paper-dark': '#243041',
      'primary-light': '#742FF6',
      'secondary-light': '#2461F7',
      'primary-dark': '#9A6AFF',
      'primary-transparent-dark': 'rgba(154, 106, 255, 0.15)',
      'primary-transparent-light': '#742ff617',
      'secondary-dark': '#5474FE',
      'profit-dark': '#1CD456',
      'profit-light': '#7AC74F',
      'loss-light': '#FF8E72',
      'loss-dark': '#F2545B',

      'purple-1': '#F5F2FA',
      'purple-2': '#EEE5FF',
      'purple-3': '#C09EFF',
      'purple-4': '#8E52FF',
      'purple-5': '#742FF6',

      'purple-6': '#251641',
      'purple-7': '#370792',
      'purple-8': '#5020AC',
      'purple-9': '#713FCF',

      'd-purple-1': '#24263F',
      'd-purple-2': '#312E55',
      'd-purple-3': '#664CAA',
      'd-purple-4': '#805BD4',
      'd-purple-5': '#9A6AFF',
      'd-purple-6': '#AE88FF',
      'd-purple-7': '#C2A6FF',

      'd-neutral-1': '#171F2A',
      'd-neutral-2': '#243041',
      'd-neutral-3': '#2A384C',
      'd-neutral-4': '#314259',

      white: '#FBFCFD',
      'neutral-1': '#F4F7FA',
      'neutral-2': '#ECEEF8',
      'neutral-3': '#D4DDED',
      'neutral-4': '#A3AFC2',

      'text-light': '#24282E',
      'text-dark': '#FAFAFA',
      'text-secondary-dark': 'rgba(242, 242, 242, 0.7)',
      'text-disabled-dark': 'rgba(242, 242, 242, 0.4)',
      'text-secondary-light': '#758399',
      'text-disabled-light': 'rgba(0, 0, 0, 0.4)',
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
    require('tailwindcss-hero-patterns'),
  ],
};
