/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
  theme: {
    extend: {
      colors: {
        'airbnb-red': '#FF5A5F',
        'dark-grey': '#484848',
        'light-grey': '#767676',
        'extra-light-grey': '#DDDDDD',
        'ghost-white': '#FDFDFD',
        'white': '#FFFFFF',
      },
      fontFamily: {
        'sans': ['League Spartan', 'sans-serif']
      }
    },
  },
  plugins: [],
}
