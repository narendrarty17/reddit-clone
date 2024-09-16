/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'darkGray': '#0e1113',
        'midDarkGray': '#161a1d',
        'midGray': '#2a3236',
        'darkMidGray': '#1e272a',
        'lightMidGray': '#1f282c',
        'lightGray': '#8ba2ad',
        'veryLightGray': '#a5b9c1'
      },
      boxShadow: {
        'dark-custom': '0 4px 6px rgba(0, 0, 0, 0.8)',  // Dark shadow
      },
    },
  },
  plugins: [],
}

