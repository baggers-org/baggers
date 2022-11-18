const base = require('@baggers/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...base,
  content: [
    `app/**/*.{ts,tsx}`,
    '../../packages/ui-components/**/*.{ts,tsx}',
  ],
};
