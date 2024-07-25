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
  },
  plugins: [],
}

