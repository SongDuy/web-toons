// tailwind.config.js
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        slideleft: {
          '100%': { transform: 'translateX(100%)' },
          '0%': { transform: 'translateX(0)' },
        },
        slideright: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        slideLeft: 'slideleft 0.25s ease-in forwards',
        slideRight: 'slideright 0.25s ease-in',
      },
    },

    screens: {
      'xs': '1px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },

  },
  plugins: [

    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-white': {
          'text-shadow': '1px 1px 1px rgba(255, 255, 255, 255), -1px -1px 1px rgba(255, 255, 255, 255), 1px -1px 1px rgba(255, 255, 255, 255), -1px 1px 1px rgba(255, 255, 255, 255)',

        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    }),

  ],
}

