/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4a90e2', // Soft blue
        secondary: '#50e3c2', // Mint green
        accent: '#f5a623', // Warm yellow
        background: '#f7f7f7', // Light grey
        dark: '#333333', // Dark grey
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}
