/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  theme: {
    extend: {
      gridTemplateRows: {
        'pokemonBody': '100px minmax(850px, 1fr) 100px'
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      }
    },
  },
  plugins: [],
}
