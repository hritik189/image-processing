/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5', // Example color for buttons, you can adjust
        background: '#f3f4f6', // Light background color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Add a modern font
      },
    },
  },
  plugins: [],
}

