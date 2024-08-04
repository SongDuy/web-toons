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
      'xs': '0px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },

  },
  plugins: [],
}

