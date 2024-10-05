/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      black: '#151617',
      blacklight:'#2A2B2D',
      textcolor:'#0B2D41',
      textcolorlight:'#152C5B',
      textcolorgray:'#8A95AD',
      gray: '#E5E5E5',
      green: {
        700: '#17453B',
        600: '#159571',
        500: '#04B479',
        300: '#1CE496',
        50: '#EFFDF8',

      },
      yellow:{
        500:'#F4AB04',
        300: '#FECA4E'
      },
      purple: {
       500: '#6E24B7',
       300: '#8B79F1'
      },
      red: '#DF4A52'
    },
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'], 
      },
    },
  },
  plugins: [],
}