/** @type {import('tailwindcss').Config} */
module.exports = {
  content:  ["./src/**/*.{html,js}",
  "./src/*.{html,js}",
  "./src/**/**/*.{html,js}",
],
  theme: {
    extend: {        
      colors: {
      'green-yellow': '#adff2f',
      }},
  },
  plugins: [],
}

