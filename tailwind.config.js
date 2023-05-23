/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pokemon-solid': ['pokemon-solid'],
        'pokemon-hollow': ['pokemon-hollow'],
        'gameboy': ['gameboy'],
      }
    },
  },
  plugins: [],
}

