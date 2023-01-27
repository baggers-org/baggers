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
      'text-disabled-dark': 'rgba(242, 242, 242, 0.4)',
      'text-secondary-light': ' #585858',
      'text-disabled-light': 'rgba(0, 0, 0, 0.4)',
      'profit-dark': '#1CD456',
      'profit-light': '#7AC74F',
      'loss-light': '#FF8E72',
      'loss-dark': '#F2545B',

      // Starting with grays now instead
      'dark-grey-900': '#1E2023',
      'dark-grey-800': '#3B3F45',
      'dark-grey-700': '#393D41',
      'dark-grey-600': '#414549',

      'dark-purple-900': '#110727',
      'dark-purple-800': '#4D367C',
      'dark-purple-700': '#5F3BAB',
      'dark-purple-600': '#8766CC',
      'dark-purple-500': '#9A6AFF',
      'dark-purple-400': '#BD9EFF',
      'dark-purple-300': '#BD9EFF',
      'dark-purple-200': '#E0D4F2',
      'dark-purple-100': '#F3ECFE',

      'd-neutral-700': '#1E2023',
      'd-neutral-600': '#2F3236',
      'd-neutral-500': '#373A3F',
      'd-neutral-400': '#40444A',
      'd-neutral-300': '#474C52',
      'd-neutral-200': '#51565D',

      white: '#FFFFFF',
      'neutral-100': '#FAFAFA',
      'neutral-200': '#F5F7F9',
      'neutral-300': '#F1F4F9',
      'neutral-400': '#E7E8E9',
      'neutral-600': '#747981',
      'neutral-700': '#27282B',

      'light-purple-900': '#251641',
      'light-purple-800': '#370792',
      'light-purple-700': '#5020AC',
      'light-purple-600': '#713FCF',
      'light-purple-500': '#742FF6',
      'light-purple-400': '#AC80FF',
      'light-purple-300': '#C09EFF',
      'light-purple-200': '#EEE5FF',
      'light-purple-100': '#F5F2FA',
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-hero-patterns'),
  ],
};
