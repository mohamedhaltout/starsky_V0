/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#161816',
      },
      borderWidth: {
        '0.5': '0.5px',
      }
    },
    fontFamily: {
      sans: ['"Poppins"', 'sans-serif'],
    },
  },
  plugins: [],
}